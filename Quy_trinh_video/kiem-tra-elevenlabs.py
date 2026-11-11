"""Kiểm tra xác thực ElevenLabs, không tạo giọng hoặc in API key."""
import json
import os
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    key = os.environ.get('ELEVENLABS_API_KEY', '').strip()
    if not key:
        print('Chưa có ELEVENLABS_API_KEY trong môi trường chạy. Hãy thiết lập biến và mở lại Codex.')
        return 2
    request = Request('https://api.elevenlabs.io/v1/user', headers={
        'xi-api-key': key,
        'Accept': 'application/json',
    })
    try:
        with urlopen(request, timeout=20) as response:
            data = json.load(response)
    except HTTPError as exc:
        if exc.code in (401, 403):
            print(f'Xác thực hoặc quyền truy cập không thành công (HTTP {exc.code}); kiểm tra API key và quyền User.')
        else:
            print(f'ElevenLabs trả về HTTP {exc.code}; thử lại sau.')
        return 1
    except (URLError, TimeoutError, OSError):
        print('Không kết nối được tới ElevenLabs; kiểm tra mạng hoặc cấu hình truy cập.')
        return 1
    except (ValueError, json.JSONDecodeError):
        print('Phản hồi ElevenLabs không hợp lệ.')
        return 1
    if not isinstance(data, dict) or not data.get('user_id'):
        print('Không xác nhận được tài khoản từ phản hồi ElevenLabs.')
        return 1
    print('Đã xác thực tài khoản ElevenLabs thành công. Chưa chọn giọng và chưa tạo âm thanh.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
