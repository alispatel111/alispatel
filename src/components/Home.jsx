"use client"

import { useEffect, useRef } from "react"
import pdf from "../pdf/Resume_Ori.pdf"
import hero from "./data/hero.json"
import Typed from "typed.js"
import "./hero-section.css"

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

    return () => {
      typed.destroy()
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
        <a href={pdf} download="Alis_Patel_Resume" className="alis-hero-download-btn alis-hero-fade-in">
          Download Resume
        </a>
      </div>
      <div className="alis-hero-content-right">
        <div className="alis-hero-image-container alis-hero-zoom-in">
          <img src={`/assets/${hero.imgSrc}`} alt="Alis Patel" loading="lazy" className="alis-hero-profile-image" />
        </div>
      </div>
    </section>
  )
}

export default Home
