import React, { useState, useEffect, useRef } from 'react';
import { Cloud, Terminal, Users, Award, Clock, ChevronRight, Sparkles, Zap, Target, Heart } from 'lucide-react';

export default function About() {
    const [activeSkill, setActiveSkill] = useState(null);
    const [countedValues, setCountedValues] = useState({});
    const [hasAnimated, setHasAnimated] = useState({});
    const sectionRef = useRef(null);
    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);
    const skillRefs = useRef([]);
    const statRefs = useRef([]);

    const skills = [
        { name: 'HTML', iconPath: 'icons/html.png', level: 95, color: 'from-orange-100 to-orange-100', progressColor: 'bg-gradient-to-r from-orange-500 to-orange-600' },
        { name: 'CSS', iconPath: 'icons/css.png', level: 79, color: 'from-blue-100 to-blue-100', progressColor: 'bg-gradient-to-r from-blue-500 to-blue-600' },
        { name: 'JavaScript', iconPath: '/icons/javascript.png', level: 95, color: 'from-yellow-100 to-yellow-100', progressColor: 'bg-gradient-to-r from-yellow-400 to-yellow-500' },
        { name: 'React', iconPath: '/icons/react.png', level: 90, color: 'from-blue-150 to-cyan-150', progressColor: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
        { name: 'MongoDB', iconPath: '/icons/mongodb.png', level: 80, color: 'from-emerald-100 to-emerald-100', progressColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600' },
        { name: 'Git & GitHub', iconPath: '/icons/github.png', level: 85, color: 'from-orange-50 to-red-50', progressColor: 'bg-gradient-to-r from-orange-500 to-red-500' },
        { name: 'Tailwind CSS', iconPath: 'icons/tailwind.png', level: 70, color: 'from-teal-50 to-cyan-50', progressColor: 'bg-gradient-to-r from-teal-500 to-cyan-500' },
        { name: 'Express.js', iconPath: 'icons/express.png', level: 60, color: 'from-gray-200 to-gray-200', progressColor: 'bg-gradient-to-r from-gray-600 to-gray-700' },
        { name: 'Cursor', iconPath: '/icons/cursor-ai.png', level: 75, color: 'from-purple-50 to-pink-50', progressColor: 'bg-gradient-to-r from-purple-500 to-pink-500' },
        { name: 'Vercel', iconPath: '/icons/vercel.png', level: 70, color: 'from-black-100 to-gray-100', progressColor: 'bg-gradient-to-r from-black to-gray-800' },
        { name: 'ChatGPT', iconPath: '/icons/chatgpt.png', level: 85, color: 'from-green-100 to-emerald-100', progressColor: 'bg-gradient-to-r from-green-500 to-emerald-500' },


    ];
    const experiences = [
        { year: '2023-Present', title: 'Senior Frontend Developer', company: 'TechCorp Inc.', desc: 'Leading frontend architecture for enterprise applications' },
        { year: '2021-2023', title: 'Full Stack Developer', company: 'Digital Solutions', desc: 'Built full-stack applications for various clients' },
        { year: '2019-2021', title: 'Junior Developer', company: 'WebStart Agency', desc: 'Started career building responsive websites' },
    ];

    const stats = [
        
    ];

    // Setup intersection observers for scroll animations
    useEffect(() => {
        const observers = [];

        // Observer for left column content (slide from left)
        const leftObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated['left-column']) {
                        entry.target.classList.add('animate-slide-from-left');
                        setHasAnimated(prev => ({ ...prev, ['left-column']: true }));
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        // Observer for right column content (slide from right)
        const rightObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated['right-column']) {
                        entry.target.classList.add('animate-slide-from-right');
                        setHasAnimated(prev => ({ ...prev, ['right-column']: true }));
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        // Observer for header (slide from center)
        const headerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated['header']) {
                        entry.target.classList.add('animate-slide-from-center');
                        setHasAnimated(prev => ({ ...prev, ['header']: true }));
                    }
                });
            },
            { threshold: 0.3 }
        );

        // Observer for individual skills with counting
        const skillObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillName = entry.target.dataset.skillName;
                        const skillLevel = parseInt(entry.target.dataset.skillLevel);

                        if (skillName && !hasAnimated[`skill-${skillName}`]) {
                            entry.target.classList.add('animate-fade-in');
                            animateCount(skillName, skillLevel, 50);
                            setHasAnimated(prev => ({ ...prev, [`skill-${skillName}`]: true }));
                        }
                    }
                });
            },
            { threshold: 0.3, rootMargin: '0px 0px -30px 0px' }
        );

        // Observer for stats with counting
        const statObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statIndex = entry.target.dataset.statIndex;
                        const statNumber = parseInt(entry.target.dataset.statNumber);

                        if (statIndex !== undefined && !hasAnimated[`stat-${statIndex}`]) {
                            entry.target.classList.add('animate-fade-in');
                            animateStatCount(statIndex, statNumber, 60);
                            setHasAnimated(prev => ({ ...prev, [`stat-${statIndex}`]: true }));
                        }
                    }
                });
            },
            { threshold: 0.3, rootMargin: '0px 0px -30px 0px' }
        );

        // Observe elements
        if (leftColumnRef.current) leftObserver.observe(leftColumnRef.current);
        if (rightColumnRef.current) rightObserver.observe(rightColumnRef.current);

        const headerElement = sectionRef.current?.querySelector('.section-header');
        if (headerElement) headerObserver.observe(headerElement);

        skillRefs.current.forEach((ref, index) => {
            if (ref) skillObserver.observe(ref);
        });

        statRefs.current.forEach((ref, index) => {
            if (ref) statObserver.observe(ref);
        });

        observers.push(leftObserver, rightObserver, headerObserver, skillObserver, statObserver);

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    // Animate skill count
    const animateCount = (skillName, targetValue, duration = 2000) => {
        let startValue = 0;
        const increment = targetValue / (duration / 16); // 60fps

        const updateCount = () => {
            startValue += increment;
            if (startValue < targetValue) {
                setCountedValues(prev => ({
                    ...prev,
                    [skillName]: Math.min(Math.floor(startValue), targetValue)
                }));
                requestAnimationFrame(updateCount);
            } else {
                setCountedValues(prev => ({
                    ...prev,
                    [skillName]: targetValue
                }));
            }
        };

        updateCount();
    };

    // Animate stat count
    const animateStatCount = (statIndex, targetValue, duration = 2000) => {
        let startValue = 0;
        const increment = targetValue / (duration / 16);

        const updateStat = () => {
            startValue += increment;
            if (startValue < targetValue) {
                setCountedValues(prev => ({
                    ...prev,
                    [`stat_${statIndex}`]: Math.min(Math.floor(startValue), targetValue)
                }));
                requestAnimationFrame(updateStat);
            } else {
                setCountedValues(prev => ({
                    ...prev,
                    [`stat_${statIndex}`]: targetValue
                }));
            }
        };

        updateStat();
    };

    return (
        <section id="about" ref={sectionRef} className="relative py-20 bg-white overflow-hidden scroll-mt-16">
            {/* Bubble Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/30 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-emerald-50/20 to-transparent"></div>

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

                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px),
                                    linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem',
                    opacity: 0.1
                }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                {/* Section Header - Slides from center */}
                <div className="section-header text-center mb-16 opacity-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-6 hover:shadow transition-shadow duration-300">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">ABOUT ME</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Crafting Digital
                        <span className="block text-blue-600">Experiences</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Passionate developer with a keen eye for detail and a love for creating
                        beautiful, functional web experiences. I bridge the gap between design
                        and technology to deliver exceptional results.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Slides from left */}
                    <div ref={leftColumnRef} className="space-y-8 opacity-0">
                        {/* Personal Intro */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-100 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                                        {/* Logo from public/hero/alis-logo folder */}
                                        <img
                                            src="/hero/alis-logo.png"
                                            alt="Alis Patel Logo"
                                            className="w-16 h-16 object-contain"
                                            onError={(e) => {
                                                console.error('Logo failed to load from /hero/alis-logo/logo.png');
                                                e.target.style.display = 'none';
                                                const fallback = document.createElement('div');
                                                fallback.className = 'w-16 h-16 flex items-center justify-center text-white font-bold text-xl';
                                                fallback.textContent = 'AP';
                                                e.target.parentNode.appendChild(fallback);
                                            }}
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Alis Patel</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        Hi! I'm a passionate MERN Stack Developer with expertise in creating
                                        modern, scalable web applications. I love transforming complex problems
                                        into simple, beautiful designs.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-200">
                                            Available for work
                                        </span>
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full border border-gray-200">
                                            <Clock className="w-4 h-4" />
                                            3+ years experience
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience Timeline */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200">
                                    <Award className="w-5 h-5 text-blue-600" />
                                </div>
                                <span>Professional Journey</span>
                            </h3>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <div key={index} className="relative pl-8 group" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 rounded">
                                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                        </div>
                                        <div className="bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-5 hover:shadow-md transition-all duration-300 group-hover:-translate-x-1 border border-gray-200">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-gray-900">{exp.title}</h4>
                                                <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 text-sm font-medium rounded-full border border-blue-200">
                                                    {exp.year}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                                            <p className="text-gray-600 text-sm">{exp.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Slides from right */}
                    <div ref={rightColumnRef} className="space-y-8 opacity-0">
                        {/* Skills Progress */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200">
                                    <Target className="w-5 h-5 text-blue-600" />
                                </div>
                                <span>Technical Skills</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {skills.map((skill, index) => (
                                    <div
                                        key={skill.name}
                                        ref={(el) => {
                                            skillRefs.current[index] = el;
                                            if (el) {
                                                el.dataset.skillName = skill.name;
                                                el.dataset.skillLevel = skill.level;
                                            }
                                        }}
                                        className="group opacity-0"
                                        onMouseEnter={() => setActiveSkill(skill.name)}
                                        onMouseLeave={() => setActiveSkill(null)}
                                    >
                                        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                                        <img
                                                            src={skill.iconPath}
                                                            alt={`${skill.name} logo`}
                                                            className="w-6 h-6 object-contain"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                const fallback = document.createElement('div');
                                                                fallback.className = 'w-6 h-6 flex items-center justify-center text-white font-bold';
                                                                fallback.textContent = skill.name.charAt(0);
                                                                e.target.parentNode.appendChild(fallback);
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-900 block">{skill.name}</span>
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <span className="text-lg font-bold text-blue-600 transition-all duration-300">
                                                        {countedValues[skill.name] || 0}%
                                                    </span>
                                                    {activeSkill === skill.name && (
                                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                                            Proficiency Level
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Progress Bar with customizable color */}
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-md ${skill.progressColor}`}
                                                    style={{
                                                        width: `${countedValues[skill.name] || 0}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    ref={(el) => {
                                        statRefs.current[index] = el;
                                        if (el) {
                                            el.dataset.statIndex = index;
                                            el.dataset.statNumber = stat.number;
                                        }
                                    }}
                                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group opacity-0"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-12 h-12 rounded-lg ${stat.color.split(' ')[0]} flex items-center justify-center border ${stat.color.split(' ')[2]} group-hover:scale-110 transition-transform duration-300`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                                {countedValues[`stat_${index}`] || 0}
                                                <span className="text-blue-500">{stat.suffix}</span>
                                            </div>
                                            <div className="text-sm text-gray-600">{stat.label}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        {/* <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200 group hover:shadow-md transition-all duration-300">
                            <div className="flex flex-col sm:flex-row items-center justify-between">
                                <div className="mb-4 sm:mb-0">
                                    <h4 className="font-bold text-gray-900 text-lg mb-2">Let's Build Together</h4>
                                    <p className="text-gray-600 text-sm">
                                        Have a project in mind? Let's discuss how we can work together.
                                    </p>
                                </div>
                                <button className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg active:scale-95">
                                    Get In Touch
                                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
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

                /* Scroll Animation Keyframes */
                @keyframes slideFromLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-100px) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0) translateY(0);
                    }
                }

                @keyframes slideFromRight {
                    0% {
                        opacity: 0;
                        transform: translateX(100px) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0) translateY(0);
                    }
                }

                @keyframes slideFromCenter {
                    0% {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Animation Classes */
                .animate-float-slow {
                    animation: float-slow 20s ease-in-out infinite;
                }

                .animate-float-medium {
                    animation: float-medium 15s ease-in-out infinite;
                }

                .animate-slide-from-left {
                    animation: slideFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .animate-slide-from-right {
                    animation: slideFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .animate-slide-from-center {
                    animation: slideFromCenter 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .animate-fade-in {
                    animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                /* Responsive Animation Adjustments */
                @media (max-width: 640px) {
                    @keyframes slideFromLeft {
                        0% {
                            opacity: 0;
                            transform: translateX(-50px) translateY(10px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0) translateY(0);
                        }
                    }

                    @keyframes slideFromRight {
                        0% {
                            opacity: 0;
                            transform: translateX(50px) translateY(10px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0) translateY(0);
                        }
                    }

                    @keyframes slideFromCenter {
                        0% {
                            opacity: 0;
                            transform: translateY(20px) scale(0.98);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }

                    .animate-slide-from-left,
                    .animate-slide-from-right,
                    .animate-slide-from-center {
                        animation-duration: 0.6s;
                    }

                    .animate-fade-in {
                        animation-duration: 0.4s;
                    }
                }

                @media (min-width: 641px) and (max-width: 1024px) {
                    @keyframes slideFromLeft {
                        0% {
                            opacity: 0;
                            transform: translateX(-80px) translateY(15px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0) translateY(0);
                        }
                    }

                    @keyframes slideFromRight {
                        0% {
                            opacity: 0;
                            transform: translateX(80px) translateY(15px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0) translateY(0);
                        }
                    }

                    .animate-slide-from-left,
                    .animate-slide-from-right {
                        animation-duration: 0.7s;
                    }
                }

                /* Smooth Scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Better Performance */
                .animate-slide-from-left,
                .animate-slide-from-right,
                .animate-slide-from-center,
                .animate-fade-in {
                    will-change: transform, opacity;
                }

                /* Reduce Motion Preference */
                @media (prefers-reduced-motion: reduce) {
                    .animate-slide-from-left,
                    .animate-slide-from-right,
                    .animate-slide-from-center,
                    .animate-fade-in,
                    .animate-float-slow,
                    .animate-float-medium {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }

                /* Progress Bar Smoothness */
                .transition-all {
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Touch Device Optimizations */
                @media (hover: none) and (pointer: coarse) {
                    .group:hover {
                        transform: none !important;
                    }
                    
                    .group:hover .group-hover\\:scale-110 {
                        transform: none !important;
                    }
                }

                /* Custom Progress Bar Color Configuration */
                .progress-bar-custom {
                    /* Example custom color - easily change this value */
                    background: linear-gradient(to right, #3b82f6, #6366f1);
                }
            `}</style>
        </section>
    );
}