"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

const Home = () => {
  const typeRef = useRef(null)

  useEffect(() => {
    const options = {
      strings: ["MERN Stack Dev"],
      typeSpeed: 50,
      loop: false,
      showCursor: true,
      cursorChar: "",
    }

    const typed = new Typed(typeRef.current, options)

    // Optimize hero image loading
    const heroImage = document.querySelector(".alis-hero-profile-image")
    if (heroImage) {
      // Add loading priority
      heroImage.loading = "eager"
      heroImage.fetchPriority = "high"

      // Add onload handler
      heroImage.onload = () => {
        heroImage.classList.add("loaded")
      }
    }

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <section id="home" className="home">
      <div className="container">
        <div className="home-wrapper">
          <div className="home-text">
            <h1>Hi, I'm Alisher</h1>
            <h2 ref={typeRef}></h2>
            <p>
              I am a full-stack web developer with a passion for creating dynamic and user-friendly web applications.
            </p>
            <div className="home-buttons">
              <a href="#about" className="btn btn-primary">
                About Me
              </a>
              <a href="#projects" className="btn btn-secondary">
                Projects
              </a>
            </div>
          </div>
          <div className="home-image">
            <img src="/images/profile.jpg" alt="Alisher" className="alis-hero-profile-image" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
