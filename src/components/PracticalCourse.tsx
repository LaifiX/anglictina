import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Compass,
  GraduationCap,
  Layers,
  MessageSquare,
  Play,
  RotateCcw,
  Shuffle,
  Sparkles,
  Trophy,
  Volume2,
  XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { TENSE_GUIDE_MAP } from '../data/grammarData';
import {
  ALL_COURSE_EXERCISES,
  CEFR_LEVEL_META,
  MODULES_BY_LEVEL,
  PRACTICAL_MODULES,
  QUICK_TRAVEL_SCENARIOS,
  getModuleProgress,
  getPathwayOverallSummary,
} from '../data/pathway';
import { ALL_TENSE_EXERCISES, EXERCISES_BY_TENSE } from '../data/tenses';
import type {
  Accent,
  CefrLevel,
  CourseExercise,
  CourseExerciseKind,
  PathwayProgressState,
  SpeechRate,
  TenseId,
  TenseProgressMap,
  TenseQuizLaunchRequest,
} from '../types/english';
import { playFeedbackTone, speakSequence, speakText } from '../utils/speech';
import { getTenseMastery } from '../utils/tenseCheck';
import { AudioButton } from './AudioButton';

type ModuleTab = 'grammar' | 'vocab' | 'sentences' | 'quiz';

interface PracticalCourseProps {
  accent: Accent;
  rate: SpeechRate;
  sfxEnabled: boolean;
  pathwayProgress: PathwayProgressState;
  tenseProgress: TenseProgressMap;
  onToggleVocabLearned: (vocabId: string) => void;
  onToggleSentenceLearned: (sentenceId: string) => void;
  onRecordCourseExercise: (exerciseId: string, isCorrect: boolean) => void;
  onOpenTenseLesson: (tenseId: TenseId) => void;
  onLaunchTenseQuiz: (req: Omit<TenseQuizLaunchRequest, 'nonce'>) => void;
}

const KIND_BADGE: Record<CourseExerciseKind, { label: string; cls: string }> = {
  vocab: { label: 'Slovíčko v praxi', cls: 'badge-blue' },
  sentence: { label: 'Praktická veta', cls: 'badge-emerald' },
  dialogue: { label: 'Reakcia v rozhovore', cls: 'badge-purple' },
  grammar: { label: 'Gramatika & čas', cls: 'badge-amber' },
};

function shuffleItems<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isLikelyEnglish(text: string): boolean {
  // Heuristic: avoid reading long Slovak explanations aloud via English TTS
  return !/[áäčďéíĺľňóôŕšťúýžÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ]/.test(text);
}

export function PracticalCourse({
  accent,
  rate,
  sfxEnabled,
  pathwayProgress,
  tenseProgress,
  onToggleVocabLearned,
  onToggleSentenceLearned,
  onRecordCourseExercise,
  onOpenTenseLesson,
  onLaunchTenseQuiz,
}: PracticalCourseProps) {
  const summary = useMemo(() => getPathwayOverallSummary(pathwayProgress), [pathwayProgress]);

  const firstUnfinishedModule = useMemo(() => {
    const found = PRACTICAL_MODULES.find(
      (m) => !getModuleProgress(m, pathwayProgress).isCompleted
    );
    return found ?? PRACTICAL_MODULES[0];
  }, [pathwayProgress]);

  const [levelFilter, setLevelFilter] = useState<CefrLevel | 'all'>(
    firstUnfinishedModule.level
  );
  const [selectedModuleId, setSelectedModuleId] = useState<string>(firstUnfinishedModule.id);
  const [moduleTab, setModuleTab] = useState<ModuleTab>('grammar');

  // Vocabulary view state
  const [vocabMode, setVocabMode] = useState<'list' | 'flashcards'>('list');
  const [vocabFilter, setVocabFilter] = useState<'all' | 'todo' | 'done'>('all');
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  // Dialogue sequential playback state
  const [playingDialogue, setPlayingDialogue] = useState<{
    dIdx: number;
    turnIdx: number;
  } | null>(null);

  // Standalone / Multi-module quiz runner state
  const [activeQuiz, setActiveQuiz] = useState<{
    title: string;
    questions: CourseExercise[];
    idx: number;
    chosen: string | null;
    results: Record<string, boolean>;
    finished: boolean;
  } | null>(null);

  const visibleModules = useMemo(() => {
    if (levelFilter === 'all') return PRACTICAL_MODULES;
    return MODULES_BY_LEVEL[levelFilter];
  }, [levelFilter]);

  const activeModule = useMemo(() => {
    const inVisible = visibleModules.find((m) => m.id === selectedModuleId);
    if (inVisible) return inVisible;
    return visibleModules[0] ?? PRACTICAL_MODULES[0];
  }, [visibleModules, selectedModuleId]);

  const activeModuleProgress = useMemo(
    () => getModuleProgress(activeModule, pathwayProgress),
    [activeModule, pathwayProgress]
  );

  const activeIdxInAll = PRACTICAL_MODULES.findIndex((m) => m.id === activeModule.id);
  const prevModule = activeIdxInAll > 0 ? PRACTICAL_MODULES[activeIdxInAll - 1] : null;
  const nextModule =
    activeIdxInAll < PRACTICAL_MODULES.length - 1 ? PRACTICAL_MODULES[activeIdxInAll + 1] : null;

  const filteredVocab = useMemo(() => {
    return activeModule.vocab.filter((v) => {
      const done = Boolean(pathwayProgress.learnedVocab[v.id]);
      if (vocabFilter === 'done') return done;
      if (vocabFilter === 'todo') return !done;
      return true;
    });
  }, [activeModule.vocab, pathwayProgress.learnedVocab, vocabFilter]);

  const safeCardIndex =
    filteredVocab.length > 0 ? Math.min(cardIndex, filteredVocab.length - 1) : 0;
  const currentCard = filteredVocab[safeCardIndex] ?? null;

  const selectModule = (modId: string, tab?: ModuleTab) => {
    setSelectedModuleId(modId);
    setPlayingDialogue(null);
    setCardIndex(0);
    setCardFlipped(false);
    setActiveQuiz(null);
    if (tab) setModuleTab(tab);
  };

  const startQuizRound = (title: string, pool: CourseExercise[], limit?: number) => {
    if (pool.length === 0) return;
    // Prioritize missed & unseen items first
    const missed = pool.filter((q) => {
      const r = pathwayProgress.exerciseRecords[q.id];
      return r && !r.lastCorrect;
    });
    const unseen = pool.filter((q) => !pathwayProgress.exerciseRecords[q.id]);
    const done = pool.filter((q) => pathwayProgress.exerciseRecords[q.id]?.lastCorrect);
    const ordered = [...shuffleItems(missed), ...shuffleItems(unseen), ...shuffleItems(done)];
    const questions = limit ? ordered.slice(0, limit) : ordered;

    setActiveQuiz({
      title,
      questions,
      idx: 0,
      chosen: null,
      results: {},
      finished: false,
    });
    setModuleTab('quiz');
  };

  const startActiveModuleQuiz = () => {
    startQuizRound(`${activeModule.code} · ${activeModule.titleSk}`, activeModule.exercises);
  };

  const startLevelQuiz = (lvl: CefrLevel) => {
    const pool = MODULES_BY_LEVEL[lvl].flatMap((m) => m.exercises);
    startQuizRound(` Veľký test úrovne ${lvl} (16 úloh)`, pool, 16);
  };

  const startAllMixQuiz = () => {
    startQuizRound('Cestovateľský a konverzačný mix A1–B1 (20 úloh)', ALL_COURSE_EXERCISES, 20);
  };

  const startMistakesQuiz = () => {
    const missed = ALL_COURSE_EXERCISES.filter((q) => {
      const rec = pathwayProgress.exerciseRecords[q.id];
      return Boolean(rec && !rec.lastCorrect);
    });
    if (missed.length === 0) return;
    startQuizRound(`Oprava mojich chýb (${missed.length})`, missed);
  };

  const moduleDialogues = useMemo(
    () => [activeModule.dialogue, ...(activeModule.extraDialogues ?? [])],
    [activeModule]
  );

  const handlePlayDialogue = (dIdx: number) => {
    const dlg = moduleDialogues[dIdx];
    if (!dlg) return;
    const lines = dlg.turns.map((t) => t.en);
    speakSequence(lines, {
      accent,
      rate,
      onStep: (turnIdx) => setPlayingDialogue({ dIdx, turnIdx }),
      onDone: () => setPlayingDialogue(null),
    });
  };

  const handleAnswerQuiz = (option: string) => {
    if (!activeQuiz || activeQuiz.chosen !== null) return;
    const currentQ = activeQuiz.questions[activeQuiz.idx];
    const isCorrect = option === currentQ.answer;

    onRecordCourseExercise(currentQ.id, isCorrect);
    if (sfxEnabled) playFeedbackTone(isCorrect ? 'correct' : 'wrong');

    const spokenCandidate = currentQ.sentenceEn
      ? currentQ.sentenceEn.replace('____', currentQ.answer.split(' / ')[0])
      : currentQ.answer;
    if (isLikelyEnglish(spokenCandidate)) {
      speakText(spokenCandidate, { accent, rate });
    }

    setActiveQuiz((prev) =>
      prev
        ? {
            ...prev,
            chosen: option,
            results: { ...prev.results, [currentQ.id]: isCorrect },
          }
        : null
    );
  };

  const handleNextQuizQuestion = () => {
    if (!activeQuiz) return;
    if (activeQuiz.idx + 1 >= activeQuiz.questions.length) {
      setActiveQuiz({ ...activeQuiz, finished: true });
    } else {
      setActiveQuiz({
        ...activeQuiz,
        idx: activeQuiz.idx + 1,
        chosen: null,
      });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="section-hero">
        <div>
          <h2>Praktická angličtina A1 → B1: Cestovanie & konverzácia</h2>
          <p>
            {PRACTICAL_MODULES.length} životných situácií od kupovania lístkov, hľadania miest,
            nákupu v obchode a street foodu až po plynulú konverzáciu. Každá lekcia spája{' '}
            <strong>učivo, slovíčka, vety, dialógy a test</strong> — pokrok sa ti ukladá v
            prehliadači.
          </p>
        </div>
        <div className="hero-actions">
          <div className="stat-pill" title="Súčet zvládnutých slovíčok, viet a úloh v kurze A1–B1">
            <CheckCircle2 size={14} aria-hidden="true" />
            <span>
              A1–B1: {summary.itemsDone}/{summary.itemsTotal} ({summary.percent} %)
            </span>
          </div>
          <button type="button" className="btn btn-primary" onClick={startAllMixQuiz}>
            <Shuffle size={16} aria-hidden="true" />
            <span>Mix A1–B1 (20 úloh)</span>
          </button>
        </div>
      </section>

      <div className="stack">
        {/* Quick Everyday Travel & Conversation Scenarios Bar */}
        <section className="card roadmap-panel" aria-label="Rýchle praktické situácie na cestách">
          <div style={{ marginBottom: '0.6rem' }}>
            <h3 className="panel-title" style={{ marginBottom: '0.1rem' }}>
              Rýchle praktické situácie pre cestujúceho (otvor rovno vety a rozhovory)
            </h3>
            <span className="small muted">
              Ťukni na situáciu, ktorú práve riešiš — otvorí sa ti presná lekcia s vetami a dialógmi.
            </span>
          </div>
          <div className="scenario-quick-grid">
            {QUICK_TRAVEL_SCENARIOS.map((sc) => {
              const targetMod = PRACTICAL_MODULES.find((m) => m.id === sc.moduleId);
              if (!targetMod) return null;
              const active = activeModule.id === sc.moduleId;
              return (
                <button
                  key={sc.moduleId}
                  type="button"
                  className={`scenario-chip-btn ${active ? 'active' : ''}`}
                  onClick={() => {
                    setLevelFilter(targetMod.level);
                    selectModule(targetMod.id, 'sentences');
                  }}
                >
                  <strong>{sc.shortLabelSk}</strong>
                  <span>{sc.hintSk}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3 CEFR Level Cards (A1, A2, B1) */}
        <section className="cefr-grid" aria-label="Úrovne kurzu A1 až B1">
          {CEFR_LEVEL_META.map((meta) => {
            const stats = summary.byLevel[meta.level];
            const isSelected = levelFilter === meta.level;
            return (
              <div
                key={meta.level}
                className={`card cefr-card ${isSelected ? 'active' : ''}`}
              >
                <div className="row-between" style={{ alignItems: 'center' }}>
                  <span
                    className={`badge ${
                      meta.level === 'A1'
                        ? 'badge-emerald'
                        : meta.level === 'A2'
                          ? 'badge-blue'
                          : 'badge-purple'
                    }`}
                  >
                    {meta.level} · {meta.badgeSk}
                  </span>
                  <span className="mono small muted">
                    Lekcie {stats.modulesCompleted}/{stats.modulesTotal}
                  </span>
                </div>

                <h3 className="cefr-card-title">{meta.titleSk}</h3>
                <p className="cefr-card-desc">{meta.descriptionSk}</p>

                <div className="roadmap-step-foot" style={{ marginTop: 'auto' }}>
                  <div className="mini-bar" aria-hidden="true">
                    <span style={{ width: `${stats.percent}%` }} />
                  </div>
                  <span className="roadmap-step-count">
                    {stats.itemsDone}/{stats.itemsTotal}
                  </span>
                </div>

                <div className="cefr-tenses-row">
                  <span className="small muted" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                    Časy úrovne {meta.level}:
                  </span>
                  <div className="row" style={{ gap: '0.3rem' }}>
                    {meta.recommendedTenses.map((tid) => (
                      <button
                        key={tid}
                        type="button"
                        className="tense-mini-chip"
                        onClick={() => onOpenTenseLesson(tid)}
                        title="Otvoriť lekciu tohto času"
                      >
                        {TENSE_GUIDE_MAP[tid].titleEn} →
                      </button>
                    ))}
                  </div>
                </div>

                <div className="action-row" style={{ marginTop: '0.55rem' }}>
                  <button
                    type="button"
                    className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => {
                      const nextFilter = isSelected ? 'all' : meta.level;
                      setLevelFilter(nextFilter);
                      if (nextFilter !== 'all') {
                        const firstInLvl = MODULES_BY_LEVEL[nextFilter][0];
                        if (firstInLvl) selectModule(firstInLvl.id);
                      }
                    }}
                  >
                    <span>{isSelected ? 'Zobrazené' : `Lekcie ${meta.level}`}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => startLevelQuiz(meta.level)}
                  >
                    <Play size={13} aria-hidden="true" />
                    <span>Test {meta.level}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* Mistake drill callout when learner has missed questions */}
        {summary.mistakesCount > 0 && (
          <div className="card-muted row-between" style={{ alignItems: 'center' }}>
            <div>
              <strong>Máš {summary.mistakesCount} úloh na zopakovanie</strong>
              <div className="small muted">
                Úlohy, v ktorých si sa naposledy pomýlil, sa uložili v prehliadači na opravu.
              </div>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={startMistakesQuiz}>
              <RotateCcw size={14} aria-hidden="true" />
              <span>Opraviť chyby ({summary.mistakesCount})</span>
            </button>
          </div>
        )}

        {/* Module Selector Rail / Grid */}
        <section className="card roadmap-panel" aria-label="Zoznam lekcií A1 až B1">
          <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.65rem' }}>
            <div>
              <h3 className="panel-title" style={{ marginBottom: '0.1rem' }}>
                Vyber si praktickú lekciu ({visibleModules.length} z {PRACTICAL_MODULES.length})
              </h3>
              <span className="small muted">
                Postupuj od A1.1 po B1.4 alebo skoč rovno na tému, ktorú práve potrebuješ na cestu.
              </span>
            </div>
            <div className="row" style={{ gap: '0.35rem' }}>
              {(['all', 'A1', 'A2', 'B1'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`filter-chip ${levelFilter === f ? 'active' : ''}`}
                  onClick={() => setLevelFilter(f)}
                >
                  {f === 'all' ? `Všetky (${PRACTICAL_MODULES.length})` : f}
                </button>
              ))}
            </div>
          </div>

          <div className="roadmap-grid">
            {visibleModules.map((mod) => {
              const mp = getModuleProgress(mod, pathwayProgress);
              const isActive = mod.id === activeModule.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  className={`roadmap-step ${isActive ? 'active' : ''} ${
                    mp.isCompleted ? 'mastered' : ''
                  }`}
                  onClick={() => selectModule(mod.id)}
                >
                  <div className="roadmap-step-top">
                    <span className="roadmap-num">
                      {mp.isCompleted ? <Check size={13} /> : mod.code}
                    </span>
                    <span className="badge badge-outline" style={{ fontSize: '0.68rem' }}>
                      {mod.themeTagSk}
                    </span>
                  </div>
                  <div className="roadmap-step-title">{mod.titleSk}</div>
                  <div className="roadmap-step-foot">
                    <div className="mini-bar" aria-hidden="true">
                      <span style={{ width: `${mp.percent}%` }} />
                    </div>
                    <span className="roadmap-step-count">{mp.percent}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Active Module Workspace */}
        <article className="card tense-card">
          <div className="lesson-header">
            <div>
              <div className="row" style={{ marginBottom: '0.35rem' }}>
                <span className="badge badge-blue">
                  {activeModule.code} · Úroveň {activeModule.level}
                </span>
                <span className="badge badge-purple">{activeModule.themeTagSk}</span>
                {activeModuleProgress.isCompleted && (
                  <span className="badge badge-emerald">✓ Lekcia zvládnutá</span>
                )}
              </div>
              <h3 className="tense-title">{activeModule.titleSk}</h3>
              <p className="tense-sub">{activeModule.subtitleSk}</p>
            </div>

            <div className="lesson-cta-box">
              <button
                type="button"
                className="btn btn-primary"
                onClick={startActiveModuleQuiz}
              >
                <Play size={16} aria-hidden="true" />
                <span>
                  Test lekcie ({activeModuleProgress.exercisesMastered}/
                  {activeModuleProgress.exercisesTotal})
                </span>
              </button>
              <div className="small muted" style={{ textAlign: 'center' }}>
                Slovíčka: {activeModuleProgress.vocabDone}/{activeModuleProgress.vocabTotal} · Vety:{' '}
                {activeModuleProgress.sentencesDone}/{activeModuleProgress.sentencesTotal}
              </div>
            </div>
          </div>

          {/* 4 Sub-tabs inside Active Module (non-sticky so mobile stays uncluttered) */}
          <div className="lesson-subtabs" role="tablist" aria-label="Časti lekcie">
            {[
              { id: 'grammar' as const, label: '1. Učivo & Časy', Icon: GraduationCap },
              {
                id: 'vocab' as const,
                label: `2. Slovíčka (${activeModuleProgress.vocabDone}/${activeModule.vocab.length})`,
                Icon: Layers,
              },
              {
                id: 'sentences' as const,
                label: `3. Vety & Dialóg (${activeModuleProgress.sentencesDone}/${activeModule.sentences.length})`,
                Icon: MessageSquare,
              },
              {
                id: 'quiz' as const,
                label: `4. Test (${activeModuleProgress.exercisesMastered}/${activeModule.exercises.length})`,
                Icon: Compass,
              },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={moduleTab === id}
                className={`filter-chip ${moduleTab === id ? 'active' : ''}`}
                onClick={() => {
                  setModuleTab(id);
                  if (id === 'quiz' && !activeQuiz) {
                    startActiveModuleQuiz();
                  }
                }}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* === TAB 1: GRAMMAR & LINKED TENSES === */}
          {moduleTab === 'grammar' && (
            <div className="stack">
              <div className="deep-theory-box">
                <div className="builder-eyebrow" style={{ marginBottom: '0.25rem' }}>
                  <Sparkles size={15} aria-hidden="true" />
                  <span>Praktické učivo lekcie polopate</span>
                </div>
                <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.06rem' }}>
                  {activeModule.grammarTitleSk}
                </h4>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.91rem', color: 'var(--text-secondary)' }}>
                  {activeModule.grammarLeadSk}
                </p>

                <div className="nuance-grid">
                  {activeModule.grammarPointsSk.map((pt) => (
                    <div key={pt.title} className="nuance-card">
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.89rem', marginBottom: '0.3rem' }}>
                          {pt.title}
                        </div>
                        <p
                          style={{
                            margin: '0 0 0.55rem',
                            fontSize: '0.84rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {pt.ruleSk}
                        </p>
                      </div>
                      <div className="nuance-ex">
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>{pt.exampleEn}</div>
                          <div className="small muted">{pt.exampleSk}</div>
                        </div>
                        <AudioButton text={pt.exampleEn} accent={accent} rate={rate} iconOnly />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="callout-error">
                <div style={{ fontWeight: 800, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertTriangle size={16} color="var(--rose)" aria-hidden="true" />
                  <span>Pozor na typickú slovenskú chybu:</span>
                </div>
                <div style={{ fontSize: '0.89rem', color: 'var(--text-secondary)' }}>
                  {activeModule.slovakTrapSk}
                </div>
              </div>

              {/* Linked Tenses Card */}
              <div className="card-muted">
                <div style={{ fontWeight: 800, fontSize: '0.94rem', marginBottom: '0.2rem' }}>
                  Anglické časy, ktoré v tejto situácii používaš:
                </div>
                <p className="small muted" style={{ margin: '0 0 0.65rem' }}>
                  Prepoj si konverzačnú tému s kompletnou teóriou a 250 cvičnými vetami pre daný čas.
                </p>
                <div className="two-col-grid">
                  {activeModule.relatedTenses.map((tid) => {
                    const guide = TENSE_GUIDE_MAP[tid];
                    const tm = getTenseMastery(tid, ALL_TENSE_EXERCISES, tenseProgress);
                    return (
                      <div key={tid} className="card" style={{ padding: '0.85rem 0.95rem' }}>
                        <div className="row-between" style={{ alignItems: 'center' }}>
                          <span className="badge badge-blue">
                            Krok {guide.order} · {guide.level}
                          </span>
                          <span className="mono small muted">
                            {tm.mastered}/{EXERCISES_BY_TENSE[tid].length} príkladov
                          </span>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '0.96rem', marginTop: '0.3rem' }}>
                          {guide.titleSk}
                        </div>
                        <div className="small muted" style={{ marginBottom: '0.55rem' }}>
                          {guide.titleEn} · <span className="mono">{guide.formulaQuick}</span>
                        </div>
                        <div className="action-row">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => onOpenTenseLesson(tid)}
                          >
                            <BookOpen size={14} aria-hidden="true" />
                            <span>Lekcia času</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              onLaunchTenseQuiz({
                                mode: 'single',
                                tenses: [tid],
                                roundSize: 20,
                                autoStart: true,
                              })
                            }
                          >
                            <Play size={14} aria-hidden="true" />
                            <span>Precvičiť (250)</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="action-row" style={{ justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setModuleTab('vocab')}
                >
                  <span>Pokračovať na slovíčka ({activeModule.vocab.length})</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* === TAB 2: VOCABULARY (LIST + FLASHCARDS) === */}
          {moduleTab === 'vocab' && (
            <div className="stack">
              <div className="row-between" style={{ alignItems: 'center' }}>
                <div className="row" style={{ gap: '0.35rem' }}>
                  <button
                    type="button"
                    className={`filter-chip ${vocabMode === 'list' ? 'active' : ''}`}
                    onClick={() => setVocabMode('list')}
                  >
                    Prehľadný zoznam
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${vocabMode === 'flashcards' ? 'active' : ''}`}
                    onClick={() => {
                      setVocabMode('flashcards');
                      setCardFlipped(false);
                    }}
                  >
                    Otočné kartičky
                  </button>
                </div>

                <div className="row" style={{ gap: '0.35rem' }}>
                  {[
                    { id: 'all' as const, label: `Všetky (${activeModule.vocab.length})` },
                    {
                      id: 'todo' as const,
                      label: `Učím sa (${activeModuleProgress.vocabTotal - activeModuleProgress.vocabDone})`,
                    },
                    { id: 'done' as const, label: `Viem ✓ (${activeModuleProgress.vocabDone})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      className={`filter-chip ${vocabFilter === f.id ? 'active' : ''}`}
                      onClick={() => {
                        setVocabFilter(f.id);
                        setCardIndex(0);
                        setCardFlipped(false);
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredVocab.length === 0 ? (
                <div className="card-muted" style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <p style={{ margin: '0 0 0.6rem', fontWeight: 700 }}>
                    V tomto filtri nie sú žiadne slovíčka.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setVocabFilter('all')}
                  >
                    Zobraziť všetkých {activeModule.vocab.length} slovíčok
                  </button>
                </div>
              ) : vocabMode === 'flashcards' && currentCard ? (
                <div className="stack-sm" style={{ maxWidth: 620, margin: '0 auto', width: '100%' }}>
                  <div className="row-between small muted">
                    <span>
                      Kartička {safeCardIndex + 1} z {filteredVocab.length}
                    </span>
                    <span>Ťukni na kartu pre otočenie</span>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    className="flashcard-box vocab-flashcard"
                    onClick={() => setCardFlipped((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setCardFlipped((v) => !v);
                      }
                    }}
                  >
                    {!cardFlipped ? (
                      <>
                        <span className="badge badge-outline" style={{ marginBottom: '0.65rem' }}>
                          SLOVENSKY → Ako to povieš po anglicky?
                        </span>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                          {currentCard.sk}
                        </div>
                        <div className="small muted">{currentCard.exampleSk}</div>
                      </>
                    ) : (
                      <>
                        <span className="badge badge-blue" style={{ marginBottom: '0.55rem' }}>
                          ANGLICKY · [{currentCard.pronunciationSk}]
                        </span>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.35rem' }}>
                          {currentCard.en}
                        </div>
                        <div style={{ fontWeight: 650, fontSize: '0.95rem' }}>
                          {currentCard.exampleEn}
                        </div>
                        <div className="small muted">{currentCard.exampleSk}</div>
                      </>
                    )}
                  </div>

                  <div className="row" style={{ justifyContent: 'center', gap: '0.5rem' }}>
                    <AudioButton text={currentCard.en} accent={accent} rate={rate} label="Počuť slovo" />
                    <AudioButton
                      text={currentCard.exampleEn}
                      accent={accent}
                      rate={rate}
                      label="Počuť vetu"
                    />
                  </div>

                  <div className="flashcard-nav-row">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      disabled={safeCardIndex === 0}
                      onClick={() => {
                        setCardIndex((i) => Math.max(0, i - 1));
                        setCardFlipped(false);
                      }}
                    >
                      <ArrowLeft size={15} aria-hidden="true" />
                      <span>Predošlá</span>
                    </button>

                    <button
                      type="button"
                      className={`btn btn-sm ${
                        pathwayProgress.learnedVocab[currentCard.id]
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }`}
                      onClick={() => onToggleVocabLearned(currentCard.id)}
                    >
                      <Check size={15} aria-hidden="true" />
                      <span>
                        {pathwayProgress.learnedVocab[currentCard.id] ? 'Viem ✓' : 'Uložiť'}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      disabled={safeCardIndex >= filteredVocab.length - 1}
                      onClick={() => {
                        setCardIndex((i) => Math.min(filteredVocab.length - 1, i + 1));
                        setCardFlipped(false);
                      }}
                    >
                      <span>Ďalšia</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="vocab-grid">
                  {filteredVocab.map((item) => {
                    const learned = Boolean(pathwayProgress.learnedVocab[item.id]);
                    return (
                      <div
                        key={item.id}
                        className={`vocab-item-card ${learned ? 'learned' : ''}`}
                      >
                        <div className="row-between" style={{ alignItems: 'flex-start', gap: '0.5rem' }}>
                          <div style={{ minWidth: 0 }}>
                            <div className="vocab-en">{item.en}</div>
                            <div className="vocab-pron">[{item.pronunciationSk}]</div>
                            <div className="vocab-sk">{item.sk}</div>
                          </div>
                          <div className="row" style={{ gap: '0.35rem', flexShrink: 0 }}>
                            <AudioButton text={item.en} accent={accent} rate={rate} iconOnly />
                            <button
                              type="button"
                              className={`learned-toggle ${learned ? 'active' : ''}`}
                              onClick={() => onToggleVocabLearned(item.id)}
                              aria-pressed={learned}
                              title={learned ? 'Označené ako naučené' : 'Označiť slovíčko ako naučené'}
                            >
                              <Check size={14} aria-hidden="true" />
                              <span>{learned ? 'Viem' : 'Uložiť'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="vocab-example">
                          <div className="row-between" style={{ alignItems: 'center', gap: '0.4rem' }}>
                            <span>{item.exampleEn}</span>
                            <AudioButton
                              text={item.exampleEn}
                              accent={accent}
                              rate={rate}
                              iconOnly
                            />
                          </div>
                          <div className="small muted">{item.exampleSk}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="action-row" style={{ justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setModuleTab('sentences')}
                >
                  <span>Pokračovať na vety a dialóg</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* === TAB 3: PRACTICAL SENTENCES & DIALOGUE === */}
          {moduleTab === 'sentences' && (
            <div className="stack">
              <div>
                <h4 style={{ margin: '0 0 0.5rem' }}>
                  10 kľúčových viet do reálneho života (vypočuj si a označ osvojené)
                </h4>
                <div className="stack-sm">
                  {activeModule.sentences.map((s) => {
                    const done = Boolean(pathwayProgress.learnedSentences[s.id]);
                    return (
                      <div
                        key={s.id}
                        className={`sentence-item-card ${done ? 'learned' : ''}`}
                      >
                        <div className="row-between" style={{ alignItems: 'center', gap: '0.5rem' }}>
                          <span className="badge badge-outline">{s.situationSk}</span>
                          <div className="row" style={{ gap: '0.35rem' }}>
                            <AudioButton text={s.en} accent={accent} rate={rate} label="Počuť" />
                            <button
                              type="button"
                              className={`learned-toggle ${done ? 'active' : ''}`}
                              onClick={() => onToggleSentenceLearned(s.id)}
                              aria-pressed={done}
                            >
                              <Check size={14} aria-hidden="true" />
                              <span>{done ? 'Osvojené' : 'Osvojiť'}</span>
                            </button>
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.02rem', marginTop: '0.35rem' }}>
                          {s.en}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          <span className="lang-tag">SK</span> {s.sk}
                        </div>
                        {s.politeTipSk && (
                          <div className="small" style={{ color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>
                            Tip: {s.politeTipSk}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Roleplay Dialogues (supports 1 or multiple real-world scenarios per lesson) */}
              {moduleDialogues.map((dlg, dIdx) => (
                <div key={dlg.titleSk} className="dialogue-box">
                  <div
                    className="row-between"
                    style={{ alignItems: 'center', marginBottom: '0.65rem' }}
                  >
                    <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                      <span className="badge badge-purple" style={{ marginBottom: '0.2rem' }}>
                        Reálny rozhovor z praxe{' '}
                        {moduleDialogues.length > 1 ? `(${dIdx + 1}/${moduleDialogues.length})` : ''}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1.04rem' }}>{dlg.titleSk}</h4>
                      <div className="small muted">{dlg.contextSk}</div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => handlePlayDialogue(dIdx)}
                    >
                      <Volume2 size={15} aria-hidden="true" />
                      <span>Prehrať rozhovor</span>
                    </button>
                  </div>

                  <div className="stack-sm">
                    {dlg.turns.map((turn, idx) => {
                      const isSpeakingNow =
                        playingDialogue?.dIdx === dIdx && playingDialogue?.turnIdx === idx;
                      return (
                        <div
                          key={`${dIdx}-${idx}-${turn.en.slice(0, 12)}`}
                          className={`dialogue-turn ${turn.speaker === 'B' ? 'turn-b' : 'turn-a'} ${
                            isSpeakingNow ? 'speaking' : ''
                          }`}
                        >
                          <div
                            className="row-between"
                            style={{ alignItems: 'center', gap: '0.5rem' }}
                          >
                            <span className="dialogue-role">{turn.roleSk}</span>
                            <AudioButton text={turn.en} accent={accent} rate={rate} iconOnly />
                          </div>
                          <div style={{ fontWeight: 750, fontSize: '0.96rem', margin: '0.15rem 0' }}>
                            {turn.en}
                          </div>
                          <div className="small muted">{turn.sk}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="action-row" style={{ justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={startActiveModuleQuiz}
                >
                  <Play size={16} aria-hidden="true" />
                  <span>Spustiť test tejto lekcie ({activeModule.exercises.length} úloh)</span>
                </button>
              </div>
            </div>
          )}

          {/* === TAB 4: INTERACTIVE QUIZ === */}
          {moduleTab === 'quiz' && activeQuiz && (
            <div className="quiz-focus-wrap" style={{ margin: 0, maxWidth: 'none' }}>
              {activeQuiz.finished ? (
                <div className="summary-card card-muted">
                  <div className="result-icon">
                    <Trophy size={28} />
                  </div>
                  <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.3rem' }}>
                    {activeQuiz.title} — Hotovo!
                  </h4>
                  <p style={{ margin: '0 0 1.1rem', color: 'var(--text-secondary)' }}>
                    Správne odpovede:{' '}
                    <strong>
                      {Object.values(activeQuiz.results).filter(Boolean).length} z{' '}
                      {activeQuiz.questions.length}
                    </strong>{' '}
                    (
                    {Math.round(
                      (Object.values(activeQuiz.results).filter(Boolean).length /
                        Math.max(1, activeQuiz.questions.length)) *
                        100
                    )}{' '}
                    %). Tvoj výsledok je uložený v prehliadači.
                  </p>
                  <div className="summary-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        startQuizRound(activeQuiz.title, activeQuiz.questions)
                      }
                    >
                      <RotateCcw size={15} aria-hidden="true" />
                      <span>Zopakovať test</span>
                    </button>
                    {nextModule && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => selectModule(nextModule.id, 'grammar')}
                      >
                        <span>Ďalšia lekcia: {nextModule.code}</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                (() => {
                  const q = activeQuiz.questions[activeQuiz.idx];
                  const answered = activeQuiz.chosen !== null;
                  const isCorrect = activeQuiz.chosen === q.answer;
                  const kb = KIND_BADGE[q.kind];
                  const pct = Math.round(
                    ((activeQuiz.idx + (answered ? 1 : 0)) / activeQuiz.questions.length) * 100
                  );

                  return (
                    <div className="card-muted" style={{ padding: '1.1rem' }}>
                      <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.55rem' }}>
                        <div className="row" style={{ gap: '0.4rem' }}>
                          <span className={`badge ${kb.cls}`}>{kb.label}</span>
                          <span className="badge badge-outline">{q.level}</span>
                        </div>
                        <span className="mono small muted">
                          Úloha {activeQuiz.idx + 1} z {activeQuiz.questions.length}
                        </span>
                      </div>

                      <div className="progress" aria-hidden="true">
                        <span style={{ width: `${pct}%` }} />
                      </div>

                      <div style={{ fontWeight: 750, fontSize: '1.02rem', marginBottom: '0.65rem' }}>
                        {q.promptSk}
                      </div>

                      {q.sentenceEn && (
                        <div
                          className="card"
                          style={{
                            padding: '0.8rem 0.95rem',
                            marginBottom: '0.8rem',
                            fontWeight: 800,
                            fontSize: '1.06rem',
                          }}
                        >
                          {q.sentenceEn.split('____').map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className="blank-slot">
                                  {answered ? q.answer : '____'}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="choice-grid">
                        {q.options.map((opt) => {
                          let stateCls = '';
                          if (answered) {
                            if (opt === q.answer) stateCls = 'correct';
                            else if (opt === activeQuiz.chosen) stateCls = 'wrong';
                          }
                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={answered}
                              className={`choice-btn ${stateCls}`}
                              onClick={() => handleAnswerQuiz(opt)}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {answered && (
                        <div
                          className={isCorrect ? 'callout-success' : 'callout-error'}
                          style={{ marginTop: '0.9rem' }}
                        >
                          <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.25rem' }}>
                            <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 size={17} color="var(--emerald)" /> Správne!
                                </>
                              ) : (
                                <>
                                  <XCircle size={17} color="var(--rose)" /> Správna odpoveď:{' '}
                                  {q.answer}
                                </>
                              )}
                            </strong>
                            {isLikelyEnglish(q.sentenceEn ? q.sentenceEn.replace('____', q.answer) : q.answer) && (
                              <AudioButton
                                text={
                                  q.sentenceEn
                                    ? q.sentenceEn.replace('____', q.answer.split(' / ')[0])
                                    : q.answer
                                }
                                accent={accent}
                                rate={rate}
                                label="Počuť"
                              />
                            )}
                          </div>
                          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                            {q.explanationSk}
                          </div>

                          <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={handleNextQuizQuestion}
                            >
                              <span>
                                {activeQuiz.idx + 1 >= activeQuiz.questions.length
                                  ? 'Zobraziť vyhodnotenie'
                                  : 'Ďalšia úloha'}
                              </span>
                              <ArrowRight size={15} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* Lesson Footer Navigation */}
          <div className="lesson-footer">
            {prevModule ? (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => selectModule(prevModule.id)}
              >
                <ArrowLeft size={15} aria-hidden="true" />
                <span>
                  {prevModule.code}: {prevModule.themeTagSk}
                </span>
              </button>
            ) : (
              <span />
            )}
            {nextModule && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => selectModule(nextModule.id)}
              >
                <span>
                  Ďalšia lekcia · {nextModule.code}: {nextModule.themeTagSk}
                </span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
