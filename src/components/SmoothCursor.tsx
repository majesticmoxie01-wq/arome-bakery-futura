import { useEffect, useRef } from "react";

export function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my;
    let rx = mx, ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      // Dot follows fast — subtle water lag
      dx += (mx - dx) * 0.35;
      dy += (my - dy) * 0.35;
      // Ring follows slow — liquid trail
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.transform = `translate(${dx - 11}px, ${dy - 11}px)`;
      ring.style.transform = `translate(${rx - 28}px, ${ry - 28}px)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='hover']")) document.body.classList.add("cursor-hover");
      else document.body.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

