import { useEffect, useState } from 'react';
import logoImage from '../assets/images/logo.PNG';
import heroImage from '../assets/images/hero_ngo_bg.PNG';
import communityImage from '../assets/images/about_dgf_community.jpg';
import foodImage from '../assets/images/media_food_outreach.jpg';
import medicalImage from '../assets/images/media_medical_care.jpg';

const phone = '09166829138';
const whatsappNumber = '2349166829138';
const images = {
  'logo.PNG': logoImage,
  'hero_ngo_bg.PNG': heroImage,
  'about_dgf_community.jpg': communityImage,
  'media_food_outreach.jpg': foodImage,
  'media_medical_care.jpg': medicalImage,
};
const image = (name) => images[name];

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About DGF' },
  { href: '/join', label: 'Join Us' },
  { href: '/media', label: 'Media & Gallery' },
];

const mediaItems = [
  { type: 'photo', category: 'food', image: 'media_food_outreach.jpg', tag: 'Food Drive • Photo', title: 'Gowon Estate Community Food Relief Drive', description: 'Distribution of staple food items and relief packs to vulnerable families in Gowon Estate, Lagos.' },
  { type: 'photo', category: 'medical', image: 'media_medical_care.jpg', tag: 'Medical Outreach • Photo', title: 'Free Community Health & Medical Outreach', description: 'Volunteers and health professionals providing free checkups, medication, and care for community elders.' },
  { type: 'photo', category: 'all', image: 'about_dgf_community.jpg', tag: 'Community Action • Photo', title: 'Neighborhood Empowerment & Unity Drive', description: 'Connecting with local leaders, youth, and families to foster togetherness and support in 2024.' },
  { type: 'photo', category: 'food', image: 'hero_ngo_bg.PNG', tag: 'Relief Outreach • Photo', title: 'Grassroots Relief Distribution', description: 'Direct outreach bringing aid, smiles, and supplies to children and mothers across Lagos Nigeria.' },
];

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

function Link({ href, children, className = '', ...props }) {
  const handleClick = (event) => {
    if (href.startsWith('/') && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      navigate(href);
    }
  };
  return <a href={href} className={className} onClick={handleClick} {...props}>{children}</a>;
}

function Icon({ name, brand = false }) {
  return <i className={`${brand ? 'fab' : 'fas'} fa-${name}`} aria-hidden="true" />;
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timer);
  }, [onClose]);
  return <div className="toast-container"><div className="toast"><Icon name="info-circle" /><div>{message}</div></div></div>;
}

function DonationModal({ onClose, onToast }) {
  const accountNumber = '1535512303';
  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      onToast('Account number copied to your clipboard.');
    } catch {
      onToast(`Copy unavailable. Account number: ${accountNumber}`);
    }
  };

  return <div className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-title" onClick={onClose}>
    <div className="donation-dialog" onClick={(event) => event.stopPropagation()}>
      <button className="donation-close" onClick={onClose} aria-label="Close donation details">&times;</button>
      <div className="donation-icon"><Icon name="heart" /></div>
      <span className="section-subtitle">Support DGF</span>
      <h2 id="donation-title">Send Your Donation</h2>
      <p>Your generosity helps us provide food relief, healthcare, and community support across Nigeria.</p>
      <div className="account-details">
        <div><span>Bank</span><strong>Access Bank</strong></div>
        <div><span>Account Name</span><strong>Dreyson Global</strong></div>
        <div className="account-number-row"><div><span>Account Number</span><strong>{accountNumber}</strong></div><button className="copy-account" onClick={copyAccountNumber}><Icon name="copy" /> Copy</button></div>
      </div>
      <button className="btn btn-outline donation-close-action" onClick={onClose}>Done</button>
    </div>
  </div>;
}

function Header({ activePath, onDonate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="nav-container">
        <Link href="/" className="brand-logo"><img className="brand-logo-image" src={image('logo.PNG')} alt="Dreyson Global Foundation" /></Link>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {navItems.map((item) => <li key={item.href}><Link href={item.href} className={`nav-link ${activePath === item.href ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{item.label}</Link></li>)}
        </ul>
        <div className="nav-actions">
          <button className="btn btn-accent btn-donate" onClick={onDonate}><Icon name="heart" /> Donate Now</button>
          <button className="mobile-toggle" aria-label="Toggle Navigation Menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'times' : 'bars'} /></button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onDonate }) {
  return <>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand"><Link href="/" className="brand-logo" style={{ marginBottom: 16 }}><img className="brand-logo-image" src={image('logo.PNG')} alt="Dreyson Global Foundation" /></Link><p className="footer-desc">Founded in 2024 to ease the sufferings of Nigerians through grassroots humanitarian relief, healthcare support, and community empowerment.</p></div>
        <div><h4 className="footer-title">Quick Links</h4><ul className="footer-links">{navItems.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></div>
        <div><h4 className="footer-title">Get Involved</h4><ul className="footer-links"><li><Link href="/join">Volunteer for Field Work</Link></li><li><Link href="/join">Donate Items & Relief Packs</Link></li><li><button className="footer-action" onClick={onDonate}>Make a Financial Donation</button></li></ul></div>
        <div><h4 className="footer-title">Contact & Location</h4><div className="footer-contact-item"><Icon name="map-marker-alt" /><span>CM building, 3rd avenue, Gowon Estate, Lagos, Nigeria</span></div><div className="footer-contact-item"><Icon name="phone-alt" /><a href={`tel:${phone}`}>{phone}</a></div><div className="footer-contact-item"><Icon name="whatsapp" brand /><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp: {phone}</a></div></div>
      </div>
      <div className="footer-bottom"><p>&copy; 2024 - 2026 Dreyson Global Foundation (DGF). All Rights Reserved.</p><p>CM Building, Gowon Estate, Lagos, Nigeria.</p></div>
    </footer>
    <div className="floating-actions"><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="float-btn float-whatsapp" aria-label="WhatsApp Us"><Icon name="whatsapp" brand /><span className="float-tooltip">WhatsApp: {phone}</span></a><a href={`tel:${phone}`} className="float-btn float-call" aria-label="Call Us"><Icon name="phone-alt" /><span className="float-tooltip">Call: {phone}</span></a></div>
  </>;
}

function PageBanner({ badge, title, description, background }) {
  return <section className="hero page-banner" style={{ backgroundImage: `linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(9, 30, 23, 0.95)), url('${image(background)}')` }}><div className="hero-container"><div className="hero-badge"><Icon name={badge.icon} /> {badge.text}</div><h1 className="hero-title">{title}</h1><p className="hero-subtitle">{description}</p></div></section>;
}

function Home({ onDonate }) {
  const features = [['apple-alt', 'Food & Hunger Relief', 'Distributing essential food packages, staple nutrition, and immediate hunger relief to underprivileged households in Gowon Estate and surrounding communities.'], ['user-md', 'Medical & Health Care', 'Organizing grassroots health screenings, providing basic medical supplies, and facilitating access to healthcare assistance for vulnerable citizens.'], ['graduation-cap', 'Youth & Skill Empowerment', 'Mentoring youth, supporting educational needs, and offering skill development workshops to create sustainable livelihoods for the next generation.']];
  return <>
    <section className="hero"><div className="hero-overlay" /><div className="hero-container"><div><div className="hero-badge"><Icon name="hand-holding-heart" /> Founded in 2024 • Lagos, Nigeria</div><h1 className="hero-title">Easing Sufferings & <span>Restoring Hope</span> Across Nigeria</h1><p className="hero-subtitle">Dreyson Global Foundation (DGF) is a dedicated non-governmental organization committed to uplifting vulnerable families, providing food security, healthcare outreach, and empowering communities.</p><div className="hero-buttons"><Link href="/join" className="btn btn-primary"><Icon name="user-plus" /> Join Us Today</Link><Link href="/media" className="btn btn-outline hero-outline"><Icon name="photo-video" /> View Our Movements</Link><button className="btn btn-accent" onClick={onDonate}><Icon name="heart" /> Donate Now</button></div></div><div className="hero-card-preview"><div className="hero-card-title"><Icon name="building" /> Headquarters & Office Location</div><div className="hero-location-box"><Icon name="map-marked-alt" /><div><strong>Dreyson Global Foundation (DGF)</strong><p>CM building, 3rd Avenue, Gowon Estate, Lagos, Nigeria.</p></div></div><div className="hero-contact-buttons"><a href={`tel:${phone}`} className="btn btn-call"><Icon name="phone-alt" /> Call {phone}</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" brand /> WhatsApp Us</a></div></div></div></section>
    <section className="section"><SectionHeader subtitle="Who We Are" title="Dedicated to Bringing Smiles & Relief to Nigerian Families" description="Established in 2024, Dreyson Global Foundation (DGF) stands as a beacon of compassion and support for individuals and households facing socioeconomic hardships across Nigeria." /><div className="cards-grid">{features.map(([icon, title, text]) => <FeatureCard key={title} icon={icon} title={title} text={text} />)}</div><div className="center-action"><Link href="/about" className="btn btn-primary">Learn More About Our Journey <Icon name="arrow-right" /></Link></div></section>
    <section className="section section-tint"><SectionHeader subtitle="Charity Movements in Action" title="Witness Our Field Work & Impact" description="Take a glance at our recent outreaches and community drives documenting our mission across Nigeria." /><div className="gallery-grid">{mediaItems.slice(0, 3).map((item) => <MediaCard key={item.title} item={item} />)}</div><div className="center-action"><Link href="/media" className="btn btn-outline"><Icon name="images" /> View Full Photo Gallery</Link></div></section>
    <section className="stats-section"><div className="stats-grid">{[['2024', 'Year Founded'], ['50+', 'Nigerians Supported'], ['2', 'Outreach Movements'], ['100%', 'Community Driven']].map(([number, label]) => <div className="stat-item" key={label}><div className="stat-number">{number}</div><div className="stat-label">{label}</div></div>)}</div></section>

    <Cta onDonate={onDonate} />
  </>;
}

function SectionHeader({ subtitle, title, description }) { return <div className="section-header"><span className="section-subtitle">{subtitle}</span><h2 className="section-title">{title}</h2>{description && <p className="section-description">{description}</p>}</div>; }
function FeatureCard({ icon, title, text }) { return <div className="card"><div className="card-icon"><Icon name={icon} /></div><h3 className="card-title">{title}</h3><p className="card-text">{text}</p></div>; }
function MediaCard({ item, onOpen }) { return <div className="gallery-card" onClick={onOpen} role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined}><div className="gallery-img-wrapper"><img src={image(item.image)} alt={item.title} /><span className="gallery-tag">{item.tag}</span></div><div className="gallery-info"><h3 className="gallery-title">{item.title}</h3><p className="gallery-desc">{item.description}</p>{onOpen && <div className="media-hint"><Icon name="search-plus" /> Click image to view full screen</div>}</div></div>; }

function About() {
  return <><PageBanner background="about_dgf_community.jpg" badge={{ icon: 'info-circle', text: 'About Dreyson Global Foundation' }} title="Founded to Ease the Sufferings of Nigerians" description="Discover our story, core mission, values, and headquarters located at Gowon Estate, Lagos, Nigeria." /><section className="section"><div className="cards-grid about-story"><div><span className="section-subtitle">Our Establishment & Journey</span><h2 className="section-title">Founded in 2024 with Compassion & Action</h2><p className="section-description"><strong>Dreyson Global Foundation (DGF)</strong> was founded in 2024 out of a profound commitment to alleviate hardship, hunger, and vulnerability across communities in Nigeria.</p><p className="story-copy">Seeing the daily challenges faced by underprivileged families, widows, youths, and children, DGF was established to serve as an active channel of relief, dignity, and empowerment. Through direct grassroots initiatives, food distribution, medical screenings, and social support, we are turning empathy into practical impact.</p><blockquote>“We believe no Nigerian should suffer in silence when a united community can lend a helping hand.”</blockquote></div><img className="story-image" src={image('about_dgf_community.jpg')} alt="Dreyson Global Foundation Community Team" /></div></section><section className="section dark-section"><SectionHeader subtitle="Our Physical Headquarters" title="Visit Us or Reach Out Directly" description="Our foundation operates directly from our headquarters in Gowon Estate, Lagos. We are always open to partners, volunteers, and well-wishers." /><div className="cards-grid location-grid"><div className="card location-card"><div className="card-icon"><Icon name="building" /></div><h3 className="card-title">DGF Administrative Office</h3><p className="card-text">Located in the heart of Gowon Estate, providing central coordination for all our humanitarian field movements.</p><ul className="location-details"><li><Icon name="map-marked-alt" /><span><strong>Physical Address:</strong><br />CM building, 3rd avenue, Gowon Estate, Lagos, Nigeria.</span></li><li><Icon name="phone-alt" /><span><strong>Telephone Line:</strong><br /><a href={`tel:${phone}`}>{phone}</a></span></li><li><Icon name="whatsapp" brand /><span><strong>Official WhatsApp:</strong><br /><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">{phone}</a></span></li></ul></div><div className="contact-panel"><h3>Get In Touch</h3><p>Have questions, ideas, or want to partner with Dreyson Global Foundation? Call or text us on WhatsApp right away!</p><a href={`tel:${phone}`} className="btn btn-call"><Icon name="phone-alt" /> Call {phone}</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" brand /> WhatsApp {phone}</a></div></div></section><section className="section"><SectionHeader subtitle="Pillars of Purpose" title="Our Vision, Mission & Core Values" /><div className="cards-grid"><FeatureCard icon="eye" title="Our Vision" text="A Nigeria where no family goes hungry, where every vulnerable citizen finds support, and where communities are empowered with hope and self-reliance." /><FeatureCard icon="bullseye" title="Our Mission" text="To actively ease the sufferings of Nigerians through targeted food relief, community health screening, educational support, and youth skill empowerment." /><FeatureCard icon="hands-helping" title="Core Values" text="Compassion: Putting people first. Integrity: Complete transparency in all aid. Unity: Stronger together for community impact." /></div></section><section className="section section-tint center-section"><h2 className="section-title">Be Part of the DGF Movement</h2><p className="section-description">Join our growing network of members and volunteers committed to easing sufferings in Nigeria.</p><Link href="/join" className="btn btn-primary"><Icon name="user-plus" /> Join Us Page</Link></section></>;
}

function Join({ onToast }) {
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', location: '', reason: '', hasDonation: 'No', donationDetails: '', volunteerField: 'Yes', fieldSkills: [] });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => { event.preventDefault(); const message = `*NEW MEMBER / VOLUNTEER REGISTRATION*\n*Dreyson Global Foundation (DGF)*\n------------------------------------\n👤 *Name:* ${form.fullName}\n📞 *Phone:* ${form.phone}\n✉️ *Email:* ${form.email || 'Not Provided'}\n📍 *Location:* ${form.location || 'Lagos, Nigeria'}\n\n💬 *Why I Want to Join DGF:*\n${form.reason}\n\n📦 *Has Items/Things to Donate:* ${form.hasDonation}${form.hasDonation === 'Yes' ? `\n   Details: ${form.donationDetails || 'None specified'}` : ''}\n\n🤝 *Volunteer for Field Work:* ${form.volunteerField}${form.volunteerField === 'Yes' ? `\n   Interests: ${form.fieldSkills.length ? form.fieldSkills.join(', ') : 'General Volunteer Support'}` : ''}\n------------------------------------\nSent from DGF Website (CM Building, Gowon Estate, Lagos)`; onToast('Opening WhatsApp to send your application to DGF team...'); window.setTimeout(() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank'), 1000); };
  const toggleSkill = (skill) => setForm((current) => ({ ...current, fieldSkills: current.fieldSkills.includes(skill) ? current.fieldSkills.filter((item) => item !== skill) : [...current.fieldSkills, skill] }));
  const skills = ['Food Relief Distribution', 'Medical & Health Screening', 'Logistics & Event Setup', 'Media, Photography & Video', 'Youth Mentorship & Teaching'];
  return <><PageBanner background="hero_ngo_bg.PNG" badge={{ icon: 'user-plus', text: 'Membership & Volunteer Registration' }} title="Join Dreyson Global Foundation" description={`Fill in your details below to become a member, donate items, or volunteer for field work. When you click Send, your application sends directly to our official WhatsApp chat (${phone}).`} /><section className="section"><div className="form-container"><div className="form-intro"><h2>Prospective Member Application Form</h2><p>We are excited to welcome you into the DGF family!</p></div><form onSubmit={submit}><div className="form-row"><Field label="Full Name" required value={form.fullName} onChange={(value) => update('fullName', value)} placeholder="e.g. Chukwuma Adebayo" /><Field label="Phone / WhatsApp Number" required value={form.phone} onChange={(value) => update('phone', value)} placeholder={phone} type="tel" /></div><div className="form-row"><Field label="Email Address" value={form.email} onChange={(value) => update('email', value)} placeholder="e.g. name@example.com" type="email" /><Field label="City & State of Residence" value={form.location} onChange={(value) => update('location', value)} placeholder="e.g. Gowon Estate, Lagos" /></div><Field label="Why do you want to join Dreyson Global Foundation?" required value={form.reason} onChange={(value) => update('reason', value)} placeholder="Tell us what motivates you to join DGF and ease sufferings in Nigeria..." textarea /><RadioField label="Do you have items or things to donate to the NGO?" value={form.hasDonation} options={['Yes', 'No']} onChange={(value) => update('hasDonation', value)} /><div className="form-group conditional-box" style={{ display: form.hasDonation === 'Yes' ? 'block' : 'none' }}><Field label="What items would you like to donate?" value={form.donationDetails} onChange={(value) => update('donationDetails', value)} placeholder="e.g. Clothes, shoes, foodstuffs, medical supplies..." textarea /></div><RadioField label="Do you want to volunteer for field work & community outreaches?" value={form.volunteerField} options={['Yes', 'No']} onChange={(value) => update('volunteerField', value)} /><div className="form-group conditional-box volunteer-box" style={{ display: form.volunteerField === 'Yes' ? 'block' : 'none' }}><label className="form-label">Select areas you would like to help with during field work:</label><div className="checkbox-group">{skills.map((skill) => <label className="checkbox-label" key={skill}><input type="checkbox" checked={form.fieldSkills.includes(skill)} onChange={() => toggleSkill(skill)} /><span>{skill}</span></label>)}</div></div><div className="form-submit"><button type="submit" className="btn btn-whatsapp"><Icon name="whatsapp" brand /> Send Application</button></div></form></div></section><section className="section dark-section center-section"><h3 className="section-title">Prefer Direct Physical Visit or Call?</h3><p className="section-description">Address: CM building, 3rd avenue, Gowon Estate, Lagos, Nigeria.<br />Direct Phone / WhatsApp: <a href={`tel:${phone}`}>{phone}</a></p><div className="hero-buttons"><a href={`tel:${phone}`} className="btn btn-call"><Icon name="phone-alt" /> Call Now</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" brand /> Chat WhatsApp</a></div></section></>;
}

function Field({ label, value, onChange, placeholder, required, type = 'text', textarea = false }) { const controlProps = { className: 'form-control', value, onChange: (event) => onChange(event.target.value), placeholder, required }; return <div className="form-group"><label className="form-label">{label}{required && <span className="required-mark">*</span>}</label>{textarea ? <textarea {...controlProps} /> : <input {...controlProps} type={type} />}</div>; }
function RadioField({ label, value, options, onChange }) { return <div className="form-group"><label className="form-label">{label}</label><div className="radio-group">{options.map((option) => <label className="radio-label" key={option}><input type="radio" checked={value === option} onChange={() => onChange(option)} /><span>{option === 'Yes' ? 'Yes, I have items to donate' : 'No, not at the moment'}</span></label>)}</div></div>; }

function Media() {
  const [filter, setFilter] = useState('all'); const [selected, setSelected] = useState(null);
  const visibleItems = mediaItems.filter((item) => filter === 'all' || item.category === filter);
  return <><PageBanner background="media_food_outreach.jpg" badge={{ icon: 'images', text: 'Media & Movements Gallery' }} title="Our Charity Movements in Pictures" description="Explore photos of our field outreaches easing sufferings in Lagos and across Nigeria." /><section className="section"><div className="filter-container">{[['all', 'All Movements'], ['food', 'Food Drives'], ['medical', 'Medical Outreaches']].map(([key, label]) => <button key={key} className={`filter-btn ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>{label}</button>)}</div><div className="gallery-grid">{visibleItems.map((item) => <MediaCard key={item.title} item={item} onOpen={() => setSelected(item)} />)}</div></section>{selected && <div className="lightbox-modal active" onClick={() => setSelected(null)}><div className="lightbox-content" onClick={(event) => event.stopPropagation()}><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image">&times;</button><img src={image(selected.image)} alt={selected.title} /><div className="lightbox-title"><h4>{selected.title}</h4></div></div></div>}<Cta /></>;
}
function Cta({ onDonate }) { return <section className="section cta-section"><div className="center-section"><h2 className="section-title">Ready to Ease Sufferings & Lend a Helping Hand?</h2><p className="section-description">Whether you want to become an official member, volunteer for field work, or donate items to support families in need, your voice and actions matter.</p><div className="hero-buttons"><Link href="/join" className="btn btn-accent"><Icon name="hand-holding-heart" /> Join Us Now</Link><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><Icon name="whatsapp" brand /> Chat With Us</a><button className="btn btn-accent" onClick={onDonate}><Icon name="heart" /> Donate Now</button></div></div></section>; }

function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/'); const [toast, setToast] = useState(null); const [donationOpen, setDonationOpen] = useState(false);
  useEffect(() => { const updatePath = () => setPath(window.location.pathname.replace(/\/$/, '') || '/'); window.addEventListener('popstate', updatePath); return () => window.removeEventListener('popstate', updatePath); }, []);
  const onDonate = () => setDonationOpen(true);
  const page = path === '/about' ? <About /> : path === '/join' ? <Join onToast={setToast} /> : path === '/media' ? <Media /> : <Home onDonate={onDonate} />;
  return <><Header activePath={path} onDonate={onDonate} /><main>{page}</main><Footer onDonate={onDonate} />{donationOpen && <DonationModal onClose={() => setDonationOpen(false)} onToast={setToast} />}{toast && <Toast message={toast} onClose={() => setToast(null)} />}</>;
}

export default App;
