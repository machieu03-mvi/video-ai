# Sửa và bổ sung tài liệu

[Về chỉ mục](../README.md)

## Tìm đúng nơi sửa

| Nội dung thay đổi | Nguồn chính |
|---|---|
| Các bước làm video, audio, kiểm tra và bàn giao | `Tai_lieu/01_Quy_trinh/SAN_XUAT_VIDEO.md` |
| Diện mạo nhân vật, yêu cầu tạo hình | `Tai_lieu/02_Quy_chuan/NHAN_VAT.md` |
| Nền, màu, font, logo và bố cục | `Tai_lieu/02_Quy_chuan/HINH_ANH.md` + `Quy_trinh_video/visual-profile.json` |
| Ảnh nền hoặc logo dùng chung | `Quy_trinh_video/assets/` |
| Mẫu brief, storyboard, prompt | `Tai_lieu/03_Bieu_mau/` |
| Kịch bản, hành động hoặc thời gian của một tập | Thư mục riêng trong `Videos/` |
| Code render và các công cụ kỹ thuật | `Du_an_Vang/video-remotion/` hoặc `Du_an_Vang/stickman-video/` |

## Quy tắc cập nhật

1. Sửa tài liệu chính, không tạo thêm bản `moi`, `final`, `final2` cho cùng một quy chuẩn.
2. Nếu đổi thông số hình ảnh, cập nhật cả Markdown và JSON; kiểm tra JSON đọc được và xem lại cảnh mẫu/MP4 liên quan.
3. Lưu tài nguyên mới với tên phiên bản khi còn thử; khi chốt, ghi rõ tệp hiện hành và bản đối chiếu trong README/manifest. Không suy ra “bản được duyệt” chỉ từ tên v4 hoặc ngày sửa.
4. Ghi ngày, nội dung và phạm vi thay đổi vào `LICH_SU_THAY_DOI.md`. Phân biệt thay đổi dùng chung và thay đổi chỉ cho một tập.
5. Khi thay thành phẩm hiện hành, cập nhật README của tập, `asset-manifest.json` và danh mục `Videos/README.md`. Không thay video đã xuất ở một đường dẫn mà vẫn mô tả cấu hình cũ.
6. Khi di chuyển tệp, kiểm tra tham chiếu trong code, script và tài liệu; sửa liên kết hoặc đặt tệp chỉ dẫn khi cần tương thích. Không di chuyển `public`, `src`, `node_modules`, môi trường audio hoặc ảnh chuẩn chỉ để dọn tài liệu.

## Tổ chức một tập

Giữ cấu trúc đang dùng: `input/` cho kịch bản và bản thu, `src/` cho timeline/SRT, `qa/` cho ảnh kiểm tra, `out/` cho MP4. Các tệp `brief.md`, `storyboard.json`, `prompts.json`, `asset-manifest.json` và `README.md` nằm ở gốc thư mục tập để dễ đối chiếu. Phiên bản nhân vật riêng đặt trong thư mục con, ví dụ `ban-truong-phi/`.

Bản ghi âm gốc và tệp đầu vào không ghi đè; SRT tạm phải ghi rõ là mốc dự kiến. Thành phẩm có audio được đánh dấu riêng với bản hình chờ giọng.
