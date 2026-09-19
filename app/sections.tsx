'use client';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Code2, BrainCircuit, Layers, ScanFace, AudioLines, Plus, ArrowRight, ExternalLink, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const github = 'https://github.com/priyanshi02-lyt';

const work = [
  {
    name: 'AquaAlert (Jal Setu) — Civic Water Leakage Watchdog & Grievance Grid',
    tag: 'CIVIC TECH / 01 • 🔒 UPCOMING',
    badge: '🔒 JAL NIGAM UPCOMING RELEASE',
    description: 'Current flagship civic-tech initiative in active development for municipal deployment with Jal Nigam & Nagar Nigam. Empowers citizens to report roadside pipeline leakages, earn Jal Karma rewards, and assist municipal authorities with automated duplicate clustering and grievance triage.',
    skills: ['Jal Nigam Municipal Pilot', 'Active Development', 'Civic Tech', 'Leaflet.js Geolocation', 'Automated Triage', 'Gamified Rewards'],
    liveUrl: 'https://aqualert-jal-setu.vercel.app',
    image: '/images/project-aqualert.jpg',
    platform: 'UPCOMING',
    locked: true
  },
  {
    name: 'NorthStar Academy Student & Academic Portal 2026',
    tag: 'ED-TECH / 02',
    badge: 'ACADEMY • AUTH & PORTAL',
    description: 'Modern, secure academic learning and student authentication portal for Northstar Academy, featuring personalized student access, curriculum dashboards, and digital campus resources.',
    skills: ['Ed-Tech', 'Student Portal', 'Authentication UI', 'Responsive Design', 'Netlify'],
    liveUrl: 'https://northstar-academy-portal-2026.netlify.app',
    image: '/images/project-northstar.jpg',
    platform: 'NETLIFY'
  },
  {
    name: 'All-in-One Media & Networking Solutions Hub',
    tag: 'NETWORKING / 03',
    badge: 'MEDIA • COLLABORATION',
    description: 'Dynamic media networking and collaboration hub connecting digital creators, content producers, and media agencies for portfolio showcasing, project collaboration, and talent discovery.',
    skills: ['Media Platforms', 'Creative Networking', 'Glassmorphism', 'Netlify', 'Interactive UI'],
    liveUrl: 'https://media-networking.netlify.app',
    image: '/images/project-media.jpg',
    platform: 'NETLIFY'
  },
  {
    name: 'KPMCET College Official Web Portal',
    tag: 'INSTITUTIONAL / 04',
    badge: 'CAMPUS • ACADEMICS',
    description: 'Modern, responsive institutional web portal for KPMCET featuring interactive department guides, academic curriculum showcases, digital prospectus, and administrative notices.',
    skills: ['Web Architecture', 'Responsive UI', 'Academic Portals', 'Performance Optimization', 'Vercel'],
    liveUrl: 'https://kpmcet-website.vercel.app',
    image: '/images/project-kpmcet.jpg',
    platform: 'VERCEL'
  },
  {
    name: 'National Convent School Digital Campus Platform',
    tag: 'EDUCATION / 05',
    badge: 'CAMPUS • ED-TECH',
    description: 'Official digital campus platform for National Convent School (Rampur Bawli) modernizing student admissions, parent communications, academic showcases, and campus galleries.',
    skills: ['Web Design', 'Educational Tech', 'CSS Layouts', 'Cross-browser Compatibility', 'Vercel'],
    liveUrl: 'https://national-convent-school.vercel.app',
    image: '/images/project-ncs.jpg',
    platform: 'VERCEL'
  },
  {
    name: 'Innovative Corporate Services & Consulting Experience',
    tag: 'CORPORATE / 06',
    badge: 'B2B • CONSULTING',
    description: 'Sleek, high-converting corporate landing experience built for modern technology and business consulting services, featuring smooth scroll interactions and service inquiry funnels.',
    skills: ['Corporate Web Design', 'Conversion Rate Optimization', 'Dark Mode UI', 'SEO', 'Vercel'],
    liveUrl: 'https://invisible-innovative-corporate.vercel.app',
    image: '/images/project-corporate.jpg',
    platform: 'VERCEL'
  },
  {
    name: 'Deepfake Face and Speech Detection',
    tag: 'AI & ML / 07',
    badge: 'FACE + SPEECH AI',
    description: 'A deep learning system focused on identifying manipulated facial media and synthetic voice clones, analyzing forensic visual and audio frequency patterns.',
    skills: ['Deepfake Detection', 'Python', 'OpenCV', 'TensorFlow', 'Librosa'],
    liveUrl: 'https://github.com/priyanshi02-lyt',
    image: '/images/project-deepfake.jpg',
    platform: 'GITHUB'
  },
  {
    name: 'Responsive Image Gallery',
    tag: 'INTERFACE / 08',
    badge: 'PHOTOGRAPHY UI',
    description: 'Fluid layouts, interactive hover effects, filtering, and lightbox modal browsing experience built with modern CSS and vanilla JavaScript.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Lightbox UI', 'Responsive Design'],
    liveUrl: 'https://github.com/priyanshi02-lyt',
    image: '/images/project-gallery.jpg',
    platform: 'GITHUB'
  }
];


interface TechArticle {
  title: string;
  url: string;
  date: string;
  readTime: string;
  badge: string;
  tag: string;
  summary: string;
  topics: string[];
  image?: string;
  featured?: boolean;
}

const techArticles: TechArticle[] = [
  {
    title: 'The Day Your Mirror Starts Thinking',
    url: 'https://medium.com/@priyanshisrivastava697/the-day-your-mirror-starts-thinking-4c7e8d5c57d6',
    date: 'AUG 8, 2026',
    readTime: '2 MIN READ',
    badge: 'FEATURED SPOTLIGHT',
    tag: 'COMPUTER VISION • AMBIENT AI',
    summary: 'At the core of a smart mirror is computer vision and edge intelligence. A camera captures facial and body patterns, while machine-learning algorithms interpret fatigue indicators, hydration needs, and ambient health rhythms without noticeable latency.',
    topics: ['Computer Vision', 'Ambient AI', 'Edge Intelligence', 'Facial Biometrics', 'Health IoT'],
    image: '/images/article-mirror.jpg',
    featured: true
  },
  {
    title: 'Smart Cities: When Technology Starts Running Our Streets',
    url: 'https://medium.com/@priyanshisrivastava697/smart-cities-when-technology-starts-running-our-streets-ad095d7459f5',
    date: 'AUG 11, 2026',
    readTime: '3 MIN READ',
    badge: 'CIVIC IOT',
    tag: 'CIVIC TECH • URBAN PLANNING',
    summary: 'Imagine a city where traffic lights automatically adjust according to vehicle density, streetlights conserve energy when roads are clear, and smart utility grids detect pipeline leaks autonomously.',
    topics: ['IoT Systems', 'Traffic Automation', 'Energy Efficiency', 'Urban Infrastructure'],
    featured: false
  },
  {
    title: 'AI Slop: Is the Internet Becoming Filled With Artificial Noise?',
    url: 'https://medium.com/@priyanshisrivastava697/ai-slop-is-the-internet-becoming-filled-with-artificial-noise-94d731057ab8',
    date: 'AUG 10, 2026',
    readTime: '3 MIN READ',
    badge: 'GEN AI CRITIQUE',
    tag: 'GENERATIVE AI • INFORMATION ARCHITECTURE',
    summary: 'With generative AI producing articles, imagery, and code at zero marginal cost, the open web faces an inundation of synthetic noise. How do we preserve authenticity and high-signal engineering?',
    topics: ['Generative AI', 'Content Integrity', 'LLMs', 'Information Quality'],
    featured: false
  },
  {
    title: 'Digital Carbon Footprint: The Hidden Environmental Cost of Technology',
    url: 'https://medium.com/@priyanshisrivastava697/digital-carbon-footprint-the-hidden-environmental-cost-of-technology-941518a93cb7',
    date: 'AUG 9, 2026',
    readTime: '3 MIN READ',
    badge: 'SUSTAINABLE TECH',
    tag: 'GREEN COMPUTING • CLOUD INFRASTRUCTURE',
    summary: 'Every streaming packet, cloud backup, and AI query carries an invisible environmental cost. An analysis of data center water consumption, gigawatt grids, and sustainable computing architectures.',
    topics: ['Green Cloud', 'Data Centers', 'Energy Efficiency', 'Sustainability'],
    featured: false
  },
  {
    title: 'The Internet Never Forgets: What Happens to Your Data After You Delete It?',
    url: 'https://medium.com/@priyanshisrivastava697/the-internet-never-forgets-what-happens-to-your-data-after-you-delete-it-78bf503f22b0',
    date: 'AUG 6, 2026',
    readTime: '2 MIN READ',
    badge: 'CYBERSECURITY',
    tag: 'DATA PRIVACY • DISTRIBUTED SYSTEMS',
    summary: 'Demystifying database soft-deletes, multi-region CDN propagation caches, web archivers, and the engineering reality behind the "Right to be Forgotten".',
    topics: ['Data Privacy', 'Caching Layers', 'Soft Deletion', 'Web Archiving'],
    featured: false
  },
  {
    title: 'The Technology We Don’t Notice Anymore!',
    url: 'https://medium.com/@priyanshisrivastava697/the-technology-we-dont-notice-anymore-07e205f06235',
    date: 'AUG 5, 2026',
    readTime: '2 MIN READ',
    badge: 'UBIQUITOUS TECH',
    tag: 'HCI • MICRO-INTERACTIONS',
    summary: 'The best technology is invisible. A reflection on seamless friction-free innovations—from predictive text engines to NFC taps—that have silently integrated into human daily life.',
    topics: ['Ubiquitous Computing', 'HCI', 'NFC & Sensors', 'Seamless UX'],
    featured: false
  },
  {
    title: 'AI Is Not Replacing Developers—It Is Redefining Them',
    url: 'https://medium.com/@priyanshisrivastava697/ai-is-not-replacing-developers-it-is-redefining-them-36caff6672c8',
    date: 'AUG 4, 2026',
    readTime: '3 MIN READ',
    badge: 'FUTURE OF DEV',
    tag: 'SOFTWARE ARCHITECTURE • AI COPILOTS',
    summary: 'AI will not eliminate engineers; it will automate boilerplate syntax and elevate software craftsmen into systems architects, domain specialists, and high-leverage builders.',
    topics: ['AI Copilots', 'Developer Productivity', 'System Architecture', 'Career Growth'],
    featured: false
  },
  {
    title: 'Deepfake Face and Speech Detection Technology',
    url: 'https://medium.com/@priyanshisrivastava697/deepfake-face-and-speech-detection-technology-6e42e4a8a4f3',
    date: 'AUG 2, 2026',
    readTime: '3 MIN READ',
    badge: 'AI FORENSICS',
    tag: 'COMPUTER VISION • SPEECH SYNTHESIS FORENSICS',
    summary: 'A deep dive into convolution neural architectures, biometric frequency anomalies, and Librosa spectral analysis engineered to identify synthetic voice and video clones.',
    topics: ['Biometric Forensics', 'OpenCV', 'Librosa Audio', 'TensorFlow'],
    featured: false
  }
];

const experience = [
  ['16 AUG 2026 — PRESENT', 'Obtains Technology', 'Front-end Developer', 'Building projects and websites, with over 50+ developed as showcased in my portfolio.'],
  ['20 JUL — 20 AUG 2026', 'Codec Technologies', 'Artificial Intelligence Internship', 'Professional experience in artificial intelligence.'],
  ['15 JUN — 15 JUL 2026', 'Code Alpha', 'Frontend Developer Internship', 'Hands-on experience in frontend development.'],
  ['11 AUG — 15 OCT 2025', 'Samsung Innovation Campus', 'Big Data', 'Training in big data and analytical thinking.']
];

function Label({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow section-label reveal-left">{children}<span /></div>;
}

export function PortfolioSections() {
  const [project, setProject] = useState<number | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const targets = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    targets.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Marquee Ticker 1: Sideways Scrolling Tech Highlights */}
      <div className="ticker-strip">
        <div className="ticker-track">
          <span className="ticker-item"><i>✦</i> CIVIC TECH INNOVATION</span>
          <span className="ticker-item"><i>✦</i> FULL-STACK WEB APPS</span>
          <span className="ticker-item"><i>✦</i> AI & MACHINE LEARNING</span>
          <span className="ticker-item"><i>✦</i> LEAFLET GEOLOCATION</span>
          <span className="ticker-item"><i>✦</i> RESPONSIVE UI / UX</span>
          <span className="ticker-item"><i>✦</i> CLOUD DEPLOYMENTS</span>
          <span className="ticker-item"><i>✦</i> DATA ANALYTICS & PYTHON</span>
          <span className="ticker-item"><i>✦</i> CIVIC TECH INNOVATION</span>
          <span className="ticker-item"><i>✦</i> FULL-STACK WEB APPS</span>
          <span className="ticker-item"><i>✦</i> AI & MACHINE LEARNING</span>
          <span className="ticker-item"><i>✦</i> LEAFLET GEOLOCATION</span>
          <span className="ticker-item"><i>✦</i> RESPONSIVE UI / UX</span>
          <span className="ticker-item"><i>✦</i> CLOUD DEPLOYMENTS</span>
          <span className="ticker-item"><i>✦</i> DATA ANALYTICS & PYTHON</span>
        </div>
      </div>

      <section id="highlight" className="section press-section">
        <Label>FEATURED // ANI INTERVIEW</Label>
        <article className="press-feature reveal-up">
          <div className="press-badge">
            <strong>ANI</strong>
            <span>MEDIA HIGHLIGHT</span>
          </div>
          <div className="press-copy">
            <div className="availability">INTERNET OF THINGS • PROJECT SPOTLIGHT</div>
            <h2>From an idea<br /><span>to an ANI interview.</span></h2>
            <p>A major highlight in my journey: speaking with ANI about my Internet of Things (IoT) project. An opportunity to share my work and the ideas behind it with a wider audience.</p>
            <a className="primary-link" href="https://x.com/ANI/status/1953819734060798014" target="_blank" rel="noreferrer">
              View the ANI interview on X <ArrowUpRight size={18} />
            </a>
          </div>
        </article>
      </section>

      <section id="about" className="section">
        <Label>002 // THE PERSON BEHIND THE CODE</Label>
        <div className="about-grid">
          <figure className="about-photo reveal-left">
            <img src="/images/priyanshi-formal.jpeg" alt="Priyanshi in formal academic attire" loading="lazy" />
            <figcaption>ALWAYS LEARNING. ALWAYS BUILDING.</figcaption>
          </figure>
          <div className="reveal-right">
            <h2>A curious mind.<br /><span>A builder at heart.</span></h2>
            <p>I'm Priyanshi, a Bachelor of Computer Applications student at the Institute of Technology and Management, GIDA. I enjoy turning ideas into responsive websites and exploring what's possible with AI and data.</p>
            <p>My foundation in programming, data structures, and software development shapes the way I approach a problem: understand it, break it down, and build with care.</p>
            <p>Beyond coursework, I participate in college coding competitions and volunteer for tech fests and workshops. I'm looking for opportunities to contribute to meaningful projects and keep growing in the IT industry.</p>
            <a className="text-link" href={github} target="_blank" rel="noreferrer">
              Find me on GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <Label>003 // CAPABILITIES</Label>
        <div className="section-heading reveal-left">
          <h2>Built on fundamentals.<br /><span>Driven by curiosity.</span></h2>
          <p>A growing toolkit for building interfaces,<br />solving problems, and understanding data.</p>
        </div>
        <div className="capabilities">
          {[
            {
              icon: Code2,
              title: 'Frontend development',
              body: 'Responsive interfaces with a focus on clarity, usability, and a smooth experience across devices.',
              tags: ['HTML', 'CSS', 'JavaScript']
            },
            {
              icon: BrainCircuit,
              title: 'AI & data',
              body: 'Exploring artificial intelligence, machine learning, and the patterns that turn data into understanding.',
              tags: ['AI / ML', 'Data Analytics', 'Python']
            },
            {
              icon: Layers,
              title: 'Programming foundations',
              body: 'A foundation in programming and data structures, paired with a problem-solving mindset.',
              tags: ['C', 'C++', 'Java', 'Python']
            }
          ].map((item, i) => (
            <article key={item.title} className={i % 2 === 0 ? 'reveal-left' : 'reveal-right'}>
              <div className="card-top">
                <span>0{i + 1}</span>
                <item.icon size={22} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="tags">
                {item.tags.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="soft-skills reveal-up">
          <span>HOW I WORK</span>
          <p>Communication & teamwork</p>
          <p>Problem-solving</p>
          <p>Time management</p>
          <p>Adaptability</p>
        </div>
      </section>

      
      {/* Interactive Options Switcher Bar */}
      <div id="options-nav" className="portfolio-options-bar reveal-up">
        <div className="options-badge">
          <Sparkles size={13} />
          <span>EXPLORE SHOWCASE</span>
        </div>
        <div className="options-pills">
          <a href="#projects" className="option-pill">
            <span className="pill-emoji">💻</span>
            <span>Projects</span>
            <span className="pill-badge">8</span>
          </a>
          <a href="#articles" className="option-pill active-articles">
            <span className="pill-emoji">✍️</span>
            <span>Tech Articles</span>
            <span className="pill-badge">8</span>
          </a>
          <a href="#credentials" className="option-pill">
            <span className="pill-emoji">📜</span>
            <span>Credentials</span>
            <span className="pill-badge">4</span>
          </a>
          <a href="#journey" className="option-pill">
            <span className="pill-emoji">🚀</span>
            <span>Journey</span>
            <span className="pill-badge">3</span>
          </a>
          <a href="https://medium.com/@priyanshisrivastava697" target="_blank" rel="noreferrer" className="option-pill medium-pill">
            <span className="pill-emoji">📖</span>
            <span>Medium Profile</span>
            <span className="pill-badge">↗</span>
          </a>
        </div>
      </div>

      {/* Marquee Ticker 2: Reverse Sideways Motion into Projects */}
      <div className="ticker-strip">
        <div className="ticker-track-reverse">
          <span className="ticker-item"><i>✦</i> 🔒 AQUAALERT (JAL SETU) — UPCOMING JAL NIGAM</span>
          <span className="ticker-item"><i>✦</i> NORTHSTAR ACADEMY PORTAL</span>
          <span className="ticker-item"><i>✦</i> ALL-IN-ONE MEDIA & NETWORKING</span>
          <span className="ticker-item"><i>✦</i> KPMCET COLLEGE PORTAL</span>
          <span className="ticker-item"><i>✦</i> NATIONAL CONVENT SCHOOL</span>
          <span className="ticker-item"><i>✦</i> CORPORATE CONSULTING</span>
          <span className="ticker-item"><i>✦</i> DEEPFAKE AI DETECTION</span>
          <span className="ticker-item"><i>✦</i> 🔒 AQUAALERT (JAL SETU) — UPCOMING JAL NIGAM</span>
          <span className="ticker-item"><i>✦</i> NORTHSTAR ACADEMY PORTAL</span>
          <span className="ticker-item"><i>✦</i> ALL-IN-ONE MEDIA & NETWORKING</span>
          <span className="ticker-item"><i>✦</i> KPMCET COLLEGE PORTAL</span>
          <span className="ticker-item"><i>✦</i> NATIONAL CONVENT SCHOOL</span>
          <span className="ticker-item"><i>✦</i> CORPORATE CONSULTING</span>
          <span className="ticker-item"><i>✦</i> DEEPFAKE AI DETECTION</span>
        </div>
      </div>

      <section id="projects" className="section">
        <Label>004 // SELECTED WORK & LIVE DEPLOYMENTS</Label>
        <div className="section-heading reveal-left">
          <h2>Crafted with precision.<br /><span>Deployed for impact.</span></h2>
          <a className="text-link" href={github} target="_blank" rel="noreferrer">
            Explore GitHub <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="project-grid">
          {work.map((w, i) => (
            <article className={'project ' + (i % 2 === 0 ? 'reveal-left' : 'reveal-right')} key={w.name}>
              <div
                className="project-art"
                onClick={() => setProject(i)}
                aria-label={'View details of ' + w.name}
              >
                <div className="project-img-wrapper">
                  <img
                    src={w.image}
                    alt={w.name}
                    className={'project-img-thumb ' + (w.locked ? 'project-img-blurred' : '')}
                    loading="lazy"
                    style={w.locked ? {
                      filter: 'blur(16px) brightness(0.55)',
                      transform: 'scale(1.18)',
                      userSelect: 'none',
                      pointerEvents: 'none'
                    } : undefined}
                  />
                  {w.locked && (
                    <div className="project-lock-badge-overlay">
                      <Lock size={15} />
                      <span>PROPRIETARY &amp; BLURRED • UPCOMING JAL NIGAM</span>
                    </div>
                  )}
                  <div className="project-img-overlay">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {w.locked || w.platform === 'UPCOMING' ? (
                        <span className="project-live-tag" style={{ background: 'rgba(245, 158, 11, 0.25)', borderColor: 'rgba(251, 191, 36, 0.7)', color: '#fef08a' }}>
                          <span className="pulse-dot" style={{ background: '#f59e0b', boxShadow: '0 0 10px #f59e0b' }} /> 🔒 UPCOMING • JAL NIGAM
                        </span>
                      ) : w.platform === 'VERCEL' ? (
                        <span className="project-live-tag">
                          <span className="pulse-dot" /> LIVE ON VERCEL
                        </span>
                      ) : w.platform === 'NETLIFY' ? (
                        <span className="project-live-tag" style={{ background: 'rgba(6, 182, 212, 0.25)', borderColor: 'rgba(34, 211, 238, 0.6)', color: '#a5f3fc' }}>
                          <span className="pulse-dot" style={{ background: '#06b6d4', boxShadow: '0 0 10px #06b6d4' }} /> LIVE ON NETLIFY
                        </span>
                      ) : (
                        <span className="project-live-tag" style={{ color: '#cbd5e1', borderColor: '#64748b', background: 'rgba(51, 65, 85, 0.4)' }}>
                          SOURCE PROJECT
                        </span>
                      )}
                      <span className="project-open" style={{ position: 'static' }}>
                        <ArrowUpRight size={18} />
                      </span>
                    </div>

                    <div className="project-bottom-badge">
                      <div className="project-title-overlay">{w.name}</div>
                      {w.locked ? (
                        <span
                          className="project-quick-launch-btn project-locked-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProject(i);
                          }}
                        >
                          <Lock size={12} /> Upcoming ↗
                        </span>
                      ) : (
                        w.liveUrl && !w.liveUrl.includes('github.com') && (
                          <a
                            href={w.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="project-quick-launch-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Launch ↗
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-meta">
                <span>{w.tag}</span>
                <span>{w.badge}</span>
              </div>
              <h3>{w.name}</h3>
              <p>{w.description}</p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                {w.locked ? (
                  <button
                    className="primary-link"
                    onClick={() => setProject(i)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      padding: '7px 16px',
                      borderRadius: '99px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #d97706, #b45309)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                    }}
                  >
                    <Lock size={13} /> Upcoming Jal Nigam Release ↗
                  </button>
                ) : (
                  w.liveUrl && !w.liveUrl.includes('github.com') && (
                    <a
                      className="primary-link"
                      href={w.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        padding: '7px 16px',
                        borderRadius: '99px',
                        textDecoration: 'none',
                        fontWeight: '700'
                      }}
                    >
                      Launch Live Site <ArrowUpRight size={14} />
                    </a>
                  )
                )}
                <Button variant="link" onClick={() => setProject(i)} style={{ padding: '0', fontSize: '13px' }}>
                  Project details <ArrowUpRight size={14} />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      
      {/* Marquee Ticker 3: Tech Articles Streaming */}
      <div className="ticker-strip">
        <div className="ticker-track">
          <span className="ticker-item"><i>✦</i> THE DAY YOUR MIRROR STARTS THINKING</span>
          <span className="ticker-item"><i>✦</i> SMART CITIES & IOT INFRASTRUCTURE</span>
          <span className="ticker-item"><i>✦</i> AI SLOP & DIGITAL NOISE</span>
          <span className="ticker-item"><i>✦</i> DIGITAL CARBON FOOTPRINT</span>
          <span className="ticker-item"><i>✦</i> THE INTERNET NEVER FORGETS</span>
          <span className="ticker-item"><i>✦</i> INVISIBLE EVERYDAY TECH</span>
          <span className="ticker-item"><i>✦</i> AI REDEFINING DEVELOPERS</span>
          <span className="ticker-item"><i>✦</i> DEEPFAKE FORENSICS</span>
          <span className="ticker-item"><i>✦</i> THE DAY YOUR MIRROR STARTS THINKING</span>
          <span className="ticker-item"><i>✦</i> SMART CITIES & IOT INFRASTRUCTURE</span>
          <span className="ticker-item"><i>✦</i> AI SLOP & DIGITAL NOISE</span>
          <span className="ticker-item"><i>✦</i> DIGITAL CARBON FOOTPRINT</span>
          <span className="ticker-item"><i>✦</i> THE INTERNET NEVER FORGETS</span>
          <span className="ticker-item"><i>✦</i> INVISIBLE EVERYDAY TECH</span>
        </div>
      </div>

      <section id="articles" className="section articles-section">
        <Label>005 // THOUGHT LEADERSHIP & TECH ESSAYS</Label>
        <div className="section-heading reveal-left">
          <div>
            <h2>Deep dives into tech.<br /><span>Shaping tomorrow's systems.</span></h2>
            <p>Essays on ambient intelligence, smart cities, data privacy, and the frontiers of modern software engineering.</p>
          </div>
          <a className="medium-author-card" href="https://medium.com/@priyanshisrivastava697" target="_blank" rel="noreferrer">
            <span className="medium-icon-badge">✍️</span>
            <div>
              <strong>Priyanshi Srivastava</strong>
              <span>medium.com/@priyanshisrivastava697 ↗</span>
            </div>
          </a>
        </div>

        {/* Featured Spotlight Article: The Day Your Mirror Starts Thinking */}
        <article className="article-spotlight-card reveal-up">
          <div className="spotlight-visual">
            <img 
              src="/images/article-mirror.jpg" 
              alt="Smart mirror ambient computer vision interface" 
              loading="lazy"
            />
            <div className="spotlight-overlay-tags">
              <span className="spotlight-featured-pill">⭐ FEATURED PUBLICATION</span>
              <span className="spotlight-read-pill">2 MIN READ • AUG 8, 2026</span>
            </div>
          </div>
          <div className="spotlight-body">
            <div className="spotlight-badge">COMPUTER VISION • AMBIENT AI • EDGE COMPUTING</div>
            <h3>The Day Your Mirror Starts Thinking</h3>
            <blockquote className="spotlight-quote">
              "Smart mirrors powered by AI could become one of the most personal computing devices in everyday life. The mirror is no longer just reflecting your appearance; it is interpreting your well-being."
            </blockquote>
            <p className="spotlight-description">
              At the core of a smart mirror is computer vision and edge intelligence. A camera captures facial and body patterns, while machine-learning algorithms interpret fatigue indicators, hydration needs, and ambient health rhythms in real-time without noticeable cloud latency.
            </p>
            <div className="spotlight-tags">
              <span>Computer Vision</span>
              <span>Ambient AI</span>
              <span>Edge Computing</span>
              <span>Facial Biometrics</span>
              <span>Health IoT</span>
            </div>
            <div className="spotlight-actions-row">
              <a 
                href="https://medium.com/@priyanshisrivastava697/the-day-your-mirror-starts-thinking-4c7e8d5c57d6" 
                target="_blank" 
                rel="noreferrer"
                className="btn-read-medium"
              >
                Read Complete Story on Medium <ArrowUpRight size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/safety/go/?url=https%3A%2F%2Flnkd%2Ein%2FgKfjmtTs" 
                target="_blank" 
                rel="noreferrer"
                className="btn-view-linkedin"
              >
                LinkedIn Post Highlight ↗
              </a>
            </div>
          </div>
        </article>

        {/* Grid of All 7 Additional Tech Articles */}
        <div className="articles-grid">
          {techArticles.filter(a => !a.featured).map((art, idx) => (
            <article key={art.title} className={'article-card ' + (idx % 2 === 0 ? 'reveal-left' : 'reveal-right')}>
              <div className="article-top-row">
                <span className="article-date-pill">{art.date}</span>
                <span className="article-read-time">{art.readTime}</span>
              </div>
              <div className="article-tag-label">{art.tag}</div>
              <h3>{art.title}</h3>
              <p>{art.summary}</p>
              <div className="article-topic-pills">
                {art.topics.map(t => <span key={t}>{t}</span>)}
              </div>
              <div className="article-bottom-action">
                <a href={art.url} target="_blank" rel="noreferrer" className="article-open-link">
                  Read on Medium <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="journey" className="section">
        <Label>005 // EXPERIENCE & EDUCATION</Label>
        <div className="journey-grid">
          <div className="reveal-left">
            <h2>Learning by doing.<br /><span>Growing with purpose.</span></h2>
            <p>From the classroom to real-world experience,<br />every step adds a new perspective.</p>
            <a className="text-link" href="mailto:priyanshisrivastava697@gmail.com?subject=Resume%20Request">
              Request Full Resume <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="timeline reveal-right">
            {experience.map((e, i) => (
              <article key={e[1]}>
                <span className={'timeline-dot ' + (i === 0 ? 'active' : '')} />
                <div className="date">{e[0]}</div>
                <h3>{e[1]}</h3>
                <div className="role">
                  {e[2]}
                  {i === 0 && <span className="current">CURRENT</span>}
                </div>
                <p>{e[3]}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="education reveal-up">
          <article>
            <span>2024 — 2027</span>
            <h3>Bachelor of Computer Applications</h3>
            <p>Institute of Technology and Management<br />ITM, GIDA</p>
            <strong>8.36 <small>CGPA</small></strong>
          </article>
          <article>
            <span>2022 — 2023</span>
            <h3>Senior Secondary Education</h3>
            <p>Aatmdeep Vidyalaya</p>
            <strong>72<small>%</small></strong>
          </article>
          <article>
            <span>2020 — 2021</span>
            <h3>High School</h3>
            <p>H.P. Children’s Academy</p>
            <strong>86<small>%</small></strong>
          </article>
        </div>
      </section>

      <section id="credentials" className="section">
        <Label>006 // CONTINUOUS LEARNING</Label>
        <div className="section-heading reveal-left">
          <h2>Curiosity,<br /><span>with credentials.</span></h2>
          <p>Courses and programmes that have<br />helped shape my technical foundation.</p>
        </div>
        <div className="credentials">
          {[
            ['01', 'Python for Everybody', 'Coursera'],
            ['02', 'Data Science with AI', 'Internshala'],
            ['03', 'Big Data', 'Samsung Innovation Campus'],
            ['04', 'AI and ML', 'Samsung Innovation Campus']
          ].map((c, i) => (
            <article key={c[0]} className={i % 2 === 0 ? 'reveal-left' : 'reveal-right'}>
              <span>{c[0]}</span>
              <h3>{c[1]}</h3>
              <p>{c[2]}</p>
              <span className="credential-mark">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section id="journal" className="section">
        <Label>007 // BEYOND THE SCREEN</Label>
        <div className="section-heading reveal-left">
          <h2>A few frames.<br /><span>A little more me.</span></h2>
          <p>Life between the lines of code.</p>
        </div>
        <div className="journal reveal-up">
          {[
            ['priyanshi-cafe.jpeg', '01 / Everyday moments'],
            ['priyanshi-portrait.jpeg', '02 / A new perspective'],
            ['priyanshi-journal.jpeg', '03 / In monochrome']
          ].map(([f, title]) => (
            <button key={f} onClick={() => setPhoto(f)} aria-label={'Enlarge photo: ' + title}>
              <img src={'/images/' + f} alt={'Priyanshi — ' + title.substring(5)} loading="lazy" />
              <span>
                {title}
                <Plus size={17} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <Label>008 // LET’S CONNECT</Label>
        <div className="section-heading reveal-left">
          <h2>Have an idea?<br /><span>Let’s build it together.</span></h2>
          <div>
            <div className="availability"><i /> OPEN TO OPPORTUNITIES</div>
            <p>For software engineering opportunities,<br />internships, and interesting collaborations.</p>
          </div>
        </div>
        <a className="email-link reveal-up" href="mailto:priyanshisrivastava697@gmail.com">
          priyanshisrivastava697@gmail.com <ArrowUpRight />
        </a>
        <div className="contact-bottom">
          <span>Gorakhpur, Uttar Pradesh, India</span>
          <span>+91 9219 XXXXXX</span>
          <a href={github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/priyanshi-srivastava-bb6a36421/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href="mailto:priyanshisrivastava697@gmail.com?subject=Resume%20Request">
            Request Resume ↗
          </a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#home">PS<span>Priyanshi.</span></a>
        <span>© {new Date().getFullYear()} Priyanshi Srivastava</span>
        <a href="#home">Back to top ↑</a>
      </footer>

      <Dialog open={project !== null} onOpenChange={o => { if (!o) setProject(null); }}>
        <DialogContent className="detail-dialog">
          {project !== null && (
            <>
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', maxHeight: '240px', marginBottom: '16px', border: '1px solid var(--border)' }}>
                <img
                  src={work[project].image}
                  alt={work[project].name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: work[project].locked ? 'blur(18px) brightness(0.5)' : undefined,
                    transform: work[project].locked ? 'scale(1.2)' : undefined,
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
                {work[project].locked && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'rgba(10, 15, 29, 0.75)',
                    backdropFilter: 'blur(10px)',
                    color: '#fef08a',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    padding: '20px',
                    userSelect: 'none'
                  }}>
                    <Lock size={28} style={{ color: '#fbbf24' }} />
                    <strong style={{ fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      🔒 PROPRIETARY MUNICIPAL ASSET • BLURRED PREVIEW
                    </strong>
                    <span style={{ fontSize: '11px', color: '#cbd5e1', maxWidth: '380px' }}>
                      Architecture &amp; design protected under municipal deployment for Jal Nigam. UI visuals blurred to prevent unauthorized copying.
                    </span>
                  </div>
                )}
              </div>
              {work[project].locked && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(251, 191, 36, 0.5)',
                  color: '#fef08a',
                  marginBottom: '16px',
                  fontSize: '13px',
                  lineHeight: '1.5'
                }}>
                  <Lock size={20} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fbbf24', marginBottom: '2px', fontSize: '13.5px' }}>
                      🔒 Current Project in Progress — Locked as Upcoming
                    </strong>
                    AquaAlert (Jal Setu) is currently under active development and municipal pilot testing with <strong>Uttar Pradesh Jal Nigam &amp; Nagar Nigam</strong>. Public grievance triage deployment and citizen karma roll-out is upcoming.
                  </div>
                </div>
              )}
              <DialogTitle>{work[project].name}</DialogTitle>
              <DialogDescription>{work[project].description}</DialogDescription>
              <div className="tags">
                {work[project].skills.map(t => <span key={t}>{t}</span>)}
              </div>
              {work[project].liveUrl && !work[project].liveUrl.includes('github.com') && (
                <div style={{ marginTop: '20px', marginBottom: '12px' }}>
                  <a
                    className="primary-link"
                    href={work[project].liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '11px 22px',
                      borderRadius: '99px',
                      textDecoration: 'none',
                      fontWeight: '700'
                    }}
                  >
                    Launch Live Web Application <ArrowUpRight size={16} />
                  </a>
                </div>
              )}
              <p style={{ marginTop: '14px', fontSize: '12px', color: 'var(--muted-foreground)' }}>
                Explore my GitHub repository for source code and architecture details, or reach out to discuss this project.
              </p>
              <a className="text-link" href={github} target="_blank" rel="noreferrer">
                Visit GitHub profile <ArrowUpRight size={16} />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={photo !== null} onOpenChange={o => { if (!o) setPhoto(null); }}>
        <DialogContent className="photo-dialog">
          <DialogTitle>Visual journal</DialogTitle>
          <DialogDescription>A moment from Priyanshi’s personal photo collection.</DialogDescription>
          {photo && <img src={'/images/' + photo} alt="Priyanshi Srivastava" />}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Pathways() {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState('Complete');

  function choose(m: string) {
    setMode(m);
    setOpen(false);
    setTimeout(() => {
      document.getElementById(m === 'Frontend' ? 'projects' : m === 'AI & Data' ? 'skills' : 'home')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <>
      <Button className="pathway-toggle" variant="outline" onClick={() => setOpen(true)}>
        <Layers size={14} /> {mode} <span> / Change view</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pathway-dialog">
          <div className="eyebrow">000 // CHOOSE YOUR PERSPECTIVE</div>
          <DialogTitle className="pathway-title">
            Priyanshi Srivastava<span>Portfolio.</span>
          </DialogTitle>
          <DialogDescription>
            Development, discovery, and everything in between.<br />Choose where you’d like to begin.
          </DialogDescription>
          <div className="pathway-grid">
            {[
              {
                title: 'The complete picture',
                mode: 'Complete',
                label: 'ALL OF ME',
                icon: Layers,
                description: 'My work, journey, skills, and the person behind the code.'
              },
              {
                title: 'Frontend & interfaces',
                mode: 'Frontend',
                label: 'BUILD & CREATE',
                icon: Code2,
                description: 'Responsive websites and thoughtful digital experiences.'
              },
              {
                title: 'AI & data',
                mode: 'AI & Data',
                label: 'EXPLORE & DISCOVER',
                icon: BrainCircuit,
                description: 'My growing toolkit in AI, programming, and data analytics.'
              }
            ].map((p, i) => (
              <button key={p.mode} onClick={() => choose(p.mode)}>
                <div className="card-top">
                  <span>0{i + 1}</span>
                  <p.icon size={22} />
                </div>
                <small>{p.label}</small>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="pathway-enter">
                  Explore pathway <ArrowUpRight size={15} />
                </span>
              </button>
            ))}
          </div>
          <Button variant="link" onClick={() => choose('Complete')}>
            Take me to the full portfolio <ArrowRight size={16} />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
