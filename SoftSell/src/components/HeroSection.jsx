import React, { useEffect } from "react";

const HeroSection = ({ isDarkMode }) => {
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
        this.canvas = document.getElementById("canvas");
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

    const maxRings = 8; 
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
      if (canvas.elements.length < maxRings) {
        canvas.elements.push(ring);
      }
    });

    canvas.render();
  }, [isDarkMode]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen w-full text-center px-4 ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}
    >
      <canvas id="canvas" className="absolute inset-0 w-full h-full" />

      <div className="relative z-10">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Welcome to{" "}
          <span className={`${isDarkMode ? "text-teal-400" : "text-blue-500"}`}>
            SoftSell
          </span>
        </h1>
        <p className="text-2xl mb-8 max-w-3xl drop-shadow-md">
          Your trusted partner for reselling unused software licenses with ease
          and security.
        </p>
        <a
          href="#contact"
          className={`px-8 py-4 rounded-lg font-semibold hover:scale-105 transition transform shadow-lg ${
            isDarkMode
              ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white"
              : "bg-gradient-to-r from-blue-500 to-teal-400 text-gray-900"
          }`}
        >
          Get a Quote
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
