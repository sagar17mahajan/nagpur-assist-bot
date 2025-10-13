import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
        isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
      }`}
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary"></span>
      </span>
    </button>
  );
};
