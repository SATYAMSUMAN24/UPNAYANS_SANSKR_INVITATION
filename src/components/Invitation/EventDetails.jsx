import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CelebrationIcon from '@mui/icons-material/Celebration';

const events = [
  {
    date: '17',
    month: 'April',
    day: 'Thursday',
    name: 'Marwa & Dinguni',
    desc: 'Pre-rituals with turmeric (haldi), divine blessings & traditional Maithili folk songs',
    icon: <CelebrationIcon sx={{ fontSize: '1.6rem', color: '#E6B325' }} />,
    highlight: false,
    emoji: '🌿',
    tooltip: 'Pre-ceremony rituals',
  },
  {
    date: '20',
    month: 'April',
    day: 'Sunday',
    name: 'Kumram',
    desc: 'Sacred preparation ritual — purification ceremonies before the Janeu ceremony begins',
    icon: <SelfImprovementIcon sx={{ fontSize: '1.6rem', color: '#C58940' }} />,
    highlight: false,
    emoji: '🪷',
    tooltip: 'Preparation ritual',
  },
  {
    date: '21',
    month: 'April',
    day: 'Monday',
    name: 'Upanayan Sanskar',
    desc: 'Main ceremony — sacred havan, Gayatri Mantra initiation & the sacred thread (Janeu) ceremony',
    icon: <LocalFireDepartmentIcon sx={{ fontSize: '1.6rem', color: '#8B0000' }} />,
    highlight: true,
    emoji: '🔱',
    tooltip: 'Main Ceremony — Sacred Janeu',
  },
];

const EventDetails = () => {
  return (
    <section className="timeline-section animate-fade-in-up anim-delay-500" aria-labelledby="timeline-heading">
      {/* Section Header */}
      <div className="section-sep" role="separator">
        <div className="sep-line" />
        <span className="sep-icon" role="img" aria-label="star">✨</span>
        <div className="sep-line" />
      </div>

      <p className="timeline-title" id="timeline-heading">Event Schedule — एकाग्र कार्यक्रम</p>

      {/* Timeline Cards Grid */}
      <div className="timeline-grid" role="list">
        {events.map((ev, idx) => (
          <Tooltip
            key={ev.date}
            title={ev.tooltip}
            placement="top"
            arrow
            slotProps={{
              tooltip: {
                sx: {
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.9rem',
                  bgcolor: '#3D1A00',
                  '& .MuiTooltip-arrow': { color: '#3D1A00' },
                },
              },
            }}
          >
            <article
              className={`timeline-card animate-fade-in-up anim-delay-${(idx + 4) * 100}${ev.highlight ? ' highlight' : ''}`}
              role="listitem"
              aria-label={`${ev.name}, ${ev.date} ${ev.month}`}
            >
              {/* Date Badge */}
              <div className="timeline-date-badge" aria-hidden="true">
                {ev.date}
              </div>

              <Typography
                variant="caption"
                className="timeline-month"
                component="p"
                sx={{ display: 'block', fontFamily: '"Roboto", sans-serif !important' }}
              >
                {ev.month} · {ev.day}
              </Typography>

              {/* Event Icon */}
              <div style={{ marginBottom: '8px' }} aria-hidden="true">
                {ev.icon}
              </div>

              {/* Event Name */}
              <Typography
                component="h3"
                className="timeline-event-name"
                sx={{ fontFamily: '"Playfair Display", serif !important' }}
              >
                {ev.emoji} {ev.name}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                className="timeline-desc"
                sx={{ fontFamily: '"Cormorant Garamond", serif !important' }}
              >
                {ev.desc}
              </Typography>

              {/* Highlight badge for main event */}
              {ev.highlight && (
                <div
                  style={{
                    marginTop: '10px',
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #8B0000, #B22222)',
                    color: '#FFF8E7',
                    fontSize: '0.72rem',
                    fontFamily: '"Roboto", sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                  }}
                >
                  Main Ceremony
                </div>
              )}
            </article>
          </Tooltip>
        ))}
      </div>
    </section>
  );
};

export default EventDetails;
