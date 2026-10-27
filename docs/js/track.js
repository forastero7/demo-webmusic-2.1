/* Medición de conversiones lista para Meta Ads / Google.
   No envía nada por sí solo: solo dispara eventos si el Píxel de Meta (fbq)
   o Google (gtag / dataLayer) están instalados en la página. */
(function () {
  "use strict";
  window.dataLayer = window.dataLayer || [];

  function send(name, params) {
    params = params || {};
    window.dataLayer.push(Object.assign({ event: name }, params));
    if (typeof window.fbq === "function") {
      var std = { wa_click: "Contact", add_to_list: "AddToWishlist", send_list: "Lead" }[name];
      if (std) window.fbq("track", std, params); else window.fbq("trackCustom", name, params);
    }
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (a) {
      var where = a.closest("section, header, footer, dialog");
      send("wa_click", { placement: a.classList.contains("wa-float") ? "flotante" : (where && (where.id || where.tagName.toLowerCase())) || "otro" });
      return;
    }
    var add = e.target.closest && e.target.closest("[data-add]");
    if (add && add.getAttribute("aria-pressed") !== "true") send("add_to_list", { item_id: add.getAttribute("data-add") });
  }, true);

  document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "list-form") send("send_list", { items: Number((document.getElementById("list-count") || {}).textContent || 0) });
  }, true);
})();
