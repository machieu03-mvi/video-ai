# Demo 15 giây — tỷ lệ và chuyển cảnh

Bản thử độc lập của 15 giây đầu Tập 3, chưa có giọng. Dùng lời dẫn và mốc phụ đề tạm của tập; đoạn thử kết thúc giữa cue tiếp theo vì giới hạn đúng 15 giây. Bản video hoàn chỉnh không bị thay thế.

- Composition: `Du_an_Vang/video-remotion/src/tap03-demo-ty-le-chuyen-canh.tsx`, 720×1280, 30 fps, 450 frame.
- Giữ cỡ Gia Cát Lượng khoảng 450 px từ đỉnh mũ đến chân trên khung 720×1280 trong ba cảnh, dùng chiều cao đo tại ảnh gốc lần lượt 445, 388 và 405 px. Ngày 11/11/2026 người dùng thống nhất cách làm demo; mốc này được đưa vào quy chuẩn cho cỡ cảnh toàn thân thông thường. Cũng trong ngày 11/11/2026, mốc 450 px được thay bằng mốc cỡ đầu (viên ngọc trên mũ 19 px) theo `Tai_lieu/02_Quy_chuan/HINH_ANH.md`; demo này giữ nguyên làm tư liệu, phần chuyển cảnh vẫn áp dụng. Tỷ lệ và nền của từng ảnh được scale đồng đều, không kéo méo.
- Cảnh ba thử tư thế cầm bảng kiểm từ `public/tap03-animation-full/pair05.png` và khung trung gian cùng cảnh; ảnh này cũng đã được dùng ở nơi khác trong bản video cũ, chỉ dùng để thử tỷ lệ ở đoạn demo này. Kiểm tra và tạo hình riêng nếu áp dụng vào toàn bộ video theo quy trình chống lặp.
- Điểm đổi cảnh: frame 257 và 336 của timeline cũ. Phần hình mờ ra trong 4 frame rồi mờ vào trong 4 frame; nền, phụ đề và thời lượng giữ nguyên, không chồng hai nhân vật. Không áp dụng thẻ kết thương hiệu cho trích đoạn giữa video.
- `qa/kiem-tra.json` ghi kiểm tra MP4 và giới hạn; `qa/canh-1.png` đến `canh-3.png` là ảnh kiểm tra tĩnh. Người dùng đã thống nhất thay đổi; hệ thống chưa trực tiếp xác nhận phát lại toàn bộ ở tốc độ thực, vẫn phải kiểm tra theo từng video.
