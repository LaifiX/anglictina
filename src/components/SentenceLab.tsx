import { Columns2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { TENSE_GUIDES } from '../data/grammarData';
import type { Accent, SentencePolarity, SpeechRate, TenseGuide } from '../types/english';
import {
  BUILDER_SUBJECTS,
  BUILDER_VERBS,
  BUILDER_WH_WORDS,
  type BuilderSubject,
  type BuilderWhWord,
  buildInteractiveSentence,
} from '../utils/sentenceBuilder';
import { AudioButton } from './AudioButton';

interface SentenceLabProps {
  accent: Accent;
  rate: SpeechRate;
}

const POLARITY_LABELS: { id: SentencePolarity; badge: string; label: string }[] = [
  { id: 'aff', badge: '+', label: 'Kladná veta' },
  { id: 'neg', badge: '−', label: 'Záporná veta' },
  { id: 'qPos', badge: '?+', label: 'Pozitívna otázka' },
  { id: 'qNeg', badge: '?−', label: 'Negatívna otázka' },
];

export function SentenceLab({ accent, rate }: SentenceLabProps) {
  const [tenseId, setTenseId] = useState<TenseGuide['id']>('past-simple');
  const [subject, setSubject] = useState<BuilderSubject>('you');
  const [verbId, setVerbId] = useState<string>('go');
  const [polarity, setPolarity] = useState<SentencePolarity>('qNeg');
  const [whWord, setWhWord] = useState<BuilderWhWord>('');
  const [compareAll, setCompareAll] = useState(true);

  const selectedVerb = BUILDER_VERBS.find((v) => v.id === verbId) ?? BUILDER_VERBS[0];
  const isQuestion = polarity === 'qPos' || polarity === 'qNeg';

  const result = buildInteractiveSentence({
    tenseId,
    subject,
    verb: selectedVerb,
    polarity,
    whWord,
  });

  return (
    <section className="builder-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <div className="builder-eyebrow">
            <Sparkles size={15} />
            <span>Interaktívne laboratórium viet a opytovania</span>
          </div>
          <h3 className="tense-title">
            Vyskúšaj si tvorbu času, kladnej aj zápornej otázky naživo
          </h3>
        </div>
        <button
          type="button"
          className={`pill-toggle ${compareAll ? 'active' : ''}`}
          onClick={() => setCompareAll((v) => !v)}
          aria-pressed={compareAll}
        >
          <Columns2 size={15} />
          <span>Porovnať 4 formy</span>
        </button>
      </div>

      <div className="builder-controls">
        <div>
          <label className="field-label" htmlFor="lab-tense">
            1. Vyber čas
          </label>
          <select
            id="lab-tense"
            className="select-input"
            style={{ width: '100%' }}
            value={tenseId}
            onChange={(e) => setTenseId(e.target.value as TenseGuide['id'])}
          >
            {TENSE_GUIDES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titleSk} ({t.titleEn})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="lab-subject">
            2. Podmet (osoba)
          </label>
          <select
            id="lab-subject"
            className="select-input"
            style={{ width: '100%' }}
            value={subject}
            onChange={(e) => setSubject(e.target.value as BuilderSubject)}
          >
            {BUILDER_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.labelSk}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="lab-verb">
            3. Nepravidelné sloveso
          </label>
          <select
            id="lab-verb"
            className="select-input"
            style={{ width: '100%' }}
            value={verbId}
            onChange={(e) => setVerbId(e.target.value)}
          >
            {BUILDER_VERBS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.v1} – {v.v2} – {v.v3} ({v.complementSk})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="lab-wh">
            4. Opytovacie slovo (pri otázke)
          </label>
          <select
            id="lab-wh"
            className="select-input"
            style={{ width: '100%' }}
            value={whWord}
            disabled={!isQuestion}
            onChange={(e) => setWhWord(e.target.value as BuilderWhWord)}
          >
            {BUILDER_WH_WORDS.map((w) => (
              <option key={w.id || 'none'} value={w.id}>
                {w.labelSk}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="polarity-pills" role="group" aria-label="Forma vety">
        {POLARITY_LABELS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`filter-chip ${polarity === item.id ? 'active' : ''}`}
            onClick={() => setPolarity(item.id)}
            aria-pressed={polarity === item.id}
          >
            <strong className="mono">{item.badge}</strong> {item.label}
          </button>
        ))}
      </div>

      <div className="sentence-stage">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="token-row">
            {result.tokens.map((tok, index) => (
              <div key={`${tok.text}-${index}`} className={`token-chip ${tok.role}`}>
                <span className="token-word">{tok.text}</span>
                {tok.labelSk && <span className="token-role">{tok.labelSk}</span>}
              </div>
            ))}
          </div>

          <AudioButton
            text={result.english}
            accent={accent}
            rate={rate}
            label="Vypočuť vetu"
          />
        </div>

        <div style={{ fontSize: '1.08rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          <span className="lang-tag">SK</span> {result.slovak}
        </div>

        {result.formalEnglish && (
          <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>
              Formálny / neskrátený tvar: <strong>{result.formalEnglish}</strong>
            </span>
            <AudioButton text={result.formalEnglish} accent={accent} rate={rate} iconOnly title="Prehrať formálny tvar" />
          </div>
        )}

        <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <strong>Vysvetlenie:</strong> {result.explanationSk}
        </p>

        {result.noteSk && (
          <div className="callout-tip" style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', fontSize: '0.84rem' }}>
            {result.noteSk}
          </div>
        )}
      </div>

      {compareAll && (
        <div className="matrix-grid" style={{ marginTop: '1rem', marginBottom: 0 }}>
          {POLARITY_LABELS.map((item) => {
            const row = buildInteractiveSentence({
              tenseId,
              subject,
              verb: selectedVerb,
              polarity: item.id,
              whWord,
            });
            return (
              <div key={item.id} className={`matrix-card ${item.id}`}>
                <div className="matrix-head">
                  <span>
                    <span className="mono">{item.badge}</span> {item.label}
                  </span>
                  <AudioButton text={row.english} accent={accent} rate={rate} iconOnly />
                </div>
                <div className="matrix-en">{row.english}</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>{row.slovak}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
