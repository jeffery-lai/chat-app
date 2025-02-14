import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Chatbox = ({ messages }) => {
  return (
    <div className="space-y-3 flex flex-col px-5">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-[75%] break-words whitespace-pre-wrap overflow-x-auto px-4 py-2 no-scrollbar rounded-2xl ${
            message.role === "user"
              ? "bg-blue-500 self-end"
              : "bg-neutral-700 self-start"
          }`}
        >
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                return inline ? (
                  <code className="bg-gray-700 px-1 py-0.5 rounded">{children}</code>
                ) : (
                  <SyntaxHighlighter style={atomDark} language="javascript" {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default Chatbox;
