import { LinkedInIcon, WhatsAppIcon, EmailIcon, GitHubIcon, ArrowRightIcon } from '../../assets/icons';
import { OWNER } from '../../constants/data';
import './Hero.css';

const Hero = ({ onScrollTo }) => {
  const socials = [
    { href: OWNER.linkedinLink, icon: <LinkedInIcon />, label: 'LinkedIn'  },
    { href: OWNER.whatsappLink, icon: <WhatsAppIcon />, label: 'WhatsApp'  },
    { href: `mailto:${OWNER.email}`, icon: <EmailIcon />, label: 'Email'   },
    { href: OWNER.githubLink,   icon: <GitHubIcon />,   label: 'GitHub'    },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero__badge">
        <span className="hero__badge-dot" />
        {OWNER.available ? 'Open to new projects' : 'Currently unavailable'}
      </div>

      <h1 className="hero__title">
        {OWNER.title.split('&')[0].trim()}<br />
        <span>&amp; {OWNER.title.split('&')[1]?.trim()}</span>
      </h1>

      <p className="hero__desc">{OWNER.tagline}</p>

      <div className="hero__ctas">
        <button className="btn btn-blue" onClick={() => onScrollTo('services')}>
          See Services <ArrowRightIcon />
        </button>
        <button className="btn btn-outline" onClick={() => onScrollTo('contact')}>
          Contact Me
        </button>
      </div>

      <div className="hero__socials">
        {socials.map(({ href, icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="hero__social-btn" title={label}>
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
