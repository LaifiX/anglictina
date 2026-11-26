import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  GitCompareArrows,
  HelpCircle,
  Keyboard,
  Layers,
  ListChecks,
  Play,
  RotateCcw,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Trophy,
  XCircle,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  TENSE_COMBO_PRESETS,
  TENSE_GUIDES,
  TENSE_GUIDE_MAP,
  TENSE_ORDER,
} from '../data/grammarData';
import { ALL_TENSE_EXERCISES, EXERCISES_BY_TENSE } from '../data/tenses';
import type {
  Accent,
  SentencePolarity,
  SpeechRate,
  TenseAnswerMode,
  TenseExercise,
  TenseId,
  TensePolarityFilter,
  TenseProgressMap,
  TenseQuizLaunchRequest,
} from '../types/english';
import { playFeedbackTone, speakText } from '../utils/speech';
import {
  buildChoiceOptions,
  fillSentenceBlank,
  getTenseMastery,
  isTenseAnswerCorrect,
  selectTenseRound,
} from '../utils/tenseCheck';
import { AudioButton } from './AudioButton';

type SelectionMode = 'single' | 'combo' | 'custom' | 'all';

interface GrammarQuizProps {
  accent: Accent;
  rate: SpeechRate;
  sfxEnabled: boolean;
  tenseProgress: TenseProgressMap;
  launchRequest: TenseQuizLaunchRequest | null;
  onRecordTenseResult: (exerciseId: string, isCorrect: boolean) => void;
  onResetTenseProgress: () => void;
  onOpenTenseLesson: (tenseId: TenseId) => void;
}

const POLARITY_BADGE: Record<SentencePolarity, { badge: string; label: string }> = {
  aff: { badge: '+', label: 'Kladná veta' },
  neg: { badge: '−', label: 'Záporná veta' },
  qPos: { badge: '?+', label: 'Kladná otázka' },
  qNeg: { badge: '?−', label: 'Záporná otázka' },
};

const POLARITY_FILTERS: { id: TensePolarityFilter; label: string }[] = [
  { id: 'all', label: 'Všetky formy' },
  { id: 'aff', label: '+ Kladné' },
  { id: 'neg', label: '− Záporné' },
  { id: 'questions', label: '? Otázky' },
  { id: 'qNeg', label: '?− Záporné otázky' },
];

const ANSWER_MODES: { id: TenseAnswerMode; label: string; desc: string }[] = [
  { id: 'choice', label: 'Výber zo 4 možností', desc: 'Pohodlné na mobil aj rýchle opakovanie' },
  { id: 'type', label: 'Dopisovanie do vety', desc: 'Píšeš správny tvar — prísnejší tréning' },
  { id: 'mixed', label: 'Striedavo (Mix)', desc: 'Strieda výber z možností a dopisovanie' },
];

const ROUND_SIZES = [10, 20, 50, 100, 250];

function matchesPolarity(ex: TenseExercise, filter: TensePolarityFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'questions') return ex.polarity === 'qPos' || ex.polarity === 'qNeg';
  return ex.polarity === filter;
}

function buildMaskHint(answer: string): string {
  return answer
    .split(' ')
    .map((word) => {
      if (word.length <= 2) return word[0] + '…';
      return word.slice(0, 2) + '•'.repeat(Math.min(word.length - 2, 5));
    })
    .join(' ');
}

export function GrammarQuiz({
  accent,
  rate,
  sfxEnabled,
  tenseProgress,
  launchRequest,
  onRecordTenseResult,
  onResetTenseProgress,
  onOpenTenseLesson,
}: GrammarQuizProps) {
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('single');
  const [singleTense, setSingleTense] = useState<TenseId>('present-simple');
  const [selectedComboId, setSelectedComboId] = useState<string>(TENSE_COMBO_PRESETS[0].id);
  const [customTenses, setCustomTenses] = useState<TenseId[]>([
    'present-simple',
    'present-continuous',
    'past-simple',
  ]);
  const [answerMode, setAnswerMode] = useState<TenseAnswerMode>('choice');
  const [polarityFilter, setPolarityFilter] = useState<TensePolarityFilter>('all');
  const [roundSize, setRoundSize] = useState<number>(20);
  const [prioritizeSmart, setPrioritizeSmart] = useState<boolean>(true);
  const [confirmReset, setConfirmReset] = useState(false);

  // Active test round state
  const [stage, setStage] = useState<'setup' | 'running' | 'summary'>('setup');
  const [roundLabel, setRoundLabel] = useState<string>('');
  const [roundTenses, setRoundTenses] = useState<TenseId[]>([]);
  const [roundExercises, setRoundExercises] = useState<TenseExercise[]>([]);
  const [roundSeed, setRoundSeed] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [answered, setAnswered] = useState<boolean>(false);
  const [chosenOption, setChosenOption] = useState<string | null>(null);
  const [typedValue, setTypedValue] = useState<string>('');
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0);
  const [isMistakeDrill, setIsMistakeDrill] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastNonceRef = useRef<number | null>(null);

  const masteryByTense = useMemo(() => {
    const map = {} as Record<TenseId, ReturnType<typeof getTenseMastery>>;
    for (const id of TENSE_ORDER) {
      map[id] = getTenseMastery(id, ALL_TENSE_EXERCISES, tenseProgress);
    }
    return map;
  }, [tenseProgress]);

  const savedMistakeExercises = useMemo(() => {
    return ALL_TENSE_EXERCISES.filter((ex) => {
      const rec = tenseProgress[ex.id];
      return Boolean(rec && !rec.lastCorrect);
    });
  }, [tenseProgress]);

  const activeSelectedTenses = useMemo<TenseId[]>(() => {
    if (selectionMode === 'single') return [singleTense];
    if (selectionMode === 'combo') {
      return (
        TENSE_COMBO_PRESETS.find((c) => c.id === selectedComboId)?.tenses ??
        TENSE_COMBO_PRESETS[0].tenses
      );
    }
    if (selectionMode === 'custom') return customTenses;
    return TENSE_ORDER;
  }, [selectionMode, singleTense, selectedComboId, customTenses]);

  const candidatePool = useMemo(() => {
    const allowed = new Set(activeSelectedTenses);
    return ALL_TENSE_EXERCISES.filter(
      (ex) => allowed.has(ex.tenseId) && matchesPolarity(ex, polarityFilter)
    );
  }, [activeSelectedTenses, polarityFilter]);

  const startRound = (opts: {
    exercises: TenseExercise[];
    label: string;
    tenses: TenseId[];
    mistakeDrill?: boolean;
  }) => {
    if (opts.exercises.length === 0) return;
    setRoundExercises(opts.exercises);
    setRoundLabel(opts.label);
    setRoundTenses(opts.tenses);
    setIsMistakeDrill(Boolean(opts.mistakeDrill));
    setRoundSeed((s) => s + 1);
    setIndex(0);
    setResults({});
    setAnswered(false);
    setChosenOption(null);
    setTypedValue('');
    setHintLevel(0);
    setStage('running');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const launchFromCurrentConfig = (override?: {
    mode?: SelectionMode;
    tenses?: TenseId[];
    comboId?: string;
    size?: number;
  }) => {
    const effMode = override?.mode ?? selectionMode;
    const effSize = override?.size ?? roundSize;
    let effTenses: TenseId[] = override?.tenses ?? activeSelectedTenses;
    let label = '';

    if (effMode === 'single') {
      const tid = effTenses[0] ?? singleTense;
      effTenses = [tid];
      const guide = TENSE_GUIDE_MAP[tid];
      label = `${guide.order}. ${guide.shortTitleSk} (${guide.titleEn})`;
    } else if (effMode === 'combo') {
      const combo =
        TENSE_COMBO_PRESETS.find((c) => c.id === (override?.comboId ?? selectedComboId)) ??
        TENSE_COMBO_PRESETS[0];
      effTenses = combo.tenses;
      label = combo.titleSk;
    } else if (effMode === 'custom') {
      label = `Vlastná kombinácia (${effTenses.length} časov)`;
    } else {
      effTenses = TENSE_ORDER;
      label = 'Finálny mix všetkých 9 časov';
    }

    const allowed = new Set(effTenses);
    const pool = ALL_TENSE_EXERCISES.filter(
      (ex) => allowed.has(ex.tenseId) && matchesPolarity(ex, polarityFilter)
    );
    const picked = selectTenseRound({
      pool,
      count: effSize,
      progress: tenseProgress,
      prioritizeSmart,
      selectedTenses: effTenses,
    });

    startRound({
      exercises: picked,
      label,
      tenses: effTenses,
      mistakeDrill: false,
    });
  };

  // Handle incoming launch requests from GrammarSection ("Precvičiť tento čas", "Porovnať dvojicu", etc.)
  useEffect(() => {
    if (!launchRequest || launchRequest.nonce === lastNonceRef.current) return;
    lastNonceRef.current = launchRequest.nonce;

    if (launchRequest.answerMode) setAnswerMode(launchRequest.answerMode);
    if (launchRequest.roundSize) setRoundSize(launchRequest.roundSize);

    if (launchRequest.mode === 'mistakes') {
      if (savedMistakeExercises.length > 0) {
        const picked = selectTenseRound({
          pool: savedMistakeExercises,
          count: Math.min(50, savedMistakeExercises.length),
          progress: tenseProgress,
          prioritizeSmart: false,
          selectedTenses: TENSE_ORDER,
        });
        startRound({
          exercises: picked,
          label: 'Opakovanie uložených chýb',
          tenses: Array.from(new Set(picked.map((p) => p.tenseId))),
          mistakeDrill: true,
        });
      }
      return;
    }

    setSelectionMode(launchRequest.mode);
    if (launchRequest.mode === 'single' && launchRequest.tenses[0]) {
      setSingleTense(launchRequest.tenses[0]);
    } else if (launchRequest.mode === 'combo' && launchRequest.comboId) {
      setSelectedComboId(launchRequest.comboId);
    } else if (launchRequest.mode === 'custom' && launchRequest.tenses.length > 0) {
      setCustomTenses(launchRequest.tenses);
    }

    if (launchRequest.autoStart) {
      launchFromCurrentConfig({
        mode: launchRequest.mode,
        tenses: launchRequest.tenses,
        comboId: launchRequest.comboId,
        size: launchRequest.roundSize ?? roundSize,
      });
    } else {
      setStage('setup');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchRequest]);

  const current = roundExercises[index];
  const isMixedTensesRound = roundTenses.length > 1 || isMistakeDrill;

  const currentQuestionMode: 'choice' | 'type' = useMemo(() => {
    if (answerMode === 'choice') return 'choice';
    if (answerMode === 'type') return 'type';
    // Alternate smoothly in mixed mode
    return index % 2 === 0 ? 'choice' : 'type';
  }, [answerMode, index]);

  const currentOptions = useMemo(() => {
    if (!current) return [];
    return buildChoiceOptions(current, roundSeed);
  }, [current, roundSeed]);

  // Focus text input automatically on typing items (desktop/non-touch friendly)
  useEffect(() => {
    if (stage === 'running' && !answered && currentQuestionMode === 'type') {
      inputRef.current?.focus();
    }
  }, [stage, answered, currentQuestionMode, index]);

  const finalizeAnswer = (isRight: boolean, pickedLabel?: string) => {
    if (!current || answered) return;
    setAnswered(true);
    if (pickedLabel !== undefined) setChosenOption(pickedLabel);
    setResults((prev) => ({ ...prev, [current.id]: isRight }));
    onRecordTenseResult(current.id, isRight);

    if (sfxEnabled) playFeedbackTone(isRight ? 'correct' : 'wrong');
    const full = fillSentenceBlank(current.sentenceWithBlank, current.answer);
    speakText(full, { accent, rate });
  };

  const handleChooseOption = (opt: string) => {
    if (!current || answered) return;
    finalizeAnswer(opt === current.answer, opt);
  };

  const handleSubmitTyped = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!current || answered) return;
    if (!typedValue.trim()) return;
    const ok = isTenseAnswerCorrect(current, typedValue);
    finalizeAnswer(ok);
  };

  const handleRevealAnswer = () => {
    if (!current || answered) return;
    finalizeAnswer(false);
  };

  const handleNext = () => {
    if (index + 1 >= roundExercises.length) {
      setStage('summary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIndex((i) => i + 1);
      setAnswered(false);
      setChosenOption(null);
      setTypedValue('');
      setHintLevel(0);
    }
  };

  // Keyboard shortcuts during running quiz (1-4 for choices, Enter for next)
  const keyHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  keyHandlerRef.current = (e: KeyboardEvent) => {
    if (stage !== 'running' || !current || e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target as HTMLElement | null;
    const isInput = Boolean(target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName));

    if (!answered && currentQuestionMode === 'choice' && !isInput) {
      const n = Number(e.key);
      if (n >= 1 && n <= currentOptions.length) {
        e.preventDefault();
        handleChooseOption(currentOptions[n - 1]);
      }
    } else if (answered && e.key === 'Enter' && !(target instanceof HTMLButtonElement)) {
      e.preventDefault();
      handleNext();
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => keyHandlerRef.current(e);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  const toggleCustomTense = (id: TenseId) => {
    setCustomTenses((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const correctCount = Object.values(results).filter(Boolean).length;
  const answeredCount = Object.keys(results).length;
  const currentIsRight = current ? results[current.id] === true : false;
  const roundMistakes = useMemo(
    () => roundExercises.filter((ex) => results[ex.id] === false),
    [roundExercises, results]
  );

  // Per-tense breakdown on summary screen
  const summaryBreakdown = useMemo(() => {
    const counts = new Map<TenseId, { total: number; correct: number }>();
    for (const ex of roundExercises) {
      const entry = counts.get(ex.tenseId) ?? { total: 0, correct: 0 };
      entry.total += 1;
      if (results[ex.id]) entry.correct += 1;
      counts.set(ex.tenseId, entry);
    }
    return TENSE_ORDER.filter((id) => counts.has(id)).map((id) => ({
      guide: TENSE_GUIDE_MAP[id],
      ...counts.get(id)!,
    }));
  }, [roundExercises, results]);

  const totalMasteredAll = useMemo(
    () => Object.values(masteryByTense).reduce((acc, m) => acc + m.mastered, 0),
    [masteryByTense]
  );

  const renderSentenceWithBlank = (ex: TenseExercise, showFilled: boolean) => {
    const parts = ex.sentenceWithBlank.split('____');
    if (parts.length < 2) return ex.sentenceWithBlank;
    const filledWord = fillSentenceBlank(ex.sentenceWithBlank, ex.answer);
    if (showFilled) {
      return <span>{filledWord}</span>;
    }
    return (
      <>
        {parts[0]}
        <span className="blank-slot" aria-label="doplň tvar">
          ____
        </span>
        {parts.slice(1).join('____')}
      </>
    );
  };

  const singleNextGuide = useMemo(() => {
    if (roundTenses.length !== 1 || isMistakeDrill) return null;
    const idx = TENSE_ORDER.indexOf(roundTenses[0]);
    if (idx >= 0 && idx < TENSE_ORDER.length - 1) {
      return TENSE_GUIDE_MAP[TENSE_ORDER[idx + 1]];
    }
    return null;
  }, [roundTenses, isMistakeDrill]);

  return (
    <div>
      {/* === STAGE 1: TEST STUDIO SETUP === */}
      {stage === 'setup' && (
        <div>
          <section className="section-hero">
            <div>
              <h2>Testy z anglických časov ({ALL_TENSE_EXERCISES.length} príkladov)</h2>
              <p>
                Precvič si každý z 9 časov zvlášť (250 príkladov na každý čas), vyber si
                porovnávacie kombinácie, naklikaj vlastný mix alebo si daj veľký záverečný test zo
                všetkých 9 časov naraz.
              </p>
            </div>
            <div className="hero-actions">
              <div className="stat-pill">
                <CheckCircle2 size={14} aria-hidden="true" />
                <span>
                  Zvládnuté príklady: {totalMasteredAll} / {ALL_TENSE_EXERCISES.length}
                </span>
              </div>
              {savedMistakeExercises.length > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    const picked = selectTenseRound({
                      pool: savedMistakeExercises,
                      count: Math.min(50, savedMistakeExercises.length),
                      progress: tenseProgress,
                      prioritizeSmart: false,
                      selectedTenses: TENSE_ORDER,
                    });
                    startRound({
                      exercises: picked,
                      label: 'Opakovanie uložených chýb',
                      tenses: Array.from(new Set(picked.map((p) => p.tenseId))),
                      mistakeDrill: true,
                    });
                  }}
                >
                  <RotateCcw size={15} aria-hidden="true" />
                  <span>Opraviť chyby ({savedMistakeExercises.length})</span>
                </button>
              )}
            </div>
          </section>

          {/* 4 Main Selection Mode Cards */}
          <div className="studio-mode-grid" role="tablist" aria-label="Typ testu z časov">
            {[
              {
                id: 'single' as const,
                title: '1. Jeden čas',
                desc: '250 príkladov na každý z 9 časov',
                Icon: Layers,
              },
              {
                id: 'combo' as const,
                title: '2. Kombinácie',
                desc: '8 odporúčaných dvojíc a porovnaní',
                Icon: GitCompareArrows,
              },
              {
                id: 'custom' as const,
                title: '3. Vlastný výber',
                desc: 'Naklikaj si ľubovoľné časy dokopy',
                Icon: SlidersHorizontal,
              },
              {
                id: 'all' as const,
                title: '4. Finálny mix',
                desc: 'Všetkých 9 časov premiešaných spolu',
                Icon: Shuffle,
              },
            ].map(({ id, title, desc, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={selectionMode === id}
                className={`studio-mode-card ${selectionMode === id ? 'active' : ''}`}
                onClick={() => setSelectionMode(id)}
              >
                <div className="studio-mode-icon">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div className="studio-mode-text">
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="studio-layout">
            {/* Left / Main Selector */}
            <div className="card">
              {/* Quick Launch Strip right above the selector so mobile & half-screen users don't have to scroll down */}
              <div className="quiz-quick-launch">
                <div style={{ minWidth: 0, flex: '1 1 200px' }}>
                  <div className="small muted">Pripravený výber ({candidatePool.length} viet v banke):</div>
                  <strong style={{ fontSize: '0.95rem', display: 'block', overflowWrap: 'anywhere' }}>
                    {selectionMode === 'single'
                      ? `${TENSE_GUIDE_MAP[singleTense].order}. ${TENSE_GUIDE_MAP[singleTense].shortTitleSk} (${TENSE_GUIDE_MAP[singleTense].titleEn})`
                      : selectionMode === 'combo'
                        ? (TENSE_COMBO_PRESETS.find((c) => c.id === selectedComboId)?.titleSk ??
                          'Kombinácia časov')
                        : selectionMode === 'custom'
                          ? `Vlastný mix (${customTenses.length} z 9 časov)`
                          : 'Finálny mix všetkých 9 časov'}
                  </strong>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  disabled={candidatePool.length === 0}
                  onClick={() => launchFromCurrentConfig()}
                >
                  <Play size={15} aria-hidden="true" />
                  <span>
                    Spustiť ({Math.min(roundSize, candidatePool.length)} úloh)
                  </span>
                </button>
              </div>

              {selectionMode === 'single' && (
                <div>
                  <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.8rem' }}>
                    <div>
                      <h3 className="panel-title" style={{ marginBottom: '0.1rem' }}>
                        Vyber jeden čas (postupnosť 1 → 9)
                      </h3>
                      <span className="small muted">
                        Každý čas obsahuje 250 unikátnych viet (kladné, záporné aj otázky).
                      </span>
                    </div>
                  </div>

                  <div className="tense-pick-grid">
                    {TENSE_GUIDES.map((g) => {
                      const m = masteryByTense[g.id];
                      const active = singleTense === g.id;
                      const pct = Math.round((m.mastered / Math.max(m.total, 1)) * 100);
                      return (
                        <button
                          key={g.id}
                          type="button"
                          className={`tense-pick-card ${active ? 'active' : ''}`}
                          onClick={() => setSingleTense(g.id)}
                          aria-pressed={active}
                        >
                          <div className="row-between" style={{ alignItems: 'center', width: '100%' }}>
                            <span className="badge badge-blue">
                              Krok {g.order} · {g.level}
                            </span>
                            <span className="small muted" style={{ fontWeight: 700 }}>
                              {m.mastered}/{m.total}
                            </span>
                          </div>
                          <div className="tense-pick-title">{g.shortTitleSk}</div>
                          <div className="tense-pick-en">{g.titleEn}</div>
                          <div className="mini-bar" aria-hidden="true">
                            <span style={{ width: `${pct}%` }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectionMode === 'combo' && (
                <div>
                  <h3 className="panel-title" style={{ marginBottom: '0.15rem' }}>
                    Odporúčané kombinácie a porovnania
                  </h3>
                  <p className="small muted" style={{ marginTop: 0, marginBottom: '0.85rem' }}>
                    Počas kombinovaného testu sa názov času zobrazí až po tvojej odpovedi, aby si
                    sa naučil spoznať správny čas sám podľa kontextu.
                  </p>

                  <div className="combo-grid">
                    {TENSE_COMBO_PRESETS.map((combo) => {
                      const active = selectedComboId === combo.id;
                      const count = combo.tenses.reduce(
                        (sum, tid) => sum + EXERCISES_BY_TENSE[tid].length,
                        0
                      );
                      return (
                        <button
                          key={combo.id}
                          type="button"
                          className={`combo-card ${active ? 'active' : ''}`}
                          onClick={() => setSelectedComboId(combo.id)}
                          aria-pressed={active}
                        >
                          <div className="row-between" style={{ alignItems: 'center', width: '100%' }}>
                            <span className="badge badge-purple">{combo.stepTag}</span>
                            <span className="badge badge-outline">
                              {combo.level} · {count} príkladov
                            </span>
                          </div>
                          <div className="combo-title">{combo.titleSk}</div>
                          <div className="combo-sub">{combo.subtitleSk}</div>
                          <div className="combo-why">{combo.whyPracticeSk}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectionMode === 'custom' && (
                <div>
                  <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 className="panel-title" style={{ marginBottom: '0.1rem' }}>
                        Vyber si vlastnú kombináciu časov
                      </h3>
                      <span className="small muted">
                        Zaškrtni ľubovoľné časy (vybrané: {customTenses.length} z 9).
                      </span>
                    </div>
                    <div className="row">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => setCustomTenses([...TENSE_ORDER])}
                      >
                        Vybrať všetky
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => setCustomTenses([])}
                      >
                        Zrušiť
                      </button>
                    </div>
                  </div>

                  <div className="custom-tense-grid">
                    {TENSE_GUIDES.map((g) => {
                      const checked = customTenses.includes(g.id);
                      const m = masteryByTense[g.id];
                      return (
                        <label
                          key={g.id}
                          className={`custom-tense-item ${checked ? 'active' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCustomTense(g.id)}
                          />
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                              {g.order}. {g.shortTitleSk}
                            </div>
                            <div className="small muted">
                              {g.titleEn} · {g.level} ({m.mastered}/{m.total})
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {customTenses.length === 0 && (
                    <div className="callout-tip" style={{ marginTop: '0.85rem' }}>
                      Zaškrtni aspoň jeden čas, z ktorého chceš zostaviť test.
                    </div>
                  )}
                </div>
              )}

              {selectionMode === 'all' && (
                <div className="final-mix-box">
                  <div className="result-icon" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                    <Shuffle size={28} aria-hidden="true" />
                  </div>
                  <h3 style={{ margin: '0 0 0.35rem', fontFamily: 'var(--font-display)', fontSize: '1.45rem' }}>
                    Finálny mix všetkých 9 anglických časov
                  </h3>
                  <p style={{ margin: '0 auto 1rem', maxWidth: '52ch', color: 'var(--text-secondary)' }}>
                    Otázky vyberáme rovnomerne zo všetkých 9 časov (z celkovej banky{' '}
                    {ALL_TENSE_EXERCISES.length} príkladov) a premiešame ich tak, aby si sa naučil
                    pohotovo voliť správny čas ako v reálnej angličtine.
                  </p>
                  <div className="row" style={{ justifyContent: 'center' }}>
                    {TENSE_GUIDES.map((g) => (
                      <span key={g.id} className="badge badge-blue">
                        {g.order}. {g.titleEn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right / Settings & Launch Panel */}
            <aside className="card studio-sidebar">
              <h3 className="panel-title">Nastavenie testu</h3>

              <div className="stack">
                {/* Answer style */}
                <div>
                  <span className="field-label">Štýl odpovedania</span>
                  <div className="stack-sm">
                    {ANSWER_MODES.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        className={`mode-btn ${answerMode === m.id ? 'active' : ''}`}
                        onClick={() => setAnswerMode(m.id)}
                        aria-pressed={answerMode === m.id}
                      >
                        <span className="mode-btn-title">
                          {m.id === 'choice' ? (
                            <ListChecks size={15} style={{ verticalAlign: '-2px', marginRight: '0.35rem' }} />
                          ) : m.id === 'type' ? (
                            <Keyboard size={15} style={{ verticalAlign: '-2px', marginRight: '0.35rem' }} />
                          ) : (
                            <Sparkles size={15} style={{ verticalAlign: '-2px', marginRight: '0.35rem' }} />
                          )}
                          {m.label}
                        </span>
                        <span className="mode-btn-desc">{m.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Round size */}
                <div>
                  <span className="field-label">Počet príkladov v kole</span>
                  <div className="chip-row">
                    {ROUND_SIZES.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        className={`filter-chip ${roundSize === sz ? 'active' : ''}`}
                        onClick={() => setRoundSize(sz)}
                        aria-pressed={roundSize === sz}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Polarity filter */}
                <div>
                  <span className="field-label">Forma viet</span>
                  <div className="chip-row">
                    {POLARITY_FILTERS.map((pf) => (
                      <button
                        key={pf.id}
                        type="button"
                        className={`filter-chip ${polarityFilter === pf.id ? 'active' : ''}`}
                        onClick={() => setPolarityFilter(pf.id)}
                        aria-pressed={polarityFilter === pf.id}
                      >
                        {pf.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Smart priority */}
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={prioritizeSmart}
                    onChange={(e) => setPrioritizeSmart(e.target.checked)}
                  />
                  <span>Uprednostniť nové a chybné príklady</span>
                </label>

                <div className="card-muted small">
                  Dostupných príkladov vo výbere: <strong>{candidatePool.length}</strong>
                  {candidatePool.length > 0 && (
                    <span>
                      {' '}
                      · Spustí sa <strong>{Math.min(roundSize, candidatePool.length)}</strong> úloh
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={candidatePool.length === 0}
                  onClick={() => launchFromCurrentConfig()}
                >
                  <Play size={17} aria-hidden="true" />
                  <span>
                    Spustiť test ({Math.min(roundSize, candidatePool.length)} úloh)
                  </span>
                </button>

                {totalMasteredAll > 0 && (
                  <div style={{ paddingTop: '0.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                    {!confirmReset ? (
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-danger-text"
                        style={{ width: '100%' }}
                        onClick={() => setConfirmReset(true)}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                        <span>Vynulovať pokrok z časov</span>
                      </button>
                    ) : (
                      <div className="stack-sm">
                        <span className="small muted">
                          Naozaj vymazať pokrok všetkých {ALL_TENSE_EXERCISES.length} príkladov?
                        </span>
                        <div className="row">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ flex: 1 }}
                            onClick={() => setConfirmReset(false)}
                          >
                            Zrušiť
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm btn-danger-text"
                            style={{ flex: 1 }}
                            onClick={() => {
                              onResetTenseProgress();
                              setConfirmReset(false);
                            }}
                          >
                            Vymazať
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* === STAGE 2: ACTIVE TEST RUN === */}
      {stage === 'running' && current && (
        <div className="quiz-focus-wrap">
          <div className="quiz-topbar">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setStage('setup')}
            >
              <ArrowLeft size={15} aria-hidden="true" />
              <span>Nastavenie</span>
            </button>
            <div className="stat-pill" aria-live="polite">
              Skóre: {correctCount}/{answeredCount}
            </div>
          </div>

          <div className="practice-stage">
            <div className="quiz-round-banner">{roundLabel}</div>
            <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.55rem' }}>
              <span className="small" style={{ fontWeight: 750, color: 'var(--text-secondary)' }}>
                Úloha {index + 1} z {roundExercises.length}
              </span>
              <div className="row">
                <span className="badge badge-outline">
                  <span className="mono">{POLARITY_BADGE[current.polarity].badge}</span>{' '}
                  {POLARITY_BADGE[current.polarity].label}
                </span>
                {!isMixedTensesRound ? (
                  <span className="badge badge-purple">
                    {TENSE_GUIDE_MAP[current.tenseId].titleEn}
                  </span>
                ) : answered ? (
                  <span className="badge badge-purple">
                    {TENSE_GUIDE_MAP[current.tenseId].order}. {TENSE_GUIDE_MAP[current.tenseId].titleEn}
                  </span>
                ) : (
                  <span className="badge badge-amber">Zmiešané časy</span>
                )}
              </div>
            </div>

            <div
              className="progress"
              role="progressbar"
              aria-label="Postup v teste"
              aria-valuemin={0}
              aria-valuemax={roundExercises.length}
              aria-valuenow={answeredCount}
            >
              <span
                style={{
                  width: `${(answeredCount / Math.max(roundExercises.length, 1)) * 100}%`,
                }}
              />
            </div>

            <div className="quiz-cue-bar">
              <span className="small muted">Doplň správny tvar slovesa:</span>
              <span className="badge badge-blue mono" style={{ fontSize: '0.84rem' }}>
                ({current.verbCue})
              </span>
            </div>

            <div className="card-muted gap-sentence" style={{ marginBottom: '0.6rem' }}>
              {renderSentenceWithBlank(current, answered)}
            </div>

            {/* CHOICE MODE */}
            {currentQuestionMode === 'choice' && (
              <>
                <div className="choice-grid">
                  {currentOptions.map((opt, optIdx) => {
                    const isChosen = chosenOption === opt;
                    const isRightOption = opt === current.answer;
                    let cls = '';
                    if (answered) {
                      if (isRightOption) cls = 'correct';
                      else if (isChosen) cls = 'wrong';
                    }
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={answered}
                        data-key={optIdx + 1}
                        onClick={() => handleChooseOption(opt)}
                        className={`choice-btn ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!answered && (
                  <span className="kbd-hint">
                    Klávesy <kbd>1</kbd>–<kbd>{currentOptions.length}</kbd> vyberú odpoveď
                  </span>
                )}
              </>
            )}

            {/* TYPING MODE */}
            {currentQuestionMode === 'type' && (
              <form onSubmit={handleSubmitTyped} className="stack-sm" style={{ marginTop: '0.75rem' }}>
                <div>
                  <label className="field-label" htmlFor="tense-type-input">
                    Napíš chýbajúcu časť (uznávame skrátené aj plné tvary, napr. don’t aj do not):
                  </label>
                  <input
                    ref={inputRef}
                    id="tense-type-input"
                    type="text"
                    className={`verb-input ${
                      answered ? (currentIsRight ? 'correct' : 'wrong') : ''
                    }`}
                    placeholder="Napr. didn't go, has written, are waiting..."
                    value={typedValue}
                    disabled={answered}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    onChange={(e) => setTypedValue(e.target.value)}
                  />
                </div>

                {!answered && hintLevel > 0 && (
                  <div className="callout-tip" style={{ padding: '0.65rem 0.85rem', fontSize: '0.86rem' }}>
                    <strong>Nápoveda:</strong>{' '}
                    {TENSE_GUIDE_MAP[current.tenseId].titleSk} ({TENSE_GUIDE_MAP[current.tenseId].titleEn}) — vzorec:{' '}
                    <span className="mono">{TENSE_GUIDE_MAP[current.tenseId].formulaQuick}</span>
                    {hintLevel >= 2 && (
                      <div style={{ marginTop: '0.25rem' }}>
                        Začiatok odpovede: <strong className="mono">{buildMaskHint(current.answer)}</strong>
                      </div>
                    )}
                  </div>
                )}

                {!answered && (
                  <div className="action-row">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!typedValue.trim()}
                    >
                      Skontrolovať
                    </button>
                    {hintLevel < 2 && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setHintLevel((h) => (h === 0 ? 1 : 2))}
                      >
                        <HelpCircle size={16} aria-hidden="true" />
                        <span>{hintLevel === 0 ? 'Nápoveda' : 'Viac napovedať'}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={handleRevealAnswer}
                    >
                      <Eye size={16} aria-hidden="true" />
                      <span>Neviem</span>
                    </button>
                  </div>
                )}
              </form>
            )}

            {/* FEEDBACK AFTER ANSWER */}
            {answered && (
              <div className="stack" style={{ gap: '0.9rem', marginTop: '0.9rem' }}>
                <div
                  className={currentIsRight ? 'callout-success' : 'callout-error'}
                  style={{ display: 'grid', gap: '0.45rem' }}
                  role="status"
                >
                  <div className="row-between" style={{ alignItems: 'center' }}>
                    <span
                      style={{
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      {currentIsRight ? (
                        <CheckCircle2 size={18} color="var(--emerald)" aria-hidden="true" />
                      ) : (
                        <XCircle size={18} color="var(--rose)" aria-hidden="true" />
                      )}
                      {fillSentenceBlank(current.sentenceWithBlank, current.answer)}
                    </span>
                    <AudioButton
                      text={fillSentenceBlank(current.sentenceWithBlank, current.answer)}
                      accent={accent}
                      rate={rate}
                      label="Vypočuť"
                    />
                  </div>
                  {!currentIsRight && (
                    <div className="small" style={{ fontWeight: 700 }}>
                      Správny tvar: <span className="mono">{current.answer}</span>
                    </div>
                  )}
                  <div style={{ fontSize: '0.92rem' }}>
                    <span className="lang-tag">SK</span> {current.translationSk}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <strong>Vysvetlenie:</strong> {current.explanationSk}
                  </div>
                  <div className="row" style={{ marginTop: '0.15rem' }}>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => onOpenTenseLesson(current.tenseId)}
                    >
                      <BookOpen size={14} aria-hidden="true" />
                      <span>
                        Pozrieť výklad: {TENSE_GUIDE_MAP[current.tenseId].shortTitleSk}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="action-row">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={handleNext}
                    autoFocus
                  >
                    <span>
                      {index + 1 >= roundExercises.length
                        ? 'Zobraziť vyhodnotenie testu'
                        : 'Ďalšia úloha'}
                    </span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === STAGE 3: SUMMARY & BREAKDOWN === */}
      {stage === 'summary' && (
        <div className="card summary-card">
          <div className="result-icon">
            <Trophy size={28} aria-hidden="true" />
          </div>
          <h3
            style={{
              margin: '0 0 0.3rem',
              fontFamily: 'var(--font-display)',
              fontSize: '1.65rem',
            }}
          >
            Test dokončený!
          </h3>
          <p className="muted" style={{ margin: '0 0 0.4rem', fontWeight: 600 }}>
            {roundLabel}
          </p>
          <p style={{ margin: '0 0 1.25rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Výsledok:{' '}
            <strong>
              {correctCount} z {roundExercises.length}
            </strong>{' '}
            správne (
            <strong>
              {Math.round((correctCount / Math.max(roundExercises.length, 1)) * 100)} %
            </strong>
            ).
          </p>

          {summaryBreakdown.length > 1 && (
            <div className="summary-breakdown">
              <h4 style={{ margin: '0 0 0.65rem', textAlign: 'left', fontSize: '0.95rem' }}>
                Úspešnosť podľa jednotlivých časov:
              </h4>
              <div className="stack-sm">
                {summaryBreakdown.map(({ guide, total, correct }) => {
                  const pct = Math.round((correct / Math.max(total, 1)) * 100);
                  return (
                    <div key={guide.id} className="breakdown-row">
                      <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                          {guide.order}. {guide.shortTitleSk}{' '}
                          <span className="muted">({guide.titleEn})</span>
                        </span>
                        <span className={`badge ${pct >= 80 ? 'badge-emerald' : pct >= 50 ? 'badge-amber' : 'badge-rose'}`}>
                          {correct}/{total} ({pct} %)
                        </span>
                      </div>
                      <div className="mini-bar" aria-hidden="true">
                        <span
                          style={{
                            width: `${pct}%`,
                            background:
                              pct >= 80
                                ? 'var(--emerald)'
                                : pct >= 50
                                  ? 'var(--amber)'
                                  : 'var(--rose)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="summary-actions">
            {roundMistakes.length > 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  startRound({
                    exercises: roundMistakes,
                    label: `Oprava chýb (${roundMistakes.length})`,
                    tenses: Array.from(new Set(roundMistakes.map((m) => m.tenseId))),
                    mistakeDrill: true,
                  })
                }
              >
                <RotateCcw size={16} aria-hidden="true" />
                <span>Precvičiť len chyby z tohto kola ({roundMistakes.length})</span>
              </button>
            )}

            <button
              type="button"
              className={roundMistakes.length > 0 ? 'btn btn-secondary' : 'btn btn-primary'}
              onClick={() => launchFromCurrentConfig()}
            >
              <Play size={16} aria-hidden="true" />
              <span>Nová várka (ďalšie príklady)</span>
            </button>

            {singleNextGuide &&
              correctCount / Math.max(roundExercises.length, 1) >= 0.75 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onOpenTenseLesson(singleNextGuide.id)}
                >
                  <span>
                    Ďalší krok: {singleNextGuide.order}. {singleNextGuide.shortTitleSk}
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              )}

            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setStage('setup')}
            >
              Zmeniť nastavenie / vybrať iný čas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
