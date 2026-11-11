# Trạng thái bàn giao — Video AI

Cập nhật theo mốc có ý nghĩa; chỉ ghi điều đã kiểm chứng, không ghi hội thoại, khóa hoặc thông tin đăng nhập. Ngày cập nhật: 2026-11-11.

## Mục tiêu và quy ước

Sản xuất video tài chính dọc bằng Remotion, giữ bộ năm nhân vật, chữ tiếng Việt và quy chuẩn đã duyệt. `AGENTS.md` là điểm vào quy tắc; tài liệu chính ở `Tai_lieu/README.md`. Không dùng HyperFrames hoặc rig mới nếu không được yêu cầu. Nguồn giọng tùy yêu cầu tập; giọng chuẩn ElevenLabs **chưa chốt**.

## Hiện trạng có thể kiểm chứng

- Git đã được khởi tạo tại thư mục gốc trên nhánh `main`. Remote `origin` là `https://github.com/machieu03-mvi/video-ai.git`; GitHub hiển thị repository `machieu03-mvi/video-ai` là Private và trống khi kiểm tra. Dùng `git status` và `git log` để xem commit, tệp đã stage hay thay đổi hiện tại. Danh tính commit cục bộ đã dùng tài khoản GitHub với địa chỉ noreply; Git xác thực dòng lệnh chưa kiểm chứng. Repo lồng `Du_an_Vang/stickman-video` có remote `https://github.com/nispa/stickman-video.git`, commit `c2ede0f707559bf9e3d207c3902d64bf3affe8ae`, và một script kiểm tra ElevenLabs chưa theo dõi. Đây là repo nguồn, không phải repo riêng tư của toàn dự án.
- Một bản sao script kiểm tra ElevenLabs nằm ở `Quy_trinh_video/kiem-tra-elevenlabs.py`; bản trong repo lồng vẫn giữ nguyên. Không có cam kết script lồng sẽ được đồng bộ tự động.
- Tập 3: `Videos/tap-03-ren-luyen-ky-luat/phien-ban-hoat-hoa/README.md`, storyboard và mã `Du_an_Vang/video-remotion/src/tap03-animation-full.tsx`. MP4 bản hình tạm dài 344,6 giây, 52 cảnh, chờ giọng; báo cáo kỹ thuật `phien-ban-hoat-hoa/qa/kiem-tra-mp4.json`. Phải xem phát lại ở tốc độ thực để duyệt chuyển động; chưa xác nhận đã duyệt.
- Đã kết xuất bản Tập 3 trước đó, nhưng MP4 và âm thanh được cố ý loại khỏi Git: bản clone sẽ không tự có các tệp này. Đối chiếu `asset-manifest.json` và README của tập trước khi chọn bản.
- Tệp package và `pnpm-lock.yaml` của Remotion ở `Du_an_Vang/video-remotion/`. Cài lại dependencies trên máy mới; không chuyển `node_modules`, virtualenv hay mô hình cục bộ qua Git.
- Môi trường máy hiện tại quan sát được: Git 2.56.0, Node.js 24.22.1, pnpm 11.25.0 và Python 3.12.10. Đây là thông tin tham khảo, chưa chứng minh cài đặt sạch thành công trên máy khác.

## Việc tiếp theo

1. Đã tạo và kết nối repo GitHub private; chủ dự án cấp quyền cho từng tài khoản khác khi cần. Xác thực Git qua dòng lệnh chưa được kiểm chứng.
2. Rà lại danh sách tệp/secret và chỉ push lần đầu sau khi được phê duyệt riêng, theo `DONG_BO.md`. `git diff --cached --check` đã phát hiện cảnh báo whitespace có sẵn, gồm dòng trống cuối tệp, xuống dòng Markdown và khoảng trắng trong thư viện bên thứ ba; đã rà nhóm cảnh báo nhưng giữ nguyên định dạng gốc. Không tự push, merge hoặc cấp quyền.
3. Nếu tiếp tục video: xem bản Tập 3, sửa theo phản hồi; sau khi người dùng cấp giọng, căn thời gian, phụ đề và kiểm tra toàn bộ. Không tự tạo giọng khi chưa yêu cầu.

## Nhật ký quyết định quan trọng

- 2026-11-11: tách repo nguồn `stickman-video` khỏi repo dự án, ghi commit gốc và phục hồi bằng clone; giữ bản sao script nội bộ bên ngoài repo nguồn. Không xóa hoặc sửa lịch sử repo lồng.
- 2026-11-11: ảnh, font, kịch bản và mã phục vụ dựng giữ trong Git sau khi rà; video, âm thanh và dependency tải bằng kênh riêng. Không coi GitHub là bản sao lưu đầy đủ dữ liệu ngoài Git.
- 2026-11-11: kiểm thử trong repo tạm: quy tắc ignore đối với 7 đường dẫn, giữ 4 đường dẫn cần thiết; quét phát hiện token giả chỉ có trong staging mà không in giá trị. Không có kiểm tra nào bảo đảm phát hiện tất cả bí mật.
- 2026-11-11: kiểm kê thử theo ignore với Git tạm: 572 tệp, khoảng 324,6 MiB, không có tệp từ 90 MiB, không có khớp mẫu khóa trong phạm vi quét. Đây không phải kiểm toán bảo mật và con số có thể thay đổi sau các chỉnh sửa.
- 2026-11-11: người dùng cho phép tạo repo private và thiết lập kết nối, chưa cho phép push lần đầu; đã khởi tạo Git cục bộ, chờ đăng nhập để tạo repo và cấu hình remote.
- 2026-11-11: sau khi người dùng đăng nhập, tạo `machieu03-mvi/video-ai`, xác nhận nhãn Private trên GitHub và đặt `origin` trỏ tới repo này. Chưa tải dữ liệu lên.
- 2026-11-11: đã stage khoảng 572 tệp dự kiến, quét mẫu khóa không báo khớp; rà cảnh báo whitespace như trên và cấu hình danh tính Git cục bộ với email noreply. `pnpm exec tsc --noEmit` thành công. Không xem quét mẫu là chứng minh an toàn.
- 2026-11-11: thêm bản sao giấy phép MIT của repo nguồn cạnh các tệp engine được sao chép trong `Du_an_Vang/video-remotion/src/stickman/LICENSE`.

## Quy tắc cập nhật

Sau mỗi mốc: sửa mục hiện trạng, việc tiếp theo và quyết định mới nếu có; ghi bằng chứng kiểm thử, giới hạn và vị trí tệp. Không ghi việc chưa kiểm chứng là hoàn tất. Khi Git có sẵn, dùng `git status` để biết thay đổi thực tế, không xem tệp này là bằng chứng đã đồng bộ.
