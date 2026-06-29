# Công việc Nền & Hàng đợi Nhiệm vụ (BullMQ)

Node.js Quickstart Generator cung cấp tính năng hỗ trợ tích hợp sẵn cho **Công việc Nền Doanh nghiệp (Enterprise Background Jobs)** sử dụng `BullMQ` và `Redis`. Hệ thống tự động thiết lập các hàng đợi (queues), các worker và bảng điều khiển giám sát trực quan (`Bull-Board`) trong dự án của bạn, giúp kiến trúc luôn phân tách (decoupled) và có khả năng mở rộng cao.

## Tại sao cần Công việc Nền?
Việc xử lý các tác vụ tốn thời gian một cách đồng bộ sẽ làm chặn Event Loop của Node.js, làm giảm mạnh hiệu năng và băng thông xử lý của ứng dụng.

**Các trường hợp sử dụng phổ biến:**
- Gửi Email / Thông báo.
- Xử lý hình ảnh hoặc video.
- Tạo báo cáo PDF dung lượng lớn.
- Tương tác với các API của bên thứ ba bị giới hạn tần suất (Rate-limited APIs).

## Kiến trúc được tạo ra
Nếu bạn bật tính năng Công việc Nền (`--background-jobs`), trình tạo sẽ sinh ra cấu trúc sau trong thư mục `src/utils/queues` (đối với MVC) hoặc `src/infrastructure/queues` (đối với Clean Architecture):

- `emailQueue.ts`: Định nghĩa kết nối tới Redis và thực thể Hàng đợi (Queue instance).
- `emailWorker.ts`: Worker lắng nghe hàng đợi và xử lý công việc bất đồng bộ.
- `queueBoard.ts`: Tự động cấu hình `@bull-board/express`, cung cấp giao diện quản trị để xem trạng thái các công việc.

### Luồng Kiến trúc

![Background Jobs Flow Diagram](/backgound-job.png)

## Hướng dẫn Sử dụng

### 1. Thêm công việc vào Hàng đợi (Enqueue)
Bạn có thể đẩy một công việc vào hàng đợi từ Controllers hoặc các Use Cases:
::: code-group

```typescript [TypeScript]
import { emailQueue } from '@/utils/queues/emailQueue';

// Ví dụ: POST /api/health/test-job (Endpoint kiểm thử)
export const sendWelcomeEmail = async (req: unknown, res: unknown) => {
  const { email } = req.body;
  
  // Đẩy công việc vào hàng đợi nền
  await emailQueue.add('send-welcome-email', { email, template: 'welcome' });
  
  res.status(200).json({ message: 'Email đã được lên lịch gửi đi' });
};
```

```javascript [JavaScript]
import { emailQueue } from '../utils/queues/emailQueue.js';

// Ví dụ: POST /api/health/test-job (Endpoint kiểm thử)
export const sendWelcomeEmail = async (req, res) => {
  const { email } = req.body;
  
  // Đẩy công việc vào hàng đợi nền
  await emailQueue.add('send-welcome-email', { email, template: 'welcome' });
  
  res.status(200).json({ message: 'Email đã được lên lịch gửi đi' });
};
```

:::

### 2. Xử lý công việc (Worker)
Chỉnh sửa tệp `emailWorker.ts` để thêm logic nghiệp vụ thực tế của bạn:
::: code-group

```typescript [TypeScript]
import { Worker, Job } from 'bullmq';
import redisClient from '@/config/redisClient';

export const emailWorker = new Worker(
  'email-queue',
  async (job: Job) => {
    // Thực hiện logic gửi email của bạn ở đây (ví dụ: NodeMailer, SendGrid)
    console.log(`Đang xử lý gửi email cho: ${job.data.email}`);
  },
  { connection: redisClient }
);
```

```javascript [JavaScript]
import { Worker } from 'bullmq';
import redisClient from '../../config/redisClient.js';

export const emailWorker = new Worker(
  'email-queue',
  async (job) => {
    // Thực hiện logic gửi email của bạn ở đây (ví dụ: NodeMailer, SendGrid)
    console.log(`Đang xử lý gửi email cho: ${job.data.email}`);
  },
  { connection: redisClient }
);
```

:::

### 3. Giám sát công việc qua Bull-Board
Khởi động ứng dụng của bạn và truy cập:
```
http://localhost:<PORT>/admin/queues
```
Tại đây, bạn có thể giám sát trực quan các công việc đang hoạt động (active), bị trì hoãn (delayed), thất bại (failed) và đã hoàn thành (completed).

> [!TIP] MẸO
> **Bảo vệ trang quản trị Dashboard trong môi trường production**:
> Đảm bảo bảo vệ đường dẫn `/admin/queues` bằng Middleware xác thực trên môi trường production để ngăn chặn truy cập trái phép.

> [!WARNING] CẢNH BÁO
> **Các cạm bẫy thường gặp & Giải pháp**:
> 1. **Redis OOM (Tràn bộ nhớ)**: Theo mặc định, BullMQ lưu trữ tất cả các công việc đã hoàn thành/thất bại mãi mãi. **Luôn luôn** thiết lập tùy chọn `{ removeOnComplete: true, removeOnFail: 1000 }` khi thêm công việc để tránh làm tràn bộ nhớ Redis.
> 2. **Trùng lặp công việc**: Nếu Event Loop bị chặn nặng, BullMQ có thể hiểu lầm worker đã bị treo và sẽ chuyển lại công việc đó cho worker khác. Hãy đảm bảo các tác vụ nền của bạn có tính **Idempotent** (có thể chạy an toàn nhiều lần mà không tạo kết quả thừa) để tránh xử lý trùng (ví dụ: gửi một email hai lần).
> 
> *Để biết thêm chi tiết về cách khắc phục các lỗi liên quan đến Hàng đợi, hãy xem [Hướng dẫn Khắc phục Sự cố](../guide/troubleshooting.md).*
