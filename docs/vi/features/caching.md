# Chiến lược bộ nhớ đệm

Tối ưu hóa hiệu suất với hỗ trợ <VocabLink category="backend-apis" term="caching" text="bộ nhớ đệm" /> tích hợp cho cả môi trường cục bộ và phân tán.


## Redis (Bộ nhớ đệm được phân phối)

Sự lựa chọn tiêu chuẩn cho các dịch vụ vi mô sản xuất.

- **Khách hàng**: Được hỗ trợ bởi`ioredis`.
- **Kết nối**: Máy khách đơn lẻ được cấu hình sẵn với tính năng tự động kết nối lại và thử lại logic.
- **Cơ sở hạ tầng**:`docker-compose.yml`bao gồm dịch vụ Redis sẵn sàng sử dụng.

## Bộ nhớ đệm (Cục bộ đệm)

Hoàn hảo cho các dịch vụ nhỏ hoặc tạo mẫu nhanh.

- **Khách hàng**: Được hỗ trợ bởi`node-cache`.
- **Lợi ích**: Bộ nhớ đệm không phụ thuộc nằm trực tiếp trong RAM của ứng dụng.
- **Giao diện**: Chia sẻ sự trừu tượng hóa nội bộ tương tự như Redis, giúp dễ dàng trao đổi sau này.

## Cách sử dụng trong Kiến trúc

- **MVC**: Logic bộ nhớ đệm được đưa trực tiếp vào bộ điều khiển để phát triển nhanh chóng.
- **Kiến trúc sạch**: Được tích hợp vào **UseCase** để giữ cho logic miền luôn rõ ràng đồng thời hưởng lợi từ việc tăng hiệu suất.