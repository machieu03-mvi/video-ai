---
name: video-tai-chinh
description: Dựng hoặc sửa video tài chính Shorts/TikTok trong dự án Video AI theo bộ năm nhân vật và phong cách đã duyệt, từ kịch bản đến MP4 có giọng đọc người dùng và SRT đồng bộ.
---

# Video tài chính nhất quán

Tại thư mục gốc dự án (ba cấp trên thư mục skill), đọc `QUY_TRINH_SAN_XUAT_VIDEO.md` cho phần việc đang thực hiện và `QUY_CHUAN_NHAN_VAT.md` trước khi tạo hình. Dùng năm ảnh `*_tham_chieu.png` hiện hành, gồm Triệu Tử Long bản đã đồng bộ. Mẫu brief, storyboard và prompt asset nằm trong `Quy_trinh_video/` tại gốc.

- Tạo thư mục riêng cho kịch bản mới; kế thừa phong cách đã chốt. Lưu bản lời dẫn và timeline riêng, không ghi đè video vàng.
- Mặc định một người dẫn, video dọc 9:16, Be Vietnam Pro cục bộ. Người dùng gửi giọng đọc sau; không tự tạo giọng hoặc kết nối ElevenLabs.
- Đầu tư hành động/đạo cụ/góc nhìn theo từng ý, có tương tác giữa nhân vật. Không chỉ lia ảnh và chạy chữ. Phân biệt chuỗi pose hiện hành với rig/lip-sync liên tục.
- Kiểm tra đúng hai tay, tay hợp với trang phục, alpha sạch, không bóng oval xanh, chân chạm sàn, không cắt mũ/đạo cụ. Rà mọi tư thế của cảnh trước render dài.
- Dùng Remotion và công cụ repo ở `Du_an_Vang/stickman-video`. Code video vàng chứa mapping cue và tên ảnh riêng: phải lập mapping cho kịch bản mới, không chép nguyên chỉ số.
- Trước audio, giao SRT tạm khớp lời dẫn. Sau audio, lấy timestamp, căn lại timeline và sự kiện, giữ nguyên giọng người dùng. Kiểm tra đoạn đầu/kết, phụ đề, stream audio và hình trong MP4.
- Giao MP4 và SRT đồng bộ; không tự đăng video. Nêu đúng những kiểm tra đã làm và giới hạn còn lại.
