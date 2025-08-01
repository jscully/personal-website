import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import BlogList from '../components/BlogList';

const Home: React.FC = () => {
  return (
    <>
      <Hero 
        name="Joe Scully"
        tagline="Software & Strategy Hobbiest"
        description="I build things, write things, test things"
      />
      <About />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;