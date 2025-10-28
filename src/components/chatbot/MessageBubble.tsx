interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const linkifyText = (text: string) => {
  // Match markdown-style links [text](URL)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const phoneRegex = /(\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
  
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;
  
  // First, process markdown links
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    const beforeMatch = text.slice(lastIndex, match.index);
    if (beforeMatch) {
      parts.push(beforeMatch);
    }
    
    const linkText = match[1];
    const url = match[2];
    
    parts.push(
      <a
        key={`link-${match.index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:opacity-80 transition-opacity"
      >
        {linkText}
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text after last match
  const remainingText = text.slice(lastIndex);
  if (remainingText) {
    // Process phone numbers in remaining text
    const phoneParts = remainingText.split(phoneRegex).filter(Boolean);
    phoneParts.forEach((part, index) => {
      if (part.match(/^\+?\d/)) {
        parts.push(
          <a
            key={`phone-${lastIndex}-${index}`}
            href={`tel:${part.replace(/[-.\s]/g, '')}`}
            className="underline hover:opacity-80 transition-opacity"
          >
            {part}
          </a>
        );
      } else {
        parts.push(part);
      }
    });
  }
  
  return parts;
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
