import { ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GRAMMAR_QUIZ } from '../data/grammarData';
import type { Accent, GrammarQuizQuestion, SpeechRate } from '../types/english';
import { playFeedbackTone, speakText } from '../utils/speech';
import { AudioButton } from './AudioButton';

interface GrammarQuizProps {
  accent: Accent;
  rate: SpeechRate;
  sfxEnabled: boolean;
}

type QuizCategoryFilter = 'all' | GrammarQuizQuestion['category'];

const CATEGORY_LABELS: Record<QuizCategoryFilter, string> = {
  all: 'Všetky témy',
  present: 'Prítomný čas',
  past: 'Minulý čas + V3',
  future: 'Budúci čas',
  'questions-pos-neg': 'Pozitívne a negatívne otázky',
};

export function GrammarQuiz({ accent, rate, sfxEnabled }: GrammarQuizProps) {
  const [category, setCategory] = useState<QuizCategoryFilter>('all');
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    return GRAMMAR_QUIZ.filter((q) => category === 'all' || q.category === category);
  }, [category]);

  const current = questions[index] ?? questions[0];

  const handleCategoryChange = (next: QuizCategoryFilter) => {
    setCategory(next);
    setIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setFinished(false);
  };

  const handleChoose = (optIdx: number) => {
    if (selectedOption !== null || !current) return;
    setSelectedOption(optIdx);
    const isRight = optIdx === current.correctIndex;
    setAnswers((prev) => ({ ...prev, [current.id]: isRight }));

    if (sfxEnabled) playFeedbackTone(isRight ? 'correct' : 'wrong');
    speakText(current.fullCorrectSentence, { accent, rate });
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setFinished(false);
  };

  // Keyboard: 1–4 answer, Enter continues
  const keyHandlerRef = useRef<(e: KeyboardEvent) => void>(() => {});
  keyHandlerRef.current = (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey || finished || !current) return;
    const target = e.target as HTMLElement | null;
    if (target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;
    const n = Number(e.key);
    if (selectedOption === null && n >= 1 && n <= current.options.length) {
      e.preventDefault();
      handleChoose(n - 1);
    } else if (selectedOption !== null && e.key === 'Enter' && !(target instanceof HTMLButtonElement)) {
      e.preventDefault();
      handleNext();
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => keyHandlerRef.current(e);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  const correctCount = Object.values(answers).filter(Boolean).length;
  const answeredCount = Object.keys(answers).length;
  const percent = Math.round((correctCount / Math.max(questions.length, 1)) * 100);
  const isRight = current && selectedOption === current.correctIndex;

  return (
    <div>
      <section className="section-hero">
        <div>
          <h2>Kvíz: Tvorba časov a opytovanie (+ / −)</h2>
          <p>
            Over si, či správne tvoríš prítomný, minulý a budúci čas, či po „did/didn’t“ vraciaš sloveso
            do 1. tvaru a či vieš odpovedať na kladné aj záporné otázky.
          </p>
        </div>
        <div className="hero-actions" style={{ width: 'auto' }}>
          <div className="stat-pill" aria-live="polite">
            Skóre: {correctCount} / {questions.length}
          </div>
        </div>
      </section>

      <div className="chip-row scroll-x" style={{ marginBottom: '1.1rem' }} role="group" aria-label="Téma kvízu">
        {(Object.keys(CATEGORY_LABELS) as QuizCategoryFilter[]).map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-chip ${category === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
            aria-pressed={category === cat}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {finished ? (
        <div className="card" style={{ textAlign: 'center', padding: '2.25rem 1.25rem', maxWidth: '680px', margin: '0 auto' }}>
          <div className="result-icon">
            <Trophy size={28} aria-hidden="true" />
          </div>
          <h3 style={{ margin: '0 0 0.35rem', fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>
            Kvíz dokončený
          </h3>
          <p style={{ margin: '0 0 1.2rem', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Výsledok: <strong>{correctCount} z {questions.length}</strong> správne ({percent} %).
          </p>
          <button type="button" className="btn btn-primary" onClick={handleRestart} autoFocus>
            <RotateCcw size={16} aria-hidden="true" />
            <span>Spustiť kvíz znova</span>
          </button>
        </div>
      ) : current ? (
        <div className="practice-stage" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.6rem' }}>
            <span className="small" style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
              Otázka {index + 1} z {questions.length}
            </span>
            <span className="badge badge-purple">{CATEGORY_LABELS[current.category]}</span>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-label="Postup v kvíze"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={answeredCount}
          >
            <span style={{ width: `${(answeredCount / Math.max(questions.length, 1)) * 100}%` }} />
          </div>

          <p style={{ margin: '0 0 0.65rem', fontWeight: 700, fontSize: '1.02rem' }}>{current.promptSk}</p>

          <div className="card-muted gap-sentence" style={{ marginBottom: '0.25rem' }}>
            {current.sentenceWithBlank}
          </div>

          <div className="choice-grid">
            {current.options.map((opt, optIdx) => {
              const isChosen = selectedOption === optIdx;
              const isRightOption = optIdx === current.correctIndex;
              let cls = '';
              if (selectedOption !== null) {
                if (isRightOption) cls = 'correct';
                else if (isChosen) cls = 'wrong';
              }

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={selectedOption !== null}
                  data-key={optIdx + 1}
                  onClick={() => handleChoose(optIdx)}
                  className={`choice-btn ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedOption === null ? (
            <span className="kbd-hint">
              Klávesy <kbd>1</kbd>–<kbd>{current.options.length}</kbd> vyberú odpoveď
            </span>
          ) : (
            <div className="stack" style={{ gap: '0.9rem' }}>
              <div className={isRight ? 'callout-success' : 'callout-error'} style={{ display: 'grid', gap: '0.4rem' }} role="status">
                <div className="row-between" style={{ alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    {isRight ? (
                      <CheckCircle2 size={17} color="var(--emerald)" aria-hidden="true" />
                    ) : (
                      <XCircle size={17} color="var(--rose)" aria-hidden="true" />
                    )}
                    {current.fullCorrectSentence}
                  </span>
                  <AudioButton text={current.fullCorrectSentence} accent={accent} rate={rate} label="Vypočuť vetu" />
                </div>
                <div style={{ fontSize: '0.9rem' }}>{current.translationSk}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <strong>Vysvetlenie:</strong> {current.explanationSk}
                </div>
              </div>

              <div className="action-row">
                <button type="button" className="btn btn-primary" onClick={handleNext} autoFocus>
                  <span>{index + 1 >= questions.length ? 'Zobraziť výsledok' : 'Ďalšia otázka'}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
