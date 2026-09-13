# Priyanshi Srivastava - 360° Interactive Developer Portfolio

Live Production Site: [https://priyanshi-portfolio-3.vercel.app](https://priyanshi-portfolio-3.vercel.app)

An interactive, dark-mode software engineer and creative technologist portfolio featuring continuous 360-degree interactive portrait rotation, multi-plane kinetic typography parallax, and fluid sub-pixel inertia smooth scrolling.

---

## Highlights & Features

- **360° Rotating Portrait Engine**:
  - Full transparent subject multi-angle rotation (8 continuous isometric & profile perspectives: 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°).
  - High-performance 60fps/120fps HTML5 Canvas cross-dissolve with Hermite smoothstep interpolation.
  - Interactive scrub controls: Scroll-velocity driven scrubbing, touch/drag rotational spin, and idle auto-rotation.
- **Scroll-Driven Kinetic Typography Parallax**:
  - 3D cosine-eased parallax shifting across synchronized roles (*Creative Developer*, *Full Stack Dev*, *Scalable Systems*, *AI & ML Engineer*).
  - Multi-plane Z-axis depth tracking on section headers, execution roots, and dynamic background particle orbs.
- **Lenis Fluid Inertia Scrolling**:
  - Replaces discrete 100px mousewheel notches with smooth sub-pixel exponential deceleration (`2^(-10t)`).
  - Smooth anchor link navigation and synchronized scroll animations.
- **Terminal Dispatch & System Status**:
  - Real-time interactive command terminal with command history and instant output.
  - Live status indicators, UTC time clock, and cybernetic telemetry nodes.
- **Responsive & Accessible**:
  - Mobile touch gestures, accessible semantic markup, ARIA labels, and responsive layout across all screen sizes.

---

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System & Neon Glassmorphism), Vanilla JavaScript ES6+
- **Animation & Physics**: Lenis Smooth Scroll, HTML5 2D Canvas, Web Animations API
- **Deployment**: Vercel (Edge Network) & GitHub

---

## Getting Started Locally

Clone the repository:
```bash
git clone https://github.com/priyanshi02-lyt/portfolio-website.git
cd portfolio-website
```

Serve with any static file server:
```bash
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## License & Attribution

Designed and developed by [Priyanshi Srivastava](https://github.com/priyanshi02-lyt). All rights reserved.
