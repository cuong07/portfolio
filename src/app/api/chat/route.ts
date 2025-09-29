import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  chatRateLimiter,
  questionLimiter,
  getClientIdentifier,
  createRateLimitResponse,
  createQuestionLimitResponse,
} from "@/lib/rateLimiter";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const THREAD_ID = "thread_chLYGCsv13ynojKz7cggDm3Q";
const ASSISTANT_ID =
  process.env.OPENAI_ASSISTANT_ID || "asst_pYkFQbHeesxjmBqOQ0rpCcwE";

interface ChatRequest {
  message: string;
  userId?: string;
}

interface ChatResponse {
  message: string;
  timestamp: string;
  messageId: string;
}

interface ErrorResponse {
  error: string;
  code?: string;
  timestamp: string;
}

// Utility functions
const createErrorResponse = (
  error: string,
  status: number,
  code?: string
): NextResponse => {
  return NextResponse.json(
    {
      error,
      code,
      timestamp: new Date().toISOString(),
    } as ErrorResponse,
    { status }
  );
};

const createSuccessResponse = (
  message: string,
  messageId: string,
  rateLimitRemaining?: number,
  questionsRemaining?: number
): NextResponse => {
  const response = NextResponse.json({
    message,
    timestamp: new Date().toISOString(),
    messageId,
  } as ChatResponse);

  // Add rate limit headers
  if (rateLimitRemaining !== undefined) {
    response.headers.set("X-RateLimit-Limit", "30");
    response.headers.set(
      "X-RateLimit-Remaining",
      rateLimitRemaining.toString()
    );
  }

  // Add question limit headers
  if (questionsRemaining !== undefined) {
    response.headers.set("X-Question-Limit", "10");
    response.headers.set(
      "X-Questions-Remaining",
      questionsRemaining.toString()
    );
  }

  return response;
};

// Main POST handler for chat
export async function POST(request: NextRequest) {
  try {
    // Get client identifier
    const clientId = getClientIdentifier(request);

    // Check rate limiting (requests per minute)
    const rateLimitResult = chatRateLimiter.isAllowed(clientId);
    if (!rateLimitResult.allowed) {
      return createRateLimitResponse(rateLimitResult.resetTime);
    }

    // Check question limiting (questions per day)
    const questionLimitResult = questionLimiter.isAllowed(clientId);
    if (!questionLimitResult.allowed) {
      return createQuestionLimitResponse(
        questionLimitResult.resetTime,
        questionLimitResult.totalQuestions,
        10
      );
    }

    // Parse request body
    const body: ChatRequest = await request.json();
    const { message, userId } = body;

    // Validation
    if (!message || typeof message !== "string") {
      return createErrorResponse(
        "Message is required and must be a string",
        400,
        "INVALID_MESSAGE"
      );
    }

    if (message.trim().length === 0) {
      return createErrorResponse(
        "Message cannot be empty",
        400,
        "EMPTY_MESSAGE"
      );
    }

    if (message.length > 4000) {
      return createErrorResponse(
        "Message too long (max 4000 characters)",
        400,
        "MESSAGE_TOO_LONG"
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return createErrorResponse(
        "OpenAI API key not configured",
        500,
        "API_KEY_MISSING"
      );
    }

    console.log(
      `[CHAT] New message from user: ${
        userId || "anonymous"
      } - "${message.substring(0, 100)}..."`
    );

    // Add message to thread
    const userMessage = await openai.beta.threads.messages.create(THREAD_ID, {
      role: "user",
      content: message.trim(),
      metadata: {
        userId: userId || "anonymous",
        timestamp: new Date().toISOString(),
      },
    });

    console.log(`[CHAT] Message added to thread: ${userMessage.id}`);

    // Run the assistant
    const run = await openai.beta.threads.runs.create(THREAD_ID, {
      assistant_id: ASSISTANT_ID,
      instructions:
        "Bạn là AI Assistant của Vo Manh Cuong. Hãy trả lời một cách thân thiện, chuyên nghiệp và hữu ích. Sử dụng emoji phù hợp để làm cho cuộc trò chuyện thú vị hơn.",
    });

    console.log(`[CHAT] Assistant run started: ${run.id}`);

    let attempts = 0;
    const maxAttempts = 60;
    const checkInterval = 1000;

    while (attempts < maxAttempts) {
      const runStatus = await openai.beta.threads.runs.retrieve(
        THREAD_ID,
        run.id
      );

      console.log(
        `[CHAT] Run status (attempt ${attempts + 1}): ${runStatus.status}`
      );

      if (runStatus.status === "completed") {
        const messages = await openai.beta.threads.messages.list(THREAD_ID, {
          limit: 1,
          order: "desc",
        });

        const lastMessage = messages.data[0];

        if (
          lastMessage &&
          lastMessage.role === "assistant" &&
          lastMessage.content[0]?.type === "text"
        ) {
          const responseMessage = lastMessage.content[0].text.value;
          console.log(
            `[CHAT] Response generated successfully: "${responseMessage.substring(
              0,
              100
            )}..."`
          );

          return createSuccessResponse(
            responseMessage,
            lastMessage.id,
            rateLimitResult.remaining,
            questionLimitResult.remaining
          );
        } else {
          console.error("[CHAT] Invalid response format from assistant");
          return createErrorResponse(
            "Invalid response format from assistant",
            500,
            "INVALID_RESPONSE_FORMAT"
          );
        }
      } else if (runStatus.status === "failed") {
        console.error(
          `[CHAT] Assistant run failed: ${
            runStatus.last_error?.message || "Unknown error"
          }`
        );
        return createErrorResponse(
          `Assistant run failed: ${
            runStatus.last_error?.message || "Unknown error"
          }`,
          500,
          "ASSISTANT_RUN_FAILED"
        );
      } else if (runStatus.status === "cancelled") {
        console.error("[CHAT] Assistant run was cancelled");
        return createErrorResponse(
          "Assistant run was cancelled",
          500,
          "ASSISTANT_RUN_CANCELLED"
        );
      } else if (runStatus.status === "expired") {
        console.error("[CHAT] Assistant run expired");
        return createErrorResponse(
          "Assistant run expired",
          500,
          "ASSISTANT_RUN_EXPIRED"
        );
      }

      await new Promise((resolve) => setTimeout(resolve, checkInterval));
      attempts++;
    }

    console.error("[CHAT] Assistant response timeout");
    return createErrorResponse(
      "Response timeout - please try again",
      504,
      "RESPONSE_TIMEOUT"
    );
  } catch (error: unknown) {
    console.error("[CHAT] API Error:", error);

    const errorObj = error as { error?: { type?: string; message?: string } };

    if (errorObj?.error?.type === "invalid_request_error") {
      return createErrorResponse(
        `OpenAI API error: ${errorObj.error.message}`,
        400,
        "OPENAI_INVALID_REQUEST"
      );
    }

    if (errorObj?.error?.type === "authentication_error") {
      return createErrorResponse(
        "OpenAI authentication failed",
        401,
        "OPENAI_AUTH_ERROR"
      );
    }

    if (errorObj?.error?.type === "permission_error") {
      return createErrorResponse(
        "OpenAI permission denied",
        403,
        "OPENAI_PERMISSION_ERROR"
      );
    }

    if (errorObj?.error?.type === "rate_limit_error") {
      return createErrorResponse(
        "Rate limit exceeded - please try again later",
        429,
        "RATE_LIMIT_EXCEEDED"
      );
    }

    // Generic error
    return createErrorResponse(
      "Internal server error - please try again later",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }
}

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          status: "error",
          message: "OpenAI API key not configured",
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    const thread = await openai.beta.threads.retrieve(THREAD_ID);

    const messages = await openai.beta.threads.messages.list(THREAD_ID, {
      limit: 10,
    });

    return NextResponse.json({
      status: "healthy",
      threadId: THREAD_ID,
      assistantId: ASSISTANT_ID,
      threadCreatedAt: new Date(thread.created_at * 1000).toISOString(),
      messagesCount: messages.data.length,
      lastActivity: messages.data[0]
        ? new Date(messages.data[0].created_at * 1000).toISOString()
        : null,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("[CHAT] Health check error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Health check failed";
    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
