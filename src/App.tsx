import {
  BookOpen,
  CheckCircle2,
  CheckSquare,
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
import { VerbDictionary } from './components/VerbDictionary';
import { VerbPractice } from './components/VerbPractice';
import { IRREGULAR_VERBS } from './data/irregularVerbs';
import type {
  Accent,
  AppTab,
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
  loadAccent,
  loadDailyStreak,
  loadSfxEnabled,
  loadSpeechRate,
  loadTenseProgress,
  loadTheme,
  loadVerbProgress,
  saveAccent,
  saveSfxEnabled,
  saveSpeechRate,
  saveTenseProgress,
  saveTheme,
  saveVerbProgress,
  touchDailyStreak,
} from './utils/storage';

const TABS: { id: AppTab; label: string; short: string; Icon: LucideIcon }[] = [
  { id: 'verbs', label: 'Prehľad slovies', short: 'Slovesá', Icon: BookOpen },
  { id: 'practice', label: 'Precvičovanie slovies', short: 'Precvičiť', Icon: PenTool },
  { id: 'grammar', label: 'Kurz časov (9)', short: 'Časy', Icon: GraduationCap },
  { id: 'quiz', label: 'Testy z časov', short: 'Testy', Icon: CheckSquare },
];

export function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('verbs');
  const [accent, setAccent] = useState<Accent>(() => loadAccent());
  const [rate, setRate] = useState<SpeechRate>(() => loadSpeechRate());
  const [theme, setTheme] = useState<ThemeMode>(() => loadTheme());
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(() => loadSfxEnabled());
  const [progress, setProgress] = useState<ProgressMap>(() => loadVerbProgress());
  const [tenseProgress, setTenseProgress] = useState<TenseProgressMap>(() => loadTenseProgress());
  const [streak, setStreak] = useState(() => loadDailyStreak());

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
    stopSpeaking();
  }, [activeTab]);

  const masteredCount = useMemo(() => {
    return Object.values(progress).filter((rec) => rec.streak >= 2).length;
  }, [progress]);

  const goToTab = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setStreak(touchDailyStreak());
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
    setStreak(touchDailyStreak());
  };

  const handleResetProgress = () => {
    setProgress({});
    saveVerbProgress({});
  };

  const handleResetTenseProgress = () => {
    setTenseProgress({});
    saveTenseProgress({});
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
              <span className="brand-sub">Nepravidelné slovesá a 9 anglických časov</span>
            </div>
          </div>

          <div className="topbar-controls">
            <div
              className="stat-pill"
              title="Slovesá správne zodpovedané aspoň 2× po sebe"
              aria-label={`Zvládnuté slovesá: ${masteredCount} z ${IRREGULAR_VERBS.length}`}
            >
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>
                <span className="label-full">Zvládnuté: </span>
                {masteredCount}
                <span className="label-full"> / {IRREGULAR_VERBS.length}</span>
              </span>
            </div>

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
    </div>
  );
}

export default App;
