export function Footer() {
  return (
    <footer style={{ background: 'var(--text-1)', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'white', padding: '32px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="playfair" style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.02em' }}>NIAT</span>
        <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', marginLeft: '10px', fontSize: '15px' }}>Senior Connect</span>
      </div>

      <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>Privacy</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>Terms</a>
      </div>

      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
        © 2024 NIAT. All rights reserved.
      </div>
    </footer>
  );
}
