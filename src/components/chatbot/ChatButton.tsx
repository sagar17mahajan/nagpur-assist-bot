import { Mic } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-primary transition-all duration-300 hover:scale-110 ${
        isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
      }`}
      aria-label="Open chat"
    >
      <div className="relative">
        <Mic className="h-6 w-6 animate-pulse" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="absolute inline-flex h-10 w-10 animate-ping rounded-full bg-primary/30 opacity-75"></span>
        </span>
      </div>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-accent"></span>
      </span>
    </button>
  );
};
