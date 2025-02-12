import React, { useState } from "react";
import Chatbox from "./components/Chatbox/Chatbox";
import Inputbox from "./components/Inputbox/Inputbox";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);

    // Simulated system response
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "This is a system response.", sender: "system" }]);
    }, 1000);
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
