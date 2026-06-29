# Phát triển Hỗ trợ AI (AI-Native)

Trình tạo này được thiết kế và tối ưu cho kỷ nguyên AI. Chúng tôi cung cấp ngữ cảnh chuyên dụng để giúp các tác nhân AI như **Cursor**, **ChatGPT** và **Claude** hiểu sâu sắc về dự án của bạn.

## .cursorrules (Dành cho Người dùng Cursor)

Khi bạn mở dự án được tạo của mình trong **Cursor**, trình soạn thảo sẽ tự động đọc tệp `.cursorrules` ở thư mục gốc.

- **Thực thi Tự động**: Hướng dẫn AI tuân theo kiến trúc đã chọn (MVC hoặc Clean Architecture).
- **Rào cản Chất lượng**: Chỉ dẫn AI duy trì độ bao phủ kiểm thử tối thiểu 80% cho mã nguồn mới viết.
- **Nhận thức Ngữ cảnh**: Được định cấu hình sẵn với các lựa chọn công nghệ cụ thể của bạn (ví dụ: "Đây là dự án TypeScript MVC sử dụng PostgreSQL").

## Mẫu Kỹ năng Tác nhân (thư mục prompts/)

Hãy kiểm tra thư mục `prompts/` trong thư mục gốc của dự án để tìm các mẫu prompt (nhắc nhở) đã được tối ưu hóa cao.

- **project-context.md**: Một prompt tổng thể cho bất kỳ LLM nào để hiểu toàn bộ cấu trúc kho lưu trữ.
- **add-feature.md**: Hướng dẫn để AI thêm các tính năng mới tuân theo các mẫu thiết kế hiện có của dự án.
- **troubleshoot.md**: Giúp AI chẩn đoán nhanh các vấn đề thường gặp trong bộ công nghệ cụ thể này.

## Mẹo nhỏ: Tùy chỉnh Quy tắc AI của bạn

Bạn có thể (và nên!) cập nhật phần giữ chỗ **Project Goal (Mục tiêu Dự án)** trong tệp `.cursorrules` để mô tả lĩnh vực nghiệp vụ cụ thể của bạn. Điều này giúp AI đưa ra các gợi ý mã nguồn phù hợp hơn nhiều đối với trường hợp sử dụng độc nhất của bạn.