"use client"

import { useEffect, useRef } from "react"
import "./hero-section.css"
import heroData from "./data/hero.json"

const Home = () => {
  const resumePdfPath = "/pdf/Resume_Ori.pdf"
  const heroRef = useRef(null)

  useEffect(() => {
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
    }

    const handleScrollAnimation = () => {
      if (heroRef.current && isInViewport(heroRef.current)) {
        heroRef.current.classList.add("active")
      }
    }

    handleScrollAnimation()
    window.addEventListener("scroll", handleScrollAnimation)

    return () => {
      window.removeEventListener("scroll", handleScrollAnimation)
    }
  }, [])

  return (
    <section className="alis-hero-main-section" id="home" ref={heroRef}>
      {/* Background Elements */}
      <div className="alis-hero-floating-shapes">
        <div className="alis-hero-shape alis-hero-shape-1"></div>
        <div className="alis-hero-shape alis-hero-shape-2"></div>
        <div className="alis-hero-shape alis-hero-shape-3"></div>
        <div className="alis-hero-shape alis-hero-shape-4"></div>
      </div>

      {/* Left Content */}
      <div className="alis-hero-content-left alis-hero-slide-left">
{/*         <h1 className="alis-hero-main-title">
          Hi, I'm <span className="highlight">Alis Patel</span>
          <br />
          MERN Stack Developer
        </h1> */}
        <p className="alis-hero-description">
          I'm a passionate full-stack developer specializing in building exceptional digital experiences. With expertise
          in React, Node.js, and modern web technologies, I create responsive and user-friendly applications that solve
          real-world problems.
        </p>
        <a
          href={resumePdfPath}
          className="alis-hero-download-btn"
          target="_blank"
          rel="noopener noreferrer"
          download="Alis_Patel_Resume.pdf"
        >
          Download Resume
        </a>
      </div>

      {/* Right Content */}
      <div className="alis-hero-content-right alis-hero-fade-in">
        <div className="alis-hero-image-container alis-hero-zoom-in">
          <img
            src={`/assets/${heroData.imgSrc}`}
            alt="Alis Patel"
            className="alis-hero-profile-image"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

export default Home
