'use client';

import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navigation({ theme, toggleTheme, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'games', label: 'Games' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">Nirmit</div>

          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <div className="theme-toggle" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <div 
          className="menu-overlay active"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}