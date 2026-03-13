import useReveal from '../../hooks/useReveal';
import { SERVICES } from '../../constants/data';
import './Services.css';

const Reveal = ({ children, delay = 0 }) => {
  const ref = useReveal();
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const ServiceCard = ({ num, icon, title, desc, tags }) => (
  <div className="services__card">
    <p className="services__card-num">{num}</p>
    <div className="services__card-icon">{icon}</div>
    <h3 className="services__card-title">{title}</h3>
    <p className="services__card-desc">{desc}</p>
    <div className="services__card-tags">
      {tags.map((t) => <span key={t} className="services__tag">{t}</span>)}
    </div>
  </div>
);

const Services = () => (
  <section id="services" className="services">
    <Reveal><p className="section-label">Services</p></Reveal>
    <Reveal delay={80}><h2 className="section-title">What I Build</h2></Reveal>

    <div className="services__grid">
      {SERVICES.map((svc, i) => (
        <Reveal key={svc.num} delay={i * 100}>
          <ServiceCard {...svc} />
        </Reveal>
      ))}
    </div>
  </section>
);

export default Services;
