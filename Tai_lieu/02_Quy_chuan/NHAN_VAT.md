# Bộ tham chiếu nhân vật chuẩn

Quy chuẩn nền, màu chữ và thông số khung hình hiện hành: `Tai_lieu/02_Quy_chuan/HINH_ANH.md` (bản Trương Phi ngay trước v4, chốt 10/11/2026). Năm ảnh nhân vật hiện nằm trong thư mục `Tai_lieu/05_Nhan_vat/`.

Phong cách cơ sở: video `Du_an_Vang/video-remotion/out/ban-chat-cua-vang-hoan-chinh.mp4` đã được người dùng duyệt về hình ảnh/phong cách. Bộ ảnh trong `Tai_lieu/05_Nhan_vat/` được dựng lại từ bảng nhân vật gốc và khung hình video này bằng imagegen tích hợp.

| Nhân vật | Ảnh chuẩn trong `Tai_lieu/05_Nhan_vat/` | Đặc điểm nhận diện |
|---|---|---|
| Trương Phi | `Truong_Phi_tham_chieu.png` | Mũ xanh–vàng, lông đỏ, râu xoăn đen, giáp sư tử, khăn và áo choàng đỏ |
| Quan Vân Trường | `Quan_Van_Truong_tham_chieu.png` | Mặt đỏ, mũ khăn xanh, râu dài, giáp rồng xanh–vàng |
| Gia Cát Lượng | `Gia_Cat_Luong_tham_chieu.png` | Mũ quân sư xanh lam–vàng, tóc dài, ria và râu nhọn, áo trắng–lam, quạt lông |
| Lưu Bị | `Luu_Bi_tham_chieu.png` | Mũ xanh đậm–vàng, ria và râu nhọn, áo kem–vàng, áo choàng xanh, cuộn tài liệu |
| Triệu Tử Long | `Trieu_Tu_Long_tham_chieu.png` | Mũ và giáp bạc, lông trắng, khăn lam, mặt trẻ không râu, áo choàng trắng–lam |

Triệu Tử Long chưa xuất hiện trong video hiện tại; ảnh chuẩn của nhân vật này được phối theo cùng phong cách từ bảng gốc người dùng cung cấp. Tên “Võ tướng tài chính” trong nguồn cũ tương ứng Trương Phi; “Quân sư tài chính” tương ứng Gia Cát Lượng.

Triệu Tử Long đã được chỉnh lại theo cả bốn ảnh chuẩn của nhóm: thân chibi đầy đặn, tay có giáp/vambrace, bàn tay màu da, chân ngắn chắc, nét viền đậm và giáp nhiều lớp có độ sâu. Dùng bản hiện tại trong `Tai_lieu/05_Nhan_vat/`. Bản trước khi đồng bộ được lưu trong `Tai_lieu/05_Nhan_vat/luu_tru/Trieu_Tu_Long_truoc_dong_bo_phong_cach.png`.

## Quy chuẩn cho các video tiếp theo

- Chibi 2D, đầu lớn, thân nhỏ; chân tay đơn giản, giày tối màu; trang phục giữ nét và hoa văn chính từ ảnh chuẩn.
- Viền đậm màu xanh đen, tô màu rõ, đổ bóng cel nhẹ; giữ màu mũ, giáp, áo choàng và đặc điểm râu của từng người.
- Dùng góc chính diện, ba phần tư, nghiêng và sau lưng từ ảnh chuẩn khi dựng tư thế. Không đổi tỷ lệ cơ thể giữa các góc.
- Mỗi nhân vật có đúng hai tay. Tay gắn với tay áo/giáp và phải hợp với tư thế cầm đạo cụ; kiểm tra toàn bộ khung hành động.
- Tài sản nhân vật đưa vào video cần nền trong suốt sạch, không bóng oval xanh, không ô nền trắng hay viền sáng.
- Căn chân theo mặt đất, để đủ khoảng trống trên mũ và đạo cụ. Các nhân vật trong cảnh phải có ánh nhìn và động tác hướng về nhau/đạo cụ liên quan.
- Bộ ảnh mới là tham chiếu tạo hình, không phải rig hoạt họa. Khi tạo asset từ các ảnh này cần kiểm tra lại anatomy và tính nhất quán.

## Mô tả đã dùng để tạo bộ ảnh

Mỗi ảnh là một model sheet riêng: bốn góc toàn thân ở hàng trên (chính diện, ba phần tư, nghiêng, sau lưng), sáu biểu cảm đầu ở hàng dưới (bình thường, vui, giận, ngạc nhiên, lo lắng, suy nghĩ), nền kem ấm, không chữ hay bóng chân. Từng nhân vật dùng bảng gốc của chính họ và khung hình video đã duyệt làm tham chiếu phong cách. Ảnh được tạo bằng công cụ imagegen tích hợp, không dùng API ngoài.



