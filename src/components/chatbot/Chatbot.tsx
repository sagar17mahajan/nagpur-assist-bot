import { useState, useRef, useEffect } from "react";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { Moon, Sun } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  webhookUrl?: string;
  greeting?: string;
  sessionId?: string;
}

export const Chatbot = ({
  webhookUrl = "https://ai.nagpurnmc.in/webhook/15cffe6a-0d7a-4da5-82a4-4242957dc2e1/chat",
  greeting = "Welcome to Nagpur Municipal Corporation 👋\nHow can I help you today?",
  sessionId,
}: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSessionId] = useState(sessionId || `session-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "greeting",
          text: greeting,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, greeting, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // n8n chat webhook format
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: currentSessionId,
          chatInput: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // n8n chat webhook response format
      const botReply = data.output || data.response || data.text || data.message || "I received your message!";
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        isUser: false,
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm unable to connect right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, errorMessage]);
        setIsTyping(false);
      }, 500);
    }
  };

  return (
    <>
      <ChatButton onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg.text}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-4 pb-2 flex justify-between items-center">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-3.5 w-3.5" />
                <span>Light mode</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5" />
                <span>Dark mode</span>
              </>
            )}
          </button>
        </div>
        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </ChatWindow>
    </>
  );
};
