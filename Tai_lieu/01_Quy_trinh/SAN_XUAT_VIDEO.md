# Quy trình video tài chính với bộ năm nhân vật

**Cập nhật hình ảnh đã chốt 10/11/2026:** dùng `Tai_lieu/02_Quy_chuan/HINH_ANH.md` và `Quy_trinh_video/visual-profile.json`. Mẫu là bản Trương Phi **ngay trước v4**, nền giấy sáng với `brightness(0.995)`, tiêu đề xanh đậm cố định, chữ nhấn nâu vàng, phụ đề trắng trên ô xanh đậm. Quy chuẩn này ưu tiên hơn mô tả nền gradient cũ bên dưới. Ảnh chuẩn nhân vật hiện nằm trong `Tai_lieu/05_Nhan_vat/`.

Phiên bản 1.0 — chuẩn hóa từ video “Bản chất của vàng” đã được duyệt. Áp dụng cho các kịch bản tiếp theo trong dự án này. Đọc cùng `Tai_lieu/02_Quy_chuan/NHAN_VAT.md` và dùng năm ảnh `*_tham_chieu.png` trong `Tai_lieu/05_Nhan_vat/`, bao gồm Triệu Tử Long bản đã đồng bộ phong cách.

Lựa chọn công cụ hiện hành: tiếp tục dùng Remotion. HyperFrames đã được thử trong `Demo_HyperFrames` nhưng người dùng quyết định tạm thời chưa áp dụng; không đưa bản thử vào quy trình sản xuất nếu chưa có yêu cầu mới.

Lựa chọn chuyển động hiện hành: dùng chuỗi tư thế và khung chuyển tiếp vẽ nhất quán cho từng phân cảnh; người dùng tạm thời bỏ qua rig cắt lớp. Mẫu rig Trương Phi chỉ để tham khảo; không tiếp tục phát triển hoặc áp dụng vào video khi chưa có yêu cầu mới.

## 1. Chuẩn đầu ra và mức hoạt họa

- Một người dẫn đọc toàn bộ câu chuyện; nhân vật diễn xuất minh họa theo nội dung. Có thể đổi sang đối thoại khi người dùng yêu cầu.
- Khung dọc 9:16 cho Shorts/TikTok, 30 fps. Bản đã duyệt là 720 × 1280; có thể xuất 1080 × 1920 bằng bố cục được scale đúng tỷ lệ và kiểm tra lại, không chỉ đổi kích thước composition với tọa độ cũ.
- Phong cách chibi 2D viền đậm, màu trang phục theo ảnh chuẩn. Nền giấy và bảng màu theo `Tai_lieu/02_Quy_chuan/HINH_ANH.md`; tiêu đề `#173b50`, chữ nhấn `#8c5b25`, phụ đề `#ffffff` trên ô `#15344a`, không đổi theo cảnh.
- Font Be Vietnam Pro cục bộ: tiêu đề Black 900, phụ đề ExtraBold 800; chờ font tải xong trước khi render. Không dùng font chỉ có subset Latin cho chữ tiếng Việt.
- Mức hoạt họa hiện hành là các chuỗi tư thế vẽ sẵn, đạo cụ động và chuyển góc. Đây chưa phải rig xương liên tục hoặc lip-sync. Nếu cần mức đó, phải chuẩn bị rig/khung trung gian và quy trình kiểm tra tương ứng; không gọi chuyển ảnh là chuyển động khớp mượt.
- Đã có thử nghiệm rig cắt lớp Trương Phi: `Du_an_Vang/video-remotion/src/TruongPhiRig.tsx` cùng ảnh bộ phận `public/rig-truong-phi/parts.png` và composition thử `src/rig-truong-phi.tsx`. Đầu và hai tay xoay qua các keyframe nội suy; đây là mẫu kỹ thuật một nhân vật, chưa có khớp khuỷu tay, chưa có hệ thống biểu cảm/lip-sync hoặc rig cho bốn nhân vật khác. Kiểm tra lại tỷ lệ, khớp vai, tay cầm đạo cụ và điểm sàn trước khi dùng trong video thật. Không thay thế bộ ảnh chuẩn bằng ảnh các bộ phận thử nghiệm.
- Nguồn audio theo yêu cầu từng video: người dùng cung cấp bản thu hoặc yêu cầu tạo giọng ElevenLabs. Đã kết nối ElevenLabs; quy trình tạo và đồng bộ giọng tại mục 9A. Không mặc định coi giọng thử Tập 2 là giọng đã chốt cho cả series.

## 2. Tổ chức một video mới

Mỗi kịch bản dùng một thư mục riêng, ví dụ `Videos/ten-chu-de/`. Không chép đè timeline, âm thanh và thành phẩm của video vàng. Cấu trúc đề nghị:

```text
Videos/ten-chu-de/
  input/kich_ban_goc.txt
  input/loi_dan.txt
  brief.md
  storyboard.json
  asset-manifest.json
  public/characters/
  public/props/
  public/fonts/
  public/voice.wav                 khi có bản thu
  src/<slug>/timeline.planned.json
  src/<slug>/timeline.json
  src/<slug>/timeline.ts
  src/<slug>/voiceover.srt
  src/<slug>/voice.aligned.srt      khi đã đồng bộ
  qa/                             ảnh và ghi nhận kiểm tra
  out/                            video xuất
```

Dùng các mẫu trong `Tai_lieu/03_Bieu_mau/`. Lưu bản gốc, bản đã biên tập, ảnh chuẩn đã dùng và tên file thành phẩm trong manifest để biết chính xác phiên bản nguồn. Dùng chung môi trường Remotion hiện có nếu thích hợp; không sao chép `node_modules`, `.venv-audio` hoặc `.models` cho mỗi video.

## 3. Nhận và chốt kịch bản

1. Lưu nguyên văn nội dung người dùng trước khi biên tập.
2. Xác định chủ đề, ý chính, hình thức dẫn chuyện, thời lượng mong muốn, nhân vật tham gia và trạng thái audio. Kế thừa lựa chọn đã có; chỉ hỏi phần thiếu có ảnh hưởng đến kết quả.
   Với từng nhân vật xuất hiện, đọc ảnh chuẩn và hồ sơ trong `Tai_lieu/08_Dac_ta_nhan_vat/`; dùng phần đã duyệt làm chuẩn, phần đề xuất chỉ là định hướng và kịch bản/yêu cầu hiện tại được ưu tiên.
3. Nếu nhận đối thoại nhưng cần một người dẫn, viết lại thành lời kể liền mạch; giữ ý nghĩa và số liệu. Phân biệt nhân vật minh họa với người thực sự đọc.
4. Chia đoạn theo từng ý, ngắt câu dài ở chỗ tự nhiên để tạo cue đọc. Không tự thêm lời khuyên giao dịch, số liệu hoặc khẳng định về thị trường; nội dung mới hoặc số liệu thời sự phải có nguồn được kiểm tra.
5. Chốt bản lời dẫn làm nguồn duy nhất cho SRT, timeline và hình ảnh. Khi sửa nội dung sau đó, cập nhật cả ba; không để phụ đề và lời đọc khác phiên bản.

Đầu ra: `input/loi_dan.txt`, `brief.md`.

## 4. Tạo timeline tạm và phân cảnh

Repo đang tích hợp: `Du_an_Vang/stickman-video`. Công cụ `scripts/parse_input.py` tạo `timeline.ts`, `timeline.json`, `voiceover.srt` từ lời dẫn. Dùng bản sao theo video mới và kiểm tra đầu ra; không mặc định lấy timeline của video vàng.

Mỗi cảnh trong `storyboard.json` cần có:

- ID cảnh; cue bắt đầu/kết thúc và lời dẫn tương ứng.
- Ý cần minh họa; nhân vật; góc nhìn; biểu cảm; đạo cụ và hành động của từng người.
- Diễn tiến hành động: chuẩn bị → thao tác → phản ứng → kết thúc. Điểm nào phải khớp từ khóa thì gắn vào cue hoặc thời gian từ đã nhận dạng.
- Tên asset, số tư thế, kích thước thật, vùng cắt của từng tư thế, điểm chạm chân và vị trí đạo cụ.
- Icon minh họa nếu phù hợp: ý nghĩa, kiểu dáng, vị trí, thời điểm xuất hiện/kết thúc và tương tác với nhân vật hoặc lời dẫn.
- Chữ ngắn trên màn hình; ghi rõ biểu đồ chỉ minh họa nếu không dùng dữ liệu thật.
- Bảng tỷ lệ nhân vật theo cỡ cảnh và điểm sàn; mốc, cách và thời lượng chuyển từng cặp cảnh theo `Tai_lieu/01_Quy_trinh/CHUYEN_DONG_NHAN_VAT.md`.

Tốc độ tạm của video trước là 3,8 đơn vị tách bằng khoảng trắng/giây, chỉ để dựng nhịp sơ bộ cho tiếng Việt. Không lấy đây làm tốc độ đọc bắt buộc. Người đọc có thể thu tự nhiên rồi căn lại.

Không cố định video mới thành chín cảnh hay 24 cue. Số cảnh theo nội dung. Mỗi cảnh cần có vai trò và hành động riêng; tránh tái dùng cùng một hành động cho nhiều ý khác nhau. Chọn góc rộng/cận/nghiêng và cảnh hai người để thay đổi nhịp khi nội dung phù hợp.

**Nhịp phân cảnh:** Trong phần nội dung, mỗi phân cảnh kéo dài tối đa **10 giây**; trong mọi khoảng 10 giây phải có ít nhất một thay đổi phân cảnh rõ ràng. Lập mốc bắt đầu/kết thúc theo thời gian thực trên storyboard và timeline. Chuyển cảnh cần thay đổi hình minh họa, tư thế hoặc tương tác, góc nhìn hay bố cục phù hợp ý lời dẫn; chỉ đổi phụ đề hoặc lia/zoom một ảnh cũ không được tính là cảnh mới. Có thể đổi sớm hơn theo nhịp nội dung, không cần chờ đủ 10 giây. Thẻ logo/slogan cuối dài 3 giây vẫn giữ theo quy chuẩn riêng.

**Hạn chế cảnh lặp:** Mặc định mỗi phân cảnh nội dung dùng hình và hành động riêng, khác biệt rõ ràng và phù hợp ý lời dẫn. Không lặp lại nguyên cùng một ảnh/tư thế trong video; chỉ cân nhắc tái sử dụng thật cần thiết cho mạch kể và hạn chế tối đa. Đổi phụ đề, tiêu đề, thời lượng, vị trí, lật ảnh hoặc cắt/phóng ảnh cũ không biến ảnh đó thành cảnh mới. Chuẩn bị đủ asset riêng ngay từ storyboard, đa dạng góc nhìn, biểu cảm, đạo cụ, hành động và tương tác giữa nhân vật; giữ đúng nhận diện và không tạo chuyển động tay ghép rời chưa được duyệt. Đoạn logo/slogan kết theo quy chuẩn thương hiệu không thuộc phần phân cảnh nội dung này.

**Chuyển động bên trong cảnh:** Với mỗi phân cảnh nội dung, chuẩn bị một chuỗi nhiều ảnh/tư thế liên quan của cùng cảnh để diễn tả hành động, thay vì giữ một ảnh tĩnh suốt cảnh. Mặc định lập ít nhất ba trạng thái có ý nghĩa: bắt đầu, thực hiện/khung trung gian và kết thúc hoặc phản ứng; bổ sung khung chuyển tiếp khi cần để động tác không nhảy đột ngột. Số khung, thời điểm và thời lượng giữ chọn theo hành động và lời dẫn, không đổi ảnh máy móc theo nhịp cố định. Có thể giữ khoảnh khắc ngắn để người xem kịp hiểu biểu cảm hoặc thông tin. Ghi rõ chuỗi ảnh và mốc từng trạng thái trong storyboard; gắn nhân vật với đạo cụ và phản ứng của nhân vật khác khi kịch bản phù hợp.

**Chuẩn thực hiện chuyển động:** Đọc `Tai_lieu/01_Quy_trinh/CHUYEN_DONG_NHAN_VAT.md` để có đầy đủ các bước, mốc, yêu cầu asset và tiêu chí kiểm tra; không cần mở lại video mẫu. Mức đã được đánh giá tạm ổn là chuỗi tư thế vẽ sẵn có khung trung gian, chưa phải rig liên tục hoặc lip-sync. Ví dụ kỹ thuật 6 frame ở 30 fps chỉ là điểm bắt đầu, không áp dụng cứng cho mọi cảnh.

Triển khai: thiết kế hành động theo câu dẫn → tạo tư thế chính từ ảnh chuẩn nhân vật → tạo thêm tư thế trung gian dựa trên tư thế chính của cùng cảnh → đối chiếu hình và điểm tiếp xúc giữa các tư thế → sắp xếp thời gian giữ và nhịp chuyển trong Remotion → xem đoạn thử, sửa rồi mới mở rộng toàn video. Lựa chọn số khung theo mức thay đổi của hành động; tránh thêm khung hoặc lặp động tác không có ý nghĩa chỉ để tăng số lượng. Trước bản thu dùng timeline tạm; sau khi có giọng phải căn lại các chuyển động theo bản thu, không cắt hoặc tăng tốc lời để ép nhịp.

Các khung trong cùng một cảnh cần giống nhau về diện mạo, trang phục, tỷ lệ, góc nhìn, vị trí tương đối, đạo cụ và điểm chạm đất; chỉ thay đổi những phần phục vụ hành động. Chuyển động phải được tạo bằng tư thế/khung đã chuẩn bị và cách dàn cảnh Remotion, không ghép tay rời hoặc tự ý áp dụng rig chưa được duyệt. Có thể giữ nguyên một trạng thái qua nhiều frame để tạo nhịp tự nhiên; quy định hạn chế lặp nói về việc dùng lại nguyên cảnh/tư thế như một **phân cảnh khác**, không cấm giữ hay dùng trạng thái liên tiếp trong cùng một hành động. Đổi phụ đề, zoom hoặc lia trên một ảnh không thay thế chuỗi hành động.

**Icon minh họa:** Có thể bổ sung icon trong từng cảnh khi giúp người xem nắm ý hoặc cảm xúc, ví dụ đồng hồ cho sự kiên nhẫn, bảng kiểm cho quy tắc, lá chắn cho quản lý rủi ro, hoặc biểu đồ cho biến động. Chọn icon theo nội dung từng cảnh, đa dạng phù hợp, không mặc định bắt buộc cảnh nào cũng có. Ưu tiên nét vẽ, viền và màu hài hòa phong cách chibi đã chốt; icon phải dễ nhận ra trên nền giấy. Không để icon thay thế hành động/tương tác nhân vật hoặc dùng một icon lặp vô nghĩa để tạo cảm giác đa dạng.

Trong storyboard ghi icon, ý nghĩa, asset/nguồn, vị trí và mốc xuất hiện, chuyển động, kết thúc theo cue hoặc bản thu. Có thể cho icon hiện dần hoặc chuyển động nhẹ, hợp lý; không che mặt, tay, đạo cụ, tiêu đề hay phụ đề, không ra khỏi vùng an toàn. Khi nhân vật tương tác, thể hiện rõ hướng nhìn và quan hệ không gian; không thêm bàn tay rời hay tạo cảm giác đạo cụ dính sai. Sắp xếp và tiết chế số icon, thời lượng và hiệu ứng theo nội dung, tránh rối hoặc thu hút khỏi ý chính. Các biểu đồ và con số phải bám kịch bản; biểu đồ không dựa trên dữ liệu thật được ghi là minh họa. Giữ thẻ logo/slogan cuối theo quy chuẩn riêng, không tự thêm icon vào thẻ.

**Quy trình bắt buộc trước khi xuất:** (1) Chia toàn bộ nội dung thành cảnh liên tục, tối đa 10 giây/cảnh; (2) ghi trong storyboard mốc frame, cue, ý, hành động và mã ảnh/tư thế duy nhất cho từng cảnh; (3) tính số tư thế cần bổ sung, chuẩn bị đủ ảnh và rà từng ảnh trước khi dựng; (4) chạy kiểm kê tự động đối với asset/tư thế trùng và thời lượng, sau đó xem contact sheet để phát hiện cả ảnh khác tên nhưng giống nhau; (5) sửa cảnh lặp và lỗi tạo hình, dựng, rồi rà mốc chuyển, hình thực tế và logo trong MP4. Không xuất bản như đạt chuẩn nếu chưa hoàn thành các bước này. Với ngoại lệ tái sử dụng thực sự cần thiết, ghi cảnh, lý do và báo khi bàn giao; không tự xem ngoại lệ là thông lệ. Khi căn giọng đọc phải lập lại các kiểm tra này.

## 5. Dựng asset đúng phong cách

1. Dùng ảnh chuẩn của đúng nhân vật trong `Tai_lieu/05_Nhan_vat/` làm tham chiếu chính, không lấy bảng cũ hoặc một ảnh sinh trung gian làm chuẩn mới.
2. Mỗi hành động dùng một asset/chuỗi riêng. Ví dụ video vàng: xem giá, đếm vàng, chất vấn, trao vàng, mở rương tiền cổ, cân vàng/tiền giấy, mở kho, phân loại tài sản, cùng xem tài liệu. Kịch bản mới cần hành động theo nội dung mới.
3. Với chuỗi tư thế: yêu cầu cùng nhân vật, tỷ lệ, camera, điểm sàn, ánh sáng và kích thước giữa các khung. Bốn tư thế là cách đã dùng, không phải giới hạn; tăng khung khi động tác cần chuyển tiếp.
   Mỗi phân cảnh chuẩn bị tối thiểu các trạng thái đầu, giữa và cuối; các trạng thái là biến thể của cùng một bố cục và hành động, không tự đổi nhân vật, số tay hay đạo cụ. Ghi danh sách file/ô ảnh và mốc trạng thái; kiểm tra vùng chuyển giữa từng cặp trước khi đưa vào video.
4. Tay phải thuộc nét vẽ và trang phục nhân vật, gắn vào đúng vai/tay áo. Kiểm tra từng khung có đúng hai tay, không thêm tay đồ họa lên cơ thể đã có tay.
5. Asset đưa vào video có alpha trong suốt thật. Không có nền trắng, quầng sáng hoặc bóng oval xanh. Nền kem của model sheet chỉ là nền tham chiếu, phải tách khi tạo asset hoạt họa.
6. Kiểm tra ảnh sinh ngay sau mỗi lượt: khuôn mặt, màu áo, giáp, mũ, râu; ngón/tay, chân, đạo cụ, cạnh khung và tính nhất quán. Dùng công cụ tạo/sửa ảnh phù hợp để chỉnh lỗi, rồi kiểm tra lại phần đã sửa cùng các vùng liên quan.
7. Lưu phiên bản sửa riêng và cập nhật `asset-manifest.json`. Không gọi file có lỗi là asset chuẩn.

Mẫu mô tả ảnh tại `Tai_lieu/03_Bieu_mau/MAU_YEU_CAU_ASSET.md`. Các ảnh chuẩn hiện hành đều là bitmap, chưa phải rig.

## 6. Dàn cảnh và chuyển động

- Nối Remotion với engine từ repo thật: đạo cụ/hiệu ứng được chép vào `src/stickman`, timeline do công cụ repo xử lý. Ghi rõ phần nào dùng lại và phần nào viết cho cảnh mới.
- Lấy điểm chuyển cảnh từ cue/timeline, không đóng đinh giây rồi bỏ qua bản thu sau này. Lập mapping cue theo kịch bản mới và kiểm tra tất cả chỉ số tồn tại, tăng dần.
- `Du_an_Vang/video-remotion/src/tuong-tac.tsx` là mẫu tham khảo của video vàng: các cue `(4,9,12,14,16,18,21,22)`, tên asset, tiêu đề và điều kiện cảnh trong file đều dành riêng cho video đó. Không tái dùng nguyên các chỉ số hoặc thay riêng lời dẫn rồi render.
- Khi đã căn theo bản thu, đo lại khoảng cách giữa các mốc đổi cảnh thực tế: không để một cảnh nội dung vượt 10 giây, kể cả khi một cue hoặc đoạn lời đọc kéo dài. Nếu cần, tách thêm cảnh/nhịp hình trong cue mà không cắt hay tăng tốc giọng đọc.
- Trong mỗi cảnh, sắp xếp và định thời gian chuỗi tư thế theo chuẩn bị → thực hiện → phản ứng/kết thúc; dùng khung trung gian khi hai tư thế cách nhau quá xa. Kiểm tra mạch tương tác và nhịp thực tế, tránh đổi tư thế thành nhấp nháy hoặc chỉ dịch cả ảnh như trình chiếu.
- Đọc kích thước ảnh thật, không giả định mọi sprite sheet đều là 2172 × 724 hoặc bốn ô 543 pixel. Lưu vùng cắt trong manifest; cắt theo từng ô, tránh lọt nhân vật từ ô kế bên.
- Đo điểm chạm chân theo tư thế; không dùng khoảng trắng cuối ảnh làm điểm sàn. Script `measure-ground.py` hiện là helper riêng cho bộ ảnh vàng và dùng màu giày tối để ước lượng: khi dùng lại phải đổi danh sách asset, kiểm tra kết quả bằng mắt và hiệu chỉnh khi màu/đạo cụ làm sai phép đo.
- Vùng nhìn phải chứa đủ đỉnh mũ, lông mũ, chân và đạo cụ ở mọi tư thế. Tăng vùng nhìn phía trên khi cần, đồng thời giữ điểm sàn; không áp dụng một crop cố định gây cắt mũ ở cảnh kết.
- Neo phép scale/zoom vào điểm chạm đất để góc cận không nhấc chân. Giữ nhân vật cùng mặt phẳng; đạo cụ có tiền cảnh phải có quan hệ không gian rõ.
- Dùng bảng tỷ lệ từng nhân vật theo `Tai_lieu/02_Quy_chuan/HINH_ANH.md` cho mọi cảnh cùng cỡ và cùng mặt phẳng; không fit nguyên ảnh theo khung rồi làm nhân vật lớn nhỏ thất thường. Ngoại lệ do góc máy/cỡ cảnh phải ghi trong storyboard; ảnh nhiều nhân vật không đúng tương quan phải sửa asset.
- Chuyển giữa các cảnh theo demo đã thống nhất: hình cũ mờ ra 4 frame trước mốc cắt, hình mới hiện dần 4 frame sau mốc ở 30 fps; giữ nền, đường sàn, tiêu đề và phụ đề theo timeline, không chồng hình nhân vật. Điều chỉnh theo nội dung nếu cần và ghi trong storyboard; không cắt lời, rối chữ hay tăng thời lượng ngoài ý muốn. Kiểm tra khoảng hiển thị thực tế của cảnh; cảnh nội dung không quá 10 giây. Thẻ kết giữ thông số riêng.
- Không dùng bộ lọc alpha như cách duy nhất để sửa nền trắng đục. Bộ lọc chỉ hỗ trợ loại phần viền bán trong suốt sau khi asset đã được tách nền; kiểm tra không mất chi tiết giáp trắng hoặc mũ bạc.
- Hiệu ứng có lý do, xuất hiện và kết thúc đúng lúc. Bỏ các vòng/spark vô nghĩa giữa hai nhân vật hoặc hiệu ứng lặp gây phân tâm.
- Phụ đề trong vùng an toàn, không che tay/đạo cụ. Chữ ngắn trên hình phục vụ ý chính. Chừa khoảng cách dòng cho dấu tiếng Việt; ẩn ô phụ đề ở khoảng nghỉ không có câu.
- Nếu dùng icon, căn thời điểm hiển thị và phản ứng nhân vật theo cue; sau khi đồng bộ giọng cập nhật lại các mốc và kiểm tra icon thoát đúng lúc. Đổi icon đơn thuần không được tính là cảnh mới hoặc khung hoạt động nhân vật mới.

## 7. Kiểm tra hình trước bản thu

Trước khi xuất cả video, render contact sheet của tất cả tư thế trong từng cảnh. Đối với cảnh mới hoặc vừa sửa, xem thêm khung đầy đủ kích thước. Kiểm tra các mốc chuyển cảnh, zoom, đầu và cuối video.

Rà thời lượng từng phân cảnh trên timeline và kiểm tra trong MP4 sau xuất: mọi cảnh nội dung phải không quá 10 giây, thay đổi phải thực sự nhìn thấy và phù hợp lời dẫn. Ghi lại các mốc hoặc thời lượng cảnh trong hồ sơ kiểm tra; sửa và kiểm tra lại khi đồng bộ giọng làm thay đổi nhịp cảnh.

Lập bảng kiểm kê toàn bộ cảnh theo thời gian, ID asset và tư thế/ô ảnh; đánh dấu những asset hoặc tư thế lặp, kể cả khi đã đổi chữ, lật hay phóng/cắt ảnh. Xem contact sheet theo thứ tự và đối chiếu MP4 để phát hiện cảnh quá giống nhau. Thay bằng hình/tư thế/hành động riêng phù hợp nội dung, rồi kiểm tra lại thời lượng và hình ảnh. Nếu thực sự cần lặp để kể chuyện, ghi rõ vị trí và lý do trong `qa/` và báo cho người dùng khi bàn giao; không coi việc đổi giữa vài ảnh lặp là đạt yêu cầu đa dạng.

Với từng cảnh, rà tất cả trạng thái và khung chuyển tiếp trên contact sheet, rồi xem đoạn render theo tốc độ thực, đặc biệt lúc đổi tư thế và tiếp xúc đạo cụ/nhân vật. Sửa hiện tượng giật, đổi hình dạng, thừa tay, tay rời, đạo cụ nhảy hoặc nhân vật trượt/nổi khỏi sàn; bổ sung hình trung gian nếu cần. Ghi cảnh đã xem và lỗi/giới hạn còn lại trong `qa/`. Kiểm tra tự động mã ảnh và điểm cắt không đủ để kết luận chuyển động mượt; không gọi chuỗi ảnh là hoạt hình liên tục hay lip-sync nếu chưa thực sự có.

Đối chiếu tỷ lệ thực tế giữa các cảnh cùng cỡ và giữa các nhân vật với bảng tỷ lệ của tập, kiểm tra điểm sàn và ngoại lệ có chủ đích. Xem các mốc chuyển phân cảnh ở tốc độ thực, rà bóng đôi, giật hình, cắt lời, chữ chồng và thời lượng; ghi rõ nếu chưa thể xem trực tiếp. Sau khi căn giọng, cập nhật mốc chuyển và kiểm tra lại.

Rà icon trong từng cảnh có sử dụng: đúng ý, dễ thấy, không che nội dung quan trọng hoặc bị cắt; không lưu lại nhầm sang cảnh sau, không lặp gây rối và không tạo tay/đạo cụ lỗi. Kiểm tra mốc xuất hiện so với phụ đề và giọng thực tế khi đã có bản thu.

Khi áp dụng cách dựng từ demo, kiểm tra thêm các mốc tư thế trung gian, thời điểm tương tác theo lời dẫn và thời lượng cảnh; đối chiếu bản dựng trước/sau khi phù hợp. Tách bạch kiểm tra số frame hoặc độ khác ảnh với việc thực sự xem chuyển động; nếu chưa xem được tốc độ thực phải ghi rõ, không khẳng định đã kiểm tra độ mượt bằng mắt.

Với storyboard có danh sách `visualBeats` gồm `frame`, `durationFrames`, `sheet`, `pose`, dùng `python Quy_trinh_video/kiem-tra-phan-canh.py <storyboard.json> --fps 30 --end-frame <frame-het-noi-dung> --report <duong-dan-bao-cao.json>`. Đọc frame hết nội dung từ composition/timeline, không tính thẻ outro. Kiểm tra tự động chỉ phát hiện trùng mã asset/tư thế và mốc sai, không thể chứng minh hai ảnh khác mã khác biệt hoặc đẹp; kiểm tra bằng mắt vẫn bắt buộc. Đổi tên file, đổi crop hoặc sửa báo cáo không làm ảnh trùng thành ảnh mới.

Các lỗi phải sửa trước khi bàn giao bản hình:

- Thừa/thiếu tay, cầm đạo cụ sai, tay tách khỏi vai, lỗi chân hoặc đổi diện mạo.
- Cảnh/tư thế lặp không phục vụ nội dung; nhân vật không hướng về người/đạo cụ đang tương tác.
- Nền trắng/viền sáng/bóng xanh lọt vào video.
- Chân nổi, đứt đường sàn, mũ hoặc đạo cụ bị cắt; ảnh ô kế bên lọt khung.
- Chữ lỗi dấu, nhảy font, bị cắt hoặc che nội dung; ô phụ đề rỗng.

Sau khi sửa: kiểm tra toàn bộ tư thế của asset đó, không chỉ một ảnh. Lưu ảnh kiểm tra và ghi lỗi đã sửa trong `qa/`. Kiểm tra TypeScript trước khi render. Xuất mẫu ngắn nếu cần đánh giá chuyển cảnh; ghi đúng mức hoạt họa thực tế. Khi user yêu cầu duyệt, gửi kết quả cụ thể để duyệt; không tạo thêm bước xác nhận cho mọi thao tác đã được cho phép.

## 8. Giao file để thu âm

- Giao SRT tạm từ timeline cùng TXT lời đọc liền mạch. Kiểm tra ghép các câu trong SRT khớp toàn bộ bản lời dẫn, đánh số liên tục, timestamp hợp lệ, không thiếu câu.
- Nói rõ mốc giây chỉ là tham khảo; người dùng đọc tự nhiên. Ưu tiên một file WAV hoặc MP3 liền mạch; có nhiều file thì ghi rõ thứ tự.
- Lưu trạng thái `awaiting_audio` trong manifest khi người dùng chưa gửi audio. Giữ cấu trúc có thể đổi thời gian; chưa gọi bản hình im lặng là thành phẩm có giọng.

## 9. Nhận audio và đồng bộ

1. Copy bản thu vào thư mục của video, giữ bản gốc. Đọc duration, sample rate, số kênh, định dạng; kiểm tra peak/clipping. Không tự đổi giọng, tăng tốc hay cắt lời để ép vào thời lượng tạm.
2. Lấy timestamp từ/câu bằng công cụ nhận dạng có hỗ trợ tiếng Việt; lưu transcript và mốc từ để đối chiếu. Cách đã dùng: faster-whisper small CPU int8 trong `.venv-audio`, model nằm trong `.models`, nhận dạng cục bộ.
3. Script `transcribe-audio.py` của video trước đang giả định WAV PCM16 mono 48 kHz. Nếu bản thu mới khác, phải sửa bộ đọc/resample cho đúng; không áp dụng nguyên assertion hoặc giải mã bằng dtype sai. Đã gặp khác biệt API PyAV; có thể đọc WAV chuẩn bằng `wave` và phân tích qua numpy, còn bản WAV gốc vẫn được dùng khi xuất.
4. Dùng `stickman-video/scripts/align_voice.py` để căn bản lời dẫn với transcript. Công cụ có thể nhận `--audio` hoặc `--srt` từ timestamp từng từ. Lưu `timeline.planned.json` trước khi ghi timeline mới.
5. Đọc báo cáo coverage; dưới 0,8 là dấu hiệu cần rà kỹ nội dung thiếu/khác, nhưng vượt ngưỡng không thay thế kiểm tra. Đối chiếu tên riêng, số liệu, câu mở/kết, đoạn nhận dạng bất thường và khoảng nghỉ. Giữ phụ đề đúng lời đọc thực tế hoặc làm rõ nếu bản thu đổi nghĩa kịch bản.
6. Kiểm tra 24 cue chỉ đúng với video mẫu; bản mới theo số cue của chính nó. Timestamps phải tăng dần, không âm/chồng lỗi, toàn bộ lời đọc nằm trong video.
7. Cập nhật các điểm chuyển cảnh, nhịp tư thế và sự kiện đạo cụ theo timeline mới; kiểm tra lại trước khi xuất. Để một khoảng kết ngắn tự nhiên, không cắt mất âm cuối hoặc kéo đuôi trống quá lâu.

Đầu ra: timeline mới, SRT đồng bộ, manifest trạng thái `audio_aligned`.

### 9A. Tạo giọng bằng ElevenLabs khi được yêu cầu

1. Dùng `input/loi_dan.txt` đã chốt làm nguồn duy nhất. Kiểm tra nội dung, số liệu, dấu tiếng Việt và chọn giọng phù hợp vai người dẫn. Giọng thử của Tập 2 là **Anh – Warm, Calm and Deep** (`ywBZEqUhld86Jeajq94o`), model **Eleven v4**; đây là bản thử, không mặc định là giọng cố định cho các tập khác.
   Sau khi người dùng nâng cấp ElevenLabs, tạo các mẫu ngắn phù hợp nội dung và để người dùng chốt một giọng chuẩn. Khi đã chốt, lưu tên giọng, Voice ID, model, thông số giọng và trạng thái duyệt trong `Tai_lieu/07_Giong_doc/THONG_SO_GIONG_CHUAN.md`, các tệp mẫu trong `Tai_lieu/07_Giong_doc/mau_thu/`; ưu tiên sử dụng nhất quán cho các tập sau, trừ khi người dùng yêu cầu khác. Trước khi chốt, tiếp tục coi các giọng đã tạo là bản thử.
2. Nếu dùng API, đọc `ELEVENLABS_API_KEY` từ môi trường, không in key, không đưa vào repo hoặc chat. Kết nối và quyền được mô tả tại `Tai_lieu/01_Quy_trinh/KET_NOI_ELEVENLABS.md`. API tạo giọng là thao tác tiêu thụ credit theo chính sách hiện hành; không tự tạo lại nhiều lần vô ích.
3. Khi endpoint và model hỗ trợ, ưu tiên tạo âm thanh kèm mốc ký tự/từ để căn phụ đề. Nếu API trả lỗi, ghi rõ lỗi; không thử lặp liên tục. Với tài khoản dùng cho Tập 2, API trả **HTTP 402 `paid_plan_required`** khi dùng giọng thư viện ở gói miễn phí. Đã tạo được giọng đó bằng giao diện ElevenLabs; không tự nâng gói. Khả năng dùng và chi phí cần kiểm tra tại thời điểm dựng.
4. Nếu dùng giao diện thay API, dán đúng lời dẫn và bảo toàn khoảng trắng giữa các đoạn; chọn đúng giọng/model, tạo và tải tệp audio gốc về `Videos/<ten-tap>/input/`. Ghi trong manifest tên giọng, Voice ID, model, nguồn API hay giao diện và đường dẫn audio; không lưu key. Không gọi quy trình là tự động bằng API khi thực tế phải tạo qua giao diện.
5. Lấy thời lượng và timestamp từ bản thu thực tế. Nếu chỉ có MP3 không kèm timestamp, dùng faster-whisper cục bộ `small`, CPU `int8`, nhận dạng tiếng Việt kèm mốc từ; mẫu Tập 2 tại `Videos/tap-02-ky-luat-la-mot-co-bap/transcribe-elevenlabs.py`. Với phiên bản PyAV không hỗ trợ `metadata_errors`, giải mã và resample MP3 thành mono 16 kHz cho ASR; giữ MP3 gốc để dựng.
6. Lưu `timeline.planned.json`, transcript và timestamp. Dùng `Du_an_Vang/stickman-video/scripts/align_voice.py` với SRT/timestamp thực tế để tạo `timeline.json`, `timeline.ts` và `voice.aligned.srt`. Đối chiếu độ bao phủ và rà thủ công đoạn đầu/cuối, số liệu, tên riêng, dấu và từ ASR nhận sai; không xem tỷ lệ khớp cao là bảo đảm giọng đọc đúng. Tập 2 đạt coverage khoảng 0,976; chưa xác nhận phát âm bằng nghe tai.
7. Cập nhật thời lượng composition, điểm chuyển cảnh, tư thế và đạo cụ theo cue mới; không tăng tốc hoặc cắt âm thanh để ép thời lượng dự kiến. Giữ cảnh cuối theo quy định slogan/logo, bỏ nhãn chờ giọng, xuất H.264/AAC. Kiểm tra video có cả hai stream, audio giải mã được và không im lặng; nghe đối chiếu nếu môi trường cho phép. Nếu không nghe được, nói rõ để người dùng rà phát âm.
8. Giao MP4, audio gốc và SRT đã đồng bộ; cập nhật `asset-manifest.json`, README và danh mục video. Giữ bản dựng trước đó và các bản thu cũ để so sánh. Slogan cuối chỉ hiển thị chữ trừ khi có yêu cầu đọc.

Tài liệu API tham khảo: `https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps`. Mốc hỗ trợ model/chi phí thay đổi theo dịch vụ; kiểm tra lại tài liệu chính thức khi áp dụng.

## 10. Xuất và kiểm tra thành phẩm

Với dự án mẫu, composition là `VangTuongTac`, props audio là `props-giong-doc.json`. Tên composition/props của video mới phải trỏ vào đúng tài nguyên video đó.

```text
node node_modules/typescript/bin/tsc --noEmit
node node_modules/@remotion/cli/remotion-cli.js render src/index.ts <Composition> out/<ten-video>.mp4 --props=<props.json> --browser-executable="<duong-dan-Chrome>" --concurrency=3
```

Đây là mẫu lệnh, thay các chỗ trong ngoặc. Tải dependency hoặc chạy trình duyệt theo cơ chế quyền của môi trường; không mặc định cần người dùng duyệt thêm khi đã có quyền.

- MP4 H.264 với audio AAC; kiểm tra cả hai stream, khả năng giải mã/phát, thời lượng và kích thước. Không chỉ dựa vào exit code thành công.
- Kiểm tra audio không im lặng, không cắt mất đầu/cuối; nghe đối chiếu những đoạn cần xác nhận nếu môi trường có khả năng nghe. Phân biệt kiểm tra số liệu waveform/ASR với việc đã nghe bằng tai, không tuyên bố đã nghe nếu chưa làm.
- Mở video và kiểm tra các cảnh mới/sửa, cue đầu/cuối và đoạn kết trong chính MP4, không chỉ trong ảnh nguồn. Xem lại contact sheet sau các thay đổi ảnh hưởng toàn bố cục.
- Bắt buộc có đoạn slogan cuối video theo mục 12; kiểm tra đủ thời gian đọc, đúng câu và cùng quy chuẩn hình ảnh.
- Bỏ nhãn “bản dựng/chưa có giọng đọc” khi có audio. Không tự thêm nhạc/SFX nếu chưa nằm trong brief; nếu dùng, không để lấn lời dẫn.
- Giao video và SRT đã đồng bộ bằng đường dẫn rõ ràng; ghi thời lượng, độ phân giải, phần đã kiểm tra và giới hạn đáng kể còn lại. Không tự đăng lên nền tảng.

## 11. Sửa theo phản hồi và tiếp tục video sau

Xác định đúng asset/cảnh/thời điểm từ ảnh hoặc mô tả phản hồi. Sửa nguyên nhân ở nguồn: anatomy → sửa ảnh/pose; nền → tách nền; cắt mũ → vùng nhìn; chân nổi → baseline/anchor; phụ đề → font/layout/timing. Rà mọi tư thế có dùng nguồn đó, rồi xuất phiên bản mới để đối chiếu.

Không biến một lỗi đã gặp thành thao tác cứng áp dụng sai cho mọi ảnh. Ví dụ giày màu khác cần cách đo sàn khác; cảnh kết có mũ cao cần vùng nhìn lớn hơn; kịch bản mới cần mapping cue riêng.

Khi người dùng gửi kịch bản mới, bắt đầu ở bước 2 và kế thừa bộ nhân vật/font/phong cách đã chốt. Không yêu cầu họ giải thích lại toàn bộ các quy ước trong tài liệu này.

Mẫu yêu cầu sử dụng:

> Làm video mới theo Tai_lieu/01_Quy_trinh/SAN_XUAT_VIDEO.md và bộ 5 nhân vật chuẩn. Kịch bản: [nội dung]. Giọng đọc sẽ gửi sau. Giữ phong cách video vàng đã duyệt; tạo hành động và tương tác riêng theo kịch bản mới.

## 12. Đoạn slogan kết video

Áp dụng mặc định từ yêu cầu ngày 10/11/2026 cho các video làm tiếp:

- Sau câu kết và cảnh nội dung cuối, hiển thị riêng câu **“Hiểu đúng để đi xa hơn”** trong **3 giây** (90 frame ở 30 fps). Đây là thời lượng mặc định của “đoạn ngắn”; điều chỉnh nếu người dùng yêu cầu.
- Dùng cùng nền giấy và bộ lọc đã chốt trong `Quy_trinh_video/visual-profile.json`. Chữ Be Vietnam Pro 900, màu xanh đậm `#173b50`, 49 px trên khung 720×1280, line-height 1.2, lề ngang tối thiểu 60 px, căn giữa khung. Có thể ngắt thành hai dòng: “Hiểu đúng” / “để đi xa hơn”, giữ nguyên câu và dấu.
- Chữ hiện dần nhẹ trong 10 frame đầu, giữ ổn định đến hết. Đoạn kết gọn, không thêm phụ đề trùng câu, tên tập, biểu đồ hoặc nhãn chờ giọng lên thẻ slogan.
- Khi có logo tổ chức, dùng bản cách điệu `Quy_trinh_video/assets/brand/miracle-logo-cach-dieu.png`, giữ monogram và tên MIRACLE INVESTMENT. Đặt logo 300×300 px trên slogan, cách 38 px, căn giữa cả nhóm trên khung 720×1280; giữ tỷ lệ ảnh. Logo gốc lưu cùng thư mục để đối chiếu.
- Cập nhật nhịp kết theo phản hồi: không tăng tốc video hoặc dồn các tư thế để tới slogan. Chia tư thế theo từ/câu; giữ tư thế cuối khoảng 2 giây sau lời kết (tùy bản thu), mờ cảnh đi trong 0,5 giây cuối và hiện nhóm logo/slogan trong 0,5 giây đầu của thẻ. Khi có logo, 15 frame ở 30 fps thay cho fade 10 frame nói trên. Thẻ vẫn giữ tổng 3 giây. Khoảng giữ là cảnh nhân vật hoàn chỉnh, không phải đuôi trống.
- Đặt sau khi lời đọc kết thúc, giữ trọn âm cuối. Thẻ slogan thay khoảng đuôi trống tạm; không cộng chồng cả đuôi trống lẫn thẻ kết. Tổng duration phải chứa đủ phần nội dung và 3 giây slogan, không cắt lời để ép thời lượng.
- Chỉ hiển thị chữ; không tự tạo giọng đọc slogan hoặc thêm nhạc/SFX. Chỉ đưa slogan vào SRT lời đọc khi bản thu người dùng thực sự đọc câu này.
- Lập một cảnh `outro` riêng trong storyboard/timeline dựng, neo sau phần nội dung và lời đọc; không thêm slogan vào `input/loi_dan.txt` một cách tự động. Kiểm tra khung đầu/cuối của outro và chính MP4 sau xuất.

Các video đã xuất giữ nguyên nếu người dùng chưa yêu cầu xuất lại; khi dựng tiếp hoặc xuất bản hoàn chỉnh tiếp theo, áp dụng đoạn kết này.



