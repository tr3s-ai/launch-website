/* tr3s.ai — progressive form handling (contact + newsletter).
   No framework. Submits via fetch and shows inline status in the dark UI. */
(function () {
  "use strict";

  function setStatus(el, msg, kind) {
    if (!el) return;
    el.textContent = msg;
    el.className = "form-status" + (kind ? " " + kind : "");
  }

  /* ── Contact forms (Web3Forms) — desktop + mobile ─────────────────── */
  Array.prototype.forEach.call(document.querySelectorAll("form[data-web3form]"), function (form) {
    var status = form.querySelector(".form-status");
    var lang = form.getAttribute("data-lang") || "es";
    var msg = lang === "en"
      ? { send: "Sending…", ok: "Thanks — we'll reply within one business day.", err: "Something went wrong. Please email us directly.", cfg: "Form not configured yet." }
      : { send: "Enviando…", ok: "Gracias — respondemos en menos de 24 horas hábiles.", err: "Algo salió mal. Escríbenos directamente por correo.", cfg: "El formulario aún no está configurado." };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var key = form.getAttribute("data-key") || "";
      if (!key || key.indexOf("REPLACE_WITH") === 0) {
        setStatus(status, msg.cfg, "err");
        return;
      }
      setStatus(status, msg.send, "");
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.success) { form.reset(); setStatus(status, msg.ok, "ok"); }
          else { setStatus(status, msg.err, "err"); }
        })
        .catch(function () { setStatus(status, msg.err, "err"); });
    });
  });

  /* ── Newsletter forms (beehiiv) ───────────────────────────────────── */
  Array.prototype.forEach.call(document.querySelectorAll("form.nl-form"), function (form) {
    if (form.getAttribute("data-disabled") === "true") return; // placeholder
    var status = form.querySelector(".form-status");
    var endpoint = form.getAttribute("data-beehiiv") || "";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!endpoint) { setStatus(status, "Pronto / Soon", "err"); return; }
      setStatus(status, "…", "");
      fetch(endpoint, { method: "POST", mode: "no-cors", body: new FormData(form) })
        .then(function () { form.reset(); setStatus(status, "¡Listo! Revisa tu correo. / Check your inbox.", "ok"); })
        .catch(function () { setStatus(status, "Error — intenta de nuevo. / Try again.", "err"); });
    });
  });
})();
