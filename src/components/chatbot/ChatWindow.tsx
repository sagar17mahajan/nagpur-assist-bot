import { ReactNode } from "react";
import { X } from "lucide-react";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ChatWindow = ({ isOpen, onClose, children }: ChatWindowProps) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl transition-all duration-300 ${
        isOpen
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      }`}
      style={{
        maxHeight: "calc(100vh - 100px)",
        maxWidth: "calc(100vw - 48px)",
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 bg-transparent">
        <div className="flex-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            💬 NMC AI मित्र !
          </h2>
          <p className="text-xs opacity-90 mt-0.5">Powered by MARS</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 transition-colors hover:bg-white/20"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      {children}
    </div>
  );
};
