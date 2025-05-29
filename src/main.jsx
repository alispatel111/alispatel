"use client"

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

// Add error boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h2>Something went wrong.</h2>
          <p>Please refresh the page to try again.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.5rem 1rem",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
