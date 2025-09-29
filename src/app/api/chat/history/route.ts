import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const THREAD_ID = "thread_chLYGCsv13ynojKz7cggDm3Q";

// GET handler to retrieve chat history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const before = searchParams.get("before") || undefined;
    const after = searchParams.get("after") || undefined;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key not configured",
          code: "API_KEY_MISSING",
        },
        { status: 500 }
      );
    }

    // Get messages from thread
    const messages = await openai.beta.threads.messages.list(THREAD_ID, {
      limit: Math.min(limit, 100), // Max 100 messages
      order: "desc",
      before,
      after,
    });

    // Format messages for frontend
    const formattedMessages = messages.data.map((message) => {
      const content = message.content[0];
      const text = content?.type === "text" ? content.text.value : "";

      return {
        id: message.id,
        role: message.role,
        content: text,
        timestamp: new Date(message.created_at * 1000).toISOString(),
        metadata: message.metadata,
      };
    });

    return NextResponse.json({
      messages: formattedMessages,
      hasMore: messages.has_more,
      firstId: messages.data[0]?.id || null,
      lastId: messages.data[messages.data.length - 1]?.id || null,
      count: formattedMessages.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("[HISTORY] Error fetching chat history:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch chat history";

    return NextResponse.json(
      {
        error: errorMessage,
        code: "FETCH_HISTORY_ERROR",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// DELETE handler to clear chat history (optional - use with caution)
export async function DELETE() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key not configured",
          code: "API_KEY_MISSING",
        },
        { status: 500 }
      );
    }

    // Note: OpenAI doesn't provide a direct way to delete all messages from a thread
    // This would require creating a new thread, which would change the thread ID
    // For now, we'll return a message indicating this limitation

    return NextResponse.json(
      {
        message:
          "Chat history cannot be cleared while preserving thread ID. Consider creating a new thread.",
        code: "CLEAR_HISTORY_NOT_SUPPORTED",
        timestamp: new Date().toISOString(),
      },
      { status: 501 }
    );
  } catch (error: unknown) {
    console.error("[HISTORY] Error clearing chat history:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to clear chat history";

    return NextResponse.json(
      {
        error: errorMessage,
        code: "CLEAR_HISTORY_ERROR",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
