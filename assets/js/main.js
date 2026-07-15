// Portfolio interactions: mobile nav toggle + current year.
(function () {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping a link (mobile).
    menu.addEventListener("click", function (event) {
      if (event.target.tagName !== "A") return;
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
