/* tr3s.ai — progressive form handling (contact + newsletter).
   No framework. Submits via fetch and shows inline status in the dark UI. */
(function () {
  "use strict";

  function setStatus(el, msg, kind) {
    if (!el) return;
    el.textContent = msg;
    el.className = "form-status" + (kind ? " " + kind : "");
  }

  /* ── Contact form (Web3Forms) ─────────────────────────────────────── */
  var contact = document.getElementById("contact-form");
  if (contact) {
    var cStatus = contact.querySelector(".form-status");
    var cLang = contact.getAttribute("data-lang") || "es";
    var cMsg = cLang === "en"
      ? { send: "Sending…", ok: "Thanks — we'll reply within one business day.", err: "Something went wrong. Please email us directly.", cfg: "Form not configured yet." }
      : { send: "Enviando…", ok: "Gracias — respondemos en menos de 24 horas hábiles.", err: "Algo salió mal. Escríbenos directamente por correo.", cfg: "El formulario aún no está configurado." };

    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      var key = contact.getAttribute("data-key") || "";
      if (!key || key.indexOf("REPLACE_WITH") === 0) {
        setStatus(cStatus, cMsg.cfg, "err");
        return;
      }
      setStatus(cStatus, cMsg.send, "");
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(contact)))
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.success) { contact.reset(); setStatus(cStatus, cMsg.ok, "ok"); }
          else { setStatus(cStatus, cMsg.err, "err"); }
        })
        .catch(function () { setStatus(cStatus, cMsg.err, "err"); });
    });
  }

  /* ── Newsletter forms (beehiiv) ───────────────────────────────────── */
  var nlForms = document.querySelectorAll("form.nl-form");
  Array.prototype.forEach.call(nlForms, function (form) {
    if (form.getAttribute("data-disabled") === "true") return; // placeholder
    var status = form.querySelector(".form-status");
    var endpoint = form.getAttribute("data-beehiiv") || "";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!endpoint) { setStatus(status, "Pronto / Soon", "err"); return; }
      setStatus(status, "…", "");
      var data = new FormData(form);
      fetch(endpoint, { method: "POST", mode: "no-cors", body: data })
        .then(function () { form.reset(); setStatus(status, "¡Listo! Revisa tu correo. / Check your inbox.", "ok"); })
        .catch(function () { setStatus(status, "Error — intenta de nuevo. / Try again.", "err"); });
    });
  });
})();
