import React, { useEffect } from "react";
import { motion } from "framer-motion";

const WhyChooseUs = ({ isDarkMode }) => {
  const reasons = [
    {
      icon: "🌟",
      title: "Trusted Expertise",
      description:
        "Our team has years of experience in software resale, ensuring you get the best value for your licenses.",
    },
    {
      icon: "💰",
      title: "Competitive Pricing",
      description:
        "We offer the most competitive prices in the market, maximizing your returns on software licenses.",
    },
    {
      icon: "🔒",
      title: "Secure Transactions",
      description:
        "Your data and transactions are safe with us, thanks to our robust security measures.",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any inquiries.",
    },
  ];

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
        this.canvas = document.getElementById("whyChooseUsCanvas");
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
    <section className="relative py-20 w-full overflow-hidden">
      <canvas
        id="whyChooseUsCanvas"
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2
          className={`text-4xl font-extrabold text-center mb-12 drop-shadow-lg ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Why Choose Us
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white"
                  : "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900"
              }`}
              variants={{
                hidden: { opacity: 0, y: 50 }, 
                visible: { opacity: 1, y: 0 }, 
              }}
              whileHover={{
                scale: 1.1, 
                rotate: 2, 
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.4)", 
              }}
            >
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ scale: 1.3, rotate: 15 }} 
                transition={{ type: "spring", stiffness: 300 }}
              >
                {reason.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p>{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
