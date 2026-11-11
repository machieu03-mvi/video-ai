# Kết nối ElevenLabs — kiểm tra trước khi chọn giọng

**Trạng thái:** Đã xác thực kết nối ngày 10/11/2026 với khóa giới hạn quyền User và Text to Speech. Tập 2 đã tạo giọng thử qua giao diện ElevenLabs; giọng thư viện qua API trên tài khoản miễn phí trả HTTP 402. Giọng thử chưa được chốt cho cả series. Xem mục 9A trong `Tai_lieu/01_Quy_trinh/SAN_XUAT_VIDEO.md` để tạo và đồng bộ audio.

Giai đoạn này chỉ kiểm tra API key; chưa chọn giọng, chưa chuyển kịch bản thành âm thanh và chưa đổi video. Script dùng thư viện chuẩn Python, không cần cài SDK.

1. Đăng nhập ElevenLabs, tạo API key trong cài đặt tài khoản và cấp quyền đọc thông tin người dùng nếu dùng key giới hạn quyền. Không gửi key trong chat hoặc lưu trong repo.
2. Trên Windows mở **Edit environment variables for your account** → **New…**. Đặt tên `ELEVENLABS_API_KEY` và dán key vào ô giá trị; lưu lại rồi mở lại Codex để tiến trình nhận biến mới.
3. Tại thư mục gốc dự án, chạy `python Quy_trinh_video/kiem-tra-elevenlabs.py` hoặc nhờ Codex kiểm tra sau khi đã khởi động lại. Script chỉ in kết quả, không in key hay thông tin tài khoản.
4. Thông báo thành công nghĩa là endpoint thông tin tài khoản xác thực được key; chưa khẳng định key có quyền tạo giọng TTS. Nếu nhận HTTP 401/403, kiểm tra key và quyền đọc User. Nếu không kết nối được, kiểm tra mạng.

Tài liệu ElevenLabs: [xác thực API](https://elevenlabs.io/docs/api-reference/authentication), [thông tin user](https://elevenlabs.io/docs/api-reference/user/get).

Bước kiểm tra kết nối không tạo giọng hoặc tính phí TTS. Tạo âm thanh và đồng bộ timeline được thực hiện theo mục 9A của quy trình sản xuất.

Sau khi người dùng nâng cấp ElevenLabs, sẽ thử và chốt một giọng chuẩn phù hợp. Lưu tên giọng, Voice ID, model và thông số sau khi được duyệt để dùng nhất quán cho các video tiếp theo. Giọng Anh ở Tập 2 hiện chỉ là bản thử.
