import { useEffect, useRef } from "react";

type TextPressureProps = {
  text?: string;
  minFontSize?: number;
  textColor?: string;
  className?: string;
};

export default function TextPressure({
  text = "Aadhith C J",
  minFontSize = 42,
  textColor = "#F4F1EA",
  className = "",
}: TextPressureProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const cursor = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", move);
    const frame = () => {
      cursor.current.x += (target.current.x - cursor.current.x) / 12;
      cursor.current.y += (target.current.y - cursor.current.y) / 12;
      const title = titleRef.current;
      if (title) {
        const bounds = title.getBoundingClientRect();
        const max = Math.max(bounds.width / 2, 1);
        spansRef.current.forEach((span) => {
          if (!span) return;
          const char = span.getBoundingClientRect();
          const distance = Math.hypot(
            cursor.current.x - (char.left + char.width / 2),
            cursor.current.y - (char.top + char.height / 2),
          );
          const proximity = Math.max(0, 1 - distance / max);
          span.style.fontVariationSettings = `'wght' ${Math.round(420 + proximity * 460)}, 'wdth' ${Math.round(90 + proximity * 55)}`;
          span.style.transform = `translateY(${-proximity * 5}px)`;
        });
      }
      return requestAnimationFrame(frame);
    };
    const id = requestAnimationFrame(frame);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <h1 ref={titleRef} className={`text-pressure ${className}`} style={{ color: textColor, fontSize: `clamp(${minFontSize}px, 10vw, 150px)` }}>
      {text.split("").map((char, index) => (
        <span key={`${char}-${index}`} ref={(node) => { if (node) spansRef.current[index] = node; }}>
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </h1>
  );
}
