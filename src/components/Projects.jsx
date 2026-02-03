'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, ExternalLink, Code, Database, Server, Cpu, Palette,
  Zap, ArrowRight, Star, Layers, Globe, Smartphone, ChevronRight,
  Eye, X, Calendar, Users, Target, CheckCircle, Clock, Award,
  Sparkles, TrendingUp, Zap as Lightning, Grid, Terminal,
  Smartphone as Mobile, Palette as Paint, Code2, Cpu as Chip, Lock
} from 'lucide-react';

// Reusable GitHub Privacy Modal Component
const GitHubButtonWithPrivacy = ({ projectId, projectTitle, githubLink, className = '' }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Check if this is a private repo - Projects with IDs 1, 3, 8, 9 are private
  const privateProjectIds = [1, 3, 8, 9];
  const isPrivateRepo = privateProjectIds.includes(projectId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPrivateRepo) {
      setShowPrivacyModal(true);
    } else {
      window.open(githubLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`block w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-br from-gray-900 to-black text-white font-bold rounded-xl text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base cursor-pointer ${className}`}
      >
        <Github className="w-4 h-4 md:w-5 md:h-5" />
        View Source Code
        {isPrivateRepo && <Lock className="w-3 h-3 ml-1" />}
      </motion.button>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPrivacyModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative p-6 border-b border-gray-200">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-lg">
                    <Lock className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Private Repository</h3>
                    <p className="text-sm text-gray-600 mt-1">Access Restricted</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 mb-4">
                    <Lock className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-700 text-base">
                    Due to privacy policy reasons, this repository is not public.
                  </p>
                  <p className="font-medium text-gray-900 mt-2">
                    You can view the live demo only.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Project:</span> {projectTitle}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-semibold">ID:</span> #{projectId}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPrivacyModal(false)}
                    className="w-full py-3.5 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    I Understand
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  // Scroll animation states
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const statsRef = useRef(null);

  // Intersection Observers for scroll animations
  useEffect(() => {
    const observers = [
      { ref: headerRef, setter: setIsHeaderVisible, threshold: 0.2 },
      { ref: filterRef, setter: setIsFilterVisible, threshold: 0.2 },
      { ref: gridRef, setter: setIsGridVisible, threshold: 0.1 },
      { ref: statsRef, setter: setIsStatsVisible, threshold: 0.2 },
    ];

    const observerInstances = observers.map(({ ref, setter, threshold }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
          }
        },
        { threshold, rootMargin: '0px 0px -50px 0px' }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observerInstances.forEach((observer, index) => {
        if (observers[index].ref.current) {
          observer.unobserve(observers[index].ref.current);
        }
      });
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'ScanTapPay - Contactless E-Commerce Platform',
      "description": "A futuristic shopping application enabling instant purchases via QR code scanning or NFC tag tapping, with automatic cart addition, secure payments, and digital receipt generation.",
      "longDescription": "I developed a full-stack e-commerce platform redefining convenience through contactless technology. The application allows users to instantly add products to their cart by simply scanning a QR code or tapping an NFC-enabled phone on product tags. The system automatically processes secure payments and sends digital receipts via email upon transaction completion. Built with real-time processing capabilities, it features a user dashboard for purchase tracking, an admin panel for inventory/QR management, and integrates with payment gateways for a seamless, sub-2-second scan-to-purchase experience. The project focuses on eliminating traditional checkout friction, merging physical products with digital instant gratification.",
      image: '/logos/tiptappay.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT', 'Redux'],
      liveLink: 'https://scantappay.flyanytrip.com/',
      githubLink: 'https://github.com/alispatel111/scantappay',
      category: 'fullstack',
      Icon: Database,
      color: 'from-blue-600 to-cyan-500',
      accentColor: '#2563eb',
      stars: 156,
      status: 'Production',
      featured: true,
      timeline: '3 months',
      teamSize: '4 developers',
      features: [
        "QR Code Instant Product Scanning",
        "NFC Tap-to-Purchase Technology",
        "Automatic Cart Addition & Management",
        "Secure Payment Gateway Integration",
        "Real-Time Purchase & Payment Tracking",
        "Automated Digital Receipt & Email Generation"
      ],
      complexity: 'High',
      impact: 'Enterprise'
    },
    {
      id: 2,
      title: 'TODO List',
      description: 'Advanced MERN todo application with real-time collaboration, task categorization, progress tracking, deadline reminders, and team management features for enhanced productivity and organization.',
      longDescription: 'A full-featured MERN stack todo application with real-time task management. Features include user authentication, task categorization, due date tracking, and collaborative features. Built with React hooks for state management, Express.js backend, and MongoDB for persistent storage.',
      image: '/logos/todo.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'JWT', 'Bootstrap'],
      liveLink: 'https://todoapp-umber-one.vercel.app/',
      githubLink: 'https://github.com/alispatel111/todoapp',
      category: 'fullstack',
      Icon: Server,
      color: 'from-purple-600 to-pink-500',
      accentColor: '#7c3aed',
      stars: 92,
      status: 'Live',
      featured: true,
      timeline: '4 months',
      teamSize: '3 developers',
      features: [
        'MERN stack implementation',
        'Real-time updates with Socket.io',
        'User authentication with JWT',
        'Task categorization and filtering',
        'Drag-and-drop interface',
        'Progress tracking system'
      ],
      complexity: 'Medium',
      impact: 'Productivity'
    },
    {
      id: 3,
      title: 'Tech Setu - Corporate Website',
      description: "A conceptual UI/UX design project for a modern IT services company website, focusing on creating a clean, professional interface that highlights services, portfolio, and client trust.",
      longDescription: "A complete UI/UX design concept for 'Tech Setu', a fictional IT services company. This project focused on designing a modern, professional, and user-friendly website to establish a strong digital presence. The design process involved creating wireframes, user flows, and a high-fidelity visual system to effectively communicate the company's core services (Custom Software, UI/UX Design, Web Development) and value propositions (Reliable, Fast Delivery, Professional). Key design goals included building client trust through a clean portfolio showcase, clear service breakdowns, prominent client testimonials, and intuitive navigation, resulting in a visually cohesive and conversion-optimized interface.",
      image: '/logos/techsetu.png',
      tech: ['React', 'Tailwind CSS', 'JavaScript', 'UI/UX Design', 'Responsive Design', 'Web Design', 'HTML5'],
      liveLink: 'https://techsetu22.vercel.app/',
      githubLink: 'https://github.com/techsetu2025/techsetu',
      category: 'frontend',
      Icon: Palette,
      color: 'from-blue-700 to-indigo-800',
      accentColor: '#06b6d4',
      stars: 64,
      status: 'Production',
      timeline: '2 months',
      teamSize: '3 developers',
      features: [
        "Modern & Professional Visual Design System",
        "Service-Oriented Information Architecture",
        "Portfolio Showcase with Project Case Studies",
        "Client Testimonial & Trust-Building Sections",
        "Intuitive Navigation & User Flow for B2B Clients",
        "High-Fidelity Prototype for Desktop & Mobile"
      ],
      complexity: 'Medium',
      impact: 'Finance'
    },
    {
      id: 4,
      title: 'QuizMaster',
      description: 'Interactive MERN quiz platform with multiple question types, real-time scoring, leaderboard rankings, quiz creation tools, and detailed performance analytics for educational assessment.',
      longDescription: 'An interactive MERN stack quiz platform featuring multiple question types, real-time scoring, leaderboards, and quiz creation tools. Built with React for the interactive UI, Express.js backend for quiz management, and MongoDB for storing questions and user scores.',
      image: '/logos/quizmaster.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'React Router', 'Axios'],
      liveLink: 'https://quizmaster-tawny.vercel.app',
      githubLink: 'https://github.com/alispatel111/quizmaster',
      category: 'fullstack',
      Icon: Cpu,
      color: 'from-orange-600 to-red-500',
      accentColor: '#ea580c',
      stars: 134,
      status: 'Live',
      timeline: '3 months',
      teamSize: '2 developers',
      features: [
        'MERN stack quiz platform',
        'Multiple quiz categories',
        'Real-time scoring system',
        'User authentication',
        'Leaderboard tracking',
        'Quiz creation and management'
      ],
      complexity: 'Medium',
      impact: 'Education'
    },
    {
      id: 5,
      title: 'Rapid Typing Test',
      description: 'MERN typing speed application with accuracy measurement, multiple difficulty levels, practice sessions, progress tracking, and comprehensive performance analytics for skill improvement.',
      longDescription: 'A MERN stack typing speed test application that measures WPM, accuracy, and provides detailed analytics. Features include multiple difficulty levels, practice modes, and progress tracking. Built with React for the interactive typing interface, Express.js for user data management, and MongoDB for storing typing statistics.',
      image: '/logos/rapid.jpg',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'React Hooks', 'CSS3'],
      liveLink: 'https://rapidtyping.vercel.app/',
      githubLink: 'https://github.com/alispatel111/rapidtyping',
      category: 'fullstack',
      Icon: Globe,
      color: 'from-indigo-600 to-blue-500',
      accentColor: '#4f46e5',
      stars: 78,
      status: 'Live',
      timeline: '2 months',
      teamSize: '2 developers',
      features: [
        'MERN stack typing application',
        'Real-time speed calculation',
        'Accuracy tracking',
        'User progress history',
        'Multiple difficulty levels',
        'Performance analytics'
      ],
      complexity: 'Medium',
      impact: 'Productivity'
    },
    {
      id: 6,
      title: 'MERN Auth',
      description: 'Complete MERN authentication system with user registration, secure login, password reset, email verification, role-based access control, and session management for application security.',
      longDescription: 'A comprehensive MERN stack authentication system featuring user registration, login, password reset, email verification, and role-based access control. Implements JWT tokens, secure password hashing, and session management. Serves as a template for building secure MERN applications with authentication.',
      image: '/logos/MERN.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'bcrypt', 'Nodemailer'],
      liveLink: 'https://alis-mern-auth.vercel.app/',
      githubLink: 'https://github.com/alispatel111/mern-auth/tree/main',
      category: 'fullstack',
      Icon: Layers,
      color: 'from-teal-600 to-cyan-500',
      accentColor: '#0d9488',
      stars: 45,
      status: 'Production',
      timeline: '2 months',
      teamSize: '1 developer',
      features: [
        'Complete MERN authentication',
        'JWT token implementation',
        'Password reset functionality',
        'Email verification system',
        'Role-based access control',
        'Secure session management'
      ],
      complexity: 'Medium',
      impact: 'Security'
    },
    {
      id: 7,
      title: 'Weather Forecast App',
      description: 'MERN weather application with real-time forecasts, location-based data, historical patterns, user preference storage, and responsive dashboard for accurate weather information.',
      longDescription: 'A MERN stack weather application that provides real-time weather forecasts, location-based weather data, and historical weather patterns. Built with React for the dynamic UI, Express.js for API routing, and MongoDB for storing user preferences and location data.',
      image: '/logos/weather.jpg',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'API Integration', 'Axios', 'CSS3'],
      liveLink: 'https://weatherapp-ashen-xi.vercel.app/',
      githubLink: 'https://github.com/alispatel111/weatherapp',
      category: 'fullstack',
      Icon: Layers,
      color: 'from-teal-600 to-cyan-500',
      accentColor: '#940d1b',
      stars: 45,
      status: 'Production',
      timeline: '2 months',
      teamSize: '2 developers',
      features: [
        'MERN stack weather application',
        'Real-time weather API integration',
        'Location-based forecasting',
        'User preference storage',
        'Responsive weather dashboard',
        'Historical data tracking'
      ],
      complexity: 'Medium',
      impact: 'Utility'
    },
    {
      id: 8,
      title: 'Tripeasy.in - Travel Tech Platform',
      description: 'A full-featured travel booking website enabling custom travel package creation, secure payments, automated invoicing, and a dynamic user interface with smooth animations.',
      longDescription: 'Tripeasy.in is a comprehensive travel technology platform I developed to simplify trip planning. It allows users to build personalized travel itineraries by selecting flights, hotels, and activities. The platform features a secure, multi-gateway payment system, automated invoice generation for bookings, and an engaging front-end built with modern animations. The focus was on creating an intuitive, user-friendly experience that guides customers from discovery to booking seamlessly',
      image: '/logos/tripeasy.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'API Integration', 'Axios', 'CSS3'],
      liveLink: 'https://tripeasy.in',
      githubLink: 'https://github.com/alisproject111/tripeasy-client',
      category: 'fullstack',
      Icon: Layers,
      color: 'from-amber-100 to-orange-600',
      accentColor: '#e25c13',
      stars: 45,
      status: 'Production',
      timeline: '2 months',
      teamSize: '2 developers',
      features: [
        'MERN stack travel platform',
        'Custom travel package creation',
        'Secure multi-gateway payments',
        'Automated invoice generation',
        'Dynamic UI with smooth animations',
        'Responsive design for all devices'

      ],
      complexity: 'Hard',
      impact: 'Utility'
    },
    {
      id: 9,
      title: 'Biology.Trunk - Online Academic Learning Platform',
      description: 'An online learning platform focused on biology education, featuring interactive lessons, quizzes, progress tracking, and a user-friendly interface to enhance student engagement and knowledge retention.',
      longDescription: 'A MERN stack online academic learning platform that provides interactive biology lessons, quizzes, progress tracking, and a user-friendly interface. Built with React for the dynamic UI, Express.js for API routing, and MongoDB for storing user progress and preferences.',
      image: '/logos/biology-trunk.jpg',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'API Integration', 'Axios', 'CSS3'],
      liveLink: 'https://www.biologytrunk.in/',
      githubLink: 'https://github.com/yourusername/biology-trunk',
      category: 'mobile',
      Icon: Layers,
      color: 'rom-blue-500 to-blue-700',
      accentColor: "#2563eb",
      stars: 45,
      status: 'Production',
      timeline: '2 months',
      teamSize: '2 developers',
      features: [
        "Ph.D. & NET/GATE Expert Faculty Portal",
        "Live Interactive Classes with WebRTC",
        "AI-Powered Performance Analytics Dashboard",
        "Structured Curriculum for NEET, CUET, KVS",
        "Student Progress & Performance Tracking",
        "Secure Payment & Enrollment System"
      ],
      complexity: 'Medium',
      impact: 'Utility'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length, icon: Grid },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length, icon: Terminal },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length, icon: Paint },
    { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length, icon: Mobile },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="relative py-12 md:py-24 bg-white overflow-hidden">
      {/* Enhanced Background Bubbles */}
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Center from Center */}
        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${isHeaderVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
            }`}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 mb-6 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-700">PROFESSIONAL PORTFOLIO</span>
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Projects</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4"
          >
            Showcasing innovative solutions and technical excellence in modern web development
          </motion.p>
        </div>

        {/* Enhanced Filter Tabs - Center from Center */}
        <motion.div
          ref={filterRef}
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12 px-4 transition-all duration-1000 ease-out delay-100 ${isFilterVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }`}
        >
          {categories.map((category, idx) => {
            const CategoryIcon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${activeFilter === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                  }`}
              >
                <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{category.label}</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${activeFilter === category.id
                    ? 'bg-white/30 backdrop-blur-sm'
                    : 'bg-gray-100 text-gray-700'
                  }`}>
                  {category.count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Enhanced Modern Projects Grid - Staggered from sides */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4"
        >
          {filteredProjects.map((project, index) => {
            // Determine animation direction based on position
            const isLeftColumn = index % 3 === 0;
            const isRightColumn = index % 3 === 2;
            const isCenterColumn = !isLeftColumn && !isRightColumn;

            const animationClass = isGridVisible
              ? 'opacity-100 translate-x-0'
              : isLeftColumn
                ? 'opacity-0 -translate-x-12'
                : isRightColumn
                  ? 'opacity-0 translate-x-12'
                  : 'opacity-0 translate-y-10'; // Center columns come from bottom

            return (
              <motion.div
                key={project.id}
                className={`group cursor-pointer transition-all duration-700 ease-out delay-${index * 100} ${animationClass}`}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Modern Card Design */}
                <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full group-hover:shadow-xl group-hover:border-blue-200">

                  {/* Card Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, #888 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}></div>
                  </div>

                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-2xl p-[2px]">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 transition-all duration-500 blur-md`}></div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-3 left-3 z-10"
                    >
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </div>
                    </motion.div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${project.status === 'Production'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : project.status === 'Live'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                    >
                      {project.status}
                    </motion.div>
                  </div>

                  {/* Enhanced Image Section */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 z-0`}></div>

                    {/* Main Image */}
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1, rotate: 0.5 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Dynamic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Tech Badge */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20"
                    >
                      <project.Icon className="w-5 h-5" style={{ color: project.accentColor }} />
                    </motion.div>

                    {/* Quick View Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                    >
                      <div className="text-white text-center">
                        <Eye className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                        <span className="text-sm font-semibold">View Details</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="p-5 sm:p-6">
                    {/* Title and Description */}
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Stars and Complexity */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${project.complexity === 'High' ? 'bg-red-500' :
                          project.complexity === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                          }`}></div>
                        <span className="text-xs font-medium text-gray-600">{project.complexity}</span>
                      </div>
                    </div>

                    {/* Tech Stack - Scrollable on small screens */}
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                        {project.tech.slice(0, 4).map((tech, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1.5 bg-gradient-to-b from-gray-50 to-white text-gray-700 rounded-lg text-xs font-medium border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300 whitespace-nowrap flex-shrink-0"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Card Footer */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Project Info */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                            <span className="text-xs font-medium text-gray-600">{project.timeline}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                            <span className="text-xs font-medium text-gray-600">{project.teamSize}</span>
                          </div>
                        </div>

                        {/* View Button */}
                        <motion.div
                          animate={{ x: hoveredProject === project.id ? 5 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2 self-end sm:self-auto"
                        >
                          <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Explore
                          </span>
                          <motion.div
                            whileHover={{ rotate: 45 }}
                            className="p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg group-hover:shadow-sm transition-all duration-300"
                          >
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all duration-300" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Animated Bottom Gradient */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredProject === project.id ? '100%' : 0 }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.color} transition-all duration-500`}
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section - Responsive - Center from Center */}
        <motion.div
          ref={statsRef}
          className={`mt-12 md:mt-20 px-4 transition-all duration-1000 ease-out delay-300 ${isStatsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            {/* First Stat - Left from Left */}
            <div className={`text-center p-4 md:p-6 bg-gradient-to-b from-white to-blue-50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 transition-all duration-700 delay-100 ${isStatsVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
              }`}>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">6+</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Projects Completed</div>
            </div>

            {/* Second Stat - Center from Center */}
            <div className={`text-center p-4 md:p-6 bg-gradient-to-b from-white to-cyan-50 rounded-2xl border border-cyan-100 shadow-sm hover:shadow-md transition-all duration-300 transition-all duration-700 delay-200 ${isStatsVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
              }`}>
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">12+</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Technologies Used</div>
            </div>

            {/* Third Stat - Right from Right */}
            <div className={`text-center p-4 md:p-6 bg-gradient-to-b from-white to-emerald-50 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 transition-all duration-700 delay-300 ${isStatsVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
              }`}>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Client Satisfaction</div>
            </div>
          </div>

          <div className="text-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg group text-sm md:text-base"
            >
              <span>Start a Project</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
            </motion.a>
            <p className="text-gray-500 text-xs md:text-sm mt-3 md:mt-4">
              Let's build something amazing together
            </p>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modern Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-lg"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Background Bubbles */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="relative w-full max-w-4xl lg:max-w-6xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] md:max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 md:top-6 md:right-6 z-50 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </motion.button>

              {/* Modal Header */}
              <div className="relative">
                {/* Gradient Header */}
                <div className={`relative h-48 sm:h-56 md:h-72 bg-gradient-to-br ${selectedProject.color}`}>
                  <div className="absolute inset-0 bg-black/30"></div>

                  {/* Header Content */}
                  <div className="relative h-full flex items-center px-4 sm:px-3 md:px-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                      <div className={`p-4 md:p-5 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30`}>
                        <selectedProject.Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                        <p className="text-sm sm:text-base md:text-lg text-white/90">{selectedProject.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Bar - Responsive */}
                <div className="relative bg-white border-b border-gray-100">
                  <div className="px-4 sm:px-6 md:px-8 py-4 md:py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-2 md:p-2.5 bg-blue-50 rounded-lg md:rounded-xl">
                          <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl font-bold text-gray-900">{selectedProject.stars}</div>
                          <div className="text-xs md:text-sm text-gray-600">GitHub Stars</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-2 md:p-2.5 bg-green-50 rounded-lg md:rounded-xl">
                          <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl font-bold text-gray-900">{selectedProject.timeline}</div>
                          <div className="text-xs md:text-sm text-gray-600">Timeline</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-2 md:p-2.5 bg-purple-50 rounded-lg md:rounded-xl">
                          <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl font-bold text-gray-900">{selectedProject.teamSize}</div>
                          <div className="text-xs md:text-sm text-gray-600">Team</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={`p-2 md:p-2.5 rounded-lg md:rounded-xl ${selectedProject.status === 'Production'
                            ? 'bg-green-50'
                            : selectedProject.status === 'Live'
                              ? 'bg-blue-50'
                              : 'bg-amber-50'
                          }`}>
                          <Target className={`w-4 h-4 md:w-5 md:h-5 ${selectedProject.status === 'Production'
                              ? 'text-green-600'
                              : selectedProject.status === 'Live'
                                ? 'text-blue-600'
                                : 'text-amber-600'
                            }`} />
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl font-bold text-gray-900">{selectedProject.status}</div>
                          <div className="text-xs md:text-sm text-gray-600">Status</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                  {/* Main Content */}
                  <div className="lg:w-2/3">
                    {/* Project Overview */}
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Code className="w-5 h-5 text-blue-600" />
                        </div>
                        Project Overview
                      </h3>

                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 md:p-6 border border-gray-200">
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg">
                          {selectedProject.longDescription}
                        </p>
                      </div>
                    </div>

                    {/* Key Features - GREEN TICK ICONS */}
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        Key Features
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                        {selectedProject.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-3 md:p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                          >
                            {/* Green Tick Icon */}
                            <div className="p-2 rounded-lg bg-green-50">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:w-1/3">
                    <div className="sticky top-4 md:top-8">
                      {/* Tech Stack */}
                      <div className="mb-6 md:mb-8">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                          <div className="p-2 bg-purple-50 rounded-lg">
                            <Database className="w-5 h-5 text-purple-600" />
                          </div>
                          Technology Stack
                        </h3>

                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {selectedProject.tech.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-3 py-2 md:px-4 md:py-3 bg-gradient-to-b from-white to-gray-50 border border-gray-200 text-gray-700 rounded-lg md:rounded-xl font-medium md:font-semibold hover:border-blue-300 hover:shadow-md transition-all duration-300 text-xs md:text-sm"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        <motion.a
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r ${selectedProject.color} text-white font-bold rounded-xl text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base`}
                        >
                          <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                          View Live Demo
                        </motion.a>

                        {/* Use the GitHub Button with Privacy Modal */}
                        <GitHubButtonWithPrivacy
                          projectId={selectedProject.id}
                          projectTitle={selectedProject.title}
                          githubLink={selectedProject.githubLink}
                        />
                      </div>

                      {/* Additional Info */}
                      <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm md:text-base">
                          <Lightning className="w-4 h-4 text-blue-500" />
                          Project Details
                        </h4>
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-xs md:text-sm">Category</span>
                            <span className="font-medium text-gray-900 text-xs md:text-sm capitalize">{selectedProject.category}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-xs md:text-sm">Status</span>
                            <span className={`font-bold text-xs md:text-sm ${selectedProject.status === 'Production'
                                ? 'text-green-600'
                                : selectedProject.status === 'Live'
                                  ? 'text-blue-600'
                                  : 'text-amber-600'
                              }`}>
                              {selectedProject.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-xs md:text-sm">Stars</span>
                            <span className="font-bold text-gray-900 text-xs md:text-sm">{selectedProject.stars}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-xs md:text-sm">Complexity</span>
                            <span className={`font-bold text-xs md:text-sm ${selectedProject.complexity === 'High' ? 'text-red-600' :
                              selectedProject.complexity === 'Medium' ? 'text-amber-600' : 'text-green-600'
                              }`}>
                              {selectedProject.complexity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add scrollbar styling */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
        }
        
        /* Animation delay classes */
        .delay-0 {
          transition-delay: 0ms;
        }
        .delay-100 {
          transition-delay: 100ms;
        }
        .delay-200 {
          transition-delay: 200ms;
        }
        .delay-300 {
          transition-delay: 300ms;
        }
        .delay-400 {
          transition-delay: 400ms;
        }
        .delay-500 {
          transition-delay: 500ms;
        }
        .delay-600 {
          transition-delay: 600ms;
        }
        
        /* Responsive animation adjustments */
        @media (max-width: 768px) {
          .-translate-x-12 {
            transform: translateX(-8px);
          }
          .translate-x-12 {
            transform: translateX(8px);
          }
          .-translate-x-8 {
            transform: translateX(-6px);
          }
          .translate-x-8 {
            transform: translateX(6px);
          }
          .translate-y-10 {
            transform: translateY(6px);
          }
          .translate-y-8 {
            transform: translateY(6px);
          }
        }
        
        @media (max-width: 640px) {
          /* On mobile, all cards come from bottom */
          .sm\:grid-cols-2 > * {
            transform: translateY(10px) !important;
          }
          .sm\:grid-cols-2 > .opacity-100 {
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;