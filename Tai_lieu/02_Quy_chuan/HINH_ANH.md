# Quy chuẩn hình ảnh đã chốt

Ngày chốt: 10/11/2026. Bản được duyệt là **bản ngay trước v4**, video Trương Phi: `Videos/tap-01-giao-dich-tra-thu/ban-truong-phi/out/tap-01-truong-phi-nen-sang-chu-thong-nhat.mp4`. Bản v4 giảm sáng không phải mẫu hiện hành. Đây là duyệt hình ảnh; video vẫn chờ giọng đọc người dùng.

Quy chuẩn này thay thế các thông số nền gradient kem trong tài liệu cũ cho các video làm tiếp, trừ khi người dùng yêu cầu riêng.

## Khung và nền

- Remotion; dọc 9:16, 720×1280, 30 fps; MP4 H.264. Sau khi có bản thu: audio AAC. Thời lượng tùy kịch bản và bản thu, không cố định 55,6 giây.
- Ảnh nền chuẩn: `Quy_trinh_video/assets/nen-giay-chuan.png`. Giữ ảnh gốc; copy vào thư mục public của video khi dùng.
- Phủ kín khung bằng `objectFit: cover`, không kéo méo tỷ lệ. Bộ lọc **chỉ trên ảnh nền**: `brightness(0.995)`. Màu dự phòng `#f5f3ed`.
- Giữ nền sáng và vân giấy nhẹ giống MP4 được duyệt; không tự dùng lại nền gradient, tăng tương phản hoặc giảm sáng theo bản v4.

## Chữ và bảng màu

Font Be Vietnam Pro cục bộ, đầy đủ tiếng Việt, chờ font tải trước render. Các số đo dưới đây dùng trên khung 720×1280.

Kích thước và vị trí hai dòng tên tập, tiêu đề chính được cập nhật theo mẫu `Videos/tap-03-ren-luyen-ky-luat/demo-tieu-de/de-xuat-02.png` người dùng chốt ngày 11/11/2026. Nền, màu và các quy chuẩn còn lại tiếp tục theo bản trước v4.

| Thành phần | Màu | Kiểu / vị trí mẫu |
|---|---|---|
| Tên tập / tên series | `#9b6019` | 24 px, 800, top 82, giữa khung |
| Tiêu đề chính | `#173b50` | 40 px, 900, line-height 1.17, top 128, lề 48 |
| Chữ nhấn phụ | `#8c5b25` | 26–36 px, 900; bố trí theo khoảng trống cảnh |
| Chữ phụ đề | `#ffffff` | 32 px, 800, line-height 1.28, giữa ô |
| Ô phụ đề | `#15344a` | lề ngang 46, bottom 145, padding 18×22, bo góc 22 |
| Đường sàn | `#bfa578` | dày 4 px, y=890 ở bố cục mẫu |
| Nhãn chờ giọng tạm | `#73552d` | 17 px, 800, bottom 92; bỏ khi có audio |
| Biểu đồ tăng / giảm | `#30876e` / `#bf533e` | dùng theo ý nghĩa dữ liệu minh họa |

Tiêu đề chính luôn xanh đậm, không đổi sang đỏ ở cảnh nóng giận. Phụ đề luôn trắng trên ô xanh đậm, không đổi màu theo cảnh hoặc từ khóa. Chữ nhấn phụ giữ nâu vàng. Màu biểu đồ được thay đổi theo diễn biến; không áp dụng màu biểu đồ vào chữ.

## Nhân vật và kiểm tra

Theo `Tai_lieu/02_Quy_chuan/NHAN_VAT.md` và năm ảnh hiện hành trong `Tai_lieu/05_Nhan_vat/`. Giữ chuỗi tư thế diễn xuất phù hợp nội dung; không dùng tay rời. Kiểm tra đúng hai tay, alpha sạch, không nền trắng hoặc bóng oval xanh, chân chạm sàn và không cắt mũ/đạo cụ.

Tọa độ mẫu là bố cục xuất phát, không phải crop bắt buộc cho mọi asset. Đo kích thước và baseline của ảnh mới; bố trí để chữ không che đầu/tay/đạo cụ. Rà mọi tư thế và kiểm tra nền/màu chữ trong MP4 xuất ra, không chỉ ảnh preview. Khi xuất 1080×1920, scale đồng bộ bố cục.

**Tỷ lệ nhân vật giữa các cảnh (chốt 11/11/2026, thay mốc Gia Cát Lượng 450 px):** Giữ **cỡ đầu** đồng nhất giữa các cảnh. Thước đo là viên ngọc trên mũ/khăn/mũ trụ của nhân vật: ở cỡ cảnh toàn thân thông thường, viên ngọc hiển thị đường kính **19 px** trên khung **720×1280**, tức khoảng 2,64% chiều rộng khung, hay **28,5 px** trên khung 1080×1920 được scale đồng bộ. Trong cảnh nhiều người, lấy trung vị các viên ngọc trên mũ của mọi nhân vật trong mọi ô ảnh của cảnh, rồi scale đồng đều cả asset và neo vào điểm sàn.

Chiều cao toàn thân được phép thay đổi theo tư thế (ngồi, đứng, đứng trên bậc) và theo tỷ lệ vẽ của từng ảnh; không ép cả nhóm về một chiều cao chung, vì cách đó làm cỡ đầu nhảy tới 42% giữa hai cảnh. Ví dụ Tập 3: Gia Cát Lượng ở cảnh mở đầu cao khoảng 497 px, không còn 450 px như demo 15 giây. Giới hạn bố cục: nhóm hình rộng tối đa **680 px** và đỉnh nhóm không cao hơn y=290 (cao tối đa **600 px** trên sàn y=890). Cảnh chạm giới hạn được hiển thị nhỏ hơn mốc; ghi rõ trong hồ sơ tập.

Công cụ đo: `Videos/tap-03-ren-luyen-ky-luat/phien-ban-co-giong/tinh-ty-le.py`, đọc thông số `characterScale` trong `visual-profile.json`. Script hiện chỉ tự nhận viên ngọc xanh ngọc của Trương Phi, Quan Vũ và Gia Cát Lượng. Với Lưu Bị (ngọc xanh lục nhạt trên mũ) và Triệu Tử Long (ngọc xanh dương trên mũ trụ; không dùng viên ở thắt lưng), phải mở rộng bộ nhận màu hoặc đo tay trước khi dựng. Nếu ảnh nguồn vẽ hai nhân vật lệch cỡ đầu ngay trong cùng một ô (như cảnh 13 Tập 3), phải sửa ảnh; scale không sửa được.

Trước khi dựng, lập bảng tỷ lệ cho từng nhân vật xuất hiện trong tập theo ảnh tham chiếu hiện hành, tương quan với mốc trên và cùng một cỡ cảnh chuẩn. Lưu số đo theo tỷ lệ khung hình, vị trí chân và tỷ lệ tương đối giữa các nhân vật trong `asset-manifest.json` hoặc hồ sơ tập. Các cảnh cùng cỡ, cùng mặt phẳng và góc máy phải dùng lại các số đo đó; không tự thay đổi chỉ vì mỗi file có kích thước hoặc khoảng trong suốt khác nhau. Trong cảnh nhiều người, giữ tương quan chiều cao đã lập và điểm chạm sàn của từng người.

Chỉ thay đổi kích thước hiển thị có chủ đích khi đổi cỡ cảnh/góc máy hoặc thể hiện khoảng cách, theo storyboard; cùng cảnh vẫn giữ tỷ lệ cơ thể và quan hệ giữa các nhân vật ở cùng mặt phẳng. Chuyển động zoom phải đồng bộ cả cảnh và có điểm neo phù hợp. Không kéo giãn riêng chiều ngang hay dọc, không cắt mũ hoặc đạo cụ để ép bằng chiều cao. Mốc cỡ đầu áp dụng chung cho cả năm nhân vật; chiều cao toàn thân của từng người lấy theo ảnh chuẩn và ghi trong hồ sơ từng tập.

Thông số máy đọc: `Quy_trinh_video/visual-profile.json`.

## Slogan cuối video

Kết mỗi video bằng thẻ riêng **“Hiểu đúng để đi xa hơn”**, mặc định 3 giây. Giữ nền giấy chuẩn; chữ Be Vietnam Pro 900, xanh đậm `#173b50`, 49 px, line-height 1.2, lề 60 px, căn giữa; có thể chia hai dòng sau “Hiểu đúng”. Hiện dần trong 10 frame đầu ở 30 fps rồi giữ đến hết. Không đặt tên tập, phụ đề hoặc nhãn bản tạm trên thẻ. Chỉ hiển thị, không tự tạo giọng đọc. Chi tiết timeline và audio tại mục 12 của `Tai_lieu/01_Quy_trinh/SAN_XUAT_VIDEO.md`.

Khi kèm logo: dùng `Quy_trinh_video/assets/brand/miracle-logo-cach-dieu.png` (ImageGen tích hợp, dựa trên logo người dùng cung cấp; giữ monogram M, mũi tên và tên MIRACLE INVESTMENT). Logo 300×300 px phía trên slogan, cách 38 px; căn giữa cả nhóm. Giữ cảnh nhân vật cuối khoảng 2 giây, mờ đi trong 15 frame, nhóm logo/slogan hiện dần trong 15 frame thay mức 10 frame cũ; không tăng tốc đoạn cuối.


