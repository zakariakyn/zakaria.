import { useState, useEffect } from 'react';
import useActiveSection from '../../hooks/useActiveSection';
import './Navbar.css';

const NAV_ITEMS = ['home', 'about', 'services', 'contact'];

const Navbar = () => {
  const active            = useActiveSection(NAV_ITEMS);
  const [open, setOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Close drawer on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Track scroll for shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Prevent body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const label = (id) => id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <button className="navbar__logo" onClick={() => scrollTo('home')}>
          Zakaria<span>.</span>
        </button>

        {/* Desktop nav */}
        <ul className="navbar__links">
          {NAV_ITEMS.map((id) => (
            <li key={id}>
              <span
                className={`navbar__link${active === id ? ' navbar__link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label(id)}
              </span>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className={`navbar__toggle${open ? ' open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer — outside nav so it slides below it */}
      <div className={`navbar__drawer${open ? ' open' : ''}`}>
        {NAV_ITEMS.map((id) => (
          <span
            key={id}
            className={`navbar__link${active === id ? ' navbar__link--active' : ''}`}
            onClick={() => scrollTo(id)}
          >
            {label(id)}
          </span>
        ))}
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 98,
            background: 'rgba(0,0,0,0.15)',
          }}
        />
      )}
    </>
  );
};

export default Navbar;
