import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  KeyRound,
  Layers,
  ListOrdered,
  Play,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useState } from 'react';
import { TENSE_GUIDE_MAP } from '../data/grammarData';
import { EXERCISES_BY_TENSE } from '../data/tenses';
import {
  ASPECT_MATRIX,
  AUXILIARY_SECRET,
  SLOVAK_TRAPS,
  SPELLING_AND_SOUND_GUIDE,
  STATIVE_VERBS_GUIDE,
  TENSE_DECISION_NODES,
  WORD_ORDER_GUIDE,
} from '../data/theoryAcademy';
import type {
  Accent,
  SpeechRate,
  TenseId,
  TenseQuizLaunchRequest,
} from '../types/english';
import { AudioButton } from './AudioButton';

interface TheoryAcademyProps {
  accent: Accent;
  rate: SpeechRate;
  onSelectLesson: (tenseId: TenseId) => void;
  onLaunchQuiz: (req: Omit<TenseQuizLaunchRequest, 'nonce'>) => void;
}

const CHAPTER_LINKS = [
  { id: 'th-compass', label: 'Rozhodovací kompas' },
  { id: 'th-matrix', label: 'Matica 3 × 4' },
  { id: 'th-aux', label: 'Tajomstvo do/does/did' },
  { id: 'th-traps', label: '7 slovenských pascí' },
  { id: 'th-stative', label: 'Stavové slovesá' },
  { id: 'th-order', label: 'Slovosled SVOMPT' },
  { id: 'th-spelling', label: 'Pravopis a -ed zvuk' },
];

export function TheoryAcademy({
  accent,
  rate,
  onSelectLesson,
  onLaunchQuiz,
}: TheoryAcademyProps) {
  const [compassTime, setCompassTime] = useState<'present' | 'past' | 'future'>('present');
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>(TENSE_DECISION_NODES[0].id);

  const compassOptions = TENSE_DECISION_NODES.filter((n) => n.timeGroup === compassTime);
  const activeDecision =
    compassOptions.find((n) => n.id === selectedDecisionId) ?? compassOptions[0];
  const activeDecisionGuide = TENSE_GUIDE_MAP[activeDecision.tenseId];

  const handleCompassTime = (time: 'present' | 'past' | 'future') => {
    setCompassTime(time);
    const first = TENSE_DECISION_NODES.find((n) => n.timeGroup === time);
    if (first) setSelectedDecisionId(first.id);
  };

  return (
    <div className="stack">
      {/* Intro Banner + Quick Jump Chapters */}
      <section className="card academy-hero">
        <div className="builder-eyebrow">
          <GraduationCap size={16} />
          <span>Akadémia anglických časov polopate pre Slovákov</span>
        </div>
        <h3 className="tense-title" style={{ marginBottom: '0.35rem' }}>
          Pochop logiku angličtiny raz a navždy — bez suchopárneho bifľovania
        </h3>
        <p style={{ margin: '0 0 0.9rem', color: 'var(--text-secondary)', fontSize: '0.93rem' }}>
          Slovenčina má iba 3 časy (minulý, prítomný, budúci), ale používa <strong>vid</strong>{' '}
          (<em>písal som</em> vs. <em>napísal som</em>) a predpony. Angličtina predpony nemá —
          namiesto toho rozlišuje <strong>pohľad kamery</strong> na dej (bod, rozbehnutý film alebo
          most k výsledku). Tu máš celý systém na jednom mieste.
        </p>

        <div className="chip-row scroll-x" aria-label="Kapitoly teórie">
          {CHAPTER_LINKS.map((ch) => (
            <a key={ch.id} href={`#${ch.id}`} className="filter-chip" style={{ textDecoration: 'none' }}>
              {ch.label}
            </a>
          ))}
        </div>
      </section>

      {/* === CHAPTER 1: INTERACTIVE DECISION COMPASS === */}
      <section id="th-compass" className="card academy-section">
        <div className="academy-section-head">
          <span className="badge badge-blue">1. Interaktívna pomôcka</span>
          <h3>
            <Compass size={19} color="var(--primary)" aria-hidden="true" />
            <span>Rozhodovací kompas: Ktorý z 9 časov mám použiť?</span>
          </h3>
          <p className="small muted" style={{ margin: 0 }}>
            Vyber si najprv časovú oblasť a potom situáciu, ktorú chceš po slovensky vyjadriť.
          </p>
        </div>

        <div className="compass-time-row" role="group" aria-label="Časová oblasť">
          {[
            { id: 'present' as const, label: 'Prítomnosť (a „už doteraz“)' },
            { id: 'past' as const, label: 'Minulosť (vrátane skúseností)' },
            { id: 'future' as const, label: 'Budúcnosť' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`filter-chip ${compassTime === item.id ? 'active' : ''}`}
              aria-pressed={compassTime === item.id}
              onClick={() => handleCompassTime(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="compass-grid">
          <div className="stack-sm">
            {compassOptions.map((node) => {
              const active = node.id === activeDecision.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  className={`compass-option ${active ? 'active' : ''}`}
                  aria-pressed={active}
                  onClick={() => setSelectedDecisionId(node.id)}
                >
                  <span>{node.questionSk}</span>
                  <ArrowRight size={15} style={{ flexShrink: 0 }} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="compass-result">
            <div className="row" style={{ marginBottom: '0.35rem' }}>
              <span className="badge badge-blue">
                Krok {activeDecisionGuide.order} · {activeDecisionGuide.level}
              </span>
              <span className="badge badge-purple">{activeDecisionGuide.titleEn}</span>
            </div>
            <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', fontFamily: 'var(--font-display)' }}>
              {activeDecisionGuide.titleSk}
            </h4>
            <p style={{ margin: '0 0 0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {activeDecision.answerSk}
            </p>
            <div className="formula-ribbon mono" style={{ marginTop: 0, marginBottom: '0.75rem' }}>
              {activeDecisionGuide.formulaQuick}
            </div>

            <div className="card" style={{ padding: '0.75rem 0.9rem', marginBottom: '0.85rem' }}>
              <div className="row-between" style={{ alignItems: 'center' }}>
                <strong>{activeDecision.exampleEn}</strong>
                <AudioButton text={activeDecision.exampleEn} accent={accent} rate={rate} iconOnly />
              </div>
              <div className="small muted" style={{ marginTop: '0.2rem' }}>
                <span className="lang-tag">SK</span> {activeDecision.exampleSk}
              </div>
            </div>

            <div className="action-row">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  onLaunchQuiz({
                    mode: 'single',
                    tenses: [activeDecision.tenseId],
                    roundSize: 20,
                    autoStart: true,
                  })
                }
              >
                <Play size={14} aria-hidden="true" />
                <span>
                  Precvičiť ({EXERCISES_BY_TENSE[activeDecision.tenseId].length} príkladov)
                </span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => onSelectLesson(activeDecision.tenseId)}
              >
                <BookOpen size={14} aria-hidden="true" />
                <span>Otvoriť lekciu</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* === CHAPTER 2: 3 × 4 SYSTEM MATRIX === */}
      <section id="th-matrix" className="card academy-section">
        <div className="academy-section-head">
          <span className="badge badge-purple">2. Veľký obraz systému</span>
          <h3>
            <Layers size={19} color="var(--purple)" aria-hidden="true" />
            <span>Matica anglických časov: KEDY × AKO SA NA DEJ POZERÁŠ</span>
          </h3>
          <p className="small muted" style={{ margin: 0 }}>
            Každý anglický čas je iba priesečníkom dvoch otázok: <strong>Kedy</strong> sa dej deje
            (stĺpce) a <strong>aký pohľad kamery</strong> použiješ (riadky). Ťukni na ľubovoľný
            z našich 9 časov a otvoríš jeho lekciu.
          </p>
        </div>

        <div className="stack-sm">
          {ASPECT_MATRIX.map((row) => (
            <div key={row.aspectEn} className="aspect-card">
              <div className="aspect-head">
                <div>
                  <strong>{row.aspectEn}</strong> —{' '}
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{row.aspectSk}</span>
                </div>
                <div className="small muted" style={{ marginTop: '0.15rem' }}>
                  {row.metaphorSk}
                </div>
              </div>

              <div className="aspect-cols">
                {[
                  { colLabel: 'Minulosť', cell: row.past },
                  { colLabel: 'Prítomnosť', cell: row.present },
                  { colLabel: 'Budúcnosť', cell: row.future },
                ].map(({ colLabel, cell }) => (
                  <div
                    key={colLabel}
                    className={`aspect-cell ${cell.tenseId ? 'is-core' : 'is-bonus'}`}
                  >
                    <div className="row-between" style={{ alignItems: 'center' }}>
                      <span className="small muted" style={{ fontWeight: 700 }}>
                        {colLabel}
                      </span>
                      {cell.tenseId ? (
                        <button
                          type="button"
                          className="table-link-btn"
                          style={{ fontSize: '0.78rem', fontWeight: 700 }}
                          onClick={() => onSelectLesson(cell.tenseId!)}
                        >
                          Lekcia →
                        </button>
                      ) : (
                        <span className="badge badge-outline">C1 navyše</span>
                      )}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', marginTop: '0.15rem' }}>
                      {cell.name}
                    </div>
                    <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--primary)', margin: '0.2rem 0' }}>
                      {cell.example}
                    </div>
                    <div className="small muted">{cell.noteSk}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CHAPTER 3: AUXILIARY VERBS SECRET === */}
      <section id="th-aux" className="card academy-section">
        <div className="academy-section-head">
          <span className="badge badge-emerald">3. Najdôležitejšie pravidlo</span>
          <h3>
            <KeyRound size={19} color="var(--emerald)" aria-hidden="true" />
            <span>{AUXILIARY_SECRET.titleSk}</span>
          </h3>
          <p className="small muted" style={{ margin: 0 }}>
            {AUXILIARY_SECRET.leadSk}
          </p>
        </div>

        <div className="two-col-grid">
          {AUXILIARY_SECRET.steps.map((st) => (
            <div key={st.badge} className="card-muted">
              <span className="badge badge-emerald" style={{ marginBottom: '0.35rem' }}>
                {st.badge}
              </span>
              <div style={{ fontWeight: 800, fontSize: '0.94rem', marginBottom: '0.3rem' }}>
                {st.title}
              </div>
              <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--text-secondary)' }}>
                {st.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === CHAPTER 4: 7 SLOVAK TRAPS === */}
      <section id="th-traps" className="card academy-section">
        <div className="academy-section-head">
          <span className="badge badge-rose">4. Falošní priatelia</span>
          <h3>
            <AlertTriangle size={19} color="var(--rose)" aria-hidden="true" />
            <span>7 najčastejších pascí, do ktorých padajú Slováci</span>
          </h3>
        </div>

        <div className="stack-sm">
          {SLOVAK_TRAPS.map((trap, i) => (
            <div key={trap.id} className="trap-card">
              <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.35rem' }}>
                <strong style={{ fontSize: '0.95rem' }}>
                  {i + 1}. {trap.slovakSentence}
                </strong>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => onSelectLesson(trap.tenseId)}
                >
                  {TENSE_GUIDE_MAP[trap.tenseId].titleEn} →
                </button>
              </div>
              <div className="two-col-grid" style={{ gap: '0.55rem', marginBottom: '0.45rem' }}>
                <div className="callout-error" style={{ padding: '0.55rem 0.75rem' }}>
                  <span style={{ color: 'var(--rose)', fontWeight: 700, textDecoration: 'line-through' }}>
                    ✗ {trap.wrongEn}
                  </span>
                </div>
                <div className="callout-success" style={{ padding: '0.55rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--emerald)', fontWeight: 800 }}>✓ {trap.rightEn}</span>
                  <AudioButton text={trap.rightEn} accent={accent} rate={rate} iconOnly />
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                {trap.whySk}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === CHAPTER 5: STATIVE VS DYNAMIC VERBS === */}
      <section id="th-stative" className="card academy-section">
        <div className="academy-section-head">
          <span className="badge badge-amber">5. Kedy nesmieš dať -ing</span>
          <h3>
            <Sparkles size={19} color="var(--amber)" aria-hidden="true" />
            <span>Stavové vs. dejové slovesá (a chameleóny)</span>
          </h3>
          <p className="small muted" style={{ margin: 0 }}>
            {STATIVE_VERBS_GUIDE.introSk}
          </p>
        </div>

        <div className="two-col-grid">
          {STATIVE_VERBS_GUIDE.groups.map((grp) => (
            <div key={grp.title} className="card-muted">
              <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {grp.title}
              </div>
              <div className="small" style={{ color: 'var(--text-secondary)' }}>
                {grp.verbs}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 style={{ margin: '0.25rem 0 0.55rem', fontSize: '0.95rem' }}>
            Chameleónové slovesá — menia význam v Simple vs. Continuous:
          </h4>
          <div className="stack-sm">
            {STATIVE_VERBS_GUIDE.chameleons.map((ch) => (
              <div key={ch.verb} className="contrast-pair-wrap">
                <div className="two-col-grid">
                  <div className="contrast-side">
                    <span className="badge badge-blue mono">{ch.verb} · Simple (stav)</span>
                    <div className="row-between" style={{ alignItems: 'center', marginTop: '0.3rem' }}>
                      <strong>{ch.simpleEn}</strong>
                      <AudioButton text={ch.simpleEn} accent={accent} rate={rate} iconOnly />
                    </div>
                    <div className="small muted">{ch.simpleSk}</div>
                  </div>
                  <div className="contrast-side">
                    <span className="badge badge-purple mono">{ch.verb} · Continuous (dej)</span>
                    <div className="row-between" style={{ alignItems: 'center', marginTop: '0.3rem' }}>
                      <strong>{ch.contEn}</strong>
                      <AudioButton text={ch.contEn} accent={accent} rate={rate} iconOnly />
                    </div>
                    <div className="small muted">{ch.contSk}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CHAPTER 6: SVOMPT WORD ORDER === */}
      <section id="th-order" className="card academy-section">
        <div className="academy-section-head">
          <span className="badge badge-blue">6. Stavba vety</span>
          <h3>
            <ListOrdered size={19} color="var(--primary)" aria-hidden="true" />
            <span>Slovosled v anglickej vete: Pravidlo {WORD_ORDER_GUIDE.formula}</span>
          </h3>
          <p className="small muted" style={{ margin: 0 }}>
            {WORD_ORDER_GUIDE.slovakComparisonSk}
          </p>
        </div>

        <div className="svompt-strip">
          {WORD_ORDER_GUIDE.legend.map((item) => (
            <div key={item.code} className="svompt-cell">
              <span className="svompt-code mono">{item.code}</span>
              <strong>{item.ex}</strong>
              <span className="small muted">{item.sk}</span>
            </div>
          ))}
        </div>

        <div className="stack-sm">
          {WORD_ORDER_GUIDE.adverbPlacement.map((adv) => (
            <div key={adv.words} className="card-muted">
              <div className="mono" style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--primary)' }}>
                {adv.words}
              </div>
              <div style={{ fontSize: '0.88rem', margin: '0.2rem 0 0.35rem' }}>{adv.ruleSk}</div>
              <div className="row">
                {adv.examples.map((ex) => (
                  <span key={ex} className="badge badge-outline" style={{ whiteSpace: 'normal' }}>
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CHAPTER 7: SPELLING & PRONUNCIATION === */}
      <section id="th-spelling" className="card academy-section">
        <div className="academy-section-head">
          <span className="badge badge-purple">7. Pravopis a zvuk</span>
          <h3>
            <Volume2 size={19} color="var(--purple)" aria-hidden="true" />
            <span>Pravopis koncoviek (-s, -ing, -ed) a výslovnosť koncovky -ed</span>
          </h3>
        </div>

        <div className="stack-sm">
          {SPELLING_AND_SOUND_GUIDE.spellingRules.map((rule) => (
            <div key={rule.title} className="card-muted">
              <div style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.3rem' }}>
                {rule.title}
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'grid', gap: '0.28rem', fontSize: '0.87rem', color: 'var(--text-secondary)' }}>
                {rule.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h4 style={{ margin: '0.2rem 0 0.55rem', fontSize: '0.95rem' }}>
            Ako čítať koncovku „-ed“ správne (klikni na zvuk a počúvaj rozdiel):
          </h4>
          <div className="pron-ed-grid">
            {SPELLING_AND_SOUND_GUIDE.pronunciationEd.map((row) => (
              <div key={row.sound} className="card" style={{ padding: '0.85rem 0.95rem' }}>
                <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span className="badge badge-purple mono" style={{ fontSize: '0.92rem' }}>
                    {row.sound}
                  </span>
                  <AudioButton text={row.audioSample} accent={accent} rate={rate} label="Počuť" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: '0.25rem' }}>
                  {row.whenSk}
                </div>
                <div className="mono small muted">{row.examples}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
