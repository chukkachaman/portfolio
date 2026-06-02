import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loader">
      <div className="loader-ring"></div>
      <p>Loading Portfolio...</p>
    </div>
  );

  return (
    <div className="app">
      <Navbar personal={data?.personal} />
      <Hero personal={data?.personal} />
      <About personal={data?.personal} />
      <Skills skills={data?.skills} />
      <Experience experience={data?.experience} />
      <Projects projects={data?.projects} />
      <Contact personal={data?.personal} />
      <Footer personal={data?.personal} />
    </div>
  );
}

export default App;
