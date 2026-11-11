# Trạng thái bàn giao — Video AI

Cập nhật theo mốc có ý nghĩa; chỉ ghi điều đã kiểm chứng, không ghi hội thoại, khóa hoặc thông tin đăng nhập. Ngày cập nhật: 2026-11-11.

## Mục tiêu và quy ước

Sản xuất video tài chính dọc bằng Remotion, giữ bộ năm nhân vật, chữ tiếng Việt và quy chuẩn đã duyệt. `AGENTS.md` là điểm vào quy tắc; tài liệu chính ở `Tai_lieu/README.md`. Không dùng HyperFrames hoặc rig mới nếu không được yêu cầu. Nguồn giọng tùy yêu cầu tập; giọng chuẩn ElevenLabs **chưa chốt**.

## Hiện trạng có thể kiểm chứng

- Git đã được khởi tạo tại thư mục gốc trên nhánh `main`. Remote `origin` là `https://github.com/machieu03-mvi/video-ai.git`; GitHub hiển thị repository là Private. Commit đầu `5541c55` đã được push và đối chiếu khớp với `origin/main` vào 11/11/2026. Dùng `git status` và `git log` để xem thay đổi và trạng thái đồng bộ hiện tại. Repo lồng `Du_an_Vang/stickman-video` có remote `https://github.com/nispa/stickman-video.git`, commit `c2ede0f707559bf9e3d207c3902d64bf3affe8ae`, và một script kiểm tra ElevenLabs chưa theo dõi. Đây là repo nguồn, không phải repo riêng tư của toàn dự án.
- Một bản sao script kiểm tra ElevenLabs nằm ở `Quy_trinh_video/kiem-tra-elevenlabs.py`; bản trong repo lồng vẫn giữ nguyên. Không có cam kết script lồng sẽ được đồng bộ tự động.
- Tập 3: bản mới có giọng thử ElevenLabs tại `Videos/tap-03-ren-luyen-ky-luat/phien-ban-co-giong/README.md`, MP4 `phien-ban-co-giong/out/tap-03-co-giong-elevenlabs.mp4`, SRT `phien-ban-co-giong/src/voice.aligned.srt`; 271,4 giây, 52 cảnh, dài nhất 7,47 giây. ASR khớp 0,989; MP4 có âm thanh và đã kiểm tra 51 điểm chuyển bằng số liệu. Cần nghe rà phát âm và xem phát lại để đánh giá chuyển động; chưa xác nhận đã làm các bước này. Bản hình tạm trước đó giữ tại `phien-ban-hoat-hoa/`.
- Kích thước hai dòng tiêu đề theo `Videos/tap-03-ren-luyen-ky-luat/demo-tieu-de/de-xuat-02.png` đã được người dùng chốt trong quy trình và `Quy_trinh_video/visual-profile.json`; video Tập 3 hiện có chưa được xuất lại với thông số này.
- Demo 15 giây về tỷ lệ và chuyển cảnh: `Videos/tap-03-ren-luyen-ky-luat/demo-15s-ty-le/README.md`; MP4 nằm trong `demo-15s-ty-le/out/` và bị loại khỏi Git. Người dùng đã thống nhất cách làm; nguyên tắc tỷ lệ và chuyển cảnh đã áp dụng cho bản Tập 3 có giọng. Bản toàn tập có ảnh riêng thay thế chỗ trùng với cảnh ba của demo. Vẫn cần xem phát thực tế khi kiểm tra từng video.
- Đã kết xuất bản Tập 3 trước đó, nhưng MP4 và âm thanh được cố ý loại khỏi Git: bản clone sẽ không tự có các tệp này. Đối chiếu `asset-manifest.json` và README của tập trước khi chọn bản.
- Tệp package và `pnpm-lock.yaml` của Remotion ở `Du_an_Vang/video-remotion/`. Cài lại dependencies trên máy mới; không chuyển `node_modules`, virtualenv hay mô hình cục bộ qua Git.
- Môi trường máy hiện tại quan sát được: Git 2.56.0, Node.js 24.22.1, pnpm 11.25.0 và Python 3.12.10. Đây là thông tin tham khảo, chưa chứng minh cài đặt sạch thành công trên máy khác.

## Việc tiếp theo

1. Repo GitHub private đã nhận commit đầu; chủ dự án cấp quyền cho từng tài khoản khác khi cần. Đồng bộ các thay đổi tiếp theo theo `DONG_BO.md` và quy định được người dùng cho phép.
2. Lần dựng tiếp theo lập bảng tỷ lệ theo cỡ cảnh và rà chuyển cảnh theo quy chuẩn ngày 11/11/2026: Gia Cát Lượng 450 px trên khung 720×1280 cho cảnh toàn thân thông thường, mờ 4 frame ra/4 frame vào ở 30 fps. Chiều cao riêng của bốn nhân vật còn lại chưa chốt; ghi theo ảnh chuẩn trong hồ sơ từng tập. Các tệp cần được commit/push trước khi máy khác nhận được cập nhật mới.
3. Nếu tiếp tục video: nghe và xem bản Tập 3 có giọng thử, rà phát âm, chuyển động và tỷ lệ từng cảnh; sửa theo phản hồi. Giọng Anh chưa được chốt làm giọng chuẩn cho series.

## Nhật ký quyết định quan trọng

- 2026-11-11: tách repo nguồn `stickman-video` khỏi repo dự án, ghi commit gốc và phục hồi bằng clone; giữ bản sao script nội bộ bên ngoài repo nguồn. Không xóa hoặc sửa lịch sử repo lồng.
- 2026-11-11: ảnh, font, kịch bản và mã phục vụ dựng giữ trong Git sau khi rà; video, âm thanh và dependency tải bằng kênh riêng. Không coi GitHub là bản sao lưu đầy đủ dữ liệu ngoài Git.
- 2026-11-11: kiểm thử trong repo tạm: quy tắc ignore đối với 7 đường dẫn, giữ 4 đường dẫn cần thiết; quét phát hiện token giả chỉ có trong staging mà không in giá trị. Không có kiểm tra nào bảo đảm phát hiện tất cả bí mật.
- 2026-11-11: kiểm kê thử theo ignore với Git tạm: 572 tệp, khoảng 324,6 MiB, không có tệp từ 90 MiB, không có khớp mẫu khóa trong phạm vi quét. Đây không phải kiểm toán bảo mật và con số có thể thay đổi sau các chỉnh sửa.
- 2026-11-11: người dùng cho phép tạo repo private và thiết lập kết nối, chưa cho phép push lần đầu; đã khởi tạo Git cục bộ, chờ đăng nhập để tạo repo và cấu hình remote.
- 2026-11-11: sau khi người dùng đăng nhập, tạo `machieu03-mvi/video-ai`, xác nhận nhãn Private trên GitHub và đặt `origin` trỏ tới repo này. Chưa tải dữ liệu lên.
- 2026-11-11: đã stage khoảng 572 tệp dự kiến, quét mẫu khóa không báo khớp; rà cảnh báo whitespace như trên và cấu hình danh tính Git cục bộ với email noreply. `pnpm exec tsc --noEmit` thành công. Không xem quét mẫu là chứng minh an toàn.
- 2026-11-11: thêm bản sao giấy phép MIT của repo nguồn cạnh các tệp engine được sao chép trong `Du_an_Vang/video-remotion/src/stickman/LICENSE`.
- 2026-11-11: cập nhật quy trình giữ tỷ lệ nhân vật giữa các cảnh và kiểm tra chuyển cảnh mượt; không thay đổi video hoặc tự đặt số đo chưa được phê duyệt.
- 2026-11-11: dựng demo 15 giây không tiếng theo mốc Tập 3; neo chiều cao Gia Cát Lượng 450 px ở ba cảnh, chuyển hình mờ ra/vào không chồng nhân vật; xác minh MP4 450 frame, 720×1280, 30 fps, không audio và rà khung tĩnh. Chưa đánh giá phát thực tế.
- 2026-11-11: người dùng thống nhất cách làm demo 15 giây; cập nhật mốc tỷ lệ Gia Cát Lượng và thời gian chuyển giữa cảnh vào quy trình. Chưa thay bản toàn tập hoặc tự coi chiều cao của bốn nhân vật khác đã được chốt.
- 2026-11-11: theo yêu cầu, tạo giọng Anh Eleven v4 trên giao diện ElevenLabs, căn 96 cue và 52 cảnh, bổ sung asset riêng cảnh 10, xuất MP4 có giọng; kiểm tra đầu/cuối và 51 điểm chuyển. Chưa nghe kiểm tra phát âm hoặc xác nhận chuyển động mượt ở tốc độ thực.
- 2026-11-11: thay asset cảnh 5–6 bằng hình gọn hơn để cải thiện tỷ lệ nhân vật; đã xuất lại MP4 và kiểm tra 52 cảnh, 51 mốc chuyển bằng số liệu, audio có tín hiệu ở đầu và cuối, cùng ảnh hai cảnh trích từ chính MP4. Chưa nghe hoặc xem toàn bộ ở tốc độ thực.
- 2026-11-11: người dùng chốt mẫu tiêu đề số 2: tên tập 24 px/800/top 82 và tiêu đề chính 40 px/900/top 128/lề 48 trên khung 720×1280; đã cập nhật quy trình và cấu hình, chưa xuất lại video.
- 2026-11-11: chuẩn bị bàn giao thông số tiêu đề theo yêu cầu; đã fetch và thấy nhánh cục bộ trùng nhánh remote trước commit, kiểm tra TypeScript và định dạng thay đổi thành công. Xem `git status` và `git log` để xác định trạng thái đồng bộ thực tế.
- 2026-11-11: chuẩn bị bàn giao theo yêu cầu; đã fetch và kiểm tra nhánh gốc cùng remote trước khi commit, TypeScript đạt và kiểm tra lại MP4 271,4 giây, 52 cảnh, 51 mốc chuyển, audio đầu/cuối có tín hiệu. Dùng `git status` và lịch sử remote để xác nhận đồng bộ thực tế.

## Quy tắc cập nhật

Sau mỗi mốc: sửa mục hiện trạng, việc tiếp theo và quyết định mới nếu có; ghi bằng chứng kiểm thử, giới hạn và vị trí tệp. Không ghi việc chưa kiểm chứng là hoàn tất. Khi Git có sẵn, dùng `git status` để biết thay đổi thực tế, không xem tệp này là bằng chứng đã đồng bộ.
