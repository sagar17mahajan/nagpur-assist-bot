import { Chatbot } from "@/components/chatbot/Chatbot";
import { useEffect, useState } from "react";

const ChatbotEmbed = () => {
  const [config, setConfig] = useState({
    webhookUrl: "https://ai.nagpurnmc.in/webhook/15cffe6a-0d7a-4da5-82a4-4242957dc2e1/chat",
    greeting: "Welcome to Nagpur Municipal Corporation 👋\nHow can I help you today?",
    sessionId: `session-${Date.now()}`,
  });

  useEffect(() => {
    // Read configuration from URL parameters
    const params = new URLSearchParams(window.location.search);
    const webhookUrl = params.get("webhookUrl");
    const greeting = params.get("greeting");
    const sessionId = params.get("sessionId");

    setConfig({
      webhookUrl: webhookUrl || config.webhookUrl,
      greeting: greeting || config.greeting,
      sessionId: sessionId || config.sessionId,
    });

    // Notify parent window that chatbot is ready (for iframe integration)
    if (window.parent !== window) {
      window.parent.postMessage({ type: "chatbot-ready" }, "*");
    }
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Chatbot
        webhookUrl={config.webhookUrl}
        greeting={config.greeting}
        sessionId={config.sessionId}
      />
    </div>
  );
};

export default ChatbotEmbed;
