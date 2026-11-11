# Nhân vật cho video

## Bàn giao và duy trì ngữ cảnh

Khi bắt đầu công việc, đọc `Quan_ly_du_an/TRANG_THAI.md` và phần tài liệu liên quan; kiểm tra trạng thái Git bằng `python Quan_ly_du_an/kiem_tra.py` (macOS/Linux: `python3`) nếu Git đã được khởi tạo. Cập nhật trạng thái ngắn gọn sau mỗi mốc quan trọng, nêu việc đã xác minh, kiểm thử, lỗi và bước tiếp theo; ghi quyết định kỹ thuật quan trọng tại đó, không ghi bí mật hay toàn bộ hội thoại. Khi cần bàn giao, làm theo `Quan_ly_du_an/DONG_BO.md`. Không giả định lịch sử chat hoặc thay đổi chưa push được chuyển sang tài khoản khác. Không tự force push, ghi đè thay đổi, tạo repo, push lần đầu hay merge khi chưa được phép.

Chỉ mục tài liệu: `Tai_lieu/README.md`. Quy trình hiện hành: đọc `Tai_lieu/01_Quy_trinh/SAN_XUAT_VIDEO.md` khi nhận kịch bản mới hoặc sửa video. Skill dự án: `.agents/skills/video-tai-chinh/SKILL.md`. Các mẫu thao tác ở `Tai_lieu/03_Bieu_mau/`. Nền, màu chữ và đoạn kết theo `Tai_lieu/02_Quy_chuan/HINH_ANH.md` và `Quy_trinh_video/visual-profile.json`. Kế thừa quy ước đã chốt trong các tài liệu này để người dùng không phải nhắc lại. Các tệp hướng dẫn cũ tại gốc chỉ dẫn tới nguồn chính, cần đọc tiếp tệp đích.

Công cụ dựng chính là Remotion. Người dùng quyết định tạm thời chưa áp dụng HyperFrames; thư mục `Demo_HyperFrames` chỉ là thử nghiệm tham khảo. Chỉ đưa HyperFrames vào video mới khi người dùng yêu cầu lại.

Người dùng quyết định tạm thời bỏ qua việc thêm chuyển động bằng rig cắt lớp và giữ kiểu chuyển động như video đã duyệt. Dùng chuỗi tư thế, tương tác và đạo cụ theo quy trình hiện có; chỉ tiếp tục phát triển hoặc áp dụng rig mới khi người dùng yêu cầu lại.

Khi tạo hình nhân vật hoặc video trong dự án này, đọc `Tai_lieu/02_Quy_chuan/NHAN_VAT.md` và dùng năm ảnh `*_tham_chieu.png` ở `Tai_lieu/05_Nhan_vat/` làm tham chiếu tạo hình hiện hành.

Đọc hồ sơ nhân vật tương ứng trong `Tai_lieu/08_Dac_ta_nhan_vat/` để dựng tính cách và tương tác nhất quán; phân biệt mô tả đã chốt với đề xuất chờ duyệt, ưu tiên kịch bản và yêu cầu mới của người dùng.

- `Truong_Phi_tham_chieu.png`
- `Quan_Van_Truong_tham_chieu.png`
- `Gia_Cat_Luong_tham_chieu.png`
- `Luu_Bi_tham_chieu.png`
- `Trieu_Tu_Long_tham_chieu.png`

Giữ diện mạo, màu sắc và trang phục theo các ảnh chuẩn; kiểm tra mỗi người đúng hai tay, không có bóng oval xanh dưới chân, không nền trắng trong asset tách nền, không cắt mũ/đạo cụ, chân chạm mặt đất. Khi làm hoạt họa, cần tư thế và tương tác phù hợp kịch bản, không chỉ lia ảnh và chạy phụ đề. Khung hình mặc định dọc 9:16 cho Shorts/TikTok, dùng font Be Vietnam Pro đầy đủ tiếng Việt.

Nguồn giọng theo yêu cầu từng video: người dùng gửi bản thu hoặc yêu cầu tạo giọng ElevenLabs. Quy trình ElevenLabs và đồng bộ tại mục 9A của `Tai_lieu/01_Quy_trinh/SAN_XUAT_VIDEO.md`; khóa nằm trong biến môi trường, không đưa vào chat/repo. Giọng Tập 2 là bản thử, không mặc định chốt cho cả series. Dựng timeline linh hoạt theo bản thu thực tế.

Sau khi người dùng nâng cấp ElevenLabs, thử và để người dùng chốt một giọng chuẩn phù hợp; lưu Voice ID, model và thông số trong `Tai_lieu/07_Giong_doc/THONG_SO_GIONG_CHUAN.md` để dùng nhất quán cho các tập sau, trừ khi có yêu cầu khác.

