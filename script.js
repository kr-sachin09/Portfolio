document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const desktopNavLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // Toggle mobile navigation drawer
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      mobileMenuBtn.setAttribute("aria-expanded", String(!isExpanded));
      mobileMenu.classList.toggle("hidden");
      menuIconOpen.classList.toggle("hidden");
      menuIconClose.classList.toggle("hidden");
    });

    // Close mobile menu automatically when a link is clicked
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenu.classList.add("hidden");
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
      });
    });
  }

  // Highlight active navigation link based on scroll position
  if (sections.length > 0 && desktopNavLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          desktopNavLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${currentId}`,
            );
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }
});
