interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const linkifyText = (text: string) => {
  // Match URLs and phone numbers, excluding trailing punctuation
  const urlRegex = /(https?:\/\/[^\s]+?)(?=[.,;:!?)\]}\s]|$)/g;
  const phoneRegex = /(\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
  
  // Combined regex to match both URLs and phone numbers
  const combinedRegex = new RegExp(`(${urlRegex.source})|(${phoneRegex.source})`, 'g');
  const parts = text.split(combinedRegex).filter(Boolean);
  
  return parts.map((part, index) => {
    if (!part) return null;
    
    // Check if it's a URL
    if (part.match(/^https?:\/\//)) {
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
    
    // Check if it's a phone number
    if (part.match(/^\+?\d/)) {
      return (
        <a
          key={index}
          href={`tel:${part.replace(/[-.\s]/g, '')}`}
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
