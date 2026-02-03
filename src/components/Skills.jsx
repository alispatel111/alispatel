'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Target, TrendingUp, CheckCircle, Rocket, ChevronRight, Zap } from 'lucide-react';

const Skills = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Color configurations for different skill categories
  const categoryColors = {
    // 'Frontend': { filter: 'invert(44%) sepia(99%) saturate(2000%) hue-rotate(350deg) brightness(95%) contrast(90%)' }, // Orange-red
    // 'Styling': { filter: 'invert(40%) sepia(100%) saturate(1500%) hue-rotate(210deg) brightness(95%) contrast(90%)' }, // Blue-indigo
    // 'Language': { filter: 'invert(83%) sepia(100%) saturate(1500%) hue-rotate(360deg) brightness(105%) contrast(90%)' }, // Yellow
    // 'Backend': { filter: 'invert(50%) sepia(100%) saturate(1000%) hue-rotate(90deg) brightness(90%) contrast(90%)' }, // Green
    // 'Database': { filter: 'invert(60%) sepia(100%) saturate(800%) hue-rotate(100deg) brightness(90%) contrast(90%)' }, // Emerald
    // 'Version Control': { filter: 'invert(44%) sepia(99%) saturate(2000%) hue-rotate(350deg) brightness(95%) contrast(90%)' }, // Orange-red
    // 'AI Tools': { filter: 'invert(60%) sepia(100%) saturate(1200%) hue-rotate(120deg) brightness(90%) contrast(90%)' }, // Green-blue
  };

  const skillsData = [
    {
      id: 1,
      title: 'HTML',
      category: 'Frontend',
      iconPath: '/icons/html.png',
      color: 'from-orange-500 to-red-600',
      gradient: 'bg-gradient-to-br from-orange-250 to-red-300',
      proficiency: 95,
      backContent: [
        { icon: CheckCircle, text: 'Semantic HTML5' },
        { icon: CheckCircle, text: 'Accessibility (ARIA)' },
        { icon: CheckCircle, text: 'SEO Optimization' },
        { icon: CheckCircle, text: 'Cross-browser Compatibility' },
        { icon: CheckCircle, text: 'Web Performance' }
      ],
      description: 'Expert in writing clean, semantic HTML5 markup with strong focus on accessibility standards (WCAG), SEO optimization, and cross-browser compatibility for building accessible and performant web foundations.'
    },
    {
      id: 2,
      title: 'CSS',
      category: 'Styling',
      iconPath: '/icons/css.png',
      color: 'from-blue-500 to-indigo-600',
      gradient: 'bg-gradient-to-br from-blue-250 to-indigo-300',
      proficiency: 79,
      backContent: [
        { icon: CheckCircle, text: 'CSS Grid & Flexbox' },
        { icon: CheckCircle, text: 'Responsive Design' },
        { icon: CheckCircle, text: 'CSS Animations' },
        { icon: CheckCircle, text: 'CSS Variables' },
        { icon: CheckCircle, text: 'Cross-browser Styling' }
      ],
      description: 'Proficient in modern CSS techniques including Flexbox, CSS Grid, and custom properties (CSS Variables) to create responsive, animated, and visually appealing user interfaces across all device sizes.'
    },
    {
      id: 3,
      title: 'JavaScript',
      category: 'Language',
      iconPath: '/icons/javascript.png',
      color: 'from-yellow-500 to-yellow-600',
      gradient: 'bg-gradient-to-br from-yellow-250 to-yellow-300',
      proficiency: 85,
      backContent: [
        { icon: CheckCircle, text: 'ES6+ Features' },
        { icon: CheckCircle, text: 'DOM Manipulation' },
        { icon: CheckCircle, text: 'Async/Await' },
        { icon: CheckCircle, text: 'Functional Programming' },
        { icon: CheckCircle, text: 'Event Handling' }
      ],
      description: 'Strong command of modern JavaScript (ES6+) with expertise in asynchronous programming, DOM manipulation, event handling, and functional programming concepts for building dynamic web applications.'
    },
    {
      id: 4,
      title: 'React',
      category: 'Frontend',
      iconPath: '/icons/react.png',
      color: 'from-blue-600 to-cyan-600', // Darker colors
      gradient: 'bg-gradient-to-br from-blue-600 to-cyan-600',
      proficiency: 80,
      backContent: [
        { icon: CheckCircle, text: 'Component Architecture' },
        { icon: CheckCircle, text: 'Hooks (useState, useEffect)' },
        { icon: CheckCircle, text: 'Context API' },
        { icon: CheckCircle, text: 'React Router' },
        { icon: CheckCircle, text: 'Performance Optimization' }
      ],
      description: 'Experienced in building scalable React applications using functional components, hooks, and Context API. Skilled in component-based architecture, routing, and performance optimization techniques.'
    },
    {
      id: 5,
      title: 'Node.js',
      category: 'Backend',
      iconPath: '/icons/node.png',
      color: 'from-green-600 to-emerald-700',
      gradient: 'bg-gradient-to-br from-green-100 to-emerald- 150',
      proficiency: 50,
      backContent: [
        { icon: CheckCircle, text: 'File System Operations' },
        { icon: CheckCircle, text: 'HTTP Module' },
        { icon: CheckCircle, text: 'NPM Packages' },
        { icon: CheckCircle, text: 'Basic Server Setup' },
        { icon: CheckCircle, text: 'Environment Variables' }
      ],
      description: 'Familiar with Node.js runtime environment for building server-side applications, handling file operations, creating basic servers, and managing dependencies through NPM ecosystem.'
    },
    {
      id: 6,
      title: 'MongoDB',
      category: 'Database',
      iconPath: '/icons/mongodb.png',
      color: 'from-green-500 to-emerald-600',
      gradient: 'bg-gradient-to-br from-green-100 to-emerald-150',
      proficiency: 60,
      backContent: [
        { icon: CheckCircle, text: 'CRUD Operations' },
        { icon: CheckCircle, text: 'Database Design' },
        { icon: CheckCircle, text: 'Mongoose ODM' },
        { icon: CheckCircle, text: 'Basic Queries' },
        { icon: CheckCircle, text: 'Data Modeling' }
      ],
      description: 'Practical experience with MongoDB NoSQL database including CRUD operations, data modeling, and using Mongoose ODM for efficient database interactions in modern web applications.'
    },
    {
      id: 7,
      title: 'Express.js',
      category: 'Backend',
      iconPath: '/icons/express.png',
      color: 'from-gray-300 to-gray-400',
      gradient: 'bg-gradient-to-br from-gray-250 to-gray-300',
      proficiency: 60,
      backContent: [
        { icon: CheckCircle, text: 'Routing' },
        { icon: CheckCircle, text: 'Middleware Setup' },
        { icon: CheckCircle, text: 'Error Handling' },
        { icon: CheckCircle, text: 'Request/Response Cycle' },
        { icon: CheckCircle, text: 'Basic API Development' }
      ],
      description: 'Proficient in Express.js framework for building RESTful APIs, implementing middleware, handling routing, and managing request-response cycles in Node.js applications.'
    },
    {
      id: 8,
      title: 'Git & GitHub',
      category: 'Version Control',
      iconPath: '/icons/github.png',
     color: 'from-orange-500 to-gray-900',
gradient: 'bg-gradient-to-br from-orange-500 to-gray-900',
      proficiency: 70,
      backContent: [
        { icon: CheckCircle, text: 'Version Control' },
        { icon: CheckCircle, text: 'Branch Management' },
        { icon: CheckCircle, text: 'Pull Requests' },
        { icon: CheckCircle, text: 'Collaborative Workflows' },
        { icon: CheckCircle, text: 'Basic CI/CD' }
      ],
      description: 'Experienced in Git version control system and GitHub for collaborative development, including branching strategies, pull requests, code reviews, and basic CI/CD pipeline setup.'
    },
    {
      id: 9,
      title: 'Tailwind CSS',
      category: 'Styling',
      iconPath: '/icons/tailwind.png',
      color: 'from-cyan-500 to-teal-300',
      gradient: 'bg-gradient-to-br from-cyan-250 to-teal-300',
      proficiency: 70,
      backContent: [
        { icon: CheckCircle, text: 'Utility-First CSS' },
        { icon: CheckCircle, text: 'Responsive Design' },
        { icon: CheckCircle, text: 'Custom Configuration' },
        { icon: CheckCircle, text: 'Component Styling' },
        { icon: CheckCircle, text: 'Dark Mode' }
      ],
      description: 'Skilled in Tailwind CSS utility-first framework for rapid UI development, creating responsive designs, custom configurations, and implementing dark mode themes efficiently.'
    },
    // {
    //   id: 10,
    //   title: 'REST API',
    //   category: 'Backend',
    //   iconPath: '/icons/rest-api.png',
    //   color: 'from-purple-500 to-violet-600',
    //   gradient: 'bg-gradient-to-br from-purple-250 to-violet-300',
    //   proficiency: 68,
    //   backContent: [
    //     { icon: CheckCircle, text: 'HTTP Methods' },
    //     { icon: CheckCircle, text: 'API Design Principles' },
    //     { icon: CheckCircle, text: 'Request/Response Handling' },
    //     { icon: CheckCircle, text: 'Status Codes' },
    //     { icon: CheckCircle, text: 'API Documentation' }
    //   ],
    //   description: 'Knowledgeable in RESTful API design principles, HTTP methods, status codes, request/response handling, and creating well-documented APIs for client-server communication.'
    // },
    {
      id: 11,
      title: 'ChatGPT',
      category: 'AI Tools',
      iconPath: '/icons/chatgpt.png',
      color: 'from-green-400 to-green-600',
      gradient: 'bg-gradient-to-br from-green-250 to-green-300',
      proficiency: 85,
      backContent: [
        { icon: CheckCircle, text: 'Advanced Prompt Engineering' },
        { icon: CheckCircle, text: 'Code Generation & Debugging' },
        { icon: CheckCircle, text: 'Technical Documentation' },
        { icon: CheckCircle, text: 'Learning & Research Assistant' },
        { icon: CheckCircle, text: 'API Integration Knowledge' }
      ],
      description: 'Advanced proficiency in leveraging ChatGPT for development workflows including expert prompt engineering, code generation, debugging assistance, technical documentation, and API integration research.'
    },
    {
      id: 12,
      title: 'Cursor',
      category: 'AI Tools',
      iconPath: '/icons/cursor-ai.png',
      color: 'from-blue-500 to-blue-600',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      proficiency: 80,
      backContent: [
        { icon: CheckCircle, text: 'AI-Powered Code Editor' },
        { icon: CheckCircle, text: 'Intelligent Code Completion' },
        { icon: CheckCircle, text: 'Refactoring & Optimization' },
        { icon: CheckCircle, text: 'Codebase Understanding' },
        { icon: CheckCircle, text: 'Bug Detection & Fixes' }
      ],
      description: 'Experienced in using Cursor AI-powered editor for intelligent code completion, refactoring, codebase analysis, bug detection, and optimization to enhance development productivity.'
    },
    {
      id: 13,
      title: 'v0 by Vercel',
      category: 'AI Tools',
      iconPath: '/icons/vercel.png',
      color: 'from-gray-900 to-blue-950',
      gradient: 'bg-gradient-to-br from-gray-400 to-blue-650',
      proficiency: 75,
      backContent: [
        { icon: CheckCircle, text: 'AI-Powered UI Generation' },
        { icon: CheckCircle, text: 'React/Tailwind Code Output' },
        { icon: CheckCircle, text: 'Rapid Prototyping' },
        { icon: CheckCircle, text: 'Design to Code Conversion' },
        { icon: CheckCircle, text: 'Component Generation' }
      ],
      description: 'Proficient in using v0 by Vercel for AI-powered UI generation, rapid prototyping, converting designs to production-ready React/Tailwind code, and accelerating frontend development cycles.'
    }
  ];

  // Get the filter style for a specific category
  const getCategoryFilter = (category) => {
    return categoryColors[category] || { filter: 'none' };
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Card animation observer
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            const position = entry.target.dataset.position;

            // Add animation based on position
            entry.target.classList.add('animate-card-slide');
            entry.target.style.setProperty('--slide-direction', position);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe each card
    cardsRef.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) cardObserver.unobserve(card);
      });
    };
  }, []);

  const handleCardHover = (id) => {
    setHoveredCard(id);
    setFlippedCards(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleCardLeave = (id) => {
    setHoveredCard(null);
    setFlippedCards(prev => ({
      ...prev,
      [id]: false
    }));
  };

  // Calculate card position for animation
  const getCardPosition = (index, totalColumns) => {
    const rowIndex = Math.floor(index / totalColumns);
    const colIndex = index % totalColumns;

    if (totalColumns === 1) {
      return 'center';
    } else if (totalColumns === 2) {
      return colIndex === 0 ? 'left' : 'right';
    } else if (totalColumns === 4) {
      if (colIndex === 0) return 'left';
      if (colIndex === 1) return 'center-left';
      if (colIndex === 2) return 'center-right';
      if (colIndex === 3) return 'right';
    }
    return 'center';
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-16 md:py-24 relative overflow-hidden bg-white scroll-mt-16"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/30 to-transparent"></div>
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-blue-100/40 to-cyan-100/40 animate-float-slow"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="absolute top-40 right-20 w-56 h-56 rounded-full bg-gradient-to-r from-purple-100/30 to-pink-100/30 animate-float-medium"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-green-100/30 to-emerald-100/30 animate-float-slow"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-6 hover:shadow-md transition-shadow duration-300">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">
              TECHNICAL MASTERY
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Technical</span> Stack
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Expertise in modern web technologies that power exceptional digital experiences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {skillsData.map((skill, index) => {
            // Calculate responsive position
            let position;
            if (typeof window !== 'undefined') {
              if (window.innerWidth >= 1024) {
                position = getCardPosition(index, 4);
              } else if (window.innerWidth >= 640) {
                position = getCardPosition(index, 2);
              } else {
                position = 'center';
              }
            } else {
              position = 'center';
            }

            // Get the filter style for this skill's category
            const filterStyle = getCategoryFilter(skill.category);

            return (
              <div
                key={skill.id}
                ref={(el) => (cardsRef.current[index] = el)}
                data-card-id={skill.id}
                data-position={position}
                className="relative h-[300px] sm:h-[320px] md:h-[340px]"
                style={{
                  perspective: '1200px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                }}
                onMouseEnter={() => handleCardHover(skill.id)}
                onMouseLeave={() => handleCardLeave(skill.id)}
              >
                {/* Flip Card Container */}
                <div
                  className={`relative w-full h-full cursor-pointer transition-all duration-750 ease-out ${flippedCards[skill.id] ? 'rotate-y-180' : ''
                    }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center'
                  }}
                >
                  {/* Front Side - Card */}
                  <div
                    className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-gray-200/80 p-5 sm:p-6 flex flex-col items-center justify-center group hover:shadow-xl transition-all duration-500 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)'
                    }}
                  >
                    {/* Hover gradient background */}
                    <div className={`absolute inset-0 rounded-2xl ${skill.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    {/* Animated border effect */}
                    <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-500`}></div>

                    {/* Floating particles */}
                    <div className="absolute top-3 right-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 animate-float-fast"></div>
                    </div>

                    {/* Icon container with animation */}
                    <div className={`relative mb-4 sm:mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl ${skill.gradient} flex items-center justify-center relative overflow-hidden`}>
                        {/* Colored logo with CSS filter */}
                        <img
                          src={skill.iconPath}
                          alt={`${skill.title} logo`}
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain relative z-10"
                          style={filterStyle}
                          onError={(e) => {
                            // Fallback if image doesn't exist
                            e.target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-6 h-6 flex items-center justify-center text-white font-bold';
                            fallback.textContent = skill.title.charAt(0);
                            e.target.parentNode.appendChild(fallback);
                          }}
                        />

                        {/* Icon glow */}
                        <div className={`absolute inset-0 ${skill.gradient} opacity-30 blur-sm animate-pulse-slow`}></div>
                      </div>

                      {/* Orbiting dots */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 animate-orbit"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-gradient-to-br from-blue-300 to-cyan-300 animate-orbit-reverse" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Title with animation */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-all duration-300 group-hover:scale-105">
                      {skill.title}
                    </h3>

                    {/* Category badge */}
                    <div className="px-3 py-1 bg-gray-100 rounded-full mb-3 group-hover:bg-gray-200 transition-colors duration-300">
                      <span className="text-xs font-medium text-gray-700">
                        {skill.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 text-center mb-4 px-2 line-clamp-2">
                      {skill.description}
                    </p>

                    {/* Hover instruction */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-1 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span>Hover to explore</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Back Side - Detailed Info */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    {/* Back side glow effect */}
                    <div className={`absolute inset-0 ${skill.gradient} opacity-10`}></div>

                    {/* Header with Proficiency */}
                    <div className="flex items-center justify-between mb-5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${skill.gradient} flex items-center justify-center`}>
                          {/* Back side icon - also using colored filter */}
                          <img
                            src={skill.iconPath}
                            alt={`${skill.title} logo`}
                            className="w-5 h-5 object-contain"
                            style={filterStyle}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'w-5 h-5 flex items-center justify-center text-white font-bold';
                              fallback.textContent = skill.title.charAt(0);
                              e.target.parentNode.appendChild(fallback);
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">{skill.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3 text-cyan-400" />
                              <span className="text-xs sm:text-sm text-cyan-300 font-bold">{skill.proficiency}% Proficiency</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Close indicator */}
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group/close hover:bg-white/20 transition-colors duration-300">
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover/close:text-white rotate-180 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Skills list with icons */}
                    <div className="space-y-2 sm:space-y-3 flex-grow relative z-10">
                      {skill.backContent.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 sm:gap-3 group/item animate-slide-in"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg ${skill.gradient} flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6`}>
                            <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-200 group-hover/item:text-white transition-colors duration-300 group-hover/item:translate-x-1">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Back side footer */}
                    <div className="flex items-center justify-between mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-700/50 relative z-10">
                      <div className="flex items-center gap-2">
                        <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                        <span className="text-xs text-gray-400">Hover to return</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {skill.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover lift effect */}
                <div className={`absolute inset-0 transition-all duration-500 ease-out ${hoveredCard === skill.id ? '-translate-y-4' : ''
                  }`}></div>

                {/* Outer glow effect on hover */}
                <div className={`absolute -inset-4 ${skill.gradient} rounded-3xl opacity-0 transition-all duration-500 blur-xl pointer-events-none ${hoveredCard === skill.id ? 'opacity-20 scale-105' : ''
                  }`}></div>

                {/* Shadow on hover */}
                <div className={`absolute -inset-2 bg-gradient-to-br from-gray-900/20 to-transparent rounded-3xl opacity-0 transition-all duration-500 pointer-events-none ${hoveredCard === skill.id ? 'opacity-100' : ''
                  }`}></div>
              </div>
            );
          })}
        </div>

        {/* Overall Stats */}
        {/* <div className={`mt-12 md:mt-16 lg:mt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '900ms' }}>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  label: 'Technologies Mastered',
                  value: '8+',
                  icon: Sparkles,
                  color: 'from-blue-500 to-cyan-500',
                  description: 'Core technologies'
                },
                {
                  label: 'Average Proficiency',
                  value: '92%',
                  icon: Target,
                  color: 'from-green-500 to-emerald-500',
                  description: 'Skill mastery level'
                },
                {
                  label: 'Projects Delivered',
                  value: '50+',
                  icon: CheckCircle,
                  color: 'from-purple-500 to-pink-500',
                  description: 'Successful projects'
                },
                {
                  label: 'Specializations',
                  value: '4+',
                  icon: Zap,
                  color: 'from-orange-500 to-red-500',
                  description: 'Key areas of expertise'
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group p-3 sm:p-4 md:p-5 rounded-xl hover:bg-gray-50 transition-all duration-500 hover:scale-105 cursor-pointer"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* CTA */}
        <div className={`mt-12 md:mt-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '1100ms' }}>
          <button
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl transition-all duration-300 hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <span className="text-sm sm:text-base">View My Projects</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, -15px) rotate(2deg); }
          50% { transform: translate(0, -20px) rotate(0deg); }
          75% { transform: translate(10px, -15px) rotate(-2deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(15px, -10px) rotate(3deg); }
          66% { transform: translate(-10px, 15px) rotate(-3deg); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.1); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(12px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
        }

        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(10px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(10px) rotate(360deg); }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes card-slide-left {
          0% {
            opacity: 0;
            transform: translateX(-100px) translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        @keyframes card-slide-right {
          0% {
            opacity: 0;
            transform: translateX(100px) translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        @keyframes card-slide-center {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes card-slide-center-left {
          0% {
            opacity: 0;
            transform: translateX(-50px) translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        @keyframes card-slide-center-right {
          0% {
            opacity: 0;
            transform: translateX(50px) translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 4s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbit-reverse 5s linear infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-card-slide {
          animation: card-slide-center 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: calc(var(--card-index, 0) * 0.1s);
        }

        .animate-card-slide[data-position="left"] {
          animation-name: card-slide-left;
        }

        .animate-card-slide[data-position="right"] {
          animation-name: card-slide-right;
        }

        .animate-card-slide[data-position="center"] {
          animation-name: card-slide-center;
        }

        .animate-card-slide[data-position="center-left"] {
          animation-name: card-slide-center-left;
        }

        .animate-card-slide[data-position="center-right"] {
          animation-name: card-slide-center-right;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Card hover animations */
        .group:hover .hover-lift {
          transform: translateY(-8px);
        }

        .group:hover .hover-shadow {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .group:hover .hover-scale {
          transform: scale(1.05);
        }

        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .animate-card-slide {
            animation-name: card-slide-center !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1023px) {
          .animate-card-slide[data-position="left"] {
            animation-name: card-slide-left;
          }
          
          .animate-card-slide[data-position="right"] {
            animation-name: card-slide-right;
          }
        }

        @media (min-width: 1024px) {
          .animate-card-slide[data-position="left"] {
            animation-name: card-slide-left;
          }
          
          .animate-card-slide[data-position="right"] {
            animation-name: card-slide-right;
          }
          
          .animate-card-slide[data-position="center-left"] {
            animation-name: card-slide-center-left;
          }
          
          .animate-card-slide[data-position="center-right"] {
            animation-name: card-slide-center-right;
          }
          
          .animate-card-slide[data-position="center"] {
            animation-name: card-slide-center;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;