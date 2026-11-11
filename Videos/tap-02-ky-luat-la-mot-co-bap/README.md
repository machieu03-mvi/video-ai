# Tập 2 — Kỷ luật là một cơ bắp

Bản có giọng: `out/tap-02-giong-elevenlabs.mp4`; giọng **Anh – Warm, Calm and Deep**, Eleven v4, sinh trên giao diện ElevenLabs vì API trả 402: gói miễn phí không dùng được giọng thư viện qua API. Âm thanh gốc: `input/elevenlabs-anh-v4.mp3`, SRT đồng bộ: `src/voice.aligned.srt`; đối chiếu bằng faster-whisper cục bộ đạt 0,976. Chưa xác minh bằng nghe tai; cần người dùng nghe rà cách phát âm. Timeline ban đầu lưu `src/timeline.planned.json`. Slogan hiển thị cuối, không tự tạo giọng slogan.

[Danh mục video](../README.md) · [Tài liệu chung](../../Tai_lieu/README.md)

## Bản hiện hành

[MP4 có logo và slogan, nhịp kết mới](out/tap-02-logo-slogan-nhip-cham.mp4) — **59,7 giây, 720×1280, 30 fps, chờ giọng đọc**. Gia Cát Lượng dẫn chuyện; minh họa Gia Cát Lượng, Trương Phi và Quan Vũ. Giữ tư thế cuối 2 giây sau câu kết, mờ cảnh đi 0,5 giây; logo/slogan hiện dần 0,5 giây, thẻ kết tổng 3 giây. Không tăng tốc đoạn cuối. Slogan chỉ hiển thị, không nằm trong lời đọc/SRT hiện tại.

## Nguồn để sửa

- [SRT thu âm](Tap_02_thu_am.srt) và [lời dẫn](input/loi_dan.txt): thời gian đọc tạm, sẽ căn lại theo WAV/MP3.
- Timeline: `src/timeline.ts`, `src/timeline.json`.
- Entry Remotion từ gốc dự án: `Du_an_Vang/video-remotion/src/tap02.tsx`, composition `Tap02`.
- Bộ ảnh riêng: `Du_an_Vang/video-remotion/public/tap02/`, 20 tư thế sinh bằng ImageGen tích hợp; prompt trong `prompts.json`.
- Áp dụng trực tiếp `Quy_trinh_video/visual-profile.json` đã chốt trước v4: nền giấy sáng, tiêu đề xanh đậm, chữ phụ nâu vàng, phụ đề trắng trên ô xanh.
- Phân cảnh: `storyboard.json`. Mức hoạt họa là chuỗi tư thế với tương tác cầm tạ, trao đồ, đặt tay lên vai, tính bàn tính, viết nhật ký và chỉ biểu đồ; không dùng rig tay rời, lip-sync hoặc HyperFrames.
- QA: TypeScript, đối chiếu nguyên văn 16 cue, 41 khung ở bảy cảnh gồm các mốc chuyển và tư thế ngắn. Kiểm tra tay, nền, mũ, đạo cụ, mặt sàn và phụ đề.

Khi có audio: lưu bản gốc vào input, nhận dạng timestamp, căn lại timeline và nhịp cảnh, giữ giọng người dùng, bỏ nhãn chờ giọng, xuất H.264/AAC và giao SRT đồng bộ.

## Các bản trước để đối chiếu

| Bản | Đặc điểm |
|---|---|
| [Bản hình ban đầu](out/tap-02-ky-luat-ban-hinh.mp4) | 56,7 giây, chưa có slogan/logo |
| [Slogan thử lần đầu](out/tap-02-ky-luat-co-slogan.mp4) | 58 giây, chưa có logo; nhịp kết đã được thay ở bản hiện hành |
