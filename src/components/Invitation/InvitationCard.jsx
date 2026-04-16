import React from 'react';
import { Typography, Button, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const InvitationCard = () => {
  return (
    <>
      {/* ── Cultural Context Section ──────────────── */}
      <section
        className="cultural-section animate-fade-in-up anim-delay-200"
        aria-labelledby="cultural-heading"
      >
        <Typography
          variant="body1"
          className="cultural-quote"
          id="cultural-heading"
          sx={{ fontFamily: '"Cormorant Garamond", serif !important' }}
        >
          <em>
            Upanayan Sanskar</em> is a sacred Hindu rite of passage marking the beginning of{' '}
          <strong>Brahmacharya</strong> (student life), where the young Batuk is initiated into the{' '}
          <strong>Gayatri Mantra</strong> and adorned with the sacred thread (<strong>Janeu</strong>).
          In the <em>Maithili tradition of Bihar</em>, this ceremony is celebrated with deep family
          involvement, elaborate Vedic rituals, folk songs, and generational blessings.
        </Typography>
      </section>

      {/* ── Separator ────────────────────────────── */}
      <div className="section-sep animate-fade-in anim-delay-300" role="separator">
        <div className="sep-line" />
        <span className="sep-icon" role="img" aria-label="diya">🪔</span>
        <div className="sep-line" />
      </div>

      {/* ── Venue Section ────────────────────────── */}
      <section
        className="venue-section animate-fade-in-up anim-delay-700"
        aria-labelledby="venue-heading"
      >
        <div className="venue-icon-wrap" aria-hidden="true" role="presentation">
          <LocationOnIcon
            sx={{
              fontSize: '2.8rem',
              color: '#8B0000',
              filter: 'drop-shadow(0 2px 6px rgba(139,0,0,0.25))',
            }}
          />
        </div>

        <p className="venue-label" id="venue-heading">Ceremony Venue — स्थान</p>

        <Typography
          component="address"
          className="venue-name"
          sx={{
            fontFamily: '"Playfair Display", serif !important',
            fontStyle: 'normal',
          }}
        >
          Venu Belari
        </Typography>

        <Typography
          variant="body1"
          className="venue-address"
          component="address"
          sx={{
            fontFamily: '"Cormorant Garamond", serif !important',
            fontStyle: 'italic',
          }}
        >
          In front of <strong>Kali Durga Mandir</strong>
          <br />
          PS Ujiyarpur, District Samastipur
          <br />
          Bihar — 848132
        </Typography>

        {/* Map Button */}
        <Button
          id="map-direction-btn"
          variant="outlined"
          startIcon={<LocationOnIcon />}
          component="a"
          href="https://maps.google.com/?q=Ujiyarpur+Samastipur+Bihar+848132"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: 2,
            borderColor: '#3A7D44',
            color: '#3A7D44',
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
            letterSpacing: '0.06em',
            borderRadius: '50px',
            px: 3,
            py: 0.8,
            fontSize: '0.95rem',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#2D6336',
              backgroundColor: 'rgba(58,125,68,0.06)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Get Directions
        </Button>
      </section>

      {/* ── Separator ────────────────────────────── */}
      <div className="section-sep animate-fade-in anim-delay-800" role="separator">
        <div className="sep-line" />
        <span className="sep-icon" role="img" aria-label="bell">🔔</span>
        <div className="sep-line" />
      </div>

      {/* ── Blessings Section ───────────────────── */}
      <section
        className="blessings-section animate-fade-in-up anim-delay-800"
        aria-labelledby="blessing-heading"
      >
        <VolunteerActivismIcon
          sx={{
            fontSize: '2.4rem',
            color: '#E6B325',
            mb: 1.5,
            filter: 'drop-shadow(0 2px 8px rgba(230,179,37,0.4))',
          }}
          aria-hidden="true"
        />

        <Typography
          variant="body1"
          className="blessings-text"
          id="blessing-heading"
          sx={{ fontFamily: '"Cormorant Garamond", serif !important' }}
        >
          "With the divine blessings of Lord Ganesha and Maa Kali Durga, we humbly invite you to
          grace this sacred Upanayan Sanskar and shower your love and blessings upon our dear young
          souls — Arnav and Saswat."
        </Typography>

        <Divider
          sx={{
            maxWidth: '200px',
            mx: 'auto',
            mb: 2,
            borderColor: 'rgba(230,179,37,0.4)',
          }}
        />

        <Typography
          variant="h5"
          component="p"
          className="family-sign"
          sx={{
            fontFamily: '"Playfair Display", serif !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <FavoriteIcon sx={{ fontSize: '1rem', color: '#8B0000' }} />
          — Shekhar Suman &amp; Sweety Kumari —
          <FavoriteIcon sx={{ fontSize: '1rem', color: '#8B0000' }} />
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            color: '#C58940',
            mt: 1,
            fontSize: '1rem',
            letterSpacing: '0.08em',
          }}
        >
          Venu Belari, Samastipur, Bihar
        </Typography>
      </section>
    </>
  );
};

export default InvitationCard;
