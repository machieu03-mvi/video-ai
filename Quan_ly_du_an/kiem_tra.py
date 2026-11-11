"""Báo cáo Git và quét sơ bộ; chỉ đọc, không fetch/commit/push hoặc sửa tệp."""
from pathlib import Path
import os
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
TEXT_EXT = {'.py', '.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.md', '.txt', '.yaml', '.yml', '.toml', '.html', '.css', '.sh', '.ps1', '.srt', '.xml', '.ini', '.cfg'}
RULES = [
    re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    re.compile(rb'gh[pousr]_[A-Za-z0-9]{30,}'),
    re.compile(rb'github_pat_[A-Za-z0-9_]{30,}'),
    re.compile(rb'(?i)(?:xi-api-key|elevenlabs_api_key|api[_-]?key|access[_-]?token|password)\s*[:=]\s*[\x22\x27][A-Za-z0-9_\-]{24,}[\x22\x27]'),
]


def git(*args):
    return subprocess.run(['git', '-C', str(ROOT), *args], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)


def names(data):
    return [os.fsdecode(p) for p in data.split(b'\0') if p]


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    root = git('rev-parse', '--show-toplevel')
    if root.returncode or Path(os.fsdecode(root.stdout.strip())).resolve() != ROOT.resolve():
        print('Chưa có Git tại thư mục gốc; chưa có trạng thái đồng bộ để kiểm tra.')
        return 2
    status = git('status', '--short', '--branch')
    print(status.stdout.decode('utf-8', errors='replace').rstrip())
    remote = git('remote', '-v')
    print('Remote:', 'đã cấu hình (kiểm tra riêng bằng git remote -v)' if remote.stdout.strip() else 'chưa cấu hình')
    result = git('ls-files', '--cached', '--others', '--exclude-standard', '-z')
    staged_result = git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z')
    if result.returncode or staged_result.returncode or status.returncode:
        print('Không đọc được danh sách Git; dừng kiểm tra.')
        return 2
    paths = set(names(result.stdout))
    staged = set(names(staged_result.stdout))
    findings, too_big, unreadable = set(), [], []
    for name in sorted(paths | staged):
        path = ROOT / name
        try:
            if path.is_file():
                size = path.stat().st_size
                if size >= 90 * 1024 * 1024:
                    too_big.append(name)
                if size <= 2 * 1024 * 1024 and (path.suffix.lower() in TEXT_EXT or path.name.startswith('.env')):
                    if any(rule.search(path.read_bytes()) for rule in RULES):
                        findings.add(name + ' (bản làm việc)')
            if name in staged and (path.suffix.lower() in TEXT_EXT or path.name.startswith('.env')):
                spec = ':' + name.replace('\\', '/')
                length = git('cat-file', '-s', spec)
                if length.returncode == 0 and int(length.stdout.strip()) <= 2 * 1024 * 1024:
                    blob = git('cat-file', 'blob', spec)
                    if blob.returncode == 0 and any(rule.search(blob.stdout) for rule in RULES):
                        findings.add(name + ' (đã stage)')
        except (OSError, ValueError):
            unreadable.append(name)
    print(f'Đã xét {len(paths)} đường dẫn Git; {len(staged)} đường dẫn đang stage.')
    for title, items in [('Nghi có bí mật', sorted(findings)), ('Tệp từ 90 MiB trở lên', too_big), ('Không đọc được', unreadable)]:
        if items:
            print(title + ':')
            for item in items:
                print(' - ' + item)
    diff = git('diff', '--cached', '--check')
    if diff.returncode:
        print('Git báo lỗi whitespace hoặc xung đột trong phần stage; xem git diff --cached --check.')
    print('Quét giới hạn mẫu/tệp văn bản ≤2 MiB; không thay thế rà thủ công, quét chuyên dụng hoặc duyệt dữ liệu.')
    return 1 if findings or too_big or unreadable or diff.returncode else 0


if __name__ == '__main__':
    sys.exit(main())
