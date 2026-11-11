# Tập 3 — Bản hoạt họa chờ giọng đọc

Bản dựng dọc 720 × 1280, 30 fps, dài 344,6 giây gồm 52 phân cảnh nội dung và 3 giây kết logo cùng câu “Hiểu đúng để đi xa hơn”. Nội dung và phụ đề sử dụng timeline tạm để dành chỗ đồng bộ bản thu. Không có âm thanh.

- Mã dựng: `Du_an_Vang/video-remotion/src/tap03-animation-full.tsx` và `tap03-animation-data.ts` từ thư mục gốc dự án.
- Tài nguyên: `Du_an_Vang/video-remotion/public/tap03-animation-full/`, cùng bộ khung của bản thử `public/tap03-demo-motion/` và hình nền, logo trong `public/tap03/`.
- Storyboard: `storyboard.json`. Dữ liệu chia khung và căn chân: `qa/asset-metadata.json`. Script chuẩn bị: `prepare.py`.
- Các lệnh tạo hình được ghi trong `prompts.json`; hình được tạo bằng công cụ image_gen tích hợp dựa trên hình tham chiếu của dự án và các cảnh đã có. Các bảng `pair01`, `pair02` kế thừa từ đợt tạo thử trước.
- Bảy bảng khung kiểm tra trong `qa/kiem-tra-trang-*.jpg` cho phép xem lại bố cục ở nhiều thời điểm. Đây là bằng chứng kiểm tra khung tĩnh, không thay thế việc xem phát lại toàn bộ video.

Mỗi cảnh sau đoạn demo dùng một chuỗi tư thế và hình trung gian; các tư thế được chuyển lần lượt, không phải hoạt họa khung liên tục hoặc rig. Mức độ mượt và các chuyển động cần được duyệt bằng cách xem video ở tốc độ bình thường. Không tăng tốc nội dung để chuyển sang slogan.

Khi có giọng đọc, căn lại từng câu và phụ đề theo âm thanh thực tế, điều chỉnh độ dài cảnh theo bản thu, kiểm tra lại giới hạn 10 giây và kiểm tra chuyển động, các bộ phận nhân vật, phần logo và câu kết trước khi xuất bản cuối.
