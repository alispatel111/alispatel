'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Download, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  
  const roles = ['MERN Stack Developer', 'Full Stack Developer', 'React Developer', 'Node.js Developer'];
  
  // Initialize animations on page load
  useEffect(() => {
    // Trigger animations after a brief delay for smooth entrance
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.classList.add('slide-in-left');
      }
    }, 100);

    setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.classList.add('slide-in-right');
      }
    }, 400);

    // Cleanup on unmount
    return () => {
      if (contentRef.current) {
        contentRef.current.classList.remove('slide-in-left');
      }
      if (imageRef.current) {
        imageRef.current.classList.remove('slide-in-right');
      }
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentRole = roles[textIndex];
      
      if (!isDeleting && charIndex < currentRole.length) {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % roles.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const handleResumeDownload = () => {
    const resumeUrl = '/alis-resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Alis-Patel-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-16 pb-10 md:pt-24 md:pb-12 relative overflow-hidden flex items-center justify-center bg-white"
    >
      {/* Enhanced Background Bubbles (from Projects section) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Bubble 1 */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute top-10 left-5 md:left-10 w-32 h-32 md:w-64 md:h-64 bg-blue-200 rounded-full blur-3xl"
        />
        
        {/* Animated Bubble 2 */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-20 right-5 md:right-20 w-40 h-40 md:w-80 md:h-80 bg-purple-200 rounded-full blur-3xl"
        />
        
        {/* Animated Bubble 3 */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-1/3 right-10 md:right-1/4 w-24 h-24 md:w-48 md:h-48 bg-cyan-200 rounded-full blur-3xl"
        />
        
        {/* Animated Bubble 4 */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-1/4 left-10 md:left-1/4 w-28 h-28 md:w-56 md:h-56 bg-pink-200 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                             linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        {/* Original floating bubbles (keep them too) */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-50 animate-float" style={{ animationDelay: '0s', animationDuration: '20s' }}></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 animate-float" style={{ animationDelay: '5s', animationDuration: '25s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 animate-float" style={{ animationDelay: '10s', animationDuration: '22s' }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content - Slides from left */}
          <div 
            ref={contentRef}
            className="space-y-6 md:space-y-8"
          >
            {/* Simple Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
              <span className="text-xs md:text-sm font-medium text-gray-700">
                Welcome to my portfolio
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Hi, I'm{' '}
                <span className="text-gray-900">
                  Alis Patel
                </span>
              </h1>
              
              <div className="h-12 md:h-14">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700">
                  <span className="inline-block min-w-[220px] sm:min-w-[260px]">
                    <span className="font-mono text-gray-800">
                      {typedText}
                    </span>
                    <span className="ml-1 w-1 h-4 md:h-6 bg-gray-800 inline-block animate-pulse"></span>
                  </span>
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md">
              I create modern web applications using the MERN stack. 
              Passionate about building efficient, scalable solutions with clean code 
              and great user experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="group px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-900 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden"
              >
                <span className="flex items-center gap-2 relative z-10">
                  View My Projects
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                {/* Hover effect for projects button */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </button>
              
              {/* Resume Download Button with sliding color effect */}
              <button
                onClick={handleResumeDownload}
                className="group px-5 py-2.5 sm:px-6 sm:py-3 font-medium rounded-lg border border-gray-300 text-gray-700 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden"
              >
                {/* Main button content */}
                <span className="flex items-center gap-2 relative z-10 transition-all duration-300 group-hover:text-white">
                  Download Resume
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                </span>
                
                {/* Static background */}
                <div className="absolute inset-0 bg-white rounded-lg transition-all duration-300"></div>
                
                {/* Hover background - slides in from left */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-out"></div>
                
                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-500 transition-all duration-500"></div>
                
                {/* Extra hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"></div>
              </button>
            </div>
          </div>

          {/* Right Side - Slides from right with hover effects */}
          <div 
            ref={imageRef}
            className="flex items-center justify-center mt-8 lg:mt-0 mr-0 lg:ml-18"
          >
            <div 
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 group cursor-pointer"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              {/* Main circular image container with hover effects */}
              <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg md:shadow-xl border-4 border-white transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src="/alis.jpg"
                  alt="Alis Patel - MERN Stack Developer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-full"></div>
              </div>
              
              {/* Decorative ring with hover effect */}
              <div className="absolute inset-0 rounded-full border-[10px] sm:border-[12px] border-gray-100 transition-all duration-500 group-hover:border-gray-200 group-hover:scale-105"></div>
              
              {/* Glowing ring effect on hover */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:to-purple-400/20 blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
              
              {/* Floating tech badges on hover */}
              <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                isImageHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'
              }`}>
                {/* <div className="px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-200 flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">React</span>
                </div> */}
              </div>
              
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                isImageHovered ? 'opacity-100 translate-y-1' : 'opacity-0 translate-y-0'
              }`}>
                {/* <div className="px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-200 flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">Node.js</span>
                </div> */}
              </div>
              
              <div className={`absolute top-1/2 -right-2 transform -translate-y-1/2 transition-all duration-500 ${
                isImageHovered ? 'opacity-100 translate-x-1' : 'opacity-0 translate-x-0'
              }`}>
                {/* <div className="px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-200 flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">MongoDB</span>
                </div> */}
              </div>
              
              <div className={`absolute top-1/2 -left-2 transform -translate-y-1/2 transition-all duration-500 ${
                isImageHovered ? 'opacity-100 -translate-x-1' : 'opacity-0 -translate-x-0'
              }`}>
                {/* <div className="px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-200 flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">Express</span>
                </div> */}
              </div>
              
              {/* Hover text */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                isImageHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                {/* <div className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center group hover:shadow-md hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:translate-y-0.5 transition-transform duration-300 relative z-10" />
          {/* Hover effect for scroll button */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
        
        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes colorSlide {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-float {
          animation: float infinite ease-in-out;
        }
        
        /* Left side content animation */
        [ref="contentRef"] {
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        /* Right side image animation */
        [ref="imageRef"] {
          opacity: 0;
          transform: translateX(100px);
        }
        
        .slide-in-right {
          animation: slideInRight 0.8s ease-out 0.3s forwards;
        }
        
        .color-slide-in {
          animation: colorSlide 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero; 