document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

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
});
