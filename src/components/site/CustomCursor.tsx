import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with a fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setIsVisible(true);

    // Hide default cursor globally
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a link, button, or any interactive element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "none" // Handle case where it's overridden
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.head.removeChild(style);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer glowing ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-[2px] pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: position.x - 12, // center (24px / 2 = 12)
          y: position.y - 12,
          scale: isHovering ? 1.6 : 1,
          backgroundColor: isHovering ? "rgba(12, 42, 92, 0.15)" : "rgba(12, 42, 92, 0.05)",
        }}
        transition={{
          x: { type: "tween", duration: 0 },
          y: { type: "tween", duration: 0 },
          scale: { type: "spring", stiffness: 400, damping: 25 },
          backgroundColor: { duration: 0.2 },
        }}
      />
      {/* Inner solid dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[10000] hidden md:block shadow-sm"
        animate={{
          x: position.x - 4, // center (8px / 2 = 4)
          y: position.y - 4,
          scale: isHovering ? 0 : 1, // disappear on hover
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          x: { type: "tween", duration: 0 },
          y: { type: "tween", duration: 0 },
          scale: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
}
