/* tr3s.ai — mobile interactions: menu overlay, role tabs, industry
   selector, and the booking day/slot picker. Vanilla JS, no deps. */
(function () {
  "use strict";

  /* ── Hamburger menu overlay ───────────────────────────────────────── */
  var menu = document.getElementById("m-menu");
  if (menu) {
    var openBtn = document.querySelector("[data-menu-open]");
    function setMenu(open) {
      menu.classList.toggle("open", open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
      if (openBtn) openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    if (openBtn) openBtn.addEventListener("click", function () { setMenu(true); });
    menu.querySelectorAll("[data-menu-close]").forEach(function (b) {
      b.addEventListener("click", function () { setMenu(false); });
    });
    // Close when a nav link is tapped (same-page anchors / navigation).
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
    });
  }

  /* ── Generic single-select button group helper ────────────────────── */
  function onGroup(selector, onPick) {
    var group = document.querySelector(selector);
    if (!group) return;
    var btns = group.querySelectorAll("button");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) {
          b.classList.remove("on");
          if (b.hasAttribute("aria-pressed")) b.setAttribute("aria-pressed", "false");
          if (b.hasAttribute("aria-selected")) b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("on");
        if (btn.hasAttribute("aria-pressed")) btn.setAttribute("aria-pressed", "true");
        if (btn.hasAttribute("aria-selected")) btn.setAttribute("aria-selected", "true");
        onPick(btn);
      });
    });
  }

  function setText(attr, value) {
    var el = document.querySelector("[" + attr + "]");
    if (el) el.textContent = value;
  }

  /* Home: role tabs (CIO/CFO/CDO) */
  onGroup("[data-roletabs]", function (btn) {
    setText("data-role-title", btn.getAttribute("data-title"));
    setText("data-role-pain", btn.getAttribute("data-pain"));
    setText("data-role-fix", btn.getAttribute("data-fix"));
  });

  /* Casos: industry selector */
  onGroup("[data-indtabs]", function (btn) {
    setText("data-ind-label", btn.getAttribute("data-label"));
    setText("data-ind-vis", btn.getAttribute("data-vis"));
    setText("data-ind-ef", btn.getAttribute("data-ef"));
  });

  /* Contacto: booking day + slot → summary */
  var dayWrap = document.querySelector("[data-days]");
  var slotWrap = document.querySelector("[data-slots]");
  if (dayWrap && slotWrap) {
    var chosen = { day: "", slot: "" };
    function updateSummary() {
      var el = document.querySelector("[data-booking-summary]");
      if (!el) return;
      el.textContent = (chosen.day && chosen.slot)
        ? ("El " + chosen.day + " a las " + chosen.slot)
        : "Elige un día y un horario";
    }
    onGroup("[data-days]", function (btn) { chosen.day = btn.getAttribute("data-day"); updateSummary(); });
    onGroup("[data-slots]", function (btn) { chosen.slot = btn.getAttribute("data-slot"); updateSummary(); });
  }
})();
