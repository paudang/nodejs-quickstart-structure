---
title: Khả năng Phục hồi Ứng dụng
description: Xây dựng các vi dịch vụ Node.js có khả năng chống lỗi bằng cách sử dụng các mẫu thiết kế Timeout, Retry và Circuit Breaker tích hợp sẵn.
---

# Khả năng Phục hồi Ứng dụng

Trong **Kiến trúc Doanh nghiệp** và hệ thống vi dịch vụ (microservices) phân tán, lỗi mạng hay lỗi hệ thống không chỉ là khả năng xảy ra — nó là sự chắc chắn tuyệt đối. Các hiện tượng nghẽn mạng tạm thời, cơ sở dữ liệu quá tải và các API bên thứ ba phản hồi chậm thường gây ra hiện tượng **lỗi dây chuyền (cascading failures)**.

Nếu không có các biện pháp bảo vệ thích hợp, một dịch vụ cấp dưới (downstream) không phản hồi có thể làm cạn kiệt Event Loop của Node.js, chặn tất cả các yêu cầu HTTP gửi đến và làm sập toàn bộ hệ sinh thái vi dịch vụ của bạn chỉ trong vài giây.

Để bảo vệ ứng dụng của bạn khỏi các sự cố thảm khốc cấp doanh nghiệp này, `nodejs-quickstart-structure` tự động thiết lập bộ **"Bộ ba Quyền lực" của các Mẫu thiết kế Khả năng Phục hồi (Resilience Patterns)** trực tiếp vào thư mục `src/utils/resilience` (hoặc `src/infrastructure/resilience`) của bạn:

- **Timeout (Thời gian chờ)**: Ngăn ngừa cạn kiệt tài nguyên (Các kết nối bị treo).
- **Retry (Thử lại)**: Giảm thiểu các lỗi tạm thời (Nghẽn mạng tạm thời).
- **Circuit Breaker (Ngắt mạch)**: Ngăn ngừa sập hệ thống dây chuyền (Ngắt tải từ các dịch vụ đã chết).

## 1. Timeout (`withTimeout`)

Ngăn chặn các tài nguyên (như kết nối cơ sở dữ liệu hoặc kết nối HTTP) bị treo vô hạn khi một dịch vụ bên thứ ba ngừng phản hồi.

### Khi nào nên sử dụng
Luôn sử dụng timeout cho bất kỳ cuộc gọi mạng bên ngoài nào. Không bao giờ chờ đợi vô hạn.

### Ví dụ Sử dụng

::: code-group

```typescript [TypeScript]
import { withTimeout } from '@/utils/resilience/timeout';

async function fetchExternalData() {
  // Nếu quá trình tải mất hơn 5 giây, nó sẽ ném ra lỗi TimeoutError
  // thay vì tiếp tục treo và giữ yêu cầu của người dùng.
  const data = await withTimeout(fetch('https://api.example.com/data'), 5000);
  return data;
}
```

```javascript [JavaScript]
const { withTimeout } = require('../utils/resilience/timeout');

async function fetchExternalData() {
  // Nếu quá trình tải mất hơn 5 giây, nó sẽ ném ra lỗi TimeoutError
  // thay vì tiếp tục treo và giữ yêu cầu của người dùng.
  const data = await withTimeout(fetch('https://api.example.com/data'), 5000);
  return data;
}
```

:::

## 2. Retry Nâng cao (`withRetry`)

Tự động xử lý các sự cố nghẽn mạng tạm thời bằng thuật toán **Exponential Backoff (Trì hoãn số mũ)** và **Jitter (Độ trễ ngẫu nhiên)**. Thay vì báo lỗi ngay lập tức vì một lỗi kết nối tạm thời trong tíc tắc, ứng dụng sẽ đợi một cách thông minh và thử lại.

### Khi nào nên sử dụng
Sử dụng cho các thao tác có tính idempotent (như yêu cầu `GET` hoặc đọc cơ sở dữ liệu an toàn) có thể bị lỗi không liên tục.

### Ví dụ Sử dụng

::: code-group

```typescript [TypeScript]
import { withRetry } from '@/utils/resilience/retry';

async function safelyFetchData() {
  // Thử lại tối đa 3 lần, bắt đầu với thời gian chờ 500ms tăng dần theo cấp số mũ.
  const data = await withRetry(() => fetch('https://api.example.com/data'), 3, 500);
  return data;
}
```

```javascript [JavaScript]
const { withRetry } = require('../utils/resilience/retry');

async function safelyFetchData() {
  // Thử lại tối đa 3 lần, bắt đầu với thời gian chờ 500ms tăng dần theo cấp số mũ.
  const data = await withRetry(() => fetch('https://api.example.com/data'), 3, 500);
  return data;
}
```

:::

## 3. Circuit Breaker (`CircuitBreaker`)

Cô lập các dịch vụ downstream bị lỗi để ngăn ngừa sập hệ thống dây chuyền. Nếu một dịch vụ bên ngoài liên tục bị lỗi, mạch điện sẽ "mở" (OPEN) và từ chối ngay lập tức các yêu cầu tiếp theo mà không cần gọi đến API đó nữa. Điều này giúp dịch vụ bị lỗi có thời gian tự phục hồi thay vì bị dội thêm quá nhiều lưu lượng truy cập.

### Khi nào nên sử dụng
Sử dụng cho các hoạt động phụ thuộc vào các hệ thống bên ngoài có nguy cơ ngừng hoạt động kéo dài.

### Ví dụ Sử dụng

::: code-group

```typescript [TypeScript]
import { CircuitBreaker } from '@/utils/resilience/circuitBreaker';

// Mở mạch sau 3 lần thất bại liên tiếp.
// Đợi 10 giây trước khi cho phép một yêu cầu kiểm thử "nửa mở" (half-open).
const paymentCircuitBreaker = new CircuitBreaker(3, 10000);

async function processPayment(paymentInfo) {
  try {
    // Nếu mạch đang MỞ (OPEN), lệnh này sẽ ném ra lỗi ngay lập tức mà không gọi tới API bên ngoài
    const result = await paymentCircuitBreaker.fire(() => externalPaymentAPI(paymentInfo));
    return result;
  } catch (error) {
    if (error.message === 'Circuit is OPEN') {
      return { status: 'DEGRADED', message: 'Cổng thanh toán hiện không khả dụng' };
    }
    throw error;
  }
}
```

```javascript [JavaScript]
const { CircuitBreaker } = require('../utils/resilience/circuitBreaker');

// Mở mạch sau 3 lần thất bại liên tiếp.
// Đợi 10 giây trước khi cho phép một yêu cầu kiểm thử "nửa mở" (half-open).
const paymentCircuitBreaker = new CircuitBreaker(3, 10000);

async function processPayment(paymentInfo) {
  try {
    // Nếu mạch đang MỞ (OPEN), lệnh này sẽ ném ra lỗi ngay lập tức mà không gọi tới API bên ngoài
    const result = await paymentCircuitBreaker.fire(() => externalPaymentAPI(paymentInfo));
    return result;
  } catch (error) {
    if (error.message === 'Circuit is OPEN') {
      return { status: 'DEGRADED', message: 'Cổng thanh toán hiện không khả dụng' };
    }
    throw error;
  }
}
```

:::

## Kết hợp các Mẫu thiết kế

Trong các ứng dụng thực tế, các mẫu thiết kế này sẽ phát huy sức mạnh tối đa khi được kết hợp với nhau. Một cuộc gọi API bên ngoài mạnh mẽ thường sẽ kết hợp cả ba:

::: code-group

```typescript [TypeScript]
import { withTimeout } from '@/utils/resilience/timeout';
import { withRetry } from '@/utils/resilience/retry';
import { CircuitBreaker } from '@/utils/resilience/circuitBreaker';

const apiCircuitBreaker = new CircuitBreaker(5, 15000);

async function robustApiCall() {
  // 1. Circuit Breaker là lớp ngoài cùng (bảo vệ hệ thống)
  return await apiCircuitBreaker.fire(() => 
    // 2. Retry xử lý lỗi tạm thời trước khi mạch bị mở hoàn toàn
    withRetry(() => 
      // 3. Timeout đảm bảo một lần gọi không bị treo
      withTimeout(fetch('https://flaky-api.com'), 2000)
    , 3, 500)
  );
}
```

```javascript [JavaScript]
const { withTimeout } = require('../utils/resilience/timeout');
const { withRetry } = require('../utils/resilience/retry');
const { CircuitBreaker } = require('../utils/resilience/circuitBreaker');

const apiCircuitBreaker = new CircuitBreaker(5, 15000);

async function robustApiCall() {
  // 1. Circuit Breaker là lớp ngoài cùng (bảo vệ hệ thống)
  return await apiCircuitBreaker.fire(() => 
    // 2. Retry xử lý lỗi tạm thời trước khi mạch bị mở hoàn toàn
    withRetry(() => 
      // 3. Timeout đảm bảo một lần gọi không bị treo
      withTimeout(fetch('https://flaky-api.com'), 2000)
    , 3, 500)
  );
}
```

:::

> [!TIP] Tìm hiểu sâu về Tầng Resilience
> Bạn muốn hiểu rõ kiến trúc đằng sau cách triển khai này? Chúng tôi đã xuất bản các bài viết chi tiết trên **System Weakness (Medium)** về chính các mẫu thiết kế này:
> [Weaponizing the Weakest Link: How Attackers Exploit Cascading Failures in Microservices](https://systemweakness.com/weaponizing-the-weakest-link-how-attackers-exploit-cascading-failures-in-microservices-and-how-to-31760e5818fd)
