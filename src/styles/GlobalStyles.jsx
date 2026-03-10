export function GlobalStyles() {
  return (
    <style>{`
      :root {
        --primary: #991b1b;
        --primary-light: #b91c1c;
        --primary-dark: #7f1d1d;
        --primary-foreground: #ffffff;
        
        --secondary: #7678ed;
        --secondary-light: #9496f0;
        --secondary-dark: #5a5cb8;
        --secondary-foreground: #ffffff;
        
        --accent-1: #f7b801;
        --accent-2: #f18701;
        --accent-3: #f35b04;
        
        --navbar-bg: #fff8eb;
        --section-bg: #fbf2f3;
        --text: #1e293b;
        --text-muted: rgba(30, 41, 59, 0.65);
        --border: rgba(30, 41, 59, 0.1);
        
        --hero-from: #220000;
        --hero-to: #974039;

        --caption: #9ca3af;
        --shadow-soft: rgba(30, 41, 59, 0.06);
        --shadow-card: rgba(30, 41, 59, 0.08);

        --bg-1: var(--navbar-bg);
        --bg-2: var(--section-bg);
        --text-1: var(--text);
        --text-2: var(--text-muted);

        --glass-bg: rgba(255, 248, 235, 0.85);
        --blur: blur(16px);

        /* ── Typography scale (mirrors index.css) ──────────────────────────
           Fraunces = display / headings  (optical, warm, characterful serif)
           DM Sans  = body / UI copy      (geometric, clean, legible)

           The clamp() values produce fluid type that scales between
           the min (mobile) and max (desktop) values automatically.
           No media queries needed for font sizing.
        ──────────────────────────────────────────────────────────────────── */
        --fs-display: clamp(2.5rem,  5.5vw, 4.5rem);    /* 40 → 72px  hero     */
        --fs-h1:      clamp(2rem,    4.5vw, 3.25rem);   /* 32 → 52px  page h1  */
        --fs-h2:      clamp(1.75rem, 3.5vw, 2.5rem);    /* 28 → 40px  section  */
        --fs-h3:      clamp(1.25rem, 2.2vw, 1.625rem);  /* 20 → 26px  card     */
        --fs-h4:      clamp(1rem,    1.5vw, 1.125rem);  /* 16 → 18px  sub      */
        --fs-body-lg: clamp(1rem,    1.5vw, 1.125rem);  /* 16 → 18px  lead     */
        --fs-body:    clamp(0.9375rem, 1.2vw, 1rem);    /* 15 → 16px  standard */
        --fs-body-sm: clamp(0.8125rem, 1vw, 0.875rem);  /* 13 → 14px  caption  */
        --fs-label:   0.75rem;                           /* 12px fixed badge    */

        --lh-display: 1.07;
        --lh-heading: 1.22;
        --lh-body:    1.68;

        --ls-display: -0.02em;
        --ls-heading: -0.01em;
        --ls-label:    0.12em;
      }

      /* ── Font faces ───────────────────────────────────────────────────── */
      body {
        margin: 0;
        font-family: 'DM Sans', sans-serif;
        font-size: var(--fs-body);
        background: var(--bg-1);
        color: var(--text-1);
        overflow-x: hidden;
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: var(--lh-body);
      }

      /* Fraunces for all headings — optical sizing gives it personality */
      h1, h2, h3, h4, h5, h6, .fraunces {
        font-family: 'Fraunces', serif;
        font-optical-sizing: auto;
        letter-spacing: var(--ls-heading);
        line-height: var(--lh-heading);
      }

      /* Hero display — the biggest, most impactful text on the page */
      .hero-headline {
        font-family: 'Fraunces', serif;
        font-optical-sizing: auto;
        font-size: var(--fs-display);
        font-weight: 800;
        line-height: var(--lh-display);
        letter-spacing: var(--ls-display);
      }

      /* Section headline — used in HowItWorks, MeetSeniors, etc. */
      .section-headline {
        font-family: 'Fraunces', serif;
        font-optical-sizing: auto;
        font-size: var(--fs-h2);
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: var(--ls-heading);
      }

      /* Card headline */
      .card-headline {
        font-family: 'Fraunces', serif;
        font-optical-sizing: auto;
        font-size: var(--fs-h3);
        font-weight: 700;
        line-height: 1.3;
      }

      /* Body lead — for hero subtext, section intros */
      .body-lead {
        font-family: 'DM Sans', sans-serif;
        font-size: var(--fs-body-lg);
        font-weight: 400;
        line-height: var(--lh-body);
        color: var(--text-2);
      }

      /* Standard body copy */
      .body-copy {
        font-family: 'DM Sans', sans-serif;
        font-size: var(--fs-body);
        font-weight: 400;
        line-height: var(--lh-body);
        color: var(--text-2);
      }

      /* Caption / meta text */
      .body-caption {
        font-family: 'DM Sans', sans-serif;
        font-size: var(--fs-body-sm);
        font-weight: 400;
        line-height: 1.5;
        color: var(--caption);
      }

      /* ── Gradient text for accent lines ──────────────────────────────── */
      .gradient-text {
        background: linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }

      /* Warm rust accent — used for "Get Honest Answers." line */
      .text-rust {
        color: var(--hero-to);
      }

      /* ── Glass panel ─────────────────────────────────────────────────── */
      .glass-panel {
        background: var(--glass-bg);
        backdrop-filter: var(--blur);
        -webkit-backdrop-filter: var(--blur);
        border: 1px solid var(--border);
        box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
      }

      /* ── Buttons ─────────────────────────────────────────────────────── */
      .btn-primary {
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
        color: white;
        border: none;
        border-radius: 999px;
        font-family: 'DM Sans', sans-serif;
        font-size: var(--fs-body);
        font-weight: 600;
        letter-spacing: 0.01em;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 20px -4px rgba(153, 27, 27, 0.35);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }
      .btn-primary:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 14px 30px -4px rgba(153, 27, 27, 0.45);
      }

      /* ── Section label / eyebrow pill ───────────────────────────────── */
      .section-label {
        font-family: 'DM Sans', sans-serif;
        font-size: var(--fs-label);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: var(--ls-label);
        color: var(--primary);
        background: rgba(153, 27, 27, 0.08);
        border: 1px solid rgba(153, 27, 27, 0.12);
        padding: 6px 16px;
        border-radius: 20px;
        display: inline-block;
        margin-bottom: 16px;
      }

      /* ── Layout helpers ──────────────────────────────────────────────── */
      .section-padding { padding: clamp(40px, 6vw, 60px) 5%; position: relative; }

      .blob-bg {
        position: absolute;
        filter: blur(80px);
        z-index: 0;
        opacity: 0.5;
        border-radius: 50%;
        animation: float-blob 10s infinite alternate ease-in-out;
      }

      @keyframes float-blob {
        from { transform: translate(0, 0) scale(1); }
        to { transform: translate(30px, -40px) scale(1.1); }
      }

      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { scrollbar-width: none; }

      .gradient-divider {
        height: clamp(30px, 4vw, 50px);
        background: linear-gradient(to bottom, var(--bg-1) 0%, var(--bg-2) 100%);
      }
      .gradient-divider-alt {
        height: clamp(30px, 4vw, 50px);
        background: linear-gradient(to bottom, var(--bg-2) 0%, var(--bg-1) 100%);
      }

      /* ── Shimmer effect ──────────────────────────────────────────────── */
      .shimmer {
        position: relative;
        overflow: hidden;
      }
      .shimmer::after {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.25), rgba(255,255,255,0));
        transform: rotate(30deg) translateY(-100%);
        animation: shimmer-effect 3s infinite linear;
        pointer-events: none;
      }
      @keyframes shimmer-effect {
        0%   { transform: rotate(30deg) translateY(-100%); }
        100% { transform: rotate(30deg) translateY(100%); }
      }
    `}</style>
  );
}