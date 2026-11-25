import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  GitCompareArrows,
  HelpCircle,
  MessageCircleQuestion,
  Play,
  Sparkles,
  Table2,
  XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  QUESTION_MASTER_GUIDE,
  TENSE_COMBO_PRESETS,
  TENSE_GUIDES,
} from '../data/grammarData';
import { ALL_TENSE_EXERCISES, EXERCISES_BY_TENSE } from '../data/tenses';
import type {
  Accent,
  SpeechRate,
  TenseExercise,
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

type GrammarSubView = 'course' | 'lab' | 'map' | 'questions';

interface GrammarSectionProps {
  accent: Accent;
  rate: SpeechRate;
  sfxEnabled: boolean;
  tenseProgress: TenseProgressMap;
  initialTenseId?: TenseId;
  onLaunchQuiz: (req: Omit<TenseQuizLaunchRequest, 'nonce'>) => void;
  onRecordTenseResult: (exerciseId: string, isCorrect: boolean) => void;
}

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

  // Sync when navigated here from a quiz explanation link
  const [lastPropTense, setLastPropTense] = useState<TenseId | undefined>(initialTenseId);
  if (initialTenseId && initialTenseId !== lastPropTense) {
    setLastPropTense(initialTenseId);
    setSelectedTenseId(initialTenseId);
    setSubView('course');
  }

  // Mini 3-question warm-up inside each lesson
  const [warmupAnswers, setWarmupAnswers] = useState<Record<string, string>>({});

  const activeGuide =
    TENSE_GUIDES.find((g) => g.id === selectedTenseId) ?? TENSE_GUIDES[0];
  const activeIndex = TENSE_GUIDES.findIndex((g) => g.id === activeGuide.id);
  const prevGuide = activeIndex > 0 ? TENSE_GUIDES[activeIndex - 1] : null;
  const nextGuide =
    activeIndex < TENSE_GUIDES.length - 1 ? TENSE_GUIDES[activeIndex + 1] : null;
  const activeMastery = masteryByTense[activeGuide.id];

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
  };

  const handleWarmupPick = (ex: TenseExercise, chosen: string) => {
    if (warmupAnswers[ex.id]) return;
    const isRight = chosen === ex.answer;
    setWarmupAnswers((prev) => ({ ...prev, [ex.id]: chosen }));
    onRecordTenseResult(ex.id, isRight);
    if (sfxEnabled) playFeedbackTone(isRight ? 'correct' : 'wrong');
    speakText(fillSentenceBlank(ex.sentenceWithBlank, ex.answer), { accent, rate });
  };

  return (
    <div>
      <section className="section-hero">
        <div>
          <h2>Kurz anglických časov krok za krokom (9 časov)</h2>
          <p>
            Od základov A1 až po pokročilé časy B2 v logickej postupnosti. Každý čas má vizuálnu
            časovú os, slovenské vysvetlenie, krátku rozcvičku a 100 cvičných príkladov.
          </p>
        </div>
        <div className="hero-actions">
          <div className="stat-pill" title="Čas je zvládnutý po 20 správnych príkladoch s úspešnosťou aspoň 80 %">
            <CheckCircle2 size={14} aria-hidden="true" />
            <span>
              Časy: {totalMasteredTenses}/9 · Príklady: {totalMasteredExamples}/{ALL_TENSE_EXERCISES.length}
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
            <span>Testy z časov</span>
          </button>
        </div>
      </section>

      {/* Sub-navigation inside Tenses */}
      <div className="tense-tabs" role="tablist" aria-label="Sekcie kurzu časov">
        {[
          { id: 'course' as const, label: 'Kurz (9 krokov)', Icon: Compass },
          { id: 'lab' as const, label: 'Laboratórium viet', Icon: Sparkles },
          { id: 'map' as const, label: 'Mapa 9 časov', Icon: Table2 },
          { id: 'questions' as const, label: 'Opytovanie (+ / −)', Icon: MessageCircleQuestion },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={subView === id}
            className={`filter-chip ${subView === id ? 'active' : ''}`}
            onClick={() => setSubView(id)}
          >
            <Icon size={15} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* === SUBVIEW 1: GUIDED 9-STEP COURSE === */}
      {subView === 'course' && (
        <div className="stack">
          {/* 9-Step Progression Roadmap */}
          <section className="card roadmap-panel" aria-label="Postupnosť 9 časov">
            <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.7rem' }}>
              <div>
                <h3 className="panel-title" style={{ marginBottom: '0.1rem' }}>
                  Tvoja učebná cesta (vyber si krok)
                </h3>
                <span className="small muted">
                  Odporúčaný postup: od 1 po 9, alebo skoč rovno na čas, ktorý chceš precvičiť.
                </span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  onLaunchQuiz({
                    mode: 'all',
                    tenses: TENSE_GUIDES.map((g) => g.id),
                    roundSize: 20,
                    autoStart: true,
                  })
                }
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>Finálny mix všetkých 9</span>
              </button>
            </div>

            <div className="roadmap-grid">
              {TENSE_GUIDES.map((g) => {
                const m = masteryByTense[g.id];
                const isSelected = g.id === activeGuide.id;
                const isRecommended = g.id === recommendedTenseId && m.status !== 'mastered';
                const pct = Math.min(100, Math.round((m.mastered / Math.max(m.total, 1)) * 100));

                return (
                  <button
                    key={g.id}
                    type="button"
                    className={`roadmap-step ${isSelected ? 'active' : ''} ${m.status === 'mastered' ? 'mastered' : ''}`}
                    onClick={() => handleSelectTense(g.id)}
                    aria-current={isSelected ? 'step' : undefined}
                  >
                    <div className="roadmap-step-top">
                      <span className="roadmap-num">
                        {m.status === 'mastered' ? (
                          <CheckCircle2 size={14} aria-hidden="true" />
                        ) : (
                          g.order
                        )}
                      </span>
                      <span className="badge badge-outline">{g.level}</span>
                      {isRecommended && (
                        <span className="badge badge-amber" style={{ marginLeft: 'auto' }}>
                          Ďalej
                        </span>
                      )}
                    </div>
                    <div className="roadmap-step-title">{g.shortTitleSk}</div>
                    <div className="roadmap-step-en">{g.titleEn}</div>
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
              })}
            </div>
          </section>

          {/* Active Lesson Card */}
          <article id={`tense-${activeGuide.id}`} className="card tense-card">
            <div className="lesson-header">
              <div>
                <div className="row" style={{ marginBottom: '0.4rem' }}>
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
                  <span>Precvičiť tento čas (100)</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSubView('lab')}
                >
                  <Sparkles size={15} aria-hidden="true" />
                  <span>Otvoriť v laboratóriu viet</span>
                </button>
              </div>
            </div>

            {/* Visual Timeline */}
            <TenseTimeline
              tenseId={activeGuide.id}
              captionSk={activeGuide.timelineCaptionSk}
            />

            {/* When to use + Slovak bridge */}
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

            {/* Forming Rules */}
            <div style={{ display: 'grid', gap: '0.65rem' }}>
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

            {/* Signal Words */}
            <div className="row">
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Typické slovíčka (signály):
              </span>
              {activeGuide.signalWords.map((sw) => (
                <span key={sw.en} className="badge badge-blue">
                  {sw.en} ({sw.sk})
                </span>
              ))}
            </div>

            {/* 4-Polarity Matrix (+, -, ?+, ?-) */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.96rem' }}>
                Tvorba všetkých 4 foriem (+, −, ?+, ?−) so zvukom:
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

            {/* Contrast Box: Don't confuse with sibling tense */}
            {activeGuide.contrast && (
              <div className="contrast-box">
                <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.6rem' }}>
                  <div>
                    <div className="builder-eyebrow" style={{ marginBottom: '0.1rem' }}>
                      <GitCompareArrows size={15} />
                      <span>Ako si ho nepliesť</span>
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.02rem' }}>
                      {activeGuide.contrast.titleSk}
                    </h4>
                    <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {activeGuide.contrast.summarySk}
                    </p>
                  </div>
                  {recommendedCombo && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
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
                      <span>Precvičiť túto dvojicu</span>
                    </button>
                  )}
                </div>

                <div className="stack-sm">
                  {activeGuide.contrast.pairs.map((pair, idx) => (
                    <div key={idx} className="contrast-pair-wrap">
                      <div className="two-col-grid">
                        <div className="contrast-side">
                          <span className="badge badge-blue">{pair.leftLabel}</span>
                          <div className="row-between" style={{ alignItems: 'center', marginTop: '0.35rem' }}>
                            <strong>{pair.leftEn}</strong>
                            <AudioButton text={pair.leftEn} accent={accent} rate={rate} iconOnly />
                          </div>
                          <div className="small muted">{pair.leftSk}</div>
                        </div>
                        <div className="contrast-side">
                          <span className="badge badge-purple">{pair.rightLabel}</span>
                          <div className="row-between" style={{ alignItems: 'center', marginTop: '0.35rem' }}>
                            <strong>{pair.rightEn}</strong>
                            <AudioButton text={pair.rightEn} accent={accent} rate={rate} iconOnly />
                          </div>
                          <div className="small muted">{pair.rightSk}</div>
                        </div>
                      </div>
                      <div className="contrast-diff">{pair.differenceSk}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Short Answers & Common Mistake */}
            <div className="two-col-grid">
              <div className="callout-tip">
                <div className="callout-title">
                  <HelpCircle size={16} />
                  <span>Ako odpovedať na kladnú a zápornú otázku</span>
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
                  <span>Pozor na typickú chybu</span>
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

            {/* Quick 3-Example Interactive Warm-Up inside the Lesson */}
            <section className="warmup-box" aria-label="Rýchla rozcvička v lekcii">
              <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.65rem' }}>
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
                  <span>Spustiť celý test (100 príkladov)</span>
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
                      <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.35rem' }}>
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
                        <div className={isRight ? 'callout-success' : 'callout-error'} style={{ marginTop: '0.55rem', padding: '0.65rem 0.85rem' }}>
                          <div className="row-between" style={{ alignItems: 'center' }}>
                            <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              {isRight ? (
                                <CheckCircle2 size={15} color="var(--emerald)" />
                              ) : (
                                <XCircle size={15} color="var(--rose)" />
                              )}
                              {full}
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
                    Ďalší krok: {nextGuide.order}. {nextGuide.shortTitleSk}
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

      {/* === SUBVIEW 2: INTERACTIVE SENTENCE LAB === */}
      {subView === 'lab' && (
        <SentenceLab accent={accent} rate={rate} initialTenseId={activeGuide.id} />
      )}

      {/* === SUBVIEW 3: QUICK REFERENCE MAP OF ALL 9 TENSES === */}
      {subView === 'map' && (
        <div className="card">
          <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.85rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>
                Rýchla mapa všetkých 9 časov na jednom mieste
              </h3>
              <span className="small muted">
                Ťukni na ktorýkoľvek čas pre otvorenie lekcie alebo priame spustenie 100 príkladov.
              </span>
            </div>
          </div>

          <div className="verb-table-wrap">
            <table className="verb-table">
              <thead>
                <tr>
                  <th>Krok & Čas</th>
                  <th>Kladná (+)</th>
                  <th>Zápor (−)</th>
                  <th>Otázka (?+ / ?−)</th>
                  <th>Pokrok</th>
                  <th>Akcia</th>
                </tr>
              </thead>
              <tbody>
                {TENSE_GUIDES.map((g) => {
                  const m = masteryByTense[g.id];
                  return (
                    <tr key={g.id}>
                      <td>
                        <button
                          type="button"
                          className="table-link-btn"
                          onClick={() => handleSelectTense(g.id)}
                        >
                          <strong>
                            {g.order}. {g.shortTitleSk}
                          </strong>
                          <div className="table-sub">
                            {g.titleEn} · {g.level}
                          </div>
                        </button>
                      </td>
                      <td className="mono">{g.matrix[0].formula.replace('Podmet + ', '')}</td>
                      <td className="mono">{g.matrix[1].formula.replace('Podmet + ', '')}</td>
                      <td className="mono">{g.matrix[2].formula}</td>
                      <td>
                        <span className={`badge ${m.status === 'mastered' ? 'badge-emerald' : 'badge-blue'}`}>
                          {m.mastered}/{m.total}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() =>
                            onLaunchQuiz({
                              mode: 'single',
                              tenses: [g.id],
                              roundSize: 20,
                              autoStart: true,
                            })
                          }
                        >
                          Test (100)
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* === SUBVIEW 4: POSITIVE & NEGATIVE QUESTIONS MASTER GUIDE === */}
      {subView === 'questions' && (
        <article
          className="card"
          style={{
            display: 'grid',
            gap: '1rem',
            border: '2px solid color-mix(in srgb, var(--amber) 40%, var(--border-subtle))',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--amber)',
                fontWeight: 800,
                fontSize: '0.84rem',
                marginBottom: '0.25rem',
              }}
            >
              <MessageCircleQuestion size={17} />
              <span>Osobitný návod na opytovanie</span>
            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.45rem' }}>
              {QUESTION_MASTER_GUIDE.titleSk}
            </h3>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--text-secondary)', fontSize: '0.93rem' }}>
              {QUESTION_MASTER_GUIDE.introSk}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {QUESTION_MASTER_GUIDE.goldenRules.map((rule) => (
              <div key={rule.title} className="card-muted" style={{ display: 'grid', gap: '0.6rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.96rem' }}>{rule.title}</div>
                <p style={{ margin: 0, fontSize: '0.89rem', color: 'var(--text-secondary)' }}>
                  {rule.descriptionSk}
                </p>
                <div className="two-col-grid">
                  <div
                    className="card"
                    style={{
                      padding: '0.75rem 0.9rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <div>
                      <span className="badge badge-blue" style={{ marginBottom: '0.25rem' }}>
                        Pozitívna / príklad 1
                      </span>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{rule.posExample}</div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                        {rule.posSk}
                      </div>
                    </div>
                    <AudioButton text={rule.posExample} accent={accent} rate={rate} iconOnly />
                  </div>

                  <div
                    className="card"
                    style={{
                      padding: '0.75rem 0.9rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <div>
                      <span className="badge badge-amber" style={{ marginBottom: '0.25rem' }}>
                        Negatívna / príklad 2
                      </span>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{rule.negExample}</div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                        {rule.negSk}
                      </div>
                    </div>
                    <AudioButton text={rule.negExample} accent={accent} rate={rate} iconOnly />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                onLaunchQuiz({
                  mode: 'all',
                  tenses: TENSE_GUIDES.map((g) => g.id),
                  roundSize: 20,
                  autoStart: false,
                })
              }
            >
              <span>Precvičiť si otázky v teste časov</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </article>
      )}
    </div>
  );
}
