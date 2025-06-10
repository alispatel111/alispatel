"use client"

import { useEffect, useRef, useState } from "react"
import { FaMapMarkerAlt, FaChevronDown, FaCheckCircle, FaExternalLinkAlt, FaGithub } from "react-icons/fa"

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false)
  const experienceRef = useRef(null)
  const [expandedItems, setExpandedItems] = useState({})
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (experienceRef.current) {
      observer.observe(experienceRef.current)
    }

    return () => {
      if (experienceRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const experiences = [
    {
      id: 1,
      role: "Summer Internship",
      company: "ByteXL",
      companyLogo: "/assets/company/bytexl.png",
      location: "Office",
      startDate: "Summer 2023",
      endDate: "",
      description:
        "Developed and maintained web applications using the MERN stack. Created responsive UI components with React and integrated them with Node.js backend. Implemented RESTful APIs and worked with MongoDB database for data storage and retrieval.",
      skills: ["HTML", "CSS", "Javascript"],
      badgeClass: "experience-summer-badge",
      achievements: [
        "Developed a customer dashboard that improved user engagement by 35%",
        "Implemented responsive design that reduced bounce rate by 20% on mobile devices",
      ],
      links: [
        {
          text: "View Certificate",
          url: "https://drive.google.com/file/d/12G-t03kzAkn7U_KslpBucwAcyyA1XFzt/view",
          icon: <FaExternalLinkAlt className="experience-link-icon" />,
        },
      ],
    },
    {
      id: 2,
      role: "Intern MERN Stack Developer",
      company: "FlyAnyTrip",
      companyLogo: "/assets/company/flyanytrip.png",
      location: "Office",
      startDate: "Jan 2025",
      endDate: "June 2025",
      description:
        "Assisted in developing a travel booking portal using the MERN stack. Implemented responsive UI components with React and integrated them with Node.js backend. Worked on database design and API development for the booking system.",
      skills: ["React", "Node.js", "MongoDB", "Express.js", "Git"],
      badgeClass: "",
      achievements: [
        "Built a real-time booking system that increased conversion rates by 25%",
        "Developed a payment integration system that processed over 1000 transactions",
        "Created a responsive UI that worked seamlessly across all devices",
        "Implemented user authentication and authorization with JWT",
      ],
      links: [
        {
          text: "View Website",
          url: "https://tripeasy.in/",
          icon: <FaExternalLinkAlt className="experience-link-icon" />,
        },

      ],
    },
    {
      id: 3,
      role: "Junior MERN Stack Developer",
      company: "FlyAnyTrip",
      companyLogo: "/assets/company/flyanytrip.png",
      location: "Vadodara (Office)",
      startDate: "July 2024",
      endDate: "Present",
      description:
        "Currently working on the admin panel of a travel platform using the MERN stack. Built features that allow admins to manage travel packages without editing code manually. Implemented image and PDF upload, toast notifications, and role-based access control.",
      skills: ["React", "Node.js", "MongoDB", "Express.js", "Git"],
      badgeClass: "",
      achievements: [
        "Developed a dynamic admin panel to manage packages in real-time",
        "Integrated image and PDF upload functionality for content updates",
        "Implemented toast notifications for create, update, and delete actions",
        "Built role-based UI to restrict access to admin features"
      ],
      links: [
        {
          text: "View Website",
          url: "https://tripeasy.in/admin/login",
          icon: <FaExternalLinkAlt className="experience-link-icon" />,
        },
      ],
    }

  ]

  return (
    <section className="experience-section" id="experience" ref={experienceRef}>
      <div className="experience-bg-elements">
        <div className="experience-bg-gradient"></div>
        <div className="experience-bg-grid"></div>
        <div className="experience-bg-dots"></div>
        <div className="experience-floating-shape experience-shape-1"></div>
        <div className="experience-floating-shape experience-shape-2"></div>
        <div className="experience-floating-shape experience-shape-3"></div>
      </div>

      <div className="experience-container">
        <div className="experience-header">
          <div className="experience-title-container">
            <h2 className="experience-title">Experience</h2>
            <div className="experience-title-accent"></div>
          </div>
          <p className="experience-description">
            My professional journey as a web developer, showcasing my work experience and the skills I've gained along
            the way. Each role has contributed to my growth as a developer and allowed me to build real-world
            applications.
          </p>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`experience-item ${isVisible ? "animate" : ""}`}
              style={{ animationDelay: `${(exp.id - 1) * 0.3}s` }}
              onMouseEnter={() => setHoveredItem(exp.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="experience-dot-container">
                <div className="experience-dot"></div>
              </div>
              <div className="experience-card">
                <div className="experience-card-shine"></div>
                <div className={`experience-date-badge ${exp.badgeClass}`}>
                  {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                </div>
                <h3 className="experience-role">{exp.role}</h3>
                <div className="experience-company-location">
                  <div className="experience-company">
                    <div className="experience-company-logo">
                      <img src={exp.companyLogo || "/placeholder.svg"} alt={exp.company} />
                    </div>
                    {exp.company}
                  </div>
                  <div className="experience-location">
                    <span className="experience-location-icon">
                      <FaMapMarkerAlt />
                    </span>
                    {exp.location}
                  </div>
                </div>
                <p className="experience-description-text">{exp.description}</p>
                <div className="experience-skills">
                  {exp.skills.map((skill, index) => (
                    <span key={index} className="experience-skill">
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  className="experience-expand-btn"
                  onClick={() => toggleExpand(exp.id)}
                  aria-label={expandedItems[exp.id] ? "Collapse details" : "Expand details"}
                >
                  <FaChevronDown
                    style={{
                      transform: expandedItems[exp.id] ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>

                <div className={`experience-expanded-content ${expandedItems[exp.id] ? "active" : ""}`}>
                  <ul className="experience-achievements">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="experience-achievement">
                        <span className="experience-achievement-icon">
                          <FaCheckCircle />
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.links && exp.links.length > 0 && (
                    <div className="experience-links">
                      {exp.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="experience-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.icon}
                          {link.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
