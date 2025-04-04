import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Information from './pages/Information';
import Production from './pages/Production';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import Order from './pages/Order';
import Profile from './pages/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/information" element={<Information />} />
            <Route path="/production" element={<Production />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/order" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;