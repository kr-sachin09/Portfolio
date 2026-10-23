document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const desktopNavLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // 1. Mobile Navigation Drawer Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      mobileMenuBtn.setAttribute("aria-expanded", String(!isExpanded));
      mobileMenu.classList.toggle("hidden");
      menuIconOpen.classList.toggle("hidden");
      menuIconClose.classList.toggle("hidden");
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenu.classList.add("hidden");
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
      });
    });
  }

  // 2. Active Section Scroll Spy
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

  // 3. Contact Form Client-Side UI Validation & Simulated Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const submitBtn = document.getElementById("submit-btn");
    const formStatus = document.getElementById("form-status");

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const setFieldError = (inputEl, errorEl, hasError) => {
      if (!inputEl || !errorEl) return;
      inputEl.classList.toggle("input-error", hasError);
      errorEl.classList.toggle("hidden", !hasError);
      inputEl.setAttribute("aria-invalid", String(hasError));
    };

    // Clear field error on user input
    [
      [nameInput, nameError],
      [emailInput, emailError],
      [messageInput, messageError],
    ].forEach(([inputEl, errorEl]) => {
      if (inputEl) {
        inputEl.addEventListener("input", () => {
          setFieldError(inputEl, errorEl, false);
          if (formStatus) formStatus.classList.add("hidden");
        });
      }
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const isNameInvalid = !nameInput.value.trim();
      const isEmailInvalid = !isValidEmail(emailInput.value.trim());
      const isMessageInvalid = !messageInput.value.trim();

      setFieldError(nameInput, nameError, isNameInvalid);
      setFieldError(emailInput, emailError, isEmailInvalid);
      setFieldError(messageInput, messageError, isMessageInvalid);

      if (isNameInvalid || isEmailInvalid || isMessageInvalid) {
        return;
      }

      // Simulate sending state in UI
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      formStatus.classList.add("hidden");

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        formStatus.textContent =
          "Thank you. Your message has been recorded (UI demo).";
        formStatus.classList.remove("hidden");
      }, 700);
    });
  }

  // 4. Populate Footer Copyright Year
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) {
    currentYearEl.textContent = String(new Date().getFullYear());
  }
});
