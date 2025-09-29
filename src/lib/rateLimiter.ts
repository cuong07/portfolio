// Simple in-memory rate limiter for chat API
// In production, use Redis or similar persistent storage

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 60, windowMs = 60000) {
    // 60 requests per minute by default
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  isAllowed(identifier: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
  } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime: now + this.windowMs,
      };
    }

    if (entry.count >= this.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment counter
    entry.count++;
    this.store.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  getStats(): { totalKeys: number; activeKeys: number } {
    const now = Date.now();
    let activeKeys = 0;

    for (const entry of this.store.values()) {
      if (now <= entry.resetTime) {
        activeKeys++;
      }
    }

    return {
      totalKeys: this.store.size,
      activeKeys,
    };
  }
}

// Question limiter for daily limits
interface QuestionLimitEntry {
  count: number;
  resetTime: number;
  firstQuestionTime: number;
}

class QuestionLimiter {
  private store: Map<string, QuestionLimitEntry> = new Map();
  private readonly maxQuestions: number;
  private readonly windowMs: number;

  constructor(maxQuestions = 10, windowMs = 24 * 60 * 60 * 1000) {
    // 10 questions per 24 hours by default
    this.maxQuestions = maxQuestions;
    this.windowMs = windowMs;

    // Clean up expired entries every hour
    setInterval(() => this.cleanup(), 60 * 60 * 1000);
  }

  isAllowed(identifier: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    totalQuestions: number;
  } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      // First question or window expired
      const newEntry = {
        count: 1,
        resetTime: now + this.windowMs,
        firstQuestionTime: now,
      };
      this.store.set(identifier, newEntry);

      return {
        allowed: true,
        remaining: this.maxQuestions - 1,
        resetTime: newEntry.resetTime,
        totalQuestions: 1,
      };
    }

    if (entry.count >= this.maxQuestions) {
      // Question limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        totalQuestions: entry.count,
      };
    }

    // Increment counter
    entry.count++;
    this.store.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.maxQuestions - entry.count,
      resetTime: entry.resetTime,
      totalQuestions: entry.count,
    };
  }

  getQuestionCount(identifier: string): {
    count: number;
    remaining: number;
    resetTime: number;
  } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      return {
        count: 0,
        remaining: this.maxQuestions,
        resetTime: now + this.windowMs,
      };
    }

    return {
      count: entry.count,
      remaining: this.maxQuestions - entry.count,
      resetTime: entry.resetTime,
    };
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  getStats(): { totalUsers: number; activeUsers: number } {
    const now = Date.now();
    let activeUsers = 0;

    for (const entry of this.store.values()) {
      if (now <= entry.resetTime) {
        activeUsers++;
      }
    }

    return {
      totalUsers: this.store.size,
      activeUsers,
    };
  }
}

// Create global rate limiter instance
export const chatRateLimiter = new RateLimiter(30, 60000); // 30 requests per minute for chat
export const generalRateLimiter = new RateLimiter(100, 60000); // 100 requests per minute for other endpoints
export const questionLimiter = new QuestionLimiter(10, 24 * 60 * 60 * 1000); // 10 questions per 24 hours

// Helper function to get client identifier
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (in order of preference)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to a default identifier if we can't get IP
  return "unknown";
}

// Helper function to create rate limit response
export function createRateLimitResponse(resetTime: number) {
  const resetDate = new Date(resetTime);

  return new Response(
    JSON.stringify({
      error: "Rate limit exceeded",
      message: "Too many requests. Please try again later.",
      code: "RATE_LIMIT_EXCEEDED",
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
      resetTime: resetDate.toISOString(),
      timestamp: new Date().toISOString(),
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": Math.ceil((resetTime - Date.now()) / 1000).toString(),
        "X-RateLimit-Limit": "30",
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": resetDate.toISOString(),
      },
    }
  );
}

// Helper function to create question limit response
export function createQuestionLimitResponse(
  resetTime: number,
  totalQuestions: number,
  maxQuestions: number
) {
  const resetDate = new Date(resetTime);
  const hoursUntilReset = Math.ceil(
    (resetTime - Date.now()) / (1000 * 60 * 60)
  );

  return new Response(
    JSON.stringify({
      error: "Daily question limit exceeded",
      message: `Bạn đã hỏi ${totalQuestions}/${maxQuestions} câu hỏi cho hôm nay. Hãy quay lại sau ${hoursUntilReset} giờ nữa! 😊`,
      code: "QUESTION_LIMIT_EXCEEDED",
      questionsUsed: totalQuestions,
      maxQuestions: maxQuestions,
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
      resetTime: resetDate.toISOString(),
      timestamp: new Date().toISOString(),
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": Math.ceil((resetTime - Date.now()) / 1000).toString(),
        "X-Question-Limit": maxQuestions.toString(),
        "X-Questions-Used": totalQuestions.toString(),
        "X-Questions-Remaining": "0",
        "X-Question-Reset": resetDate.toISOString(),
      },
    }
  );
}
