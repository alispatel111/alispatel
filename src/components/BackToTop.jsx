"use client"

import { useState, useEffect } from "react"
import "./BackToTop.css"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculate scroll progress
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      setScrollProgress(scrollPercent)

      // Show button when user scrolls down 300px
      if (scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className={`back-to-top-container ${isVisible ? "visible" : ""}`}>
      {/* Progress Circle */}
      <div className="progress-ring">
        <svg className="progress-svg" width="60" height="60">
          <circle
            className="progress-circle-bg"
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="rgba(37, 99, 235, 0.1)"
            strokeWidth="3"
          />
          <circle
            className="progress-circle"
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: `${2 * Math.PI * 26}`,
              strokeDashoffset: `${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`,
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>

        {/* Button */}
        <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
          <div className="btn-content">
            <svg
              className="arrow-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M5 12L12 5L19 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Ripple Effect */}
          <div className="ripple-effect"></div>

          {/* Glow Effect */}
          <div className="glow-effect"></div>
        </button>

        {/* Tooltip */}
        <div className="tooltip">
          <span>Back to Top</span>
          <div className="tooltip-arrow"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </div>
  )
}

export default BackToTop
