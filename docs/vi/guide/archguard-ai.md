# Đánh giá Mã nguồn với ArchGuard AI

Khi xây dựng các microservices chuẩn môi trường sản xuất, việc duy trì tính toàn vẹn của kiến trúc cũng quan trọng không kém gì việc viết code chạy đúng. Các công cụ phân tích tĩnh truyền thống (như ESLint hay SonarQube) rất tuyệt vời để bắt lỗi cú pháp, nhưng chúng không thể ép buộc các nguyên tắc **Kiến trúc Sạch (Clean Architecture)**, **Tính nới lỏng (Decoupling)** hay **Domain-Driven Design (DDD)**.

Đó là lý do **[ArchGuard AI Reviewer](https://github.com/marketplace/actions/archguard-ai-reviewer)** ra đời.

ArchGuard AI là một GitHub Action hoàn toàn miễn phí, tích hợp AI bản địa, được chạy trên Cloudflare Workers AI. Nó tự động kiểm duyệt các Pull Request của bạn để phát hiện các lỗ hổng bảo mật và sai phạm kiến trúc.

## Tại sao nên dùng ArchGuard AI?

- **Hàng rào Kiến trúc**: Nó đảm bảo rằng tầng Presentation (Controllers) của bạn không bị rò rỉ sang tầng Infrastructure (Databases), ép buộc ranh giới nghiêm ngặt của Kiến trúc Sạch mà boilerplate này cung cấp.
- **Không cần cấu hình**: Hỗ trợ sẵn sàng cho Node.js Quickstart Generator ngay từ đầu.
- **Hỗ trợ ChatOps**: Bạn có thể tương tác trực tiếp với AI trên Pull Request bằng cách tag `@archguard-ai`.
- **Miễn phí 100%**: Sử dụng Serverless AI (Llama 3) qua Cloudflare Gateway, nghĩa là bạn không cần phải cung cấp API key của OpenAI.

## Hướng dẫn Thiết lập

Thêm ArchGuard vào dự án của bạn mất chưa đến một phút.

1. Tạo một file GitHub Actions workflow mới: `.github/workflows/archguard-audit.yml`
2. Thêm cấu hình sau:

```yaml
name: ArchGuard AI Review

on:
  pull_request:
    types: [opened, synchronize]
  issue_comment:
    types: [created]

jobs:
  archguard-review:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write # Bắt buộc để ArchGuard có quyền bình luận trên PR
      contents: read       # Bắt buộc để đọc diff của PR
      id-token: write      # Bắt buộc cho xác thực Zero-Trust
    steps:
      - name: Run ArchGuard AI Auditor
        uses: archguard-labs/action@main
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Cách sử dụng ChatOps

ArchGuard AI hoạt động như một Kiến trúc sư Phần mềm Cấp cao cá nhân của bạn. Nếu bạn có câu hỏi về những nhận xét của nó trên một Pull Request, chỉ cần tag nó trong một comment:

> `@archguard-ai Bạn có thể giải thích tại sao đoạn này vi phạm nguyên tắc Tight Coupling không?`

AI sẽ phản hồi trực tiếp câu hỏi của bạn dựa trên bối cảnh của Pull Request. Nếu bạn cần nó đánh giá lại code sau khi bạn đẩy code mới, chỉ cần nói:

> `@archguard-ai pls re-check`

## Áp đặt Quy tắc riêng của Công ty

Nếu đội ngũ của bạn có các quy ước kiến trúc cụ thể (ví dụ: "Tất cả DTOs phải sử dụng thư viện `class-validator`"), bạn có thể tạo một file `.archguardrules` ở thư mục gốc của kho lưu trữ. 

ArchGuard AI sẽ tự động đọc file này và áp dụng nghiêm ngặt các quy tắc tùy chỉnh của bạn trong quá trình đánh giá PR!