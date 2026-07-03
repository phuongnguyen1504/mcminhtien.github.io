/**
 * =====================================================================
 *  DATA.JS — TOÀN BỘ NỘI DUNG TRANG WEB NẰM Ở ĐÂY
 *  Muốn sửa chữ, thêm/bớt mục: chỉ cần sửa file này, KHÔNG cần đụng HTML.
 *  Muốn thay ảnh: thay file trong thư mục images/ (giữ nguyên tên),
 *  hoặc đổi đường dẫn "image" bên dưới.
 * =====================================================================
 */
const SITE_DATA = {

  // ------- Thông tin chung -------
  brand: {
    name: "MC Minh Tiên",
    tagline: "MC Sự Kiện Song Ngữ Chuyên Nghiệp",
    slogan: "Mỗi câu chuyện đặc biệt xứng đáng được kể theo một cách riêng — trọn vẹn và giàu cảm xúc.",
    heroImage: "images/hero.svg",
    profileUrl: "#", // Link Google Drive hồ sơ năng lực (profile)
    phone: "0900 000 000",
    email: "booking@mcminhtien.com",
    facebook: "#",
    youtube: "#",
  },

  // ------- Menu điều hướng (khớp với id của từng section trong HTML) -------
  nav: [
    { label: "Giới thiệu",            href: "#gioi-thieu" },
    { label: "Lĩnh vực hoạt động",    href: "#linh-vuc" },
    { label: "Chương trình nổi bật",  href: "#chuong-trinh" },
    { label: "Khoảnh khắc đáng nhớ",  href: "#khoanh-khac" },
    { label: "Video",                 href: "#video" },
  ],

  // ------- Lời nhận xét của khách hàng (dưới hero) -------
  testimonial: {
    quote: "MC dẫn dắt chương trình rất chuyên nghiệp, linh hoạt xử lý tình huống và giữ được năng lượng xuyên suốt sự kiện. Chúng tôi chắc chắn sẽ tiếp tục hợp tác.",
    author: "Đại diện Ban tổ chức — Công ty ABC",
  },

  // ------- Giới thiệu bản thân -------
  about: {
    heading: "About me",          // chữ watermark khổng lồ phía sau section
    image: "images/about.svg",    // ảnh chân dung (nên dùng ảnh dọc)
    background: "images/hero.svg",// ảnh nền mờ của cả section (để "" nếu không dùng)
    paragraphs: [
      "Tốt nghiệp chuyên ngành Ngôn ngữ Anh, được đào tạo bài bản về kỹ năng dẫn chương trình, Minh Tiên đã đồng hành cùng hàng trăm sự kiện lớn nhỏ trong hơn 5 năm hoạt động.",
      "Với chất giọng ấm, phát âm chuẩn và khả năng ứng biến linh hoạt bằng cả tiếng Việt lẫn tiếng Anh, Minh Tiên mang đến trải nghiệm dẫn dắt chỉn chu cho mọi loại hình chương trình — từ hội nghị doanh nghiệp trang trọng đến lễ hội sôi động.",
    ],
    facts: [
      { label: "Giọng nói",  value: "Miền Bắc – Miền Trung" },
      { label: "Chiều cao",  value: "1m75" },
      { label: "Ngôn ngữ",   value: "Tiếng Việt – Tiếng Anh" },
    ],
    // Số liệu chạy hiệu ứng đếm (counter)
    stats: [
      { number: 2,   suffix: "",  label: "Ngôn ngữ dẫn chương trình" },
      { number: 100, suffix: "+", label: "Đối tác & khách hàng" },
      { number: 300, suffix: "+", label: "Sự kiện đã thực hiện" },
      { number: 8,   suffix: "",  label: "Loại hình chương trình" },
    ],
  },

  // ------- Lĩnh vực hoạt động (8 thẻ) -------
  services: [
    { title: "MC Sự kiện – Lễ hội",            image: "images/service-1.svg", desc: "Dẫn dắt các lễ hội, sự kiện cộng đồng quy mô lớn với năng lượng bùng nổ." },
    { title: "MC Chương trình nghệ thuật",      image: "images/service-2.svg", desc: "Đêm nhạc, hòa nhạc, chương trình biểu diễn nghệ thuật." },
    { title: "MC Hội thảo – Tọa đàm",           image: "images/service-3.svg", desc: "Điều phối hội thảo chuyên môn, tọa đàm song ngữ." },
    { title: "MC Sự kiện thương hiệu",          image: "images/service-4.svg", desc: "Ra mắt sản phẩm, khai trương, kích hoạt thương hiệu." },
    { title: "MC Gala Dinner – Hội nghị",       image: "images/service-5.svg", desc: "Year-end party, gala dinner, hội nghị khách hàng." },
    { title: "Voice Talent",                    image: "images/service-6.svg", desc: "Thu âm quảng cáo, lồng tiếng, đọc voice-over song ngữ." },
    { title: "MC Tiệc cưới",                    image: "images/service-7.svg", desc: "Dẫn tiệc cưới ấm áp, trang trọng theo phong cách riêng của mỗi cặp đôi." },
    { title: "VJ – Sự kiện bất động sản",       image: "images/service-8.svg", desc: "Dẫn dắt lễ mở bán, giới thiệu dự án bất động sản." },
  ],

  // ------- Chương trình nổi bật (6 thẻ) -------
  programs: [
    { title: "Year-End Party — Tập đoàn công nghệ",   image: "images/program-1.svg", desc: "Đêm tiệc cuối năm hơn 500 khách mời, dẫn song ngữ Việt – Anh." },
    { title: "Gala & Team Building — Doanh nghiệp FDI", image: "images/program-2.svg", desc: "Chuỗi hoạt động gắn kết kết hợp gala dinner trang trọng." },
    { title: "Hội thảo công nghệ quốc tế",             image: "images/program-3.svg", desc: "Điều phối phiên thảo luận với diễn giả trong và ngoài nước." },
    { title: "Lễ kích hoạt thương hiệu toàn quốc",     image: "images/program-4.svg", desc: "Chuỗi sự kiện activation tại các thành phố lớn." },
    { title: "Lễ khai trương đường bay quốc tế",       image: "images/program-5.svg", desc: "Sự kiện trang trọng với sự tham dự của lãnh đạo hai nước." },
    { title: "Đêm hòa nhạc thính phòng",               image: "images/program-6.svg", desc: "Dẫn dắt đêm nhạc cổ điển với phong thái tinh tế, sang trọng." },
  ],

  // ------- Khoảnh khắc đáng nhớ (gallery, bấm vào xem lớn) -------
  gallery: [
    "images/gallery-1.svg",  "images/gallery-2.svg",  "images/gallery-3.svg",
    "images/gallery-4.svg",  "images/gallery-5.svg",  "images/gallery-6.svg",
    "images/gallery-7.svg",  "images/gallery-8.svg",  "images/gallery-9.svg",
    "images/gallery-10.svg", "images/gallery-11.svg", "images/gallery-12.svg",
  ],

  // ------- Video (dán ID video YouTube vào youtubeId) -------
  videoIntro: "Minh Tiên không ngừng trau dồi kỹ năng qua từng chương trình. Dưới đây là một số khoảnh khắc dẫn dắt tiêu biểu:",
  videos: [
    { title: "Showreel MC sự kiện 2026",        youtubeId: "dQw4w9WgXcQ" },
    { title: "Dẫn song ngữ — Hội nghị quốc tế", youtubeId: "dQw4w9WgXcQ" },
    { title: "Gala Dinner doanh nghiệp",         youtubeId: "dQw4w9WgXcQ" },
    { title: "Đêm nhạc thính phòng",             youtubeId: "dQw4w9WgXcQ" },
  ],

  // ------- Câu hỏi thường gặp (bấm để mở/đóng) -------
  faq: [
    {
      q: "Vai trò của MC trong một sự kiện là gì?",
      a: "MC là người giữ nhịp chương trình: kết nối các phần nội dung, dẫn dắt cảm xúc khán giả và xử lý các tình huống phát sinh để sự kiện diễn ra trọn vẹn theo kịch bản.",
    },
    {
      q: "Bạn dẫn được những ngôn ngữ nào?",
      a: "Tiếng Việt và tiếng Anh. Với chương trình cần thêm ngôn ngữ khác, Minh Tiên có thể phối hợp cùng MC đối tác trong mạng lưới cộng sự.",
    },
    {
      q: "Nếu có sự cố đột xuất không thể tham gia thì sao?",
      a: "Trong trường hợp bất khả kháng, Minh Tiên cam kết giới thiệu MC thay thế có năng lực tương đương và bàn giao kịch bản đầy đủ, đảm bảo chương trình không bị gián đoạn.",
    },
    {
      q: "Bạn có hỗ trợ tư vấn kịch bản không?",
      a: "Có. Minh Tiên sẵn sàng góp ý kịch bản, xây dựng lời dẫn phù hợp với thông điệp của chương trình và văn hóa của đơn vị tổ chức.",
    },
  ],

  // ------- Logo đối tác (carousel chạy tự động) -------
  partners: [
    "images/partner-1.svg", "images/partner-2.svg", "images/partner-3.svg",
    "images/partner-4.svg", "images/partner-5.svg", "images/partner-6.svg",
    "images/partner-7.svg", "images/partner-8.svg", "images/partner-9.svg",
    "images/partner-10.svg",
  ],

  // ------- Khối kết / kêu gọi hợp tác -------
  cta: {
    heading: "Gặp gỡ – Kết nối – Lan tỏa",
    text: "Cảm ơn bạn đã ghé thăm. Nếu bạn đang tìm một người dẫn chuyện cho sự kiện sắp tới, hãy liên hệ để chúng ta cùng tạo nên một chương trình đáng nhớ.",
    buttonLabel: "Liên hệ hợp tác",
  },

  footer: {
    copyright: "© 2026 MC Minh Tiên. All rights reserved.",
  },
};
