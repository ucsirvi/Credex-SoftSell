import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/testimonials";
import ContactForm from "./components/ContactForm";
import ChatWidget from "./components/ChatWidget";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); 

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen w-full ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >

      <div className="absolute top-4 left-4 z-50">

        <img
          src="https://images.seeklogo.com/logo-png/46/1/softcell-logo-png_seeklogo-463482.png?v=1955318132208927080"
          alt="SoftSell Logo"
          className="w-12 h-12 rounded-full" 
        />
      </div>
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg shadow-md focus:outline-none transition duration-300"
          style={{
            backgroundColor: isDarkMode ? "#f3f4f6" : "#1f3337",
            color: isDarkMode ? "#1f2937" : "#f3f4f6",
          }}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>


      <div className="flex flex-col items-center">
        <HeroSection isDarkMode={isDarkMode} />
        <HowItWorks isDarkMode={isDarkMode} />
        <WhyChooseUs isDarkMode={isDarkMode} />
        <Testimonials isDarkMode={isDarkMode} />
        <ContactForm isDarkMode={isDarkMode} />
        <ChatWidget isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default App;
