import useReveal  from '../../hooks/useReveal';
import useCounter from '../../hooks/useCounter';
import { STATS, SKILLS, OWNER } from '../../constants/data';
import './About.css';

/* Tiny Reveal wrapper */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* Animated counter */
const Counter = ({ value, suffix, label }) => {
  const [display, ref] = useCounter(value, suffix);
  return (
    <div ref={ref}>
      <div className="about__stat-value">{display}</div>
      <div className="about__stat-label">{label}</div>
    </div>
  );
};

const About = () => (
  <section id="about" className="about">
    <Reveal><p className="section-label">About Me</p></Reveal>
    <Reveal delay={80}><h2 className="section-title">Who I Am</h2></Reveal>

    <div className="about__grid">
      <div className="about__text">
        <Reveal>
          <p>I'm <strong>{OWNER.name}</strong>, a full-stack developer from <strong>{OWNER.location}</strong> focused on building modern digital products. I specialise in <strong>React</strong> for web and <strong>React Native</strong> for mobile apps.</p>
        </Reveal>
        <Reveal delay={80}>
          <p>I love writing clean, maintainable code and turning ideas into working products. Available for freelance work and remote collaboration worldwide.</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="about__stats">
            {STATS.map((s) => <Counter key={s.label} {...s} />)}
          </div>
        </Reveal>
      </div>

      <div className="about__skills">
        {SKILLS.map((skill, i) => (
          <Reveal key={skill.name} delay={i * 50}>
            <div className="about__skill-card">
              <div className="about__skill-icon">{skill.icon}</div>
              <div className="about__skill-name">{skill.name}</div>
              <div className="about__skill-sub">{skill.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
