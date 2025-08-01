// --- Navbar Toggler Icon Change ---
const togglerButton = document.getElementById("navbar-toggler-button");
const menuOpenIcon = document.getElementById("menu-open-icon");
const menuCloseIcon = document.getElementById("menu-close-icon");
const navbarCollapse = document.getElementById("navbarNav");

togglerButton.addEventListener("click", () => {
  menuOpenIcon.classList.toggle("d-none");
  menuCloseIcon.classList.toggle("d-none");
});

const allNavLinks = document.querySelectorAll(".navbar-nav .nav-link");
allNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

navbarCollapse.addEventListener("hidden.bs.collapse", function () {
  menuOpenIcon.classList.remove("d-none");
  menuCloseIcon.classList.add("d-none");
});

// --- Manual Scrollspy for Active Nav Link Highlighting ---
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#mainNavbar .nav-link");

const onScroll = () => {
  const scrollPosition = window.scrollY;
  const headerOffset = 100;

  let currentSectionId = "";

  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop - headerOffset &&
      scrollPosition < section.offsetTop + section.offsetHeight - headerOffset
    ) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === currentSectionId) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", onScroll);
document.addEventListener("DOMContentLoaded", onScroll);

// --- contact---
const form = document.getElementById("contactForm");
const successModal = new bootstrap.Modal(
  document.getElementById("successModal")
);
const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();
      successModal.show();
    } else {
      errorModal.show();
    }
  } catch (error) {
    errorModal.show();
  }
});
