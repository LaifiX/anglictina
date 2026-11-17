import { AlertTriangle, BookOpen, CheckCircle2, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { useState } from 'react';
import { QUESTION_MASTER_GUIDE, TENSE_GUIDES } from '../data/grammarData';
import type { Accent, SpeechRate, TenseCategory } from '../types/english';
import { AudioButton } from './AudioButton';
import { SentenceLab } from './SentenceLab';

interface GrammarSectionProps {
  accent: Accent;
  rate: SpeechRate;
  onGoToQuiz: () => void;
}

export function GrammarSection({ accent, rate, onGoToQuiz }: GrammarSectionProps) {
  const [filter, setFilter] = useState<'all' | TenseCategory>('all');

  const visibleTenses = TENSE_GUIDES.filter(
    (t) => filter === 'all' || t.category === filter
  );
  const showQuestionMaster = filter === 'all' || filter === 'questions';

  return (
    <div>
      <section className="section-hero">
        <div>
          <h2>Prítomný, minulý a budúci čas + pozitívne a negatívne otázky</h2>
          <p>
            Zrozumiteľné slovenské vysvetlenie tvorby všetkých základných anglických časov, porovnanie
            so slovenčinou, ukážky so zvukom a kompletný návod, ako tvoriť kladné aj záporné otázky
            a správne na ne odpovedať.
          </p>
        </div>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={onGoToQuiz}>
            Otestovať sa v kvíze
          </button>
        </div>
      </section>

      {/* Interactive Sentence & Question Sandbox */}
      <SentenceLab accent={accent} rate={rate} />

      {/* Category Filter Tabs */}
      <div className="tense-tabs" role="group" aria-label="Filter gramatických tém">
        {[
          { id: 'all', label: 'Všetko (prehľad)' },
          { id: 'present', label: 'Prítomný čas' },
          { id: 'past', label: 'Minulý čas (+ V3 most)' },
          { id: 'future', label: 'Budúci čas' },
          { id: 'questions', label: 'Opytovanie (+ a −)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={filter === tab.id}
            className={`filter-chip ${filter === tab.id ? 'active' : ''}`}
            onClick={() => setFilter(tab.id as 'all' | TenseCategory)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quick Glance Matrix when viewing 'all' */}
      {filter === 'all' && (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem' }}>
            Rýchla mapa časov na jednom mieste
          </h3>
          <div className="verb-table-wrap">
            <table className="verb-table">
              <thead>
                <tr>
                  <th>Čas</th>
                  <th>Kladná (+)</th>
                  <th>Zápor (−)</th>
                  <th>Pozitívna otázka (?+)</th>
                  <th>Negatívna otázka (?−)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Prítomný jednoduchý</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>zvyky, fakty</div>
                  </td>
                  <td className="mono">I go / He goes</td>
                  <td className="mono">don’t / doesn’t + V1</td>
                  <td className="mono">Do / Does ... V1?</td>
                  <td className="mono">Don’t / Doesn’t ... V1?</td>
                </tr>
                <tr>
                  <td>
                    <strong>Prítomný priebehový</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>práve teraz</div>
                  </td>
                  <td className="mono">am/is/are + V-ing</td>
                  <td className="mono">isn’t / aren’t + V-ing</td>
                  <td className="mono">Am/Is/Are ... V-ing?</td>
                  <td className="mono">Isn’t/Aren’t ... V-ing?</td>
                </tr>
                <tr>
                  <td>
                    <strong>Minulý jednoduchý</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>ukončená minulosť</div>
                  </td>
                  <td className="mono">V2 (went) / -ed</td>
                  <td className="mono">didn’t + V1!</td>
                  <td className="mono">Did ... V1?</td>
                  <td className="mono">Didn’t ... V1?</td>
                </tr>
                <tr>
                  <td>
                    <strong>Minulý priebehový</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>dej na pozadí</div>
                  </td>
                  <td className="mono">was/were + V-ing</td>
                  <td className="mono">wasn’t/weren’t + V-ing</td>
                  <td className="mono">Was/Were ... V-ing?</td>
                  <td className="mono">Wasn’t/Weren’t ... V-ing?</td>
                </tr>
                <tr>
                  <td>
                    <strong>Predprítomný (V3!)</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>skúsenosť / dôsledok</div>
                  </td>
                  <td className="mono">have/has + V3</td>
                  <td className="mono">haven’t/hasn’t + V3</td>
                  <td className="mono">Have/Has ... V3?</td>
                  <td className="mono">Haven’t/Hasn’t ... V3?</td>
                </tr>
                <tr>
                  <td>
                    <strong>Budúci (will)</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>rozhodnutie teraz, sľub</div>
                  </td>
                  <td className="mono">will + V1</td>
                  <td className="mono">won’t + V1</td>
                  <td className="mono">Will ... V1?</td>
                  <td className="mono">Won’t ... V1?</td>
                </tr>
                <tr>
                  <td>
                    <strong>Budúci (going to)</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>plán vopred, dôkaz</div>
                  </td>
                  <td className="mono">am/is/are going to + V1</td>
                  <td className="mono">isn’t/aren’t going to + V1</td>
                  <td className="mono">Am/Is/Are ... going to + V1?</td>
                  <td className="mono">Isn’t/Aren’t ... going to + V1?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Tense Cards */}
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {visibleTenses.map((tense) => (
          <article key={tense.id} id={`tense-${tense.id}`} className="card tense-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <span className="badge badge-blue">{tense.titleEn}</span>
                  <span className="badge badge-purple">
                    {tense.category === 'present'
                      ? 'Prítomnosť'
                      : tense.category === 'past'
                        ? 'Minulosť'
                        : 'Budúcnosť'}
                  </span>
                </div>
                <h3 className="tense-title">{tense.titleSk}</h3>
                <p className="tense-sub">{tense.subtitleSk}</p>
              </div>
            </div>

            <div className="two-col-grid">
              <div className="card-muted">
                <h4>
                  <CheckCircle2 size={16} color="var(--emerald)" />
                  <span>Kedy tento čas používame?</span>
                </h4>
                <ul>
                  {tense.whenToUseSk.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="callout-info">
                <h4>
                  <BookOpen size={16} />
                  <span>Vysvetlenie cez slovenčinu</span>
                </h4>
                <p style={{ margin: 0, fontSize: '0.88rem' }}>{tense.slovakBridgeSk}</p>
              </div>
            </div>

            {/* Forming Rules */}
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {tense.formingRulesSk.map((rule) => (
                <div key={rule.title} className="card-muted">
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
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
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Typické slovíčka:
              </span>
              {tense.signalWords.map((sw) => (
                <span key={sw.en} className="badge badge-blue">
                  {sw.en} ({sw.sk})
                </span>
              ))}
            </div>

            {/* 4-Polarity Matrix (+, -, ?+, ?-) */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.96rem' }}>
                Tvorba kladnej vety, záporu aj pozitívnej a negatívnej otázky:
              </h4>
              <div className="matrix-grid" style={{ margin: 0 }}>
                {tense.matrix.map((row) => (
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
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>Formálne: {row.enFormal}</span>
                        <AudioButton text={row.enFormal} accent={accent} rate={rate} iconOnly />
                      </div>
                    )}
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      <span className="lang-tag">SK</span> {row.sk}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.whySk}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Short Answers & Common Mistake */}
            <div className="two-col-grid">
              <div className="callout-tip">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, marginBottom: '0.35rem', fontSize: '0.9rem' }}>
                  <HelpCircle size={16} />
                  <span>Ako odpovedať na kladnú a zápornú otázku</span>
                </div>
                <div style={{ fontSize: '0.86rem', display: 'grid', gap: '0.25rem' }}>
                  <div>
                    Pozitívna: <strong>{tense.shortAnswers.positiveQ}</strong>
                  </div>
                  <div>
                    Negatívna: <strong>{tense.shortAnswers.negativeQ}</strong>
                  </div>
                  <div>
                    Odpovede: <span className="mono">{tense.shortAnswers.yes}</span> /{' '}
                    <span className="mono">{tense.shortAnswers.no}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    {tense.shortAnswers.negAnswerNoteSk}
                  </div>
                </div>
              </div>

              <div className="callout-error">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, marginBottom: '0.35rem', fontSize: '0.9rem' }}>
                  <AlertTriangle size={16} />
                  <span>Pozor na typickú chybu</span>
                </div>
                <div style={{ fontSize: '0.86rem', display: 'grid', gap: '0.25rem' }}>
                  <div style={{ color: 'var(--rose)', textDecoration: 'line-through' }}>
                    ✗ {tense.commonMistakeSk.wrong}
                  </div>
                  <div style={{ color: 'var(--emerald)', fontWeight: 700 }}>
                    ✓ {tense.commonMistakeSk.right}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    {tense.commonMistakeSk.explanationSk}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Dedicated Master Guide: Positive & Negative Questions */}
        {showQuestionMaster && (
          <article className="card" style={{ display: 'grid', gap: '1rem', border: '2px solid color-mix(in srgb, var(--amber) 40%, var(--border-subtle))' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--amber)', fontWeight: 800, fontSize: '0.84rem', marginBottom: '0.25rem' }}>
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
                    <div className="card" style={{ padding: '0.75rem 0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                      <div>
                        <span className="badge badge-blue" style={{ marginBottom: '0.25rem' }}>Pozitívna / príklad 1</span>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{rule.posExample}</div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{rule.posSk}</div>
                      </div>
                      <AudioButton text={rule.posExample} accent={accent} rate={rate} iconOnly />
                    </div>

                    <div className="card" style={{ padding: '0.75rem 0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                      <div>
                        <span className="badge badge-amber" style={{ marginBottom: '0.25rem' }}>Negatívna / príklad 2</span>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{rule.negExample}</div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{rule.negSk}</div>
                      </div>
                      <AudioButton text={rule.negExample} accent={accent} rate={rate} iconOnly />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
