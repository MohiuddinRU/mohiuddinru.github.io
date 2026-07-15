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

  // Contact form: attach approximate IP/geolocation, then submit to FormSubmit.
  // FormSubmit needs no API key — the recipient email is the endpoint.
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/mohiuddin.ice.ru@gmail.com";
  const form = document.getElementById("contact-form");
  if (form) {
    const submitBtn = document.getElementById("f-submit");
    const submitLabel = submitBtn.textContent;

    setValue("f-ua", navigator.userAgent);

    // Best-effort, permission-free IP + location lookup. The form still
    // submits fine if this fails or is blocked.
    fetch("https://ipwho.is/")
      .then(function (res) { return res.json(); })
      .then(function (d) {
        if (!d || d.success === false) return;
        setValue("f-ip", d.ip);
        setValue("f-location", [d.city, d.region, d.country].filter(Boolean).join(", "));
        if (d.latitude != null && d.longitude != null) {
          setValue("f-coords", d.latitude + ", " + d.longitude);
        }
      })
      .catch(function () { /* ignore — geo is optional */ });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (form._honey && form._honey.value) return; // honeypot tripped

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      const payload = Object.fromEntries(new FormData(form).entries());

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success === true || data.success === "true") {
            form.reset();
            showToast("Thanks! Your message has been sent.", "ok");
          } else {
            showToast(data.message || "Something went wrong — please email me instead.", "err");
          }
        })
        .catch(function () {
          showToast("Network error — please email me instead.", "err");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        });
    });

    function setValue(id, val) {
      const el = document.getElementById(id);
      if (el && val != null) el.value = val;
    }
  }

  // Slide-in toast notification; auto-dismisses after a few seconds.
  function showToast(message, kind) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = "toast show" + (kind ? " " + kind : "");
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.className = "toast" + (kind ? " " + kind : "");
    }, 4500);
  }
})();
