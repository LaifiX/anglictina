import type {
  Accent,
  ProgressMap,
  SpeechRate,
  TenseProgressMap,
  ThemeMode,
} from '../types/english';

const KEYS = {
  progress: 'anglictina_verb_progress_v1',
  tenseProgress: 'anglictina_tense_progress_v1',
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
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
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

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function yesterdayKey(): string {
  const d = new Date(Date.now() - 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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
