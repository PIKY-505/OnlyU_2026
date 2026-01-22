# 🌌 Only You

> A personalized interactive experience built with modern web technologies, focused on aesthetics, fluid animations, and advanced graphic rendering.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-990000?style=for-the-badge&logo=webgl&logoColor=white)

## 🚀 Technical Overview

This project is a highly interactive **Single Page Application (SPA)** that combines complex global state logic with high-performance visual effects. It is not just an interface; it is a simulated operating system within the browser.

### 🧠 Core & Architecture

- **Framework:** React 18+ on Vite for instant HMR (Hot Module Replacement) and optimized builds.
- **State Management (Zustand):**
  - A centralized store (`useGameStore`) is used to handle application state atomically.
  - **Persistence:** Controls app unlocking, shop inventory, and equipped items (backgrounds, cursors, pets) without prop-drilling.

### 🎨 UI/UX & Animations (Framer Motion)

The interface comes to life thanks to **Framer Motion**, utilizing spring physics for a natural feel.

- **Dynamic Dock:**
  - Replicates the macOS magnification effect.
  - Uses `useMotionValue` and `useTransform` to map mouse position to icon scale in real-time (60fps), avoiding costly React re-renders.
- **Screen Transitions:**
  - Usage of `AnimatePresence` to manage component lifecycles upon mounting and unmounting (e.g., opening/closing the shop, unlocking screen).
  - Coordinated blur effects (`backdrop-filter`) and scaling.

### ⚡ Graphics & Shaders (WebGL)

The project implements advanced graphic rendering for backgrounds, optimized for performance:

1.  **Galaxy Background (OGL):**
    - Implemented with a lightweight WebGL library.
    - Particle simulation with custom **Vertex & Fragment Shaders**.
    - Reactive interactivity: Stars respond to mouse position via `uniforms` updated every frame.
2.  **Silk Background:**
    - Procedural GLSL shader to simulate fluids and silk textures in motion.
    - Rendered on a 3D plane covering the full viewport.

### 🛠️ Key Features

#### 🔐 Security System (Lock Screen)

- Initial lock screen protecting content.
- Passcode validation with visual feedback ("shake" animation on error and visual haptic feedback).
- Cinematic transition upon unlocking (fade-out and zoom-in towards the desktop).

#### 🛍️ Customization Engine (Shop)

- Real-time equipment system (**Hot-swapping**).
- Changes in backgrounds, cursors, or pets are reflected instantly throughout the application.
- User interface with animated tabs and dynamic color/asset previews.

#### 🖱️ Cursor Trails & Pets

- Pointer tracking system that renders graphic elements (GIFs/PNGs) following the mouse.
- Uses linear interpolation or spring physics (`damping` / `stiffness`) so pet movement feels smooth and organic, not robotic.

#### 🎵 Integrated Audio Player

- Persistent floating player.
- Playlist management with metadata support.
- Full controls: Play/Pause, interactive Seek bar, and volume control.

## 📂 Project Structure

```bash
src/
├── assets/          # Static resources (images, music, icons)
├── components/      # Modular React components
│   ├── Backgrounds/ # WebGL and Canvas implementations
│   ├── Shop/        # Shop logic and item grid
│   ├── UI/          # Interface components (Dock, Menus, LockScreen)
│   └── ...
├── store/           # Zustand stores (business logic)
├── styles/          # Modular SCSS files for complex styles
└── App.jsx          # Entry point and layer orchestration
```
