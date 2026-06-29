# Quy trình phát hành (Release Process)

Tài liệu này phác thảo các bước để phát hành một phiên bản mới cho dự án `nodejs-quickstart-structure`.

## 1. Cập nhật nhật ký thay đổi (Changelog)

Trước khi phát hành, cập nhật `CHANGELOG.md`:
1. Tạo một tiêu đề mới cho phiên bản mới (ví dụ: `## [1.4.6] - 2026-02-12`).
2. Ghi lại các tính năng mới, lỗi đã sửa và các thay đổi.
3. Lưu tệp lại.

## 2. Commit Changelog

Thêm thay đổi của `CHANGELOG.md` vào khu vực chuẩn bị (stage) nhưng **chưa commit vội** nếu bạn muốn gộp nó vào commit tăng số phiên bản.

```bash
git add CHANGELOG.md
```

## 3. Tăng số phiên bản & Tạo thẻ tag

Chạy lệnh `npm version` tương ứng. Việc này giả định bạn đang có thư mục làm việc sạch sẽ (sau khi đã stage `CHANGELOG.md`).

```bash
npm version patch   # Cho các bản vá sửa lỗi (1.4.5 -> 1.4.6)
npm version minor   # Cho các tính năng mới (1.4.5 -> 1.5.0)
npm version major   # Cho các thay đổi lớn phá vỡ tương thích (1.4.5 -> 2.0.0)
```

*Lưu ý: Lệnh này tự động cập nhật `package.json`, tạo một git commit với số phiên bản mới, và tạo một git tag tương ứng (ví dụ: `v1.4.6`).*

## 4. Đẩy các thay đổi & Thẻ tag lên GitHub

Đẩy commit mới và thẻ tag mới lên GitHub:

```bash
git push origin main
git push origin --follow-tags
```

## 5. Xuất bản lên NPM (Tùy chọn)

Nếu bạn xuất bản gói này lên npm registry:

```bash
npm publish
```