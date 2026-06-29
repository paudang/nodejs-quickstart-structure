---
title: 应用程序弹性
description: 使用内置的超时 (Timeout)、重试 (Retry) 和熔断器 (Circuit Breaker) 模式构建高容错性的 Node.js 微服务。
---

# 应用程序弹性

在**企业级架构**和分布式微服务体系中，故障并非一种可能性，而是必然发生的客观事实。网络抖动、数据库瞬间过载、第三方 API 接口变慢，都极易引发**级联故障 (cascading failures)**。

在没有妥善保护机制的情况下，一个下游服务的迟钝或故障能在几秒钟内耗尽主服务的事件循环 (Event Loop)，阻塞所有后续传入的 HTTP 请求，导致整个微服务集群瞬间崩溃。

为了让您的应用程序免疫这些灾难性的系统级故障，`nodejs-quickstart-structure` 会自动为您的项目生成 **“弹性模式的三位一体 (Holy Trinity of Resilience Patterns)”**，并保存在 `src/utils/resilience` (或 `src/infrastructure/resilience`) 目录中：

- **Timeout (超时控制)**：预防挂起连接导致的系统资源耗尽。
- **Retry (自动重试)**：自动规避瞬间网络抖动等偶发性故障。
- **Circuit Breaker (熔断机制)**：预防大面积级联故障，在服务崩溃时立即切断并阻断请求。

## 1. 超时控制 (`withTimeout`)

防止网络请求、数据库查询等操作在外部依赖未响应时无限期挂起。

### 何时使用
任何外部网络调用都应设置超时控制。不要无限期等待。

### 示例代码

::: code-group

```typescript [TypeScript]
import { withTimeout } from '@/utils/resilience/timeout';

async function fetchExternalData() {
  // 如果接口请求耗时超过 5 秒，会立即抛出 TimeoutError 并中断，
  // 避免请求被无限挂起。
  const data = await withTimeout(fetch('https://api.example.com/data'), 5000);
  return data;
}
```

```javascript [JavaScript]
const { withTimeout } = require('../utils/resilience/timeout');

async function fetchExternalData() {
  // 如果接口请求耗时超过 5 秒，会立即抛出 TimeoutError 并中断，
  // 避免请求被无限挂起。
  const data = await withTimeout(fetch('https://api.example.com/data'), 5000);
  return data;
}
```

:::

## 2. 自动重试机制 (`withRetry`)

使用带 **指数退避 (Exponential Backoff)** 与 **抖动 (Jitter)** 的退避算法，应对偶发性的微小网络抖动。

### 何时使用
常用于具有幂等性 (Idempotent) 且可能偶发波动的网络操作 (如 `GET` 查询)。

### 示例代码

::: code-group

```typescript [TypeScript]
import { withRetry } from '@/utils/resilience/retry';

async function safelyFetchData() {
  // 最大重试 3 次，初始等待时间 500ms，之后按指数增加延迟。
  const data = await withRetry(() => fetch('https://api.example.com/data'), 3, 500);
  return data;
}
```

```javascript [JavaScript]
const { withRetry } = require('../utils/resilience/retry');

async function safelyFetchData() {
  // 最大重试 3 次，初始等待时间 500ms，之后按指数增加延迟。
  const data = await withRetry(() => fetch('https://api.example.com/data'), 3, 500);
  return data;
}
```

:::

## 3. 熔断机制 (`CircuitBreaker`)

隔离下游故障，防止雪崩。若第三方 API 连续报错达一定阈值，熔断器将立刻变为 **“开启 (OPEN)”** 状态，并在之后的冷却期内直接拒绝向该 API 投递请求，以让其能有缓冲自愈时间。

### 何时使用
任何易发生较长时间故障中断的外部核心调用。

### 示例代码

::: code-group

```typescript [TypeScript]
import { CircuitBreaker } from '@/utils/resilience/circuitBreaker';

// 在连续失败 3 次后自动开启熔断。
// 等待 10 秒后才允许放行一次“半开启 (half-open)”的探路请求。
const paymentCircuitBreaker = new CircuitBreaker(3, 10000);

async function processPayment(paymentInfo) {
  try {
    // 如果熔断开启，此调用会在最外侧直接抛出“Circuit is OPEN”异常，而不调用外部 API
    const result = await paymentCircuitBreaker.fire(() => externalPaymentAPI(paymentInfo));
    return result;
  } catch (error) {
    if (error.message === 'Circuit is OPEN') {
      return { status: 'DEGRADED', message: '支付网关当前不可用' };
    }
    throw error;
  }
}
```

```javascript [JavaScript]
const { CircuitBreaker } = require('../utils/resilience/circuitBreaker');

// 在连续失败 3 次后自动开启熔断。
// 等待 10 秒后才允许放行一次“半开启 (half-open)”的探路请求。
const paymentCircuitBreaker = new CircuitBreaker(3, 10000);

async function processPayment(paymentInfo) {
  try {
    // 如果熔断开启，此调用会在最外侧直接抛出“Circuit is OPEN”异常，而不调用外部 API
    const result = await paymentCircuitBreaker.fire(() => externalPaymentAPI(paymentInfo));
    return result;
  } catch (error) {
    if (error.message === 'Circuit is OPEN') {
      return { status: 'DEGRADED', message: '支付网关当前不可用' };
    }
    throw error;
  }
}
```

:::

## 组合使用模式

这些设计模式组合起来能提供最高的系统鲁棒性：

::: code-group

```typescript [TypeScript]
import { withTimeout } from '@/utils/resilience/timeout';
import { withRetry } from '@/utils/resilience/retry';
import { CircuitBreaker } from '@/utils/resilience/circuitBreaker';

const apiCircuitBreaker = new CircuitBreaker(5, 15000);

async function robustApiCall() {
  // 1. 最外层：熔断器隔离 (保护系统)
  return await apiCircuitBreaker.fire(() => 
    // 2. 中间层：自动重试，平滑掉瞬间的小抖动
    withRetry(() => 
      // 3. 最内层：设置超时，确保单次调用不会挂死
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
  // 1. 最外层：熔断器隔离 (保护系统)
  return await apiCircuitBreaker.fire(() => 
    // 2. 中间层：自动重试，平滑掉瞬间的小抖动
    withRetry(() => 
      // 3. 最内层：设置超时，确保单次调用不会挂死
      withTimeout(fetch('https://flaky-api.com'), 2000)
    , 3, 500)
  );
}
```

:::

> [!TIP] 深入研究服务弹性
> 想要了解此实现背后的设计模式？我们在 **System Weakness (Medium)** 上发表了关于弹性架构的深度技术长文：
> [Weaponizing the Weakest Link: How Attackers Exploit Cascading Failures in Microservices](https://systemweakness.com/weaponizing-the-weakest-link-how-attackers-exploit-cascading-failures-in-microservices-and-how-to-31760e5818fd)
