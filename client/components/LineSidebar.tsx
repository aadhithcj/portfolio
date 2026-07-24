import { useEffect, useRef, useState, type CSSProperties } from "react";

type LineSidebarProps = { items: string[]; accentColor?: string; defaultActive?: number; onItemClick?: (index: number, label: string) => void };

export default function LineSidebar({ items, accentColor = "#B7F34A", defaultActive = 0, onItemClick }: LineSidebarProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(defaultActive);
  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    const move = (event: PointerEvent) => {
      const rows = [...nav.querySelectorAll<HTMLElement>("li")];
      rows.forEach((row) => {
        const distance = Math.abs(event.clientY - (row.getBoundingClientRect().top + row.offsetHeight / 2));
        row.style.setProperty("--effect", String(Math.max(0, 1 - distance / 110)));
      });
    };
    const leave = () => nav.querySelectorAll<HTMLElement>("li").forEach((row) => row.style.setProperty("--effect", "0"));
    nav.addEventListener("pointermove", move); nav.addEventListener("pointerleave", leave);
    return () => { nav.removeEventListener("pointermove", move); nav.removeEventListener("pointerleave", leave); };
  }, []);
  return <nav ref={ref} className="line-sidebar" style={{ "--accent": accentColor } as CSSProperties} aria-label="Section navigation"><ul>{items.map((item, index) => <li key={item} className={`cursor-target ${active === index ? "is-active" : ""}`} onClick={() => { setActive(index); onItemClick?.(index, item); }}><span className="line-sidebar-marker" /><span className="line-sidebar-index">0{index + 1}</span><span>{item}</span></li>)}</ul></nav>;
}
