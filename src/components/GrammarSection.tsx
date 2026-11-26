import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  GitCompareArrows,
  GraduationCap,
  HelpCircle,
  Layers,
  Play,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { TENSE_COMBO_PRESETS, TENSE_GUIDES } from '../data/grammarData';
import { ALL_TENSE_EXERCISES, EXERCISES_BY_TENSE } from '../data/tenses';
import { DEEP_THEORY_BY_TENSE } from '../data/theoryAcademy';
import type {
  Accent,
  SpeechRate,
  TenseExercise,
  TenseGuide,
  TenseId,
  TenseProgressMap,
  TenseQuizLaunchRequest,
} from '../types/english';
import { playFeedbackTone, speakText } from '../utils/speech';
import {
  buildChoiceOptions,
  fillSentenceBlank,
  getTenseMastery,
} from '../utils/tenseCheck';
import { AudioButton } from './AudioButton';
import { SentenceLab } from './SentenceLab';
import { TenseTimeline } from './TenseTimeline';
import { TheoryAcademy } from './TheoryAcademy';

type GrammarSubView = 'course' | 'theory' | 'lab';
type RoadmapViewMode = 'steps' | 'time-groups';
type LessonPanelTab = 'meaning' | 'forms' | 'contrast' | 'warmup';

interface GrammarSectionProps {
  accent: Accent;
  rate: SpeechRate;
  sfxEnabled: boolean;
  tenseProgress: TenseProgressMap;
  initialTenseId?: TenseId;
  onLaunchQuiz: (req: Omit<TenseQuizLaunchRequest, 'nonce'>) => void;
  onRecordTenseResult: (exerciseId: string, isCorrect: boolean) => void;
}

const TIME_GROUP_META: {
  category: 'present' | 'past' | 'future';
  labelSk: string;
  badgeCls: string;
  hintSk: string;
}[] = [
  {
    category: 'present',
    labelSk: 'Prítomnosť (a most k prítomnosti)',
    badgeCls: 'badge-emerald',
    hintSk: 'Zvyky, práve teraz a výsledok doteraz',
  },
  {
    category: 'past',
    labelSk: 'Minulosť',
    badgeCls: 'badge-blue',
    hintSk: 'Uzavreté udalosti, rozbehnuté pozadie a predminulosť',
  },
  {
    category: 'future',
    labelSk: 'Budúcnosť',
    badgeCls: 'badge-purple',
    hintSk: 'Spontánne rozhodnutia (will) a hotové plány (going to)',
  },
];

export function GrammarSection({
  accent,
  rate,
  sfxEnabled,
  tenseProgress,
  initialTenseId,
  onLaunchQuiz,
  onRecordTenseResult,
}: GrammarSectionProps) {
  const [subView, setSubView] = useState<GrammarSubView>('course');
  const [roadmapMode, setRoadmapMode] = useState<RoadmapViewMode>('time-groups');
  const [lessonTab, setLessonTab] = useState<LessonPanelTab>('meaning');

  const masteryByTense = useMemo(() => {
    const map = {} as Record<TenseId, ReturnType<typeof getTenseMastery>>;
    for (const guide of TENSE_GUIDES) {
      map[guide.id] = getTenseMastery(guide.id, ALL_TENSE_EXERCISES, tenseProgress);
    }
    return map;
  }, [tenseProgress]);

  const recommendedTenseId = useMemo<TenseId>(() => {
    const firstUnmastered = TENSE_GUIDES.find((g) => masteryByTense[g.id].status !== 'mastered');
    return firstUnmastered ? firstUnmastered.id : TENSE_GUIDES[0].id;
  }, [masteryByTense]);

  const [selectedTenseId, setSelectedTenseId] = useState<TenseId>(
    initialTenseId ?? recommendedTenseId
  );

  const [lastPropTense, setLastPropTense] = useState<TenseId | undefined>(initialTenseId);
  if (initialTenseId && initialTenseId !== lastPropTense) {
    setLastPropTense(initialTenseId);
    setSelectedTenseId(initialTenseId);
    setSubView('course');
    setLessonTab('meaning');
  }

  const [warmupAnswers, setWarmupAnswers] = useState<Record<string, string>>({});

  const activeGuide =
    TENSE_GUIDES.find((g) => g.id === selectedTenseId) ?? TENSE_GUIDES[0];
  const activeIndex = TENSE_GUIDES.findIndex((g) => g.id === activeGuide.id);
  const prevGuide = activeIndex > 0 ? TENSE_GUIDES[activeIndex - 1] : null;
  const nextGuide =
    activeIndex < TENSE_GUIDES.length - 1 ? TENSE_GUIDES[activeIndex + 1] : null;
  const activeMastery = masteryByTense[activeGuide.id];
  const activeCount = EXERCISES_BY_TENSE[activeGuide.id].length;
  const activeDeepTheory = DEEP_THEORY_BY_TENSE[activeGuide.id];

  const recommendedCombo = useMemo(() => {
    if (!activeGuide.recommendedComboId) return null;
    return (
      TENSE_COMBO_PRESETS.find((c) => c.id === activeGuide.recommendedComboId) ?? null
    );
  }, [activeGuide.recommendedComboId]);

  const warmupExercises = useMemo<TenseExercise[]>(() => {
    const bank = EXERCISES_BY_TENSE[activeGuide.id];
    const aff = bank.find((e) => e.polarity === 'aff');
    const neg = bank.find((e) => e.polarity === 'neg');
    const q = bank.find((e) => e.polarity === 'qPos' || e.polarity === 'qNeg');
    return [aff, neg, q].filter((x): x is TenseExercise => Boolean(x));
  }, [activeGuide.id]);

  const totalMasteredTenses = TENSE_GUIDES.filter(
    (g) => masteryByTense[g.id].status === 'mastered'
  ).length;
  const totalMasteredExamples = Object.values(masteryByTense).reduce(
    (sum, m) => sum + m.mastered,
    0
  );

  const handleSelectTense = (id: TenseId) => {
    setSelectedTenseId(id);
    setSubView('course');
    setLessonTab('meaning');
  };

  const handleWarmupPick = (ex: TenseExercise, chosen: string) => {
    if (warmupAnswers[ex.id]) return;
    const isRight = chosen === ex.answer;
    setWarmupAnswers((prev) => ({ ...prev, [ex.id]: chosen }));
    onRecordTenseResult(ex.id, isRight);
    if (sfxEnabled) playFeedbackTone(isRight ? 'correct' : 'wrong');
    speakText(fillSentenceBlank(ex.sentenceWithBlank, ex.answer), { accent, rate });
  };

  const renderTenseStepButton = (g: TenseGuide) => {
    const m = masteryByTense[g.id];
    const isSelected = g.id === activeGuide.id;
    const isRecommended = g.id === recommendedTenseId && m.status !== 'mastered';
    const pct = Math.min(100, Math.round((m.mastered / Math.max(m.total, 1)) * 100));

    return (
      <button
        key={g.id}
        type="button"
        className={`roadmap-step ${isSelected ? 'active' : ''} ${
          m.status === 'mastered' ? 'mastered' : ''
        }`}
        onClick={() => handleSelectTense(g.id)}
        aria-current={isSelected ? 'step' : undefined}
      >
        <div className="roadmap-step-top">
          <span className="roadmap-num">
            {m.status === 'mastered' ? <CheckCircle2 size={14} aria-hidden="true" /> : g.order}
          </span>
          <span className="badge badge-outline">{g.level}</span>
          {isRecommended && (
            <span className="badge badge-amber" style={{ marginLeft: 'auto' }}>
              Odporúčané
            </span>
          )}
        </div>
        <div className="roadmap-step-title">{g.shortTitleSk}</div>
        <div className="roadmap-step-en">
          {g.titleEn} · <span className="mono">{g.formulaQuick}</span>
        </div>
        <div className="roadmap-step-foot">
          <div className="mini-bar" aria-hidden="true">
            <span style={{ width: `${pct}%` }} />
          </div>
          <span className="roadmap-step-count">
            {m.mastered}/{m.total}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div>
      <section className="section-hero">
        <div>
          <h2>Kurz anglických časov krok za krokom (9 časov)</h2>
          <p>
            Všetko o anglických časoch prehľadne na jednom mieste: <strong>9 lekcií časov</strong>{' '}
            (každý s {activeCount} príkladmi), <strong>Teória polopate</strong> pre Slovákov a{' '}
            <strong>Laboratórium viet</strong>.
          </p>
        </div>
        <div className="hero-actions">
          <div
            className="stat-pill"
            title="Čas je zvládnutý po 20 správnych príkladoch s úspešnosťou aspoň 80 %"
          >
            <CheckCircle2 size={14} aria-hidden="true" />
            <span>
              Časy: {totalMasteredTenses}/9 · Príklady: {totalMasteredExamples}/
              {ALL_TENSE_EXERCISES.length}
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              onLaunchQuiz({
                mode: 'single',
                tenses: [activeGuide.id],
                autoStart: false,
              })
            }
          >
            <Play size={16} aria-hidden="true" />
            <span>Prejsť na testy ({ALL_TENSE_EXERCISES.length})</span>
          </button>
        </div>
      </section>

      {/* Clean 3-Part Sub-Navigation (instead of 5 scattered tabs) */}
      <div className="subview-bar" role="tablist" aria-label="Sekcie kurzu časov">
        {[
          {
            id: 'course' as const,
            label: '1. Prehľad a lekcie 9 časov',
            shortLabel: '9 časov',
            Icon: Compass,
          },
          {
            id: 'theory' as const,
            label: '2. Teória polopate (Systém)',
            shortLabel: 'Teória polopate',
            Icon: GraduationCap,
          },
          {
            id: 'lab' as const,
            label: '3. Laboratórium viet',
            shortLabel: 'Laboratórium viet',
            Icon: Sparkles,
          },
        ].map(({ id, label, shortLabel, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={subView === id}
            className={`subview-tab ${subView === id ? 'active' : ''}`}
            onClick={() => setSubView(id)}
          >
            <Icon size={16} aria-hidden="true" />
            <span className="label-full">{label}</span>
            <span className="label-short">{shortLabel}</span>
          </button>
        ))}
      </div>

      {/* === SUBVIEW 1: ORGANIZED 9-TENSE MAP + TABBED LESSON === */}
      {subView === 'course' && (
        <div className="stack">
          {/* Visual 9-Tense Picker: Group by Time OR Order 1 -> 9 */}
          <section className="card roadmap-panel" aria-label="Prehľad 9 časov">
            <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <h3 className="panel-title" style={{ marginBottom: '0.1rem' }}>
                  Vyber si čas na štúdium (1 až 9)
                </h3>
                <span className="small muted">
                  Zoraď si časy vizuálne podľa Prítomnosti / Minulosti / Budúcnosti alebo podľa
                  krokov A1 → B2.
                </span>
              </div>

              <div className="row" style={{ gap: '0.35rem' }}>
                <button
                  type="button"
                  className={`filter-chip ${roadmapMode === 'time-groups' ? 'active' : ''}`}
                  onClick={() => setRoadmapMode('time-groups')}
                >
                  <Layers size={14} aria-hidden="true" />
                  <span>Podľa času (Prít. / Min. / Bud.)</span>
                </button>
                <button
                  type="button"
                  className={`filter-chip ${roadmapMode === 'steps' ? 'active' : ''}`}
                  onClick={() => setRoadmapMode('steps')}
                >
                  <Compass size={14} aria-hidden="true" />
                  <span>Postupnosť 1 → 9</span>
                </button>
              </div>
            </div>

            {roadmapMode === 'steps' ? (
              <div className="roadmap-grid">{TENSE_GUIDES.map(renderTenseStepButton)}</div>
            ) : (
              <div className="time-groups-wrap">
                {TIME_GROUP_META.map((grp) => {
                  const groupGuides = TENSE_GUIDES.filter((g) => g.category === grp.category);
                  return (
                    <div key={grp.category} className="time-group-col">
                      <div className="time-group-head">
                        <span className={`badge ${grp.badgeCls}`}>{grp.labelSk}</span>
                        <span className="small muted">{grp.hintSk}</span>
                      </div>
                      <div className="time-group-list">
                        {groupGuides.map(renderTenseStepButton)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Active Tense Lesson — Cleanly Divided into 4 Focused Tabs */}
          <article id={`tense-${activeGuide.id}`} className="card tense-card">
            <div className="lesson-header">
              <div>
                <div className="row" style={{ marginBottom: '0.35rem' }}>
                  <span className="badge badge-blue">
                    Krok {activeGuide.order} z {TENSE_GUIDES.length}
                  </span>
                  <span className="badge badge-purple">{activeGuide.level}</span>
                  <span className="badge badge-outline">{activeGuide.titleEn}</span>
                  {activeMastery.status === 'mastered' && (
                    <span className="badge badge-emerald">
                      <CheckCircle2 size={12} aria-hidden="true" /> Zvládnuté
                    </span>
                  )}
                </div>
                <h3 className="tense-title">{activeGuide.titleSk}</h3>
                <p className="tense-sub">{activeGuide.subtitleSk}</p>
                <div className="formula-ribbon mono">{activeGuide.formulaQuick}</div>
              </div>

              <div className="lesson-cta-box">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    onLaunchQuiz({
                      mode: 'single',
                      tenses: [activeGuide.id],
                      roundSize: 20,
                      autoStart: true,
                    })
                  }
                >
                  <Play size={16} aria-hidden="true" />
                  <span>Spustiť test ({activeCount} príkladov)</span>
                </button>
                <div className="small muted" style={{ textAlign: 'center' }}>
                  Zvládnuté v teste: <strong>{activeMastery.mastered}/{activeCount}</strong>
                </div>
              </div>
            </div>

            {/* 4 Clean Non-Sticky Lesson Tabs */}
            <div className="lesson-subtabs" role="tablist" aria-label="Časti lekcie času">
              <button
                type="button"
                role="tab"
                aria-selected={lessonTab === 'meaning'}
                className={`filter-chip ${lessonTab === 'meaning' ? 'active' : ''}`}
                onClick={() => setLessonTab('meaning')}
              >
                <span>1. Podstata & Kedy použiť</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={lessonTab === 'forms'}
                className={`filter-chip ${lessonTab === 'forms' ? 'active' : ''}`}
                onClick={() => setLessonTab('forms')}
              >
                <span>2. Tvorba viet (+ / − / ?)</span>
              </button>
              {activeGuide.contrast && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={lessonTab === 'contrast'}
                  className={`filter-chip ${lessonTab === 'contrast' ? 'active' : ''}`}
                  onClick={() => setLessonTab('contrast')}
                >
                  <span>3. Nepliesť si s iným časom</span>
                </button>
              )}
              <button
                type="button"
                role="tab"
                aria-selected={lessonTab === 'warmup'}
                className={`filter-chip ${lessonTab === 'warmup' ? 'active' : ''}`}
                onClick={() => setLessonTab('warmup')}
              >
                <span>
                  {activeGuide.contrast ? '4.' : '3.'} Rýchla rozcvička (3)
                </span>
              </button>
            </div>

            {/* === LESSON TAB 1: MEANING, TIMELINE & DEEP SLOVAK LOGIC === */}
            {lessonTab === 'meaning' && (
              <div className="stack">
                <TenseTimeline
                  tenseId={activeGuide.id}
                  captionSk={activeGuide.timelineCaptionSk}
                />

                <div className="two-col-grid">
                  <div className="card-muted">
                    <h4>
                      <CheckCircle2 size={16} color="var(--emerald)" />
                      <span>Kedy tento čas používame?</span>
                    </h4>
                    <ul>
                      {activeGuide.whenToUseSk.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="callout-info">
                    <h4>
                      <BookOpen size={16} />
                      <span>Vysvetlenie cez slovenčinu</span>
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.88rem' }}>{activeGuide.slovakBridgeSk}</p>
                  </div>
                </div>

                {/* Signal Words */}
                <div className="card-muted">
                  <div
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      marginBottom: '0.45rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Typické slovíčka (signály vo vete):
                  </div>
                  <div className="row">
                    {activeGuide.signalWords.map((sw) => (
                      <span key={sw.en} className="badge badge-blue">
                        {sw.en} ({sw.sk})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deep Academic "Polopate" Theory Box */}
                {activeDeepTheory && (
                  <div className="deep-theory-box">
                    <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.65rem' }}>
                      <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                        <GraduationCap size={18} color="var(--primary)" aria-hidden="true" />
                        <span>Akademická teória polopate: Ako tento čas cíti Angličan</span>
                      </strong>
                      <span className="badge badge-blue">Pre Slovákov</span>
                    </div>

                    <div className="stack">
                      <div className="mental-model-quote">{activeDeepTheory.mentalModelSk}</div>

                      <div className="nuance-grid">
                        {activeDeepTheory.nuancesSk.map((n) => (
                          <div key={n.title} className="nuance-card">
                            <div>
                              <div
                                style={{
                                  fontWeight: 800,
                                  fontSize: '0.9rem',
                                  marginBottom: '0.25rem',
                                }}
                              >
                                {n.title}
                              </div>
                              <p
                                style={{
                                  margin: '0 0 0.5rem',
                                  fontSize: '0.85rem',
                                  color: 'var(--text-secondary)',
                                }}
                              >
                                {n.text}
                              </p>
                            </div>
                            <div className="nuance-ex">
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontWeight: 750, fontSize: '0.88rem' }}>
                                  {n.exampleEn}
                                </div>
                                <div className="small muted">{n.exampleSk}</div>
                              </div>
                              <AudioButton text={n.exampleEn} accent={accent} rate={rate} iconOnly />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.45rem' }}>
                          Slovenský prekladový most (pozor na rovnakú slovenčinu vs. iný anglický
                          čas):
                        </div>
                        <div className="stack-sm">
                          {activeDeepTheory.slovakTranslationTraps.map((row) => (
                            <div key={row.sk} className="bridge-row">
                              <div className="bridge-sk">
                                <span className="lang-tag">SK</span> {row.sk}
                              </div>
                              <div className="bridge-en">
                                <strong style={{ flex: '1 1 180px', minWidth: 0 }}>{row.en}</strong>
                                <AudioButton text={row.en} accent={accent} rate={rate} iconOnly />
                              </div>
                              <div className="small muted">{row.noteSk}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="action-row" style={{ justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setLessonTab('forms')}
                  >
                    <span>Ďalej: Ako tvoriť vety (+ / − / ?)</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* === LESSON TAB 2: FORMING SENTENCES (+ / - / ?+ / ?-) === */}
            {lessonTab === 'forms' && (
              <div className="stack">
                <div>
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.96rem' }}>
                    Všetky 4 formy vety (+, −, ?+, ?−) so zvukom:
                  </h4>
                  <div className="matrix-grid" style={{ margin: 0 }}>
                    {activeGuide.matrix.map((row) => (
                      <div key={row.polarity} className={`matrix-card ${row.polarity}`}>
                        <div className="matrix-head">
                          <span>
                            <span className="mono">{row.badge}</span> {row.labelSk}
                          </span>
                          <AudioButton text={row.en} accent={accent} rate={rate} iconOnly />
                        </div>
                        <div className="mono matrix-formula">{row.formula}</div>
                        <div className="matrix-en">{row.en}</div>
                        {row.enFormal && (
                          <div
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.4rem',
                            }}
                          >
                            <span>Formálne: {row.enFormal}</span>
                            <AudioButton text={row.enFormal} accent={accent} rate={rate} iconOnly />
                          </div>
                        )}
                        <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                          <span className="lang-tag">SK</span> {row.sk}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {row.whySk}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="stack-sm">
                  {activeGuide.formingRulesSk.map((rule) => (
                    <div key={rule.title} className="card-muted">
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem' }}>
                        {rule.title}
                      </div>
                      <ul style={{ color: 'var(--text-secondary)' }}>
                        {rule.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="two-col-grid">
                  <div className="callout-tip">
                    <div className="callout-title">
                      <HelpCircle size={16} />
                      <span>Krátke odpovede na otázky</span>
                    </div>
                    <div style={{ fontSize: '0.86rem', display: 'grid', gap: '0.25rem' }}>
                      <div>
                        Pozitívna: <strong>{activeGuide.shortAnswers.positiveQ}</strong>
                      </div>
                      <div>
                        Negatívna: <strong>{activeGuide.shortAnswers.negativeQ}</strong>
                      </div>
                      <div>
                        Odpovede: <span className="mono">{activeGuide.shortAnswers.yes}</span> /{' '}
                        <span className="mono">{activeGuide.shortAnswers.no}</span>
                      </div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                        {activeGuide.shortAnswers.negAnswerNoteSk}
                      </div>
                    </div>
                  </div>

                  <div className="callout-error">
                    <div className="callout-title">
                      <AlertTriangle size={16} />
                      <span>Pozor na najčastejšiu chybu</span>
                    </div>
                    <div style={{ fontSize: '0.86rem', display: 'grid', gap: '0.25rem' }}>
                      <div style={{ color: 'var(--rose)', textDecoration: 'line-through' }}>
                        ✗ {activeGuide.commonMistakeSk.wrong}
                      </div>
                      <div style={{ color: 'var(--emerald)', fontWeight: 700 }}>
                        ✓ {activeGuide.commonMistakeSk.right}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                        {activeGuide.commonMistakeSk.explanationSk}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="action-row" style={{ justifyContent: 'space-between' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSubView('lab')}
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Vyskúšať v laboratóriu viet</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      setLessonTab(activeGuide.contrast ? 'contrast' : 'warmup')
                    }
                  >
                    <span>
                      {activeGuide.contrast ? 'Ďalej: Porovnanie časov' : 'Ďalej: Rýchla rozcvička'}
                    </span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* === LESSON TAB 3: CONTRAST WITH SIBLING TENSE === */}
            {lessonTab === 'contrast' && activeGuide.contrast && (
              <div className="stack">
                <div className="contrast-box">
                  <div
                    className="row-between"
                    style={{ alignItems: 'center', marginBottom: '0.65rem' }}
                  >
                    <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                      <div className="builder-eyebrow" style={{ marginBottom: '0.1rem' }}>
                        <GitCompareArrows size={15} />
                        <span>Ako si ho nepliesť</span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1.04rem' }}>
                        {activeGuide.contrast.titleSk}
                      </h4>
                      <p
                        style={{
                          margin: '0.2rem 0 0',
                          fontSize: '0.86rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {activeGuide.contrast.summarySk}
                      </p>
                    </div>
                    {recommendedCombo && (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          onLaunchQuiz({
                            mode: 'combo',
                            comboId: recommendedCombo.id,
                            tenses: recommendedCombo.tenses,
                            roundSize: 20,
                            autoStart: true,
                          })
                        }
                      >
                        <GitCompareArrows size={15} aria-hidden="true" />
                        <span>Test tejto dvojice</span>
                      </button>
                    )}
                  </div>

                  <div className="stack-sm">
                    {activeGuide.contrast.pairs.map((pair, idx) => (
                      <div key={idx} className="contrast-pair-wrap">
                        <div className="two-col-grid">
                          <div className="contrast-side">
                            <span className="badge badge-blue">{pair.leftLabel}</span>
                            <div
                              className="row-between"
                              style={{ alignItems: 'center', marginTop: '0.35rem' }}
                            >
                              <strong style={{ flex: '1 1 160px', minWidth: 0 }}>
                                {pair.leftEn}
                              </strong>
                              <AudioButton text={pair.leftEn} accent={accent} rate={rate} iconOnly />
                            </div>
                            <div className="small muted">{pair.leftSk}</div>
                          </div>
                          <div className="contrast-side">
                            <span className="badge badge-purple">{pair.rightLabel}</span>
                            <div
                              className="row-between"
                              style={{ alignItems: 'center', marginTop: '0.35rem' }}
                            >
                              <strong style={{ flex: '1 1 160px', minWidth: 0 }}>
                                {pair.rightEn}
                              </strong>
                              <AudioButton
                                text={pair.rightEn}
                                accent={accent}
                                rate={rate}
                                iconOnly
                              />
                            </div>
                            <div className="small muted">{pair.rightSk}</div>
                          </div>
                        </div>
                        <div className="contrast-diff">{pair.differenceSk}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="action-row" style={{ justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setLessonTab('warmup')}
                  >
                    <span>Ďalej: Rýchla rozcvička (3 úlohy)</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* === LESSON TAB 4: QUICK 3-ITEM WARMUP === */}
            {lessonTab === 'warmup' && (
              <section className="warmup-box" aria-label="Rýchla rozcvička v lekcii">
                <div
                  className="row-between"
                  style={{ alignItems: 'center', marginBottom: '0.65rem' }}
                >
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>
                      Rýchla rozcvička (3 ukážky z {activeGuide.titleEn})
                    </h4>
                    <span className="small muted">
                      Vyskúšaj si tento čas hneď na 3 príkladoch pred ostrým testom.
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      onLaunchQuiz({
                        mode: 'single',
                        tenses: [activeGuide.id],
                        roundSize: 20,
                        autoStart: true,
                      })
                    }
                  >
                    <span>Spustiť celý test ({activeCount} príkladov)</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>

                <div className="stack-sm">
                  {warmupExercises.map((ex, idx) => {
                    const chosen = warmupAnswers[ex.id];
                    const opts = buildChoiceOptions(ex, 7);
                    const isRight = chosen === ex.answer;
                    const full = fillSentenceBlank(ex.sentenceWithBlank, ex.answer);

                    return (
                      <div key={ex.id} className="warmup-item">
                        <div
                          className="row-between"
                          style={{ alignItems: 'center', marginBottom: '0.35rem' }}
                        >
                          <span className="small muted" style={{ fontWeight: 700 }}>
                            Ukážka {idx + 1} · ({ex.verbCue})
                          </span>
                          <span className="badge badge-outline">
                            {ex.polarity === 'aff'
                              ? '+ Kladná'
                              : ex.polarity === 'neg'
                                ? '− Zápor'
                                : '? Otázka'}
                          </span>
                        </div>
                        <div className="warmup-sentence">{ex.sentenceWithBlank}</div>
                        <div className="warmup-choices">
                          {opts.map((opt) => {
                            let cls = '';
                            if (chosen) {
                              if (opt === ex.answer) cls = 'correct';
                              else if (opt === chosen) cls = 'wrong';
                            }
                            return (
                              <button
                                key={opt}
                                type="button"
                                disabled={Boolean(chosen)}
                                className={`warmup-opt ${cls}`}
                                onClick={() => handleWarmupPick(ex, opt)}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {chosen && (
                          <div
                            className={isRight ? 'callout-success' : 'callout-error'}
                            style={{ marginTop: '0.55rem', padding: '0.65rem 0.85rem' }}
                          >
                            <div className="row-between" style={{ alignItems: 'center' }}>
                              <strong
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  flex: '1 1 180px',
                                  minWidth: 0,
                                }}
                              >
                                {isRight ? (
                                  <CheckCircle2 size={15} color="var(--emerald)" />
                                ) : (
                                  <XCircle size={15} color="var(--rose)" />
                                )}
                                <span>{full}</span>
                              </strong>
                              <AudioButton text={full} accent={accent} rate={rate} iconOnly />
                            </div>
                            <div className="small" style={{ marginTop: '0.2rem' }}>
                              {ex.translationSk}
                            </div>
                            <div className="small muted" style={{ marginTop: '0.15rem' }}>
                              {ex.explanationSk}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Step-by-Step Footer Navigation */}
            <div className="lesson-footer">
              {prevGuide ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    handleSelectTense(prevGuide.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>
                    {prevGuide.order}. {prevGuide.shortTitleSk}
                  </span>
                </button>
              ) : (
                <div />
              )}

              {nextGuide ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleSelectTense(nextGuide.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>
                    Ďalší čas: {nextGuide.order}. {nextGuide.shortTitleSk}
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    onLaunchQuiz({
                      mode: 'all',
                      tenses: TENSE_GUIDES.map((g) => g.id),
                      roundSize: 50,
                      autoStart: true,
                    })
                  }
                >
                  <span>Spustiť veľký mix všetkých 9 časov</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </article>
        </div>
      )}

      {/* === SUBVIEW 2: POLOPATE THEORY ACADEMY FOR SLOVAKS === */}
      {subView === 'theory' && (
        <TheoryAcademy
          accent={accent}
          rate={rate}
          onSelectLesson={(tid) => {
            handleSelectTense(tid);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLaunchQuiz={onLaunchQuiz}
        />
      )}

      {/* === SUBVIEW 3: INTERACTIVE SENTENCE LAB === */}
      {subView === 'lab' && (
        <SentenceLab accent={accent} rate={rate} initialTenseId={activeGuide.id} />
      )}
    </div>
  );
}
