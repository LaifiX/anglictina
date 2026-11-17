import { Volume2 } from 'lucide-react';
import { useState } from 'react';
import type { Accent, SpeechRate } from '../types/english';
import { speakText } from '../utils/speech';

interface AudioButtonProps {
  text: string;
  accent: Accent;
  rate: SpeechRate;
  label?: string;
  title?: string;
  iconOnly?: boolean;
  className?: string;
}

export function AudioButton({
  text,
  accent,
  rate,
  label = 'Vypočuť',
  title,
  iconOnly = false,
  className = '',
}: AudioButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakText(text, {
      accent,
      rate,
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`audio-btn ${iconOnly ? 'audio-btn-icon' : ''} ${speaking ? 'speaking' : ''} ${className}`}
      title={title ?? `Prehrať výslovnosť: ${text}`}
      aria-label={`Prehrať výslovnosť: ${text}`}
    >
      <Volume2 size={16} />
      {!iconOnly && <span>{label}</span>}
    </button>
  );
}
