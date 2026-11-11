# Tập 1 — bản Trương Phi

[Danh mục video](../../README.md) · [Tài liệu chung](../../../Tai_lieu/README.md)

## Bản được chốt

[Mở MP4 hiện hành — bản trước v4](out/tap-01-truong-phi-nen-sang-chu-thong-nhat.mp4). 55,6 giây, chờ giọng đọc. Nền vân giấy gốc lưu tại `Du_an_Vang/video-remotion/public/tap01-truongphi/nen-giay.png`.

Bản được người dùng chốt là **bản ngay trước v4**: `out/tap-01-truong-phi-nen-sang-chu-thong-nhat.mp4`. Lớp nền `brightness(0.995)`; tiêu đề chính luôn xanh đậm `#173b50`, chữ nhấn phụ nâu vàng `#8c5b25`; phụ đề luôn trắng `#ffffff` trên ô xanh `#15344a`. Quy chuẩn dùng tiếp: `Quy_trinh_video/QUY_CHUAN_HINH_ANH.md` ở gốc dự án. Đã trả code dựng về đúng cấu hình bản chốt để ghép audio sau; bản v4 chỉ lưu đối chiếu.

Bản minh họa thay nhân vật bằng Trương Phi, giữ lời dẫn và timeline 55,6 giây của bản Gia Cát Lượng. Khung dọc 720×1280, 30 fps, font Be Vietnam Pro. Chưa có giọng đọc; SRT là thời gian dự kiến.

16 tư thế vẽ sẵn bằng ImageGen tích hợp, dựa vào `Tai_lieu/05_Nhan_vat/Truong_Phi_tham_chieu.png`. Không dùng rig tay rời hoặc HyperFrames. Bộ ảnh riêng tại `Du_an_Vang/video-remotion/public/tap01-truongphi/`; bộ prompt trong `prompts.json` ở thư mục này.

Entry: `Du_an_Vang/video-remotion/src/tap01-truongphi.tsx`, composition `Tap01TruongPhi`. Dùng chung nguồn lời dẫn/timeline `Videos/tap-01-giao-dich-tra-thu/src/` để hai phiên bản không lệch nội dung.

Các cảnh: suy nghĩ → phân tích và vào lệnh → bất ngờ khi dừng lỗ → nóng giận → vào lệnh gỡ → thẫn thờ/ôm trán/túi tiền rỗng → nhận ra cảm xúc chi phối. Trương Phi không được nhắc tên trong lời dẫn; vai giọng đọc vẫn theo brief ban đầu, do người dùng cung cấp sau.

Kiểm tra: TypeScript, 28 khung từ bảy cảnh, đủ hai tay trong từng tư thế, nền sạch, không bóng xanh, lông mũ không bị cắt, chân và bàn chạm sàn, chữ tiếng Việt. Tệp QA lưu trong `qa/`.

Lời thu âm tham khảo: [SRT](Tap_01_thu_am.srt). Khi có audio, căn lại timeline dùng chung và nhịp tư thế theo bản thu, xuất video hoàn chỉnh có giọng.

## Các bản trước để đối chiếu

| Bản | Đặc điểm |
|---|---|
| [Ban đầu](out/tap-01-truong-phi-ban-hinh.mp4) | Nền kem cũ |
| [Thử nền giấy](out/tap-01-truong-phi-nen-giay.mp4) | Trước khi thống nhất màu chữ |
| [Nền dịu v4](out/tap-01-truong-phi-nen-diu-v4.mp4) | Bản giảm sáng, không phải mẫu được chốt |

