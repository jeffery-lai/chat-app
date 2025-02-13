import React, { useState } from "react";
import Chatbox from "./components/Chatbox/Chatbox";
import Inputbox from "./components/Inputbox/Inputbox";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      const data = await response.json();
      if (data.response) {
        setMessages((prev) => [...prev, { text: data.response, sender: "system" }]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
      <div className="h-10" />
      <div className="w-full max-w-4xl flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto p-4">
          <Chatbox messages={messages} />
        </div>

        <div className="sticky bottom-0 w-full bg-neutral-900 p-4">
          <Inputbox onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
