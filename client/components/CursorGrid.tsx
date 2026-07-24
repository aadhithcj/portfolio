import { useEffect, useRef } from "react";

type CursorGridProps = { cellSize?: number; color?: string; radius?: number; className?: string };

export default function CursorGrid({ cellSize = 74, color = "#B7F34A", radius = 150, className = "" }: CursorGridProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let pointer = { x: -1000, y: -1000 };
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const draw = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      ctx.clearRect(0, 0, width, height);
      const columns = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      const offsetX = (width - columns * cellSize) / 2;
      const offsetY = (height - rows * cellSize) / 2;
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = offsetX + column * cellSize;
          const y = offsetY + row * cellSize;
          const distance = Math.hypot(x + cellSize / 2 - pointer.x, y + cellSize / 2 - pointer.y);
          const alpha = Math.max(0, 1 - distance / radius) * 0.42;
          if (alpha <= 0) continue;
          ctx.strokeStyle = color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    parent.addEventListener("pointermove", move);
    draw();
    return () => { observer.disconnect(); parent.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [cellSize, color, radius]);
  return <canvas ref={ref} className={`cursor-grid ${className}`} aria-hidden="true" />;
}
