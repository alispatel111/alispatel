'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Code, Briefcase, FolderOpen, Mail, User } from 'lucide-react'; // User icon import kiya hai

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Navbar background effect
      setIsScrolled(currentScrollY > 50);

      // Navbar hide/show on scroll
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or at top - show navbar
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setIsNavVisible(false);
      }

      setLastScrollY(currentScrollY);

      // Update active section based on scroll
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User }, // User icon yahan use ho raha hai
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      // Show navbar when clicking a link
      setIsNavVisible(true);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${isNavVisible
          ? 'top-0 opacity-100 translate-y-0'
          : '-top-24 opacity-0 translate-y-[-100%] pointer-events-none'
        } ${isScrolled
          ? 'py-3 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200'
          : 'py-5 bg-white border-b border-gray-100'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Changed from profile to logo image */}
          <button
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              {/* Logo image instead of icon */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl shadow-md">
                <img
                  src="/hero/alis-logo.png" // Your logo path in public folder
                  alt="Alis Patel Logo"
                  className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if logo doesn't exist
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold';
                    fallback.textContent = 'AP';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
              </div>
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl text-gray-900 tracking-tight transition-all duration-300 group-hover:text-blue-700">Alis Patel
              </span>
              <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                MERN Developer
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-5 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group cursor-pointer mx-1 ${activeSection === item.id
                      ? 'text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <Icon className={`w-4 h-4 relative z-10 transition-transform duration-300 ${activeSection === item.id
                      ? 'text-blue-600'
                      : 'group-hover:text-blue-600 group-hover:scale-110'
                    }`} />

                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
                    {item.label}
                  </span>

                  {/* Hover background effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/50 group-hover:to-cyan-50/50 transition-all duration-300"></div>

                  {/* Simple underline for active state */}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300"></div>
                  )}

                  {/* Hover underline effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-700 hover:text-gray-900 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow relative group"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <Menu className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-90" />
            )}

            {/* Mobile menu button hover effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-100/0 to-cyan-100/0 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300"></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 group cursor-pointer relative overflow-hidden ${activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-l-4 border-blue-600'
                      : 'bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-200'
                    }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${activeSection === item.id
                      ? 'text-blue-600'
                      : 'group-hover:text-blue-600 group-hover:scale-110'
                    }`} />

                  <span className="transition-all duration-300 group-hover:translate-x-2">
                    {item.label}
                  </span>

                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  )}

                  {/* Mobile hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/30 group-hover:to-cyan-50/30 transition-all duration-300"></div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;