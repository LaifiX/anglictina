import type { TenseId } from '../types/english';

interface TenseTimelineProps {
  tenseId: TenseId;
  captionSk: string;
}

/**
 * Accessible SVG timeline visualizing where each English tense lives relative to PAST — NOW — FUTURE.
 * Uses CSS custom properties so it adapts cleanly to light and dark themes.
 */
export function TenseTimeline({ tenseId, captionSk }: TenseTimelineProps) {
  return (
    <figure className="timeline-box">
      <svg
        viewBox="0 0 420 96"
        className="timeline-svg"
        role="img"
        aria-label={`Časová os: ${captionSk}`}
      >
        {/* Base horizontal axis */}
        <line
          x1="24"
          y1="52"
          x2="392"
          y2="52"
          stroke="var(--border-strong)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Arrow head at right */}
        <polyline
          points="386,46 396,52 386,58"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* NOW vertical marker */}
        <line
          x1="210"
          y1="20"
          x2="210"
          y2="72"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text x="48" y="84" textAnchor="middle" className="tl-label">
          Minulosť
        </text>
        <text x="210" y="86" textAnchor="middle" className="tl-label tl-now">
          TERAZ
        </text>
        <text x="368" y="84" textAnchor="middle" className="tl-label">
          Budúcnosť
        </text>

        {/* Tense-specific visualization */}
        {tenseId === 'present-simple' && (
          <g>
            {[74, 120, 166, 210, 254, 300, 346].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="52"
                r={x === 210 ? 6.5 : 5.5}
                fill={x === 210 ? 'var(--primary)' : 'var(--emerald)'}
                stroke="var(--bg-surface)"
                strokeWidth="2"
              />
            ))}
            <text x="210" y="18" textAnchor="middle" className="tl-badge">
              pravidelne / vždy / fakt
            </text>
          </g>
        )}

        {tenseId === 'present-continuous' && (
          <g>
            <rect
              x="166"
              y="40"
              width="88"
              height="24"
              rx="12"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            <path
              d="M 176 52 Q 186 42 196 52 T 216 52 T 236 52 T 246 52"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <text x="210" y="18" textAnchor="middle" className="tl-badge">
              prebieha práve teraz
            </text>
          </g>
        )}

        {tenseId === 'past-simple' && (
          <g>
            <circle
              cx="116"
              cy="52"
              r="9"
              fill="var(--primary)"
              stroke="var(--bg-surface)"
              strokeWidth="2.5"
            />
            <line
              x1="116"
              y1="26"
              x2="116"
              y2="41"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            <text x="116" y="18" textAnchor="middle" className="tl-badge">
              ukončený bod (V2)
            </text>
          </g>
        )}

        {tenseId === 'past-continuous' && (
          <g>
            <rect
              x="64"
              y="41"
              width="106"
              height="22"
              rx="11"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            <path
              d="M 74 52 Q 84 43 94 52 T 114 52 T 134 52 T 154 52"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle
              cx="126"
              cy="52"
              r="6"
              fill="var(--amber)"
              stroke="var(--bg-surface)"
              strokeWidth="2"
            />
            <text x="117" y="18" textAnchor="middle" className="tl-badge">
              dej na pozadí (+ prerušenie)
            </text>
          </g>
        )}

        {tenseId === 'future-will' && (
          <g>
            <circle cx="210" cy="52" r="6" fill="var(--amber)" />
            <path
              d="M 216 46 Q 266 20 314 44"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <polyline
              points="307,38 317,45 307,49"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="326"
              cy="52"
              r="7.5"
              fill="var(--primary)"
              stroke="var(--bg-surface)"
              strokeWidth="2"
            />
            <text x="275" y="18" textAnchor="middle" className="tl-badge">
              rozhodnutie teraz → budúcnosť
            </text>
          </g>
        )}

        {tenseId === 'future-going-to' && (
          <g>
            <rect
              x="184"
              y="42"
              width="52"
              height="20"
              rx="10"
              fill="var(--emerald-soft)"
              stroke="var(--emerald)"
              strokeWidth="2"
            />
            <text x="210" y="55.5" textAnchor="middle" className="tl-mini">
              PLÁN
            </text>
            <line
              x1="238"
              y1="52"
              x2="314"
              y2="52"
              stroke="var(--emerald)"
              strokeWidth="3"
              strokeDasharray="6 4"
            />
            <circle
              cx="324"
              cy="52"
              r="8"
              fill="var(--emerald)"
              stroke="var(--bg-surface)"
              strokeWidth="2"
            />
            <text x="275" y="18" textAnchor="middle" className="tl-badge">
              plán vopred / dôkaz → budúcnosť
            </text>
          </g>
        )}

        {tenseId === 'present-perfect' && (
          <g>
            <circle cx="110" cy="52" r="7" fill="var(--purple)" />
            <path
              d="M 117 46 Q 162 20 203 45"
              fill="none"
              stroke="var(--purple)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <polyline
              points="195,38 205,46 194,49"
              fill="none"
              stroke="var(--purple)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="210"
              cy="52"
              r="7.5"
              fill="var(--primary)"
              stroke="var(--bg-surface)"
              strokeWidth="2"
            />
            <text x="160" y="18" textAnchor="middle" className="tl-badge">
              most z minulosti do TERAZ (V3)
            </text>
          </g>
        )}

        {tenseId === 'present-perfect-continuous' && (
          <g>
            <rect
              x="92"
              y="41"
              width="124"
              height="22"
              rx="11"
              fill="var(--purple-soft)"
              stroke="var(--purple)"
              strokeWidth="2"
            />
            <path
              d="M 102 52 Q 112 43 122 52 T 142 52 T 162 52 T 182 52 T 202 52"
              fill="none"
              stroke="var(--purple)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="210"
              cy="52"
              r="6.5"
              fill="var(--primary)"
              stroke="var(--bg-surface)"
              strokeWidth="2"
            />
            <text x="155" y="18" textAnchor="middle" className="tl-badge">
              stále trvá od minulosti až doteraz
            </text>
          </g>
        )}

        {tenseId === 'past-perfect' && (
          <g>
            <circle
              cx="76"
              cy="52"
              r="8.5"
              fill="var(--purple)"
              stroke="var(--bg-surface)"
              strokeWidth="2"
            />
            <text x="76" y="55.5" textAnchor="middle" className="tl-num">
              1
            </text>
            <line
              x1="88"
              y1="52"
              x2="138"
              y2="52"
              stroke="var(--purple)"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            <circle
              cx="148"
              cy="52"
              r="8"
              fill="var(--amber)"
              stroke="var(--bg-surface)"
              strokeWidth="2"
            />
            <text x="148" y="55.5" textAnchor="middle" className="tl-num">
              2
            </text>
            <text x="112" y="18" textAnchor="middle" className="tl-badge">
              1. ešte skôr (had+V3) → 2. potom (V2)
            </text>
          </g>
        )}
      </svg>
      <figcaption className="timeline-caption">{captionSk}</figcaption>
    </figure>
  );
}
