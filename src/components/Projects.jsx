"use client"

import { useState, useRef, useEffect } from "react"
import project from "./data/project.json"

const Projects = () => {
  const [isInView, setIsInView] = useState(false)
  const projectsRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [flippedCards, setFlippedCards] = useState({})
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isScrollingCard, setIsScrollingCard] = useState(false)

  // Get unique categories from projects
  const categories = ["all", ...new Set(project.map((p) => p.category).filter(Boolean))]

  // Filter projects based on selected category
  const filteredProjects = activeFilter === "all" ? project : project.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => {
      if (projectsRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  // Add effect to control body scroll when card is being scrolled
  useEffect(() => {
    if (isScrollingCard) {
      // Prevent body scroll
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      // Restore body scroll
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
    }
  }, [isScrollingCard])

  const toggleCardFlip = (projectKey, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    console.log("Toggling card flip for:", projectKey)
    setFlippedCards((prev) => ({
      ...prev,
      [projectKey]: !prev[projectKey],
    }))
  }

  // FIXED: Better back button function
  const handleBackButton = (projectKey) => {
    console.log("Back button clicked for project:", projectKey)
    setFlippedCards((prev) => ({
      ...prev,
      [projectKey]: false,
    }))
    setIsScrollingCard(false)
  }

  const handleMouseMove = (e, cardId) => {
    if (hoveredCard !== cardId || flippedCards[cardId]) return

    const card = document.getElementById(`enhanced-project-card-${cardId}`)
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / 30) * -1
    const rotateY = (x - centerX) / 30

    card.style.transition = "transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)"
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.02, 1.02, 1.02)
    `

    const shadowX = rotateY * 0.2
    const shadowY = rotateX * -0.2
    card.style.boxShadow = `
      ${shadowX}px ${shadowY}px 20px rgba(37, 99, 235, 0.2),
      0 8px 16px rgba(226, 232, 240, 0.6),
      0 0 10px rgba(37, 99, 235, 0.1)
    `

    const shine = card.querySelector(".enhanced-project-card-shine")
    if (shine) {
      shine.style.opacity = "0.7"
      shine.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(37, 99, 235, 0.3) 0%,
          rgba(37, 99, 235, 0.1) 50%,
          rgba(37, 99, 235, 0) 80%
        )
      `
    }
  }

  const handleMouseLeave = (cardId) => {
    setHoveredCard(null)
    const card = document.getElementById(`enhanced-project-card-${cardId}`)
    if (card && !flippedCards[cardId]) {
      card.style.transition = "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
      card.style.boxShadow = "0 10px 30px rgba(37, 99, 235, 0.1)"

      const shine = card.querySelector(".enhanced-project-card-shine")
      if (shine) {
        shine.style.opacity = "0"
      }
    }
  }

  // Handle mouse enter/leave for scroll isolation
  const handleCardMouseEnter = (cardKey) => {
    if (flippedCards[cardKey]) {
      setIsScrollingCard(true)
    }
  }

  const handleCardMouseLeave = (cardKey) => {
    setIsScrollingCard(false)
  }

  // FIXED: Enhanced wheel scroll handler
  useEffect(() => {
    const handleWheelEvent = (e) => {
      // Check if we're scrolling inside a flipped card
      const flippedCardKeys = Object.keys(flippedCards).filter((key) => flippedCards[key])

      if (flippedCardKeys.length === 0) return

      // Find if the mouse is over a flipped card
      const target = e.target
      const cardElement = target.closest(".enhanced-project-card.flipped")

      if (cardElement) {
        const cardId = cardElement.id.replace("enhanced-project-card-", "")

        if (flippedCards[cardId]) {
          // Prevent default scroll behavior
          e.preventDefault()
          e.stopPropagation()

          // Find the scroll container
          const scrollContainer = cardElement.querySelector(".project-card-back-content")

          if (scrollContainer) {
            // Apply scroll with wheel delta
            const scrollAmount = e.deltaY * 2 // Increased scroll speed
            scrollContainer.scrollTop += scrollAmount
          }
        }
      }
    }

    // Add wheel event listener to document
    document.addEventListener("wheel", handleWheelEvent, { passive: false })

    return () => {
      document.removeEventListener("wheel", handleWheelEvent)
    }
  }, [flippedCards])

  // Enhanced project details
  const getProjectDetails = (item) => {
    const projectDetailsMap = {
      1: {
        overview: `Dashboard is a comprehensive data visualization platform built with React 18, TypeScript, Chart.js, and Tailwind CSS. This project represents a complete solution for monitoring and analyzing complex datasets in real-time.

The dashboard features an intuitive interface that allows users to interact with various types of charts and graphs, providing deep insights into their data. The platform supports multiple data sources and offers customizable widgets that can be arranged according to user preferences.

Key architectural decisions include the use of React hooks for state management, TypeScript for type safety, and Chart.js for robust data visualization capabilities. The application follows modern React patterns including custom hooks, context providers, and optimized rendering strategies.

The responsive design ensures that the dashboard works seamlessly across all device types, from desktop computers to mobile phones. Special attention has been paid to performance optimization, ensuring that even large datasets render smoothly without compromising user experience.

Security features include role-based access control, data encryption, and secure API endpoints. The platform also includes comprehensive error handling and logging mechanisms to ensure reliability and ease of debugging.

The dashboard supports real-time data updates through WebSocket connections, allowing users to see changes in their data as they happen. This makes it particularly useful for monitoring live systems and tracking key performance indicators.

Advanced filtering and search capabilities allow users to drill down into specific data points and create custom views. The export functionality supports multiple formats including PDF, Excel, and CSV, making it easy to share insights with stakeholders.`,
        features: [
          "Interactive charts and graphs with real-time data visualization",
          "Responsive design that adapts to all screen sizes seamlessly",
          "Dark/Light theme toggle with smooth transitions",
          "Data export capabilities in multiple formats (PDF, Excel, CSV)",
          "User authentication with role-based access control",
          "Real-time notifications and customizable alerts system",
          "Advanced filtering and search functionality",
          "Drag-and-drop dashboard customization",
          "WebSocket integration for live data updates",
          "Comprehensive error handling and logging",
          "Multi-language support with i18n",
          "Offline mode with data synchronization",
        ],
        techDetails:
          "Built with React 18, TypeScript, Chart.js, Tailwind CSS, WebSocket, Redux Toolkit, and Node.js backend",
      },
      2: {
        overview: `Todo Application is a feature-rich task management system designed to help users organize their daily activities efficiently. Built with React and modern JavaScript, this application demonstrates advanced state management patterns and user interface design principles.

The application provides a comprehensive set of features for task management, including the ability to create, read, update, and delete tasks with ease. Users can organize their tasks into categories, set priorities, and track completion status through an intuitive interface.

The architecture emphasizes performance and user experience, utilizing React hooks for state management and implementing optimistic updates for immediate user feedback. Local storage integration ensures that user data persists across browser sessions, providing a reliable offline experience.

The drag-and-drop functionality allows users to reorder tasks effortlessly, while the search and filter capabilities help users find specific tasks quickly. The application also includes advanced features like due date reminders, task dependencies, and progress tracking.

Accessibility has been a key consideration throughout the development process, with proper ARIA labels, keyboard navigation support, and screen reader compatibility. The responsive design ensures that the application works well on all devices, from desktop computers to smartphones.

The application includes comprehensive error handling and validation to ensure data integrity and provide helpful feedback to users. Performance optimizations include lazy loading, memoization, and efficient re-rendering strategies to maintain smooth operation even with large task lists.

Integration with browser notifications allows users to receive reminders about upcoming deadlines, while the export functionality enables users to backup their data or share task lists with others.`,
        features: [
          "Complete CRUD operations with intuitive user interface",
          "Beautiful toast notifications with custom animations",
          "Local storage integration for offline data persistence",
          "Drag and drop functionality for seamless task reordering",
          "Category-based organization with color coding",
          "Advanced search and filter capabilities",
          "Due date reminders and priority management",
          "Export tasks to various formats",
          "Task dependencies and subtask support",
          "Progress tracking and analytics",
          "Keyboard shortcuts for power users",
          "Bulk operations for multiple tasks",
        ],
        techDetails:
          "React, JavaScript ES6+, CSS3 animations, Local Storage API, Web Notifications API, and Service Workers",
      },
      3: {
        overview: `Banking Website is a modern, professional web application that showcases contemporary design principles and advanced web development techniques. This project demonstrates expertise in creating pixel-perfect implementations from design mockups while maintaining excellent performance and accessibility standards.

The website features a sophisticated design language that conveys trust and professionalism, essential qualities for financial services. Every element has been carefully crafted to provide an optimal user experience, from the interactive hero section to the detailed service descriptions.

The development process involved close collaboration with designers to ensure that the final implementation matched the original vision while incorporating web-specific optimizations and enhancements. Special attention was paid to typography, spacing, and visual hierarchy to create a cohesive and engaging user experience.

Performance optimization was a key focus throughout development, with techniques including image optimization, lazy loading, code splitting, and efficient CSS delivery. The result is a website that loads quickly and provides smooth interactions across all devices and network conditions.

Accessibility compliance ensures that the website is usable by people with disabilities, following WCAG guidelines and implementing proper semantic markup, keyboard navigation, and screen reader support. This commitment to inclusivity reflects modern web development best practices.

The responsive design approach ensures that the website provides an excellent experience across all device types, from large desktop monitors to small mobile screens. Careful consideration was given to touch interactions, viewport optimization, and content prioritization for different screen sizes.

SEO optimization includes proper meta tags, structured data, semantic HTML, and performance optimizations that contribute to better search engine rankings and improved discoverability.`,
        features: [
          "Modern banking interface with professional design language",
          "Fully responsive layout optimized for all device types",
          "Interactive hero section with engaging animations",
          "Comprehensive service showcase with detailed descriptions",
          "Customer testimonials carousel with smooth transitions",
          "Contact form with real-time validation and feedback",
          "Accessibility-first design with WCAG compliance",
          "SEO-optimized structure and meta tags",
          "Performance optimized with lazy loading",
          "Cross-browser compatibility testing",
          "Progressive enhancement approach",
          "Security-focused implementation",
        ],
        techDetails: "HTML5, CSS3, Vanilla JavaScript, SCSS, Webpack, Babel, and modern web APIs",
      },
    }

    return (
      projectDetailsMap[item.key] || {
        overview: `This project represents a comprehensive web application built with modern technologies and best practices. The development process involved careful planning, iterative design, and thorough testing to ensure a high-quality end product.

The application architecture follows industry standards and incorporates proven patterns for maintainability and scalability. Special attention has been paid to code organization, documentation, and testing to ensure long-term sustainability.

Performance optimization techniques have been implemented throughout the application, including efficient algorithms, optimized asset delivery, and responsive design principles. The result is an application that provides excellent user experience across all devices and network conditions.

Security considerations have been integrated from the ground up, with proper input validation, secure communication protocols, and protection against common web vulnerabilities. Regular security audits and updates ensure ongoing protection.

The user interface design emphasizes usability and accessibility, with intuitive navigation, clear visual hierarchy, and comprehensive keyboard and screen reader support. User feedback has been incorporated throughout the development process to refine and improve the experience.`,
        features: [
          "Modern and responsive design implementation",
          "Clean and intuitive user interface",
          "Optimized performance and fast loading",
          "Cross-browser compatibility",
          "Comprehensive error handling",
          "Accessibility compliance",
          "SEO optimization",
          "Security best practices",
        ],
        techDetails: "React, CSS3, JavaScript, and modern web development tools",
      }
    )
  }

  return (
    <section className="enhanced-projects-section" id="projects" ref={projectsRef}>
      <div className="enhanced-projects-bg">
        <div className="enhanced-projects-gradient-bg"></div>
        <div className="enhanced-projects-pattern-bg"></div>
        <div className="enhanced-projects-floating-elements">
          <div className="enhanced-projects-floating-cube"></div>
          <div className="enhanced-projects-floating-circle"></div>
          <div className="enhanced-projects-floating-pyramid"></div>
          <div className="enhanced-projects-floating-dots"></div>
        </div>
      </div>

      <div className="enhanced-projects-container">
        <div className="enhanced-projects-header">
          <div className="enhanced-projects-title-container">
            <h2 className="enhanced-projects-title">My Projects</h2>
            <div className="enhanced-projects-title-accent"></div>
          </div>
          <p className="enhanced-projects-description">
            A comprehensive showcase of my development journey, featuring innovative solutions and creative
            implementations. Each project represents hours of dedication, problem-solving, and continuous learning in
            modern web development.
          </p>

          {categories.length > 1 && (
            <div className="enhanced-projects-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`enhanced-projects-filter-btn ${activeFilter === category ? "active" : ""}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="enhanced-projects-grid-container">
          <div className="enhanced-projects-grid">
            {filteredProjects.map((item, index) => {
              const details = getProjectDetails(item)
              return (
                <div
                  id={`enhanced-project-card-${item.key}`}
                  key={item.key}
                  className={`enhanced-project-card ${isInView ? "animate" : ""} ${flippedCards[item.key] ? "flipped" : ""} ${item.featured ? "featured" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => {
                    setHoveredCard(item.key)
                    handleCardMouseEnter(item.key)
                  }}
                  onMouseMove={(e) => handleMouseMove(e, item.key)}
                  onMouseLeave={() => {
                    handleMouseLeave(item.key)
                    handleCardMouseLeave(item.key)
                  }}
                >
                  <div className="enhanced-project-card-inner">
                    {/* Front Side */}
                    <div className="enhanced-project-card-front">
                      <div className="enhanced-project-image-container">
                        <img
                          src={item.imageSrc || "/placeholder.svg?height=600&width=800&query=modern tech project"}
                          alt={item.title}
                          className="enhanced-project-image"
                        />
                        <div className="enhanced-project-overlay">
                          <button
                            className="enhanced-project-view-details-btn"
                            onClick={(e) => toggleCardFlip(item.key, e)}
                          >
                            <span className="enhanced-btn-icon">🔍</span>
                            <span className="enhanced-btn-text">Explore Details</span>
                          </button>
                        </div>
                        <div className="enhanced-project-gradient-overlay"></div>
                      </div>

                      <div className="enhanced-project-content">
                        <div className="enhanced-project-header">
                          <h3 className="enhanced-project-title">{item.title}</h3>
                          {item.status && (
                            <span className={`enhanced-project-status ${item.status.toLowerCase()}`}>
                              <span className="enhanced-status-dot"></span>
                              {item.status}
                            </span>
                          )}
                        </div>

                        <div className="enhanced-project-tags">
                          {item.tags &&
                            item.tags.slice(0, 4).map((tag, i) => (
                              <span key={i} className="enhanced-project-tag">
                                {tag}
                              </span>
                            ))}
                        </div>

                        <p className="enhanced-project-description">
                          {item.description.length > 120
                            ? `${item.description.substring(0, 120)}...`
                            : item.description}
                        </p>

                        <div className="enhanced-project-footer">
                          <div className="enhanced-project-tech-preview">
                            {item.techIcons &&
                              item.techIcons.slice(0, 4).map((icon, i) => (
                                <div key={i} className="enhanced-project-tech-icon-small">
                                  <img src={icon || "/placeholder.svg"} alt="Technology icon" />
                                </div>
                              ))}
                          </div>
                          <div className="enhanced-project-links">
                            <a
                              href={item.demo}
                              className="enhanced-project-link enhanced-demo-link"
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="enhanced-link-icon">🚀</span>
                              Demo
                            </a>
                            <a
                              href={item.source}
                              className="enhanced-project-link enhanced-source-link"
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="enhanced-link-icon">💻</span>
                              Code
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Back Side with Scrollable Content */}
                    <div className="enhanced-project-card-back">
                      <div className="enhanced-project-back-header">
                        <div className="enhanced-project-back-title-section">
                          <h3 className="enhanced-project-back-title">{item.title}</h3>
                          <p className="enhanced-project-back-subtitle">Detailed Project Overview</p>
                        </div>
                        {/* FIXED: Simple back button with direct onClick */}
                        <button
                          className="project-back-button"
                          onClick={() => handleBackButton(item.key)}
                          type="button"
                        >
                          <span className="back-button-icon">←</span>
                          <span className="back-button-text">Back</span>
                        </button>
                      </div>

                      <div className="project-card-back-content">
                        <div className="project-overview-section">
                          <h4 className="overview-section-title">
                            <span className="overview-section-icon">📋</span>
                            Project Overview
                          </h4>
                          <div className="overview-content-scrollable">
                            <p className="overview-text-content">{details.overview}</p>
                            <p className="overview-tech-details">{details.techDetails}</p>
                          </div>
                        </div>

                        <div className="project-features-section">
                          <h4 className="features-section-title">
                            <span className="features-section-icon">✨</span>
                            Key Features
                          </h4>
                          <ul className="project-features-list">
                            {details.features.map((feature, i) => (
                              <li key={i} className="project-feature-item">
                                <span className="feature-bullet-point">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="project-action-buttons">
                          <a
                            href={item.demo}
                            className="project-demo-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="demo-button-icon">🚀</span>
                            Live Demo
                          </a>
                          <a
                            href={item.source}
                            className="project-source-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="source-button-icon">💻</span>
                            Source Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="enhanced-project-card-shine"></div>
                  <div className="enhanced-project-card-border-effect"></div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Show message if no projects */}
        {filteredProjects.length === 0 && (
          <div className="enhanced-no-projects">
            <div className="enhanced-no-projects-icon">🔍</div>
            <h3>No projects found</h3>
            <p>No projects match the current filter. Try selecting a different category.</p>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="enhanced-projects-decorative-shapes">
          <div className="enhanced-projects-shape enhanced-projects-shape-1"></div>
          <div className="enhanced-projects-shape enhanced-projects-shape-2"></div>
          <div className="enhanced-projects-shape enhanced-projects-shape-3"></div>
          <div className="enhanced-projects-shape enhanced-projects-shape-4"></div>
        </div>
      </div>
    </section>
  )
}

export default Projects
