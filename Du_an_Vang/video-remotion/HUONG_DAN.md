# Video dọc: Bản chất của vàng

Đây là bản dựng hình tạm theo kịch bản một người dẫn. Nguồn engine và công cụ timeline lấy từ repo `../stickman-video` (MIT); engine được chép vào `src/stickman`. Bản hiện tại là ảnh minh họa có chuyển động camera, chữ và hiệu ứng của engine, chưa phải hoạt hình cử động từng khớp. Bốn tranh được tạo bằng công cụ tạo ảnh tích hợp từ ảnh tham chiếu người dùng; đặc điểm có thể khác bản gốc.

`src/vang/timeline.json`, `timeline.ts` và `voiceover.srt` do `parse_input.py` của repo tạo. Thời gian được ước lượng 3,8 từ tách theo khoảng trắng mỗi giây; với tiếng Việt đây chỉ là giả định sơ bộ, không đảm bảo tốc độ đọc thực tế. Bản MP4 hiện im lặng. `src/video.tsx` lấy nội dung và điểm chuyển cảnh từ timeline để có thể căn lại.

Khi nhận bản thu, lưu file âm thanh trong `public`, dùng `scripts/align_voice.py` của repo với `--lang vi`, rà lại transcript và timing, rồi render lại với prop `voice` là tên file. Công cụ này cần faster-whisper và các phụ thuộc liên quan; chưa cài hoặc thử với giọng thực tế. Sau khi căn cần kiểm tra và điều chỉnh lại những điểm cắt hoặc câu phụ đề chưa khớp. Tùy chọn ElevenLabs chưa được tích hợp.

Tranh trong `public` được tạo bằng công cụ imagegen tích hợp từ ảnh người dùng với các mô tả: Trương Phi xem biểu đồ vàng trong đại sảnh; Gia Cát Lượng bên kho vàng và biểu tượng ngân hàng; lịch sử tiền vàng đến dự trữ hiện đại; kho vàng ngân hàng với biểu tượng đa dạng hóa. Không dùng biểu đồ làm dữ liệu giá thực tế.

## Bản hoạt họa 2D

Composition `VangChuyenDong` sử dụng `src/chuyen-dong.tsx` và bốn hình nhân vật PNG tách nền (`public/puppet-*.png`) do công cụ tạo ảnh tích hợp tạo dựa trên các bảng nhân vật được cung cấp. Lời nhắc yêu cầu từng nhân vật đứng chính diện, giữ đặc điểm trang phục và diện mạo, nền trong suốt, không cầm đạo cụ. Các nhân vật đi vào cảnh, nghiêng người và chỉ vào biểu đồ, thỏi vàng, ngân hàng và các biểu tượng bằng cánh tay đồ họa riêng. Biểu đồ và đạo cụ dùng các thành phần SVG, trong đó có đạo cụ từ engine của repo.

Đây là hoạt họa 2D đơn giản: phần thân là hình phẳng, chưa có rig tách khớp toàn thân hay diễn xuất khuôn mặt. Thời điểm cảnh, nhân vật và phụ đề tham chiếu các mốc trong timeline; cần thử lại sau khi căn theo giọng đọc thật.

## Bản tương tác sửa tay

Composition `VangTuongTac` / `src/tuong-tac.tsx` dùng ba dải bốn tư thế do imagegen tích hợp tạo từ bảng nhân vật. Mỗi dải thể hiện hai nhân vật cùng hành động; không dùng cánh tay SVG ghép lên người. Các cảnh dùng tư thế ba phần tư, biểu cảm và cảnh hai người, kèm chín điểm đổi bố cục bám timeline. Các dải được tạo với yêu cầu giữ diện mạo/trang phục, bốn khung bằng nhau, cùng tỉ lệ/camera, tay giải phẫu hợp lý. Ba hành động: Trương Phi khoe vàng và Quan Vân Trường phản ứng; Gia Cát Lượng trao vàng cho Trương Phi; Lưu Bị mở tài liệu và Gia Cát Lượng chỉ quạt. File `public/duo-*.png`.

Đây vẫn là bản chuyển tư thế, chưa phải chuyển động liên tục bằng rig xương; nét và tỷ lệ có thể lệch nhẹ giữa các khung do ảnh sinh. Không mô tả bản này như hoạt họa hoàn chỉnh mượt mà. Cần thêm khung trung gian hoặc rig nhân vật để đạt mức đó.

## Bổ sung hành động và font tiếng Việt

Bản v3 dùng chín chuỗi hành động riêng thay cho việc tái dùng ba dải: xem giá trên thiết bị, đếm vàng, đặt câu hỏi, trao vàng, mở rương và xem tiền vàng cổ, cân vàng với tiền giấy, mở kho dự trữ, phân loại tài sản và cùng xem tài liệu. Sáu dải mới `public/action-*.png` được tạo bằng imagegen tích hợp từ cùng bảng nhân vật, theo yêu cầu bốn tư thế liên tiếp của từng hành động, giữ tay và trang phục đồng nhất, hai nhân vật tương tác. Mỗi dải được phát theo tiến độ cảnh thay vì lặp lại một chu kỳ cố định.

Font `Be Vietnam Pro` tải từ kho `google/fonts/ofl/bevietnampro` chính thức, gồm ExtraBold 800 và Black 900, kèm giấy phép OFL tại `public/fonts`. `src/fonts.ts` tải file cục bộ và chờ font sẵn sàng trước khi render. Tiêu đề dùng 900, phụ đề 800. Đã tăng khoảng cách dòng để bảo vệ dấu tiếng Việt; font không phụ thuộc font cài trên máy hoặc tải CDN trong lúc xuất.

## Sửa lỗi hình ảnh v4

Ảnh sửa được lưu thành file mới `action-price-fixed.png`, `action-count-fixed.png`, `duo-gia-truong-fixed.png`; bản cũ được giữ lại. Imagegen tích hợp được dùng để bỏ giáo và tay thừa của Trương Phi trong toàn bộ bốn tư thế xem giá, và tách nền trắng ở cảnh đếm/trao vàng. Khi hiển thị, bộ lọc alpha loại phần viền nền mờ còn sót.

`measure-ground.py` chỉ đo vị trí chân tối màu trong ảnh, không sửa ảnh nguồn; ghi kết quả cho từng tư thế vào `src/ground.ts`. Bố cục neo vào đường đất y=885 và giữ điểm này khi phóng cận. Các đạo cụ có thể kéo dài xuống dưới chân như ở cảnh bàn tài sản. Đã xem ảnh kiểm tra của tất cả 36 tư thế tại `out/qa-v4`, ba contact sheet `sheet-0.png` đến `sheet-2.png`. Ô phụ đề không được hiển thị khi câu đang nghỉ. Video sửa xuất tại `out/vang-hoan-thien-v4.mp4`.

## Sửa vùng cắt đoạn kết v5

Đoạn kết dùng ảnh có khoảng cách từ chân đến đỉnh mũ lớn hơn vùng cắt chung, nên đỉnh mũ bị cắt. Đã tăng khoảng nhìn phía trên riêng cho cảnh này, giữ chân neo tại y=885 và bỏ hiệu ứng Burst ở đoạn kết. Đã xem cả bốn tư thế kết trong `out/qa-v5-ending/sheet.png`. Bản xuất mới: `out/vang-sua-doan-ket-v5.mp4`.

## Bỏ bóng xanh v6

Hai dải `duo-truong-quan-no-shadow.png` và `duo-luu-gia-no-shadow.png` được sửa bằng imagegen tích hợp với yêu cầu chỉ xóa bóng xanh dưới chân, giữ giày, nhân vật, đạo cụ và bố trí bốn tư thế. Đã kiểm tra đủ tám tư thế trong bố cục tại `out/qa-v6-shadows/sheet.png`, không còn các oval xanh trong hình xuất. Bản mới: `out/vang-bo-bong-xanh-v6.mp4`.

## Bản có giọng đọc

Bản thu người dùng được lưu tại `public/giong-doc.wav` (92,501 giây, PCM 16-bit mono 48 kHz). Whisper small chạy cục bộ lấy thời gian từng từ, lưu `src/vang/recording.words.json` và `.srt`. Công cụ `align_voice.py` của repo căn 24 cue theo bản thu, coverage 0,985; timeline dự kiến được giữ tại `timeline.planned.json`. SRT mới tại `src/vang/voice.aligned.srt` và `../Ban_thu_am/Ban_chat_cua_vang_da_dong_bo.srt`.

Xuất composition `VangTuongTac` với `--props=props-giong-doc.json`; giọng đọc dùng file WAV gốc, không tạo giọng khác. Dòng nhãn bản dựng được ẩn khi có giọng đọc. File giao: `out/ban-chat-cua-vang-hoan-chinh.mp4`.
