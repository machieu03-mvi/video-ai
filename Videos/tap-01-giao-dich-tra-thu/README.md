# Tập 1 — Giao dịch trả thù

Bản hình dọc 720×1280, 30 fps, 55,6 giây. Chờ giọng đọc người dùng; thời gian SRT hiện là dự kiến và sẽ được đồng bộ lại theo bản thu.

Gia Cát Lượng là nhân vật minh họa chính theo yêu cầu cuối trong brief. Giữ nguyên lời dẫn, không nhắc tên nhân vật. Dùng ảnh chuẩn trong `Tai_lieu/05_Nhan_vat/Gia_Cat_Luong_tham_chieu.png` làm tham chiếu.

## Các cảnh

1. Gợi mở: quan sát biểu đồ, suy nghĩ.
2. Lệnh đẹp: đọc phân tích, thao tác chuột, tự tin.
3. Quét dừng lỗ: biểu đồ đảo chiều, giật mình và thất vọng.
4. Cảm xúc: đỏ mặt, siết tay, tức giận.
5. Trả thù: bấm chuột và chỉ biểu đồ; nhấn mạnh tăng khối lượng, bỏ dừng lỗ.
6. Hậu quả: thẫn thờ, ôm trán, nhìn túi tiền rỗng.
7. Kết luận: cầm quạt, giải thích khái niệm giao dịch trả thù.

## Tệp và cách tiếp tục

- `input/loi_dan.txt`: lời thu âm.
- `Tap_01_thu_am.srt`: phụ đề dự kiến để thu âm.
- `src/timeline.ts` và `src/timeline.json`: các câu và mốc thời gian.
- `out/tap-01-ban-hinh.mp4`: bản xem thử chưa có âm thanh.
- `qa/`: 28 khung hình kiểm tra tư thế, nền, bố cục và phụ đề.
- Entry Remotion: `Du_an_Vang/video-remotion/src/tap01.tsx` tính từ gốc dự án.
- Asset riêng: `Du_an_Vang/video-remotion/public/tap01/`.

Dựng bằng Remotion hiện có; chưa dùng HyperFrames hoặc rig tay rời. Khi có WAV/MP3, đo thời lượng bản thu, căn lại từng câu, điều chỉnh nhịp cảnh và xuất bản hoàn chỉnh; không tự tạo giọng đọc.

