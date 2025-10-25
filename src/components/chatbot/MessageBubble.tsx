interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const linkifyText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export const MessageBubble = ({ message, isUser, timestamp }: MessageBubbleProps) => {
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm animate-fade-in ${
          isUser
            ? "chat-bubble-user rounded-br-md"
            : "chat-bubble-bot rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{linkifyText(message)}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isUser ? "opacity-90" : "opacity-60"}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};
