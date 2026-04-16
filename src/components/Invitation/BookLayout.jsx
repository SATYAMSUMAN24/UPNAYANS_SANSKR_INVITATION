import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Typography, Snackbar, Alert, IconButton, Tooltip,
  Box, Paper, CircularProgress,
} from '@mui/material';
import PrintIcon        from '@mui/icons-material/Print';
import DownloadIcon     from '@mui/icons-material/Download';
import ShareIcon        from '@mui/icons-material/Share';
import ChevronLeftIcon  from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
   useDraggable
   ════════════════════════════════════════════════════════════ */
function useDraggable(initial) {
  const [pos,      setPos]  = useState(initial);
  const [dragging, setDrag] = useState(false);
  const [ds,       setDs]   = useState({ mx:0, my:0, ox:0, oy:0 });
  const didDrag             = useRef(false);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    didDrag.current = false;
    setDs({ mx:e.clientX, my:e.clientY, ox:pos.x, oy:pos.y });
    setDrag(true);
  }, [pos]);

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    didDrag.current = false;
    setDs({ mx:t.clientX, my:t.clientY, ox:pos.x, oy:pos.y });
    setDrag(true);
  }, [pos]);

  useEffect(() => {
    if (!dragging) return;
    const mv = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = cx - ds.mx, dy = cy - ds.my;
      if (Math.abs(dx)>3||Math.abs(dy)>3) didDrag.current = true;
      setPos({ x:Math.max(0, ds.ox+dx), y:Math.max(0, ds.oy+dy) });
    };
    const up = () => setDrag(false);
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseup',   up);
    window.addEventListener('touchmove', mv, { passive:true });
    window.addEventListener('touchend',  up);
    return () => {
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseup',   up);
      window.removeEventListener('touchmove', mv);
      window.removeEventListener('touchend',  up);
    };
  }, [dragging, ds]);

  return { pos, dragging, didDrag, onMouseDown, onTouchStart };
}

/* ════════════════════════════════════════════════════════════
   BOOK LAYOUT
   ════════════════════════════════════════════════════════════ */
const BookLayout = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping,  setIsFlipping]  = useState(false);
  const [flipDir,     setFlipDir]     = useState('next');
  const [downloading, setDownloading] = useState(false);
  const [snack, setSnack]             = useState({ open:false, msg:'', sev:'success' });

  const printRef   = useRef(null);
  const dlPageRefs = useRef([]);

  /* ── PRINT ────────────────────────────────────────────── */
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Upanayan Sanskar Invitation — Arnav & Saswat Suman',
    onAfterPrint: () => setSnack({ open:true, msg:'Printed successfully! 🖨️', sev:'success' }),
  });

  /* ── DOWNLOAD — all 5 pages stitched into one PNG ──────── */
  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    setSnack({ open:true, msg:'Preparing booklet… please wait ⏳', sev:'info' });

    try {
      const canvases = [];
      for (let i = 0; i < dlPageRefs.current.length; i++) {
        const el = dlPageRefs.current[i];
        if (!el) continue;
        // reveal temporarily for html2canvas
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

      // Stitch all pages vertically
      const W = canvases[0].width;
      const H = canvases.reduce((s,c) => s + c.height, 0);
      const master = document.createElement('canvas');
      master.width = W; master.height = H;
      const ctx = master.getContext('2d');
      ctx.fillStyle = '#FFF8E7';
      ctx.fillRect(0,0,W,H);
      let y = 0;
      for (const c of canvases) { ctx.drawImage(c,0,y); y += c.height; }

      const link = document.createElement('a');
      link.download = 'upanayan-invitation-booklet.png';
      link.href = master.toDataURL('image/png');
      link.click();
      setSnack({ open:true, msg:'✅ Full booklet downloaded!', sev:'success' });
    } catch (err) {
      console.error('Download error:', err);
      setSnack({ open:true, msg:'Download failed. Please try again.', sev:'error' });
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  /* ── SHARE ────────────────────────────────────────────── */
  const handleShare = useCallback(async () => {
    const text = 'You are cordially invited to the Upanayan Sanskar of Arnav Suman & Saswat Suman — 21 April at Venu Belari, Samastipur, Bihar.';
    if (navigator.share) {
      try { await navigator.share({ title:'Upanayan Sanskar Invitation', text, url:window.location.href }); }
      catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setSnack({ open:true, msg:'Invitation text copied! 📋', sev:'info' });
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
      <Box className="bg-deco bg-deco-tl anim-rotate" sx={{ position:'fixed' }} aria-hidden="true">
        <MandalaSVG size={360}/>
      </Box>
      <Box className="bg-deco bg-deco-br anim-rotate-rev" sx={{ position:'fixed' }} aria-hidden="true">
        <MandalaSVG size={280}/>
      </Box>

      {/* ── Book Card ──────────────────────────────────── */}
      <Box sx={{
        position:'relative',
        transform: flipTransform,
        transition: isFlipping ? 'transform 0.5s cubic-bezier(0.645,0.045,0.355,1)' : 'none',
        transformOrigin: flipDir === 'next' ? 'left center' : 'right center',
        transformStyle: 'preserve-3d',
        borderRadius:'14px',
        boxShadow:'0 10px 44px rgba(61,26,0,0.2), 0 2px 8px rgba(197,137,64,0.14)',
      }}>
        <CurrentPage key={currentPage}/>

        {/* Nav arrows inside card — bottom overlay */}
        <Box sx={{
          position:'absolute', bottom:'14px', left:0, right:0,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          px:'14px', zIndex:30, pointerEvents:'none',
        }}>
          {/* PREV */}
          <Tooltip title={currentPage > 0 ? `← ${PAGE_LABELS[currentPage-1]}` : ''} placement="top">
            <span style={{ pointerEvents:'all' }}>
              <IconButton
                id="btn-prev-page"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0 || isFlipping}
                size="small" aria-label="Previous page"
                sx={{
                  width:36, height:36,
                  background:'rgba(255,248,231,0.92)',
                  border:'1.5px solid rgba(197,137,64,0.65)',
                  color:'#8B0000', backdropFilter:'blur(8px)',
                  boxShadow:'0 2px 10px rgba(197,137,64,0.22)',
                  '&:hover:not(:disabled)':{ background:'linear-gradient(135deg,#E6B325,#C58940)', color:'#FFF8E7', transform:'scale(1.12)' },
                  '&:disabled':{ opacity:0.2 },
                  transition:'all 0.22s ease',
                }}
              >
                <ChevronLeftIcon sx={{ fontSize:'1.1rem' }}/>
              </IconButton>
            </span>
          </Tooltip>

          {/* Page label */}
          <Paper elevation={0} sx={{
            px:2, py:0.4,
            background:'rgba(255,248,231,0.9)',
            border:'1px solid rgba(197,137,64,0.4)',
            borderRadius:'50px', backdropFilter:'blur(10px)',
            pointerEvents:'none',
          }}>
            <Typography sx={{
              fontFamily:'"Cormorant Garamond",serif',
              fontSize:'clamp(0.68rem,1.1vw,0.82rem)',
              fontWeight:600, color:'#6B3A2A', letterSpacing:'0.04em',
            }}>
              {currentPage+1} / {PAGES.length} — {PAGE_LABELS[currentPage]}
            </Typography>
          </Paper>

          {/* NEXT */}
          <Tooltip title={currentPage < PAGES.length-1 ? `${PAGE_LABELS[currentPage+1]} →` : ''} placement="top">
            <span style={{ pointerEvents:'all' }}>
              <IconButton
                id="btn-next-page"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === PAGES.length - 1 || isFlipping}
                size="small" aria-label="Next page"
                sx={{
                  width:36, height:36,
                  background:'rgba(255,248,231,0.92)',
                  border:'1.5px solid rgba(197,137,64,0.65)',
                  color:'#8B0000', backdropFilter:'blur(8px)',
                  boxShadow:'0 2px 10px rgba(197,137,64,0.22)',
                  '&:hover:not(:disabled)':{ background:'linear-gradient(135deg,#E6B325,#C58940)', color:'#FFF8E7', transform:'scale(1.12)' },
                  '&:disabled':{ opacity:0.2 },
                  transition:'all 0.22s ease',
                }}
              >
                <ChevronRightIcon sx={{ fontSize:'1.1rem' }}/>
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Hidden print target */}
      <Box ref={printRef} sx={{ display:'none' }} aria-hidden="true">
        {PAGES.map((P,i) => (
          <Box key={i} sx={{ pageBreakAfter:'always', width:'794px' }}>
            <P/>
          </Box>
        ))}
      </Box>

      {/* Off-screen download pages — always rendered, visibility:hidden */}
      {PAGES.map((P,i) => (
        <Box
          key={`dl-${i}`}
          ref={el => dlPageRefs.current[i] = el}
          aria-hidden="true"
          sx={{
            position:'fixed', left:'-9999px', top:0,
            width:'794px', visibility:'hidden', zIndex:-1, pointerEvents:'none',
          }}
        >
          <P/>
        </Box>
      ))}

      {/* Snackbar */}
      <Snackbar
        open={snack.open} autoHideDuration={4000}
        onClose={() => setSnack(s => ({ ...s, open:false }))}
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
      >
        <Alert severity={snack.sev} onClose={() => setSnack(s => ({ ...s, open:false }))}
          sx={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'0.98rem' }}>
          {snack.msg}
        </Alert>
      </Snackbar>

      {/* Saswat Chatbot — only floating element */}
      <SaswatChatbot
        onPrint={handlePrint}
        onDownload={handleDownload}
        onShare={handleShare}
        downloading={downloading}
      />
    </Box>
  );
};

/* ════════════════════════════════════════════════════════════
   SASWAT CHATBOT — draggable, fixed bottom-right
   Print / Download / Share buttons in header are FULLY FUNCTIONAL
   ════════════════════════════════════════════════════════════ */
const INIT_MSG = {
  id:'w',
  text:'Jai Shri Ganesha! 🙏\nI am Saswat — your invitation assistant.\n\nUse the icons above to 🖨️ Print, 📥 Download or 📤 Share!',
};

const SaswatChatbot = ({ onPrint, onDownload, onShare, downloading }) => {
  const { pos, dragging, didDrag, onMouseDown, onTouchStart } = useDraggable({ x:28, y:28 });
  const [open, setOpen]   = useState(false);
  const [msgs, setMsgs]   = useState([INIT_MSG]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, open]);

  const toggle = useCallback(() => { if (!didDrag.current) setOpen(o => !o); }, [didDrag]);
  const push   = (text, isUser=false) => setMsgs(m => [...m, { id:Date.now()+Math.random(), text, isUser }]);

  const send = useCallback(() => {
    const q = input.trim(); if (!q) return;
    push(q, true); setInput('');
    const ql = q.toLowerCase();
    setTimeout(() => {
      if      (ql.includes('print'))                           { push('Printing all 5 pages now! 🖨️'); onPrint?.(); }
      else if (ql.includes('download')||ql.includes('save'))   { push('Preparing your booklet download… 📥'); onDownload?.(); }
      else if (ql.includes('share'))                           { push('Sharing the invitation! 📤'); onShare?.(); }
      else if (ql.includes('venue')||ql.includes('kahan'))     { push('📍 Venue:\nVenu Belari, In front of Kali Durga Mandir,\nPS Ujiyarpur, Dist Samastipur — 848132, Bihar'); }
      else if (ql.includes('date')||ql.includes('kab'))        { push('📅 Schedule:\n• 17 Apr — Marwa & Dinguni\n• 20 Apr — Kumram\n• 21 Apr — Upanayan Sanskar (Main)'); }
      else if (ql.includes('arnav')||ql.includes('saswat'))    { push('Arnav & Saswat Suman are the Batuk —\nsons of Shekhar Suman & Sweety Kumari. 🙏'); }
      else if (ql.includes('page')||ql.includes('flip'))       { push('📖 Use ◀ ▶ arrows at the bottom of the card to flip pages!'); }
      else if (ql.includes('namaste')||ql.includes('hello')||ql.includes('hi')) { push('Jai Shri Ganesha! 🙏 Namaste!'); }
      else { push('I can help with:\n🖨️ Print · 📥 Download · 📤 Share\n📅 Dates · 📍 Venue · 📖 Navigation\nJust ask!'); }
    }, 360);
  }, [input, onPrint, onDownload, onShare]);

  return (
    <Box sx={{ position:'fixed', bottom:`${pos.y}px`, right:`${pos.x}px`, zIndex:9000, userSelect:'none' }}>

      {/* ── Chat panel ──────────────────────────────────── */}
      {open && (
        <Paper elevation={12} sx={{
          position:'absolute', bottom:'68px', right:0,
          width:{ xs:'280px', sm:'330px' },
          borderRadius:'18px', overflow:'hidden',
          border:'1.5px solid rgba(197,137,64,0.42)',
          boxShadow:'0 20px 60px rgba(61,26,0,0.28)',
          animation:'fadeInUp 0.24s ease-out both',
        }}>

          {/* Header */}
          <Box sx={{
            background:'linear-gradient(135deg,#8B0000 0%,#A52020 60%,#B22222 100%)',
            px:2, py:1.4, display:'flex', alignItems:'center', gap:1.4,
          }}>
            {/* Avatar */}
            <Box sx={{
              width:36, height:36, borderRadius:'50%', flexShrink:0,
              background:'linear-gradient(135deg,#E6B325,#C58940)',
              display:'grid', placeItems:'center',
              fontFamily:'"Playfair Display",serif', fontSize:'1.05rem', fontWeight:700, color:'#3D1A00',
              boxShadow:'0 2px 8px rgba(0,0,0,0.3)',
            }}>स</Box>

            {/* Title */}
            <Box sx={{ flex:1 }}>
              <Typography sx={{ color:'#FFF8E7', fontFamily:'"Playfair Display",serif', fontSize:'0.92rem', fontWeight:700, lineHeight:1.2 }}>
                Saswat
              </Typography>
              <Typography sx={{ color:'rgba(255,248,231,0.6)', fontFamily:'"Roboto",sans-serif', fontSize:'0.56rem', letterSpacing:'0.1em' }}>
                Invitation Assistant · Online
              </Typography>
            </Box>

            {/* ── ACTION BUTTONS ── Print / Download / Share */}
            <Box sx={{ display:'flex', gap:0.5, alignItems:'center' }}>
              <Tooltip title="Print (A4)" placement="top">
                <IconButton
                  id="chat-print-btn"
                  size="small"
                  onClick={onPrint}
                  aria-label="Print invitation"
                  sx={{
                    color:'#FFF8E7',
                    background:'rgba(255,255,255,0.1)',
                    border:'1px solid rgba(255,248,231,0.2)',
                    width:32, height:32,
                    '&:hover':{ background:'rgba(230,179,37,0.28)', color:'#E6B325', transform:'scale(1.1)' },
                    transition:'all 0.2s',
                  }}
                >
                  <PrintIcon sx={{ fontSize:'1rem' }}/>
                </IconButton>
              </Tooltip>

              <Tooltip title={downloading ? 'Preparing…' : 'Download Booklet'} placement="top">
                <span>
                  <IconButton
                    id="chat-download-btn"
                    size="small"
                    onClick={onDownload}
                    disabled={downloading}
                    aria-label="Download full booklet"
                    sx={{
                      color:'#FFF8E7',
                      background:'rgba(255,255,255,0.1)',
                      border:'1px solid rgba(255,248,231,0.2)',
                      width:32, height:32,
                      '&:hover':{ background:'rgba(230,179,37,0.28)', color:'#E6B325', transform:'scale(1.1)' },
                      '&:disabled':{ opacity:0.5 },
                      transition:'all 0.2s',
                    }}
                  >
                    {downloading
                      ? <CircularProgress size={14} sx={{ color:'#E6B325' }}/>
                      : <DownloadIcon sx={{ fontSize:'1rem' }}/>
                    }
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Share Invite" placement="top">
                <IconButton
                  id="chat-share-btn"
                  size="small"
                  onClick={onShare}
                  aria-label="Share invitation"
                  sx={{
                    color:'#FFF8E7',
                    background:'rgba(255,255,255,0.1)',
                    border:'1px solid rgba(255,248,231,0.2)',
                    width:32, height:32,
                    '&:hover':{ background:'rgba(230,179,37,0.28)', color:'#E6B325', transform:'scale(1.1)' },
                    transition:'all 0.2s',
                  }}
                >
                  <ShareIcon sx={{ fontSize:'1rem' }}/>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Divider */}
          <Box sx={{ height:'2px', background:'linear-gradient(90deg,#8B0000,#E6B325,#C58940,#E6B325,#8B0000)' }}/>

          {/* Messages */}
          <Box ref={bodyRef} sx={{
            background:'linear-gradient(180deg,#FFFDF8 0%,#FFF8E7 100%)',
            height:'220px', overflowY:'auto', px:1.8, py:1.2,
            display:'flex', flexDirection:'column', gap:0.9,
            '&::-webkit-scrollbar':{ width:'3px' },
            '&::-webkit-scrollbar-thumb':{ background:'rgba(197,137,64,0.28)', borderRadius:'3px' },
          }}>
            {msgs.map(m => (
              <Box key={m.id} sx={{ display:'flex', justifyContent:m.isUser?'flex-end':'flex-start' }}>
                <Box sx={{
                  maxWidth:'84%', px:1.4, py:0.9,
                  borderRadius:m.isUser?'14px 14px 4px 14px':'14px 14px 14px 4px',
                  background:m.isUser
                    ?'linear-gradient(135deg,#8B0000,#B22222)'
                    :'linear-gradient(135deg,rgba(255,253,245,0.98),rgba(255,248,231,0.95))',
                  border:m.isUser?'none':'1px solid rgba(197,137,64,0.25)',
                  boxShadow:'0 1px 4px rgba(0,0,0,0.06)',
                }}>
                  <Typography sx={{
                    fontFamily:'"Cormorant Garamond",serif',
                    fontSize:'0.87rem', lineHeight:1.65,
                    color:m.isUser?'#FFF8E7':'#3D1A00',
                    whiteSpace:'pre-line',
                  }}>
                    {m.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Quick chips */}
          <Box sx={{
            px:1.4, py:0.8,
            background:'rgba(255,248,231,0.75)',
            borderTop:'1px solid rgba(197,137,64,0.15)',
            display:'flex', gap:0.7, flexWrap:'wrap',
          }}>
            {[['📅 Dates','date'],['📍 Venue','venue'],['📖 Pages','page']].map(([lbl,q]) => (
              <Box key={q} component="button"
                onClick={() => { setInput(q); setTimeout(send, 80); }}
                sx={{
                  px:1.2, py:0.35,
                  background:'rgba(255,253,245,0.92)',
                  border:'1px solid rgba(197,137,64,0.36)',
                  borderRadius:'50px',
                  fontFamily:'"Cormorant Garamond",serif',
                  fontSize:'0.74rem', color:'#6B3A2A',
                  cursor:'pointer',
                  '&:hover':{ background:'rgba(230,179,37,0.14)', borderColor:'#C58940' },
                  transition:'all 0.18s',
                }}
              >{lbl}</Box>
            ))}
          </Box>

          {/* Input row */}
          <Box sx={{
            display:'flex', gap:0.8, px:1.4, py:1,
            borderTop:'1px solid rgba(197,137,64,0.2)',
            background:'rgba(255,253,245,0.97)',
          }}>
            <Box
              component="input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && send()}
              placeholder="Ask me… 🙏"
              sx={{
                flex:1, border:'1px solid rgba(197,137,64,0.35)', borderRadius:'8px',
                px:1.3, py:0.7,
                fontFamily:'"Cormorant Garamond",serif', fontSize:'0.87rem', color:'#3D1A00',
                background:'#FFFDF8', outline:'none',
                '&:focus':{ borderColor:'#C58940', boxShadow:'0 0 0 2px rgba(197,137,64,0.12)' },
              }}
            />
            <IconButton onClick={send} size="small" id="chatbot-send-btn"
              sx={{
                background:'linear-gradient(135deg,#8B0000,#B22222)',
                color:'#FFF8E7', borderRadius:'8px', px:1.3,
                '&:hover':{ background:'linear-gradient(135deg,#C58940,#E6B325)', color:'#3D1A00' },
              }}
            >
              <ShareIcon sx={{ fontSize:'0.9rem', transform:'rotate(-45deg)' }}/>
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* ── FAB ──────────────────────────────────────────── */}
      <Box
        id="saswat-chatbot-fab"
        role="button" aria-label="Saswat Chatbot" tabIndex={0}
        onMouseDown={onMouseDown} onTouchStart={onTouchStart} onClick={toggle}
        sx={{
          width:58, height:58, borderRadius:'50%',
          background:open?'linear-gradient(135deg,#3D1A00,#6B3A2A)':'linear-gradient(135deg,#8B0000,#B22222)',
          boxShadow:open
            ?'0 4px 20px rgba(61,26,0,0.4)'
            :'0 4px 24px rgba(139,0,0,0.5), 0 0 0 5px rgba(230,179,37,0.2)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          cursor:dragging?'grabbing':'grab', userSelect:'none',
          transition:'background 0.3s, box-shadow 0.3s',
          animation:open?'none':'glowPulse 3s ease-in-out infinite',
        }}
      >
        <Typography sx={{
          fontFamily:'"Tiro Devanagari Sanskrit",serif',
          fontSize:'1.5rem', color:'#FFF8E7', lineHeight:1, fontWeight:700,
        }}>
          {open ? '✕' : 'स'}
        </Typography>
        {!open && (
          <Typography sx={{
            fontFamily:'"Roboto",sans-serif', fontSize:'0.43rem',
            color:'rgba(255,248,231,0.8)', letterSpacing:'0.06em', mt:'1px',
          }}>SASWAT</Typography>
        )}
      </Box>

      {/* Pulse ring */}
      {!open && (
        <Box sx={{
          position:'absolute', inset:-7, borderRadius:'50%',
          border:'2px solid rgba(139,0,0,0.22)',
          animation:'glowPulse 2.5s ease-in-out infinite',
          pointerEvents:'none',
        }}/>
      )}
    </Box>
  );
};

export default BookLayout;
