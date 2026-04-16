import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Typography, Snackbar, Alert, IconButton, Tooltip,
  Box, Paper, CircularProgress,
} from '@mui/material';
import PrintIcon         from '@mui/icons-material/Print';
import DownloadIcon      from '@mui/icons-material/Download';
import ShareIcon         from '@mui/icons-material/Share';
import ChevronLeftIcon   from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon  from '@mui/icons-material/ChevronRight';
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';
import SwipeDownAltIcon  from '@mui/icons-material/SwipeDownAlt';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';

import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import { MandalaSVG } from '../common/PageElements';

const PAGES       = [Page1, Page2, Page3, Page4, Page5];
const PAGE_LABELS = ['Cover', 'Significance', 'The Batuk', 'Schedule', 'Venue & Blessings'];
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ════════════════════════════════════════════════════════════
   PAGE 1 GUIDE — scroll + flip hint, shown after 3 s, tap to dismiss
   ════════════════════════════════════════════════════════════ */
const Page1Guide = ({ onDismiss }) => {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setVis(false);
    setTimeout(onDismiss, 350);
  }, [onDismiss]);

  return (
    <Box
      id="page1-guide"
      onClick={dismiss}
      sx={{
        position: 'fixed', inset: 0, zIndex: 8000,
        display: 'flex',
        /* Center on mobile so it never blocks the bottom flip arrows */
        alignItems: { xs: 'center', sm: 'flex-end' },
        justifyContent: 'center',
        pb: { xs: 0, sm: '88px' },
        pointerEvents: vis ? 'all' : 'none',
        opacity: vis ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }}
    >
      <Paper
        elevation={16}
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5,
          px: { xs: 2.5, sm: 3 }, py: { xs: 1.6, sm: 2 },
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(139,0,0,0.93) 0%, rgba(90,10,10,0.97) 100%)',
          border: '1.5px solid rgba(230,179,37,0.45)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 12px 50px rgba(61,26,0,0.55), 0 0 0 1px rgba(230,179,37,0.12)',
          animation: vis ? 'guidePopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' : 'none',
          maxWidth: '86vw',
        }}
      >
        {/* Title */}
        <Typography sx={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(0.74rem, 2.2vw, 0.92rem)',
          fontWeight: 700, color: '#E6B325',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          📖 How to Navigate
        </Typography>

        {/* Hints row */}
        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
          {/* Scroll hint */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.6 }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(230,179,37,0.15)',
              border: '1.5px solid rgba(230,179,37,0.45)',
              display: 'grid', placeItems: 'center',
              animation: 'guideScrollBounce 1.2s ease-in-out infinite',
            }}>
              <SwipeDownAltIcon sx={{ color: '#E6B325', fontSize: '1.3rem' }}/>
            </Box>
            <Typography sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.7rem', color: 'rgba(255,248,231,0.78)',
              textAlign: 'center', lineHeight: 1.4,
            }}>Scroll<br/>content</Typography>
          </Box>

          {/* Divider */}
          <Box sx={{ width: 1, height: 40, background: 'rgba(230,179,37,0.3)' }}/>

          {/* Flip hint */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.6 }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(230,179,37,0.15)',
              border: '1.5px solid rgba(230,179,37,0.45)',
              display: 'grid', placeItems: 'center',
              animation: 'guideFlipSlide 1.2s ease-in-out infinite',
            }}>
              <SwipeRightAltIcon sx={{ color: '#E6B325', fontSize: '1.3rem' }}/>
            </Box>
            <Typography sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.7rem', color: 'rgba(255,248,231,0.78)',
              textAlign: 'center', lineHeight: 1.4,
            }}>Tap ▶ to<br/>flip pages</Typography>
          </Box>
        </Box>

        {/* Dismiss hint */}
        <Typography sx={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '0.62rem', color: 'rgba(255,248,231,0.4)',
          letterSpacing: '0.08em', mt: -0.5,
        }}>
          Tap anywhere to dismiss
        </Typography>
      </Paper>
    </Box>
  );
};

/* ════════════════════════════════════════════════════════════
   BOOK LAYOUT
   ════════════════════════════════════════════════════════════ */
const BookLayout = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping,  setIsFlipping]  = useState(false);
  const [flipDir,     setFlipDir]     = useState('next');
  const [downloading, setDownloading] = useState(false);
  const [snack, setSnack]             = useState({ open: false, msg: '', sev: 'success' });
  const [showGuide,   setShowGuide]   = useState(true); // Page1 navigation guide

  const printRef   = useRef(null);
  const dlPageRefs = useRef([]);

  /* ── PRINT ────────────────────────────────────────────── */
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Upanayan Sanskar Invitation — Arnav & Saswat Suman',
    onAfterPrint: () => setSnack({ open: true, msg: 'Printed successfully! 🖨️', sev: 'success' }),
  });

  /* ── DOWNLOAD — all 5 pages stitched into one PNG ──────── */
  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    setSnack({ open: true, msg: 'Preparing booklet… please wait ⏳', sev: 'info' });

    try {
      const canvases = [];
      for (let i = 0; i < dlPageRefs.current.length; i++) {
        const el = dlPageRefs.current[i];
        if (!el) continue;
        el.style.visibility = 'visible';
        await sleep(150);
        const c = await html2canvas(el, {
          scale: 2, useCORS: true, allowTaint: true,
          backgroundColor: '#FFF8E7', logging: false,
          windowWidth: 794, width: 794, height: el.scrollHeight, scrollY: 0,
        });
        el.style.visibility = 'hidden';
        canvases.push(c);
      }
      if (!canvases.length) throw new Error('Nothing captured');

      const W = canvases[0].width;
      const H = canvases.reduce((s, c) => s + c.height, 0);
      const master = document.createElement('canvas');
      master.width = W; master.height = H;
      const ctx = master.getContext('2d');
      ctx.fillStyle = '#FFF8E7';
      ctx.fillRect(0, 0, W, H);
      let y = 0;
      for (const c of canvases) { ctx.drawImage(c, 0, y); y += c.height; }

      const link = document.createElement('a');
      link.download = 'upanayan-invitation-booklet.png';
      link.href = master.toDataURL('image/png');
      link.click();
      setSnack({ open: true, msg: '✅ Full booklet downloaded!', sev: 'success' });
    } catch (err) {
      console.error('Download error:', err);
      setSnack({ open: true, msg: 'Download failed. Please try again.', sev: 'error' });
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  /* ── SHARE ────────────────────────────────────────────── */
  const handleShare = useCallback(async () => {
    const text = 'You are cordially invited to the Upanayan Sanskar of Arnav Suman & Saswat Suman — 21 April at Venu Belari, Samastipur, Bihar.';
    if (navigator.share) {
      try { await navigator.share({ title: 'Upanayan Sanskar Invitation', text, url: window.location.href }); }
      catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setSnack({ open: true, msg: 'Invitation text copied! 📋', sev: 'info' });
    }
  }, []);

  /* ── PAGE FLIP ────────────────────────────────────────── */
  const goToPage = useCallback((target) => {
    if (isFlipping || target === currentPage || target < 0 || target >= PAGES.length) return;
    setFlipDir(target > currentPage ? 'next' : 'prev');
    setIsFlipping(true);
    setTimeout(() => { setCurrentPage(target); setIsFlipping(false); }, 500);
  }, [isFlipping, currentPage]);

  const flipTransform = isFlipping
    ? (flipDir === 'next'
        ? 'perspective(1800px) rotateY(-13deg) translateX(-2%) scale(0.97)'
        : 'perspective(1800px) rotateY(13deg)  translateX(2%)  scale(0.97)')
    : 'none';

  const CurrentPage = PAGES[currentPage];

  return (
    <Box id="book-outer-wrapper" className="book-outer">

      {/* Fixed bg mandalas */}
      <Box className="bg-deco bg-deco-tl anim-rotate" sx={{ position: 'fixed' }} aria-hidden="true">
        <MandalaSVG size={360}/>
      </Box>
      <Box className="bg-deco bg-deco-br anim-rotate-rev" sx={{ position: 'fixed' }} aria-hidden="true">
        <MandalaSVG size={280}/>
      </Box>

      {/* ── Book Card ──────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        transform: flipTransform,
        transition: isFlipping ? 'transform 0.5s cubic-bezier(0.645,0.045,0.355,1)' : 'none',
        transformOrigin: flipDir === 'next' ? 'left center' : 'right center',
        transformStyle: 'preserve-3d',
        borderRadius: '14px',
        boxShadow: '0 10px 44px rgba(61,26,0,0.2), 0 2px 8px rgba(197,137,64,0.14)',
      }}>
        <CurrentPage key={currentPage}/>

        {/* Nav arrows — bottom overlay */}
        <Box sx={{
          position: 'absolute', bottom: '14px', left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: '14px', zIndex: 30, pointerEvents: 'none',
        }}>
          {/* PREV */}
          <Tooltip title={currentPage > 0 ? `← ${PAGE_LABELS[currentPage - 1]}` : ''} placement="top">
            <span style={{ pointerEvents: 'all' }}>
              <IconButton
                id="btn-prev-page"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0 || isFlipping}
                size="small" aria-label="Previous page"
                sx={{
                  width: 36, height: 36,
                  background: 'rgba(255,248,231,0.92)',
                  border: '1.5px solid rgba(197,137,64,0.65)',
                  color: '#8B0000', backdropFilter: 'blur(8px)',
                  boxShadow: '0 2px 10px rgba(197,137,64,0.22)',
                  '&:hover:not(:disabled)': { background: 'linear-gradient(135deg,#E6B325,#C58940)', color: '#FFF8E7', transform: 'scale(1.12)' },
                  '&:disabled': { opacity: 0.2 },
                  transition: 'all 0.22s ease',
                }}
              >
                <ChevronLeftIcon sx={{ fontSize: '1.1rem' }}/>
              </IconButton>
            </span>
          </Tooltip>

          {/* Page label */}
          <Paper elevation={0} sx={{
            px: 2, py: 0.4,
            background: 'rgba(255,248,231,0.9)',
            border: '1px solid rgba(197,137,64,0.4)',
            borderRadius: '50px', backdropFilter: 'blur(10px)',
            pointerEvents: 'none',
          }}>
            <Typography sx={{
              fontFamily: '"Cormorant Garamond",serif',
              fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)',
              fontWeight: 600, color: '#6B3A2A', letterSpacing: '0.04em',
            }}>
              {currentPage + 1} / {PAGES.length} — {PAGE_LABELS[currentPage]}
            </Typography>
          </Paper>

          {/* NEXT */}
          <Tooltip title={currentPage < PAGES.length - 1 ? `${PAGE_LABELS[currentPage + 1]} →` : ''} placement="top">
            <span style={{ pointerEvents: 'all' }}>
              <IconButton
                id="btn-next-page"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === PAGES.length - 1 || isFlipping}
                size="small" aria-label="Next page"
                sx={{
                  width: 36, height: 36,
                  background: 'rgba(255,248,231,0.92)',
                  border: '1.5px solid rgba(197,137,64,0.65)',
                  color: '#8B0000', backdropFilter: 'blur(8px)',
                  boxShadow: '0 2px 10px rgba(197,137,64,0.22)',
                  '&:hover:not(:disabled)': { background: 'linear-gradient(135deg,#E6B325,#C58940)', color: '#FFF8E7', transform: 'scale(1.12)' },
                  '&:disabled': { opacity: 0.2 },
                  transition: 'all 0.22s ease',
                }}
              >
                <ChevronRightIcon sx={{ fontSize: '1.1rem' }}/>
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* ── Floating Action Buttons — Print / Download / Share ── */}
      <Box
        id="actions-fab-main"
        sx={{
          position: 'fixed', top: 14, right: 14, zIndex: 500,
          display: 'flex', flexDirection: 'column', gap: 1,
        }}
      >
        <Tooltip title="Print All Pages" placement="left">
          <IconButton
            id="fab-print"
            onClick={handlePrint}
            aria-label="Print invitation"
            sx={{
              width: 44, height: 44,
              background: 'linear-gradient(135deg,#8B0000,#B22222)',
              color: '#FFF8E7',
              boxShadow: '0 4px 16px rgba(139,0,0,0.4)',
              border: '1.5px solid rgba(255,248,231,0.18)',
              '&:hover': { transform: 'scale(1.12)', filter: 'brightness(1.1)' },
              transition: 'all 0.22s ease',
            }}
          >
            <PrintIcon sx={{ fontSize: '1.1rem' }}/>
          </IconButton>
        </Tooltip>

        <Tooltip title={downloading ? 'Preparing…' : 'Download Booklet'} placement="left">
          <span>
            <IconButton
              id="fab-download"
              onClick={handleDownload}
              disabled={downloading}
              aria-label="Download full booklet"
              sx={{
                width: 44, height: 44,
                background: 'linear-gradient(135deg,#C58940,#E6B325)',
                color: '#3D1A00',
                boxShadow: '0 4px 16px rgba(197,137,64,0.45)',
                border: '1.5px solid rgba(255,248,231,0.18)',
                '&:hover': { transform: 'scale(1.12)', filter: 'brightness(1.1)' },
                '&:disabled': { opacity: 0.55 },
                transition: 'all 0.22s ease',
              }}
            >
              {downloading
                ? <CircularProgress size={16} sx={{ color: '#3D1A00' }}/>
                : <DownloadIcon sx={{ fontSize: '1.1rem' }}/>
              }
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Share Invite" placement="left">
          <IconButton
            id="fab-share"
            onClick={handleShare}
            aria-label="Share invitation"
            sx={{
              width: 44, height: 44,
              background: 'linear-gradient(135deg,#3A7D44,#2D6336)',
              color: '#FFF8E7',
              boxShadow: '0 4px 16px rgba(58,125,68,0.4)',
              border: '1.5px solid rgba(255,248,231,0.18)',
              '&:hover': { transform: 'scale(1.12)', filter: 'brightness(1.1)' },
              transition: 'all 0.22s ease',
            }}
          >
            <ShareIcon sx={{ fontSize: '1.1rem' }}/>
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Page 1 Guide: scroll + flip tip, shown after 3 s ── */}
      {showGuide && currentPage === 0 && (
        <Page1Guide onDismiss={() => setShowGuide(false)} />
      )}

      {/*
        Print target — must NOT be display:none.
        Off-screen + visibility:hidden keeps it out of view but
        react-to-print can still read all styles correctly.
      */}
      <div
        ref={printRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '794px',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        {PAGES.map((P, i) => (
          <div key={i} style={{ pageBreakAfter: 'always', width: '794px' }}>
            <P/>
          </div>
        ))}
      </div>

      {/* Off-screen download pages — always rendered, visibility:hidden */}
      {PAGES.map((P, i) => (
        <Box
          key={`dl-${i}`}
          ref={el => dlPageRefs.current[i] = el}
          aria-hidden="true"
          sx={{
            position: 'fixed', left: '-9999px', top: 0,
            width: '794px', visibility: 'hidden', zIndex: -1, pointerEvents: 'none',
          }}
        >
          <P/>
        </Box>
      ))}

      {/* Snackbar */}
      <Snackbar
        open={snack.open} autoHideDuration={4000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snack.sev}
          onClose={() => setSnack(s => ({ ...s, open: false }))}
          sx={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '0.98rem' }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookLayout;
