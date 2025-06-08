"use client"

import { useEffect, useRef, useCallback } from "react"
import pdf from "/pdf/alis resume.pdf"
import hero from "./data/hero.json"
import Typed from "typed.js"
import "./hero-section.css"

const Home = () => {
  const typeRef = useRef(null)
  const typedInstance = useRef(null)

  // Memoized typed.js initialization
  const initializeTyped = useCallback(() => {
    if (typeRef.current && !typedInstance.current) {
      const options = {
        strings: ["MERN Stack Dev"],
        typeSpeed: 50,
        loop: false,
        showCursor: true,
        cursorChar: "",
      }

      typedInstance.current = new Typed(typeRef.current, options)
    }
  }, [])

  useEffect(() => {
    // Delay initialization slightly for better performance
    const timeoutId = setTimeout(initializeTyped, 100)

    return () => {
      clearTimeout(timeoutId)
      if (typedInstance.current) {
        typedInstance.current.destroy()
        typedInstance.current = null
      }
    }
  }, [initializeTyped])

  // Optimized scroll handler
  const scrollToNextSection = useCallback(() => {
    const aboutSection =
      document.getElementById("about") || document.getElementById("skills") || document.getElementById("projects")

    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [])

  return (
    <section className="alis-hero-main-section" id="home">
      <div className="alis-hero-floating-shapes">
        <div className="alis-hero-shape alis-hero-shape-1"></div>
        <div className="alis-hero-shape alis-hero-shape-2"></div>
        <div className="alis-hero-shape alis-hero-shape-3"></div>
        <div className="alis-hero-shape alis-hero-shape-4"></div>
      </div>

      <div className="alis-hero-content-left alis-hero-slide-left">
        <h1 ref={typeRef} className="alis-hero-main-title"></h1>
        <p className="alis-hero-description alis-hero-fade-in">
          I'm a passionate web developer specializing in creating modern, responsive web applications. With expertise in
          the MERN stack, I build solutions that are both functional and visually appealing. Let's work together to
          bring your ideas to life!
        </p>
        <a
          href={pdf}
          download="Alis_Patel_Resume"
          className="alis-hero-download-btn alis-hero-fade-in"
          rel="noopener noreferrer"
        >
          Download Resume
        </a>
      </div>
      <div className="alis-hero-content-right">
        <div className="alis-hero-image-container alis-hero-zoom-in">
          <img
            src={`/assets/${hero.imgSrc}`}
            alt="Alis Patel"
            loading="eager"
            decoding="async"
            className="alis-hero-profile-image"
            width="400"
            height="400"
          />
        </div>
      </div>

      <div className="alis-hero-scroll-indicator" onClick={scrollToNextSection}>
        <span className="alis-hero-scroll-text">Scroll Down</span>
        <div className="alis-hero-scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Home
