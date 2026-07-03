/**
 * =====================================================================
 *  MAIN.JS — render nội dung từ data.js và xử lý tương tác
 *  Cấu trúc: mỗi section một hàm render riêng + các hàm tương tác.
 *  Bình thường bạn KHÔNG cần sửa file này — chỉ sửa js/data.js.
 * =====================================================================
 */
(function () {
  "use strict";
  const D = SITE_DATA;
  const $ = (sel) => document.querySelector(sel);

  /* ---------- Header: logo + menu ---------- */
  function renderHeader() {
    const parts = D.brand.name.split(" ");
    // Chữ cuối cùng của tên được tô màu vàng (VD: MC Minh <span>Tiên</span>)
    $("#logo").innerHTML =
      parts.slice(0, -1).join(" ") + " <span>" + parts.at(-1) + "</span>";

    $("#main-nav").innerHTML = D.nav
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");

    $("#profile-link").href = D.brand.profileUrl;
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    $("#hero-bg").style.backgroundImage = `url("${D.brand.heroImage}")`;
    $("#hero-tagline").textContent = D.brand.tagline;
    $("#hero-name").textContent = D.brand.name;
    $("#hero-slogan").textContent = D.brand.slogan;
  }

  /* ---------- Testimonial ---------- */
  function renderTestimonial() {
    $("#testimonial-quote").textContent = D.testimonial.quote;
    $("#testimonial-author").textContent = "— " + D.testimonial.author;
  }

  /* ---------- Giới thiệu ---------- */
  function renderAbout() {
    $("#about-heading").textContent = D.about.heading;
    $("#about-image").src = D.about.image;

    $("#about-paragraphs").innerHTML = D.about.paragraphs
      .map((p) => `<p>${p}</p>`)
      .join("");

    $("#about-facts").innerHTML = D.about.facts
      .map(
        (f) =>
          `<li><span class="fact-label">${f.label}</span><span>${f.value}</span></li>`
      )
      .join("");

    $("#about-stats").innerHTML = D.about.stats
      .map(
        (s) => `
        <div class="stat reveal">
          <div class="stat-number" data-target="${s.number}" data-suffix="${s.suffix}">0</div>
          <div class="stat-label">${s.label}</div>
        </div>`
      )
      .join("");
  }

  /* ---------- Thẻ dùng chung cho services / programs ---------- */
  function cardHTML(item) {
    return `
      <article class="card reveal">
        <div class="card-media"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>
        <div class="card-body">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.desc}</p>
        </div>
      </article>`;
  }

  function renderServices() {
    // Render carousel for services (autoplay 4s)
    createCarousel("#services-grid", D.services, { visibleSlides: 3, autoplay: 4000 });
  }

  function renderPrograms() {
    // Render carousel for programs (show larger slide, autoplay 4s)
    createCarousel("#programs-grid", D.programs, { visibleSlides: 1, autoplay: 4000 });
  }

  /* ---------- Carousel builder (reusable) ---------- */
  function createCarousel(containerSelector, items, opts = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    // Remove grid classes (card-grid / cols-*) so carousel can be full-width
    container.classList.remove('card-grid', 'cols-4', 'cols-3', 'cols-2');
    // build markup
    const trackId = containerSelector.replace(/[#.]/g, "") + "-carousel";
    container.innerHTML = `
      <div class="carousel" id="${trackId}" tabindex="0">
        <div class="carousel-track"></div>
        <div class="carousel-nav">
          <button class="carousel-prev" aria-label="Trước">&#10094;</button>
          <button class="carousel-next" aria-label="Sau">&#10095;</button>
        </div>
        <div class="carousel-thumbs" aria-hidden="false"></div>
      </div>`;

    const carousel = container.querySelector(".carousel");
    const track = carousel.querySelector(".carousel-track");
    const thumbs = carousel.querySelector(".carousel-thumbs");
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");

    // populate slides
    track.innerHTML = items
      .map((it) => `<div class="carousel-slide">${cardHTML(it)}</div>`) 
      .join("");
    thumbs.innerHTML = items
      .map((it, i) => `<button class="carousel-thumb" data-index="${i}" aria-label="Xem ${i+1}"><img src="${it.image}" alt="thumb-${i}"></button>`) 
      .join("");

    const slides = Array.from(track.children);
    const thumbBtns = Array.from(thumbs.children);
    let index = 0;
    let isDragging = false, startX = 0, currentTranslate = 0;
    const autoplayMs = opts.autoplay || 0;
    let autoplayTimer = null;
    // responsive visibleSlides: adapt to viewport
    function computeVisible() {
      const defaultVisible = opts.visibleSlides || 1;
      const w = window.innerWidth;
      if (w <= 480) return 1;
      if (w <= 1024) return Math.min(defaultVisible, 2);
      return defaultVisible;
    }

    function applySlideSizing() {
      const visible = computeVisible();
      slides.forEach((s) => {
        s.style.flex = `0 0 ${100 / visible}%`;
      });
    }
    applySlideSizing();

    function update() {
      const activeSlide = slides[index];
      // center active slide inside carousel and clamp
      const containerWidth = carousel.clientWidth;
      const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
      let offset = slideCenter - containerWidth / 2;
      const maxOffset = Math.max(0, track.scrollWidth - containerWidth);
      offset = Math.max(0, Math.min(offset, maxOffset));
      track.style.transform = `translateX(${-offset}px)`;
      // active class
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      thumbBtns.forEach((b, i) => b.classList.toggle("active", i === index));

      // parallax: translate inner images subtly based on distance from center
      slides.forEach((s) => {
        const img = s.querySelector('.card-media img');
        if (!img) return;
        const sCenter = s.offsetLeft + s.offsetWidth / 2;
        // relative position -1..1
        const rel = ((sCenter - offset) - containerWidth / 2) / containerWidth;
        const maxShift = 12; // percent
        const shift = Math.max(-1, Math.min(1, rel)) * maxShift;
        img.style.transform = `translateX(${ -shift }%)`;
      });
    }

    function goto(i) {
      index = ((i % slides.length) + slides.length) % slides.length;
      update();
      // reset autoplay timer when user explicitly navigates
      if (autoplayMs) {
        stopAutoplay(); startAutoplay();
      }
    }

    prevBtn.addEventListener("click", () => goto(index - 1));
    nextBtn.addEventListener("click", () => goto(index + 1));

    // click thumb
    thumbs.addEventListener("click", (e) => {
      const b = e.target.closest(".carousel-thumb");
      if (!b) return;
      goto(Number(b.dataset.index));
    });

    // keyboard
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goto(index - 1);
      if (e.key === "ArrowRight") goto(index + 1);
    });

    // swipe support (pointer events)
    track.addEventListener("pointerdown", (e) => {
      isDragging = true; startX = e.clientX; track.setPointerCapture(e.pointerId);
      // pause autoplay while dragging
      if (autoplayMs) stopAutoplay();
    });
    track.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      track.style.transform = `translateX(${ -slides[index].offsetLeft + dx }px)`;
    });
    track.addEventListener("pointerup", (e) => {
      if (!isDragging) return; isDragging = false;
      const dx = e.clientX - startX;
      if (dx < -40) goto(index + 1);
      else if (dx > 40) goto(index - 1);
      else update();
      // resume autoplay after interaction
      if (autoplayMs) startAutoplay();
    });
    track.addEventListener("pointercancel", () => { isDragging = false; update(); });

    // reposition on resize
    window.addEventListener("resize", () => { applySlideSizing(); setTimeout(update, 80); });

    // initial
    update();

    // autoplay helpers
    function startAutoplay() {
      if (!autoplayMs) return;
      stopAutoplay();
      autoplayTimer = setInterval(() => goto(index + 1), autoplayMs);
    }
    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }
    if (autoplayMs) {
      // pause on hover/focus
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
      carousel.addEventListener('focusin', stopAutoplay);
      carousel.addEventListener('focusout', startAutoplay);
      startAutoplay();
    }
  }

  /* ---------- Gallery + lightbox ---------- */
  function renderGallery() {
    $("#gallery-grid").innerHTML = D.gallery
      .map(
        (src, i) => `
        <button class="reveal" data-index="${i}" aria-label="Xem ảnh ${i + 1}">
          <img src="${src}" alt="Khoảnh khắc ${i + 1}" loading="lazy">
        </button>`
      )
      .join("");
  }

  function setupLightbox() {
    const lightbox = $("#lightbox");
    const img = $("#lightbox-img");
    let current = 0;

    function show(index) {
      current = (index + D.gallery.length) % D.gallery.length;
      img.src = D.gallery[current];
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }

    $("#gallery-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-index]");
      if (btn) show(Number(btn.dataset.index));
    });
    $("#lightbox-close").addEventListener("click", close);
    $("#lightbox-prev").addEventListener("click", () => show(current - 1));
    $("#lightbox-next").addEventListener("click", () => show(current + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Video ---------- */
  function renderVideos() {
    $("#video-intro").textContent = D.videoIntro;
    $("#videos-grid").innerHTML = D.videos
      .map(
        (v) => `
        <article class="card video-card reveal">
          <div class="card-media">
            <iframe src="https://www.youtube.com/embed/${v.youtubeId}"
                    title="${v.title}" loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
          </div>
          <div class="card-body"><h3 class="card-title">${v.title}</h3></div>
        </article>`
      )
      .join("");
  }

  /* ---------- FAQ (accordion) ---------- */
  function renderFAQ() {
    $("#faq-list").innerHTML = D.faq
      .map(
        (item) => `
        <div class="faq-item reveal">
          <button class="faq-question" aria-expanded="false">
            <span>${item.q}</span><span class="faq-icon">+</span>
          </button>
          <div class="faq-answer"><p>${item.a}</p></div>
        </div>`
      )
      .join("");

    $("#faq-list").addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-question");
      if (!btn) return;
      const item = btn.parentElement;
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen);
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : "";
    });
  }

  /* ---------- Đối tác: nhân đôi danh sách logo để marquee chạy liền mạch ---------- */
  function renderPartners() {
    const logos = D.partners
      .map((src, i) => `<img src="${src}" alt="Đối tác ${i + 1}" loading="lazy">`)
      .join("");
    $("#marquee-track").innerHTML = logos + logos;
  }

  /* ---------- CTA + footer ---------- */
  function renderCTA() {
    $("#cta-heading").textContent = D.cta.heading;
    $("#cta-text").textContent = D.cta.text;
    const btn = $("#cta-button");
    btn.textContent = D.cta.buttonLabel;
    btn.href = "mailto:" + D.brand.email;

    $("#contact-lines").innerHTML = `
      <div>Hotline: <a href="tel:${D.brand.phone.replace(/\s/g, "")}">${D.brand.phone}</a></div>
      <div>Email: <a href="mailto:${D.brand.email}">${D.brand.email}</a></div>`;

    $("#footer-copy").textContent = D.footer.copyright;
  }

  /* ---------- Header đổi nền khi cuộn + đóng menu mobile khi bấm link ---------- */
  function setupHeaderBehavior() {
    const header = $("#site-header");
    const nav = $("#main-nav");
    const toggle = $("#nav-toggle");

    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });

    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.classList.remove("open");
      }
    });
  }

  /* ---------- Hiệu ứng xuất hiện khi cuộn + counter ---------- */
  function setupScrollEffects() {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    // Counter: đếm từ 0 lên số đích trong ~1.5 giây khi cuộn tới
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          counterObserver.unobserve(el);
          const target = Number(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          const duration = 1500;
          const start = performance.now();
          (function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(target * progress) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          })(start);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".stat-number").forEach((el) => counterObserver.observe(el));
  }

  /* ---------- Khởi chạy ---------- */
  renderHeader();
  renderHero();
  renderTestimonial();
  renderAbout();
  renderServices();
  renderPrograms();
  renderGallery();
  renderVideos();
  renderFAQ();
  renderPartners();
  renderCTA();

  setupLightbox();
  setupHeaderBehavior();
  setupScrollEffects();
})();
