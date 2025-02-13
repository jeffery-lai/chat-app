import React, { useState, useRef, useEffect } from "react";
import icon from "../../assets/send.png";

const Inputbox = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  // Adjusts the height of the textarea dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [inputValue]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
    }
  }
  
  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex w-full bg-neutral-700 p-3 rounded-3xl">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 px-5 py-3 bg-neutral-700 rounded-3xl resize-none overscroll-contain min-h-12 max-h-40 outline-none no-scrollbar"
          onKeyDown={handleEnter}
        />
        <button
          onClick={handleSend}
          className="ml-2 px-6 py-3 bg-blue-500 rounded-3xl hover:bg-blue-600 transition">
          <img src={icon} alt="Send" width="30" height="30" />
        </button>
      </div>
    </div>
  );
};

export default Inputbox;
