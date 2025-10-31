"use client";
import React, { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: "user" as const, text: input };
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
        sender: "bot" as const,
        text: data.output || "ERROR: Communication failed!",
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `SYSTEM ERROR: ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Player 2 button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-20 h-20 rounded-lg
                   bg-gradient-to-br from-fuchsia-600 to-cyan-600 border-4 border-yellow-400
                   hover:scale-110 active:scale-95 transition-all z-[9999]
                   font-black text-2xl shadow-2xl"
        style={{
          fontFamily: 'Impact, sans-serif',
          boxShadow: '0 0 40px rgba(251, 191, 36, 0.8)',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
        }}>
        {isOpen ? '✕' : 'P2'}
      </button>

      {/* Chat window - Arcade style */}
      {isOpen && (
        <div className="fixed bottom-32 right-8 w-[420px] z-[9999]">
          <div className="bg-black rounded-2xl border-4 border-cyan-500 overflow-hidden"
               style={{
                 boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)'
               }}>
            
            {/* Header marquee */}
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-fuchsia-500 p-1">
              <div className="bg-black px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"
                       style={{
                         boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)'
                       }} />
                  <span className="text-xl font-black text-yellow-400"
                        style={{
                          fontFamily: 'Impact, sans-serif',
                          textShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                        }}>
                    PLAYER 2 READY
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white font-black text-2xl hover:text-red-500 transition-colors">
                  ×
                </button>
              </div>
            </div>

            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 z-10"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)',
                 }} />

            {/* Message area */}
            <div className="relative h-[400px] overflow-y-auto p-6 space-y-4 bg-black
                            scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent">
              
              {messages.length === 0 && (
                <div className="text-center space-y-4 py-8">
                  <div className="text-4xl font-black text-yellow-400 animate-pulse"
                       style={{
                         fontFamily: 'Impact, sans-serif',
                         textShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
                       }}>
                    READY PLAYER TWO
                  </div>
                  <p className="text-cyan-400 font-bold"
                     style={{
                       fontFamily: 'monospace',
                       textShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                     }}>
                    Ask me anything about Connor!
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i}
                     className={`p-4 rounded-lg border-2 ${
                       msg.sender === "user"
                         ? "bg-fuchsia-950/50 border-fuchsia-500 ml-8"
                         : "bg-cyan-950/50 border-cyan-500 mr-8"
                     }`}
                     style={{
                       boxShadow: msg.sender === "user"
                         ? '0 0 15px rgba(217, 70, 239, 0.4)'
                         : '0 0 15px rgba(34, 211, 238, 0.4)'
                     }}>
                  <div className={`text-xs font-bold mb-2 ${
                    msg.sender === "user" ? "text-fuchsia-400" : "text-cyan-400"
                  }`}
                       style={{ fontFamily: 'monospace' }}>
                    {msg.sender === "user" ? "▶ PLAYER 1:" : "▶ PLAYER 2:"}
                  </div>
                  <p className="text-white leading-relaxed"
                     style={{ fontFamily: 'monospace' }}>
                    {msg.text}
                  </p>
                </div>
              ))}

              {isLoading && (
                <div className="p-4 rounded-lg border-2 bg-cyan-950/50 border-cyan-500 mr-8"
                     style={{
                       boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)'
                     }}>
                  <div className="text-xs font-bold mb-2 text-cyan-400"
                       style={{ fontFamily: 'monospace' }}>
                    ▶ PLAYER 2:
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400"
                       style={{ fontFamily: 'monospace' }}>
                    <span className="animate-pulse">Processing</span>
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-4 bg-black border-t-4 border-cyan-500">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-purple-950/50 border-2 border-fuchsia-500 rounded-lg 
                           text-white placeholder-fuchsia-400/50 outline-none
                           focus:border-fuchsia-400 transition-colors"
                style={{
                  fontFamily: 'monospace',
                  boxShadow: '0 0 15px rgba(217, 70, 239, 0.3)'
                }}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 
                          text-black font-black rounded-lg border-4 border-yellow-300
                          hover:scale-105 active:scale-95 transition-transform
                          disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: 'Impact, sans-serif',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
                }}>
                SEND
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
