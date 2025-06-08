"use client"

import { useState, useRef, useEffect } from "react"
import emailjs from "@emailjs/browser"
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaTimes,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa"
import "./Contact.css"

const Contact = () => {
  const contactFormRef = useRef()
  const [contactFormData, setContactFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  })
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [showContactSuccess, setShowContactSuccess] = useState(false)
  const [showGreenTickAnim, setShowGreenTickAnim] = useState(false)
  const [focusedContactField, setFocusedContactField] = useState({})

  // Debug state logging
  useEffect(() => {
    console.log("🔍 CONTACT COMPONENT STATE:")
    console.log("showGreenTickAnim:", showGreenTickAnim)
    console.log("showContactSuccess:", showContactSuccess)
    console.log("isContactSubmitting:", isContactSubmitting)
  }, [showGreenTickAnim, showContactSuccess, isContactSubmitting])

  const handleContactInputChange = (e) => {
    const { name, value } = e.target
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactFieldFocus = (fieldName) => {
    setFocusedContactField((prev) => ({
      ...prev,
      [fieldName]: true,
    }))
  }

  const handleContactFieldBlur = (fieldName, value) => {
    if (!value) {
      setFocusedContactField((prev) => ({
        ...prev,
        [fieldName]: false,
      }))
    }
  }

  const testGreenTick = () => {
    console.log("🧪 TESTING GREEN TICK ANIMATION")
    console.log("Current showGreenTickAnim state:", showGreenTickAnim)

    setShowGreenTickAnim(true)
    console.log("✅ Green tick animation triggered!")

    setTimeout(() => {
      setShowGreenTickAnim(false)
      console.log("❌ Green tick animation hidden")
    }, 3000)
  }

  const sendContactEmail = (e) => {
    e.preventDefault()
    console.log("🎯 FORM SUBMISSION STARTED")
    setIsContactSubmitting(true)

    // For testing, let's simulate success without EmailJS
    setTimeout(() => {
      console.log("✅ Simulating successful email send")
      setIsContactSubmitting(false)

      // Show green tick animation first
      console.log("🎬 Starting green tick animation")
      setShowGreenTickAnim(true)

      // After tick animation, show success modal
      setTimeout(() => {
        console.log("🎬 Hiding green tick, showing success modal")
        setShowGreenTickAnim(false)
        setShowContactSuccess(true)
      }, 2000)

      // Reset form
      setContactFormData({
        user_name: "",
        user_email: "",
        subject: "",
        message: "",
      })
      setFocusedContactField({})

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowContactSuccess(false)
      }, 7000)
    }, 1000)

    // Uncomment this for real EmailJS integration

    emailjs
      .sendForm("service_emu2xai", "template_kg970bi", contactFormRef.current, "SVKz-D0cD8hn6RRgw")
      .then((result) => {
        console.log("Email sent successfully:", result.text)
        setIsContactSubmitting(false)
        setShowGreenTickAnim(true)
        setTimeout(() => {
          setShowGreenTickAnim(false)
          setShowContactSuccess(true)
        }, 2000)
        // Reset form and hide success message...
      })
      .catch((error) => {
        console.error("Email sending failed:", error.text)
        setIsContactSubmitting(false)
        alert("Failed to send message. Please try again.")
      })
  }

  const closeContactSuccessModal = () => {
    setShowContactSuccess(false)
  }

  // Custom X (Twitter) Icon Component
  const XIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ display: "block" }}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )

  return (
    <div className="contact-main-page" id="contact">
      {/* Debug Panel */}
      {/* <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 999998,
          fontFamily: 'monospace'
        }}>
          <div>🔍 DEBUG PANEL</div>
          <div>Green Tick: {showGreenTickAnim ? '✅ VISIBLE' : '❌ HIDDEN'}</div>
          <div>Success Modal: {showContactSuccess ? '✅ VISIBLE' : '❌ HIDDEN'}</div>
          <div>Submitting: {isContactSubmitting ? '⏳ YES' : '✅ NO'}</div>
        </div> */}

      {/* Green Tick Animation Overlay */}
      {showGreenTickAnim && (
        <div className="alispatel-green-tick-overlay">
          <div className="alispatel-green-tick-wrapper">
            <div className="alispatel-green-tick-circle">
              <div className="alispatel-green-tick-mark">✓</div>
            </div>
            <div className="alispatel-green-tick-text">Message Sent!</div>
            <div className="alispatel-green-tick-particles">
              <div className="alispatel-particle"></div>
              <div className="alispatel-particle"></div>
              <div className="alispatel-particle"></div>
              <div className="alispatel-particle"></div>
              <div className="alispatel-particle"></div>
              <div className="alispatel-particle"></div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showContactSuccess && (
        <div className="contact-success-overlay">
          <div className="contact-success-modal">
            <button className="contact-close-btn" onClick={closeContactSuccessModal}>
              <FaTimes />
            </button>
            <div className="contact-success-content">
              <div className="contact-success-icon">
                <FaCheckCircle />
              </div>
              <h2>Message Sent Successfully! 🎉</h2>
              <p>Thank you for reaching out! I'll get back to you within 24 hours.</p>
              <div className="contact-confetti">
                <div className="contact-confetti-piece"></div>
                <div className="contact-confetti-piece"></div>
                <div className="contact-confetti-piece"></div>
                <div className="contact-confetti-piece"></div>
                <div className="contact-confetti-piece"></div>
                <div className="contact-confetti-piece"></div>
                <div className="contact-confetti-piece"></div>
                <div className="contact-confetti-piece"></div>
              </div>
              <div className="contact-progress-bar">
                <div className="contact-progress-fill"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="contact-main-container">
        {/* Header */}
        <div className="contact-main-header">
          <h1>Get In Touch</h1>
          <p>I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
        </div>

        <div className="contact-main-content">
          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <p>Fill up the form and I'll get back to you within 24 hours.</p>

              <div className="contact-info-items">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-info-details">
                    <h4>Phone</h4>
                    <p>+91-8511231514</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-info-details">
                    <h4>Email</h4>
                    <p>alispatel123098@gmail.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-info-details">
                    <h4>Location</h4>
                    <p>
                      Vapi, Gujarat
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-social-sections">
                {/* <h4>Follow Me</h4> */}
                {/* <div className="contact-social-icons">
                  <a
                    href="mailto:your.email@gmail.com"
                    className="contact-social-icon contact-email"
                    title="Send me an email"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href="https://x.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-x"
                    title="Follow me on X (formerly Twitter)"
                  >
                    <XIcon />
                  </a>
                  <a
                    href="https://instagram.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-instagram"
                    title="Follow me on Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-linkedin"
                    title="Connect on LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="https://github.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-github"
                    title="Check out my GitHub"
                  >
                    <FaGithub />
                  </a>
                </div> */}
              </div>
            </div>
          </div>

          {/* Contact Form with Floating Labels */}
          <div className="contact-form-wrapper">
            <form className="contact-main-form" ref={contactFormRef} onSubmit={sendContactEmail}>
              <div className="floating-input-container">
                <div
                  className={`floating-input-wrapper ${focusedContactField.user_name || contactFormData.user_name ? "floating" : ""}`}
                >
                  <input
                    type="text"
                    id="contact_user_name"
                    name="user_name"
                    value={contactFormData.user_name}
                    onChange={handleContactInputChange}
                    onFocus={() => handleContactFieldFocus("user_name")}
                    onBlur={(e) => handleContactFieldBlur("user_name", e.target.value)}
                    required
                    className="floating-input-field"
                    placeholder={
                      focusedContactField.user_name || contactFormData.user_name ? "" : ""
                    }
                  />
                  <label
                    className={`floating-input-label ${focusedContactField.user_name || contactFormData.user_name ? "floating" : ""}`}
                  >
                    Full Name
                  </label>
                </div>
              </div>

              <div className="floating-input-container">
                <div
                  className={`floating-input-wrapper ${focusedContactField.user_email || contactFormData.user_email ? "floating" : ""}`}
                >
                  <input
                    type="email"
                    id="contact_user_email"
                    name="user_email"
                    value={contactFormData.user_email}
                    onChange={handleContactInputChange}
                    onFocus={() => handleContactFieldFocus("user_email")}
                    onBlur={(e) => handleContactFieldBlur("user_email", e.target.value)}
                    required
                    className="floating-input-field"
                    placeholder={
                      focusedContactField.user_email || contactFormData.user_email ? "" : ""
                    }
                  />
                  <label
                    className={`floating-input-label ${focusedContactField.user_email || contactFormData.user_email ? "floating" : ""}`}
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="floating-input-container">
                <div
                  className={`floating-input-wrapper ${focusedContactField.subject || contactFormData.subject ? "floating" : ""}`}
                >
                  <input
                    type="text"
                    id="contact_subject"
                    name="subject"
                    value={contactFormData.subject}
                    onChange={handleContactInputChange}
                    onFocus={() => handleContactFieldFocus("subject")}
                    onBlur={(e) => handleContactFieldBlur("subject", e.target.value)}
                    required
                    className="floating-input-field"
                    placeholder={focusedContactField.subject || contactFormData.subject ? "" : ""}
                  />
                  <label
                    className={`floating-input-label ${focusedContactField.subject || contactFormData.subject ? "floating" : ""}`}
                  >
                    Subject
                  </label>
                </div>
              </div>

              <div className="floating-input-container">
                <div
                  className={`floating-input-wrapper textarea ${focusedContactField.message || contactFormData.message ? "floating" : ""}`}
                >
                  <textarea
                    id="contact_message"
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactInputChange}
                    onFocus={() => handleContactFieldFocus("message")}
                    onBlur={(e) => handleContactFieldBlur("message", e.target.value)}
                    rows="6"
                    required
                    className="floating-input-field textarea"
                    placeholder={
                      focusedContactField.message || contactFormData.message ? "" : ""
                    }
                  ></textarea>
                  <label
                    className={`floating-input-label ${focusedContactField.message || contactFormData.message ? "floating" : ""}`}
                  >
                    Message
                  </label>
                </div>
              </div>

              <button type="submit" className="contact-submit-button" disabled={isContactSubmitting}>
                {isContactSubmitting ? (
                  <div className="contact-loading-state">
                    <div className="contact-spinner"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="contact-map-section">
            {/* <h3>Find Me Here</h3> */}
            <div className="contact-map-container">
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1635959552132!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
