import React from 'react';
import { Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { PageChrome, SepRow, PageBadge } from '../common/PageElements';

/* ── Page 2: CULTURAL + SHLOKA + INVITATION MSG ─────────── */
const Page2 = React.forwardRef(({ style }, ref) => (
  <div ref={ref} style={style} className="a4-page-shell anim-page-in">
    <div className="page-face front">
      <PageChrome pageNum={2} label="Sacred Significance">

        {/* Header */}
        <PageBadge>Cultural Significance</PageBadge>
        <Typography component="h2" className="p2-header anim-fade-in"
          sx={{ fontFamily: '"Playfair Display", serif !important', fontSize: 'inherit' }}>
          The Sacred Thread Ceremony
        </Typography>

        <SepRow icon={<MenuBookIcon sx={{ fontSize: '1rem', color: '#C58940' }}/>}/>

        {/* Batuk illustration floated right */}
        <div className="anim-fade-in d-200">
          <img src="/upnayan/2.jpeg" alt="Batuk — Brahmacharya figure" className="p2-batuk-img anim-float"/>

          {/* Cultural text */}
          <Typography component="p" className="p2-cultural-text"
            sx={{ fontFamily: '"Cormorant Garamond", serif !important', fontSize: 'inherit' }}>
            <strong>Upanayan Sanskar</strong> is one of the sixteen sacred <em>Shodasha Samskaras</em> in
            Hindu tradition. It marks the beginning of <em>Brahmacharya</em> — the student phase of
            life — where the young Batuk is initiated into the Gayatri Mantra and ceremonially
            adorned with the sacred thread (<strong>Janeu / Yajnopavita</strong>).
            <br/><br/>
            In the <strong>Maithili tradition of Bihar</strong>, this sacred rite is celebrated with
            deep family involvement, elaborate Vedic rituals, traditional folk songs, havan (sacred fire),
            and generational blessings passed down through centuries of cultural heritage.
          </Typography>
        </div>

        <SepRow icon={<LocalFireDepartmentIcon sx={{ fontSize: '1rem', color: '#8B0000' }}/>}/>

        {/* Yajnopavita Shloka */}
        <div className="p2-shloka-box anim-fade-in-up d-300">
          <p className="p2-shloka-label">— यज्ञोपवीत श्लोकः —</p>
          <Typography component="p" className="p2-shloka-text"
            sx={{ fontFamily: '"Tiro Devanagari Sanskrit", serif !important', fontSize: 'inherit' }}>
            यज्ञोपवीतं परमं पवित्रं<br/>
            प्रजापतेः यत् सहजं पुरस्तात्।<br/>
            आयुष्यमग्र्यं प्रतिमुञ्च शुभ्रं<br/>
            यज्ञोपवीतं बलमस्तु तेजः॥
          </Typography>
        </div>

        {/* Ritual illustration */}
        <div className="anim-fade-in-up d-400">
          <img src="/upnayan/8.jpeg" alt="Brahmopadesham and Bhikshakaranam rituals"
            className="p2-ritual-img"/>
        </div>

        <SepRow/>

        {/* Invitation Message */}
        <div className="p2-invite-msg anim-fade-in d-500">
          <Typography component="p" className="p2-invite-msg"
            sx={{ fontFamily: '"Cormorant Garamond", serif !important', fontSize: 'inherit', margin: 0, padding: 0, border: 'none', background: 'none' }}>
            "With divine blessings, we cordially invite you to grace the auspicious occasion of
            <strong> Upanayan Sanskar </strong> and bless the young souls on their sacred journey."
          </Typography>
        </div>

        <div className="om-footer anim-fade-in d-600">ॐ</div>
      </PageChrome>
    </div>
  </div>
));

Page2.displayName = 'Page2';
export default Page2;
