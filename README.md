# Video AI — bắt đầu tại đây

**[Mở chỉ mục tài liệu](Tai_lieu/README.md)** · **[Danh mục video](Videos/README.md)**

Bàn giao giữa các phiên: [Trạng thái hiện tại](Quan_ly_du_an/TRANG_THAI.md) · [Đồng bộ GitHub](Quan_ly_du_an/DONG_BO.md).

| Cần làm gì? | Mở ở đâu? |
|---|---|
| Làm video mới hoặc sửa video | [Quy trình sản xuất](Tai_lieu/01_Quy_trinh/SAN_XUAT_VIDEO.md) |
| Sửa nền, font, màu chữ, logo, slogan | [Quy chuẩn hình ảnh](Tai_lieu/02_Quy_chuan/HINH_ANH.md) và [cấu hình dùng khi dựng](Quy_trinh_video/visual-profile.json) |
| Tìm ảnh nhân vật | [Thư viện nhân vật](Tai_lieu/05_Nhan_vat/README.md) và [quy chuẩn tạo hình](Tai_lieu/02_Quy_chuan/NHAN_VAT.md) |
| Xem tính cách và tương tác | [Đặc tả nhân vật](Tai_lieu/08_Dac_ta_nhan_vat/README.md) |
| Tìm bìa / mẫu mở đầu | [Thư viện bìa](Tai_lieu/06_Bia/README.md) |
| Tìm giọng đọc và thông số | [Thư viện giọng đọc](Tai_lieu/07_Giong_doc/README.md) |
| Chuẩn bị brief, phân cảnh, yêu cầu ảnh | [Biểu mẫu](Tai_lieu/03_Bieu_mau/README.md) |
| Cập nhật hoặc bổ sung quy chuẩn | [Cách quản lý tài liệu](Tai_lieu/04_Quan_ly/CAP_NHAT_TAI_LIEU.md) |
| Tìm bản video hiện hành và SRT | [Danh mục video](Videos/README.md) |

```text
Video AI/
├── Tai_lieu/                Tài liệu chung, nguồn chính để đọc và sửa
│   ├── 01_Quy_trinh/        Cách sản xuất video
│   ├── 02_Quy_chuan/        Nhân vật, hình ảnh và bố cục
│   ├── 03_Bieu_mau/         Mẫu dùng khi tạo tập mới
│   ├── 04_Quan_ly/          Hướng dẫn cập nhật, nhật ký thay đổi
│   ├── 05_Nhan_vat/         Năm ảnh tham chiếu nhân vật chuẩn
│   ├── 06_Bia/              Ảnh bìa, thumbnail và mẫu mở đầu
│   ├── 07_Giong_doc/         Mẫu giọng và thông số sau khi chốt
│   └── 08_Dac_ta_nhan_vat/  Hồ sơ, vai trò và tính cách từng nhân vật
├── Quy_trinh_video/         Cấu hình máy đọc và tài nguyên chung
│   ├── visual-profile.json Nền, màu, chữ và đoạn kết
│   └── assets/             Nền chuẩn, logo gốc và logo cách điệu
├── Videos/                 Kịch bản, tài liệu, SRT, QA và MP4 theo từng tập
├── Du_an_Vang/             Môi trường Remotion, repo và video vàng ban đầu
├── Demo_HyperFrames/       Thử nghiệm, chưa áp dụng sản xuất
└── .agents/                Skill cho Codex
```

Hai tệp `QUY_TRINH_SAN_XUAT_VIDEO.md`, `QUY_CHUAN_NHAN_VAT.md` tại gốc chỉ dẫn về tài liệu chính; không sửa nội dung quy chuẩn trong các tệp chỉ dẫn này.

