(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* Número comercial de WhatsApp de Casa Musical Jhonatan BM (formato internacional, sin "+"). */
  var WHATSAPP = "51975379354";
  var LIST_KEY = "cmj-lista";
  var LANG_KEY = "cmj-lang";

  var USES = ["principiante", "estudiante", "banda", "iglesia", "vivo", "estudio", "eventos"];
  var LEVELS = ["inicial", "intermedio", "pro"];
  var BUDGETS = [300, 800, 1500, 99999];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };

  var lang = store.get(LANG_KEY, "es") === "en" ? "en" : "es"; // español por defecto; inglés solo con el botón
  var list = store.get(LIST_KEY, {}); // { id: qty }

  var byId = {};
  PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  Object.keys(list).forEach(function (id) { if (!byId[id]) delete list[id]; });

  /* ---------- Utilidades ---------- */
  function t(key, vars) {
    var s = (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }
  function money(n) {
    return "S/ " + n.toLocaleString(lang === "en" ? "en-US" : "es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  function catName(id) { var c = CATEGORIES.filter(function (x) { return x.id === id; })[0]; return c ? c[lang] : ""; }
  function waUrl(text) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text); }
  /* Abre WhatsApp en una pestaña nueva; si el navegador lo bloquea, navega en la misma. */
  function openWa(text) {
    var url = waUrl(text);
    var w = window.open(url, "_blank");
    if (w) w.opener = null; else location.href = url;
  }
  function productMsg(p, qty) {
    var vars = { name: p[lang].name, price: money(p.price), qty: qty };
    return t(qty > 1 ? "msg.singleQty" : "msg.single", vars);
  }
  function waIcon() { return '<svg viewBox="0 0 32 32" aria-hidden="true"><use href="#wa-glyph"/></svg>'; }
  /* Imagen del producto: foto real (WebP responsive, carga diferida) o ilustración SVG. */
  var SIZES = { card: "(max-width: 640px) 46vw, 290px", pd: "(max-width: 960px) 90vw, 430px", li: "56px" };
  function photoTag(ph, cls, sizes, alt) {
    return '<img class="' + cls + ' photo" src="' + esc(ph.src) + '" srcset="' + esc(ph.srcset) + '" sizes="' + sizes + '"' +
      ' width="' + ph.w + '" height="' + ph.h + '" alt="' + esc(alt || "") + '" loading="lazy" decoding="async">';
  }
  function media(p, cls, kind, alt) {
    if (p.photos && p.photos.length) return photoTag(p.photos[0], cls || "art", SIZES[kind || "card"], alt);
    return iconSVG(p.icon, cls);
  }

  var toastTimer;
  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  /* ---------- Idioma ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    $$('a[data-wa="general"]').forEach(function (a) { a.href = waUrl(t("msg.general")); });
    fillSelects();
    renderCatChips();
    renderCategories();
    renderRecChips();
    renderPopular();
    renderGrid();
    renderList();
    if ($("#rec-result").dataset.shown) runRecommender();
    var open = $("#product-dialog");
    if (open.open && open.dataset.id) renderProduct(open.dataset.id);
  }

  $("#lang-btn").addEventListener("click", function () {
    lang = lang === "es" ? "en" : "es";
    store.set(LANG_KEY, lang);
    applyLang();
  });

  /* ---------- Filtros ---------- */
  var state = { q: "", cat: "", bud: "", use: "", sort: "pop" };

  function opt(value, label, selected) {
    return '<option value="' + esc(value) + '"' + (selected ? " selected" : "") + ">" + esc(label) + "</option>";
  }
  function budgetLabel(b) { return t("rec.bud." + b); }
  function fillSelects() {
    $("#f-cat").innerHTML = opt("", t("f.all"), !state.cat) + CATEGORIES.map(function (c) { return opt(c.id, c[lang], state.cat === c.id); }).join("");
    $("#f-bud").innerHTML = opt("", t("f.anyBudget"), !state.bud) + BUDGETS.map(function (b) { return opt(String(b), budgetLabel(b), state.bud === String(b)); }).join("");
    $("#f-use").innerHTML = opt("", t("f.anyUse"), !state.use) + USES.map(function (u) { return opt(u, t("use." + u), state.use === u); }).join("");
    $("#f-sort").innerHTML = ["pop", "asc", "desc", "name"].map(function (s) { return opt(s, t("f.sort." + s), state.sort === s); }).join("");
    $("#f-q").value = state.q;

    var sel = $("#district"), cur = sel.value;
    sel.innerHTML = opt("", t("list.choose"), true) + LIMA_DISTRICTS.slice().sort(function (a, b) { return a.localeCompare(b, "es"); }).map(function (d) { return opt(d, d, d === cur); }).join("");
  }

  function inBudget(price, bud) {
    if (!bud) return true;
    bud = Number(bud);
    if (bud === 99999) return price > 1500;
    return price <= bud;
  }

  function filtered() {
    var q = norm(state.q.trim());
    var res = PRODUCTS.filter(function (p) {
      if (state.cat && p.cat !== state.cat) return false;
      if (state.use && p.uses.indexOf(state.use) < 0) return false;
      if (!inBudget(p.price, state.bud)) return false;
      if (q) {
        var hay = norm([p.es.name, p.en.name, p.es.desc, p.en.desc, catName(p.cat)].join(" "));
        return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
      }
      return true;
    });
    var sorters = {
      pop: function (a, b) { return (b.popular ? 1 : 0) - (a.popular ? 1 : 0); },
      asc: function (a, b) { return a.price - b.price; },
      desc: function (a, b) { return b.price - a.price; },
      name: function (a, b) { return a[lang].name.localeCompare(b[lang].name, lang); }
    };
    return res.sort(sorters[state.sort] || sorters.pop);
  }

  function readFilters() {
    state.q = $("#f-q").value;
    state.cat = $("#f-cat").value;
    state.bud = $("#f-bud").value;
    state.use = $("#f-use").value;
    state.sort = $("#f-sort").value;
    renderGrid();
    renderCatChips();
  }
  ["#f-cat", "#f-bud", "#f-use", "#f-sort"].forEach(function (s) { $(s).addEventListener("change", readFilters); });
  $("#f-q").addEventListener("input", readFilters);
  $("#f-clear").addEventListener("click", function () {
    state = { q: "", cat: "", bud: "", use: "", sort: "pop" };
    fillSelects();
    renderGrid();
    renderCatChips();
  });

  function goCatalog(patch) {
    Object.keys(patch).forEach(function (k) { state[k] = patch[k]; });
    fillSelects();
    renderGrid();
    renderCatChips();
    $("#catalogo").scrollIntoView({ behavior: "smooth" });
  }

  $("#hero-search").addEventListener("submit", function (e) {
    e.preventDefault();
    goCatalog({ q: $("#hero-q").value, cat: "", bud: "", use: "" });
  });

  /* ---------- Tarjetas ---------- */
  function card(p) {
    var inList = !!list[p.id], d = p[lang];
    return '<article class="card" data-id="' + p.id + '">' +
      '<button class="card-media' + (p.photos ? " has-photo" : "") + '" type="button" data-view="' + p.id + '" aria-label="' + esc(t("p.details") + ": " + d.name) + '">' +
        media(p) +
        '<span class="tag tag-demo">' + t("p.demo") + "</span>" +
        (p.popular ? '<span class="tag tag-pop">' + t("p.popular") + "</span>" : "") +
      "</button>" +
      '<div class="card-body">' +
        '<p class="card-cat">' + esc(catName(p.cat)) + "</p>" +
        '<h3 class="card-title"><button type="button" data-view="' + p.id + '">' + esc(d.name) + "</button></h3>" +
        '<p class="card-desc">' + esc(d.desc) + "</p>" +
        '<p class="price"><strong>' + money(p.price) + '</strong><span class="price-label">' + t("p.ref") + "</span></p>" +
        '<div class="card-actions">' +
          '<a class="btn btn-sm btn-wa" href="' + esc(waUrl(productMsg(p, 1))) + '" target="_blank" rel="noopener" aria-label="' + esc(t("p.quoteLong") + ": " + d.name) + '">' + waIcon() + "<span>" + t("p.quote") + "</span></a>" +
          '<button class="btn btn-sm ' + (inList ? "btn-added" : "btn-outline") + '" type="button" data-add="' + p.id + '" aria-pressed="' + inList + '" aria-label="' + esc((inList ? t("p.added") : t("p.add")) + ": " + d.name) + '">' + (inList ? t("p.addedShort") : t("p.addShort")) + "</button>" +
        "</div>" +
      "</div></article>";
  }

  function renderGrid() {
    var items = filtered();
    $("#grid").innerHTML = items.map(card).join("");
    $("#grid-empty").hidden = items.length > 0;
    $("#f-count").textContent = items.length === 1 ? t("f.count1") : t("f.count", { n: items.length });
  }

  function renderPopular() {
    $("#popular").innerHTML = PRODUCTS.filter(function (p) { return p.popular; }).map(card).join("");
  }

  function renderCategories() {
    $("#cat-grid").innerHTML = CATEGORIES.map(function (c) {
      var items = PRODUCTS.filter(function (p) { return p.cat === c.id; });
      var from = Math.min.apply(null, items.map(function (p) { return p.price; }));
      return '<button class="cat reveal" type="button" data-cat="' + c.id + '">' + iconSVG(c.icon, "cat-art") +
        '<span class="cat-name">' + esc(c[lang]) + '</span><span class="cat-meta">' + items.length + " · " + (lang === "en" ? "from " : "desde ") + money(from) + "</span>" +
        '<span class="cat-arrow" aria-hidden="true">→</span></button>';
    }).join("");
    observeReveal();
  }

  function renderCatChips() {
    $("#cat-chips").innerHTML = [{ id: "", es: t("f.all"), en: t("f.all") }].concat(CATEGORIES).map(function (c) {
      var on = state.cat === c.id;
      return '<button type="button" class="cchip' + (on ? " on" : "") + '" data-chip="' + c.id + '" aria-pressed="' + on + '">' + esc(c[lang]) + "</button>";
    }).join("");
  }

  /* ---------- Ficha de producto ---------- */
  function renderProduct(id) {
    var p = byId[id], d = p[lang];
    var dlg = $("#product-dialog");
    dlg.dataset.id = id;
    var qty = list[id] || 1;
    $("#pd-body").innerHTML =
      '<div class="pd">' +
        '<div class="pd-media' + (p.photos ? " has-photo" : "") + '">' + media(p, "art pd-main", "pd", d.name) +
          (p.photos ? gallery(p) : '<p class="small">' + t("p.photoNote") + "</p>") + "</div>" +
        '<div class="pd-info">' +
          '<p class="card-cat">' + esc(catName(p.cat)) + ' · <span class="tag-inline">' + t("p.demo") + "</span></p>" +
          '<h2 id="pd-title">' + esc(d.name) + "</h2>" +
          '<p class="muted">' + t("p.brand") + "</p>" +
          '<p class="price big"><strong>' + money(p.price) + '</strong><span class="price-label">' + t("p.ref") + "</span></p>" +
          "<p>" + esc(d.desc) + "</p>" +
          (d.inc.length ? "<h3>" + t("p.includes") + '</h3><ul class="inc">' + d.inc.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" : "") +
          '<dl class="pd-meta"><dt>' + t("p.level") + "</dt><dd>" + t("lvl." + p.level) + "</dd>" +
          "<dt>" + t("p.uses") + "</dt><dd>" + p.uses.map(function (u) { return t("use." + u); }).join(", ") + "</dd></dl>" +
          '<p class="stock">' + t("p.stock") + "</p>" +
          '<div class="pd-actions">' +
            '<label class="qty"><span>' + t("p.qty") + '</span><input type="number" id="pd-qty" min="1" max="99" value="' + qty + '"></label>' +
            '<button class="btn btn-outline" type="button" id="pd-add">' + t("p.add") + "</button>" +
            '<a class="btn btn-wa" id="pd-quote" href="' + esc(waUrl(productMsg(p, qty))) + '" target="_blank" rel="noopener">' + waIcon() + "<span>" + t("p.quoteLong") + "</span></a>" +
          "</div>" +
        "</div>" +
      "</div>";
    $("#pd-add").addEventListener("click", function () {
      setQty(id, clampQty($("#pd-qty").value));
      this.textContent = t("p.added");
      this.classList.replace("btn-outline", "btn-added");
    });
    $$(".pd-thumb").forEach(function (b) {
      b.addEventListener("click", function () {
        var ph = p.photos[+b.dataset.photo], img = $(".pd-main");
        img.srcset = ph.srcset; img.src = ph.src;
        $$(".pd-thumb").forEach(function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
      });
    });
    $("#pd-qty").addEventListener("input", function () {
      $("#pd-quote").href = waUrl(productMsg(p, clampQty(this.value)));
    });
  }

  /* Miniaturas de galería cuando un producto tiene varias fotos */
  function gallery(p) {
    if (p.photos.length < 2) return "";
    return '<div class="pd-thumbs">' + p.photos.map(function (ph, i) {
      return '<button type="button" class="pd-thumb' + (i ? "" : " on") + '" data-photo="' + i + '" aria-label="' + esc(t("p.photo") + " " + (i + 1)) + '" aria-pressed="' + !i + '">' +
        photoTag(ph, "", "64px", "") + "</button>";
    }).join("") + "</div>";
  }

  function openProduct(id) {
    renderProduct(id);
    showDialog($("#product-dialog"));
  }

  /* ---------- Lista de cotización ---------- */
  function clampQty(v) { v = parseInt(v, 10); return isNaN(v) || v < 1 ? 1 : Math.min(v, 99); }
  function setQty(id, q) {
    if (q <= 0) delete list[id]; else list[id] = q;
    store.set(LIST_KEY, list);
    renderList();
    renderGrid();
    renderPopular();
  }
  function listIds() { return Object.keys(list); }
  function listTotal() { return listIds().reduce(function (s, id) { return s + byId[id].price * list[id]; }, 0); }

  function renderList() {
    var ids = listIds();
    var count = ids.reduce(function (s, id) { return s + list[id]; }, 0);
    $("#list-count").textContent = count;
    $("#list-count").classList.toggle("on", count > 0);
    $("#list-empty").hidden = ids.length > 0;
    $("#list-form-wrap").hidden = ids.length === 0;
    $("#list-items").innerHTML = ids.map(function (id) {
      var p = byId[id];
      return '<li class="li" data-id="' + id + '">' + media(p, "li-art", "li") +
        '<div class="li-info"><p class="li-name">' + esc(p[lang].name) + '</p><p class="li-price">' + money(p.price) + " × " + list[id] + " = <strong>" + money(p.price * list[id]) + "</strong></p></div>" +
        '<div class="li-qty"><button type="button" data-dec="' + id + '" aria-label="−1">−</button><span>' + list[id] + '</span><button type="button" data-inc="' + id + '" aria-label="+1">+</button></div>' +
        '<button class="li-remove" type="button" data-remove="' + id + '">' + t("list.remove") + "</button></li>";
    }).join("");
    $("#list-total").textContent = money(listTotal());
  }

  $("#list-btn").addEventListener("click", function () { showDialog($("#list-dialog")); });

  $$('input[name="zone"]').forEach(function (r) {
    r.addEventListener("change", function () {
      var lima = $('input[name="zone"]:checked').value === "lima";
      $("#district-wrap").hidden = !lima;
      $("#city-wrap").hidden = lima;
      $("#list-error").hidden = true;
    });
  });

  $("#list-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var zone = $('input[name="zone"]:checked').value;
    var loc = zone === "lima" ? $("#district").value : $("#city").value.trim();
    if (!loc) {
      $("#list-error").hidden = false;
      (zone === "lima" ? $("#district") : $("#city")).focus();
      return;
    }
    $("#list-error").hidden = true;
    var doc = $('input[name="doc"]:checked').value;
    var name = $("#cust-name").value.trim();
    var lines = [t("msg.hello")];
    listIds().forEach(function (id) { lines.push("• " + list[id] + " × " + byId[id][lang].name + " (" + money(byId[id].price) + ")"); });
    lines.push("");
    lines.push(t("msg.where", { loc: loc }));
    lines.push(t("msg.ask"));
    lines.push(t("msg.doc", { doc: t("msg." + doc) }));
    if (name) lines.push(t("msg.name", { name: name }));
    lines.push(t("msg.ref", { total: money(listTotal()) }));
    openWa(lines.join("\n"));
  });

  $("#list-clear").addEventListener("click", function () {
    list = {};
    store.set(LIST_KEY, list);
    renderList(); renderGrid(); renderPopular();
  });

  /* ---------- Recomendador ---------- */
  var rec = { who: "", lvl: "", bud: "" };
  function renderRecChips() {
    var groups = {
      who: USES.map(function (u) { return [u, t("rec.who." + u)]; }),
      lvl: LEVELS.map(function (l) { return [l, t("rec.lvl." + l)]; }),
      bud: BUDGETS.map(function (b) { return [String(b), t("rec.bud." + b)]; })
    };
    $$("#rec-form .chips").forEach(function (box) {
      var name = box.getAttribute("data-name");
      box.innerHTML = groups[name].map(function (g) {
        return '<label class="chip"><input type="radio" name="rec-' + name + '" value="' + g[0] + '"' + (rec[name] === g[0] ? " checked" : "") + "><span>" + esc(g[1]) + "</span></label>";
      }).join("");
    });
  }
  $("#rec-form").addEventListener("change", function (e) {
    if (e.target.name && e.target.name.indexOf("rec-") === 0) rec[e.target.name.slice(4)] = e.target.value;
  });
  $("#rec-form").addEventListener("submit", function (e) { e.preventDefault(); runRecommender(); });
  $("#rec-form").addEventListener("reset", function () {
    rec = { who: "", lvl: "", bud: "" };
    var r = $("#rec-result"); r.hidden = true; delete r.dataset.shown;
    setTimeout(renderRecChips, 0);
  });

  function runRecommender() {
    var lvlRank = { inicial: 0, intermedio: 1, pro: 2 };
    var scored = PRODUCTS.map(function (p) {
      var s = 0;
      if (rec.who) s += p.uses.indexOf(rec.who) >= 0 ? 5 : -10;
      if (rec.lvl) s += 2 - Math.abs(lvlRank[p.level] - lvlRank[rec.lvl]);
      if (rec.bud) s += inBudget(p.price, rec.bud) ? 3 : -10;
      if (p.cat === "accesorios") s -= 1;
      if (p.popular) s += 0.5;
      return { p: p, s: s };
    }).filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s || b.p.price - a.p.price; })
      .slice(0, 4);
    var r = $("#rec-result");
    r.hidden = false;
    r.dataset.shown = "1";
    r.innerHTML = scored.length
      ? "<h3>" + t("rec.result") + '</h3><div class="grid grid-rec">' + scored.map(function (x) { return card(x.p); }).join("") + '</div><p class="small">' + t("rec.note") + "</p>"
      : '<p>' + t("rec.none") + '</p><a class="btn btn-wa" href="' + esc(waUrl(t("msg.general"))) + '" target="_blank" rel="noopener">' + waIcon() + "<span>" + t("wa.float") + "</span></a>";
  }

  /* ---------- Delegación de eventos ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-add],[data-view],[data-cat],[data-chip],[data-inc],[data-dec],[data-remove],[data-open],[data-close]");
    if (!el) return;
    var d = el.dataset;
    if (d.add) {
      if (list[d.add]) { setQty(d.add, 0); toast(t("toast.removed")); }
      else { setQty(d.add, 1); toast(t("toast.added")); }
    } else if (d.view) {
      openProduct(d.view);
    } else if (d.cat) {
      goCatalog({ cat: d.cat, q: "", use: "", bud: "" });
    } else if (d.chip !== undefined) {
      state.cat = d.chip;
      fillSelects(); renderGrid(); renderCatChips();
    } else if (d.inc) {
      setQty(d.inc, Math.min(list[d.inc] + 1, 99));
    } else if (d.dec) {
      setQty(d.dec, list[d.dec] - 1);
    } else if (d.remove) {
      setQty(d.remove, 0);
    } else if (d.open) {
      showDialog(document.getElementById(d.open));
    } else if (el.hasAttribute("data-close")) {
      el.closest("dialog").close();
    }
  });

  /* ---------- Diálogos ---------- */
  function showDialog(dlg) {
    $$("dialog[open]").forEach(function (x) { if (x !== dlg) x.close(); });
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }
  $$("dialog").forEach(function (dlg) {
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  });

  /* ---------- Menú móvil ---------- */
  $("#menu-btn").addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    this.setAttribute("aria-expanded", open);
  });
  $$("#main-nav a").forEach(function (a) {
    a.addEventListener("click", function () { document.body.classList.remove("nav-open"); $("#menu-btn").setAttribute("aria-expanded", "false"); });
  });

  /* ---------- Animación de entrada discreta ---------- */
  var io = "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px" })
    : null;
  function observeReveal() {
    $$(".reveal:not(.in)").forEach(function (el) { if (io) io.observe(el); else el.classList.add("in"); });
  }

  /* Cabecera compacta al hacer scroll */
  var header = $(".site-header");
  window.addEventListener("scroll", function () { header.classList.toggle("scrolled", window.scrollY > 10); }, { passive: true });

  applyLang();
  observeReveal();
})();
