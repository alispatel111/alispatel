"use client"

import { useEffect } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import "./projects.css"
import "./components/skills-section.css"
import "./components/certificate.css"
import "./components/experience.css"

import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Contact from "./components/Contact"

// import Link from "./components/Link"
// import SimpleFooter from "./components/SimpleFooter"

const App = () => {
  useEffect(() => {
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
    }

    const handleScrollAnimation = () => {
      const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in")

      animatedElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add("active")
        }
      })
    }

    handleScrollAnimation()
    window.addEventListener("scroll", handleScrollAnimation)

    return () => {
      window.removeEventListener("scroll", handleScrollAnimation)
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="container">
        <Home />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        {/* <Link /> */}
        {/* <SimpleFooter /> */}
      </div>
    </>
  )
}

export default App
