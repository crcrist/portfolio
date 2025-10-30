"use client";
import React, { useState } from "react";

type ChatbotProps = {
  screenColor: "green" | "amber";
};

export default function Chatbot({ screenColor }: ChatbotProps) {
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
        text: data.output || "ERROR: Response generation failed.",
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `SYSTEM_ERROR: ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const glowColor = screenColor === 'green' 
    ? 'rgba(52, 211, 153, 0.8)' 
    : 'rgba(251, 191, 36, 0.8)';

  return (
    <>
      {/* Floating terminal button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-lg border-4
                   transition-all duration-300 hover:scale-110 z-[9999] font-mono font-bold text-2xl
                   ${screenColor === 'green'
                     ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                     : 'bg-amber-950 border-amber-500 text-amber-400'}`}
        style={{
          boxShadow: `0 0 30px ${glowColor}, inset 0 0 20px ${glowColor}`,
          textShadow: `0 0 10px ${glowColor}`
        }}>
        {isOpen ? '×' : '>_'}
      </button>

      {/* Terminal window */}
      {isOpen && (
        <div className={`fixed bottom-28 right-8 w-[480px] rounded-xl border-4 overflow-hidden z-[9999]
                        ${screenColor === 'green'
                          ? 'bg-black border-emerald-500'
                          : 'bg-black border-amber-500'}`}
             style={{
               boxShadow: `0 0 40px ${glowColor}, inset 0 0 30px ${glowColor}`
             }}>
          
          {/* Terminal header */}
          <div className={`px-6 py-4 border-b-4 flex items-center justify-between
                          ${screenColor === 'green'
                            ? 'bg-emerald-950/50 border-emerald-500'
                            : 'bg-amber-950/50 border-amber-500'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full animate-pulse
                              ${screenColor === 'green' ? 'bg-emerald-400' : 'bg-amber-400'}`}
                   style={{
                     boxShadow: `0 0 10px ${glowColor}`
                   }} />
              <span className={`font-mono text-sm font-bold
                               ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
                    style={{
                      textShadow: `0 0 10px ${glowColor}`
                    }}>
                CHAT_TERMINAL.exe
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`font-mono font-bold hover:scale-110 transition-transform
                         ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}>
              [X]
            </button>
          </div>

          {/* Scanlines overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 z-10"
               style={{
                 backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
               }} />

          {/* Message area */}
          <div className="relative h-[400px] overflow-y-auto p-6 space-y-4 font-mono text-sm
                          scrollbar-thin"
               style={{
                 color: screenColor === 'green' ? '#4ade80' : '#fbbf24',
                 textShadow: `0 0 5px ${glowColor}`
               }}>
            
            {messages.length === 0 && (
              <div className="space-y-2">
                <p>&gt; TERMINAL READY</p>
                <p>&gt; Type your query below</p>
                <p>&gt; Press ENTER to transmit</p>
                <p className="mt-4">_________________________________</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className="space-y-1">
                {msg.sender === "user" ? (
                  <>
                    <p className="opacity-60">&gt; USER_INPUT:</p>
                    <p className="pl-4">{msg.text}</p>
                  </>
                ) : (
                  <>
                    <p className="opacity-60">&gt; SYSTEM_RESPONSE:</p>
                    <p className="pl-4">{msg.text}</p>
                  </>
                )}
                <p className="opacity-30">_________________________________</p>
              </div>
            ))}

            {isLoading && (
              <div className="space-y-2">
                <p className="opacity-60">&gt; SYSTEM_RESPONSE:</p>
                <p className="pl-4 animate-pulse">Processing query{'.'.repeat(3)}</p>
              </div>
            )}
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-3 p-4 border-t-4
                       ${screenColor === 'green'
                         ? 'bg-emerald-950/50 border-emerald-500'
                         : 'bg-amber-950/50 border-amber-500'}`}>
            <span className={`font-mono font-bold
                             ${screenColor === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}
                  style={{
                    textShadow: `0 0 10px ${glowColor}`
                  }}>
              &gt;
            </span>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter command..."
              className={`flex-1 bg-transparent outline-none font-mono
                         placeholder-opacity-40
                         ${screenColor === 'green'
                           ? 'text-emerald-400 placeholder-emerald-400'
                           : 'text-amber-400 placeholder-amber-400'}`}
              style={{
                textShadow: `0 0 5px ${glowColor}`
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 border-2 rounded font-mono font-bold text-xs
                         transition-all duration-200 disabled:opacity-50
                         ${screenColor === 'green'
                           ? 'border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black'
                           : 'border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black'}`}>
              [SEND]
            </button>
          </form>
        </div>
      )}
    </>
  );
}
