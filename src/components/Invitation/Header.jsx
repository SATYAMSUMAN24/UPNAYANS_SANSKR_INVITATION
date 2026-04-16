import React from 'react';
import { Typography, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

/* Inline SVG Mandala — pure CSS drawn */
const MandalaSVG = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
  >
    <circle cx="100" cy="100" r="95"  stroke="#C58940" strokeWidth="1.5" strokeDasharray="8 4" />
    <circle cx="100" cy="100" r="78"  stroke="#E6B325" strokeWidth="1" strokeDasharray="5 3" />
    <circle cx="100" cy="100" r="62"  stroke="#C58940" strokeWidth="1" />
    <circle cx="100" cy="100" r="46"  stroke="#8B0000" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="100" cy="100" r="30"  stroke="#C58940" strokeWidth="1.5" />
    <circle cx="100" cy="100" r="14"  fill="#E6B325" fillOpacity="0.3" />
    {[0,45,90,135,180,225,270,315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        <ellipse cx="100" cy="42" rx="5" ry="14" fill="#C58940" fillOpacity="0.35" />
        <ellipse cx="100" cy="68" rx="3" ry="8"  fill="#E6B325" fillOpacity="0.3" />
      </g>
    ))}
    {[0,60,120,180,240,300].map((angle, i) => (
      <line
        key={`l${i}`}
        x1="100" y1="8" x2="100" y2="192"
        stroke="#C58940"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        transform={`rotate(${angle} 100 100)`}
      />
    ))}
  </svg>
);

const Header = () => {
  return (
    <header className="header-section animate-fade-in-down">
      {/* OM Symbol */}
      <span
        className="header-om-symbol animate-float"
        role="img"
        aria-label="Om"
      >
        ॐ
      </span>

      {/* Mandala decorative */}
      <div className="mandala-svg-wrapper">
        <MandalaSVG className="mandala-small animate-rotate-slow" />
      </div>

      {/* Sacred Labels */}
      <Chip
        icon={<AutoAwesomeIcon sx={{ color: '#C58940 !important', fontSize: '0.85rem' }} />}
        label="श्री गणेशाय नमः"
        size="small"
        sx={{
          background: 'linear-gradient(135deg, rgba(230,179,37,0.15), rgba(197,137,64,0.1))',
          border: '1px solid rgba(197,137,64,0.4)',
          color: '#6B3A2A',
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 600,
          fontSize: '0.88rem',
          letterSpacing: '0.06em',
          mb: 1.5,
        }}
      />

      {/* Main Title */}
      <Typography
        variant="h1"
        component="h1"
        className="header-title-main animate-shimmer-text"
        sx={{ fontSize: 'inherit !important' }}
      >
        Upanayan Sanskar
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        className="header-subtitle"
        sx={{ fontFamily: '"Cormorant Garamond", serif !important' }}
      >
        उपनयन संस्कार — Maithili Vedic Tradition, Bihar
      </Typography>

      {/* Ornament Divider */}
      <div className="header-divider-ornament" role="separator">
        <div className="divider-line" />
        <span className="divider-center-icon" role="img" aria-label="lotus">🪷</span>
        <div className="divider-line" />
      </div>

      {/* Diya Row */}
      <div className="diya-row" aria-hidden="true">
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((delay, i) => (
          <div
            key={i}
            className="diya-element"
            style={{ animationDelay: `${delay}s` }}
          >
            <span className="diya-flame animate-flicker">🔥</span>
            <span className="diya-base">🪔</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
