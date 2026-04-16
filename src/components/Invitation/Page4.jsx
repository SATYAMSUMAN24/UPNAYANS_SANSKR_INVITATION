import React from 'react';
import { Typography, Box } from '@mui/material';
import CalendarMonthIcon        from '@mui/icons-material/CalendarMonth';
import LocalFireDepartmentIcon  from '@mui/icons-material/LocalFireDepartment';
import CelebrationIcon          from '@mui/icons-material/Celebration';
import SelfImprovementIcon      from '@mui/icons-material/SelfImprovement';
import StarIcon                 from '@mui/icons-material/Star';
import { PageChrome, SepRow, PageBadge } from '../common/PageElements';

const events = [
  {
    date: '17', month: 'Apr', day: 'Thursday',
    name: 'Marwa & Dinguni',
    hindi: 'मर्वा एवं दिंगुनी',
    desc: 'Haldi ceremony, divine blessings & traditional Maithili folk songs',
    icon: <CelebrationIcon sx={{ color: '#E6B325', fontSize: '1.1rem' }}/>,
    color: '#E6B325', main: false,
  },
  {
    date: '20', month: 'Apr', day: 'Sunday',
    name: 'Kumram',
    hindi: 'कुमराम',
    desc: 'Sacred purification & preparation rituals before the Janeu ceremony',
    icon: <SelfImprovementIcon sx={{ color: '#C58940', fontSize: '1.1rem' }}/>,
    color: '#C58940', main: false,
  },
  {
    date: '21', month: 'Apr', day: 'Monday',
    name: 'Upanayan Sanskar',
    hindi: 'उपनयन संस्कार',
    desc: 'Sacred Havan, Gayatri Mantra initiation & Janeu thread ceremony',
    icon: <LocalFireDepartmentIcon sx={{ color: '#8B0000', fontSize: '1.1rem' }}/>,
    color: '#8B0000', main: true,
  },
];

/* ── Page 4: EVENT SCHEDULE ─────────────────────────────── */
const Page4 = React.forwardRef(({ style }, ref) => (
  <div ref={ref} style={style} className="a4-page-shell anim-page-in">
    <div className="page-face front">
      <PageChrome pageNum={4} label="Event Schedule">

        <PageBadge>Auspicious Occasions</PageBadge>

        <Typography component="h2" className="p4-header anim-fade-in"
          sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
          Event Schedule
        </Typography>

        <SepRow icon={<CalendarMonthIcon sx={{ fontSize: '1rem', color: '#C58940' }}/>}/>

        {/* Two-column image strip — compact */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          mb: '12px',
        }} className="anim-fade-in d-200">
          <img
            src="/upnayan/6.jpeg"
            alt="Upanayan ceremony illustration"
            style={{
              width: '100%', height: '110px',
              objectFit: 'cover', objectPosition: 'center top',
              borderRadius: '10px',
              border: '2px solid rgba(197,137,64,0.4)',
              boxShadow: '0 3px 14px rgba(61,26,0,0.12)',
            }}
          />
          <img
            src="/upnayan/7.jpeg"
            alt="Boy performing havan"
            style={{
              width: '100%', height: '110px',
              objectFit: 'cover', objectPosition: 'center top',
              borderRadius: '10px',
              border: '2px solid rgba(197,137,64,0.4)',
              boxShadow: '0 3px 14px rgba(61,26,0,0.12)',
            }}
          />
        </Box>

        {/* Events — compact vertical list */}
        <div className="p4-events-list">
          {events.map((ev, idx) => (
            <article
              key={ev.date}
              className={`p4-event-item-v2 anim-fade-in-up d-${(idx + 3) * 100}${ev.main ? ' main-event' : ''}`}
              role="listitem"
              aria-label={`${ev.name}, ${ev.date} ${ev.month}`}
            >
              {/* Left accent bar */}
              <div style={{
                width: '4px', flexShrink: 0,
                background: `linear-gradient(180deg, ${ev.color}, ${ev.color}88)`,
                borderRadius: '4px',
              }}/>

              {/* Date bubble */}
              <div className="p4-date-bubble-v2" style={{ background: `linear-gradient(135deg, ${ev.color}, ${ev.color}cc)` }}>
                <span className="p4-date-num-v2">{ev.date}</span>
                <span className="p4-date-mon-v2">{ev.month}</span>
              </div>

              {/* Content */}
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                  {ev.icon}
                  <Typography component="h3" className="p4-event-title-v2"
                    sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
                    {ev.name}
                  </Typography>
                  {ev.main && <span className="p4-main-badge">★ Main</span>}
                </div>
                <p className="p4-event-hindi">{ev.hindi}</p>
                <p className="p4-event-desc-v2">{ev.day} · {ev.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <SepRow icon={<StarIcon sx={{ fontSize: '0.9rem', color: '#C58940' }}/>}/>

        {/* Bottom image */}
        <div className="anim-fade-in-up d-600">
          <img
            src="/upnayan/3.jpeg"
            alt="Upanayan ceremony family gathering"
            style={{
              width: '100%', height: '120px',
              objectFit: 'cover', objectPosition: 'top center',
              borderRadius: '10px',
              border: '2px solid rgba(197,137,64,0.4)',
              boxShadow: '0 3px 14px rgba(61,26,0,0.12)',
            }}
          />
        </div>

        <div className="om-footer anim-fade-in d-600">ॐ</div>
      </PageChrome>
    </div>
  </div>
));

Page4.displayName = 'Page4';
export default Page4;
