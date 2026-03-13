import { useState } from 'react';
import useReveal from '../../hooks/useReveal';
import { LinkedInIcon, WhatsAppIcon, EmailIcon, ArrowRightIcon } from '../../assets/icons';
import { OWNER } from '../../constants/data';
import './Contact.css';

const Reveal = ({ children, delay = 0 }) => {
  const ref = useReveal();
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const CONTACT_ITEMS = [
  { icon: <EmailIcon />,    label: 'Email',    value: OWNER.email,    href: `mailto:${OWNER.email}` },
  { icon: <WhatsAppIcon />, label: 'WhatsApp', value: OWNER.whatsapp, href: OWNER.whatsappLink },
  { icon: <LinkedInIcon />, label: 'LinkedIn', value: OWNER.linkedin, href: OWNER.linkedinLink },

];

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <div className="contact__form-row">
        <Reveal delay={0}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" value={form.name} onChange={handleChange('name')} placeholder="Your name" required />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={handleChange('email')} placeholder="your@email.com" required />
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input id="subject" value={form.subject} onChange={handleChange('subject')} placeholder="What's this about?" required />
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" value={form.message} onChange={handleChange('message')} placeholder="Tell me about your project…" required />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <button
          type="submit"
          className={`btn btn-blue contact__submit${sent ? ' sent' : ''}`}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          {sent ? 'Message Sent ✓' : <><span>Send Message</span><ArrowRightIcon /></>}
        </button>
      </Reveal>
    </form>
  );
};

const Contact = () => (
  <section id="contact" className="contact">
    <Reveal><p className="section-label">Contact</p></Reveal>
    <Reveal delay={80}><h2 className="section-title">Let's Work Together</h2></Reveal>

    <div className="contact__grid">
      <div>
        <Reveal><p className="contact__info-label">Reach me on</p></Reveal>
        {CONTACT_ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 70}>
            <div className="contact__item">
              <div className="contact__item-icon">{item.icon}</div>
              <div>
                <div className="contact__item-label">{item.label}</div>
                {item.href
                  ? <a href={item.href} target="_blank" rel="noreferrer" className="contact__item-value">{item.value}</a>
                  : <span className="contact__item-value">{item.value}</span>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <ContactForm />
    </div>
  </section>
);

export default Contact;
