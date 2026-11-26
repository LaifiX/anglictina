import {
  CheckCircle2,
  Download,
  Flame,
  HardDrive,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TENSE_ORDER } from '../data/grammarData';
import { IRREGULAR_VERBS } from '../data/irregularVerbs';
import { getPathwayOverallSummary } from '../data/pathway';
import { ALL_TENSE_EXERCISES } from '../data/tenses';
import type {
  AppTab,
  DailyActivityStats,
  PathwayProgressState,
  ProgressMap,
  TenseProgressMap,
} from '../types/english';
import {
  type DailyStreak,
  createProgressBackup,
  restoreProgressBackup,
} from '../utils/storage';
import { getTenseMastery } from '../utils/tenseCheck';

interface ProgressModalProps {
  onClose: () => void;
  verbProgress: ProgressMap;
  tenseProgress: TenseProgressMap;
  pathwayProgress: PathwayProgressState;
  dailyActivity: DailyActivityStats;
  streak: DailyStreak;
  onNavigateTab: (tab: AppTab) => void;
  onRestoreBackup: (payload: NonNullable<ReturnType<typeof restoreProgressBackup>>) => void;
  onResetPathway: () => void;
}

export function ProgressModal({
  onClose,
  verbProgress,
  tenseProgress,
  pathwayProgress,
  dailyActivity,
  streak,
  onNavigateTab,
  onRestoreBackup,
  onResetPathway,
}: ProgressModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [backupNotice, setBackupNotice] = useState<string | null>(null);
  const [confirmResetPathway, setConfirmResetPathway] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const pathwaySummary = getPathwayOverallSummary(pathwayProgress);

  const verbsPracticedRight = Object.values(verbProgress).filter((r) => r.streak >= 1).length;
  const verbsMasteredTwice = Object.values(verbProgress).filter((r) => r.streak >= 2).length;

  const tenseMasteredExamples = ALL_TENSE_EXERCISES.filter(
    (ex) => Boolean(tenseProgress[ex.id]?.lastCorrect)
  ).length;
  const tenseMasteredCount = TENSE_ORDER.filter(
    (tid) => getTenseMastery(tid, ALL_TENSE_EXERCISES, tenseProgress).status === 'mastered'
  ).length;

  const handleDownloadBackup = () => {
    const json = createProgressBackup();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anglictina-pokrok-${dailyActivity.date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupNotice('Záloha pokroku bola stiahnutá do súboru.');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const restored = restoreProgressBackup(String(reader.result ?? ''));
      if (restored) {
        onRestoreBackup(restored);
        setBackupNotice('Pokrok bol úspešne obnovený zo súboru!');
      } else {
        setBackupNotice('Súbor sa nepodarilo načítať — skontroluj, či ide o platnú JSON zálohu.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <div className="row" style={{ marginBottom: '0.25rem' }}>
              <span className="badge badge-emerald">
                <HardDrive size={12} aria-hidden="true" /> Uložené v tomto prehliadači
              </span>
              {streak.count > 0 && (
                <span className="badge badge-amber">
                  <Flame size={12} aria-hidden="true" /> Séria {streak.count} d
                </span>
              )}
            </div>
            <h2 id="progress-modal-title" className="modal-title" style={{ fontSize: '1.35rem' }}>
              Môj pokrok a štatistiky učenia
            </h2>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="Zavrieť prehľad pokroku"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body stack">
          {/* Today & All-time Activity Strip */}
          <div className="detail-grid-3">
            <div className="detail-box" style={{ cursor: 'default' }}>
              <div className="small muted">Dnes splnené úlohy</div>
              <div className="detail-word" style={{ color: 'var(--primary)' }}>
                {dailyActivity.todayTasks}
              </div>
              <div className="small muted">správne: {dailyActivity.todayCorrect}</div>
            </div>
            <div className="detail-box" style={{ cursor: 'default' }}>
              <div className="small muted">Denná séria</div>
              <div className="detail-word" style={{ color: 'var(--amber)' }}>
                {streak.count} {streak.count === 1 ? 'deň' : 'dní'}
              </div>
              <div className="small muted">tréning bez pauzy</div>
            </div>
            <div className="detail-box" style={{ cursor: 'default' }}>
              <div className="small muted">Celkom úloh</div>
              <div className="detail-word" style={{ color: 'var(--emerald)' }}>
                {dailyActivity.totalTasks}
              </div>
              <div className="small muted">od začiatku učenia</div>
            </div>
          </div>

          {/* 1. Practical Course A1-B1 */}
          <div className="card-muted">
            <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.35rem' }}>
              <strong>1. Praktický kurz A1 → B1 (Cestovanie & konverzácia)</strong>
              <span className="mono small" style={{ fontWeight: 800, color: 'var(--primary)' }}>
                {pathwaySummary.itemsDone} / {pathwaySummary.itemsTotal} ({pathwaySummary.percent} %)
              </span>
            </div>
            <div className="progress" style={{ marginBottom: '0.55rem' }}>
              <span style={{ width: `${pathwaySummary.percent}%` }} />
            </div>
            <div className="small muted" style={{ marginBottom: '0.55rem' }}>
              Slovíčka: <strong>{pathwaySummary.vocabDone}/{pathwaySummary.vocabTotal}</strong> ·
              Praktické vety:{' '}
              <strong>{pathwaySummary.sentencesDone}/{pathwaySummary.sentencesTotal}</strong> ·
              Kvízové úlohy:{' '}
              <strong>{pathwaySummary.exercisesMastered}/{pathwaySummary.exercisesTotal}</strong> ·
              Lekcie:{' '}
              <strong>
                {pathwaySummary.modulesCompleted}/{pathwaySummary.modulesTotal}
              </strong>
            </div>
            <div className="row-between" style={{ alignItems: 'center' }}>
              <div className="row" style={{ gap: '0.35rem' }}>
                {(['A1', 'A2', 'B1'] as const).map((lvl) => (
                  <span key={lvl} className="badge badge-outline mono">
                    {lvl}: {pathwaySummary.byLevel[lvl].percent}%
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  onNavigateTab('pathway');
                  onClose();
                }}
              >
                Otvoriť kurz A1–B1
              </button>
            </div>
          </div>

          {/* 2. 9 English Tenses */}
          <div className="card-muted">
            <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.35rem' }}>
              <strong>2. Anglické časy (9 časov · 2 250 príkladov)</strong>
              <span className="mono small" style={{ fontWeight: 800, color: 'var(--primary)' }}>
                {tenseMasteredExamples} / {ALL_TENSE_EXERCISES.length}
              </span>
            </div>
            <div className="progress" style={{ marginBottom: '0.45rem' }}>
              <span
                style={{
                  width: `${Math.round(
                    (tenseMasteredExamples / ALL_TENSE_EXERCISES.length) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="row-between" style={{ alignItems: 'center' }}>
              <span className="small muted">
                Zvládnuté časy: <strong>{tenseMasteredCount}/9</strong>
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  onNavigateTab('quiz');
                  onClose();
                }}
              >
                Testy z časov
              </button>
            </div>
          </div>

          {/* 3. Irregular Verbs */}
          <div className="card-muted">
            <div className="row-between" style={{ alignItems: 'center', marginBottom: '0.35rem' }}>
              <strong>3. Nepravidelné slovesá ({IRREGULAR_VERBS.length} slovies)</strong>
              <span className="mono small" style={{ fontWeight: 800, color: 'var(--primary)' }}>
                {verbsPracticedRight} / {IRREGULAR_VERBS.length}
              </span>
            </div>
            <div className="progress" style={{ marginBottom: '0.45rem' }}>
              <span
                style={{
                  width: `${Math.round((verbsPracticedRight / IRREGULAR_VERBS.length) * 100)}%`,
                }}
              />
            </div>
            <div className="row-between" style={{ alignItems: 'center' }}>
              <span className="small muted">
                Správne naposledy: <strong>{verbsPracticedRight}/100</strong> · Upevnené (2× po
                sebe): <strong>{verbsMasteredTwice}/100</strong>
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  onNavigateTab('practice');
                  onClose();
                }}
              >
                Precvičiť slovesá
              </button>
            </div>
          </div>

          {/* Browser Backup Export / Import */}
          <div className="callout-tip">
            <div style={{ fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--primary)" />
              <span>Ako funguje ukladanie pokroku?</span>
            </div>
            <p className="small" style={{ margin: '0 0 0.65rem', color: 'var(--text-secondary)' }}>
              Všetky tvoje odpovede, naučené slovíčka aj vety sa ukladajú priamo v tomto prehliadači
              (<code>localStorage</code>) — nepotrebuješ žiadnu registráciu. Ak si chceš pokrok
              preniesť napríklad z počítača do mobilu, stiahni si zálohu a nahraj ju v druhom zariadení.
            </p>
            <div className="action-row">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleDownloadBackup}
              >
                <Download size={14} aria-hidden="true" />
                <span>Stiahnuť zálohu (.json)</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} aria-hidden="true" />
                <span>Obnoviť zo súboru</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                style={{ display: 'none' }}
                onChange={handleImportFile}
              />

              {!confirmResetPathway ? (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-danger-text"
                  onClick={() => setConfirmResetPathway(true)}
                >
                  <Trash2 size={14} aria-hidden="true" />
                  <span>Vynulovať kurz A1–B1</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-danger-text"
                  onClick={() => {
                    onResetPathway();
                    setConfirmResetPathway(false);
                    setBackupNotice('Pokrok v kurze A1–B1 bol vynulovaný.');
                  }}
                >
                  Potvrdiť vynulovanie A1–B1
                </button>
              )}
            </div>
            {backupNotice && (
              <div className="small" style={{ marginTop: '0.5rem', fontWeight: 700, color: 'var(--emerald)' }}>
                {backupNotice}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
