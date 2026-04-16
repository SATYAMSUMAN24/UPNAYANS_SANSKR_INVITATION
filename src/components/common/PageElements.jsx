import React from 'react';
import { Typography } from '@mui/material';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

/* ── Inline SVG Corner Ornament ─────────────────────────── */
export const CornerOrnament = () => (
  <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 4 Q35 4 66 4 Q66 35 66 66" stroke="#C58940" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M4 4 Q20 20 36 36" stroke="#E6B325" strokeWidth="1.2" fill="none" opacity="0.7"/>
    <circle cx="4"  cy="4"  r="4" fill="#C58940"/>
    <circle cx="66" cy="4"  r="2.5" fill="#E6B325"/>
    <circle cx="66" cy="66" r="2.5" fill="#E6B325"/>
    {/* Banana leaf top */}
    <g opacity="0.55">
      <ellipse cx="20" cy="10" rx="5" ry="12" fill="#3A7D44" transform="rotate(-35 20 10)"/>
      <ellipse cx="10" cy="20" rx="5" ry="12" fill="#3A7D44" transform="rotate(55 10 20)"/>
      <ellipse cx="32" cy="7"  rx="3.5" ry="8" fill="#3A7D44" transform="rotate(-20 32 7)"/>
    </g>
    <circle cx="7"  cy="36" r="2.5" fill="#E6B325" opacity="0.5"/>
    <circle cx="36" cy="7"  r="2"   fill="#C58940" opacity="0.4"/>
  </svg>
);

/* ── Inline SVG Mandala ──────────────────────────────────── */
export const MandalaSVG = ({ size = 200, className = '' }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 200 200" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className} aria-hidden="true"
  >
    {[95,78,62,46,30,14].map((r,i) => (
      <circle key={i} cx="100" cy="100" r={r}
        stroke="#C58940" strokeWidth={i%2===0?1.5:1}
        strokeDasharray={i%2===0?'8 4':'5 3'}
      />
    ))}
    {[0,45,90,135,180,225,270,315].map((angle,i) => (
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        <ellipse cx="100" cy="42" rx="5" ry="14" fill="#C58940" fillOpacity="0.32"/>
        <ellipse cx="100" cy="65" rx="3" ry="8"  fill="#E6B325" fillOpacity="0.28"/>
      </g>
    ))}
    {[0,60,120,180,240,300].map((angle,i) => (
      <line key={`l${i}`} x1="100" y1="10" x2="100" y2="190"
        stroke="#C58940" strokeWidth="0.5" strokeOpacity="0.25"
        transform={`rotate(${angle} 100 100)`}
      />
    ))}
    <circle cx="100" cy="100" r="14" fill="#E6B325" fillOpacity="0.25"/>
  </svg>
);

/* ── Section Separator Row ───────────────────────────────── */
export const SepRow = ({ icon }) => (
  <div className="sep-row" role="separator">
    <div className="sep-line"/>
    <span className="sep-icon">{icon || <AutoAwesomeIcon sx={{ fontSize: '1.1rem', color: '#C58940' }}/>}</span>
    <div className="sep-line"/>
  </div>
);

/* ── Page Section Badge ──────────────────────────────────── */
export const PageBadge = ({ children }) => (
  <div className="page-section-badge">
    <span className="badge-dot"/>
    <Typography variant="caption" sx={{ fontFamily: '"Roboto", sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', color: '#6B3A2A' }}>
      {children}
    </Typography>
    <span className="badge-dot"/>
  </div>
);

/* ── Page Chrome Wrapper with strips + corners ──────────── */
export const PageChrome = ({ children, pageNum, label }) => (
  <div className="page-chrome">
    <div className="page-top-strip"/>

    {/* Corner ornaments */}
    <div className="corner-orn tl"><CornerOrnament/></div>
    <div className="corner-orn tr"><CornerOrnament/></div>
    <div className="corner-orn bl"><CornerOrnament/></div>
    <div className="corner-orn br"><CornerOrnament/></div>

    {/* Banana leaf MUI icons */}
    <span className="banana-leaf tl">
      <TempleBuddhistIcon sx={{ fontSize: '2rem', color: '#3A7D44', opacity: 0.42 }}/>
    </span>
    <span className="banana-leaf tr">
      <TempleBuddhistIcon sx={{ fontSize: '2rem', color: '#3A7D44', opacity: 0.42, transform: 'scaleX(-1)' }}/>
    </span>

    {/* Scrollable content area */}
    <div className="page-body">
      {children}
    </div>

    {/* Page number */}
    {pageNum && (
      <div className="page-num">
        {label ? `— ${label} —` : `Page ${pageNum}`}
      </div>
    )}

    <div className="page-bottom-strip"/>
  </div>
);
