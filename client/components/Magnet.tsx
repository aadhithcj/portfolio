import { PropsWithChildren, useEffect, useRef, useState } from "react";

type MagnetProps = PropsWithChildren<{ padding?: number; magnetStrength?: number; className?: string }>;

export default function Magnet({ children, padding = 90, magnetStrength = 3, className = "" }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      const box = node.getBoundingClientRect();
      const x = event.clientX - (box.left + box.width / 2);
      const y = event.clientY - (box.top + box.height / 2);
      setPosition(Math.abs(x) < box.width / 2 + padding && Math.abs(y) < box.height / 2 + padding ? { x: x / magnetStrength, y: y / magnetStrength } : { x: 0, y: 0 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, magnetStrength]);
  return <div ref={ref} className={className}><div className="magnet-inner" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}>{children}</div></div>;
}
