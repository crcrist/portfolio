"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-emerald-900/80 text-white backdrop-blur-lg rounded-2xl shadow-lg border border-emerald-700 z-[9999]">
      <div className="h-64 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block px-3 py-2 rounded-xl ${
                m.role === "user"
                  ? "bg-emerald-600/70"
                  : "bg-emerald-800/70"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-sm text-emerald-300 italic">Connor’s Advocate is thinking…</p>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex border-t border-emerald-700">
        <input
          type="text"
          placeholder="Ask about Connor..."
          className="flex-grow bg-transparent px-3 py-2 outline-none text-white placeholder-emerald-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 text-emerald-200 hover:text-emerald-100 transition"
          disabled={loading}
        >
          ↩︎
        </button>
      </form>
    </div>
  );
}
