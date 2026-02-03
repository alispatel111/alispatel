'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import {
  Briefcase, MapPin, Calendar, Code, Building, ExternalLink, ChevronRight,
  Rocket, Award, Users, TrendingUp, CheckCircle, ChevronDown, Zap,
  Cpu, Database, Server, Palette, Wrench, Target, Sparkles,
  GitCommit, Terminal, Globe, Cloud, Shield,
  FileText, Layout, GitBranch
} from 'lucide-react';

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [expandedCard, setExpandedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Start animations when section is in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const experiences = [
    {
      id: 1,
      title: 'Summer Internship',
      company: 'ByteXL',
      duration: 'Summer 2023',
      location: 'Remote',
      type: 'Internship',
      description: 'Developed web applications using MERN stack.',
      detailedDescription: [
        'Built e-commerce platform',
        'Implemented user authentication',
        'Created responsive design',
        'Integrated MongoDB'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      color: '#059669',
      icon: Building,
      achievements: [
        'Built 3 complete applications',
        'Learned full-stack development',
        'Mastered MERN fundamentals'
      ],
      responsibilities: [
        'Learning MERN stack',
        'Building demo applications',
        'Understanding SDLC',
        'Code implementation'
      ],
      links: [
        {
          text: 'Certificate',
          url: 'https://drive.google.com/file/d/12G-t03kzAkn7U_KslpBucwAcyyA1XFzt/view',
          icon: <ExternalLink className="w-4 h-4" />
        }
      ]
    },
    {
      id: 2,
      title: 'Intern MERN Stack Developer',
      company: 'FlyAnyTrip',
      duration: 'Jan 2025 - March 2025',
      location: 'In Office',
      type: 'Internship',
      description: 'TripEasy is a comprehensive travel technology platform developed to simplify trip planning and booking. The primary focus was on delivering an intuitive, user-friendly experience that seamlessly guides users from discovery to booking.',
      detailedDescription: [
        'MERN stack–based travel platform.',
        'Custom travel package creation.',
        'Secure Payment-gateway integration.',
        'Automated invoice generation.',
        'Fully responsive design across all devices.'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'REST API'],
      color: '#7C3AED',
      icon: Code,
      achievements: [
        'Improved booking process by 50%',
        'Handled 5K+ monthly bookings',
        '95% user satisfaction'
      ],
      responsibilities: [
        'Frontend development',
        'Backend API development',
        'Database design',
        'Payment integration'
      ],
      links: [
        {
          text: 'View Website',
          url: 'https://tripeasy.in/',
          icon: <ExternalLink className="w-4 h-4" />
        }
      ]
    },
    {
      id: 3,
      title: 'MERN Stack Developer',
      company: 'FlyAnyTrip',
      duration: 'April 2025 - Present',
      location: 'Vadodara',
      type: 'Full-time',
      description: 'Developed a comprehensive admin panel for BiologyTrunk (a learning management platform) using the MERN stack, enabling role-based management of courses, users, and content.',
      detailedDescription: [
        'Designed Admin Panel: Created a centralized dashboard with complete CRUD operations to manage users, faculty, courses, payments, and platform content.',
        'Faculty Panel: Created a dedicated dashboard for faculty to develop, manage, publish courses, and track student enrollments and progress.',
        'Student Panel: Developed an intuitive dashboard for students to access courses, monitor learning progress, and view payment history.',
        'Payment Integration: Implemented a secure payment gateway for course purchases and transactions, ensuring encrypted and role-based payment authentication.',
        'Code Quality: Maintained clean, scalable, and well-structured code across all panels for ease of maintenance and future enhancements.'

      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'Socket.io'],
      color: '#2563EB',
      icon: Rocket,
      achievements: [
        'Reduced page load time by 65%',
        'Implemented features for 10K+ users',
        'Achieved 99.9% uptime'
      ],
      responsibilities: [
        'Full-stack development',
        'API design',
        'Database optimization',
        'Team collaboration'
      ],
      links: [
        {
          text: 'View Website',
          url: 'https://biologytrunk.in',
          icon: <ExternalLink className="w-4 h-4" />
        }
      ]
    },


  ];

  const stats = [
    { value: '3+', label: 'Roles', icon: Briefcase },
    { value: '50+', label: 'Projects', icon: Code },
    { value: '99%', label: 'Satisfaction', icon: Award },
    { value: '15k+', label: 'Commits', icon: GitCommit },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const expandVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 relative overflow-hidden bg-white"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Very subtle dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#666 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Very subtle gradient overlay */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full shadow-sm mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              EXPERIENCE
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-3"
          >
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">History</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            My professional journey and experience in web development.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
                className="relative p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Timeline with Center Line */}
        <div className="relative">
          {/* Center Vertical Line */}
          {!isMobile && (
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 transform -translate-x-1/2">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            </div>
          )}

          {/* Mobile Line */}
          {isMobile && (
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            </div>
          )}

          {/* Experience Cards */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-16 md:space-y-20"
          >
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;
              const isLeft = isMobile ? false : isEven;
              const cardVariants = isLeft ? cardVariantsLeft : cardVariantsRight;
              const isExpanded = expandedCard === exp.id;

              return (
                <div
                  key={exp.id}
                  className={`relative ${!isMobile ? (isLeft ? 'md:pr-[48%]' : 'md:pl-[48%]') : 'pl-12'}`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`absolute ${isMobile ? 'left-6' : 'left-1/2'} top-8 transform -translate-x-1/2 z-20 cursor-pointer`}
                    onClick={() => handleCardClick(exp.id)}
                  >
                    <div className="relative w-7 h-7 rounded-full border-2 border-white shadow-xl" style={{ backgroundColor: exp.color }}>
                      <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)' }} />
                      <Icon className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                    </div>
                  </motion.div>

                  {/* Experience Card */}
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    className={`relative ${isMobile ? '' : isLeft ? 'md:mr-8' : 'md:ml-8'} `}
                  // onClick={() => handleCardClick(exp.id)}
                  >
                    {/* Card */}
                    <div className={`relative bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-1' : ''} hover:shadow-xl`} style={{ ringColor: exp.color + '40' }}>
                      {/* Card Content */}
                      <div className="p-5 md:p-6">
                        {/* Date Badge */}
                        <div className="absolute top-4 right-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold shadow-md"
                            style={{
                              background: exp.id === 1 ? 'linear-gradient(45deg, #3b82f6, #8b5cf6)' :
                                exp.id === 2 ? 'linear-gradient(45deg, #7C3AED, #8B5CF6)' :
                                  'linear-gradient(45deg, #059669, #10B981)',
                              color: 'white'
                            }}
                          >
                            {exp.duration}
                          </span>
                        </div>

                        {/* Company & Title */}
                        <div className="mb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-200">
                              <Icon className="w-6 h-6" style={{ color: exp.color }} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{exp.company}</h3>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                                <span className="text-sm text-gray-600">{exp.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Job Title */}
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {exp.title}
                          </h4>

                          {/* Type Badge */}
                          <span
                            className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3"
                            style={{
                              backgroundColor: exp.color + '15',
                              color: exp.color
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 text-base">
                          {exp.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 text-sm font-medium rounded-md hover:scale-105 transition-transform"
                                style={{
                                  backgroundColor: exp.color + '10',
                                  color: exp.color,
                                  border: '1px solid ' + exp.color + '30'
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Expand Button */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                          {exp.links && exp.links.length > 0 && (
                            <div className="flex gap-2">
                              {exp.links.map((link, idx) => (
                                <a
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium hover:scale-105 transition-transform"
                                  style={{
                                    backgroundColor: exp.color + '10',
                                    color: exp.color,
                                    border: '1px solid ' + exp.color + '30'
                                  }}
                                >
                                  {link.icon}
                                  {link.text}
                                </a>
                              ))}
                            </div>
                          )}

                          <button
                            className=" cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform"
                            style={{
                              backgroundColor: exp.color,
                              color: 'white'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(exp.id);
                            }}
                          >
                            {isExpanded ? 'Show Less' : 'View Details'}
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                            >
                              <ChevronDown className="w-3 h-3 text-white " />
                            </motion.div>
                          </button>
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            variants={expandVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="overflow-hidden"
                          >
                            <div className="border-t border-gray-200 px-5 py-6 bg-gray-50">
                              {/* Detailed Description */}
                              <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: exp.color }}>
                                    <FileText className="w-5 h-5 text-white" />
                                  </div>
                                  <h5 className="text-lg font-bold text-gray-900">Project Details</h5>
                                </div>
                                <div className="space-y-3">
                                  {exp.detailedDescription.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-white"
                                    >
                                      <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: exp.color + '20' }}>
                                        <CheckCircle className="w-3.5 h-3.5" style={{ color: exp.color }} />
                                      </div>
                                      <span className="text-sm text-gray-600">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Achievements and Responsibilities Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Achievements */}
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: exp.color + '20' }}>
                                      <Award className="w-5 h-5" style={{ color: exp.color }} />
                                    </div>
                                    <h5 className="text-lg font-bold text-gray-900">Key Achievements</h5>
                                  </div>
                                  <ul className="space-y-2">
                                    {exp.achievements.map((achievement, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start gap-2 p-2.5 rounded-md bg-white hover:scale-[1.02] transition-transform"
                                      >
                                        <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: exp.color }} />
                                        <span className="text-sm text-gray-600">{achievement}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Responsibilities */}
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: exp.color + '20' }}>
                                      <Briefcase className="w-5 h-5" style={{ color: exp.color }} />
                                    </div>
                                    <h5 className="text-lg font-bold text-gray-900">Responsibilities</h5>
                                  </div>
                                  <ul className="space-y-2">
                                    {exp.responsibilities.map((responsibility, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start gap-2 p-2.5 rounded-md bg-white hover:scale-[1.02] transition-transform"
                                      >
                                        <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: exp.color }} />
                                        <span className="text-sm text-gray-600">{responsibility}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="max-w-lg mx-auto">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              {/* <Rocket className="w-12 h-12 text-blue-600" /> */}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Build?
            </h3>
            <p className="text-gray-600 mb-4 text-lg">
              Let's create exceptional digital experiences
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Briefcase className="w-5 h-5" />
              <span>View Portfolio</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 0.3);
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3B82F6, #06B6D4);
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563EB, #0891B2);
        }
      `}</style>
    </section>
  );
};

export default Experience;