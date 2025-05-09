import React, { useState, useEffect } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"; 
import { motion } from "framer-motion"; 

const ChatWidget = ({ isDarkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      setLoading(true);

      try {
        const botResponse = await getBotResponse(input);
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Error fetching response. Please try again later.",
            sender: "bot",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const getBotResponse = async (userInput) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", 
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput },
          ],
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error.message || "API request failed");
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content.trim(),
        sender: "bot",
      };
    } catch (error) {
      console.error("Error fetching response:", error);
      return {
        text: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: "bot",
      };
    }
  };

  useEffect(() => {
    class Element {
      dpr = 1;
      toValue = (value) => value * this.dpr;
      draw = () => {};
      update = () => {};
    }

    class Background extends Element {
      draw = ({ ctx, canvas }) => {
        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = isDarkMode ? "#1f2937" : "#ffffff"; 
        ctx.fillRect(0, 0, w, h);
      };
    }

    class Canvas {
      constructor(elements = []) {
        this.canvas = document.getElementById("chatWidgetCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.elements = elements;

        this.setCanvasSize();
        window.addEventListener("resize", this.setCanvasSize);
      }

      setCanvasSize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      };

      render = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.elements.forEach((element) => {
          element.draw(this);
          element.update(this);
        });
      };
    }

    const canvas = new Canvas([new Background()]);
    canvas.render();
  }, [isDarkMode]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <canvas
        id="chatWidgetCanvas"
        className="absolute w-12 h-12"
        style={{
          zIndex: 0, 
          borderRadius: "50%", 
        }}
      />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-lg hover:scale-105 transition transform flex items-center justify-center relative z-10 ${
          isOpen
            ? isDarkMode
              ? "bg-gray-800 text-white" 
              : "bg-white text-gray-900" 
            : isDarkMode
            ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white"
            : "bg-gradient-to-r from-blue-500 to-teal-400 text-gray-900"
        }`}
        style={{
          width: "48px", 
          height: "48px", 
          borderRadius: "50%", 
        }}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" /> 
        ) : (
          <ChatBubbleLeftEllipsisIcon className="h-6 w-6" /> 
        )}
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className={`${
          isOpen ? "block" : "hidden"
        } shadow-lg rounded-lg p-4 w-80 mt-4 relative z-10 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="h-64 overflow-y-auto border-b">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`my-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === "user"
                    ? isDarkMode
                      ? "bg-teal-700 text-white"
                      : "bg-teal-500 text-white"
                    : isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-green-100 text-black"
                }`}
              >
                {msg.text}
              </span>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              className="text-left my-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                Typing...
              </span>
            </motion.div>
          )}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "border-gray-600 bg-gray-800 text-white focus:ring-teal-400"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className={`rounded-r-lg px-4 hover:scale-105 transition transform ${
              isDarkMode ? "bg-teal-700 text-white" : "bg-teal-500 text-white"
            }`}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatWidget;
