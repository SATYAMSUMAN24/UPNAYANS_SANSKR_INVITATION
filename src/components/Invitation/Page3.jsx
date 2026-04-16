import React from 'react';
import { Typography, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { PageChrome, SepRow, PageBadge } from '../common/PageElements';

/* ── Page 3: NAMES & FAMILY ────────────────────────────── */
const Page3 = React.forwardRef(({ style }, ref) => (
  <div ref={ref} style={style} className="a4-page-shell anim-page-in">
    <div className="page-face front">
      <PageChrome pageNum={3} label="The Batuk">

        <PageBadge>In the Presence of the Divine</PageBadge>

        <Typography component="h2" className="p3-header anim-fade-in"
          sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
          The Sacred Batuk
        </Typography>

        <SepRow icon={<StarIcon sx={{ fontSize: '1rem', color: '#C58940' }}/>}/>

        {/* Boys Photo — Arnav & Saswat */}
        <div className="p3-boys-img-wrap anim-scale-in d-200">
          <img
            src="/upnayan/5.jpeg"
            alt="Arnav Suman and Saswat Suman"
            className="p3-boys-img"
          />
          <span className="p3-boys-label">Arnav & Saswat Suman</span>
        </div>

        {/* Names Grid */}
        <div className="p3-names-grid anim-fade-in-up d-300">
          <div className="p3-name-block">
            <Typography component="h3" className="p3-name-primary"
              sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
              Arnav
            </Typography>
            <span className="p3-name-family">Suman</span>
          </div>

          <span className="p3-and" aria-label="and">&amp;</span>

          <div className="p3-name-block">
            <Typography component="h3" className="p3-name-primary"
              sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
              Saswat
            </Typography>
            <span className="p3-name-family">Suman</span>
          </div>
        </div>

        {/* Gold underline */}
        <div style={{
          width: '140px', height: '3px', margin: '10px auto 16px',
          background: 'linear-gradient(90deg, transparent, #E6B325, #C58940, #E6B325, transparent)',
          borderRadius: '9999px',
        }} aria-hidden="true"/>

        <SepRow icon={<FavoriteIcon sx={{ fontSize: '1rem', color: '#8B0000' }}/>}/>

        {/* Parents Section */}
        <PageBadge>Blessed by Their Parents</PageBadge>

        <div className="p3-parents-row anim-fade-in-up d-400">
          {/* Father / Mother photo */}
          <img
            src="/upnayan/father.jpeg"
            alt="Shekhar Suman and Sweety Kumari"
            className="p3-parent-photo"
          />
          <div className="p3-parent-info">
            <p className="p3-parents-label">Son of</p>
            <Typography component="p" className="p3-parent-names"
              sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
              Shekhar Suman
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#C58940', fontSize: '1rem', fontStyle: 'italic' }}>
                &amp;
              </span>
            </div>
            <Typography component="p" className="p3-parent-names"
              sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
              Sweety Kumari
            </Typography>
            <p className="p3-parent-role">Father &amp; Mother · Venu Belari, Bihar</p>
          </div>
        </div>

        {/* Family illustration */}
        {/* <div className="anim-fade-in-up d-500" style={{ marginTop: '12px' }}>
          <img
            src="/upnayan/4.jpeg"
            alt="Family upanayan ceremony illustration"
            style={{
              width: '100%', maxHeight: '170px',
              objectFit: 'cover', objectPosition: 'top center',
              borderRadius: '14px',
              border: '2px solid rgba(197,137,64,0.45)',
              boxShadow: '0 4px 20px rgba(61,26,0,0.14)',
            }}
          />
        </div> */}

        <Divider sx={{ borderColor: 'rgba(197,137,64,0.3)', mt: 1.5, mb: 0.5 }}/>
        <div className="om-footer anim-fade-in d-600">ॐ</div>
      </PageChrome>
    </div>
  </div>
));

Page3.displayName = 'Page3';
export default Page3;
