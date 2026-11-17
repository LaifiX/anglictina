import { BookOpen, Lightbulb, Play, Volume2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LEVEL_INFO, PATTERN_INFO } from '../data/irregularVerbs';
import type { Accent, IrregularVerb, SpeechRate } from '../types/english';
import { speakSequence, speakText } from '../utils/speech';
import { AudioButton } from './AudioButton';

interface VerbDetailModalProps {
  verb: IrregularVerb;
  accent: Accent;
  rate: SpeechRate;
  onClose: () => void;
}

export function VerbDetailModal({ verb, accent, rate, onClose }: VerbDetailModalProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      // Keep keyboard focus inside the dialog
      if (e.key === 'Tab' && cardRef.current) {
        const focusables = cardRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  const handlePlayAll = () => {
    speakSequence([verb.v1, verb.v2, verb.v3], {
      accent,
      rate,
      onStep: (idx) => setActiveStep(idx),
      onDone: () => setActiveStep(null),
    });
  };

  const forms = [
    { idx: 0, label: 'V1 · základ', word: verb.v1, ipa: verb.ipa.v1, pron: verb.pronunciationSk.v1 },
    { idx: 1, label: 'V2 · minulosť', word: verb.v2, ipa: verb.ipa.v2, pron: verb.pronunciationSk.v2 },
    { idx: 2, label: 'V3 · príčastie', word: verb.v3, ipa: verb.ipa.v3, pron: verb.pronunciationSk.v3 },
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="verb-modal-title"
    >
      <div className="modal-card" ref={cardRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ minWidth: 0 }}>
            <div className="row" style={{ gap: '0.4rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-blue">{LEVEL_INFO[verb.level].label}</span>
              <span className="badge badge-purple">{PATTERN_INFO[verb.pattern].label}</span>
            </div>
            <h2 id="verb-modal-title" className="modal-title">
              {verb.translationSk}
            </h2>
            {verb.otherMeaningsSk && (
              <p className="muted" style={{ margin: '0.2rem 0 0', fontSize: '0.9rem' }}>
                Ďalšie významy: {verb.otherMeaningsSk}
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="Zavrieť detail slovesa"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.7rem' }}>
            <span className="small" style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
              Základné tvary — ťukni pre zvuk
            </span>
            <button
              type="button"
              className={`audio-btn ${activeStep !== null ? 'speaking' : ''}`}
              onClick={handlePlayAll}
            >
              <Play size={15} aria-hidden="true" />
              <span>Prehrať všetky 3 tvary</span>
            </button>
          </div>

          <div className="detail-grid-3">
            {forms.map((f) => (
              <button
                key={f.idx}
                type="button"
                onClick={() => speakText(f.word, { accent, rate })}
                className={`detail-box ${activeStep === f.idx ? 'highlight' : ''}`}
                aria-label={`Vypočuť ${f.word}`}
              >
                <div className="verb-form-tag">
                  <span>{f.label}</span>
                  <Volume2 size={14} aria-hidden="true" />
                </div>
                <div className="detail-word">
                  <span className={f.idx > 0 ? 'hl' : undefined}>{f.word}</span>
                </div>
                <div className="detail-pron mono">
                  {f.ipa} · „{f.pron}“
                </div>
              </button>
            ))}
          </div>

          <div className="card-muted row-between" style={{ alignItems: 'center', marginBottom: '1rem' }}>
            <div className="row" style={{ gap: '0.35rem 1.25rem', fontSize: '0.9rem' }}>
              <span>
                3. osoba (he/she/it): <strong>{verb.thirdPerson}</strong>
              </span>
              <span>
                Priebehový tvar (-ing): <strong>{verb.ingForm}</strong>
              </span>
            </div>
            <div className="row" style={{ gap: '0.4rem' }}>
              <AudioButton text={verb.thirdPerson} accent={accent} rate={rate} label={verb.thirdPerson} />
              <AudioButton text={verb.ingForm} accent={accent} rate={rate} label={verb.ingForm} />
            </div>
          </div>

          <div className="stack" style={{ gap: '0.8rem', marginBottom: '1.1rem' }}>
            <div className="callout-info">
              <div className="callout-title">
                <BookOpen size={17} aria-hidden="true" />
                <span>Ako sa toto sloveso vysvetľuje a používa v slovenčine</span>
              </div>
              <p style={{ margin: '0 0 0.65rem' }}>{verb.slovakExplanation.summary}</p>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.35rem' }}>
                <li>
                  <strong>V1 ({verb.v1}):</strong> {verb.slovakExplanation.formsGuide.v1}
                </li>
                <li>
                  <strong>V2 ({verb.v2}):</strong> {verb.slovakExplanation.formsGuide.v2}
                </li>
                <li>
                  <strong>V3 ({verb.v3}):</strong> {verb.slovakExplanation.formsGuide.v3}
                </li>
              </ul>
            </div>

            <div className="callout-tip">
              <div className="callout-title">
                <Lightbulb size={17} aria-hidden="true" />
                <span>Pomôcka a pozor na chyby</span>
              </div>
              <p style={{ margin: 0 }}>{verb.slovakExplanation.tipSk}</p>
            </div>
          </div>

          <h3 style={{ margin: '0 0 0.6rem', fontSize: '1rem' }}>Ukážky použitia vo vetách (so zvukom)</h3>
          <div className="example-list">
            {[
              { tag: 'V1 · prítomnosť / neurčitok', item: verb.examples.v1 },
              { tag: 'V2 · minulý čas', item: verb.examples.v2 },
              { tag: 'V3 · predprítomný čas / trpný rod', item: verb.examples.v3 },
              { tag: 'Otázka / zápor', item: verb.examples.questionNeg },
            ].map(({ tag, item }) => (
              <div key={tag} className="example-row">
                <div style={{ minWidth: 0 }}>
                  <div className="example-tag">{tag}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{item.en}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.sk}</div>
                  <div className="muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    {item.note}
                  </div>
                </div>
                <AudioButton text={item.en} accent={accent} rate={rate} iconOnly title={`Prehrať vetu: ${item.en}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
