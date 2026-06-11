---
title: Application Resilience
description: Build fault-tolerant Node.js microservices using built-in Timeout, Retry, and Circuit Breaker patterns.
---

# Application Resilience

In **Enterprise Architecture** and distributed microservices, failure is not a possibility—it is an absolute certainty. Network blips, overloaded databases, and slow third-party APIs often cause what is known as **cascading failures**. 

Without proper safeguards, a single unresponsive downstream service can exhaust your Node.js Event Loop, block all incoming HTTP requests, and bring down your entire microservice ecosystem in seconds.

To protect your application from these catastrophic enterprise-level incidents, `nodejs-quickstart-structure` automatically scaffolds the **"Holy Trinity" of Resilience Patterns** directly into your `src/utils/resilience` directory:

- **Timeout**: Prevents Resource Exhaustion (Hanging connections).
- **Retry**: Mitigates Transient Failures (Temporary network blips).
- **Circuit Breaker**: Prevents Cascading System Collapse (Shedding load from dead services).

## 1. Timeout (`withTimeout`)

Prevents resources (like database connections or HTTP sockets) from hanging indefinitely when an external dependency stops responding.

### When to use
Always use timeouts for any external network call. Never wait forever.

### Example Usage

::: code-group

```typescript [TypeScript]
import { withTimeout } from '@/utils/resilience/timeout';

async function fetchExternalData() {
  // If fetch takes longer than 5 seconds, it throws a TimeoutError
  // rather than hanging the user's request.
  const data = await withTimeout(fetch('https://api.example.com/data'), 5000);
  return data;
}
```

```javascript [JavaScript]
const { withTimeout } = require('../utils/resilience/timeout');

async function fetchExternalData() {
  // If fetch takes longer than 5 seconds, it throws a TimeoutError
  // rather than hanging the user's request.
  const data = await withTimeout(fetch('https://api.example.com/data'), 5000);
  return data;
}
```

:::

## 2. Advanced Retry (`withRetry`)

Handles transient network blips automatically using **Exponential Backoff** and **Jitter**. Instead of failing a request immediately due to a split-second network glitch, the application will intelligently wait and try again.

### When to use
Use for idempotent operations (like `GET` requests or safe database reads) that might fail intermittently.

### Example Usage

::: code-group

```typescript [TypeScript]
import { withRetry } from '@/utils/resilience/retry';

async function safelyFetchData() {
  // Retries up to 3 times, starting with a 500ms delay that exponentially increases.
  const data = await withRetry(() => fetch('https://api.example.com/data'), 3, 500);
  return data;
}
```

```javascript [JavaScript]
const { withRetry } = require('../utils/resilience/retry');

async function safelyFetchData() {
  // Retries up to 3 times, starting with a 500ms delay that exponentially increases.
  const data = await withRetry(() => fetch('https://api.example.com/data'), 3, 500);
  return data;
}
```

:::

## 3. Circuit Breaker (`CircuitBreaker`)

Isolates failing downstream services to prevent cascading system collapse. If an external service fails repeatedly, the circuit "opens" and immediately rejects subsequent requests. This gives the failing service time to recover instead of bombarding it with more traffic.

### When to use
Use for operations that depend on external systems prone to extended downtime.

### Example Usage

::: code-group

```typescript [TypeScript]
import { CircuitBreaker } from '@/utils/resilience/circuitBreaker';

// Opens the circuit after 3 consecutive failures.
// Waits 10 seconds before allowing a "half-open" test request.
const paymentCircuitBreaker = new CircuitBreaker(3, 10000);

async function processPayment(paymentInfo) {
  try {
    // If the circuit is OPEN, this throws immediately without calling the API
    const result = await paymentCircuitBreaker.fire(() => externalPaymentAPI(paymentInfo));
    return result;
  } catch (error) {
    if (error.message === 'Circuit is OPEN') {
      return { status: 'DEGRADED', message: 'Payment gateway is currently unavailable' };
    }
    throw error;
  }
}
```

```javascript [JavaScript]
const { CircuitBreaker } = require('../utils/resilience/circuitBreaker');

// Opens the circuit after 3 consecutive failures.
// Waits 10 seconds before allowing a "half-open" test request.
const paymentCircuitBreaker = new CircuitBreaker(3, 10000);

async function processPayment(paymentInfo) {
  try {
    // If the circuit is OPEN, this throws immediately without calling the API
    const result = await paymentCircuitBreaker.fire(() => externalPaymentAPI(paymentInfo));
    return result;
  } catch (error) {
    if (error.message === 'Circuit is OPEN') {
      return { status: 'DEGRADED', message: 'Payment gateway is currently unavailable' };
    }
    throw error;
  }
}
```

:::

## Combining Patterns

In real-world applications, these patterns are most powerful when combined. A typical robust external call will use all three:

::: code-group

```typescript [TypeScript]
import { withTimeout } from '@/utils/resilience/timeout';
import { withRetry } from '@/utils/resilience/retry';
import { CircuitBreaker } from '@/utils/resilience/circuitBreaker';

const apiCircuitBreaker = new CircuitBreaker(5, 15000);

async function robustApiCall() {
  // 1. Circuit Breaker is the outermost layer (protects the system)
  return await apiCircuitBreaker.fire(() => 
    // 2. Retry handles transient failures before the circuit opens
    withRetry(() => 
      // 3. Timeout ensures a single attempt doesn't hang
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
  // 1. Circuit Breaker is the outermost layer (protects the system)
  return await apiCircuitBreaker.fire(() => 
    // 2. Retry handles transient failures before the circuit opens
    withRetry(() => 
      // 3. Timeout ensures a single attempt doesn't hang
      withTimeout(fetch('https://flaky-api.com'), 2000)
    , 3, 500)
  );
}
```

:::

> [!TIP] Deep Dive into Resilience Layer
> Want to understand the architecture behind this implementation? We have published two comprehensive resilience articles on **System Weakness (Medium)** regarding these exact patterns:
[Weaponizing the Weakest Link: How Attackers Exploit Cascading Failures in Microservices](https://systemweakness.com/weaponizing-the-weakest-link-how-attackers-exploit-cascading-failures-in-microservices-and-how-to-31760e5818fd)

---
