import React, { useEffect } from "react";
import { motion } from "framer-motion";

const HowItWorks = ({ isDarkMode }) => {
  const steps = [
    {
      id: 1,
      title: "Upload License",
      description: "Simply upload your software license to our platform.",
      icon: "📤",
    },
    {
      id: 2,
      title: "Get Valuation",
      description: "Receive a fair valuation based on current market trends.",
      icon: "💰",
    },
    {
      id: 3,
      title: "Get Paid",
      description: "Once approved, get paid quickly and securely.",
      icon: "✅",
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

    class Ring extends Element {
      constructor({ radius, pointAmount, speed, wobble, warp }) {
        super();
        this.points = [];
        this.speed = speed;
        this.wobble = wobble;
        this.warp = warp;

        this.center = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };

        for (let i = 0; i < pointAmount; i++) {
          const radian = (Math.PI * 2 * i) / pointAmount;
          const x = this.center.x + radius * Math.cos(radian);
          const y = this.center.y + radius * Math.sin(radian);

          this.points.push({
            x,
            y,
            radian,
          });
        }
      }

      draw = ({ ctx }) => {
        ctx.lineWidth = 2;
        ctx.strokeStyle = isDarkMode
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(0, 0, 0, 0.7)"; 
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 0; i < this.points.length; i++) {
          const nextPoint = this.points[(i + 1) % this.points.length];
          ctx.quadraticCurveTo(
            this.points[i].x,
            this.points[i].y,
            (this.points[i].x + nextPoint.x) / 2,
            (this.points[i].y + nextPoint.y) / 2
          );
        }

        ctx.closePath();
        ctx.stroke();
      };

      update = ({ tick }) => {
        this.points = this.points.map((p, i) => {
          const wobbleAmount = Math.sin(tick / 20 + i) * this.wobble;
          const warpAmount = Math.cos(tick / 100) * this.warp;
          return {
            ...p,
            x: p.x + wobbleAmount - warpAmount,
            y: p.y - wobbleAmount + warpAmount,
          };
        });
      };
    }

    class Canvas {
      constructor(elements = []) {
        this.canvas = document.getElementById("howItWorksCanvas");
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

    const rings = [
      new Ring({
        radius: 300,
        pointAmount: 12,
        speed: 1.5,
        wobble: 3,
        warp: 2,
      }),
      new Ring({
        radius: 200,
        pointAmount: 8,
        speed: 1.2,
        wobble: 2,
        warp: 1.5,
      }),
    ];

    rings.forEach((ring) => {
      canvas.elements.push(ring);
    });

    canvas.render();
  }, [isDarkMode]);

  return (
    <section className="relative py-20 w-full overflow-hidden">
      <canvas
        id="howItWorksCanvas"
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10">
        <h2
          className={`text-4xl font-extrabold text-center mb-12 drop-shadow-lg ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          How It Works
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
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
                scale: 1.05,
                rotate: 2,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ scale: 1.3, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
