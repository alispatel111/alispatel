'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, X as XIcon, MessageSquare, CheckCircle, User, Mail as MailIcon, FileText, Sparkles, Users, UserPlus, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Reset animation when submitted changes
  useEffect(() => {
    if (submitted || showSuccessModal) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [submitted, showSuccessModal]);

  // EmailJS initialization
  const EMAILJS_SERVICE_ID = "service_emu2xai";
  const EMAILJS_TEMPLATE_ID = "template_kg970bi";
  const EMAILJS_PUBLIC_KEY = "SVKz-D0cD8hn6RRgw";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // EmailJS API call
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Ali",
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);

      // Show success modal
      setShowSuccessModal(true);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Hide form success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);

      // Auto hide modal after 5 seconds
      setTimeout(() => setShowSuccessModal(false), 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email Address',
      value: 'alispatel123098@gmail.com',
      link: 'mailto:alispatel123098@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Direct email for quick inquiries',
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: '+91-8511231514',
      link: 'tel:+918511231514',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Available 9AM-6PM IST',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Vadodara, Gujarat, India',
      link: 'https://maps.app.goo.gl/tUCXn22CoQjj6Pdf6',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Open to remote opportunities',
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',  // Name change karna na bhoolen
      link: 'https://instagram.com/alispatel111',  // Link bhi update karein
      gradient: 'from-purple-600 via-pink-600 to-yellow-500',
      hoverGradient: 'from-purple-700 via-pink-700 to-yellow-600',
      followers: '700+',  // Instagram followers ke hisaab se
      iconBg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400',
      followerIcon: Users,
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/alispatel',
      gradient: 'from-blue-700 to-blue-800',
      hoverGradient: 'from-blue-800 to-blue-900',
      followers: '1.6k+',
      iconBg: 'bg-blue-700',
      followerIcon: UserPlus,
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      name: 'X',
      link: 'https://x.com/alis111patel',
      gradient: 'from-gray-900 to-black',
      hoverGradient: 'from-black to-gray-900',
      followers: '200+',
      iconBg: 'bg-black',
      followerIcon: Users,
    },
  ];

  const formFields = [
    {
      id: 'name',
      label: 'Full Name',
      icon: User,
      placeholder: 'Enter your full name',
      type: 'text',
    },
    {
      id: 'email',
      label: 'Email Address',
      icon: MailIcon,
      placeholder: 'Enter your email address',
      type: 'email',
    },
    {
      id: 'message',
      label: 'Project Details',
      icon: FileText,
      placeholder: 'Describe your project, timeline, and requirements...',
      type: 'textarea',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-16 md:py-20 bg-white relative overflow-hidden scroll-mt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Success Modal */}
      {showSuccessModal && (
        <>
          {/* Backdrop with blur */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 animate-fade-in"></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
              {/* Modal Header */}
              <div className="flex justify-end p-4">
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 md:px-8 pb-8 md:pb-10 text-center">
                {/* Premium Success Icon with Elegant Animation */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                  {/* Outer circle animation */}
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-100">
                    <div className="absolute inset-0 rounded-full border-3 border-emerald-200 animate-ping-slow opacity-70"></div>
                  </div>

                  {/* Middle circle */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
                    {/* Animated checkmark container */}
                    <div className="relative w-16 h-16">
                      {/* Circle that draws itself */}
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          className="stroke-emerald-500 fill-none stroke-[4]"
                          cx="50"
                          cy="50"
                          r="40"
                          pathLength="100"
                          strokeDasharray="100"
                          strokeDashoffset={isAnimating ? "100" : "0"}
                          style={{
                            transition: "stroke-dashoffset 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
                            transitionDelay: "0.2s"
                          }}
                        />
                      </svg>

                      {/* Checkmark that draws itself */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <path
                          className="stroke-emerald-600 fill-none stroke-[4]"
                          d="M30,50 L45,65 L70,35"
                          pathLength="100"
                          strokeDasharray="100"
                          strokeDashoffset={isAnimating ? "100" : "0"}
                          style={{
                            transition: "stroke-dashoffset 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
                            transitionDelay: "1s"
                          }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* Pulsing dot in the middle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full bg-emerald-500 ${isAnimating ? 'animate-ping' : ''}`}></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating sparkles */}
                  <div className="absolute -top-2 -right-2 w-6 h-6">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full blur-sm animate-pulse"></div>
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>

                {/* Success Message */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 mb-2">
                  Thank you for reaching out, <span className="font-semibold text-emerald-600">{formData.name || 'there'}</span>!
                </p>
                <p className="text-gray-600">
                  I'll get back to you within 24 hours at <span className="font-medium text-blue-600">{formData.email}</span>.
                </p>

                {/* Auto-close indicator */}
                <div className="mt-8">
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 rounded-full animate-shimmer"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Closing in 5 seconds...</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      {/* Floating geometric shapes */}
      <div className="absolute -top-24 -right-24 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-60 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -left-32 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gradient-to-tr from-cyan-100 to-blue-100 opacity-60 animate-pulse-slow"></div>
      <div className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-r from-purple-100/40 to-pink-100/40 rounded-3xl rotate-12 opacity-40"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                           linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Enhanced */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl mb-4 md:mb-6 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <span className="text-xs md:text-sm font-semibold text-blue-700">LET'S WORK TOGETHER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Touch</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Let's collaborate to create something exceptional.
            Fill out the form below and I'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left - Enhanced Contact Information */}
          <div className="space-y-8 md:space-y-12">
            {/* Contact Methods - Enhanced */}
            <div className="space-y-4 md:space-y-6">
              {contactMethods.map((method, idx) => {
                const IconComponent = method.icon;
                return (
                  <a
                    key={idx}
                    href={method.link}
                    className={`group block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ animationDelay: `${0.1 * idx}s` }}
                  >
                    <div className="relative bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm">
                      {/* Background glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-5">
                        <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500`}>
                          <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                          {/* Glow effect */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs md:text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">
                            {method.label}
                          </p>
                          <p className="text-base md:text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 mb-2">
                            {method.value}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {method.description}
                          </p>
                        </div>
                        <div className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300 self-start sm:self-auto">
                          <Send className="w-4 h-4 md:w-5 md:h-5 transform -rotate-45" />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links - Enhanced with followers icons */}
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Connect With Me</h3>
                </div>
                <span className="text-xs md:text-sm font-medium text-blue-600 px-2 md:px-3 py-1 bg-blue-50 rounded-full self-start sm:self-auto">
                  Let's Connect
                </span>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 md:gap-4">
                {socialLinks.map((social, idx) => {
                  const IconComponent = social.icon;
                  const FollowerIcon = social.followerIcon;
                  return (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      style={{ animationDelay: `${0.2 * idx + 0.3}s` }}
                    >
                      <div className={`relative h-20 md:h-24 p-3 md:p-4 rounded-xl bg-gradient-to-br ${social.gradient} text-white font-medium transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden border border-white/20`}>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-30"></div>

                        {/* Hover gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                        <div className="relative z-8 flex flex-col items-center justify-center h-full gap-0.5">
                          {/* Platform Icon */}
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${social.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-1`}>
                            <IconComponent className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
                          </div>

                          {/* Platform Name */}
                          <span className="text-sm md:text-base font-bold block truncate w-full text-center">{social.name}</span>

                          {/* Followers Count with Icon */}
                          <div className="flex items-center justify-center gap-1 md:gap-2 mt-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                            <FollowerIcon className="w-3 h-3 md:w-4 md:h-4 text-white/90" />
                            <span className="text-xs md:text-sm font-medium">{social.followers}</span>
                          </div>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16">
                          <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] md:border-t-[32px] border-r-[24px] md:border-r-[32px] border-t-white/10 border-r-transparent rounded-tr-xl"></div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact Information Note */}
            <div className={`bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-100 rounded-2xl p-4 md:p-6 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-start gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Contact Information</h4>
                  <p className="text-xs md:text-sm text-gray-600">
                    Fill up the form and I'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Enhanced Contact Form */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s' }}>
            <div className="relative bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200 backdrop-blur-sm">
              {/* Form header gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>

              <div className="mb-6 sm:mb-8 md:mb-10 pt-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-500" />
                  Send Your Message
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  Share details about your project and let's discuss how we can bring your vision to life.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
                {submitted && (
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 animate-fade-in overflow-hidden">
                    {/* Animated success indicator */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-green-400 animate-grow-height"></div>

                    <div className="flex items-start gap-3 pl-4">
                      {/* Elegant animated checkmark */}
                      <div className="relative flex-shrink-0">
                        <div className="relative w-10 h-10">
                          {/* Background circle */}
                          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-pulse-slow"></div>

                          {/* Animated checkmark SVG */}
                          <svg className="relative w-full h-full" viewBox="0 0 24 24">
                            {/* Circle path */}
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              className="stroke-emerald-400 fill-none stroke-[1.5]"
                              strokeDasharray="60"
                              strokeDashoffset={isAnimating ? "60" : "0"}
                              style={{
                                transition: "stroke-dashoffset 0.8s ease-out",
                              }}
                            />

                            {/* Checkmark path */}
                            <path
                              d="M8 12L11 15L16 9"
                              className="stroke-emerald-600 fill-none stroke-[2]"
                              strokeDasharray="20"
                              strokeDashoffset={isAnimating ? "20" : "0"}
                              style={{
                                transition: "stroke-dashoffset 0.5s ease-out",
                                transitionDelay: "0.8s"
                              }}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          {/* Pulsing dot */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isAnimating ? 'animate-ping' : ''}`}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-emerald-700 font-semibold text-sm md:text-base">
                            Message Sent Successfully!
                          </p>
                          <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                            ✓
                          </span>
                        </div>
                        <p className="text-xs text-emerald-600">
                          Thank you for reaching out. I'll get back to you within 24 hours.
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="w-full h-1 bg-emerald-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-shimmer" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formFields.map((field, idx) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.id} className="group">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2 md:mb-3 flex items-center gap-1 md:gap-2">
                        <IconComponent className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          required
                          rows="4"
                          className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500 resize-none group-hover:border-gray-300 backdrop-blur-sm text-xs sm:text-sm md:text-base"
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500 group-hover:border-gray-300 backdrop-blur-sm text-xs sm:text-sm md:text-base"
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  );
                })}

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`cursor-pointer group w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] shadow-xl relative overflow-hidden ${isLoading ? 'opacity-80 cursor-not-allowed' : ''
                    }`}
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 animate-gradient-xy bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_200%]"></div>

                  <span className=" relative z-10 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className=" w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </span>

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 3s ease infinite;
          background-size: 200% 200%;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.4;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 5s linear forwards;
        }
        @keyframes grow-height {
          0% {
            height: 0%;
          }
          100% {
            height: 100%;
          }
        }
        .animate-grow-height {
          animation: grow-height 0.8s ease-out forwards;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        /* Smooth transitions for SVG animations */
        svg circle, svg path {
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        
        /* Custom breakpoint for extra small devices */
        @media (min-width: 475px) and (max-width: 639px) {
          .xs\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 640px) and (max-width: 767px) {
          .xs\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        /* Enhanced button hover effects */
        button:hover .group-hover\\:translate-x-1 {
          transform: translateX(4px);
        }
        
        button:hover .group-hover\\:-translate-y-1 {
          transform: translateY(-4px);
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced focus styles for accessibility */
        :focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Smooth transitions for all interactive elements */
        a, button, input, textarea {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default Contact;