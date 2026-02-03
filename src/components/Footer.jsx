'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, User, FolderKanban, Code, Mail, ArrowUp, MapPin, Phone, Globe, Github, Linkedin, Twitter, X } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHoveringScroll, setIsHoveringScroll] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const bottomSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (leftSectionRef.current) observer.observe(leftSectionRef.current);
    if (rightSectionRef.current) observer.observe(rightSectionRef.current);
    if (bottomSectionRef.current) observer.observe(bottomSectionRef.current);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { label: 'Home', icon: Home, href: '#home' },
    { label: 'About', icon: User, href: '#about' },
    { label: 'Projects', icon: FolderKanban, href: '#projects' },
    { label: 'Skills', icon: Code, href: '#skills' },
    { label: 'Contact', icon: Mail, href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/alispatel111', label: 'GitHub' },
    { icon: Linkedin, href: "https://www.linkedin.com/in/alispatel?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: 'LinkedIn' },
    {
  icon: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-label="X (Twitter)"
    >
      <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.6L5.2 22H2l8-9.1L1 2h6.9l4.8 6L18.9 2z" />
    </svg>
  ),
  href: '#',
  label: 'X',
}
,
    { icon: Globe, href: 'https://alispatel.vercel.app', label: 'Portfolio' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Enhanced Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHoveringScroll(true)}
        onMouseLeave={() => setIsHoveringScroll(false)}
        className={` cursor-pointer fixed z-50 transition-all duration-500 ease-out ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
        }}
        aria-label="Back to top"
      >
        <div className="relative">
          {/* Hover Label */}
          <div className={`absolute right-full mr-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
            isHoveringScroll 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-4'
          }`}>
            <div className="bg-white border border-gray-200 shadow-xl rounded-lg px-4 py-2.5 flex items-center gap-2 whitespace-nowrap">
              <ArrowUp className="w-4 h-4 text-blue-600" />
              <span className="text-gray-800 font-semibold text-sm">Back to Top</span>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-r border-t border-gray-200 rotate-45"></div>
            </div>
          </div>

          {/* Main Button */}
          <div className={`relative w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${
            isHoveringScroll 
              ? 'scale-110 shadow-2xl bg-gradient-to-br from-blue-600 to-blue-700' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </button>

      {/* Main Footer */}
      <footer className="relative bg-white border-t border-gray-100 pt-14 pb-12 overflow-hidden">
        
        {/* Floating Bubbles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-50/40 to-blue-100/30"
              style={{
                width: `${Math.random() * 80 + 20}px`,
                height: `${Math.random() * 80 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 20 + 15}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(10px)',
                opacity: 0.7,
              }}
            />
          ))}
        </div>

        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-14">
            
            {/* Left Section - Brand & Info - Animation from left */}
            <div 
              ref={leftSectionRef}
              className={`space-y-8 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-20'
              }`}
              style={{
                transitionDelay: '200ms'
              }}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 flex items-center justify-center shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Alis Patel</h2>
                    <p className="text-blue-600 font-semibold mt-1">MERN Stack Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Passionate about building modern web applications with clean code, 
                  scalable architecture, and exceptional user experiences.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700 transition-transform duration-300 hover:translate-x-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">alispatel123098@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700 transition-transform duration-300 hover:translate-x-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">Vadodara,India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Icon Navigation - Animation from right */}
            <div 
              ref={rightSectionRef}
              className={`transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-20'
              }`}
              style={{
                transitionDelay: '400ms'
              }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Navigation</h3>
                <p className="text-gray-500 text-sm">Hover over icons to see labels</p>
              </div>
              
              {/* Icon Navigation Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6">
                {navItems.map((item, index) => (
                  <div 
                    key={item.label} 
                    className="relative"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      onMouseEnter={() => setActiveIcon(item.label)}
                      onMouseLeave={() => setActiveIcon(null)}
                      className={`group w-full aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden transform hover:-translate-y-1 ${
                        isVisible ? 'animate-fadeInUp' : 'opacity-0'
                      }`}
                      style={{
                        animationDelay: `${index * 100 + 600}ms`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      {/* Hover Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Icon Container */}
                      <div className={`relative z-10 p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                        activeIcon === item.label 
                          ? 'bg-gradient-to-br from-blue-100 to-blue-200 scale-110' 
                          : 'bg-white'
                      }`}>
                        <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                          activeIcon === item.label ? 'text-blue-600 scale-110' : 'text-gray-600'
                        }`} />
                      </div>
                    </button>
                    
                    {/* Label Tooltip */}
                    <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                      activeIcon === item.label 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                      <div className="px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg whitespace-nowrap">
                        {item.label}
                        {/* Tooltip Arrow */}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links - UPDATED */}
              <div className={`mt-12 pt-8 border-t border-gray-100 transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: '800ms'
              }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Connect with me</h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`group relative p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:scale-110 hover:shadow-lg transform ${
                        isVisible ? 'animate-fadeInUp' : 'opacity-0'
                      }`}
                      style={{
                        animationDelay: `${index * 100 + 1000}ms`,
                        animationFillMode: 'forwards'
                      }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-110" />
                      {/* Social Label Tooltip */}
                      <div className="  absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {social.label}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Section - Animation from bottom center */}
          <div 
            ref={bottomSectionRef}
            className={`pt-8 border-t border-gray-200 transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
            style={{
              transitionDelay: '1200ms'
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-700 font-medium">
                  © {currentYear} Alis Patel. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Crafted with precision and passion
                </p>
              </div>

              

            </div>
          </div>

        </div>
        
        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(5deg);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;