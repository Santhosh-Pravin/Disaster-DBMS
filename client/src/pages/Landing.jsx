import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Users, Tent, PackageSearch, MonitorCheck, TrendingUp, HandHeart, Activity, FileWarning, ArrowRight } from 'lucide-react';
import '../index.css';

const Landing = () => {
  const features = [
    { title: "Disaster Tracking", desc: "Real-time updates on location, severity, and active status.", icon: <ShieldAlert size={28} className="landing-icon text-blue-300" /> },
    { title: "Affected Area Management", desc: "Analyze impacted regions and track populations affected.", icon: <TrendingUp size={28} className="landing-icon text-blue-300" /> },
    { title: "Victim Management", desc: "Accurate tracking of victim status and camp allocations.", icon: <Users size={28} className="landing-icon text-blue-300" /> },
    { title: "Rescue Team Management", desc: "Coordinate deployment of specialized rescue forces.", icon: <MonitorCheck size={28} className="landing-icon text-blue-300" /> },
    { title: "Relief Camp Management", desc: "Monitor camp capacities and prevent overcrowding.", icon: <Tent size={28} className="landing-icon text-blue-300" /> },
    { title: "Resource Management", desc: "Track food, water, and medical supplies effortlessly.", icon: <PackageSearch size={28} className="landing-icon text-blue-300" /> },
    { title: "Volunteer Management", desc: "Deploy volunteers to rescue ops or camps efficiently.", icon: <HandHeart size={28} className="landing-icon text-blue-300" /> },
    { title: "Emergency Request System", desc: "Process and fulfill urgent requests from impacted areas.", icon: <Activity size={28} className="landing-icon text-blue-300" /> },
    { title: "Reports & Analysis", desc: "Generate advanced analytics on disasters and shortages.", icon: <FileWarning size={28} className="landing-icon text-blue-300" /> }
  ];

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <ShieldAlert size={28} className="text-blue-eclipse-light" />
          <span>CrisisResponse</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#docs">Docs</a>
        </div>
        <div className="landing-nav-buttons">
          <Link to="/login" className="btn-outline">Log In</Link>
          <Link to="/login" className="btn-primary">Launch App</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-badge">● Institutional Grade Intelligence</div>
        <h1 className="hero-title">CRISIS-RESPONSE</h1>
        <h1 className="hero-subtitle">DISASTER MANAGEMENT SYSTEM</h1>
        <p className="hero-desc">
          Real-time intelligence with predictive modeling and built-in dispatch discipline. 
          Stop tracking on noise. Start tracking on signal.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-dark">
            View Dashboard <ArrowRight size={18} className="ml-2 inline-block"/>
          </Link>
          <a href="#how-it-works" className="btn-outline">How It Works</a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="landing-features">
        <h2>Disaster Intelligence</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="landing-capabilities">
        <h2 className="title-highlight">Enter CrisisResponse</h2>
        <p className="subtitle-highlight">The first resilience intelligence layer combining analytics with execution protocols.</p>
        <div className="cap-grid">
          <div className="cap-card">
            <div className="cap-icon">⚙️</div>
            <h3>AI-Powered Clarity</h3>
            <p>Advanced models filter out noise to bring you factual ground truths.</p>
          </div>
          <div className="cap-card">
            <div className="cap-icon">🛡️</div>
            <h3>Institutional Safety</h3>
            <p>Reliability-weighted scoring protects deployed personnel and assets.</p>
          </div>
          <div className="cap-card">
            <div className="cap-icon">⚡</div>
            <h3>Execution Speed</h3>
            <p>Real-time analytics faster than traditional reporting channels.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <ShieldAlert size={28} className="text-blue-eclipse-light" />
            <span>CrisisResponse</span>
          </div>
          <div className="footer-links">
            <a href="#">Product</a>
            <a href="#">Features</a>
            <a href="#">Docs</a>
            <a href="#">Disclaimer</a>
          </div>
        </div>
        <p className="footer-copy">© 2026 CrisisResponse AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
