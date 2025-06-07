"use client"

import { useState, useRef, useEffect } from "react"
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaPaperPlane,
  FaCheckCircle,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
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

  const sendContactEmail = (e) => {
    e.preventDefault()
    console.log("🎯 FORM SUBMISSION STARTED")
    setIsContactSubmitting(true)

    // Simulate success
    setTimeout(() => {
      setIsContactSubmitting(false)
      setShowGreenTickAnim(true)
      setTimeout(() => {
        setShowGreenTickAnim(false)
        setShowContactSuccess(true)
      }, 2000)

      setContactFormData({
        user_name: "",
        user_email: "",
        subject: "",
        message: "",
      })
      setFocusedContactField({})

      setTimeout(() => {
        setShowContactSuccess(false)
      }, 7000)
    }, 1000)

    // EmailJS real integration (keep commented for testing)
    /*
    emailjs
      .sendForm(
        "service_emu2xai",
        "template_kg970bi",
        contactFormRef.current,
        "SVKz-D0cD8hn6RRgw"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text)
        setIsContactSubmitting(false)
        setShowGreenTickAnim(true)
        setTimeout(() => {
          setShowGreenTickAnim(false)
          setShowContactSuccess(true)
        }, 2000)
      })
      .catch((error) => {
        console.error("Email sending failed:", error.text)
        setIsContactSubmitting(false)
        alert("Failed to send message. Please try again.")
      })
    */
  }

  const closeContactSuccessModal = () => {
    setShowContactSuccess(false)
  }

  return (
    <div className="contact-main-page" id="contact">
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
        <div className="contact-main-header">
          <h1>Get In Touch</h1>
          <p>I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
        </div>

        <div className="contact-main-content">
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
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-info-details">
                    <h4>Email</h4>
                    <p>your.email@gmail.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-info-details">
                    <h4>Location</h4>
                    <p>
                      Your City, Your State
                      <br />
                      Your Country
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-social-section">
                <h4>Follow Me</h4>
                <div className="contact-social-icons">
                  <a
                    href="https://facebook.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://x.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-x"
                  >
                    <FaXTwitter />
                  </a>
                  <a
                    href="https://instagram.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-linkedin"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="https://github.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon contact-github"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <form ref={contactFormRef} onSubmit={sendContactEmail} className="contact-form">
              <div className="contact-form-group">
                <div className="contact-input-wrapper">
                  <FaUser className="contact-input-icon" />
                  <input
                    type="text"
                    name="user_name"
                    value={contactFormData.user_name}
                    onChange={handleContactInputChange}
                    onFocus={() => handleContactFieldFocus("user_name")}
                    onBlur={(e) => handleContactFieldBlur("user_name", e.target.value)}
                    required
                    className={focusedContactField.user_name || contactFormData.user_name ? "focused" : ""}
                  />
                  <label className={focusedContactField.user_name || contactFormData.user_name ? "focused" : ""}>
                    Your Name
                  </label>
                </div>
              </div>

              <div className="contact-form-group">
                <div className="contact-input-wrapper">
                  <FaEnvelope className="contact-input-icon" />
                  <input
                    type="email"
                    name="user_email"
                    value={contactFormData.user_email}
                    onChange={handleContactInputChange}
                    onFocus={() => handleContactFieldFocus("user_email")}
                    onBlur={(e) => handleContactFieldBlur("user_email", e.target.value)}
                    required
                    className={focusedContactField.user_email || contactFormData.user_email ? "focused" : ""}
                  />
                  <label className={focusedContactField.user_email || contactFormData.user_email ? "focused" : ""}>
                    Your Email
                  </label>
                </div>
              </div>

              <div className="contact-form-group">
                <div className="contact-input-wrapper">
                  <input
                    type="text"
                    name="subject"
                    value={contactFormData.subject}
                    onChange={handleContactInputChange}
                    onFocus={() => handleContactFieldFocus("subject")}
                    onBlur={(e) => handleContactFieldBlur("subject", e.target.value)}
                    required
                    className={focusedContactField.subject || contactFormData.subject ? "focused" : ""}
                  />
                  <label className={focusedContactField.subject || contactFormData.subject ? "focused" : ""}>
                    Subject
                  </label>
                </div>
              </div>

              <div className="contact-form-group">
                <div className="contact-input-wrapper">
                  <textarea
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactInputChange}
                    onFocus={() => handleContactFieldFocus("message")}
                    onBlur={(e) => handleContactFieldBlur("message", e.target.value)}
                    required
                    rows="5"
                    className={focusedContactField.message || contactFormData.message ? "focused" : ""}
                  ></textarea>
                  <label className={focusedContactField.message || contactFormData.message ? "focused" : ""}>
                    Your Message
                  </label>
                </div>
              </div>

              <button type="submit" className="contact-submit-btn" disabled={isContactSubmitting}>
                {isContactSubmitting ? (
                  <div className="contact-loading-spinner"></div>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
