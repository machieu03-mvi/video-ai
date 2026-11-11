# Demo HyperFrames + Remotion

Thử nghiệm 12 giây từ cảnh Gia Cát Lượng trao vàng cho Trương Phi, giữ bộ asset đã duyệt.

- HyperFrames 0.9.26 dựng `index.html`, GSAP 3.15.1 điều khiển timeline và camera/đạo cụ, xuất `out/hyperframes-scene.mp4` (720×1280, 30 fps).
- Remotion 4.0.541 nhập video qua `src/demo-hyperframes.tsx`, thêm đoạn giọng gốc bắt đầu ở 38,9 giây và phụ đề theo timeline đã căn. Bản ghép: `../Du_an_Vang/video-remotion/out/demo-hyperframes-remotion.mp4`.
- `out/remotion-reference.mp4` là đúng đoạn 12 giây từ video Remotion trước để so sánh.
- Nhân vật vẫn dùng bốn tư thế vẽ sẵn; demo chưa có rig xương hay khung trung gian. Các chuyển động camera, tiêu đề, biểu tượng vàng/ngân hàng được dựng mới. Không coi kết quả này là bằng chứng HyperFrames tự tạo ra chuyển động tay liên tục.
- Không thay đổi quy trình chính; đây là thư mục thử nghiệm riêng. Các phiên bản thư viện được ghi trong package.json và pnpm-lock.yaml.

Render HyperFrames cần `HYPERFRAMES_FFMPEG_PATH` trỏ đến `node_modules/ffmpeg-static/ffmpeg.exe`, `HYPERFRAMES_FFPROBE_PATH` từ `require('ffprobe-static').path`, `DO_NOT_TRACK=1`; chạy `hyperframes render . --output out/hyperframes-scene.mp4 --fps 30 --workers 2`.
