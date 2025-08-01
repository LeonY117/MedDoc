"use client";

import React, { useRef } from "react";

interface Props {
  value: string;
  onValueChange: (v: string) => void;
  onSend: () => void;
  loading: boolean;
  maxRows?: number;
}

const ChatInput: React.FC<Props> = ({
  value,
  onValueChange,
  onSend,
  loading,
  maxRows = 4,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const lineHeight = 24;
    const maxHeight = lineHeight * maxRows;
    const newHeight = Math.min(ta.scrollHeight, maxHeight);
    ta.style.height = `${newHeight}px`;
    ta.style.overflowY = newHeight >= maxHeight ? "auto" : "hidden";
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="p-3 flex gap-2 items-end self-center w-4/5 mb-6 rounded-3xl shadow-lg border border-gray-300"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
          autoResize();
        }}
        rows={1}
        placeholder="Ask Ello anything…"
        className="flex-1 rounded p-2 resize-none focus:outline-none transition-all custom-scrollbar"
        style={{ height: '2rem', maxHeight: `${maxRows * 24}px` }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
      >
        Ask
      </button>
    </form>
  );
};

export default ChatInput;
