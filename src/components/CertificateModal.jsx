"use client"

import { useEffect, useRef, useState } from "react"

const CertificateModal = ({ skill, onClose, level }) => {
  const modalRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [pdfLoaded, setPdfLoaded] = useState(false)

  // Get the PDF path based on skill title
  const getPdfPath = (skillTitle) => {
    const pdfMap = {
      HTML: "/src/pdf/html_certificate.pdf",
      CSS: "/src/pdf/css_certificate.pdf",
      Javascript: "/src/pdf/javascript_certificate.pdf",
      React: "/src/pdf/react_certificate.pdf",
      Node: "/src/pdf/node_certificate.pdf",
      MongoDB: "/src/pdf/mongodb_certificate.pdf",
      "Express.js": "/src/pdf/express_certificate.pdf",
      "Git & GitHub": "/src/pdf/github_certificate.pdf",
      Redux: "/src/pdf/redux_certificate.pdf",
      "Tailwind CSS": "/src/pdf/tailwind_certificate.pdf",
      Postman: "/src/pdf/postman_certificate.pdf",
      Mongoose: "/src/pdf/mongoose_certificate.pdf",
      "REST API": "/src/pdf/api_certificate.pdf",
      Vercel: "/src/pdf/vercel_certificate.pdf",
      "Firebase Auth": "/src/pdf/firebase_certificate.pdf",
      // Default to a general certificate if no specific one is found
      default: "/src/pdf/Resume_Ori.pdf",
    }

    return pdfMap[skillTitle] || pdfMap["default"]
  }

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    // Prevent body scrolling
    document.body.style.overflow = "hidden"

    // Set PDF as loaded after a short delay to trigger animation
    const timer = setTimeout(() => {
      setPdfLoaded(true)
    }, 300)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "auto"
      clearTimeout(timer)
    }
  }, [onClose])

  // Download certificate as PDF
  const downloadCertificate = async () => {
    const pdfPath = getPdfPath(skill.title)

    // If we're using an actual PDF, just open it in a new tab
    window.open(pdfPath, "_blank")
  }

  // Print certificate
  const printCertificate = () => {
    const iframe = document.querySelector(".certificate-pdf")
    if (iframe) {
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
    }
  }

  return (
    <div className="certificate-modal-overlay">
      <div className="certificate-modal" ref={modalRef}>
        <button className="certificate-close-btn" onClick={onClose} aria-label="Close certificate">
          ✕
        </button>

        <div className="certificate-container">
          <div className={`certificate-pdf-container ${pdfLoaded ? "loaded" : ""}`}>
            <iframe
              src={getPdfPath(skill.title)}
              className="certificate-pdf"
              title={`${skill.title} Certificate`}
              allowFullScreen={true}
            />
          </div>
        </div>

        <div className="certificate-actions">
          <button className="certificate-download-btn" onClick={downloadCertificate} disabled={isDownloading}>
            {isDownloading ? "Generating PDF..." : "Download Certificate"}
          </button>
          <button className="certificate-print-btn" onClick={printCertificate}>
            Print Certificate
          </button>
        </div>
      </div>
    </div>
  )
}

export default CertificateModal
