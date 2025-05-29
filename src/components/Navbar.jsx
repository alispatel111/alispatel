"use client"

import { useState, useEffect } from "react"
import "./navbar.css"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hideNavbar, setHideNavbar] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideNavbar(true)
      } else {
        setHideNavbar(false)
      }

      lastScrollY = currentScrollY
      setScrolled(currentScrollY > 50)

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id], div[id]")
      let currentSection = "home"

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id")
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(".alis-portfolio-navbar")) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav
      className={`alis-portfolio-navbar ${scrolled ? "alis-scrolled" : ""} ${hideNavbar ? "alis-hidden" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <a
          href="#home"
          className="alis-portfolio-logo"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick("home")
          }}
          aria-label="Alis Patel - Go to home section"
        >
          Alis Patel
        </a>

        <button
          className="alis-portfolio-mobile-btn"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
        >
          {mobileMenuOpen ? (
            <span className="alis-portfolio-close-icon" aria-hidden="true">
              ✕
            </span>
          ) : (
            <span className="alis-portfolio-menu-icon" aria-hidden="true">
              ☰
            </span>
          )}
        </button>

        <div
          id="main-navigation"
          className={`alis-portfolio-nav-menu ${mobileMenuOpen ? "alis-mobile-active" : ""}`}
          role="menu"
        >
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`alis-portfolio-nav-item ${activeSection === item.id ? "alis-active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.id)
              }}
              role="menuitem"
              tabIndex={mobileMenuOpen || window.innerWidth > 768 ? 0 : -1}
              style={{ "--item-index": index + 1 }}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
