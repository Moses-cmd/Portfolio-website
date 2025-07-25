// Portfolio Application with Complete Error Handling
class PortfolioApp {
  constructor() {
    this.init()
  }

  init() {
    try {
      console.log("Initializing Portfolio App...")
      this.setupEventListeners()
      this.setupTheme()
      this.setupScrollEffects()
      this.setupMobileMenu()
      this.setupProjectFilters()
      this.initializeAnimations()
      this.hideLoadingScreen()
      console.log("Portfolio App initialized successfully!")
    } catch (error) {
      console.error("Error initializing app:", error)
      this.hideLoadingScreen() // Hide loading screen even if there's an error
    }
  }

  setupEventListeners() {
    try {
      // Smooth scrolling for navigation links
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", this.handleNavClick.bind(this))
      })

      // Back to top button
      const backToTopBtn = document.getElementById("back-to-top")
      if (backToTopBtn) {
        backToTopBtn.addEventListener("click", this.scrollToTop)
      }

      // Theme toggle
      const themeToggle = document.getElementById("theme-toggle")
      if (themeToggle) {
        themeToggle.addEventListener("click", this.toggleTheme)
      }

      // Window scroll events
      window.addEventListener("scroll", this.handleScroll.bind(this))
      window.addEventListener("resize", this.handleResize.bind(this))

      // Modal events
      this.setupModalEvents()
    } catch (error) {
      console.error("Error setting up event listeners:", error)
    }
  }

  handleNavClick(e) {
    try {
      e.preventDefault()
      const targetId = e.target.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)
      const header = document.getElementById("header")

      if (targetSection && header) {
        const headerHeight = header.offsetHeight
        const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        })

        // Update active nav link
        this.updateActiveNavLink(e.target)

        // Close mobile menu if open
        this.closeMobileMenu()
      }
    } catch (error) {
      console.error("Error handling nav click:", error)
    }
  }

  updateActiveNavLink(activeLink) {
    try {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
      })
      activeLink.classList.add("active")
    } catch (error) {
      console.error("Error updating active nav link:", error)
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  toggleTheme() {
    try {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)

      // Update theme toggle icon
      const themeToggle = document.getElementById("theme-toggle")
      if (themeToggle) {
        const icon = themeToggle.querySelector("i")
        if (icon) {
          icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon"
        }
      }
    } catch (error) {
      console.error("Error toggling theme:", error)
    }
  }

  setupTheme() {
    try {
      const savedTheme = localStorage.getItem("theme") || "light"
      document.documentElement.setAttribute("data-theme", savedTheme)

      const themeToggle = document.getElementById("theme-toggle")
      if (themeToggle) {
        const icon = themeToggle.querySelector("i")
        if (icon) {
          icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon"
        }
      }
    } catch (error) {
      console.error("Error setting up theme:", error)
    }
  }

  setupScrollEffects() {
    try {
      // Initialize scroll-based effects
      console.log("Setting up scroll effects...")

      // Add any scroll-based animations or effects here
      this.initScrollAnimations()
    } catch (error) {
      console.error("Error setting up scroll effects:", error)
    }
  }

  initScrollAnimations() {
    try {
      // Parallax effect for hero section
      const heroSection = document.querySelector(".hero-section")
      if (heroSection) {
        window.addEventListener("scroll", () => {
          const scrolled = window.pageYOffset
          const rate = scrolled * -0.5
          if (heroSection.style) {
            heroSection.style.transform = `translateY(${rate}px)`
          }
        })
      }
    } catch (error) {
      console.error("Error initializing scroll animations:", error)
    }
  }

  handleScroll() {
    try {
      this.updateScrollProgress()
      this.updateBackToTopButton()
      this.updateActiveSection()
      this.animateProgressBars()
    } catch (error) {
      console.error("Error handling scroll:", error)
    }
  }

  updateScrollProgress() {
    try {
      const scrollProgress = document.getElementById("scroll-progress")
      if (scrollProgress) {
        const scrollTop = window.pageYOffset
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`
      }
    } catch (error) {
      console.error("Error updating scroll progress:", error)
    }
  }

  updateBackToTopButton() {
    try {
      const backToTopBtn = document.getElementById("back-to-top")
      if (backToTopBtn) {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add("visible")
        } else {
          backToTopBtn.classList.remove("visible")
        }
      }
    } catch (error) {
      console.error("Error updating back to top button:", error)
    }
  }

  updateActiveSection() {
    try {
      const sections = document.querySelectorAll("section[id]")
      const navLinks = document.querySelectorAll(".nav-link")

      let currentSection = ""

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionHeight = section.offsetHeight

        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
          const sectionId = section.getAttribute("id")
          if (sectionId) {
            currentSection = sectionId.replace("-section", "")
          }
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        const linkSection = link.getAttribute("data-section")
        if (linkSection === currentSection) {
          link.classList.add("active")
        }
      })
    } catch (error) {
      console.error("Error updating active section:", error)
    }
  }

  animateProgressBars() {
    try {
      const progressBars = document.querySelectorAll(".progress-bar[data-progress]")

      progressBars.forEach((bar) => {
        const rect = bar.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (isVisible && !bar.classList.contains("animated")) {
          const progress = bar.getAttribute("data-progress")
          if (progress) {
            bar.style.width = `${progress}%`
            bar.classList.add("animated")
          }
        }
      })
    } catch (error) {
      console.error("Error animating progress bars:", error)
    }
  }

  handleResize() {
    try {
      // Handle responsive adjustments
      this.closeMobileMenu()
    } catch (error) {
      console.error("Error handling resize:", error)
    }
  }

  setupMobileMenu() {
    try {
      const mobileMenuBtn = document.getElementById("mobile-menu-btn")
      const navLinks = document.getElementById("nav-links")

      if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
          mobileMenuBtn.classList.toggle("active")
          navLinks.classList.toggle("active")
        })
      }
    } catch (error) {
      console.error("Error setting up mobile menu:", error)
    }
  }

  closeMobileMenu() {
    try {
      const mobileMenuBtn = document.getElementById("mobile-menu-btn")
      const navLinks = document.getElementById("nav-links")

      if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.classList.remove("active")
        navLinks.classList.remove("active")
      }
    } catch (error) {
      console.error("Error closing mobile menu:", error)
    }
  }

  setupProjectFilters() {
    try {
      const filterBtns = document.querySelectorAll(".filter-btn")
      const projectCards = document.querySelectorAll(".project-card")

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          try {
            const filter = btn.getAttribute("data-filter")

            // Update active filter button
            filterBtns.forEach((b) => b.classList.remove("active"))
            btn.classList.add("active")

            // Filter projects
            projectCards.forEach((card) => {
              const category = card.getAttribute("data-category")

              if (filter === "all" || category === filter) {
                card.style.display = "block"
                card.style.animation = "fadeIn 0.5s ease forwards"
              } else {
                card.style.display = "none"
              }
            })
          } catch (error) {
            console.error("Error filtering projects:", error)
          }
        })
      })
    } catch (error) {
      console.error("Error setting up project filters:", error)
    }
  }

  initializeAnimations() {
    try {
      // Simple animation observer with better error handling
      const elements = document.querySelectorAll("[data-aos]")

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              try {
                if (entry.isIntersecting) {
                  entry.target.style.opacity = "1"
                  entry.target.style.transform = "translateY(0)"
                }
              } catch (error) {
                console.error("Error animating element:", error)
              }
            })
          },
          { threshold: 0.1 },
        )

        elements.forEach((el) => {
          try {
            el.style.opacity = "0"
            el.style.transform = "translateY(20px)"
            el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
            observer.observe(el)
          } catch (error) {
            console.error("Error setting up animation for element:", error)
          }
        })
      } else {
        // Fallback for browsers without IntersectionObserver
        elements.forEach((el) => {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        })
      }
    } catch (error) {
      console.error("Error initializing animations:", error)
    }
  }

  hideLoadingScreen() {
    try {
      const loadingScreen = document.getElementById("loading-screen")
      if (loadingScreen) {
        console.log("Hiding loading screen...")
        setTimeout(() => {
          loadingScreen.classList.add("hidden")
          setTimeout(() => {
            loadingScreen.style.display = "none"
            console.log("Loading screen hidden successfully!")
          }, 500)
        }, 800) // Reduced to 800ms for faster loading
      }
    } catch (error) {
      console.error("Error hiding loading screen:", error)
      // Force hide loading screen if there's an error
      const loadingScreen = document.getElementById("loading-screen")
      if (loadingScreen) {
        loadingScreen.style.display = "none"
      }
    }
  }

  setupModalEvents() {
    try {
      const modal = document.getElementById("project-modal")
      const closeBtn = document.querySelector(".modal-close")

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          if (modal) modal.style.display = "none"
        })
      }

      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          if (modal) modal.style.display = "none"
        }
      })
    } catch (error) {
      console.error("Error setting up modal events:", error)
    }
  }
}

// Project Modal Functions
function openProjectModal(projectId) {
  try {
    const modal = document.getElementById("project-modal")
    const modalBody = document.getElementById("modal-body")

    const projectData = {
      project1: {
        title: "CMPG223 Project",
        description:
          "A comprehensive software development project showcasing collaborative programming skills and database management.",
        technologies: ["C#", "Database Management", "Software Engineering", "Team Collaboration"],
        features: [
          "User authentication system",
          "Database integration",
          "Responsive user interface",
          "Error handling and validation",
        ],
        github: "https://github.com/lethabomaepa11/cmpg223project",
      },
      project2: {
        title: "DBMS SQL Project - Fit Gender",
        description:
          "Advanced database management system focusing on fitness data analysis with gender-based insights.",
        technologies: ["SQL", "Database Design", "Data Analysis", "MySQL", "Data Visualization"],
        features: ["Complex SQL queries", "Data normalization", "Performance optimization", "Statistical analysis"],
        github: "https://github.com/Allysto/DBMS-SQL-PROJECT-FIT-GENDER",
      },
      project3: {
        title: "CMPG315 Networking Project",
        description:
          "Comprehensive networking demonstration using Cisco Packet Tracer with advanced network configurations.",
        technologies: ["Cisco Packet Tracer", "Network Design", "Routing Protocols", "Network Security"],
        features: [
          "VLAN configuration",
          "Routing protocol implementation",
          "Network security measures",
          "Troubleshooting procedures",
        ],
        github: "https://github.com/P-iotic/cmpg315project",
      },
      project4: {
        title: "Student Seller & Buyer System",
        description:
          "E-commerce platform designed for university students to facilitate buying and selling within the campus community.",
        technologies: ["Web Development", "E-commerce", "User Management", "Database"],
        features: [
          "User registration and authentication",
          "Product listing and search",
          "Transaction management",
          "Rating and review system",
        ],
        github: "https://github.com/ThabangEric/Student_Seller_And_Buyer_System",
      },
    }

    const project = projectData[projectId]
    if (project && modalBody) {
      modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        
        <h3>Technologies Used:</h3>
        <div class="modal-tech">
          ${project.technologies.map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
        </div>
        
        <h3>Key Features:</h3>
        <ul class="modal-features">
          ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
        
        <div class="modal-actions">
          <a href="${project.github}" target="_blank" class="btn btn-primary">
            <i class="fab fa-github"></i>
            View on GitHub
          </a>
        </div>
      `

      if (modal) modal.style.display = "block"
    }
  } catch (error) {
    console.error("Error opening project modal:", error)
  }
}

// CV Download Function with Enhanced Error Handling
function downloadCV(event) {
  const button = event?.target?.closest("button")

  try {
    console.log("Starting CV download...")

    // Show loading state
    if (button) {
      const originalContent = button.innerHTML
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...'
      button.disabled = true

      // Reset button after operation
      setTimeout(() => {
        button.innerHTML = originalContent
        button.disabled = false
      }, 3000)
    }

    // Check if jsPDF is available
    if (typeof window.jsPDF === "undefined") {
      console.error("jsPDF library not loaded")
      alert("PDF library not loaded. Please refresh the page and try again.")
      return
    }

    const { jsPDF } = window.jsPDF
    const doc = new jsPDF()

    // Generate CV content
    generateCV(doc)

    // Save the PDF
    doc.save("Moses_Motsoenyane_CV.pdf")
    console.log("CV downloaded successfully!")

    // Show success state
    if (button) {
      button.innerHTML = '<i class="fas fa-check"></i> Downloaded!'
      button.style.background = "#059669"
    }
  } catch (error) {
    console.error("Error downloading CV:", error)
    alert("Error generating PDF. Please try again.")

    // Show error state
    if (button) {
      button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error'
      button.style.background = "#dc2626"
    }
  }
}

function generateCV(doc) {
  try {
    // Set font
    doc.setFont("helvetica")

    // Header
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("MOSES NGAKA MOTSOENYANE", 20, 25)

    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.text("ASPIRING SOFTWARE DEVELOPER", 20, 35)

    // Contact Information
    doc.setFontSize(11)
    doc.text("Location: Thabazimbi, Limpopo | Phone: 060 810 8806", 20, 45)
    doc.text("Email: mosesmotsoenyane5@gmail.com", 20, 52)

    // Line separator
    doc.setLineWidth(0.5)
    doc.line(20, 57, 190, 57)

    let yPos = 70

    // Summary
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("PROFESSIONAL SUMMARY", 20, yPos)

    yPos += 10
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    const summary =
      "A highly motivated final year BSc Information Technology student with a passion for problem-solving and contributing innovative ideas. My commitment and dedication drive me to thrive under pressure and I'm always eager to learn."
    const splitSummary = doc.splitTextToSize(summary, 170)
    doc.text(splitSummary, 20, yPos)

    yPos += splitSummary.length * 5 + 10

    // Education
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("EDUCATION", 20, yPos)

    yPos += 10
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("• Bachelor of Science in Information Technology", 25, yPos)
    yPos += 7
    doc.text("  North West University Vaal Campus | Expected: 2025", 25, yPos)

    yPos += 15

    // Certifications
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("CERTIFICATIONS", 20, yPos)

    yPos += 10
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("• Microsoft AI Fluency Course", 25, yPos)
    yPos += 7
    doc.text("• WeThinkCode Generative Artificial Intelligence", 25, yPos)

    yPos += 15

    // Skills
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("TECHNICAL SKILLS", 20, yPos)

    yPos += 10
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")

    const skills = [
      "Programming Languages: C++, C#, Java, Python",
      "Artificial Intelligence & Machine Learning",
      "Cyber Security & Ethical Hacking",
      "Database Management: MySQL, Oracle",
      "Development Tools: Visual Studio Code, NetBeans",
      "Operating Systems: Windows, Linux",
    ]

    skills.forEach((skill) => {
      doc.text(`• ${skill}`, 25, yPos)
      yPos += 7
    })

    yPos += 10

    // Experience
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("EXPERIENCE", 20, yPos)

    yPos += 15
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Chairperson | GEEKULCHA NWU Vaal Campus", 25, yPos)
    yPos += 7
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("February 2025 - October 2025", 25, yPos)

    yPos += 10
    doc.setFontSize(11)
    doc.text("• Leading technology community initiatives", 25, yPos)
    yPos += 7
    doc.text("• Organizing workshops and tech events", 25, yPos)

    yPos += 15
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Office Assistant | Jimmo Cleaning Services", 25, yPos)
    yPos += 7
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("March 2020 - December 2020", 25, yPos)

    yPos += 10
    doc.setFontSize(11)
    doc.text("• Administrative duties and office operations", 25, yPos)

    yPos += 20

    // Social Links
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("SOCIAL PRESENCE", 20, yPos)

    yPos += 10
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("GitHub: https://github.com/Moses-cmd", 25, yPos)
    yPos += 7
    doc.text("LinkedIn: https://www.linkedin.com/in/moses-motsoenyane-164033273/", 25, yPos)
  } catch (error) {
    console.error("Error generating CV content:", error)
    throw error
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing app...")
  try {
    new PortfolioApp()
  } catch (error) {
    console.error("Failed to initialize app:", error)
    // Force hide loading screen if initialization fails
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      loadingScreen.style.display = "none"
    }
  }
})

// Fallback: Hide loading screen after 2 seconds regardless
setTimeout(() => {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen && !loadingScreen.classList.contains("hidden")) {
    console.log("Fallback: Hiding loading screen after timeout")
    loadingScreen.style.display = "none"
  }
}, 2000)

// Performance monitoring
window.addEventListener("load", () => {
  console.log("Window loaded")
  try {
    if ("performance" in window && performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      console.log(`Page load time: ${loadTime}ms`)
    }
  } catch (error) {
    console.error("Error measuring performance:", error)
  }
})

// Handle unhandled errors
window.addEventListener("error", (event) => {
  console.error("Global error caught:", event.error)
  // Hide loading screen if there's a global error
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.style.display = "none"
  }
})

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason)
})
