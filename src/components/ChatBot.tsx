"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Chào bạn! Tôi là AI Assistant của Vo Manh Cuong. Tôi có thể giúp bạn tìm hiểu về kinh nghiệm, dự án và kỹ năng của anh ấy. Hãy hỏi tôi bất cứ điều gì! ✨",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState<number>(10);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto show tooltip when component mounts and hide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Fetch initial question status
  useEffect(() => {
    const fetchQuestionStatus = async () => {
      try {
        const response = await fetch("/api/chat/status");
        if (response.ok) {
          const data = await response.json();
          if (data.questionLimit) {
            setQuestionsRemaining(data.questionLimit.remaining);
          }
        }
      } catch (error) {
        console.error("Failed to fetch question status:", error);
      }
    };

    fetchQuestionStatus();
  }, []);

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle question limit exceeded
        if (errorData.code === "QUESTION_LIMIT_EXCEEDED") {
          return (
            errorData.message ||
            "Bạn đã hết lượt hỏi cho hôm nay. Vui lòng quay lại sau! 😊"
          );
        }

        // Handle rate limit exceeded
        if (errorData.code === "RATE_LIMIT_EXCEEDED") {
          return "Bạn đang hỏi quá nhanh. Vui lòng chờ một chút rồi thử lại! ⏰";
        }

        throw new Error(errorData.message || "Failed to get response");
      }

      const data = await response.json();

      // Update questions remaining from response headers
      const questionsRemainingHeader = response.headers.get(
        "X-Questions-Remaining"
      );
      if (questionsRemainingHeader) {
        setQuestionsRemaining(parseInt(questionsRemainingHeader, 10));
      }

      return (
        data.message ||
        "Xin lỗi, tôi không thể trả lời câu hỏi này lúc này. Vui lòng thử lại! 🤖"
      );
    } catch (error) {
      console.error("Chat API error:", error);
      // Fallback to local responses
      const lowerMessage = userMessage.toLowerCase();

      if (
        lowerMessage.includes("kinh nghiệm") ||
        lowerMessage.includes("experience")
      ) {
        return "💼 Vo Manh Cuong có hơn 3 năm kinh nghiệm phát triển Full-Stack và Blockchain. Anh ấy thành thạo Node.js, NestJS, React, Angular và các công nghệ blockchain hiện đại. 🚀";
      }

      if (lowerMessage.includes("dự án") || lowerMessage.includes("project")) {
        return "🎯 Cuong đã tham gia nhiều dự án đa dạng từ ứng dụng web, mobile đến các giải pháp blockchain sáng tạo. Bạn có thể xem chi tiết trong phần Projects trên website để khám phá thêm! 📱💻";
      }

      if (lowerMessage.includes("kỹ năng") || lowerMessage.includes("skill")) {
        return "⚡ Kỹ năng chính bao gồm: JavaScript/TypeScript, Node.js, NestJS, React, Angular, Blockchain development, RESTful APIs, và nhiều công nghệ hiện đại khác. Luôn cập nhật xu hướng mới! 🔥";
      }

      if (
        lowerMessage.includes("liên hệ") ||
        lowerMessage.includes("contact")
      ) {
        return "📬 Bạn có thể liên hệ với Cuong qua email hoặc các mạng xã hội được liệt kê trong phần Contact. Anh ấy luôn sẵn sàng thảo luận về các cơ hội hợp tác thú vị! 🤝";
      }

      if (lowerMessage.includes("blockchain")) {
        return "⛓️ Cuong có kinh nghiệm sâu về blockchain development, bao gồm smart contracts, DeFi protocols, và tích hợp blockchain vào các ứng dụng web truyền thống. Chuyên gia về Web3! 💎";
      }

      if (
        lowerMessage.includes("xin chào") ||
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("chào")
      ) {
        return "👋 Xin chào! Rất vui được gặp bạn! Tôi có thể giúp bạn tìm hiểu thêm về Vo Manh Cuong và hành trình phát triển công nghệ của anh ấy. Bạn muốn biết điều gì? ✨";
      }

      return "🤖 Xin lỗi, có vấn đề kết nối. Tôi có thể giúp bạn tìm hiểu về kinh nghiệm, dự án, kỹ năng hoặc thông tin liên hệ của Vo Manh Cuong. Hãy đặt câu hỏi cụ thể nhé! 💫";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    const userMessageText = inputValue;
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Get response from API or fallback
      const responseText = await generateResponse(userMessageText);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error handling message:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "🤖 Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau! 💫",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false); // Hide tooltip when chat is opened
  };

  const handleMouseEnter = () => {
    if (!isOpen) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    // Keep tooltip visible for auto-show, only hide on manual hover
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  return (
    <>
      {/* Tooltip for Chat Button */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            className="fixed bottom-28 right-8 z-40 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white p-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl max-w-xs"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(59, 130, 246, 0.95), rgba(6, 182, 212, 0.95))",
              boxShadow:
                "0 20px 40px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            {/* Close button */}
            <motion.button
              onClick={handleTooltipClose}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <div className="flex items-center space-x-3 mb-2">
              <motion.div
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👋
              </motion.div>
              <span className="font-bold text-sm">Xin chào!</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Tôi là AI Assistant của Vo Manh Cuong. Click để trò chuyện và tìm
              hiểu về kinh nghiệm, dự án & kỹ năng! ✨
            </p>
            {/* <div className="absolute -bottom-2 right-6 w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 transform rotate-45 border-r border-b border-white/20"></div> */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 text-white p-5 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 backdrop-blur-sm border border-white/20"
        onClick={toggleChat}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.15,
          boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
          background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
        style={{
          background: isOpen
            ? "linear-gradient(135deg, #ef4444, #f97316)"
            : "linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)",
        }}
      >
        {isOpen ? (
          <motion.svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ rotate: 0 }}
            animate={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </motion.svg>
        ) : (
          <motion.svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </motion.svg>
        )}
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-28 right-8 z-40 w-[430px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, rotateX: 20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            {/* Header */}
            <motion.div
              className="bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-cyan-500/80 backdrop-blur-sm text-white p-4 flex items-center justify-between border-b border-white/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl">AI Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm opacity-90">Online & Ready</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2 space-y-5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                  }}
                >
                  <motion.div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.isUser
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-br-md shadow-lg shadow-purple-500/25"
                        : "bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-md shadow-lg border border-white/20"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-base leading-relaxed font-medium">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isUser ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </motion.div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-2xl rounded-bl-md shadow-lg border border-white/20 p-5">
                    <div className="flex space-x-2 items-center">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0,
                          }}
                        />
                        <motion.div
                          className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 ml-3 font-medium">
                        AI đang trả lời...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Questions remaining indicator */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2 text-sm text-white/70">
                  <motion.span
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-lg">💬</span>
                    <span>Câu hỏi còn lại:</span>
                    <span
                      className={`font-semibold ${
                        questionsRemaining <= 3
                          ? "text-orange-400"
                          : questionsRemaining <= 1
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {questionsRemaining}/10
                    </span>
                  </motion.span>
                </div>
                {questionsRemaining <= 3 && questionsRemaining > 0 && (
                  <motion.span
                    className="text-xs text-orange-300 bg-orange-500/20 px-2 py-1 rounded-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Sắp hết lượt! ⚠️
                  </motion.span>
                )}
                {questionsRemaining === 0 && (
                  <motion.span
                    className="text-xs text-red-300 bg-red-500/20 px-2 py-1 rounded-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    Hết lượt hỏi! 🚫
                  </motion.span>
                )}
              </div>

              <div className="flex space-x-4">
                <motion.input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    questionsRemaining === 0
                      ? "Bạn đã hết lượt hỏi hôm nay..."
                      : "Nhập tin nhắn của bạn..."
                  }
                  className="flex-1 px-5 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-gray-800 placeholder-gray-500 transition-all duration-300 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isTyping || questionsRemaining === 0}
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={
                    !inputValue.trim() || isTyping || questionsRemaining === 0
                  }
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: questionsRemaining === 0 ? 1 : 1.05 }}
                  whileTap={{ scale: questionsRemaining === 0 ? 1 : 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
