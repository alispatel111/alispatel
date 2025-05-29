"use client"

import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import NotFound from "./components/NotFound"
import "./projects.css"
import "./components/skills-section.css"
import "./components/certificate.css"
import "./components/experience.css"

const MainContent = () => {
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
      </div>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/p" element={<MainContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
