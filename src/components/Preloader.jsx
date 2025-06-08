"use client"

import { useState, useEffect } from "react"
import "./Preloader.css"

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")
  const [isVisible, setIsVisible] = useState(true)

  // Loading messages
  const loadingMessages = [
    "Initializing...",
    "Loading Assets...",
    "Setting up Components...",
    "Preparing Portfolio...",
    "Loading Projects...",
    "Setting up Experience...",
    "Finalizing Setup...",
    "Almost Ready...",
    "Welcome!",
  ]

  useEffect(() => {
    let progressInterval
    let messageIndex = 0

    // Simulate loading progress over 5 seconds
    const startLoading = () => {
      const totalDuration = 5000 // 5 seconds
      const intervalTime = 50 // Update every 50ms
      const totalSteps = totalDuration / intervalTime
      let currentStep = 0

      progressInterval = setInterval(() => {
        currentStep++

        // Calculate progress with some randomness for realistic feel
        let baseProgress = (currentStep / totalSteps) * 100

        // Add some realistic loading patterns
        if (baseProgress < 20) {
          // Slow start
          baseProgress = baseProgress * 0.7
        } else if (baseProgress < 60) {
          // Faster middle section
          baseProgress = 20 + (baseProgress - 20) * 1.2
        } else if (baseProgress < 90) {
          // Normal speed
          baseProgress = baseProgress
        } else {
          // Slow finish for realism
          baseProgress = 90 + (baseProgress - 90) * 0.5
        }

        // Add small random variations
        const randomVariation = (Math.random() - 0.5) * 3
        const newProgress = Math.min(100, Math.max(0, baseProgress + randomVariation))

        setProgress(newProgress)

        // Update loading message based on progress
        const messageProgress = Math.floor((newProgress / 100) * loadingMessages.length)
        if (messageProgress < loadingMessages.length && messageProgress !== messageIndex) {
          messageIndex = messageProgress
          setLoadingText(loadingMessages[messageIndex])
        }

        if (currentStep >= totalSteps || newProgress >= 99.5) {
          clearInterval(progressInterval)
          setProgress(100)
          setLoadingText("Welcome!")

          // Start fade out after completion
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => {
              onComplete && onComplete()
            }, 800) // Match CSS transition duration
          }, 500)
        }
      }, intervalTime)
    }

    // Start loading after a brief delay
    const timer = setTimeout(startLoading, 300)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  // Create particles
  const particles = Array.from({ length: 9 }, (_, i) => <div key={i} className="particle"></div>)

  if (!isVisible) {
    return null
  }

  return (
    <div className={`preloader-overlay ${!isVisible ? "fade-out" : ""}`}>
      {/* Background Animation */}
      <div className="preloader-bg"></div>

      {/* Floating Particles */}
      <div className="preloader-particles">{particles}</div>

      {/* Geometric Shapes */}
      <div className="geometric-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Main Content */}
      <div className="preloader-content">
        {/* Logo Section */}
        <div className="preloader-logo">
          <h1 className="logo-text">Alis Patel</h1>
          <p className="logo-subtitle">MERN Stack Developer</p>
        </div>

        {/* Loading Animation - Choose one style */}
        <div className="preloader-animation">
          {/* Style 1: Modern Spinner */}
          <div className="spinner-modern">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>

          {/* Style 2: Pulse Dots (Uncomment to use) */}
          {/* <div className="pulse-dots">
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
          </div> */}

          {/* Style 3: Wave Animation (Uncomment to use) */}
          {/* <div className="wave-loader">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div> */}
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">{loadingText}</div>
        <div className="loading-percentage">{Math.round(progress)}%</div>
      </div>
    </div>
  )
}

export default Preloader
