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
        --text-muted: rgba(30, 41, 59, 0.7);
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
      }

      body {
        margin: 0;
        font-family: 'DM Sans', sans-serif;
        background: var(--bg-1);
        color: var(--text-1);
        overflow-x: hidden;
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      h1, h2, h3, .playfair {
        font-family: 'Playfair Display', serif;
      }

      /* Premium typography */
      h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); letter-spacing: -0.03em; line-height: 1.1; font-weight: 800; }
      h2 { font-size: clamp(2rem, 4vw, 3.5rem); letter-spacing: -0.02em; line-height: 1.2; font-weight: 700; }
      
      .gradient-text {
        background: linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }

      .glass-panel {
        background: var(--glass-bg);
        backdrop-filter: var(--blur);
        -webkit-backdrop-filter: var(--blur);
        border: 1px solid var(--border);
        box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
      }

      .btn-primary {
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
        color: white;
        border: none;
        border-radius: 999px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.4);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }
      .btn-primary:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 15px 35px -5px rgba(220, 38, 38, 0.5);
      }

      .section-label {
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: var(--primary);
        font-weight: 700;
        margin-bottom: 16px;
        display: inline-block;
        background: rgba(153, 27, 27, 0.1);
        padding: 6px 16px;
        border-radius: 20px;
      }

      .section-padding { padding: 100px 5%; position: relative; }
      
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
        height: 100px;
        background: linear-gradient(to bottom, var(--bg-1) 0%, var(--bg-2) 100%);
      }
      .gradient-divider-alt {
        height: 100px;
        background: linear-gradient(to bottom, var(--bg-2) 0%, var(--bg-1) 100%);
      }
      
      .shimmer {
        position: relative;
        overflow: hidden;
      }
      .shimmer::after {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0));
        transform: rotate(30deg) translateY(-100%);
        animation: shimmer-effect 3s infinite linear;
        pointer-events: none;
      }
      @keyframes shimmer-effect {
        0% { transform: rotate(30deg) translateY(-100%); }
        100% { transform: rotate(30deg) translateY(100%); }
      }
    `}</style>
  );
}
