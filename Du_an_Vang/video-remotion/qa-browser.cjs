// Chọn trình duyệt cho các script QA/xuất mẫu trên mọi hệ điều hành.
// Ưu tiên biến môi trường CHROME_PATH; nếu không có, dùng Chrome cài sẵn ở vị trí
// mặc định của Windows/macOS/Linux. Trả về null khi không tìm thấy để Remotion
// tự tải Chrome Headless Shell (Playwright dùng Chromium riêng của nó).
const fs = require('fs');

const DEFAULTS = {
  win32: ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'],
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'],
};

function browserExecutable() {
  const fromEnv = process.env.CHROME_PATH;
  if (fromEnv) {
    if (!fs.existsSync(fromEnv)) throw new Error(`CHROME_PATH không tồn tại: ${fromEnv}`);
    return fromEnv;
  }
  return (DEFAULTS[process.platform] || []).find((p) => fs.existsSync(p)) || null;
}

module.exports = {browserExecutable};
