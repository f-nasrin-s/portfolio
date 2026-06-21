import React, { useEffect, useRef } from 'react';

/* ---------- Neural network canvas background ---------- */
function NetCanvas(){
  const ref = useRef(null);
  useEffect(()=>{
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w, h, nodes, raf;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize(){
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio; canvas.height = h * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    function init(){
      const count = w < 700 ? 26 : 46;
      nodes = Array.from({length: count}, () => ({
        x: Math.random()*w, y: Math.random()*h,
        vx: (Math.random()-0.5)*0.18, vy: (Math.random()-0.5)*0.18
      }));
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      nodes.forEach(n=>{
        if(!reduceMotion){
          n.x += n.vx; n.y += n.vy;
          if(n.x<0||n.x>w) n.vx*=-1;
          if(n.y<0||n.y>h) n.vy*=-1;
        }
      });
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const a=nodes[i], b=nodes[j];
          const d = Math.hypot(a.x-b.x, a.y-b.y);
          if(d<150){
            ctx.strokeStyle = `rgba(94,234,212,${(1-d/150)*0.18})`;
            ctx.lineWidth=1;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      nodes.forEach(n=>{
        ctx.fillStyle='rgba(94,234,212,0.7)';
        ctx.beginPath(); ctx.arc(n.x,n.y,1.6,0,Math.PI*2); ctx.fill();
      });
      if(!reduceMotion) raf = requestAnimationFrame(draw);
    }
    resize(); init(); draw();
    const onResize = ()=>{ resize(); init(); };
    window.addEventListener('resize', onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  },[]);
  return <canvas id="netCanvas" ref={ref}></canvas>;
}

/* ---------- Data ---------- */
const SKILLS = [
  { title:"Programming", items:["Python","SQL","Java"] },
  { title:"Machine Learning", items:["Model Development","Model Evaluation","Autoencoders"] },
  { title:"Data & Visualization", items:["Pandas","NumPy","EDA","Matplotlib","Plotly"] },
  { title:"Web Development", items:["HTML","CSS","JavaScript","Responsive UI"] },
  { title:"Tools", items:["Streamlit","KNIME","Jupyter","VS Code","MySQL"] },
  { title:"Concepts", items:["API Integration","Dashboards","Real-time Data","DSA Fundamentals"] },
];

const PROJECTS = [
  {
    title:"Anomaly Detection System",
    stack:"Python · Autoencoders · Scikit-learn",
    desc:"Autoencoder-based model that flags abnormal patterns in real-world datasets, built to catch outliers that rule-based checks miss.",
    github:"https://github.com/f-nasrin-s",
    demo:null
  },
  {
    title:"SmartSaver — AI-Powered Financial Advisor",
    stack:"Flutter · FastAPI · BERT · Firebase",
    desc:"Voice-enabled, multilingual financial assistant that uses a BERT-based chatbot and ML models to give personalised saving advice.",
    github:"https://github.com/f-nasrin-s",
    demo:null
  },
  {
    title:"Smart City Pollution Intelligence Platform",
    stack:"Python · ML · APIs · Streamlit",
    desc:"Real-time AQI prediction platform pulling live data through APIs, with a Streamlit dashboard for city-level pollution monitoring.",
    github:"https://github.com/f-nasrin-s",
    demo:null
  },
  {
    title:"Asteroid Mining Potential Analyzer",
    stack:"Python · Image Analysis · ML",
    desc:"AI-based image analysis pipeline for asteroid classification, mineral detection, hazard analysis, and mining-potential evaluation.",
    github:"https://github.com/f-nasrin-s",
    demo:null
  },
  {
    title:"IoT-Based Smart Biofloc Monitoring System",
    stack:"IoT · Python · ML — Ongoing",
    desc:"Combines IoT sensors with ML to monitor water quality in real time and predict risks in aquaculture biofloc systems.",
    github:"https://github.com/f-nasrin-s",
    demo:null
  },
];

const ACHIEVEMENTS = [
  { rank:"TOP 25", text:"All India Women Hackathon 2025 — WWT" },
  { rank:"TOP 6", text:"Google TechSprint Hackathon", sub:"GDG Jain University" },
  { rank:"TOP 35", text:"Astrava 24-Hour National Hackathon", sub:"out of 1200+ teams · Dr. AIT" },
  { rank:"TOP 50", text:"Crackathon 2026", sub:"GDG on Campus, Presidency University" },
  { rank:"WINNER", text:"Appreciation Award — Grinova Ideathon 2026", sub:"Where Local Problems Meet Smart Solutions" },
  { rank:"SELECTED", text:"Ideathon 2025 — Galactic Problem Solver", sub:"NASA Space Apps Challenge" },
  { rank:"ATTENDED", text:"AI in Defence & Aerospace Summit", sub:"Globals Inc. & BEL" },
  { rank:"COMPLETED", text:"Girls Who ML Workshop", sub:"Hands-on ML learning" },
];

function App(){
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Education />
      <Footer />
    </React.Fragment>
  );
}

function Nav(){
  return (
    <nav>
      <div className="nav-inner">
        <div className="brand">FAJEELA<span>.</span>N</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#achievements">Achievements</a>
          <a href="#education">Education</a>
        </div>
        <a className="nav-cta" href="#contact">Contact</a>
      </div>
    </nav>
  );
}

function Hero(){
  return (
    <header className="hero">
      <NetCanvas />
      <div className="wrap hero-inner">
        <div className="eyebrow"><span className="dot"></span>AVAILABLE FOR INTERNSHIPS · 2026</div>
        <h1>Fajeela Nasrin S — building <span className="grad">real AI systems</span>, not just notebooks.</h1>
        <p className="lead">AIML undergraduate with hands-on experience across anomaly detection, NLP chatbots, real-time dashboards, and IoT-integrated ML. I like turning messy data into systems people can actually use.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">View Projects →</a>
          <a className="btn btn-ghost" href="https://github.com/f-nasrin-s" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn btn-ghost" href="https://www.linkedin.com/in/fajeela-nasrin-s-318710322" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="hero-stats">
          <div><div className="stat-num">9.8</div><div className="stat-label">CGPA / 10</div></div>
          <div><div className="stat-num">5</div><div className="stat-label">ML PROJECTS SHIPPED</div></div>
          <div><div className="stat-num">8+</div><div className="stat-label">HACKATHONS</div></div>
        </div>
      </div>
    </header>
  );
}

function About(){
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div className="about-text">
          <span className="section-tag">01 — ABOUT</span>
          <h2 style={{marginBottom:18}}>A bit about how I work</h2>
          <p>I'm an <strong>AIML student</strong> with hands-on experience developing real-world AI solutions — skilled in <strong>Python, machine learning, data analysis, and dashboard development</strong>. Most of my projects start from a real problem (pollution, finance, aquaculture, even asteroid mining) rather than a textbook dataset.</p>
          <p style={{marginTop:16}}>Alongside ML, I'm actively building my <strong>web development</strong> skills so I can ship full systems — model, backend, and interface — instead of stopping at a notebook. I learn fastest through hackathons, and it shows in how often I show up to them.</p>
        </div>
        <div className="focus-card">
          <h3>CURRENT FOCUS</h3>
          <div className="focus-row"><span>Degree</span><span>B.Tech CSE – AIML</span></div>
          <div className="focus-row"><span>Year</span><span>Entering 3rd Year</span></div>
          <div className="focus-row"><span>CGPA</span><span>9.8 / 10 (till 3rd sem)</span></div>
          <div className="focus-row"><span>Core interest</span><span>Applied ML systems</span></div>
          <div className="focus-row"><span>Learning now</span><span>Full-stack + Deployment</span></div>
        </div>
      </div>
    </section>
  );
}

function Skills(){
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-head">
          <span className="section-tag">02 — SKILLS</span>
          <h2>What I build with</h2>
        </div>
        <div className="skill-grid">
          {SKILLS.map((s,i)=>(
            <div className="skill-card" key={i}>
              <h4>{s.title}</h4>
              <div className="skill-tags">
                {s.items.map((it,j)=>(<span className="tag" key={j}>{it}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects(){
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <span className="section-tag">03 — PROJECTS</span>
          <h2>Things I've shipped</h2>
          <p>Five projects spanning anomaly detection, NLP, geospatial dashboards, computer vision, and IoT.</p>
        </div>
        <div className="project-list">
          {PROJECTS.map((p,i)=>(
            <div className="project" key={i}>
              <div className="pnum">{String(i+1).padStart(2,'0')}</div>
              <div>
                <h3>{p.title}</h3>
                <div className="stack-line">{p.stack}</div>
                <p>{p.desc}</p>
                <div className="project-links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer">View Code ↗</a>
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">Live Demo ↗</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements(){
  return (
    <section id="achievements">
      <div className="wrap">
        <div className="section-head">
          <span className="section-tag">04 — ACHIEVEMENTS</span>
          <h2>Hackathons & recognition</h2>
        </div>
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a,i)=>(
            <div className="ach-item" key={i}>
              <span className="ach-rank">{a.rank}</span>
              <div>
                <p>{a.text}</p>
                {a.sub && <div className="sub">{a.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education(){
  return (
    <section id="education">
      <div className="wrap">
        <div className="section-head">
          <span className="section-tag">05 — EDUCATION</span>
          <h2>Academic background</h2>
        </div>
        <div>
          <div className="edu-line">
            <div className="edu-year">2024 — 2028</div>
            <div className="edu-body">
              <h4>B.Tech in CSE – AIML</h4>
              <div className="sub">Jain University of Engineering & Technology, Bangalore</div>
              <div className="cgpa">CGPA: 9.8 / 10 (till 3rd semester)</div>
            </div>
          </div>
          <div className="edu-line">
            <div className="edu-year">2022 — 2023</div>
            <div className="edu-body">
              <h4>Higher Secondary (Class XII)</h4>
              <div className="sub">SBK International School</div>
              <div className="cgpa">Percentage: 89.6%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="contact-box">
          <h2>Let's build something together.</h2>
          <p>Open to AI/ML internships, research collaborations, and interesting problems.</p>
          <div className="contact-links">
            <a className="btn btn-primary" href="mailto:fajeelanasrins2@gmail.com">Email Me</a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/fajeela-nasrin-s-318710322" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn btn-ghost" href="https://github.com/f-nasrin-s" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Fajeela Nasrin S.</span>
          <span className="mono">fajeelanasrins2@gmail.com · +91 9786648488</span>
        </div>
      </div>
    </footer>
  );
}

export default App;