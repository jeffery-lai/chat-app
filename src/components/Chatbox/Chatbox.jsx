import React from "react";

const Chatbox = ({ messages }) => {
  return (
    <div className="space-y-3 flex flex-col px-5">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-[75%] break-word whitespace-pre-wrap overflow-x-hidden px-4 py-2 rounded-2xl ${
            message.sender === "user"
              ? "bg-blue-500 self-end"
              : "bg-neutral-700 self-start"
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default Chatbox;
