import React, { useState, useRef, useEffect }  from "react";
import Chatbox from "./components/Chatbox/Chatbox";
import Inputbox from "./components/Inputbox/Inputbox";

const App = () => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message) => {
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const reader = response.body.getReader();
      let assistantMessage = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]); // Add empty message first

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        assistantMessage.content += new TextDecoder().decode(value);
        setMessages((prev) => [...prev.slice(0, -1), assistantMessage]); // Update last message
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsTyping(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
      <div className="h-10" />
      <div className="w-full max-w-4xl flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto p-4">
          <Chatbox messages={messages} />
          <div ref={chatEndRef} />
        </div>

        <div className="sticky bottom-0 w-full bg-neutral-900 p-4">
          <Inputbox onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
