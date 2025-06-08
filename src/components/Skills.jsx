"use client"

import { useState, useEffect, useRef } from "react"
import skills from "./data/skills.json"
import CertificateModal from "./CertificateModal"

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const skillsRef = useRef(null)
  const [flippedCard, setFlippedCard] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredPercentage, setHoveredPercentage] = useState(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState(null)

  useEffect(() => {
    // Initialize when component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (skillsRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  // Create particles for background effect
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 15 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
  }))

  // Handle card flip
  const handleCardFlip = (skillId, e) => {
    // If the click is on a button, don't propagate to prevent double flipping
    if (e && (e.target.tagName === "BUTTON" || e.target.closest("button"))) {
      e.stopPropagation()
      setFlippedCard(flippedCard === skillId ? null : skillId)
      return
    }

    // If we're clicking on the back of the card, flip it back
    if (flippedCard === skillId) {
      setFlippedCard(null)
    }
  }

  // Handle button flip
  const handleButtonFlip = (skillId, e) => {
    e.stopPropagation()
    setFlippedCard(flippedCard === skillId ? null : skillId)
  }

  // Handle percentage hover
  const handlePercentageHover = (skillId) => {
    setHoveredPercentage(skillId)
  }

  const handlePercentageLeave = () => {
    setHoveredPercentage(null)
  }

  // Handle certificate view
  const handleViewCertificate = (e, skill) => {
    e.stopPropagation()
    setSelectedSkill(skill)
    setShowCertificate(true)
  }

  // Close certificate modal
  const handleCloseCertificate = () => {
    setShowCertificate(false)
  }

  // Get detailed beginner-friendly explanation for each skill
  const getBeginnerExplanation = (title) => {
    const explanations = {
      HTML: "HTML (HyperText Markup Language) is the foundation of all websites. Think of it as the skeleton that gives structure to web pages. With HTML, you can create headings, paragraphs, lists, images, links, forms, and more. It uses tags like <h1> for headings and <p> for paragraphs to organize content. When you're browsing any website, you're looking at HTML in action!",
      CSS: "CSS (Cascading Style Sheets) is what makes websites visually appealing. If HTML is the skeleton, CSS is the skin, clothes, and makeup. It controls colors, fonts, spacing, layouts, and animations. CSS transforms plain, boring text into beautiful designs. It can position elements exactly where you want them and even create responsive designs that look good on phones, tablets, and computers.",
      Javascript:
        "JavaScript brings websites to life by adding interactivity. While HTML creates content and CSS styles it, JavaScript makes it respond to user actions. It powers features like dropdown menus, image sliders, form validations, and interactive maps. JavaScript can update content without reloading the page, create animations, and even build entire web applications. It's what makes modern websites feel dynamic and app-like.",
      React:
        "React is a popular JavaScript library that makes building interactive websites easier and faster. Created by Facebook, it breaks down complex interfaces into simple, reusable pieces called 'components.' React automatically updates only the parts of a page that need to change, making websites feel super fast. It's like building with LEGO blocks – you create small pieces that fit together to build something amazing!",
      Node: "Node.js allows JavaScript to run outside of web browsers, particularly on servers. Traditionally, JavaScript only worked in browsers, but Node.js changed that. It lets developers use the same language (JavaScript) for both the website's front-end (what users see) and back-end (server-side processing). Node.js is especially good at handling many users at once and is perfect for real-time applications like chat apps and live updates.",
      MongoDB:
        "MongoDB is a modern way to store data for websites and apps. Unlike traditional databases that organize information in rigid tables with rows and columns, MongoDB stores data in flexible, JSON-like documents. This makes it easier to work with and faster to develop with. It's perfect for applications that need to store varied types of information or that need to scale quickly as they grow in popularity.",
      "Express.js":
        "Express.js is a lightweight web framework for Node.js that simplifies building web applications and APIs. It provides a set of features for creating robust server-side applications with clean, readable code. Express handles routing, middleware integration, and HTTP requests/responses, making it easier to create server-side logic for your web applications. It's a crucial part of the MERN stack, connecting your Node.js server with your MongoDB database.",
      "Git & GitHub":
        "Git is a version control system that helps track changes in your code, while GitHub is a platform that hosts Git repositories online. Together, they allow you to save different versions of your project, collaborate with others, and revert to previous versions if needed. Git helps you manage your code history with commands like commit, push, and pull, while GitHub provides a visual interface and additional features like issue tracking and pull requests.",
      Redux:
        "Redux is a state management library for JavaScript applications, particularly popular with React. It helps manage application data in a predictable way by storing all your app's state in a single 'store.' This makes it easier to track how data changes over time and debug your application. Redux follows a one-way data flow pattern with actions, reducers, and a store, which helps maintain consistency in complex applications.",
      "Tailwind CSS":
        "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without writing traditional CSS. Instead of pre-designed components, Tailwind provides low-level utility classes that you can combine directly in your HTML to create any design. This approach gives you more flexibility and control over your styling while still speeding up development. It's perfect for creating responsive, custom designs without writing lots of custom CSS.",
      Postman:
        "Postman is a popular tool for testing and documenting APIs (Application Programming Interfaces). It provides a user-friendly interface to send HTTP requests to your server and view the responses. This makes it easier to debug your backend code, test different API endpoints, and ensure your server is responding correctly. Postman also allows you to save collections of requests, automate testing, and generate documentation for your APIs.",
      Mongoose:
        "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data and includes built-in type casting, validation, query building, and business logic hooks. Mongoose makes it easier to work with MongoDB by allowing you to define schemas with strongly-typed fields and relationships between data, bringing structure to your NoSQL database.",
      "REST API":
        "REST API (Representational State Transfer Application Programming Interface) is a set of rules and conventions for building and interacting with web services. RESTful APIs use standard HTTP methods like GET, POST, PUT, and DELETE to perform operations on resources, which are typically represented as URLs. They're stateless, meaning each request contains all the information needed to complete it, and they typically return data in JSON format. REST APIs are the standard way for web applications to communicate with servers.",
      Vercel:
        "Vercel is a cloud platform for static sites and serverless functions that enables developers to deploy websites and web services that deploy instantly and scale automatically. It's particularly well-suited for frontend frameworks like React, Next.js, and Vue.js. Vercel provides features like automatic HTTPS, global CDN distribution, and preview deployments for every git push, making it easy to deploy and share your web projects.",
      "Firebase Auth":
        "Firebase Authentication is a service that provides easy-to-use SDKs and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook, and Twitter, and more. Firebase Auth integrates with other Firebase services and handles the complex security challenges of user authentication, allowing you to focus on building your application's features.",
    }
    return (
      explanations[title] ||
      `${title} is a powerful technology used in modern web development to create interactive and dynamic applications. It's widely used in the industry for building professional websites and applications.`
    )
  }

  // Get real-world examples for each skill
  const getRealWorldExamples = (title) => {
    const examples = {
      HTML: "Every website you visit uses HTML. For example, news websites use HTML to structure articles with headlines, paragraphs, and images. Online stores use HTML to create product listings and shopping carts.",
      CSS: "Instagram uses CSS for its clean layout and photo grid. Apple's website uses CSS for smooth animations and responsive design that works on all devices.",
      Javascript:
        "Facebook uses JavaScript to update your news feed without refreshing the page. Google Maps uses it for interactive maps and directions.",
      React:
        "Facebook, Instagram, Netflix, and Airbnb all use React for their user interfaces. It helps them create consistent, fast-loading experiences.",
      Node: "Netflix uses Node.js to stream videos to millions of users. PayPal uses it to process payments securely and quickly.",
      MongoDB:
        "Companies like Uber, Forbes, and eBay use MongoDB to store and manage their data efficiently at massive scale.",
      "Express.js":
        "Twitter uses Express.js for its API services. MyFitnessPal uses it to handle millions of food logging requests daily.",
      "Git & GitHub":
        "Microsoft, Google, and virtually all tech companies use Git for version control. The Linux kernel is developed using Git, with thousands of contributors.",
      Redux:
        "Instagram uses Redux to manage its complex application state. Many e-commerce platforms use it to handle shopping cart and user authentication states.",
      "Tailwind CSS":
        "Shopify's admin dashboard uses Tailwind CSS. GitHub's Primer design system incorporates Tailwind-like utility classes.",
      Postman:
        "Developers at Salesforce use Postman to test their APIs. Stripe's engineering team uses it to validate payment processing endpoints.",
      Mongoose:
        "Trello uses Mongoose to structure its MongoDB data. Many startups use it to quickly build and iterate on their data models.",
      "REST API":
        "Twitter's API allows developers to integrate tweets into their applications. Weather apps use REST APIs to fetch current conditions and forecasts.",
      Vercel:
        "TikTok's website is deployed on Vercel. Many personal portfolios and startup landing pages use Vercel for fast, global deployment.",
      "Firebase Auth":
        "Duolingo uses Firebase Authentication for user management. Many mobile apps use it for secure, easy login functionality.",
    }
    return examples[title] || "This technology is used by many leading companies to build modern web applications."
  }

  // Get why to learn this skill
  const getWhyLearn = (title) => {
    const reasons = {
      HTML: "HTML is the most fundamental web skill. Learning it opens doors to web design, development, and content creation. It's easy to start with and essential for any web career.",
      CSS: "CSS skills are in high demand as every website needs styling. It's creative, visual, and allows you to bring designs to life. CSS knowledge is valuable for both designers and developers.",
      Javascript:
        "JavaScript is the most popular programming language in the world. It's versatile - you can build websites, mobile apps, games, and even AI applications with it. Learning JavaScript significantly increases your job opportunities.",
      React:
        "React developers are among the highest-paid in the industry. The demand for React skills continues to grow as more companies adopt it. Once you learn React, other frameworks become easier to pick up.",
      Node: "Node.js skills allow you to become a full-stack developer (someone who can work on both front-end and back-end). This versatility makes you more valuable to employers and gives you the ability to build complete applications on your own.",
      MongoDB:
        "NoSQL databases like MongoDB are increasingly popular for modern applications. Learning MongoDB complements your JavaScript skills perfectly and makes you a more well-rounded developer.",
      "Express.js":
        "Express.js is essential for building backend services with Node.js. It's lightweight, flexible, and has a huge community. Learning Express completes your MERN stack knowledge and enables you to build full-stack applications.",
      "Git & GitHub":
        "Version control is a non-negotiable skill for professional developers. Nearly every tech company uses Git, and GitHub profiles often serve as portfolios for job applications. Mastering Git workflows makes you more employable and enables effective collaboration.",
      Redux:
        "As React applications grow in complexity, state management becomes crucial. Redux is the most widely-used solution for this problem. Understanding Redux makes you more valuable for larger projects and enterprise applications.",
      "Tailwind CSS":
        "Tailwind CSS is rapidly growing in popularity due to its efficiency and flexibility. It speeds up development time significantly and works well with component-based frameworks like React. Learning Tailwind can make you more productive and marketable.",
      Postman:
        "API testing is a critical skill for both frontend and backend developers. Postman simplifies this process and is used by millions of developers daily. Familiarity with Postman demonstrates your attention to quality and testing.",
      Mongoose:
        "When working with MongoDB in Node.js applications, Mongoose is the standard ODM. It adds structure and validation to your database operations. Learning Mongoose makes working with MongoDB much more efficient and less error-prone.",
      "REST API":
        "Understanding how to design, build, and consume APIs is essential for modern web development. RESTful principles are the foundation of web communication. This knowledge enables you to integrate services and build scalable applications.",
      Vercel:
        "Deployment and DevOps skills set you apart from many junior developers. Vercel simplifies this process for frontend and full-stack applications. Learning Vercel demonstrates your ability to ship production-ready code.",
      "Firebase Auth":
        "Authentication is a complex but necessary part of most applications. Firebase Auth handles security concerns while being relatively easy to implement. This skill allows you to add secure user management to your projects quickly.",
    }
    return (
      reasons[title] ||
      "This technology is in high demand and learning it can significantly boost your career prospects in web development."
    )
  }

  // Get skill level description
  const getSkillLevel = (proficiency) => {
    if (proficiency >= 80) return "Expert"
    if (proficiency >= 60) return "Advanced"
    if (proficiency >= 10) return "Intermediate"
    return "Intermediate"
  }

  // Check if skill is eligible for certificate
  const isEligibleForCertificate = (proficiency) => {
    return proficiency >= 80 // Advanced or Expert
  }

  // Get color gradient based on proficiency
  const getGradientByProficiency = (proficiency) => {
    if (proficiency >= 80) {
      return "linear-gradient(90deg, #6366f1, #4f46e5)"
    } else if (proficiency >= 60) {
      return "linear-gradient(90deg, #f59e0b, #d97706)"
    } else {
      return "linear-gradient(90deg, #10b981, #059669)"
    }
  }

  // Get skill description
  const getSkillDescription = (title) => {
    const descriptions = {
      HTML: "The standard markup language for creating web pages",
      CSS: "Styles and layouts for web pages",
      Javascript: "Programming language that powers web interactivity",
      React: "JavaScript library for building user interfaces",
      Node: "JavaScript runtime for server-side applications",
      MongoDB: "NoSQL database for modern applications",
      "Express.js": "Web application framework for Node.js",
      "Git & GitHub": "Version control system and collaboration platform",
      Redux: "State management library for JavaScript applications",
      "Tailwind CSS": "Utility-first CSS framework for rapid UI development",
      Postman: "API development and testing tool",
      Mongoose: "MongoDB object modeling for Node.js",
      "REST API": "Architectural style for designing networked applications",
      Vercel: "Platform for frontend frameworks and static sites",
      "Firebase Auth": "Authentication service for web and mobile applications",
    }
    return descriptions[title] || `${title} technology`
  }

  // Get skill category
  const getSkillCategory = (title) => {
    const categories = {
      HTML: "Frontend",
      CSS: "Frontend",
      Javascript: "Frontend",
      React: "Frontend",
      Node: "Backend",
      MongoDB: "Database",
      "Express.js": "Backend",
      "Git & GitHub": "Others",
      Redux: "Frontend",
      "Tailwind CSS": "Frontend",
      Postman: "Others",
      Mongoose: "Backend",
      "REST API": "Backend",
      Vercel: "Others",
      "Firebase Auth": "Backend",
    }
    return categories[title] || "Other"
  }

  // Filter skills based on search term and category
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || getSkillCategory(skill.title) === activeCategory
    return matchesSearch && matchesCategory
  })

  // Get all unique categories
  const categories = ["All", ...new Set(skills.map((skill) => getSkillCategory(skill.title)))]

  return (
    <section className="skills-section" id="skills" ref={skillsRef}>
      {/* New enhanced background elements */}
      <div className="skills-bg-elements">
        <div className="skills-bg-gradient"></div>
        <div className="skills-bg-honeycomb"></div>
        <div className="skills-bg-dots"></div>
        <div className="skills-light-beam"></div>

        <div className="skills-floating-shape skills-shape-1"></div>
        <div className="skills-floating-shape skills-shape-2"></div>
        <div className="skills-floating-shape skills-shape-3"></div>

        <div className="skills-geometric-shapes">
          <div className="skills-geometric-shape skills-cube"></div>
          <div className="skills-geometric-shape skills-pyramid"></div>
          <div className="skills-geometric-shape skills-cylinder"></div>
        </div>
      </div>

      <div className="skills-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              transform: `rotate(${particle.rotation}deg)`,
            }}
          ></div>
        ))}
      </div>

      <div className="skills-content">
        <div className="skills-header">
          <div className="skills-title-container">
            <h2 className="skills-title">My Skills</h2>
            <div className="skills-title-accent"></div>
          </div>
          <p className="skills-subtitle">Technologies I've mastered</p>
        </div>

        {/* Search and Filter */}
        <div className="skills-filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-filter ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`skill-card ${isVisible ? "animate" : ""}`}
              style={{ animationDelay: `${(skill.id - 1) * 0.1}s` }}
              onClick={(e) => handleCardFlip(skill.id, e)}
            >
              <div className={`skill-card-inner ${flippedCard === skill.id ? "flipped" : ""}`}>
                {/* Front of card */}
                <div className="skill-card-front">
                  <div className="skill-card-content">
                    <div className="skill-category-badge">{getSkillCategory(skill.title)}</div>
                    <div className="skill-icon-wrapper">
                      <img src={`/assets/${skill.imageSrc}`} alt={skill.title} className="skill-icon" />
                      <div className="icon-glow"></div>
                    </div>
                    <h3 className="skill-name">{skill.title}</h3>
                    <p className="skill-description">{getSkillDescription(skill.title)}</p>
                    {isEligibleForCertificate(skill.proficiency) ? (
                      <button
                        className="certificate-btn"
                        onClick={(e) => handleViewCertificate(e, skill)}
                        aria-label={`View certificate for ${skill.title}`}
                      >
                        <span className="certificate-icon">🎓</span>
                        View Certificate
                      </button>
                    ) : (
                      <div className="skill-level">{getSkillLevel(skill.proficiency)}</div>
                    )}

                    <div className="skill-progress-container">
                      <div className="skill-progress-bar">
                        <div
                          className="skill-progress-fill"
                          style={{
                            width: isVisible ? `${skill.proficiency}%` : "0%",
                            background: getGradientByProficiency(skill.proficiency),
                          }}
                        ></div>
                      </div>
                      <div
                        className="skill-percentage"
                        onMouseEnter={() => handlePercentageHover(skill.id)}
                        onMouseLeave={handlePercentageLeave}
                      >
                        <span
                          className={`percentage-value  "animate-percentage" : ""}`}
                          data-value={skill.proficiency}
                        >
                          { `${skill.proficiency}%`}
                        </span>
                      </div>
                    </div>

                    <button
                      className="more-details-btn"
                      onClick={(e) => handleButtonFlip(skill.id, e)}
                      aria-label={`Show more details about ${skill.title}`}
                    >
                      More Details
                      <span className="btn-icon">→</span>
                    </button>
                  </div>
                  <div className="card-shine"></div>
                </div>

                {/* Back of card - Enhanced with detailed explanation */}
                <div className="skill-card-back">
                  <div className="skill-card-content">
                    <div className="back-header">
                      <div className="back-icon-wrapper">
                        <img src={`/assets/${skill.imageSrc}`} alt={skill.title} className="back-icon" />
                      </div>
                      <h3 className="back-title">{skill.title}</h3>
                      <div className="back-category-badge">{getSkillCategory(skill.title)}</div>
                    </div>

                    <div className="back-sections">
                      <div className="back-section">
                        <h4 className="back-section-title">What is it?</h4>
                        <p className="back-explanation">{getBeginnerExplanation(skill.title)}</p>
                      </div>

                      <div className="back-section">
                        <h4 className="back-section-title">Real-world examples</h4>
                        <p className="back-examples">{getRealWorldExamples(skill.title)}</p>
                      </div>

                      <div className="back-section">
                        <h4 className="back-section-title">Why learn it?</h4>
                        <p className="back-why-learn">{getWhyLearn(skill.title)}</p>
                      </div>

                      {/* Proficiency Bar */}
                      <div className="back-proficiency">
                        <div className="back-progress-label">
                          <span>My Proficiency</span>
                          <span className="back-progress-percentage">{skill.proficiency}%</span>
                        </div>
                        <div className="back-progress-bar">
                          <div
                            className="back-progress-fill"
                            style={{
                              width: `${skill.proficiency}%`,
                              background: getGradientByProficiency(skill.proficiency),
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="back-level">
                        <span className={`experience-badge ${getSkillLevel(skill.proficiency).toLowerCase()}`}>
                          {getSkillLevel(skill.proficiency)} Level
                        </span>
                      </div>

                      <button
                        className="back-btn"
                        onClick={(e) => handleButtonFlip(skill.id, e)}
                        aria-label="Go back to skill summary"
                      >
                        <span className="btn-icon">←</span>
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredSkills.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3>No skills found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("All")
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificate && selectedSkill && (
          <CertificateModal
            skill={selectedSkill}
            onClose={handleCloseCertificate}
            level={getSkillLevel(selectedSkill.proficiency)}
          />
        )}
      </div>
    </section>
  )
}

export default Skills
