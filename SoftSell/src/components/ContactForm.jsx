import React, { useState, useEffect } from "react";

const ContactForm = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.licenseType)
      newErrors.licenseType = "License Type is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setFormData({
        name: "",
        email: "",
        company: "",
        licenseType: "",
        message: "",
      });
    } else {
      setErrors(validationErrors);
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
        this.canvas = document.getElementById("contactFormCanvas");
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
        id="contactFormCanvas"
        className="absolute inset-0 w-full h-full"
      />

      <div
        className="relative z-10 max-w-2xl mx-auto p-8 rounded-lg shadow-lg"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, #203043, #0f2027)"
            : "linear-gradient(135deg, #ffffff, #e5e7eb)", 
          color: isDarkMode ? "white" : "black", 
        }}
      >
        <h2 className="text-4xl font-bold text-center mb-8 drop-shadow-lg">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white focus:ring-teal-400"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
              }`}
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white focus:ring-teal-400"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="company">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white focus:ring-teal-400"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
              }`}
            />
            {errors.company && (
              <p className="text-red-500 mt-1">{errors.company}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="licenseType">
              License Type
            </label>
            <select
              id="licenseType"
              name="licenseType"
              value={formData.licenseType}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white focus:ring-teal-400"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
              }`}
            >
              <option value="">Select License Type</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
              <option value="subscription">Subscription</option>
            </select>
            {errors.licenseType && (
              <p className="text-red-500 mt-1">{errors.licenseType}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white focus:ring-teal-400"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 mt-1">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-lg font-semibold hover:scale-105 transition transform shadow-lg ${
              isDarkMode
                ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                : "bg-gradient-to-r from-blue-500 to-teal-400 text-gray-900"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
