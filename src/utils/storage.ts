import type {
  Accent,
  AppTab,
  DailyActivityStats,
  PathwayProgressState,
  ProgressMap,
  SpeechRate,
  TenseProgressMap,
  ThemeMode,
} from '../types/english';

const KEYS = {
  progress: 'anglictina_verb_progress_v1',
  tenseProgress: 'anglictina_tense_progress_v1',
  pathwayProgress: 'anglictina_pathway_progress_v1',
  dailyActivity: 'anglictina_daily_activity_v1',
  activeTab: 'anglictina_active_tab_v1',
  accent: 'anglictina_accent_v1',
  rate: 'anglictina_speech_rate_v1',
  theme: 'anglictina_theme_v1',
  sfx: 'anglictina_sfx_v1',
  streak: 'anglictina_daily_streak_v1',
};

export interface DailyStreak {
  count: number;
  lastDate: string; // YYYY-MM-DD
}

const VALID_TABS: AppTab[] = ['pathway', 'verbs', 'practice', 'grammar', 'quiz'];

export function emptyPathwayProgress(): PathwayProgressState {
  return {
    learnedVocab: {},
    learnedSentences: {},
    exerciseRecords: {},
  };
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function yesterdayKey(): string {
  const d = new Date(Date.now() - 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function loadActiveTab(fallback: AppTab = 'verbs'): AppTab {
  try {
    const raw = localStorage.getItem(KEYS.activeTab) as AppTab | null;
    if (raw && VALID_TABS.includes(raw)) return raw;
    return fallback;
  } catch {
    return fallback;
  }
}

export function saveActiveTab(tab: AppTab): void {
  try {
    localStorage.setItem(KEYS.activeTab, tab);
  } catch {
    // Ignore
  }
}

export function loadVerbProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(KEYS.progress);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function saveVerbProgress(progress: ProgressMap): void {
  try {
    localStorage.setItem(KEYS.progress, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadTenseProgress(): TenseProgressMap {
  try {
    const raw = localStorage.getItem(KEYS.tenseProgress);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as TenseProgressMap) : {};
  } catch {
    return {};
  }
}

export function saveTenseProgress(progress: TenseProgressMap): void {
  try {
    localStorage.setItem(KEYS.tenseProgress, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadPathwayProgress(): PathwayProgressState {
  try {
    const raw = localStorage.getItem(KEYS.pathwayProgress);
    if (!raw) return emptyPathwayProgress();
    const parsed = JSON.parse(raw) as Partial<PathwayProgressState>;
    if (!parsed || typeof parsed !== 'object') return emptyPathwayProgress();
    return {
      learnedVocab:
        parsed.learnedVocab && typeof parsed.learnedVocab === 'object'
          ? parsed.learnedVocab
          : {},
      learnedSentences:
        parsed.learnedSentences && typeof parsed.learnedSentences === 'object'
          ? parsed.learnedSentences
          : {},
      exerciseRecords:
        parsed.exerciseRecords && typeof parsed.exerciseRecords === 'object'
          ? parsed.exerciseRecords
          : {},
    };
  } catch {
    return emptyPathwayProgress();
  }
}

export function savePathwayProgress(state: PathwayProgressState): void {
  try {
    localStorage.setItem(KEYS.pathwayProgress, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadDailyActivity(): DailyActivityStats {
  const today = todayKey();
  try {
    const raw = localStorage.getItem(KEYS.dailyActivity);
    if (!raw) {
      return { date: today, todayTasks: 0, todayCorrect: 0, totalTasks: 0 };
    }
    const parsed = JSON.parse(raw) as Partial<DailyActivityStats>;
    const totalTasks = typeof parsed.totalTasks === 'number' ? parsed.totalTasks : 0;
    if (parsed.date !== today) {
      return { date: today, todayTasks: 0, todayCorrect: 0, totalTasks };
    }
    return {
      date: today,
      todayTasks: typeof parsed.todayTasks === 'number' ? parsed.todayTasks : 0,
      todayCorrect: typeof parsed.todayCorrect === 'number' ? parsed.todayCorrect : 0,
      totalTasks,
    };
  } catch {
    return { date: today, todayTasks: 0, todayCorrect: 0, totalTasks: 0 };
  }
}

export function recordDailyActivity(isCorrect: boolean): DailyActivityStats {
  const current = loadDailyActivity();
  const next: DailyActivityStats = {
    date: todayKey(),
    todayTasks: current.todayTasks + 1,
    todayCorrect: current.todayCorrect + (isCorrect ? 1 : 0),
    totalTasks: current.totalTasks + 1,
  };
  try {
    localStorage.setItem(KEYS.dailyActivity, JSON.stringify(next));
  } catch {
    // Ignore
  }
  return next;
}

export function loadAccent(): Accent {
  try {
    const v = localStorage.getItem(KEYS.accent);
    return v === 'en-US' ? 'en-US' : 'en-GB';
  } catch {
    return 'en-GB';
  }
}

export function saveAccent(accent: Accent): void {
  try {
    localStorage.setItem(KEYS.accent, accent);
  } catch {
    // Ignore
  }
}

export function loadSpeechRate(): SpeechRate {
  try {
    const v = localStorage.getItem(KEYS.rate);
    return v === '0.75' ? 0.75 : 0.95;
  } catch {
    return 0.95;
  }
}

export function saveSpeechRate(rate: SpeechRate): void {
  try {
    localStorage.setItem(KEYS.rate, String(rate));
  } catch {
    // Ignore
  }
}

export function loadTheme(): ThemeMode {
  try {
    const v = localStorage.getItem(KEYS.theme);
    if (v === 'dark' || v === 'light') return v;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  } catch {
    return 'light';
  }
}

export function saveTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(KEYS.theme, theme);
  } catch {
    // Ignore
  }
}

export function loadSfxEnabled(): boolean {
  try {
    const v = localStorage.getItem(KEYS.sfx);
    return v !== 'false';
  } catch {
    return true;
  }
}

export function saveSfxEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(KEYS.sfx, String(enabled));
  } catch {
    // Ignore
  }
}

export function loadDailyStreak(): DailyStreak {
  try {
    const raw = localStorage.getItem(KEYS.streak);
    if (!raw) return { count: 0, lastDate: '' };
    const parsed = JSON.parse(raw) as DailyStreak;
    if (parsed.lastDate !== todayKey() && parsed.lastDate !== yesterdayKey()) {
      return { count: 0, lastDate: parsed.lastDate };
    }
    return parsed;
  } catch {
    return { count: 0, lastDate: '' };
  }
}

export function touchDailyStreak(): DailyStreak {
  const today = todayKey();
  const yesterday = yesterdayKey();
  const current = loadDailyStreak();
  let next: DailyStreak;
  if (current.lastDate === today) {
    next = current;
  } else if (current.lastDate === yesterday) {
    next = { count: current.count + 1, lastDate: today };
  } else {
    next = { count: 1, lastDate: today };
  }
  try {
    localStorage.setItem(KEYS.streak, JSON.stringify(next));
  } catch {
    // Ignore
  }
  return next;
}

export interface ProgressBackupPayload {
  version: 1;
  exportedAt: string;
  verbProgress: ProgressMap;
  tenseProgress: TenseProgressMap;
  pathwayProgress: PathwayProgressState;
  dailyActivity: DailyActivityStats;
  streak: DailyStreak;
}

export function createProgressBackup(): string {
  const payload: ProgressBackupPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    verbProgress: loadVerbProgress(),
    tenseProgress: loadTenseProgress(),
    pathwayProgress: loadPathwayProgress(),
    dailyActivity: loadDailyActivity(),
    streak: loadDailyStreak(),
  };
  return JSON.stringify(payload, null, 2);
}

export function restoreProgressBackup(rawJson: string): ProgressBackupPayload | null {
  try {
    const parsed = JSON.parse(rawJson) as Partial<ProgressBackupPayload>;
    if (!parsed || typeof parsed !== 'object') return null;

    const verbProgress =
      parsed.verbProgress && typeof parsed.verbProgress === 'object' ? parsed.verbProgress : {};
    const tenseProgress =
      parsed.tenseProgress && typeof parsed.tenseProgress === 'object' ? parsed.tenseProgress : {};
    const pathwayProgress: PathwayProgressState = {
      learnedVocab:
        parsed.pathwayProgress?.learnedVocab &&
        typeof parsed.pathwayProgress.learnedVocab === 'object'
          ? parsed.pathwayProgress.learnedVocab
          : {},
      learnedSentences:
        parsed.pathwayProgress?.learnedSentences &&
        typeof parsed.pathwayProgress.learnedSentences === 'object'
          ? parsed.pathwayProgress.learnedSentences
          : {},
      exerciseRecords:
        parsed.pathwayProgress?.exerciseRecords &&
        typeof parsed.pathwayProgress.exerciseRecords === 'object'
          ? parsed.pathwayProgress.exerciseRecords
          : {},
    };
    const dailyActivity =
      parsed.dailyActivity && typeof parsed.dailyActivity === 'object'
        ? {
            date: String(parsed.dailyActivity.date ?? todayKey()),
            todayTasks: Number(parsed.dailyActivity.todayTasks ?? 0),
            todayCorrect: Number(parsed.dailyActivity.todayCorrect ?? 0),
            totalTasks: Number(parsed.dailyActivity.totalTasks ?? 0),
          }
        : loadDailyActivity();
    const streak =
      parsed.streak && typeof parsed.streak === 'object'
        ? {
            count: Number(parsed.streak.count ?? 0),
            lastDate: String(parsed.streak.lastDate ?? ''),
          }
        : loadDailyStreak();

    saveVerbProgress(verbProgress);
    saveTenseProgress(tenseProgress);
    savePathwayProgress(pathwayProgress);
    try {
      localStorage.setItem(KEYS.dailyActivity, JSON.stringify(dailyActivity));
      localStorage.setItem(KEYS.streak, JSON.stringify(streak));
    } catch {
      // Ignore
    }

    return {
      version: 1,
      exportedAt: parsed.exportedAt ?? new Date().toISOString(),
      verbProgress,
      tenseProgress,
      pathwayProgress,
      dailyActivity,
      streak,
    };
  } catch {
    return null;
  }
}
