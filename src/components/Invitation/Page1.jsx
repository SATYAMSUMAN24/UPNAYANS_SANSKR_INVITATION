import React from 'react';
import { Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { PageChrome, SepRow, MandalaSVG, PageBadge } from '../common/PageElements';

/* ── Page 1: COVER PAGE ─────────────────────────────────── */
const Page1 = React.forwardRef(({ style }, ref) => (
  <div ref={ref} style={style} className="a4-page-shell anim-page-in">
    <div className="page-face front">
      <PageChrome pageNum={1} label="Cover">

        {/* Mandala background */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '-28px', left: '50%',
            transform: 'translateX(-50%)', opacity: 0.08, zIndex: 0, pointerEvents: 'none'
          }}>
            <MandalaSVG size={320} className="anim-rotate"/>
          </div>

          {/* Ganesh Ji */}
          <div className="p1-ganesh-wrap anim-scale-in" style={{ position: 'relative', zIndex: 1 }}>
            <img
              src="/upnayan/i.jpg"
              alt="Lord Ganesha"
              className="p1-ganesh-img anim-float"
            />
          </div>

          {/* Ganesh Vandana */}
          <div className="p1-ganesh-vandana anim-fade-in d-200" style={{ position: 'relative', zIndex: 1 }}>
            <Typography component="p" className="p1-ganesh-vandana" sx={{
              fontFamily: '"Tiro Devanagari Sanskrit", serif !important',
              fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
              color: '#6B3A2A', textAlign: 'center', lineHeight: 2.1, margin: 0, border: 'none',
              background: 'none', padding: 0,
            }}>
              ॐ श्री गणेशाय नमः ॥<br/>
              वक्रतुंड महाकाय सूर्यकोटि समप्रभ।<br/>
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            </Typography>
          </div>

          <SepRow icon={<AutoAwesomeIcon sx={{ fontSize: '1rem', color: '#C58940' }}/>}/>

          {/* OM Symbol */}
          <div className="p1-title-om anim-fade-in d-300">ॐ</div>

          {/* Title */}
          <Typography component="h1" className="p1-main-title anim-shimmer-txt anim-fade-in d-300"
            sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
            Upanayan Sanskar
          </Typography>

          <Typography component="p" className="p1-subtitle anim-fade-in d-400"
            sx={{ fontFamily: '"Cormorant Garamond", serif !important' }}>
            उपनयन संस्कार · A Sacred Ceremony Invitation
          </Typography>

          <SepRow icon={<SelfImprovementIcon sx={{ fontSize: '1rem', color: '#C58940' }}/>}/>

          {/* Ceremony illustration */}
          <div className="anim-fade-in-up d-400">
            <img
              src="/upnayan/1.jpeg"
              alt="Upanayan Sanskar ceremony illustration"
              className="p1-ceremony-img"
            />
          </div>

          {/* Subtitle line */}
          <PageBadge>Maithili Vedic Tradition · Bihar</PageBadge>

          <div className="om-footer anim-fade-in d-600">ॐ</div>
        </div>
      </PageChrome>
    </div>
  </div>
));

Page1.displayName = 'Page1';
export default Page1;
