import { useState } from "react";
import StarIcon from "@/assets/icons/starsAI.svg";
import MessageInput from "./MessageInput";
import BotChat from "./BotChat";


export default function BotIdle() {
  const [started, setStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");
  const suggestions = [
    "I feel overwhelmed lately",
    "Give me some journaling ideas",
    "Suggest calming exercises",
  ];

  const handleStart = (text) => {
    if (!text.trim()) return;
    setInitialMessage(text.trim());
    setStarted(true);
  };

  if (started) {
    return <BotChat initialMessage={initialMessage} />;
  }

  return (
    <div className="flex flex-col min-h-screen max-w-3xl mx-auto px-4 py-24">
      {/* Header */}
      <div className="flex flex-col items-center space-y-2">
        <img src={StarIcon} alt="Bot Icon" className="w-10 h-10" />
        <h1 className="text-lg font-medium text-center text-zinc-800 font-mono tracking-tight">
          Ask BrainBot about anything
        </h1>
      </div>

      <div className="flex-1" />

      <div>
        <p className="flex justify-center text-sm text-zinc-500 mb-3">
          Suggestions on what to ask our AI
        </p>
        <div className="flex justify-center mb-4 flex-wrap gap-2">
          {suggestions.map((text, index) => (
            <button
              key={index}
              onClick={() => handleStart(text)}
              className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100/70 rounded-full hover:bg-purple-200 transition border border-purple-200">
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Footer - message input and disclaimer */}
      <MessageInput onSend={handleStart} />
      <p className="text-[10px] font-bold text-center text-zinc-500">
        BrainBot can make mistakes. Please consult your doctor to get better advice.
      </p>
    </div>
  );
}