"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"

const CertificateModal = ({ isOpen, onClose, skill }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  // Fix the certificate path issue by using public URLs instead of relative paths
  const getPdfPath = (skillTitle) => {
    const pdfMap = {
      HTML: "/src/pdf/html_certificate.pdf",
      CSS: "/src/pdf/css_certificate.pdf",
      Javascript: "/src/pdf/Javascript_certificate.pdf",
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

  // Fix the download certificate function to handle the PDF correctly
  const downloadCertificate = async () => {
    setIsDownloading(true)
    try {
      const pdfPath = getPdfPath(skill.title)

      // Create a link element and trigger download
      const link = document.createElement("a")
      link.href = pdfPath
      link.download = `${skill.title}_Certificate.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsDownloading(false)
    } catch (error) {
      console.error("Error downloading certificate:", error)
      setIsDownloading(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background */}
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

      {/* Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Dialog Panel */}
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-bold leading-6 text-gray-900">Download Certificate</Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Click the button below to download your certificate for {skill?.title}.
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              onClick={downloadCertificate}
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default CertificateModal
