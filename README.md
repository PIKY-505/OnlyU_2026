# 🌌 Only You

> A highly immersive, personalized interactive experience simulating a modern operating system within the browser. Built with a focus on high-performance rendering, fluid motion physics, and aesthetic precision.

![React](https://img.shields.io/badge/React-18.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r160-000000?style=for-the-badge&logo=three.js&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-990000?style=for-the-badge&logo=webgl&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge&logo=react&logoColor=white)
![Sass](https://img.shields.io/badge/Style-Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## 🚀 Engineering Overview

**Only You** is a sophisticated Single Page Application (SPA) that pushes the boundaries of web interactivity. It leverages a hybrid rendering approach, combining the declarative nature of React for UI state with the imperative performance of WebGL for background visual effects.

The architecture is designed to maintain a consistent **60 FPS** even during complex scene transitions, utilizing off-main-thread logic where possible and optimizing React's reconciliation cycle.

### 🧠 Core Architecture & State Management

The application state is managed via **Zustand**, chosen for its transient update capabilities and minimal boilerplate compared to Redux or Context API.

- **Atomic State Model:** The `useGameStore` acts as a single source of truth, handling diverse domains such as:
  - **Session Security:** Lock screen authentication and unlocking sequences.
  - **Inventory System:** Shop transactions, item ownership, and equipment slots (Backgrounds, Cursors, Trails).
  - **UI State:** Modal visibility (Shop, Settings) and active application focus.
- **Persistence:** State is automatically persisted to `localStorage`, ensuring user customization (equipped assets) remains consistent across sessions.

### 🎨 Motion System & UI Physics

The user interface mimics the fluidity of native operating systems (like macOS or iOS) using **Framer Motion**.

- **Mathematical Dock Simulation:**
  - The dock component implements a non-linear magnification curve.
  - It utilizes `useMotionValue` and `useTransform` to map the mouse's X-coordinate to the scale of individual icons.
  - **Performance:** This mapping happens outside the React render loop, directly updating the DOM via CSS transforms for optimal performance.
- **Orchestrated Transitions:**
  - `AnimatePresence` manages the mounting and unmounting of heavy components (like the Shop or 3D backgrounds), allowing for cinematic entry/exit animations (fade, scale, blur).
  - **Shared Layout:** Elements like the active tab indicator in the Shop use `layoutId` for morphing transitions between DOM nodes.

### ⚡ Advanced Graphics Pipeline (WebGL)

The visual core of Only You relies on **Three.js**, employing both vanilla implementations and **@react-three/fiber** (R3F) where declarative scene graphs are beneficial.

#### 1. The Background Controller

A dedicated `BackgroundController` component manages the lifecycle of WebGL contexts. It ensures that GPU resources (geometries, materials, textures) are properly disposed of when switching themes to prevent memory leaks.

#### 2. Shader & Physics Implementations

- **Light Pillars (Volumetric Shader):**
  - Implements a custom fragment shader using ray-marching techniques to simulate volumetric light beams.
  - Features procedural noise for organic intensity fluctuation and color mixing.
- **Floating Lines (Sine-Wave Synthesis):**
  - A fragment shader that renders multiple overlapping sine waves.
  - **Interactivity:** Uniforms are updated in real-time based on mouse position to create a "bending" effect, calculating influence radius and strength on the GPU.
- **Silk (Procedural Fluidity):**
  - Uses `@react-three/fiber`.
  - A vertex displacement shader combined with domain-warping noise to simulate the behavior of silk fabric moving in the wind.
- **Ballpit (Instanced Physics):**
  - Utilizes `InstancedMesh` to render hundreds of spheres with a single draw call.
  - **Custom Physics Engine:** A lightweight JavaScript physics implementation handles collision detection (sphere-to-sphere and sphere-to-wall) and velocity integration (Verlet/Euler) without the overhead of a heavy library like Cannon.js.
- **Galaxy (Particle System):**
  - A classic particle system where vertex positions are updated based on a central gravitational point and mouse repulsion forces.

### 🛠️ Key Feature Implementation

#### 🔐 Security Simulation (Lock Screen)

- **Haptic Visual Feedback:** CSS keyframe animations (`shake`) are triggered upon invalid input.
- **Cinematic Unlock:** A coordinated sequence that fades out the overlay while simultaneously zooming in the desktop background, creating a sense of depth.

#### 🛍️ Hot-Swapping Inventory Engine

- The Shop system allows for instant asset swapping.
- **Dynamic Previews:** Items are rendered with live CSS gradients or icons.
- **Reactive Updates:** Changing a background or cursor triggers an immediate global state update, reflected instantly in the `BackgroundController` and CSS variables.

#### 🖱️ Cursor & Trail System

- **Custom Cursor:** Replaces the native system cursor with CSS-based alternatives.
- **Motion Trails:** A trailing component follows the mouse coordinates with a slight delay (linear interpolation or spring physics), rendering a sequence of images (GIFs/PNGs) to create a "snake" effect.

#### 🎵 Integrated Audio Player

- Persistent floating player with playlist management.
- Full controls: Play/Pause, interactive Seek bar, and volume control.

## 📂 Directory Structure

The project follows a feature-based modular architecture:

```bash
src/
├── assets/             # Static binary assets (Textures, Audio, Icons)
├── components/
│   ├── Backgrounds/    # WebGL/Three.js implementations (Shaders, Scenes)
│   ├── Shop/           # Inventory logic, Item Grids, Tab Systems
│   ├── UI/             # Core UI (Dock, LockScreen, Menus)
│   └── ...
├── store/              # Zustand stores (Business Logic & State)
├── styles/             # SCSS Modules (Variables, Mixins, Global Styles)
└── App.jsx             # Root Orchestrator
```
