"use client"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./NotFound.css"

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false)
  const notFoundRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleGoHome = () => {
    navigate("/")
  }

  // Create floating particles for background effect
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <div className="not-found-container" ref={notFoundRef}>
      {/* Background Elements */}
      <div className="not-found-bg-elements">
        <div className="not-found-bg-gradient"></div>
        <div className="not-found-bg-dots"></div>
        <div className="not-found-floating-shapes">
          <div className="not-found-shape not-found-shape-1"></div>
          <div className="not-found-shape not-found-shape-2"></div>
          <div className="not-found-shape not-found-shape-3"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="not-found-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="not-found-particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className={`not-found-content ${isVisible ? "animate" : ""}`}>
        {/* 404 Number with Glow Effect */}
        <div className="not-found-number-container">
          <h1 className="not-found-number">404</h1>
          <div className="not-found-number-glow"></div>
        </div>

        {/* Error Message */}
        <div className="not-found-message-container">
          <h2 className="not-found-title">Oops! Page Not Found</h2>
          <p className="not-found-description">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Illustration/Animation Area */}
        <div className="not-found-illustration">
          <div className="not-found-astronaut">
            <div className="astronaut-body">
              <div className="astronaut-helmet"></div>
              <div className="astronaut-suit"></div>
              <div className="astronaut-arms">
                <div className="astronaut-arm astronaut-arm-left"></div>
                <div className="astronaut-arm astronaut-arm-right"></div>
              </div>
              <div className="astronaut-legs">
                <div className="astronaut-leg astronaut-leg-left"></div>
                <div className="astronaut-leg astronaut-leg-right"></div>
              </div>
            </div>
            <div className="astronaut-shadow"></div>
          </div>

          {/* Floating Elements */}
          <div className="space-elements">
            <div className="space-star space-star-1">✦</div>
            <div className="space-star space-star-2">✧</div>
            <div className="space-star space-star-3">✦</div>
            <div className="space-planet"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="not-found-actions">
          <button className="not-found-home-btn" onClick={handleGoHome}>
            <span className="btn-icon">🏠</span>
            <span className="btn-text">Go Home</span>
            <div className="btn-ripple"></div>
          </button>

          <button className="not-found-back-btn" onClick={() => window.history.back()}>
            <span className="btn-icon">←</span>
            <span className="btn-text">Go Back</span>
            <div className="btn-ripple"></div>
          </button>
        </div>

        {/* Additional Help */}
        <div className="not-found-help">
          <p>Need help? Try these popular pages:</p>
          <div className="help-links">
            <button onClick={() => navigate("/#home")} className="help-link">
              Home
            </button>
            <button onClick={() => navigate("/#projects")} className="help-link">
              Projects
            </button>
            <button onClick={() => navigate("/#skills")} className="help-link">
              Skills
            </button>
            <button onClick={() => navigate("/#contact")} className="help-link">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
