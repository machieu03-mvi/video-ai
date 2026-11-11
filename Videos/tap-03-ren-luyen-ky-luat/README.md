# Tập 3 — Rèn luyện kỷ luật và kiểm soát cảm xúc

**Bản mới nhất có giọng thử, chờ rà:** `phien-ban-co-giong/out/tap-03-co-giong-elevenlabs.mp4`, SRT `phien-ban-co-giong/src/voice.aligned.srt`. Chi tiết tại `phien-ban-co-giong/README.md`. Bản hoạt họa chưa giọng trước đó lưu tại `phien-ban-hoat-hoa/out/tap-03-hoat-hoa-cho-giong.mp4`. Các mục v3 bên dưới mô tả bản trước, được giữ lại để tham khảo.

Trạng thái hiện hành: đã tạo bản đọc ElevenLabs và căn phụ đề; cần nghe rà phát âm và xem chuyển động ở tốc độ thực. Gia Cát Lượng dẫn chuyện, Trương Phi và Quan Vũ minh họa; giọng thử chưa được chốt cho cả series.

- Kịch bản gốc: `input/kich_ban_goc.txt`; lời dẫn: `input/loi_dan.txt`.
- SRT dự kiến: `Tap_03_thu_am.srt`; timeline: `src/timeline.json`.
- Mã dựng bản v3 từ gốc dự án: `Du_an_Vang/video-remotion/src/tap03-v3.tsx`; tài nguyên `public/tap03/`.
- Video bản hình v3: `out/tap-03-da-dang-phan-canh.mp4`; các bản trước: `out/tap-03-nhip-canh-moi.mp4` và `out/tap-03-ban-hinh.mp4`.
- 16 nhóm nội dung được chia thành 52 phân cảnh hình; cảnh dài nhất 9,3 giây trong timeline tạm. Bản v3 thay 32 cảnh so với bản trước, dùng 52 mã tư thế khác nhau. Chi tiết tại `storyboard-v3.json`, `qa/kiem-ke-canh-v3.json`, `qa/kiem-tra-mp4-v3.json`; đây là chuỗi tư thế, không phải rig liên tục.
- Các tư thế mới và chỉ dẫn tạo hình lưu trong `qa/bo-sung-tu-the-v3.md`. Sau khi đồng bộ giọng phải cập nhật mốc của storyboard v3 theo bản thu, kiểm tra lại cảnh không quá 10 giây và không lặp; script `prepare-v3.py` hiện dùng mốc tạm của storyboard cũ, không tự căn giọng.
- Thở hình hộp minh họa theo lời dẫn; không thay thế chỉ dẫn y tế. Ví dụ dừng sau hai lệnh thua là ví dụ kịch bản, giới hạn tùy kế hoạch từng người.
- Sau khi có giọng đọc: căn timeline, giữ âm cuối, tái kiểm tra phụ đề và xuất MP4 H.264/AAC; không tự tạo giọng ở giai đoạn này.
