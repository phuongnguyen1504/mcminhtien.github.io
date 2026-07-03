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

  /* Tách chữ đầu tiên để tô màu vàng nghiêng (giống .frist-word trang tham khảo) */
  function firstWordHTML(text) {
    const i = text.indexOf(" ");
    if (i < 0) return `<span class="first-word">${text}</span>`;
    return `<span class="first-word">${text.slice(0, i)}</span>${text.slice(i)}`;
  }

  /* Bọc từng từ trong <span class="word"> để chạy hiệu ứng hiện chữ từng từ */
  function splitWords(el, firstWordAccent) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map((w, i) => `<span class="word${firstWordAccent && i === 0 ? " first-word" : ""}">${w}</span>`)
      .join(" ");
  }

  /* ----- Lĩnh vực hoạt động: slider kiểu "Tango" (coverflow + clip-path) ----- */
  function renderServices() {
    const root = $("#services-grid");
    root.classList.remove("card-grid", "cols-4");

    const arrowLeft = `<svg width="30" height="30" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.854 6.646a.5.5 0 010 .708L5.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M16 10a.5.5 0 01-.5.5H5a.5.5 0 010-1h10.5A.5.5 0 0116 10z" clip-rule="evenodd"/></svg>`;
    const arrowRight = `<svg width="30" height="30" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.146 6.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 10l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 10a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 10z" clip-rule="evenodd"/></svg>`;

    root.innerHTML = `
      <div class="ps-tango">
        <div class="swiper">
          <div class="swiper-wrapper">
            ${D.services
              .map(
                (it) => `
              <div class="swiper-slide">
                <div class="ps-image-wrap"><img src="${it.image}" alt="${it.title}" loading="lazy"></div>
                <div class="ps-content-wrap">
                  <div class="ps-subtitle">${it.title}</div>
                  <h3 class="ps-title">${firstWordHTML(it.desc)}</h3>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </div>
        <button class="ps-nav-prev" aria-label="Slide trước">${arrowLeft}</button>
        <button class="ps-nav-next" aria-label="Slide sau">${arrowRight}</button>
      </div>`;

    if (typeof Swiper === "undefined") return;

    // Cấu hình giống trang tham khảo: autoplay 4s, speed 900ms, slide giữa nổi bật
    const swiper = new Swiper(root.querySelector(".swiper"), {
      loop: true,
      speed: 900,
      autoplay: { delay: 4000, disableOnInteraction: false },
      centeredSlides: true,
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        768:  { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
      },
      navigation: {
        prevEl: root.querySelector(".ps-nav-prev"),
        nextEl: root.querySelector(".ps-nav-next"),
      },
    });

    // Tạm dừng autoplay khi rê chuột vào (pauseOnHover)
    const tango = root.querySelector(".ps-tango");
    tango.addEventListener("mouseenter", () => swiper.autoplay.stop());
    tango.addEventListener("mouseleave", () => swiper.autoplay.start());
  }

  /* ----- Chương trình nổi bật: slider kiểu "Avatar" (thẻ nhỏ phóng to thành nền) ----- */
  function renderPrograms() {
    const root = $("#programs-grid");
    root.classList.remove("card-grid", "cols-3");

    root.innerHTML = `
      <div class="ps-avatar">
        <div class="ps-av-fullsize"></div>
        <div class="ps-av-swiper swiper">
          <div class="swiper-wrapper">
            ${D.programs
              .map(
                (it) => `
              <div class="swiper-slide">
                <div class="ps-av-content">
                  <img class="ps-av-img" src="${it.image}" alt="${it.title}" loading="lazy">
                  <div class="ps-av-text">
                    <h3 class="ps-av-title">${it.title}</h3>
                    <div class="ps-av-desc"><p>${it.desc}</p></div>
                  </div>
                </div>
              </div>`
              )
              .join("")}
          </div>
          <button class="ps-av-next" aria-label="Chương trình kế tiếp">
            <svg width="30" height="30" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.146 6.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 10l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 10a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 10z" clip-rule="evenodd"/></svg>
          </button>
        </div>
      </div>`;

    if (typeof Swiper === "undefined") return;

    const container = root.querySelector(".ps-avatar");
    const fullsize = container.querySelector(".ps-av-fullsize");

    // Nhân bản nội dung mỗi slide thành lớp "hero" full khung + tách chữ từng từ
    const clones = Array.from(container.querySelectorAll(".ps-av-content"), (el) => {
      const c = el.cloneNode(true);
      splitWords(c.querySelector(".ps-av-title"), true);
      c.querySelectorAll(".ps-av-desc p").forEach((p) => splitWords(p, false));
      c.classList.add("ps-av-hero", "is-hidden");
      fullsize.appendChild(c);
      return c;
    });

    const state = { top: null, bottom: null };

    new Swiper(container.querySelector(".ps-av-swiper"), {
      slidesPerView: 1.5,
      spaceBetween: 25,
      loop: true,
      speed: 500,
      simulateTouch: false,
      breakpoints: {
        768:  { slidesPerView: 2.5 },
        1024: { slidesPerView: 3.5 },
      },
      navigation: { nextEl: container.querySelector(".ps-av-next") },
      on: {
        init() {
          const c = clones[this.realIndex];
          if (!c) return;
          c.classList.remove("is-hidden");
          c.classList.add("is-top");
          state.top = c;
        },
        realIndexChange() {
          const c = clones[this.realIndex];
          if (!c || c === state.top) return;

          // Lớp nền cũ mờ dần và phóng to nhẹ, lớp mới bay lên trên
          if (state.bottom) {
            state.bottom.classList.remove("is-bottom");
            state.bottom.classList.add("is-hidden");
          }
          if (state.top) {
            state.top.classList.remove("is-top");
            state.top.classList.add("is-bottom");
          }
          state.bottom = state.top;
          state.top = c;

          // Đặt clone đúng vị trí thẻ nhỏ đang active rồi thả cho nó "nở" ra full khung
          const slideRect = this.slides[this.activeIndex].getBoundingClientRect();
          const rootRect = container.getBoundingClientRect();
          c.style.transition = "none";
          c.style.left = slideRect.left - rootRect.left + "px";
          c.style.top = slideRect.top - rootRect.top + "px";
          c.style.width = slideRect.width + "px";
          c.style.height = slideRect.height + "px";
          c.style.borderRadius = "var(--ps-radius, 0)";
          c.getBoundingClientRect(); // ép trình duyệt áp vị trí trước khi transition
          c.classList.remove("is-hidden");
          c.classList.add("is-top", "is-grow");
          c.style.transition = "";
          c.style.left = "";
          c.style.top = "";
          c.style.width = "";
          c.style.height = "";
          c.style.borderRadius = "";

          // Nở xong thì hiện chữ từng từ; chữ hiện xong thì trả về trạng thái tĩnh
          const onTextDone = (e) => {
            if (e.target !== e.currentTarget) {
              e.currentTarget.classList.remove("show-text");
              e.currentTarget.removeEventListener("transitionend", onTextDone);
            }
          };
          const onGrowDone = (e) => {
            e.currentTarget.classList.remove("is-grow");
            e.currentTarget.classList.add("show-text");
            e.currentTarget.addEventListener("transitionend", onTextDone);
          };
          c.addEventListener("transitionend", onGrowDone, { once: true });
        },
      },
    });
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
