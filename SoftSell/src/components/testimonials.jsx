import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sachin Joshi",
    role: "Software Engineer",
    company: "Tech Innovations",
    review:
      "SoftSell made the process of selling my software licenses incredibly easy. Highly recommend!",
  },
  {
    name: "Virat Sharma",
    role: "Product Manager",
    company: "Creative Solutions",
    review:
      "Fair valuation and fast payment. SoftSell is a game changer in the software resale market!",
  },
  {
    name: "Mohit Singh",
    role: "CTO",
    company: "Future Tech",
    review:
      "SoftSell's platform is intuitive and efficient. I was able to sell my licenses in no time!",
  },
];

const Testimonials = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

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

        const gradient = ctx.createRadialGradient(
          w / 2,
          h / 2,
          0,
          w / 2,
          h / 2,
          w
        );
        gradient.addColorStop(0, isDarkMode ? "#0f2027" : "#ffffff"); 
        gradient.addColorStop(0.5, isDarkMode ? "#203a43" : "#e5e7eb"); 
        gradient.addColorStop(1, isDarkMode ? "#2c5364" : "#d1d5db");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      };
    }

    class Canvas {
      constructor(elements = []) {
        this.canvas = document.getElementById("testimonialsCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.elements = elements;
        this.tick = 0;

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
        this.tick += 1;
        requestAnimationFrame(this.render);
      };
    }

    const canvas = new Canvas([new Background()]);
    canvas.render();
  }, [isDarkMode]);

  return (
    <section
      className={`relative py-40 w-full overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <canvas
        id="testimonialsCanvas"
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2
          className={`text-4xl font-extrabold text-center mb-8 drop-shadow-lg ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          What Our Customers Say
        </h2>
        <div className="relative">
          <AnimatePresence>
            {testimonials.map(
              (testimonial, index) =>
                index === currentIndex && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.8 }}
                    className={`absolute w-full flex flex-col items-center text-center p-12 rounded-lg shadow-lg ${
                      isDarkMode
                        ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white"
                        : "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="italic text-xl mb-4">
                      "{testimonial.review}"
                    </p>
                    <h3 className="text-2xl font-semibold mb-2">
                      {testimonial.name}
                    </h3>
                    <p className="text-xl mb-2">{testimonial.role}</p>
                    <p className="text-lg">{testimonial.company}</p>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
        <div className="flex justify-center m-10 space-x-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-6 h-6 rounded-full ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
