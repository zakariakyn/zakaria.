import { OWNER } from '../../constants/data';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text">
        © {year} <span className="footer__name">{OWNER.name}</span> — Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
