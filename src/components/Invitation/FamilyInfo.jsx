import React from 'react';
import { Typography, Paper } from '@mui/material';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';

const FamilyInfo = () => {
  return (
    <section aria-labelledby="family-heading">
      {/* ── Names Section ───────────────────────── */}
      <div className="names-section animate-fade-in-up anim-delay-300">
        <p className="names-label" id="names-heading">Batuk (Boys) — उपनयन संस्कार</p>

        <div className="names-grid" aria-labelledby="names-heading" role="group">
          {/* Arnav */}
          <div className="name-block">
            <Typography
              component="h2"
              className="name-primary"
              sx={{ fontFamily: '"Playfair Display", serif !important' }}
            >
              Arnav
            </Typography>
            <span className="name-secondary">Suman</span>
          </div>

          {/* Separator */}
          <span className="names-and-separator" aria-hidden="true">&amp;</span>

          {/* Saswat */}
          <div className="name-block">
            <Typography
              component="h2"
              className="name-primary"
              sx={{ fontFamily: '"Playfair Display", serif !important' }}
            >
              Saswat
            </Typography>
            <span className="name-secondary">Suman</span>
          </div>
        </div>

        {/* Decorative underline */}
        <div
          style={{
            width: '120px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #E6B325, #C58940, #E6B325, transparent)',
            margin: '12px auto 0',
            borderRadius: '9999px',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Separator ──────────────────────────── */}
      <div className="section-sep animate-fade-in anim-delay-400" role="separator">
        <div className="sep-line" />
        <span className="sep-icon" role="img" aria-label="flower">🌸</span>
        <div className="sep-line" />
      </div>

      {/* ── Parents Section ──────────────────────── */}
      <div className="parents-section animate-fade-in-up anim-delay-500" id="family-heading">
        <p className="parents-label">Blessed by Their Parents</p>

        <Paper
          elevation={0}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0,
            px: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, rgba(255,248,231,0.9), rgba(255,253,245,0.95))',
            border: '1px solid rgba(230,179,37,0.3)',
            borderRadius: '50px',
            boxShadow: '0 2px 16px rgba(197,137,64,0.12)',
          }}
        >
          <TempleBuddhistIcon
            sx={{ color: '#8B0000', mr: 1.5, fontSize: '1.2rem', opacity: 0.75 }}
          />
          <div className="parents-grid" role="group" aria-label="Parents">
            <div className="parent-block">
              <span className="parent-name">Shekhar Suman</span>
              <span className="parent-role">Father</span>
            </div>
            <span className="parents-and" aria-label="and">&amp;</span>
            <div className="parent-block">
              <span className="parent-name">Sweety Kumari</span>
              <span className="parent-role">Mother</span>
            </div>
          </div>
          <TempleBuddhistIcon
            sx={{ color: '#8B0000', ml: 1.5, fontSize: '1.2rem', opacity: 0.75 }}
          />
        </Paper>
      </div>
    </section>
  );
};

export default FamilyInfo;
