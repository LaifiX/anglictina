import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Eye,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IRREGULAR_VERBS, LEVEL_INFO, PATTERN_INFO } from '../data/irregularVerbs';
import type {
  Accent,
  IrregularVerb,
  PracticeMode,
  ProgressMap,
  SpeechRate,
  VerbLevel,
  VerbPattern,
} from '../types/english';
import { playFeedbackTone, speakSequence, speakText } from '../utils/speech';
import { useMediaQuery } from '../utils/useMediaQuery';
import {
  VERB_FORM_LABELS_SK,
  type VerbFormKey,
  generateVerbFormChoices,
  getDisplayForm,
  isVerbFormAnswerCorrect,
} from '../utils/verbCheck';
import { AudioButton } from './AudioButton';

interface VerbPracticeProps {
  accent: Accent;
  rate: SpeechRate;
  sfxEnabled: boolean;
  progress: ProgressMap;
  initialLevel: VerbLevel | 'all';
  initialPattern: VerbPattern | 'all';
  onRecordResult: (verbId: string, isCorrect: boolean) => void;
  onResetProgress: () => void;
}

const MODE_OPTIONS: { id: PracticeMode; title: string; desc: string }[] = [
  {
    id: 'all-3',
    title: 'V1 + V2 + V3 podľa prekladu',
    desc: 'Vidíš slovenčinu — dopíš všetky 3 anglické tvary.',
  },
  {
    id: 'v2-v3',
    title: 'Doplň 2. a 3. tvar',
    desc: 'Máš 1. tvar a preklad — dopíš minulosť a príčastie.',
  },
  {
    id: 'all-5',
    title: 'Úplne všetky tvary (5 tvarov)',
    desc: 'V1, V2, V3, 3. osoba (-s) aj priebehový tvar (-ing).',
  },
  {
    id: 'random-gap',
    title: 'Náhodne odkrytý tvar',
    desc: 'Vidíš jeden z tvarov a doplníš zvyšné dva.',
  },
  {
    id: 'context',
    title: 'Vo vete (kontext)',
    desc: 'Rozhodni, či do vety patrí V1, V2, V3, -s alebo -ing.',
  },
  {
    id: 'choice',
    title: 'Výber z možností (Kvíz)',
    desc: 'Rýchly kvíz zo 4 možností — ideálny na mobil.',
  },
  {
    id: 'flashcards',
    title: 'Kartičky so zvukom',
    desc: 'Otoč kartu, vypočuj si výslovnosť a ohodnoť sa.',
  },
];

const TYPING_MODES: PracticeMode[] = ['all-3', 'v2-v3', 'all-5', 'random-gap'];

function pickNextVerb(
  pool: IrregularVerb[],
  currentId: string | undefined,
  progress: ProgressMap
): IrregularVerb {
  if (pool.length === 0) return IRREGULAR_VERBS[0];
  if (pool.length === 1) return pool[0];

  const candidates = pool.filter((v) => v.id !== currentId);
  // Prioritize unmastered or previously missed verbs
  const weighted: IrregularVerb[] = [];
  for (const verb of candidates) {
    const rec = progress[verb.id];
    const weight = !rec ? 3 : rec.streak < 2 ? 3 : 1;
    for (let i = 0; i < weight; i += 1) {
      weighted.push(verb);
    }
  }
  const idx = Math.floor(Math.random() * weighted.length);
  return weighted[idx] ?? candidates[0];
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

export function VerbPractice({
  accent,
  rate,
  sfxEnabled,
  progress,
  initialLevel,
  initialPattern,
  onRecordResult,
  onResetProgress,
}: VerbPracticeProps) {
  const [mode, setMode] = useState<PracticeMode>('all-3');
  const [levelFilter, setLevelFilter] = useState<VerbLevel | 'all'>(initialLevel);
  const [patternFilter, setPatternFilter] = useState<VerbPattern | 'all'>(initialPattern);
  const [onlyWeak, setOnlyWeak] = useState(false);
  const [autoAudio, setAutoAudio] = useState(true);

  // Settings are open beside the exercise on desktop, collapsed below it on mobile.
  const isDesktop = useMediaQuery('(min-width: 961px)', true);
  const [settingsOpen, setSettingsOpen] = useState(isDesktop);
  useEffect(() => setSettingsOpen(isDesktop), [isDesktop]);

  const stageRef = useRef<HTMLDivElement>(null);
  const [questionNonce, setQuestionNonce] = useState(0);

  const filterVerbs = (
    lvl: VerbLevel | 'all',
    pat: VerbPattern | 'all',
    weakOnly: boolean
  ) =>
    IRREGULAR_VERBS.filter((verb) => {
      if (lvl !== 'all' && verb.level !== lvl) return false;
      if (pat !== 'all' && verb.pattern !== pat) return false;
      if (weakOnly && (progress[verb.id]?.streak ?? 0) >= 2) return false;
      return true;
    });

  const pool = useMemo(
    () => filterVerbs(levelFilter, patternFilter, onlyWeak),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [levelFilter, patternFilter, onlyWeak, progress]
  );

  const [currentVerb, setCurrentVerb] = useState<IrregularVerb>(() =>
    pickNextVerb(pool.length > 0 ? pool : IRREGULAR_VERBS, undefined, progress)
  );

  // Per-question dynamic config
  const [givenKey, setGivenKey] = useState<VerbFormKey>('v1');
  const [choiceTargetForm, setChoiceTargetForm] = useState<VerbFormKey>('v2');
  const [choiceOptions, setChoiceOptions] = useState<string[]>([]);

  // Input values for typing modes
  const [inputs, setInputs] = useState<Record<VerbFormKey, string>>({
    v1: '',
    v2: '',
    v3: '',
    thirdPerson: '',
    ingForm: '',
  });
  const [contextInput, setContextInput] = useState('');
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [flashcardRevealed, setFlashcardRevealed] = useState(false);

  const [checked, setChecked] = useState(false);
  const [fieldResults, setFieldResults] = useState<Partial<Record<VerbFormKey, boolean>>>({});
  const [contextCorrect, setContextCorrect] = useState<boolean | null>(null);

  const [sessionStats, setSessionStats] = useState({ answered: 0, correct: 0, streak: 0 });
  const [showHint, setShowHint] = useState(false);

  const recordSession = (ok: boolean) =>
    setSessionStats((prev) => ({
      answered: prev.answered + 1,
      correct: prev.correct + (ok ? 1 : 0),
      streak: ok ? prev.streak + 1 : 0,
    }));

  const playAllThree = () =>
    speakSequence([currentVerb.v1, currentVerb.v2, currentVerb.v3], { accent, rate });

  const setupQuestionForVerb = (verb: IrregularVerb, nextMode: PracticeMode) => {
    setInputs({ v1: '', v2: '', v3: '', thirdPerson: '', ingForm: '' });
    setContextInput('');
    setSelectedChoice(null);
    setFlashcardRevealed(false);
    setChecked(false);
    setFieldResults({});
    setContextCorrect(null);
    setShowHint(false);

    if (nextMode === 'random-gap') {
      const keys: ('v1' | 'v2' | 'v3')[] = ['v1', 'v2', 'v3'];
      setGivenKey(keys[Math.floor(Math.random() * keys.length)]);
    } else if (nextMode === 'v2-v3') {
      setGivenKey('v1');
    }

    if (nextMode === 'choice') {
      const forms: VerbFormKey[] = ['v2', 'v3', 'thirdPerson', 'ingForm'];
      const target = forms[Math.floor(Math.random() * forms.length)];
      setChoiceTargetForm(target);
      setChoiceOptions(generateVerbFormChoices(verb, target, IRREGULAR_VERBS));
    }
  };

  const applyFilters = (
    nextLvl: VerbLevel | 'all',
    nextPat: VerbPattern | 'all',
    nextWeak: boolean
  ) => {
    setLevelFilter(nextLvl);
    setPatternFilter(nextPat);
    setOnlyWeak(nextWeak);
    const nextPool = filterVerbs(nextLvl, nextPat, nextWeak);
    if (nextPool.length > 0 && !nextPool.some((v) => v.id === currentVerb.id)) {
      const next = pickNextVerb(nextPool, currentVerb.id, progress);
      setCurrentVerb(next);
      setupQuestionForVerb(next, mode);
    }
  };

  useEffect(() => {
    applyFilters(initialLevel, initialPattern, onlyWeak);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLevel, initialPattern]);

  const handleNext = () => {
    const activePool = pool.length > 0 ? pool : IRREGULAR_VERBS;
    const next = pickNextVerb(activePool, currentVerb.id, progress);
    setCurrentVerb(next);
    setupQuestionForVerb(next, mode);
    setQuestionNonce((n) => n + 1);
  };

  const handleModeChange = (nextMode: PracticeMode) => {
    setMode(nextMode);
    setupQuestionForVerb(currentVerb, nextMode);
  };

  // After moving to the next question, put the cursor in the first empty field
  useEffect(() => {
    if (questionNonce === 0) return;
    const firstInput = stageRef.current?.querySelector<HTMLInputElement>('input:not([readonly])');
    firstInput?.focus({ preventScroll: false });
  }, [questionNonce]);

  const getTypingFieldsForMode = (): VerbFormKey[] => {
    if (mode === 'all-5') return ['v1', 'v2', 'v3', 'thirdPerson', 'ingForm'];
    if (TYPING_MODES.includes(mode)) return ['v1', 'v2', 'v3'];
    return [];
  };

  const isFieldStatic = (key: VerbFormKey): boolean => {
    if (mode === 'v2-v3' && key === 'v1') return true;
    if (mode === 'random-gap' && key === givenKey) return true;
    return false;
  };

  const handleCheckTyping = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (checked) {
      handleNext();
      return;
    }

    const keys = getTypingFieldsForMode();
    const results: Partial<Record<VerbFormKey, boolean>> = {};
    let allRight = true;

    for (const k of keys) {
      if (isFieldStatic(k)) {
        results[k] = true;
        continue;
      }
      const ok = isVerbFormAnswerCorrect(currentVerb, k, inputs[k]);
      results[k] = ok;
      if (!ok) allRight = false;
    }

    setFieldResults(results);
    setChecked(true);
    onRecordResult(currentVerb.id, allRight);
    recordSession(allRight);

    if (sfxEnabled) playFeedbackTone(allRight ? 'correct' : 'wrong');
    if (autoAudio) playAllThree();
  };

  const handleCheckContext = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (checked) {
      handleNext();
      return;
    }
    const gap = currentVerb.sentenceGap;
    if (!gap) {
      handleNext();
      return;
    }
    const ok = isVerbFormAnswerCorrect(currentVerb, gap.targetForm, contextInput);
    setContextCorrect(ok);
    setChecked(true);
    onRecordResult(currentVerb.id, ok);
    recordSession(ok);

    if (sfxEnabled) playFeedbackTone(ok ? 'correct' : 'wrong');
    if (autoAudio) {
      const completed = gap.sentence.replace('____', getDisplayForm(currentVerb, gap.targetForm));
      speakText(completed, { accent, rate });
    }
  };

  const handleSelectChoice = (option: string) => {
    if (checked) return;
    setSelectedChoice(option);
    const ok = isVerbFormAnswerCorrect(currentVerb, choiceTargetForm, option);
    setChecked(true);
    onRecordResult(currentVerb.id, ok);
    recordSession(ok);

    if (sfxEnabled) playFeedbackTone(ok ? 'correct' : 'wrong');
    if (autoAudio) {
      speakText(getDisplayForm(currentVerb, choiceTargetForm), { accent, rate });
    }
  };

  const handleRevealFlashcard = () => {
    setFlashcardRevealed(true);
    if (autoAudio) playAllThree();
  };

  const handleFlashcardRate = (known: boolean) => {
    onRecordResult(currentVerb.id, known);
    recordSession(known);
    if (sfxEnabled && known) playFeedbackTone('correct');
    handleNext();
  };

  const handleReset = () => {
    if (window.confirm('Naozaj vymazať celý pokrok slovies? Túto akciu nejde vrátiť.')) {
      onResetProgress();
    }
  };

  // Keyboard shortcuts: 1–4 pick an answer, Space reveals a card, Enter continues
  const keyHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  keyHandlerRef.current = (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
    if (document.querySelector('[aria-modal="true"]')) return;
    const onButton = e.target instanceof HTMLButtonElement;

    if (mode === 'choice') {
      const n = Number(e.key);
      if (!checked && n >= 1 && n <= choiceOptions.length) {
        e.preventDefault();
        handleSelectChoice(choiceOptions[n - 1]);
      } else if (checked && e.key === 'Enter' && !onButton) {
        e.preventDefault();
        handleNext();
      }
    } else if (mode === 'flashcards') {
      if (!flashcardRevealed && (e.key === ' ' || e.key === 'Enter') && !onButton) {
        e.preventDefault();
        handleRevealFlashcard();
      } else if (flashcardRevealed && e.key === '1') {
        handleFlashcardRate(false);
      } else if (flashcardRevealed && e.key === '2') {
        handleFlashcardRate(true);
      }
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => keyHandlerRef.current(e);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  const typingFields = getTypingFieldsForMode();
  const overallTypingCorrect = checked && typingFields.every((k) => fieldResults[k] === true);
  const answerWasCorrect =
    (mode === 'context' && contextCorrect === true) ||
    (mode === 'choice' &&
      selectedChoice !== null &&
      isVerbFormAnswerCorrect(currentVerb, choiceTargetForm, selectedChoice)) ||
    (TYPING_MODES.includes(mode) && overallTypingCorrect);
  const activeMode = MODE_OPTIONS.find((m) => m.id === mode)!;
  const isMastered = (progress[currentVerb.id]?.streak ?? 0) >= 2;

  return (
    <div>
      <section className="section-hero">
        <div>
          <h2>Precvičovanie slovies</h2>
          <p>
            Vyber si režim: dopĺňanie 3 alebo všetkých 5 tvarov, tvary vo vetách, rýchly kvíz alebo
            kartičky so zvukom. Slovesá, ktoré ešte nevieš, sa ti ukážu častejšie.
          </p>
        </div>
        <div className="hero-actions" style={{ width: 'auto' }}>
          <div className="stat-pill" aria-live="polite">
            {sessionStats.correct} / {sessionStats.answered} správne
          </div>
          {sessionStats.streak >= 2 && (
            <div className="streak-pill">
              <Sparkles size={14} aria-hidden="true" /> Séria {sessionStats.streak}
            </div>
          )}
        </div>
      </section>

      <div className="practice-layout">
        {/* Modes */}
        <section className="card practice-modes" aria-labelledby="modes-title">
          <h3 className="panel-title" id="modes-title">
            Režim precvičovania
          </h3>
          <div className="mode-list">
            {MODE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`mode-btn ${mode === opt.id ? 'active' : ''}`}
                onClick={() => handleModeChange(opt.id)}
                aria-pressed={mode === opt.id}
              >
                <span className="mode-btn-title">{opt.title}</span>
                <span className="mode-btn-desc">{opt.desc}</span>
              </button>
            ))}
          </div>
          <p className="mode-active-desc">{activeMode.desc}</p>
        </section>

        {/* Settings */}
        <section className="card practice-settings">
          <details
            className="settings-details"
            open={settingsOpen}
            onToggle={(e) => setSettingsOpen((e.currentTarget as HTMLDetailsElement).open)}
          >
            <summary>
              <span>
                Výber slovies <span className="muted">({pool.length})</span>
              </span>
              <ChevronDown size={18} aria-hidden="true" />
            </summary>

            <div className="settings-body">
              <div>
                <label className="field-label" htmlFor="practice-level">
                  Úroveň
                </label>
                <select
                  id="practice-level"
                  className="select-input"
                  style={{ width: '100%' }}
                  value={levelFilter}
                  onChange={(e) => applyFilters(e.target.value as VerbLevel | 'all', patternFilter, onlyWeak)}
                >
                  <option value="all">Všetky úrovne (A1–B2)</option>
                  {(Object.keys(LEVEL_INFO) as VerbLevel[]).map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {LEVEL_INFO[lvl].label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label" htmlFor="practice-pattern">
                  Vzor časovania
                </label>
                <select
                  id="practice-pattern"
                  className="select-input"
                  style={{ width: '100%' }}
                  value={patternFilter}
                  onChange={(e) => applyFilters(levelFilter, e.target.value as VerbPattern | 'all', onlyWeak)}
                >
                  <option value="all">Všetky vzory</option>
                  {(Object.keys(PATTERN_INFO) as VerbPattern[]).map((pat) => (
                    <option key={pat} value={pat}>
                      {PATTERN_INFO[pat].label}
                    </option>
                  ))}
                </select>
              </div>

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={onlyWeak}
                  onChange={(e) => applyFilters(levelFilter, patternFilter, e.target.checked)}
                />
                <span>Len nezvládnuté slovesá</span>
              </label>

              <label className="check-row">
                <input type="checkbox" checked={autoAudio} onChange={(e) => setAutoAudio(e.target.checked)} />
                <span>Po odpovedi prehrať výslovnosť</span>
              </label>

              <button type="button" className="btn btn-ghost btn-sm btn-danger-text" onClick={handleReset}>
                <RotateCcw size={14} aria-hidden="true" />
                <span>Vynulovať pokrok slovies</span>
              </button>
            </div>
          </details>
        </section>

        {/* Main practice stage */}
        <div className="practice-stage" ref={stageRef}>
          {pool.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem 0.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem' }}>V tomto výbere už máš všetko zvládnuté</h3>
              <p className="muted" style={{ fontWeight: 400 }}>
                Vypni „Len nezvládnuté slovesá“ alebo zmeň úroveň a pokračuj.
              </p>
              <button type="button" className="btn btn-primary" onClick={() => applyFilters('all', 'all', false)}>
                Zobraziť všetky slovesá
              </button>
            </div>
          ) : (
            <>
              {/* Prompt header */}
              <div className="row-between">
                <div style={{ minWidth: 0 }}>
                  <div className="row" style={{ gap: '0.35rem', marginBottom: '0.45rem' }}>
                    <span className="badge badge-blue">{currentVerb.level}</span>
                    <span className="badge badge-purple">{PATTERN_INFO[currentVerb.pattern].short}</span>
                    {isMastered && <span className="badge badge-emerald">Zvládnuté</span>}
                  </div>
                  <div className="prompt-label">Slovenský význam</div>
                  <h3 className="prompt-word">{currentVerb.translationSk}</h3>
                  {currentVerb.otherMeaningsSk && (
                    <div className="muted small">({currentVerb.otherMeaningsSk})</div>
                  )}
                </div>

                <div className="row" style={{ gap: '0.4rem' }}>
                  {mode !== 'flashcards' && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => setShowHint((v) => !v)}
                      aria-expanded={showHint}
                    >
                      <HelpCircle size={15} aria-hidden="true" />
                      <span>{showHint ? 'Skryť pomôcku' : 'Pomôcka'}</span>
                    </button>
                  )}
                  <button type="button" className="btn btn-ghost btn-sm" onClick={handleNext}>
                    <span>Preskočiť</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="callout-tip" style={{ marginTop: '0.85rem' }}>
                  <strong>Pomôcka:</strong> {currentVerb.slovakExplanation.tipSk}
                </div>
              )}

              {/* MODE: TYPING (all-3, v2-v3, all-5, random-gap) */}
              {TYPING_MODES.includes(mode) && (
                <form onSubmit={handleCheckTyping}>
                  <div className="practice-inputs-grid">
                    {typingFields.map((fieldKey) => {
                      const label = VERB_FORM_LABELS_SK[fieldKey];
                      const expected = getDisplayForm(currentVerb, fieldKey);
                      const isOk = fieldResults[fieldKey];

                      if (isFieldStatic(fieldKey)) {
                        return (
                          <div key={fieldKey}>
                            <span className="field-label">{label.title}</span>
                            <div className="verb-input-static">
                              <span>{expected}</span>
                              <AudioButton text={expected} accent={accent} rate={rate} iconOnly />
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={fieldKey}>
                          <label className="field-label" htmlFor={`input-${fieldKey}`}>
                            {label.title}
                          </label>
                          <input
                            id={`input-${fieldKey}`}
                            type="text"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            enterKeyHint={checked ? 'next' : 'done'}
                            className={`verb-input ${checked ? (isOk ? 'correct' : 'wrong') : ''}`}
                            value={inputs[fieldKey]}
                            onChange={(e) => setInputs((prev) => ({ ...prev, [fieldKey]: e.target.value }))}
                            placeholder={label.hint.replace('napr. ', '')}
                            readOnly={checked}
                            aria-invalid={checked && !isOk ? true : undefined}
                          />
                          {checked && !isOk && <div className="field-error">Správne: {expected}</div>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="action-row">
                    {!checked ? (
                      <button type="submit" className="btn btn-primary">
                        Skontrolovať odpoveď
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        <span>Ďalšie sloveso</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    )}
                    {checked && (
                      <button type="button" className="audio-btn lg" onClick={playAllThree}>
                        <Play size={15} aria-hidden="true" />
                        <span>Vypočuť V1–V2–V3</span>
                      </button>
                    )}
                    <span className="kbd-hint">
                      <kbd>Enter</kbd> {checked ? 'ďalšie' : 'skontrolovať'}
                    </span>
                  </div>
                </form>
              )}

              {/* MODE: CONTEXT SENTENCE GAP */}
              {mode === 'context' && currentVerb.sentenceGap && (
                <form onSubmit={handleCheckContext} style={{ marginTop: '1.1rem' }}>
                  <div className="card-muted" style={{ marginBottom: '0.9rem' }}>
                    <div className="example-tag" style={{ marginBottom: '0.3rem' }}>
                      Doplň tvar slovesa „{currentVerb.v1}“ do vety
                    </div>
                    <div className="gap-sentence">{currentVerb.sentenceGap.sentence}</div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                      {currentVerb.sentenceGap.translationSk}
                    </div>
                  </div>

                  <div style={{ maxWidth: '340px', marginBottom: '1rem' }}>
                    <label className="field-label" htmlFor="context-gap-input">
                      Správny tvar do vety
                    </label>
                    <input
                      id="context-gap-input"
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      enterKeyHint={checked ? 'next' : 'done'}
                      className={`verb-input ${checked ? (contextCorrect ? 'correct' : 'wrong') : ''}`}
                      value={contextInput}
                      onChange={(e) => setContextInput(e.target.value)}
                      placeholder={`tvar slovesa ${currentVerb.v1}`}
                      readOnly={checked}
                      aria-invalid={checked && !contextCorrect ? true : undefined}
                    />
                    {checked && !contextCorrect && (
                      <div className="field-error">
                        Správne: {getDisplayForm(currentVerb, currentVerb.sentenceGap.targetForm)}
                      </div>
                    )}
                  </div>

                  <div className="action-row">
                    {!checked ? (
                      <button type="submit" className="btn btn-primary">
                        Skontrolovať vetu
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        <span>Ďalšie sloveso</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    )}
                    {checked && (
                      <AudioButton
                        text={currentVerb.sentenceGap.sentence.replace(
                          '____',
                          getDisplayForm(currentVerb, currentVerb.sentenceGap.targetForm)
                        )}
                        accent={accent}
                        rate={rate}
                        label="Vypočuť celú vetu"
                        className="lg"
                      />
                    )}
                  </div>

                  {checked && (
                    <div className="callout-info" style={{ marginTop: '1rem' }}>
                      <strong>Prečo práve tento tvar?</strong> {currentVerb.sentenceGap.whySk}
                    </div>
                  )}
                </form>
              )}

              {/* MODE: MULTIPLE CHOICE */}
              {mode === 'choice' && (
                <div style={{ marginTop: '1.1rem' }}>
                  <div className="card-muted row-between" style={{ alignItems: 'center' }}>
                    <div>
                      <div className="prompt-label">Vyber správny tvar</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                        {VERB_FORM_LABELS_SK[choiceTargetForm].title}{' '}
                        <span style={{ color: 'var(--primary)' }}>({currentVerb.v1})</span>
                      </div>
                    </div>
                    <AudioButton
                      text={getDisplayForm(currentVerb, choiceTargetForm)}
                      accent={accent}
                      rate={rate}
                      label="Zvuková nápoveda"
                    />
                  </div>

                  <div className="choice-grid">
                    {choiceOptions.map((option, i) => {
                      const isCorrectOption = isVerbFormAnswerCorrect(currentVerb, choiceTargetForm, option);
                      let stateClass = '';
                      if (checked) {
                        if (isCorrectOption) stateClass = 'correct';
                        else if (selectedChoice === option) stateClass = 'wrong';
                      }

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={checked}
                          data-key={i + 1}
                          onClick={() => handleSelectChoice(option)}
                          className={`choice-btn ${stateClass}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {checked ? (
                    <div className="action-row">
                      <button type="button" className="btn btn-primary" onClick={handleNext} autoFocus>
                        <span>Ďalšie sloveso</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                      <button type="button" className="audio-btn lg" onClick={playAllThree}>
                        <Volume2 size={15} aria-hidden="true" />
                        <span>Vypočuť všetky 3 tvary</span>
                      </button>
                    </div>
                  ) : (
                    <span className="kbd-hint">
                      Klávesy <kbd>1</kbd>–<kbd>{choiceOptions.length}</kbd> vyberú odpoveď
                    </span>
                  )}
                </div>
              )}

              {/* MODE: FLASHCARDS */}
              {mode === 'flashcards' && (
                <div className="flashcard-box">
                  {!flashcardRevealed ? (
                    <>
                      <span className="badge badge-blue">Povedz si v duchu všetky 3 tvary</span>
                      <div className="flashcard-word">{currentVerb.translationSk}</div>
                      <p className="muted" style={{ margin: 0, maxWidth: '48ch', fontSize: '0.92rem' }}>
                        {currentVerb.slovakExplanation.tipSk}
                      </p>
                      <button type="button" className="btn btn-primary" onClick={handleRevealFlashcard}>
                        <Eye size={17} aria-hidden="true" />
                        <span>Odkryť tvary</span>
                      </button>
                      <span className="kbd-hint">
                        <kbd>Medzerník</kbd> odkryje kartu
                      </span>
                    </>
                  ) : (
                    <div style={{ width: '100%', textAlign: 'left', display: 'grid', gap: '0.85rem' }}>
                      <div className="detail-grid-3" style={{ marginBottom: 0 }}>
                        {[
                          { idx: 0, tag: 'V1 základ', word: currentVerb.v1, pron: currentVerb.pronunciationSk.v1 },
                          { idx: 1, tag: 'V2 minulosť', word: currentVerb.v2, pron: currentVerb.pronunciationSk.v2 },
                          { idx: 2, tag: 'V3 príčastie', word: currentVerb.v3, pron: currentVerb.pronunciationSk.v3 },
                        ].map((f) => (
                          <button
                            key={f.tag}
                            type="button"
                            onClick={() => speakText(f.word, { accent, rate })}
                            className="verb-form-box"
                            aria-label={`Vypočuť ${f.word}`}
                          >
                            <span className="verb-form-tag">
                              <span>{f.tag}</span>
                              <Volume2 size={13} aria-hidden="true" />
                            </span>
                            <span className="verb-form-word">
                              <span className={f.idx > 0 ? 'hl' : undefined}>{f.word}</span>
                            </span>
                            <span className="verb-form-pron">[{f.pron}]</span>
                          </button>
                        ))}
                      </div>

                      <div className="verb-extra-forms" style={{ fontSize: '0.88rem' }}>
                        <span>
                          3. osoba: <strong>{currentVerb.thirdPerson}</strong>
                        </span>
                        <span>
                          -ing tvar: <strong>{currentVerb.ingForm}</strong>
                        </span>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.9rem' }}>{currentVerb.slovakExplanation.summary}</p>

                      <div className="row-between" style={{ alignItems: 'center', marginTop: '0.3rem' }}>
                        <button type="button" className="audio-btn" onClick={playAllThree}>
                          <Play size={14} aria-hidden="true" />
                          <span>Prehrať V1–V2–V3</span>
                        </button>

                        <div className="action-row">
                          <button type="button" className="btn btn-secondary" onClick={() => handleFlashcardRate(false)}>
                            <XCircle size={16} aria-hidden="true" />
                            <span>Ešte precvičiť</span>
                          </button>
                          <button type="button" className="btn btn-primary" onClick={() => handleFlashcardRate(true)}>
                            <CheckCircle2 size={16} aria-hidden="true" />
                            <span>Viem to</span>
                          </button>
                        </div>
                      </div>
                      <span className="kbd-hint">
                        <kbd>1</kbd> ešte precvičiť · <kbd>2</kbd> viem to
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Shared feedback after checking */}
              {checked && mode !== 'flashcards' && (
                <div
                  className={answerWasCorrect ? 'callout-success' : 'callout-error'}
                  style={{ marginTop: '1.15rem', display: 'grid', gap: '0.55rem' }}
                  role="status"
                >
                  <div className="callout-title" style={{ marginBottom: 0 }}>
                    {answerWasCorrect ? (
                      <CheckCircle2 size={18} color="var(--emerald)" aria-hidden="true" />
                    ) : (
                      <XCircle size={18} color="var(--rose)" aria-hidden="true" />
                    )}
                    <span>{answerWasCorrect ? 'Správne!' : 'Skoro — pozri si správne tvary'}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.02rem' }}>
                    {currentVerb.v1} — <span className="hl">{currentVerb.v2}</span> —{' '}
                    <span className="hl">{currentVerb.v3}</span>{' '}
                    <span className="mono muted" style={{ fontWeight: 500, fontSize: '0.8rem' }}>
                      [{currentVerb.pronunciationSk.v1}] [{currentVerb.pronunciationSk.v2}] [
                      {currentVerb.pronunciationSk.v3}]
                    </span>
                  </div>
                  <div style={{ fontSize: '0.88rem' }}>
                    <strong>Ďalšie tvary:</strong> 3. os.: {currentVerb.thirdPerson} · -ing: {currentVerb.ingForm}
                  </div>
                  <div style={{ fontSize: '0.88rem' }}>
                    <strong>Vysvetlenie po slovensky:</strong> {currentVerb.slovakExplanation.summary}
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    <strong>Ukážka (otázka / zápor):</strong> {currentVerb.examples.questionNeg.en} —{' '}
                    <em>{currentVerb.examples.questionNeg.sk}</em>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
