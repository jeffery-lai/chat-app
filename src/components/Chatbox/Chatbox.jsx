import React from "react";
import ReactMarkdown from "react-markdown";

const Chatbox = ({ messages }) => {
  return (
    <div className="space-y-3 flex flex-col px-5">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-[75%] break-words whitespace-pre-wrap overflow-x-auto px-4 py-2 no-scrollbar rounded-2xl ${
            message.sender === "user"
              ? "bg-blue-500 self-end"
              : "bg-neutral-700 self-start"
          }`}
        >
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default Chatbox;
