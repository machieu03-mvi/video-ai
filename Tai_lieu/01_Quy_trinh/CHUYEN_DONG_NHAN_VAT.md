# Quy trình chuyển động nhân vật trong video tài chính

Tài liệu này ghi trực tiếp cách triển khai đã được thống nhất sau demo Tập 3. **Không cần mở lại video mẫu để xác định cách làm**. Mức chuyển động được đánh giá tạm ổn là chuỗi tư thế vẽ sẵn có thêm khung trung gian; không mặc định đây là hoạt hình khớp xương liên tục hoặc khẩu hình tự động. Thực hiện bằng Remotion; chưa dùng HyperFrames, tay ghép rời hoặc rig thử nghiệm.

## 1. Chuẩn áp dụng

- Lời dẫn/kịch bản của tập là nguồn quyết định hành động. Một người dẫn, trừ khi yêu cầu khác; nhân vật minh họa và tương tác theo lời kể.
- Khung 720×1280, 30 fps; dùng nền, font, màu chữ, vùng phụ đề và logo/slogan trong `Tai_lieu/02_Quy_chuan/HINH_ANH.md` và `Quy_trinh_video/visual-profile.json`.
- Lấy nhận diện nhân vật từ ảnh chuẩn tương ứng trong `Tai_lieu/05_Nhan_vat/`, kết hợp quy chuẩn `Tai_lieu/02_Quy_chuan/NHAN_VAT.md`. Giữ mặt, râu, mũ, giáp, trang phục, màu sắc và tỷ lệ.
- Cảnh nội dung dài tối đa 10 giây. Ưu tiên mỗi cảnh có hành động và hình riêng; không xem việc đổi chữ, lật, lia hoặc phóng một ảnh cũ là cảnh mới. Ngoại lệ lặp thực sự cần thiết phải ghi vị trí và lý do.
- Một cảnh có nhiều trạng thái liên quan để diễn tả hành động. Giữ hoặc dùng lại một trạng thái **trong cùng một hành động** không bị tính là lặp một cảnh khác. Không lặp động tác vô nghĩa chỉ để tạo cảm giác chuyển động.

## 2. Phân tích lời dẫn và thiết kế cảnh

1. Bảo toàn lời dẫn gốc và tạo cue theo các cụm câu dễ đọc. Nếu chưa có giọng, tạo timeline và SRT tạm; ghi rõ mốc dự kiến. Không biến tốc độ tạm thành yêu cầu cho người đọc.
2. Chia từng ý thành các cảnh liên tục; mốc bắt đầu và kết thúc dựa vào cue, mỗi cảnh không quá 10 giây. Nếu một cue quá dài, chia cảnh ngay trong cue mà không thay đổi câu dẫn. Ghi thời gian, ý, lời tương ứng và nhân vật trong storyboard.
3. Chọn hành động diễn đạt trực tiếp ý đó: ai chuẩn bị, làm gì, người còn lại nhìn/phản ứng ra sao, đạo cụ nào được chạm. Đổi góc, bố cục và tương tác giữa các cảnh một cách hợp lý; không ép mọi cảnh thành cùng động tác.
4. Dự kiến ít nhất ba trạng thái có ý nghĩa cho mỗi cảnh: **bắt đầu → thực hiện → kết thúc/phản ứng**. Nếu khoảng cách giữa hai tư thế lớn, đánh dấu các tư thế trung gian cần vẽ. Cảnh ngắn có thể giữ một trạng thái lâu hơn để đọc rõ; không thay hình máy móc hoặc nhấp nháy.
5. Ghi trong `motionFrames` thứ tự, mã asset và ô, hành động, mốc frame/cue, thời gian giữ và tiếp xúc tay–đạo cụ/chân–sàn. Các mốc phải nằm trong cảnh và tăng dần. Ghi riêng mốc chuyển giữa hai cảnh, không tính mỗi tư thế cùng cảnh là một cảnh mới.
6. Cân nhắc icon bổ trợ nếu làm rõ ý/cảm xúc: ghi hình, ý nghĩa, vị trí, mốc và cách nhân vật nhìn/tương tác. Không bắt buộc icon ở mọi cảnh; thay đổi theo câu chuyện và không thay thế hành động chính.
7. Lập bảng tỷ lệ nhân vật cho tập theo `Tai_lieu/02_Quy_chuan/HINH_ANH.md`: chiều cao hiển thị chuẩn của từng nhân vật, tỷ lệ tương đối giữa các nhân vật, điểm chạm chân và cỡ cảnh. Ghi ngoại lệ có chủ đích khi đổi cỡ cảnh/góc máy hoặc khoảng cách.
8. Ghi mốc, kiểu và thời lượng chuyển giữa từng cặp cảnh trong storyboard; chọn theo nhịp ý và cue. Quy định này áp dụng cho chuyển **giữa cảnh**, tách với khung trung gian của động tác **trong cảnh**.

## 3. Tạo và kiểm tra hình từng cảnh

1. Dựa vào ảnh nhân vật chuẩn để tạo các tư thế chính, sau đó tạo khung trung gian dựa trên những tư thế chính **của cùng cảnh**. Mỗi chuỗi giữ nguyên góc máy, tỷ lệ, kích thước, vị trí tương đối, trang phục, đạo cụ và nền trong suốt; chỉ thay phần cần chuyển động.
2. Giữ mỗi nhân vật hai tay, hai chân tự nhiên; tay nối vào vai/tay áo hoặc giáp, tay cầm tiếp xúc đúng đạo cụ. Không chồng thêm tay lên hình đã có tay, không tạo cánh tay nổi hoặc ba tay. Khi tay khuất do vật che, kiểm tra quan hệ che khuất hợp lý.
3. Đặt chân, bàn và vật đứng trên cùng mặt đất; nếu đứng trên bậc, chân chạm bậc tương ứng. Giữ điểm chạm khi đổi tư thế. Không có bóng oval xanh, quầng sáng, ô nền trắng, vật lạ, chữ/số liệu tự sinh, hình của ô bên cạnh hoặc mũ/đạo cụ bị cắt.
4. Mỗi asset cần alpha trong suốt thật. Đọc kích thước thực, xác định vùng cắt và baseline từng ô; không mặc định một kích thước hay dùng bộ lọc alpha để che nền đục. Rà ảnh trên nền sáng và tối.
5. Lưu ảnh chính, ảnh trung gian, prompt/tài nguyên tham chiếu, vùng cắt và baseline vào hồ sơ của tập. Giữ nguyên nguồn ảnh chuẩn. Không dùng ảnh lỗi chỉ để đủ số khung.

## 4. Dựng chuyển động trong Remotion

1. Tạo composition riêng cho tập và timeline từ lời dẫn; dùng cue của tập mới. Đặt ảnh theo đúng thứ tự trạng thái và khung trung gian, đảm bảo nhân vật/đạo cụ ổn định qua từng lần đổi.
2. Căn hành động quan trọng với nội dung tương ứng: ví dụ, lúc người dẫn nói “nâng tạ”, tay bắt đầu đưa tạ lên; lúc nói về việc kiểm tra, nhân vật nhìn/chỉ vào bảng và người còn lại phản ứng. Thời gian chuyển động nằm **trong thời lượng cảnh**, không tự cộng thời gian chỉ vì có thêm ảnh.
3. Ở 30 fps, một frame là 1/30 giây. Có thể dùng khoảng **6 frame, tương đương 0,2 giây**, cho một tư thế trung gian như điểm bắt đầu thử nghiệm; tăng hoặc giảm theo hành động và kết quả xem thực tế. Đây là ví dụ từ demo, không phải chuẩn bắt buộc cho mọi tư thế/cảnh. Trạng thái chính và thông tin cần đọc có thể giữ lâu hơn.
4. Không dùng chồng mờ các tư thế nếu làm xuất hiện tay/đạo cụ đôi; không tạo rig cắt lớp khi chưa được yêu cầu. Chuyển động chính phải đến từ các tư thế/ảnh nối được chuẩn bị. Dịch/thu phóng toàn ảnh hoặc phụ đề không thay thế hành động của nhân vật.
5. Cho phép chuyển động nền nhẹ khi hợp cảnh và không làm chân trượt hoặc xao nhãng. Không lặp chuyển động vô lý; không làm sai nhịp lời dẫn, không tăng tốc video để tới outro.
6. Dùng icon có nét và màu phù hợp phong cách chibi; hiện đúng cue, có thể chuyển động nhẹ. Giữ rõ mặt, tay, đạo cụ, tiêu đề và phụ đề; không dùng icon như bàn tay ghép rời. Căn lại các mốc icon khi có giọng, không coi việc đổi icon là đổi cảnh.
7. Căn tỉ lệ theo phần cơ thể và điểm sàn đã đo, không fit toàn bộ khung asset hoặc khoảng trong suốt để suy ra kích thước nhân vật. Với ảnh nhiều người vẽ liền một khối, kiểm tra chiều cao từng người trong ảnh; nếu không thể đạt tương quan chuẩn bằng một phép scale đồng đều, sửa/tạo lại asset thay vì kéo méo hoặc tách tay ghép rời.
8. Theo demo 15 giây đã thống nhất, mặc định chuyển phần hình giữa các cảnh bằng easing: **mờ cảnh cũ 4 frame trước mốc cắt, rồi hiện cảnh mới 4 frame sau mốc cắt ở 30 fps**; không chồng hai hình nhân vật. Giữ nền giấy, đường sàn, tiêu đề và phụ đề liên tục theo timeline, không mờ hay đổi chữ sai cue. Đây là chuyển **giữa cảnh**, không phải 6 frame ví dụ cho tư thế trung gian **trong cảnh**. Khi nội dung hoặc nhịp đọc cần thay đổi, điều chỉnh có chủ đích và ghi mốc/cách chuyển trong storyboard; tránh giật sáng, mũ/đạo cụ bị cắt hoặc chữ chồng khó đọc.
9. Tính thời gian chuyển trong timeline hiện có; nếu hai cảnh chồng thời gian phải tính chồng lấn rõ ràng, không thay đổi tổng thời lượng, âm cuối, nhịp lời đọc hoặc làm mất thời gian đọc. Đo khoảng thực tế mà mỗi cảnh thấy rõ; không dùng chuyển mờ để che việc một hình giữ quá 10 giây. Phần kết logo/slogan giữ quy chuẩn riêng.

## 5. Kiểm tra trước và sau xuất

1. Xuất contact sheet đủ các tư thế chính và trung gian theo thứ tự; xem từng ô và chỗ tay, khuỷu, đầu, vật cầm, chân, nền, ranh giới cắt. Rà các cảnh quá giống nhau, kể cả ảnh khác tên; thay/sửa hình sai.
2. Xuất đoạn thử cho những hành động mới và **xem phát lại ở tốc độ thực**: đánh giá cảm giác chuyển động, vị trí tiếp xúc, độ ổn định, nhịp đổi hình và sự phù hợp của phản ứng. Nếu chưa xem được, ghi rõ giới hạn; kiểm tra khác biệt pixel, số frame hoặc exit code không chứng minh chuyển động mượt. Bổ sung khung nối/sửa bố cục khi cần.
3. Chạy `Quy_trinh_video/kiem-tra-phan-canh.py` theo hướng dẫn trong `SAN_XUAT_VIDEO.md` để kiểm tra thời lượng, độ liên tục và trùng mã cảnh. Công cụ không phát hiện mọi ảnh giống nhau hoặc kiểm định tư thế trung gian, nên vẫn phải rà bằng mắt.
4. Xuất MP4, kiểm tra thời lượng, kích thước, phụ đề, các cảnh, đầu/cuối và logo/slogan trên chính MP4; ghi những gì đã kiểm tra và giới hạn trong `qa/`. Không chèn outro vào trích đoạn demo giữa video trừ khi được yêu cầu.
5. Ở các cảnh có icon, rà nội dung, phong cách, độ dễ thấy, vị trí, mốc xuất hiện/kết thúc và tương tác; tránh che chữ/nhân vật, lặp thừa, hình bị cắt hoặc chuyển sang cảnh khác ngoài ý muốn.
6. Đối chiếu contact sheet những cảnh cùng cỡ với bảng tỷ lệ đã lưu, gồm từng người trong cảnh đông người và khung trước/sau khi đổi góc; rà sự thay đổi chiều cao ngoài chủ đích, lệch điểm sàn, méo thân hoặc vật thể co giãn. Kiểm tra tất cả điểm chuyển cảnh bằng đoạn render tại tốc độ thực; ghi mốc, phương pháp và vấn đề còn lại trong `qa/`. Nếu không thể xem tốc độ thực, nêu rõ giới hạn, không khẳng định cảnh đã mượt.

## 6. Khi nhận hoặc tạo giọng đọc theo yêu cầu

1. Giữ bản thu nguyên vẹn; xác định độ dài và căn lại cue/SRT với audio thực tế theo quy trình tổng. Nếu chưa có giọng, giữ bản hình tạm và SRT dự kiến, không tự tạo giọng.
2. Điều chỉnh mốc cảnh, tư thế chính và khung trung gian theo từng câu/từ, đồng thời tiếp tục bảo đảm cảnh không quá 10 giây. Bổ sung cảnh/tư thế nếu bản thu kéo dài; giữ cảnh đủ lâu để đọc và nhìn thấy hành động.
3. Không tự tăng tốc, cắt lời hoặc thêm nội dung để ép thời lượng; thời lượng video hoàn chỉnh theo bản thu. Kiểm tra lại cảnh lặp, trạng thái chuyển động, phụ đề và âm cuối, rồi xuất bản hoàn chỉnh có logo/slogan theo quy trình tổng.

Mẫu hành động và chuyển động chỉ mang tính giải thích. Kịch bản, nhân vật và nhịp của từng tập quyết định cách dựng cụ thể; quy trình không cần xem lại video cũ để xác định các bước hoặc thông số.
