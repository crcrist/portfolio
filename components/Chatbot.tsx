"use client";
import React, { useState } from "react";

/**
 * Chatbot component
 * – floating bottom-right chat bubble
 * – toggles open/close
 * – sends POST to /api/chat
 * – shows conversation history
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // optimistic user message
    const newMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.text }),
      });

      const data = await response.json();
      const botMessage = {
        sender: "bot",
        text: data.output || "Sorry, I wasn’t able to generate a response.",
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `Error: ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl z-[9999]"
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-[#0e3b2f]/95 backdrop-blur-lg text-white border border-emerald-700 rounded-2xl shadow-2xl flex flex-col z-[9999]">
          <div className="p-3 border-b border-emerald-700 font-semibold text-emerald-200">
            Ask about Connor Crist
          </div>

          {/* Message area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 max-h-96">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-emerald-700/80 self-end text-right"
                    : "bg-emerald-900/70 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="text-sm text-emerald-300 animate-pulse">
                Thinking…
              </div>
            )}
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="flex border-t border-emerald-700"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 p-2 bg-transparent outline-none text-white placeholder-emerald-400"
            />
            <button
              type="submit"
              className="px-3 text-emerald-300 hover:text-white"
              disabled={isLoading}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
