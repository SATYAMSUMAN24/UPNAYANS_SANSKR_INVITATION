import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import LocationOnIcon        from '@mui/icons-material/LocationOn';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FavoriteIcon          from '@mui/icons-material/Favorite';
import CalendarMonthIcon     from '@mui/icons-material/CalendarMonth';
import { PageChrome, SepRow, PageBadge } from '../common/PageElements';
import { QRCodeSVG } from 'qrcode.react';

const MAPS_LINK = 'https://maps.google.com/?q=Ujiyarpur+Samastipur+Bihar+848132';

/* ── Page 5: VENUE + BLESSINGS (also shows title & date) ── */
const Page5 = React.forwardRef(({ style }, ref) => (
  <div ref={ref} style={style} className="a4-page-shell anim-page-in">
    <div className="page-face front">
      <PageChrome pageNum={5} label="Venue & Blessings">

        <PageBadge>You Are Cordially Invited</PageBadge>

        <Typography component="h2" className="p5-header anim-fade-in"
          sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
          Venue &amp; Blessings
        </Typography>

        <SepRow icon={<LocationOnIcon sx={{ fontSize: '1rem', color: '#3A7D44' }}/>}/>

        {/* Family illustration */}
        <div className="anim-fade-in d-200">
          <img
            src="/upnayan/10.jpeg"
            alt="Upanayan ceremony family painting"
            className="p5-family-img"
          />
        </div>

        {/* Venue + QR side by side */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1.5, alignItems: 'start', mb: 1 }}
          className="anim-fade-in-up d-300">

          <div className="p5-venue-box" style={{ margin: 0 }}>
            <LocationOnIcon sx={{ color: '#3A7D44', fontSize: '2rem', mt: '2px' }}/>
            <div>
              <p className="p5-venue-label">Ceremony Venue — स्थान</p>
              <Typography component="address" className="p5-venue-name"
                sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit', fontStyle: 'normal' }}>
                Venu Belari
              </Typography>
              <Typography component="address" className="p5-venue-address"
                sx={{ fontFamily: '"Cormorant Garamond", serif !important', fontSize: 'inherit' }}>
                In front of <strong>Kali Durga Mandir</strong><br/>
                PS Ujiyarpur, District Samastipur<br/>
                Bihar — 848132
              </Typography>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="p5-directions-btn">
                <LocationOnIcon sx={{ fontSize: '0.9rem' }}/> Get Directions
              </a>
            </div>
          </div>

          {/* QR Code */}
          <Paper elevation={0} sx={{
            p: 1.2, borderRadius: '12px', textAlign: 'center',
            background: 'rgba(255,253,245,0.92)',
            border: '1px solid rgba(197,137,64,0.3)',
            flexShrink: 0,
          }}>
            <QRCodeSVG value={MAPS_LINK} size={70} bgColor="transparent" fgColor="#3D1A00" level="M"/>
            <Typography sx={{
              fontFamily: '"Roboto", sans-serif', fontSize: '0.55rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#6B3A2A', mt: 0.5,
            }}>Scan for Map</Typography>
          </Paper>
        </Box>

        <SepRow icon={<VolunteerActivismIcon sx={{ fontSize: '1rem', color: '#8B0000' }}/>}/>

        {/* Blessings Box */}
        <div className="p5-blessings-box anim-fade-in-up d-400">
          <VolunteerActivismIcon sx={{ color: '#E6B325', fontSize: '2rem', display: 'block', margin: '0 auto 6px' }}/>

          <Typography component="p" className="p5-blessing-text"
            sx={{ fontFamily: '"Cormorant Garamond", serif !important', fontSize: 'inherit' }}>
            "Kindly grace the occasion with your divine presence and shower your love
            and blessings upon our dear young souls — <strong>Arnav</strong> and <strong>Saswat</strong>
            — as they embark on this sacred journey of <em>Brahmacharya</em>."
          </Typography>

          <div style={{ borderTop: '1px solid rgba(197,137,64,0.35)', paddingTop: '8px', margin: '8px 0 4px' }}/>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FavoriteIcon sx={{ fontSize: '0.9rem', color: '#8B0000' }}/>
            <Typography component="p" className="p5-family-sign"
              sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
              Shekhar Suman &amp; Sweety Kumari
            </Typography>
            <FavoriteIcon sx={{ fontSize: '0.9rem', color: '#8B0000' }}/>
          </div>
          <p className="p5-location-line">Venu Belari, Samastipur, Bihar</p>
        </div>

        <SepRow/>

        {/* ── Event Title + Date (shown on last page) ──── */}
        <Paper elevation={0} className="anim-fade-in-up d-500" sx={{
          background: 'linear-gradient(135deg, rgba(139,0,0,0.04), rgba(230,179,37,0.07))',
          border: '1.5px solid rgba(197,137,64,0.35)',
          borderRadius: '14px',
          p: '10px 16px',
          textAlign: 'center',
          mb: 1,
        }}>
          <Typography sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
            fontWeight: 900, color: '#8B0000',
            letterSpacing: '0.03em', lineHeight: 1.2,
          }}>
            Upanayan Sanskar
          </Typography>
          <Typography sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)',
            fontWeight: 600, color: '#C58940',
            letterSpacing: '0.08em', fontStyle: 'italic',
            mt: '2px',
          }}>
            Arnav Suman &amp; Saswat Suman
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8, mt: 1 }}>
            <CalendarMonthIcon sx={{ fontSize: '0.95rem', color: '#8B0000' }}/>
            <Typography sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(0.78rem, 1.5vw, 0.9rem)',
              color: '#6B3A2A', fontStyle: 'italic',
            }}>
              21 April 2025 · Venu Belari, Samastipur, Bihar
            </Typography>
          </Box>
        </Paper>

        <div className="om-footer anim-fade-in d-600">ॐ</div>
      </PageChrome>
    </div>
  </div>
));

Page5.displayName = 'Page5';
export default Page5;
