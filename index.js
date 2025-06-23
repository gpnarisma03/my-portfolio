var navBar = document.getElementById("navbar");
window.onscroll = function () {
  if (window.scrollY > 22) {
    navBar.classList.add("scrolled");
  } else {
    navBar.classList.remove("scrolled");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"); // Get all sections
  const navLinks = document.querySelectorAll(".nav-link"); // Get all nav links

  function setActiveLink() {
    let scrollPosition = window.scrollY + 100; // Offset for smooth detection

    sections.forEach((section) => {
      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight
      ) {
        let sectionId = section.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active"); // Remove active class from all links
          if (link.getAttribute("href").includes(sectionId)) {
            link.classList.add("active"); // Add active class to the current link
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink); // Run function on scroll
});

//Message API

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");
    const sendBtn = document.getElementById("sendBtn");

    // Reset error messages
    document.getElementById("error-fullname").innerText = "";
    document.getElementById("error-email").innerText = "";
    document.getElementById("error-message").innerText = "";
    formMessage.innerHTML = "";

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    let hasError = false;

    if (!fullname) {
      document.getElementById("error-fullname").innerText = "Required";
      hasError = true;
    } else if (!nameRegex.test(fullname)) {
      document.getElementById("error-fullname").innerText =
        "Only letters and spaces";
      hasError = true;
    }

    if (!email) {
      document.getElementById("error-email").innerText = "Required";
      hasError = true;
    } else if (!emailRegex.test(email)) {
      document.getElementById("error-email").innerText = "Invalid email format";
      hasError = true;
    }

    if (!message) {
      document.getElementById("error-message").innerText = "Required";
      hasError = true;
    }

    if (hasError) return;

    // ✅ Show your existing .loader inside the button
    sendBtn.disabled = true;
    sendBtn.innerHTML = `
      <div class="loader-container"">
        <div class="sending-text">Sending</div>
        <div class="loader"">
        </div>
      </div>
    `;

    try {
      const response = await fetch(
        "https://portfolioapi-r33f.onrender.com/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullname, email, message }),
        }
      );

      const result = await response.json();

      // ✅ Restore button
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message";

      if (response.ok) {
        formMessage.innerHTML = `
          <div class="alert alert-success text-center" id="successMsg">
            Message sent! I will get back to you as soon as possible.
          </div>
        `;

        document.getElementById("contactForm").reset();

        setTimeout(() => {
          const successMsg = document.getElementById("successMsg");
          if (successMsg) {
            successMsg.remove();
          }
        }, 3000);
      } else {
        formMessage.innerHTML = `<div class="alert alert-danger text-center">${result.message}</div>`;
      }
    } catch (error) {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message";
      formMessage.innerHTML = `<div class="alert alert-danger text-center">Something went wrong. Please try again later.</div>`;
      console.error("Error:", error);
    }
  });

// Projects Section
const projectList = [
  {
    title: "TUNAI Basketball League - TBL Website",
    description:
      "The Tunai Basketball League project is a web application designed to manage and showcase basketball league data.",
    image: "./images/tunaibasketballleague.jpg",
    tech: ["HTML", "CSS", "Bootstrap", "JQuery", "PHP", "MySQL"],
    liveDemo: "https://tunaibasketballleague.com/",
    code: "",
    status: "Redesign in Progress",
  },
  {
    title: "E-Commerce API Documentation",
    description:
      "Dynamic E-Commerce Workflow Management with order processing, real-time inventory updates, and secure authentication.",
    image: "./images/ecommerce-image.png",
    tech: ["Node JS", "Express JS", "MongoDB", "Postman"],
    liveDemo: "https://documenter.getpostman.com/view/43520837/2sB2ca7f8k",
    code: "",
    status: "",
  },
  {
    title: "E-Commerce App",
    description:
      "MERN E-Commerce Platform with real-time search, secure checkout, and an admin dashboard.",
    image: "./images/nextGen.png",
    tech: [
      "HTML",
      "CSS",
      "Bootstrap",
      "React",
      "Node JS",
      "Express JS",
      "MongoDB",
    ],
    liveDemo: "https://next-gen-eshop.vercel.app/",
    code: "https://github.com/gpnarisma03/nextGen-Eshop",
    status: "",
  },
  {
    title: "SupaBlog App",
    description:
      "A full-stack blog app with user login, blog posting, and commenting features. Built with modern web technologies and fully responsive.",
    image: "./images/supablog.png",
    tech: [
      "HTML",
      "CSS",
      "Bootstrap",
      "React",
      "Node JS",
      "Express JS",
      "MongoDB",
    ],
    liveDemo: "https://supablog-app-bice.vercel.app/",
    code: "https://github.com/gpnarisma03/Blog-App",
    status: "",
  },
  {
    title: "AeroLink – Airline Booking App",
    description:
      "A sleek and user-friendly airline booking app that allows travelers to search flights, choose seats, and confirm bookings with ease.",
    image: "./images/project6.png",
    tech: [
      "Figma",
      "HTML",
      "CSS",
      "Bootstrap",
      "React",
      "Node JS",
      "Express JS",
      "MongoDB",
    ],
    liveDemo: "https://gpnarisma03.github.io/aeroLink-app/",
    code: "https://github.com/gpnarisma03/aeroLink-app",
    status: "Ongoing Project",
  },
  {
    title: "HireHub",
    description:
      "HireHub is a modern job application platform where seekers can apply, verify email, and track applications seamlessly.",
    image: "./images/hirehub-landing.png",
    tech: ["Figma", "HTML", "CSS", "Bootstrap", "React", "Laravel", "MySQL"],
    liveDemo: "https://hirehub-tawny.vercel.app/",
    code: "https://github.com/gpnarisma03/HireHub",
    status: "Ongoing Project",
  },
];

function renderProjects() {
  const container = document.querySelector("#projects .row");
  container.innerHTML = "";

  projectList.forEach((project) => {
    const techStackHTML = project.tech
      .map((tech) => `<span>${tech}</span>`)
      .join("");
    const statusBadge = project.status
      ? `<span class="project-status badge bg-success position-absolute top-0 start-0 m-2">${project.status}</span>`
      : "";

    container.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4 my-2">
        <div class="card h-100 p-3 shadow-sm position-relative">
          ${statusBadge}
          <img src="${
            project.image
          }" class="project-image img-fluid w-100 mb-3" alt="${project.title}">
          <div class="card-body">
            <h5 class="card-title">${project.title}</h5>
            <p class="card-text">${project.description}</p>
            <div class="tech-stack">${techStackHTML}</div>
            <div class="icon-links d-flex justify-content-between mt-3">
              ${
                project.liveDemo
                  ? `<a href="${project.liveDemo}" target="_blank" class="ms-2">Live Demo <i class="ri-external-link-line"></i></a>`
                  : ""
              }
              ${
                project.code
                  ? `<a href="${project.code}" target="_blank" class="ms-2" title="View Code on GitHub"><i class="ri-github-line"></i> Code</a>`
                  : ""
              }
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", renderProjects);

// Tools Section

const tools = {
  frontend: [
    { icon: "devicon-html5-plain", title: "HTML5" },
    { icon: "devicon-css3-plain", title: "CSS3" },
    { icon: "devicon-bootstrap-plain", title: "Bootstrap" },
    { icon: "devicon-javascript-plain", title: "JavaScript" },
    { icon: "devicon-react-original", title: "React.js" },
  ],
  backend: [
    { icon: "devicon-php-plain", title: "PHP" },
    { icon: "devicon-laravel-plain", title: "Laravel" },
    { icon: "devicon-mysql-plain", title: "MySQL" },
    { icon: "devicon-mongodb-plain", title: "MongoDB" },
    { icon: "devicon-express-original", title: "Express.js" },
    { icon: "devicon-nodejs-plain", title: "Node.js" },
  ],
  devtools: [
    { icon: "devicon-vscode-plain", title: "VS Code" },
    { icon: "devicon-github-original", title: "GitHub" },
    { icon: "devicon-postman-plain", title: "Postman" },
  ],
};

function renderToolIcons(toolsArray) {
  return toolsArray
    .map(
      (tool) => `
        <div class="icon-box">
          <i class="${tool.icon} colored tools-tech-stack" title="${tool.title}"></i>
        </div>
      `
    )
    .join("");
}

const toolsSection = `
    <section id="tools" data-aos="fade-up">
      <h2 class="text-center mb-4 mt-5">TECH STACK & TOOLS</h2>
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4 mt-4 mt-md-0">
            <h3 class="mb-3">Frontend</h3>
            <div class="d-flex flex-wrap justify-content-center">
              ${renderToolIcons(tools.frontend)}
            </div>
          </div>
          <div class="col-md-4 mt-5 mt-md-0">
            <h3 class="mb-3">Backend</h3>
            <div class="d-flex flex-wrap justify-content-center">
              ${renderToolIcons(tools.backend)}
            </div>
          </div>
          <div class="col-md-4 mt-5 mt-md-0">
            <h3 class="mb-3">Developer Tools</h3>
            <div class="d-flex flex-wrap justify-content-center">
              ${renderToolIcons(tools.devtools)}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

document.getElementById("tools").outerHTML = toolsSection;
