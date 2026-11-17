import { CheckCircle2, Info, LayoutGrid, Play, Search, Table2, Volume2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { IRREGULAR_VERBS, LEVEL_INFO, PATTERN_INFO } from '../data/irregularVerbs';
import type { Accent, IrregularVerb, ProgressMap, SpeechRate, VerbLevel, VerbPattern } from '../types/english';
import { speakSequence, speakText } from '../utils/speech';
import { useMediaQuery } from '../utils/useMediaQuery';
import { VerbDetailModal } from './VerbDetailModal';

interface VerbDictionaryProps {
  accent: Accent;
  rate: SpeechRate;
  progress: ProgressMap;
  onStartPracticeWithFilter: (level: VerbLevel | 'all', pattern: VerbPattern | 'all') => void;
}

function stripDiacritics(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export function VerbDictionary({
  accent,
  rate,
  progress,
  onStartPracticeWithFilter,
}: VerbDictionaryProps) {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<VerbLevel | 'all'>('all');
  const [patternFilter, setPatternFilter] = useState<VerbPattern | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'mastered' | 'todo'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedVerb, setSelectedVerb] = useState<IrregularVerb | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playingStep, setPlayingStep] = useState<number | null>(null);

  // A 6-column table is unusable on a phone — always show cards there.
  const isNarrow = useMediaQuery('(max-width: 720px)');
  const effectiveView = isNarrow ? 'cards' : viewMode;

  const hasActiveFilter =
    search.trim() !== '' || levelFilter !== 'all' || patternFilter !== 'all' || statusFilter !== 'all';

  const filteredVerbs = useMemo(() => {
    const q = stripDiacritics(search.trim());
    return IRREGULAR_VERBS.filter((verb) => {
      if (levelFilter !== 'all' && verb.level !== levelFilter) return false;
      if (patternFilter !== 'all' && verb.pattern !== patternFilter) return false;

      const rec = progress[verb.id];
      const isMastered = (rec?.streak ?? 0) >= 2;
      if (statusFilter === 'mastered' && !isMastered) return false;
      if (statusFilter === 'todo' && isMastered) return false;

      if (!q) return true;
      const haystack = stripDiacritics(
        `${verb.v1} ${verb.v2} ${verb.v3} ${verb.thirdPerson} ${verb.ingForm} ${verb.translationSk} ${verb.otherMeaningsSk ?? ''}`
      );
      return haystack.includes(q);
    });
  }, [search, levelFilter, patternFilter, statusFilter, progress]);

  const resetFilters = () => {
    setSearch('');
    setLevelFilter('all');
    setPatternFilter('all');
    setStatusFilter('all');
  };

  const clearPlaying = () => {
    setPlayingId(null);
    setPlayingStep(null);
  };

  const handlePlayAllForms = (verb: IrregularVerb) => {
    setPlayingId(verb.id);
    speakSequence([verb.v1, verb.v2, verb.v3], {
      accent,
      rate,
      onStep: (idx) => setPlayingStep(idx),
      onDone: clearPlaying,
    });
  };

  const handlePlaySingle = (verbId: string, step: number, word: string) => {
    setPlayingId(verbId);
    setPlayingStep(step);
    speakText(word, { accent, rate, onEnd: clearPlaying, onError: clearPlaying });
  };

  return (
    <div>
      <section className="section-hero">
        <div>
          <h2>Nepravidelné slovesá</h2>
          <p>
            {IRREGULAR_VERBS.length} najdôležitejších slovies so všetkými tvarmi, výslovnosťou a vysvetlením
            po slovensky. Ťukni na tvar a vypočuj si ho.
          </p>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onStartPracticeWithFilter(levelFilter, patternFilter)}
          >
            <Play size={16} aria-hidden="true" />
            {levelFilter === 'all' && patternFilter === 'all' ? 'Precvičiť slovesá' : 'Precvičiť tento výber'}
          </button>
        </div>
      </section>

      <div className="filters-panel">
        <div className="search-row">
          <div className="search-box">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Hľadaj: ísť, went, written…"
              aria-label="Hľadať sloveso"
              enterKeyHint="search"
            />
          </div>

          <div className="filter-selects">
            <select
              className="select-input"
              value={patternFilter}
              onChange={(e) => setPatternFilter(e.target.value as VerbPattern | 'all')}
              aria-label="Filtrovať podľa vzoru"
            >
              <option value="all">Všetky vzory</option>
              {(Object.keys(PATTERN_INFO) as VerbPattern[]).map((pat) => (
                <option key={pat} value={pat}>
                  {PATTERN_INFO[pat].label}
                </option>
              ))}
            </select>

            <select
              className="select-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'mastered' | 'todo')}
              aria-label="Filtrovať podľa zvládnutia"
            >
              <option value="all">Všetky stavy</option>
              <option value="todo">Na precvičenie</option>
              <option value="mastered">Zvládnuté</option>
            </select>
          </div>

          {!isNarrow && (
            <div className="segmented" role="group" aria-label="Zobrazenie">
              <button
                type="button"
                className={`pill-toggle ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
                aria-pressed={viewMode === 'cards'}
              >
                <LayoutGrid size={15} aria-hidden="true" />
                <span>Karty</span>
              </button>
              <button
                type="button"
                className={`pill-toggle ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                aria-pressed={viewMode === 'table'}
              >
                <Table2 size={15} aria-hidden="true" />
                <span>Tabuľka</span>
              </button>
            </div>
          )}
        </div>

        <div className="chip-row scroll-x" role="group" aria-label="Úroveň">
          {(['all', 'A1', 'A2', 'B1', 'B2'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={`filter-chip ${levelFilter === lvl ? 'active' : ''}`}
              onClick={() => setLevelFilter(lvl)}
              aria-pressed={levelFilter === lvl}
            >
              {lvl === 'all' ? 'Všetky úrovne' : LEVEL_INFO[lvl].label}
            </button>
          ))}
        </div>

        <div className="row-between" style={{ alignItems: 'center' }}>
          <span className="chip-row-count" aria-live="polite">
            Zobrazených {filteredVerbs.length} z {IRREGULAR_VERBS.length}
          </span>
          {hasActiveFilter && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={resetFilters}>
              Zrušiť filtre
            </button>
          )}
        </div>

        {patternFilter !== 'all' && (
          <div className="callout-info small" style={{ padding: '0.7rem 0.9rem' }}>
            <strong>{PATTERN_INFO[patternFilter].label}:</strong> {PATTERN_INFO[patternFilter].descriptionSk}
          </div>
        )}
      </div>

      {filteredVerbs.length === 0 ? (
        <div className="card empty-state">
          <p>Pre tento filter tu nie je žiadne sloveso.</p>
          <button type="button" className="btn btn-secondary" onClick={resetFilters}>
            Zrušiť všetky filtre
          </button>
        </div>
      ) : effectiveView === 'cards' ? (
        <div className="verbs-grid">
          {filteredVerbs.map((verb) => {
            const isMastered = (progress[verb.id]?.streak ?? 0) >= 2;
            const isThisPlaying = playingId === verb.id;

            return (
              <article key={verb.id} className={`verb-card ${isMastered ? 'mastered' : ''}`}>
                <div className="verb-card-head">
                  <div style={{ minWidth: 0 }}>
                    <h3 className="verb-sk-title">{verb.translationSk}</h3>
                    {verb.otherMeaningsSk && <span className="verb-sk-sub">{verb.otherMeaningsSk}</span>}
                  </div>
                  <div className="verb-card-badges">
                    {isMastered && (
                      <span className="badge badge-emerald" title="Zvládnuté v precvičovaní">
                        <CheckCircle2 size={12} aria-hidden="true" />
                        Viem
                      </span>
                    )}
                    <span className="badge badge-blue">{verb.level}</span>
                    <span className="badge badge-purple">{PATTERN_INFO[verb.pattern].short}</span>
                  </div>
                </div>

                <div className="verb-forms-strip">
                  {[
                    { idx: 0, tag: 'V1', word: verb.v1, pron: verb.pronunciationSk.v1 },
                    { idx: 1, tag: 'V2', word: verb.v2, pron: verb.pronunciationSk.v2 },
                    { idx: 2, tag: 'V3', word: verb.v3, pron: verb.pronunciationSk.v3 },
                  ].map((item) => (
                    <button
                      key={item.tag}
                      type="button"
                      className={`verb-form-box ${isThisPlaying && playingStep === item.idx ? 'playing' : ''}`}
                      onClick={() => handlePlaySingle(verb.id, item.idx, item.word)}
                      title={`Vypočuť ${item.word}`}
                    >
                      <span className="verb-form-tag" aria-hidden="true">
                        <span>{item.tag}</span>
                        <Volume2 size={12} />
                      </span>
                      <span className="verb-form-word">
                        <span className={item.idx > 0 ? 'hl' : undefined}>{item.word}</span>
                      </span>
                      <span className="verb-form-pron">[{item.pron}]</span>
                    </button>
                  ))}
                </div>

                <div className="verb-extra-forms">
                  <span>
                    3. os.: <strong>{verb.thirdPerson}</strong>
                  </span>
                  <span>
                    -ing: <strong>{verb.ingForm}</strong>
                  </span>
                </div>

                <p className="verb-summary-sk">{verb.slovakExplanation.summary}</p>

                <div className="verb-card-footer">
                  <button
                    type="button"
                    className={`audio-btn ${isThisPlaying && playingStep !== null ? 'speaking' : ''}`}
                    onClick={() => handlePlayAllForms(verb)}
                    aria-label={`Vypočuť V1–V2–V3: ${verb.v1}, ${verb.v2}, ${verb.v3}`}
                  >
                    <Play size={14} aria-hidden="true" />
                    <span>V1–V2–V3</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setSelectedVerb(verb)}
                  >
                    <Info size={15} aria-hidden="true" />
                    <span>
                      Vysvetlenie<span className="hide-xs"> a vety</span>
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="verb-table-wrap">
          <table className="verb-table">
            <thead>
              <tr>
                <th>Preklad</th>
                <th>V1 základ</th>
                <th>V2 minulosť</th>
                <th>V3 príčastie</th>
                <th>3. os. / -ing</th>
                <th>
                  <span className="visually-hidden">Akcie</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVerbs.map((verb) => (
                <tr key={verb.id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{verb.translationSk}</div>
                    <div className="table-sub">
                      {verb.level} · {PATTERN_INFO[verb.pattern].short}
                    </div>
                  </td>
                  {(
                    [
                      [0, verb.v1, verb.pronunciationSk.v1],
                      [1, verb.v2, verb.pronunciationSk.v2],
                      [2, verb.v3, verb.pronunciationSk.v3],
                    ] as const
                  ).map(([idx, word, pron]) => (
                    <td key={idx}>
                      <button
                        type="button"
                        className={`audio-btn ${playingId === verb.id && playingStep === idx ? 'speaking' : ''}`}
                        onClick={() => handlePlaySingle(verb.id, idx, word)}
                        aria-label={`Vypočuť ${word}`}
                      >
                        <Volume2 size={13} aria-hidden="true" />
                        <span>{word}</span>
                      </button>
                      <div className="table-sub">[{pron}]</div>
                    </td>
                  ))}
                  <td className="small">
                    <div>{verb.thirdPerson}</div>
                    <div className="muted">{verb.ingForm}</div>
                  </td>
                  <td>
                    <div className="row" style={{ flexWrap: 'nowrap' }}>
                      <button
                        type="button"
                        className="audio-btn audio-btn-icon"
                        onClick={() => handlePlayAllForms(verb)}
                        title="Prehrať všetky 3 tvary"
                        aria-label={`Prehrať všetky 3 tvary: ${verb.v1}`}
                      >
                        <Play size={14} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedVerb(verb)}
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedVerb && (
        <VerbDetailModal
          verb={selectedVerb}
          accent={accent}
          rate={rate}
          onClose={() => setSelectedVerb(null)}
        />
      )}
    </div>
  );
}
