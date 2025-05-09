# SoftSell

SoftSell is a React-based web application built with Vite. It provides a platform for reselling unused software licenses with ease and security. The application includes various sections such as a hero section, how it works, why choose us, testimonials, a contact form, and a chat widget. It also supports a light/dark mode toggle for enhanced user experience.

---

## Features Implemented

### 1. **Light/Dark Mode Toggle**
- A global light/dark mode toggle is implemented using React's `useState`.
- The toggle dynamically updates the background, text, and component styles across the entire application.
- Each component (`HeroSection`, `HowItWorks`, `WhyChooseUs`, `Testimonials`, `ContactForm`, and `ChatWidget`) accepts the `isDarkMode` prop to apply conditional styles.

### 2. **Hero Section**
- A visually appealing hero section with animated canvas background.
- Dynamic text and button styles based on the light/dark mode.

### 3. **How It Works**
- A step-by-step guide displayed in a grid layout.
- Each step includes an icon, title, and description.
- Animations are implemented using `framer-motion`.

### 4. **Why Choose Us**
- A grid layout showcasing reasons to choose SoftSell.
- Each card includes an icon, title, and description with hover effects.

### 5. **Testimonials**
- A carousel displaying customer testimonials.
- Auto-slide functionality with navigation dots.
- Dynamic background and text styles based on the light/dark mode.

### 6. **Contact Form**
- A fully functional contact form with validation.
- Fields include name, email, company, license type, and message.
- Dynamic input and button styles based on the light/dark mode.

### 7. **Chat Widget**
- A floating chat widget for user interaction.
- Includes a toggle button to open/close the chat.
- Displays user and bot messages with typing animations.
- Dynamic styles for messages and input fields based on the light/dark mode.

---

## Design Choices

### 1. **Tailwind CSS**
- Tailwind CSS is used for styling due to its utility-first approach and ease of customization.
- Dynamic classes are applied based on the `isDarkMode` state.

### 2. **Framer Motion**
- Framer Motion is used for animations, such as fade-ins, hover effects, and transitions.

### 3. **Canvas Animations**
- Custom canvas animations are implemented in the `HeroSection`, `HowItWorks`, and `Testimonials` components for a modern and interactive design.

### 4. **Responsive Design**
- The application is fully responsive and adapts to different screen sizes.

### 5. **Component-Based Architecture**
- Each section of the application is implemented as a reusable React component.

---

## Time Spent

### Total Time: ~10 hours
- **Initial Setup**: 1 hour
- **Light/Dark Mode Implementation**: 2 hours
- **Component Development**:
  - Hero Section: 1.5 hours
  - How It Works: 1 hour
  - Why Choose Us: 1 hour
  - Testimonials: 1.5 hours
  - Contact Form: 1.5 hours
  - Chat Widget: 1.5 hours

