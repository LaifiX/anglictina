import type { Accent, SpeechRate } from '../types/english';

let activeToken = 0;

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking(): void {
  activeToken += 1;
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore browser errors when speech synthesis is unavailable
    }
  }
}

function getPreferredVoice(accent: Accent): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const targetLang = accent.toLowerCase();
  const langPrefix = targetLang.split('-')[0];

  const exactMatches = voices.filter(
    (v) => v.lang.toLowerCase() === targetLang || v.lang.toLowerCase().replace('_', '-') === targetLang
  );

  const pickBest = (list: SpeechSynthesisVoice[]) => {
    const ranked = [...list].sort((a, b) => {
      const score = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('natural') || lower.includes('neural')) return 4;
        if (lower.includes('google')) return 3;
        if (lower.includes('microsoft') || lower.includes('samantha') || lower.includes('daniel')) return 2;
        return 1;
      };
      return score(b.name) - score(a.name);
    });
    return ranked[0] ?? null;
  };

  if (exactMatches.length > 0) {
    return pickBest(exactMatches);
  }

  const englishMatches = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  return pickBest(englishMatches);
}

export function getAvailableEnglishVoiceCount(): number {
  if (!isSpeechSupported()) return 0;
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith('en')).length;
}

function normalizeTextForSpeech(text: string): string {
  // For forms like "was / were" or "learnt / learned", read clearly with a pause
  return text.replace(/\s*\/\s*/g, ', or ').trim();
}

export function speakText(
  text: string,
  options: {
    accent?: Accent;
    rate?: SpeechRate;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  } = {}
): boolean {
  if (!isSpeechSupported() || !text.trim()) {
    options.onError?.();
    return false;
  }

  const { accent = 'en-GB', rate = 0.95, onStart, onEnd, onError } = options;
  stopSpeaking();
  const token = activeToken;

  try {
    const utterance = new SpeechSynthesisUtterance(normalizeTextForSpeech(text));
    utterance.lang = accent;
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voice = getPreferredVoice(accent);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      if (token === activeToken) onStart?.();
    };
    utterance.onend = () => {
      if (token === activeToken) onEnd?.();
    };
    utterance.onerror = () => {
      if (token === activeToken) onError?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    onError?.();
    return false;
  }
}

export function speakSequence(
  items: string[],
  options: {
    accent?: Accent;
    rate?: SpeechRate;
    onStep?: (index: number) => void;
    onDone?: () => void;
  } = {}
): boolean {
  if (!isSpeechSupported() || items.length === 0) {
    options.onDone?.();
    return false;
  }

  const { accent = 'en-GB', rate = 0.95, onStep, onDone } = options;
  stopSpeaking();
  const token = activeToken;
  const voice = getPreferredVoice(accent);

  const speakAt = (index: number) => {
    if (token !== activeToken) return;
    if (index >= items.length) {
      onDone?.();
      return;
    }

    onStep?.(index);

    try {
      const utterance = new SpeechSynthesisUtterance(normalizeTextForSpeech(items[index]));
      utterance.lang = accent;
      utterance.rate = rate;
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        if (token !== activeToken) return;
        window.setTimeout(() => speakAt(index + 1), 240);
      };
      utterance.onerror = () => {
        if (token === activeToken) onDone?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      onDone?.();
    }
  };

  speakAt(0);
  return true;
}

export function playFeedbackTone(type: 'correct' | 'wrong'): void {
  if (typeof window === 'undefined') return;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;

  try {
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.26);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(175, now + 0.18);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.23);
    }

    window.setTimeout(() => {
      ctx.close().catch(() => {});
    }, 350);
  } catch {
    // Audio feedback is strictly optional
  }
}
