export const TypingIndicator = () => {
  return (
    <div className="flex w-full justify-start mb-4">
      <div className="chat-bubble-bot max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex gap-1.5">
          <div className="typing-dot h-2 w-2 rounded-full bg-current"></div>
          <div className="typing-dot h-2 w-2 rounded-full bg-current"></div>
          <div className="typing-dot h-2 w-2 rounded-full bg-current"></div>
        </div>
      </div>
    </div>
  );
};
