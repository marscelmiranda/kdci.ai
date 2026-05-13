# Replit Prompt: KDCI.ai Hero Background Graphic

Paste this into Replit Agent:

---

## PROMPT START

Create an animated hero background component for kdci.ai using React + Tailwind + Canvas (or pure SVG + CSS animation). This replaces any hero image — it's a full-width, dark, generative graphic that runs behind the hero headline text.

### What it should look like

Think: Stripe's homepage gradient mesh meets a network topology visualization. Dark, premium, subtle motion — not flashy or gamey.

**Visual elements:**
- Dark background (#0A0A1A or similar near-black with a slight blue/purple undertone)
- A network/constellation of small dots (nodes) connected by thin lines, spread organically across the canvas
- Nodes are white or light gray at ~30-40% opacity
- Connection lines are very thin (0.5-1px), white at ~10-15% opacity, only drawn between nodes within a certain proximity
- 3-5 "accent nodes" that glow softly in red (#E63946) with a subtle pulse animation — these represent AI/automation touchpoints
- A soft radial gradient overlay from the center-right: a barely-visible red glow (#E63946 at ~5-8% opacity) bleeding into the dark background, giving the whole thing a warm focal point without being obvious
- Optional: very slow, drifting particle motion — nodes float gently (1-2px per second), connections redraw dynamically as nodes move in and out of range

**Motion / Animation:**
- Nodes drift very slowly in random directions (barely perceptible — like stars, not like a screensaver)
- Red accent nodes pulse gently (opacity oscillates between 40-80% over ~3 seconds)
- Connection lines fade in/out smoothly as nodes drift closer or farther apart
- NO sudden movements, flashing, or aggressive animation — this is ambient, not attention-grabbing
- Total animation should feel like a living dashboard or a calm data visualization running in the background

**Layout:**
- Full viewport width, 100vh height (or min-height: 600px)
- The graphic sits BEHIND the hero text content (headline, subheadline, CTAs) — it's a background layer with z-index below the text
- Slightly denser node concentration on the right side of the canvas, fading to sparser on the left — this creates visual balance when the headline text is left-aligned
- On mobile: reduce node count by 50% for performance, keep the red glow centered

**Technical requirements:**
- Use HTML Canvas for the animation (better performance than SVG for this many moving elements)
- React component: `<HeroBackground />` that renders a full-screen canvas
- requestAnimationFrame loop for smooth 60fps animation
- Responsive: recalculate canvas size on window resize
- Performance: cap at ~120 nodes on desktop, ~60 on mobile
- The canvas should have `pointer-events: none` so it doesn't interfere with hero CTAs
- Export as a drop-in component that can be placed inside the hero section wrapper

**Color reference:**
- Background: #0A0A1A
- Nodes: rgba(255, 255, 255, 0.3)
- Connection lines: rgba(255, 255, 255, 0.08)
- Accent nodes: #E63946 with glow (use shadow or radial gradient)
- Accent glow overlay: radial-gradient at ~5-8% opacity

**What this should NOT look like:**
- Not a starfield/space theme — no twinkling
- Not a matrix/code rain effect
- Not a 3D globe or rotating earth
- Not neon or cyberpunk — keep it corporate-premium
- Not a static image — it must animate subtly
- Not distracting — a visitor should barely notice it's moving until they stare at it for a few seconds

### Reference aesthetic
If you need a visual reference, think of:
- Stripe.com's gradient mesh backgrounds
- Linear.app's dark hero sections
- Vercel.com's subtle grid/dot patterns
- The kind of ambient data visualization you'd see on a Bloomberg terminal's idle screen

## PROMPT END
