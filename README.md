# Website MC Minh Tiên

Trang portfolio MC một trang (one-page), tĩnh hoàn toàn — không cần cài đặt gì, mở là chạy.
Bố cục và phong cách tham khảo từ mcthanhhuyen.com, nội dung và ảnh là **mẫu placeholder** để bạn thay bằng của mình.

## Chạy thử

Cách 1: mở thẳng file `index.html` bằng trình duyệt (double-click).

Cách 2 (khuyến nghị, giống môi trường hosting hơn):

```
cd mcminhtien
python -m http.server 8000
# rồi mở http://localhost:8000
```

## Cấu trúc thư mục

```
mcminhtien/
├── index.html       # Khung trang — thứ tự các section, hiếm khi cần sửa
├── css/style.css    # Toàn bộ giao diện — đổi màu/font ở khối :root đầu file
├── js/data.js       # ★ TOÀN BỘ NỘI DUNG — sửa chữ, thêm/bớt mục ở đây
├── js/main.js       # Logic render + tương tác (menu, gallery, FAQ, counter…)
└── images/          # Ảnh — hiện là SVG placeholder, thay bằng ảnh thật của bạn
```

## Cách sửa nội dung (việc thường làm nhất)

Mở [js/data.js](js/data.js) — mọi thứ hiển thị trên trang đều nằm trong object `SITE_DATA`:

| Muốn sửa | Sửa ở khóa |
|---|---|
| Tên, slogan, SĐT, email, link profile | `brand` |
| Menu | `nav` |
| Lời nhận xét khách hàng | `testimonial` |
| Giới thiệu, số liệu đếm | `about` |
| 8 lĩnh vực hoạt động | `services` |
| 6 chương trình nổi bật | `programs` |
| Ảnh thư viện | `gallery` |
| Video YouTube | `videos` (chỉ cần dán `youtubeId`) |
| Câu hỏi thường gặp | `faq` |
| Logo đối tác | `partners` |
| Khối liên hệ cuối trang | `cta`, `footer` |

Thêm/bớt mục: chỉ cần thêm/xóa phần tử trong mảng tương ứng — giao diện tự dàn lại.

## Cách thay ảnh

Bỏ ảnh thật vào `images/` rồi đổi đường dẫn trong `js/data.js` (hoặc đặt tên trùng
với file placeholder, ví dụ `hero.jpg` thay `hero.svg` — nhớ sửa đuôi file trong data.js).
Kích thước gợi ý:

- `hero` — ảnh ngang lớn, ≥1920×1080
- `about` — ảnh dọc chân dung, ~800×1000
- `service-*` — ảnh dọc 600×750
- `program-*` — ảnh ngang 800×500
- `gallery-*` — ảnh vuông ≥600×600
- `partner-*` — logo nền trong suốt (PNG), cao ~150px

## Cách đổi màu / font

Mở [css/style.css](css/style.css), sửa các biến trong khối `:root` ở đầu file
(ví dụ `--color-gold`, `--color-dark`, `--font-heading`). Đổi 1 chỗ, cả trang đổi theo.

## Lấy ID video YouTube

Với link `https://www.youtube.com/watch?v=ABC123xyz` thì ID là `ABC123xyz`.
Dán vào trường `youtubeId` trong `js/data.js`.
