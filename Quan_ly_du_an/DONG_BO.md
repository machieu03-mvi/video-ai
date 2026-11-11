# Đồng bộ và bàn giao giữa các tài khoản

## Nguyên tắc

GitHub và ChatGPT là hai tài khoản độc lập. Mỗi người có tài khoản GitHub riêng được cấp quyền vào repo **private**, không chia sẻ tài khoản ChatGPT hay token. Công cụ chỉ đọc tại `python Quan_ly_du_an/kiem_tra.py`; tự động cập nhật tài liệu là quy tắc cho Codex, không phải tiến trình nền hay bảo đảm khi phiên bị ngắt đột ngột. Lưu công việc theo mốc, chủ động yêu cầu bàn giao trước khi hết hạn mức. Không bao giờ force push, reset --hard, tự giải quyết xung đột hoặc ghi đè thay đổi của người khác.

## Chuẩn bị trên máy đầu tiên — chỉ sau khi được phê duyệt

1. Repo `machieu03-mvi/video-ai` đã được tạo **private** và nhận commit đầu; chủ dự án cấp quyền cho từng tài khoản qua giao diện GitHub khi cần; có thể bật bảo vệ nhánh. Xác minh trạng thái private và quyền trước khi đưa mã lên. Chưa có GitHub CLI trên máy này tại thời điểm thiết lập.
2. Git gốc đã được khởi tạo trên nhánh `main`; không chạy lại bước này trên repo đã có lịch sử. Cấu hình danh tính Git cá nhân bằng `git config user.name` và `git config user.email`. Không nhập token vào lệnh, URL remote, file hay hội thoại; dùng trình quản lý xác thực hoặc SSH của từng người.
3. Chạy `python Quan_ly_du_an/kiem_tra.py`, kiểm tra `git status --short --ignored`, đọc kỹ các tệp định đưa lên, quét bí mật bằng công cụ phù hợp. Script chỉ là lớp kiểm tra mẫu, không chứng minh không có bí mật. Dữ liệu nội bộ dù repo private vẫn cần chủ sở hữu xem xét.
4. Stage có chọn lọc, `git diff --cached --check`, `git diff --cached --stat`, chạy lại `python Quan_ly_du_an/kiem_tra.py`. Tự kiểm tra nội dung diff và test liên quan. Bảo đảm mọi file cần dùng nằm trong repo hoặc có phương án chuyển riêng. Commit tại mốc phù hợp, không commit các dữ liệu không được phép.
5. `origin` và upstream `main` đã được cấu hình sau lần push đầu. Với các lần đồng bộ sau, xác nhận remote, trạng thái và lịch sử hai phía, sau đó push nhánh phù hợp khi được phép; không ghi đè thay đổi người khác hoặc force push. Nếu có commit từ người khác, xử lý lịch sử thực tế trước khi push.

Không đưa repo `Du_an_Vang/stickman-video/.git` vào repo gốc hay stage một repo lồng như thư mục thông thường. Clone lại đúng commit theo mục khôi phục bên dưới. Mọi thay đổi ở repo lồng cần được bàn giao riêng; file chưa theo dõi `scripts/check_elevenlabs.py` đã có bản sao ở `Quy_trinh_video/kiem-tra-elevenlabs.py`.

## Tiếp nhận trên máy/tài khoản khác

1. Người dùng được cấp quyền clone repo private bằng xác thực GitHub riêng. Trong thư mục clone, đọc `AGENTS.md`, `Quan_ly_du_an/TRANG_THAI.md`, tài liệu liên quan tới việc đang làm và chạy `python Quan_ly_du_an/kiem_tra.py`. Lịch sử chat không được chuyển tự động.
2. Khi có thay đổi cục bộ, dừng để đánh giá, không tự ghi đè hay tự stash. Trên workspace sạch, `git fetch origin`, kiểm tra `git status -sb`, `git log --oneline --left-right HEAD...@{upstream}` (đặt trong dấu nháy trên PowerShell). Chỉ `git pull --ff-only` nếu đúng nhánh, upstream đáng tin và có thể fast-forward; khi lệch nhánh, chưa có upstream hoặc xung đột, dừng và xử lý rõ ràng.
3. Clone repo phụ từ `https://github.com/nispa/stickman-video.git` vào `Du_an_Vang/stickman-video`, sau đó checkout commit `c2ede0f707559bf9e3d207c3902d64bf3affe8ae` nếu còn tồn tại. Kiểm tra URL, giấy phép và hash. Clone commit này không bao gồm thay đổi cục bộ hoặc script chưa theo dõi của máy cũ; dùng bản sao trong `Quy_trinh_video/`. Nếu có sửa repo phụ cần bàn giao riêng kèm diff/commit và kiểm tra giấy phép; không tự đẩy lên upstream.
4. Cài Node.js, pnpm và Python phù hợp với môi trường, rồi chạy `pnpm install --frozen-lockfile` trong `Du_an_Vang/video-remotion`; cài các phụ thuộc Python cần thiết trong virtualenv riêng khi cần. Các phiên bản Node/pnpm/Python đã kiểm chứng trên máy mới: **chưa xác định**. Nếu cài lỗi, ghi lỗi và xử lý, không tự cập nhật lockfile để che lỗi.
5. Nhận MP4, WAV/MP3 và các tệp bị bỏ qua qua kênh riêng được chủ dự án cho phép; kiểm tra đường dẫn, dung lượng và checksum. File giọng hoặc tư liệu gốc không có sẵn thì không tuyên bố có thể tái dựng đầy đủ. Thiết lập biến `ELEVENLABS_API_KEY` riêng khi cần, không chép khóa từ máy cũ.
6. Tạo nhánh công việc từ nhánh chính đã cập nhật; trong lúc làm, cập nhật `TRANG_THAI.md` theo mốc, kiểm thử, kiểm tra diff. Khi cần tích hợp, push nhánh sau khi được phép và tạo Pull Request; người có quyền kiểm tra và merge. Chính sách PR/branch protection chỉ có hiệu lực nếu được cấu hình thực sự trên GitHub.

## Bàn giao ngược

Người làm hiện tại ghi rõ mốc đã xong, kiểm thử, lỗi, nhánh, commit và bước kế tiếp; tách bí mật và file ngoài Git, chạy script kiểm tra và rà diff. Chỉ commit/push những thay đổi đã kiểm tra và được phép. Người nhận quay lại làm theo quy trình tiếp nhận ở trên, đọc trạng thái mới nhất, fetch và cập nhật an toàn; nếu còn việc chưa push, phải chuyển riêng hoặc đợi người trước đồng bộ. Một file trạng thái chưa commit/push không tự xuất hiện ở máy khác.

## Khi lỗi hoặc xung đột

Giữ nguyên workspace và thông báo lệnh/lỗi, nhánh và trạng thái; không tự xóa lịch sử, dùng force push hay ghi đè file. Nếu có secret trong commit, ngừng push; nếu đã push, thu hồi/đổi khóa ngay và xử lý lịch sử theo quy trình chủ sở hữu. Mất mạng, thiếu quyền, tệp lớn hoặc clone repo phụ không được thì báo cụ thể và tiếp tục phần độc lập. Cần sao lưu riêng các bản thu, đầu ra, tư liệu và các file bị ignore.
