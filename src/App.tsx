import {
  BookOpen,
  CheckCircle2,
  CheckSquare,
  Compass,
  Flame,
  GraduationCap,
  Moon,
  PenTool,
  Sun,
  Volume2,
  VolumeX,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { GrammarQuiz } from './components/GrammarQuiz';
import { GrammarSection } from './components/GrammarSection';
import { PracticalCourse } from './components/PracticalCourse';
import { ProgressModal } from './components/ProgressModal';
import { VerbDictionary } from './components/VerbDictionary';
import { VerbPractice } from './components/VerbPractice';
import { IRREGULAR_VERBS } from './data/irregularVerbs';
import { getPathwayOverallSummary } from './data/pathway';
import { ALL_TENSE_EXERCISES } from './data/tenses';
import type {
  Accent,
  AppTab,
  DailyActivityStats,
  PathwayProgressState,
  ProgressMap,
  SpeechRate,
  TenseId,
  TenseProgressMap,
  TenseQuizLaunchRequest,
  ThemeMode,
  VerbLevel,
  VerbPattern,
} from './types/english';
import { isSpeechSupported, stopSpeaking } from './utils/speech';
import {
  emptyPathwayProgress,
  loadAccent,
  loadActiveTab,
  loadDailyActivity,
  loadDailyStreak,
  loadPathwayProgress,
  loadSfxEnabled,
  loadSpeechRate,
  loadTenseProgress,
  loadTheme,
  loadVerbProgress,
  recordDailyActivity,
  type restoreProgressBackup,
  saveAccent,
  saveActiveTab,
  savePathwayProgress,
  saveSfxEnabled,
  saveSpeechRate,
  saveTenseProgress,
  saveTheme,
  saveVerbProgress,
  touchDailyStreak,
} from './utils/storage';

const TABS: { id: AppTab; label: string; short: string; Icon: LucideIcon }[] = [
  { id: 'pathway', label: 'Kurz A1–B1 (Cesty)', short: 'A1–B1', Icon: Compass },
  { id: 'grammar', label: 'Kurz časov a teória', short: 'Časy', Icon: GraduationCap },
  { id: 'quiz', label: 'Testy z časov', short: 'Testy', Icon: CheckSquare },
  { id: 'verbs', label: 'Prehľad slovies', short: 'Slovesá', Icon: BookOpen },
  { id: 'practice', label: 'Precvičovanie slovies', short: 'Tréning', Icon: PenTool },
];

export function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(() => loadActiveTab('pathway'));
  const [accent, setAccent] = useState<Accent>(() => loadAccent());
  const [rate, setRate] = useState<SpeechRate>(() => loadSpeechRate());
  const [theme, setTheme] = useState<ThemeMode>(() => loadTheme());
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(() => loadSfxEnabled());
  const [progress, setProgress] = useState<ProgressMap>(() => loadVerbProgress());
  const [tenseProgress, setTenseProgress] = useState<TenseProgressMap>(() => loadTenseProgress());
  const [pathwayProgress, setPathwayProgress] = useState<PathwayProgressState>(() =>
    loadPathwayProgress()
  );
  const [dailyActivity, setDailyActivity] = useState<DailyActivityStats>(() =>
    loadDailyActivity()
  );
  const [streak, setStreak] = useState(() => loadDailyStreak());
  const [showProgressModal, setShowProgressModal] = useState(false);

  // Synced filters when jumping from Dictionary -> Practice
  const [practiceLevel, setPracticeLevel] = useState<VerbLevel | 'all'>('all');
  const [practicePattern, setPracticePattern] = useState<VerbPattern | 'all'>('all');

  // Cross-tab navigation between Tenses Course <-> Tense Test Studio
  const [focusedTenseLesson, setFocusedTenseLesson] = useState<TenseId | undefined>(undefined);
  const [quizLaunchRequest, setQuizLaunchRequest] = useState<TenseQuizLaunchRequest | null>(null);

  const speechAvailable = isSpeechSupported();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#151b2d' : '#ffffff');
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveAccent(accent);
  }, [accent]);

  useEffect(() => {
    saveSpeechRate(rate);
  }, [rate]);

  useEffect(() => {
    saveSfxEnabled(sfxEnabled);
  }, [sfxEnabled]);

  useEffect(() => {
    saveActiveTab(activeTab);
    stopSpeaking();
  }, [activeTab]);

  // Live counters across all 3 learning pillars
  const verbsRightCount = useMemo(() => {
    return Object.values(progress).filter((rec) => rec.streak >= 1).length;
  }, [progress]);

  const tenseMasteredExamples = useMemo(() => {
    return ALL_TENSE_EXERCISES.filter((ex) => Boolean(tenseProgress[ex.id]?.lastCorrect)).length;
  }, [tenseProgress]);

  const pathwaySummary = useMemo(() => {
    return getPathwayOverallSummary(pathwayProgress);
  }, [pathwayProgress]);

  // Context-reactive topbar counter so the top bar ALWAYS reflects active learning immediately
  const topbarStat = useMemo(() => {
    if (activeTab === 'grammar' || activeTab === 'quiz') {
      return {
        prefixSk: 'Príklady:',
        done: tenseMasteredExamples,
        total: ALL_TENSE_EXERCISES.length,
        aria: `Zvládnuté príklady z časov: ${tenseMasteredExamples} z ${ALL_TENSE_EXERCISES.length}. Dnes vyriešených úloh: ${dailyActivity.todayTasks}. Klikni pre celý prehľad pokroku.`,
      };
    }
    if (activeTab === 'verbs' || activeTab === 'practice') {
      return {
        prefixSk: 'Slovesá:',
        done: verbsRightCount,
        total: IRREGULAR_VERBS.length,
        aria: `Zvládnuté nepravidelné slovesá: ${verbsRightCount} zo ${IRREGULAR_VERBS.length}. Dnes vyriešených úloh: ${dailyActivity.todayTasks}. Klikni pre celý prehľad pokroku.`,
      };
    }
    return {
      prefixSk: 'A1–B1:',
      done: pathwaySummary.itemsDone,
      total: pathwaySummary.itemsTotal,
      aria: `Praktický kurz A1 až B1: ${pathwaySummary.itemsDone} z ${pathwaySummary.itemsTotal} položiek. Dnes vyriešených úloh: ${dailyActivity.todayTasks}. Klikni pre celý prehľad pokroku.`,
    };
  }, [
    activeTab,
    tenseMasteredExamples,
    verbsRightCount,
    pathwaySummary.itemsDone,
    pathwaySummary.itemsTotal,
    dailyActivity.todayTasks,
  ]);

  const goToTab = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bumpActivity = (isCorrect: boolean) => {
    setDailyActivity(recordDailyActivity(isCorrect));
    setStreak(touchDailyStreak());
  };

  const handleRecordResult = (verbId: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const current = prev[verbId] ?? {
        attempts: 0,
        correct: 0,
        streak: 0,
        lastPracticedAt: 0,
      };
      const updated: ProgressMap = {
        ...prev,
        [verbId]: {
          attempts: current.attempts + 1,
          correct: current.correct + (isCorrect ? 1 : 0),
          streak: isCorrect ? current.streak + 1 : 0,
          lastPracticedAt: Date.now(),
        },
      };
      saveVerbProgress(updated);
      return updated;
    });
    bumpActivity(isCorrect);
  };

  const handleRecordTenseResult = (exerciseId: string, isCorrect: boolean) => {
    setTenseProgress((prev) => {
      const current = prev[exerciseId] ?? {
        attempts: 0,
        correct: 0,
        lastCorrect: false,
        lastPracticedAt: 0,
      };
      const updated: TenseProgressMap = {
        ...prev,
        [exerciseId]: {
          attempts: current.attempts + 1,
          correct: current.correct + (isCorrect ? 1 : 0),
          lastCorrect: isCorrect,
          lastPracticedAt: Date.now(),
        },
      };
      saveTenseProgress(updated);
      return updated;
    });
    bumpActivity(isCorrect);
  };

  const handleToggleVocabLearned = (vocabId: string) => {
    let markedDone = false;
    setPathwayProgress((prev) => {
      const nextVal = !prev.learnedVocab[vocabId];
      markedDone = nextVal;
      const next: PathwayProgressState = {
        ...prev,
        learnedVocab: {
          ...prev.learnedVocab,
          [vocabId]: nextVal,
        },
      };
      savePathwayProgress(next);
      return next;
    });
    if (markedDone) bumpActivity(true);
  };

  const handleToggleSentenceLearned = (sentenceId: string) => {
    let markedDone = false;
    setPathwayProgress((prev) => {
      const nextVal = !prev.learnedSentences[sentenceId];
      markedDone = nextVal;
      const next: PathwayProgressState = {
        ...prev,
        learnedSentences: {
          ...prev.learnedSentences,
          [sentenceId]: nextVal,
        },
      };
      savePathwayProgress(next);
      return next;
    });
    if (markedDone) bumpActivity(true);
  };

  const handleRecordCourseExercise = (exerciseId: string, isCorrect: boolean) => {
    setPathwayProgress((prev) => {
      const current = prev.exerciseRecords[exerciseId] ?? {
        attempts: 0,
        correct: 0,
        lastCorrect: false,
        lastPracticedAt: 0,
      };
      const next: PathwayProgressState = {
        ...prev,
        exerciseRecords: {
          ...prev.exerciseRecords,
          [exerciseId]: {
            attempts: current.attempts + 1,
            correct: current.correct + (isCorrect ? 1 : 0),
            lastCorrect: isCorrect,
            lastPracticedAt: Date.now(),
          },
        },
      };
      savePathwayProgress(next);
      return next;
    });
    bumpActivity(isCorrect);
  };

  const handleResetProgress = () => {
    setProgress({});
    saveVerbProgress({});
  };

  const handleResetTenseProgress = () => {
    setTenseProgress({});
    saveTenseProgress({});
  };

  const handleResetPathwayProgress = () => {
    const empty = emptyPathwayProgress();
    setPathwayProgress(empty);
    savePathwayProgress(empty);
  };

  const handleRestoreBackup = (
    payload: NonNullable<ReturnType<typeof restoreProgressBackup>>
  ) => {
    setProgress(payload.verbProgress);
    setTenseProgress(payload.tenseProgress);
    setPathwayProgress(payload.pathwayProgress);
    setDailyActivity(payload.dailyActivity);
    setStreak(payload.streak);
  };

  const handleStartPracticeWithFilter = (
    lvl: VerbLevel | 'all',
    pat: VerbPattern | 'all'
  ) => {
    setPracticeLevel(lvl);
    setPracticePattern(pat);
    goToTab('practice');
  };

  const handleLaunchQuiz = (req: Omit<TenseQuizLaunchRequest, 'nonce'>) => {
    setQuizLaunchRequest({ ...req, nonce: Date.now() + Math.random() });
    goToTab('quiz');
  };

  const handleOpenTenseLesson = (tenseId: TenseId) => {
    setFocusedTenseLesson(tenseId);
    goToTab('grammar');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              EN
            </div>
            <div className="brand-text">
              <h1 className="brand-title">Angličtina do vrecka</h1>
              <span className="brand-sub">Kurz A1–B1 · Cestovanie · 9 časov · Slovesá</span>
            </div>
          </div>

          <div className="topbar-controls">
            <button
              type="button"
              className="stat-pill stat-pill-btn"
              onClick={() => setShowProgressModal(true)}
              title={`Dnes splnené úlohy: ${dailyActivity.todayTasks} · Klikni pre kompletný prehľad uloženého pokroku`}
              aria-label={topbarStat.aria}
            >
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>
                <span className="label-full">{topbarStat.prefixSk} </span>
                {topbarStat.done}/{topbarStat.total}
                {dailyActivity.todayTasks > 0 && (
                  <span className="label-full"> · Dnes: {dailyActivity.todayTasks}</span>
                )}
              </span>
            </button>

            {streak.count > 0 && (
              <div className="streak-pill" title={`Denná séria: ${streak.count} dní`}>
                <Flame size={14} aria-hidden="true" /> {streak.count}d
              </div>
            )}

            <button
              type="button"
              className="pill-toggle"
              onClick={() => setAccent(accent === 'en-GB' ? 'en-US' : 'en-GB')}
              title="Prepnúť prízvuk zvukových ukážok (britský / americký)"
              aria-label={`Prízvuk: ${accent === 'en-GB' ? 'britský' : 'americký'}. Prepnúť`}
            >
              <span>{accent === 'en-GB' ? 'UK' : 'US'}</span>
              <span className="label-full">prízvuk</span>
            </button>

            <button
              type="button"
              className={`pill-toggle ${rate === 0.75 ? 'active' : ''}`}
              onClick={() => setRate(rate === 0.95 ? 0.75 : 0.95)}
              title="Prepnúť rýchlosť reči"
              aria-pressed={rate === 0.75}
              aria-label="Pomalá výslovnosť"
            >
              <span>{rate === 0.75 ? '0.75×' : '1×'}</span>
              <span className="label-full">{rate === 0.75 ? 'pomaly' : 'normálne'}</span>
            </button>

            <button
              type="button"
              className="pill-toggle icon-only"
              onClick={() => setSfxEnabled((v) => !v)}
              title={sfxEnabled ? 'Vypnúť zvukové efekty kvízu' : 'Zapnúť zvukové efekty kvízu'}
              aria-label="Zvukové efekty"
              aria-pressed={sfxEnabled}
            >
              {sfxEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              type="button"
              className="pill-toggle icon-only"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              title={theme === 'light' ? 'Prepnúť na tmavý režim' : 'Prepnúť na svetlý režim'}
              aria-label={theme === 'light' ? 'Prepnúť na tmavý režim' : 'Prepnúť na svetlý režim'}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </header>

      <nav className="nav-bar-wrap" aria-label="Hlavná navigácia">
        <div className="container">
          <div className="nav-tabs" role="tablist">
            {TABS.map(({ id, label, short, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={activeTab === id}
                aria-controls="main-panel"
                aria-label={label}
                className={`nav-tab ${activeTab === id ? 'active' : ''}`}
                onClick={() => goToTab(id)}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="label-full">{label}</span>
                <span className="label-short">{short}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main
        className="main-content"
        id="main-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        <div className="container">
          {!speechAvailable && (
            <div className="callout-tip" style={{ marginBottom: '1rem' }}>
              Tento prehliadač nevie prehrávať výslovnosť (chýba Web Speech API). Fonetický prepis
              aj všetky vysvetlenia fungujú normálne.
            </div>
          )}

          {activeTab === 'pathway' && (
            <PracticalCourse
              accent={accent}
              rate={rate}
              sfxEnabled={sfxEnabled}
              pathwayProgress={pathwayProgress}
              tenseProgress={tenseProgress}
              onToggleVocabLearned={handleToggleVocabLearned}
              onToggleSentenceLearned={handleToggleSentenceLearned}
              onRecordCourseExercise={handleRecordCourseExercise}
              onOpenTenseLesson={handleOpenTenseLesson}
              onLaunchTenseQuiz={handleLaunchQuiz}
            />
          )}

          {activeTab === 'verbs' && (
            <VerbDictionary
              accent={accent}
              rate={rate}
              progress={progress}
              onStartPracticeWithFilter={handleStartPracticeWithFilter}
            />
          )}

          {activeTab === 'practice' && (
            <VerbPractice
              accent={accent}
              rate={rate}
              sfxEnabled={sfxEnabled}
              progress={progress}
              initialLevel={practiceLevel}
              initialPattern={practicePattern}
              onRecordResult={handleRecordResult}
              onResetProgress={handleResetProgress}
            />
          )}

          {activeTab === 'grammar' && (
            <GrammarSection
              accent={accent}
              rate={rate}
              sfxEnabled={sfxEnabled}
              tenseProgress={tenseProgress}
              initialTenseId={focusedTenseLesson}
              onLaunchQuiz={handleLaunchQuiz}
              onRecordTenseResult={handleRecordTenseResult}
            />
          )}

          {activeTab === 'quiz' && (
            <GrammarQuiz
              accent={accent}
              rate={rate}
              sfxEnabled={sfxEnabled}
              tenseProgress={tenseProgress}
              launchRequest={quizLaunchRequest}
              onRecordTenseResult={handleRecordTenseResult}
              onResetTenseProgress={handleResetTenseProgress}
              onOpenTenseLesson={handleOpenTenseLesson}
            />
          )}
        </div>
      </main>

      {showProgressModal && (
        <ProgressModal
          onClose={() => setShowProgressModal(false)}
          verbProgress={progress}
          tenseProgress={tenseProgress}
          pathwayProgress={pathwayProgress}
          dailyActivity={dailyActivity}
          streak={streak}
          onNavigateTab={goToTab}
          onRestoreBackup={handleRestoreBackup}
          onResetPathway={handleResetPathwayProgress}
        />
      )}
    </div>
  );
}

export default App;
