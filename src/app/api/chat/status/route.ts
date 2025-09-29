import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  chatRateLimiter,
  questionLimiter,
  getClientIdentifier,
} from "@/lib/rateLimiter";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const THREAD_ID = "thread_chLYGCsv13ynojKz7cggDm3Q";
const ASSISTANT_ID =
  process.env.OPENAI_ASSISTANT_ID || "asst_pYkFQbHeesxjmBqOQ0rpCcwE";

// GET handler for system status
export async function GET(request: NextRequest) {
  try {
    // Get client identifier for rate limiting info
    const clientId = getClientIdentifier(request);

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          status: "error",
          message: "OpenAI API key not configured",
          checks: {
            apiKey: false,
            thread: false,
            assistant: false,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    const checks = {
      apiKey: !!process.env.OPENAI_API_KEY,
      thread: false,
      assistant: false,
    };

    let threadInfo = null;
    let assistantInfo = null;
    const errors: string[] = [];

    // Get rate limiting info
    const rateLimitResult = chatRateLimiter.isAllowed(clientId);
    const questionStatus = questionLimiter.getQuestionCount(clientId);

    // Check thread
    try {
      const thread = await openai.beta.threads.retrieve(THREAD_ID);
      checks.thread = true;
      threadInfo = {
        id: thread.id,
        createdAt: new Date(thread.created_at * 1000).toISOString(),
        metadata: thread.metadata,
      };
    } catch (error) {
      errors.push(
        `Thread check failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }

    // Check assistant
    try {
      const assistant = await openai.beta.assistants.retrieve(ASSISTANT_ID);
      checks.assistant = true;
      assistantInfo = {
        id: assistant.id,
        name: assistant.name,
        model: assistant.model,
        createdAt: new Date(assistant.created_at * 1000).toISOString(),
        instructions:
          assistant.instructions?.substring(0, 100) +
          (assistant.instructions && assistant.instructions.length > 100
            ? "..."
            : ""),
      };
    } catch (error) {
      errors.push(
        `Assistant check failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }

    const allChecksPass = Object.values(checks).every(Boolean);

    return NextResponse.json(
      {
        status: allChecksPass ? "healthy" : "degraded",
        message: allChecksPass
          ? "All systems operational"
          : "Some systems have issues",
        checks,
        threadInfo,
        assistantInfo,
        rateLimit: {
          remaining: rateLimitResult.remaining,
          resetTime: new Date(rateLimitResult.resetTime).toISOString(),
          limit: 30,
        },
        questionLimit: {
          remaining: questionStatus.remaining,
          used: questionStatus.count,
          resetTime: new Date(questionStatus.resetTime).toISOString(),
          limit: 10,
        },
        errors: errors.length > 0 ? errors : undefined,
        environment: {
          nodeEnv: process.env.NODE_ENV,
          hasApiKey: !!process.env.OPENAI_API_KEY,
          hasAssistantId: !!process.env.OPENAI_ASSISTANT_ID,
        },
        timestamp: new Date().toISOString(),
      },
      {
        status: allChecksPass ? 200 : 503,
        headers: {
          "X-RateLimit-Limit": "30",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-Question-Limit": "10",
          "X-Questions-Remaining": questionStatus.remaining.toString(),
          "X-Questions-Used": questionStatus.count.toString(),
        },
      }
    );
  } catch (error: unknown) {
    console.error("[STATUS] System status check failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "System status check failed";

    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
        checks: {
          apiKey: !!process.env.OPENAI_API_KEY,
          thread: false,
          assistant: false,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
