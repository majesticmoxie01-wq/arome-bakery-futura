import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  style?: CSSProperties;
};

export function MagneticButton({ children, to, onClick, variant = "primary", className = "", style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };

  const base = "btn-magnetic group relative overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-ink text-cream hover:shadow-[0_20px_60px_-15px_oklch(0.22_0.015_60_/_60%)]"
      : "border border-ink/30 text-ink hover:bg-ink hover:text-cream";

  const inner = (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className} transition-[transform,box-shadow] duration-500 will-change-transform`}
      style={style}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span className="absolute inset-0 -z-0 translate-y-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0" />
    </span>
  );

  if (to) return <Link to={to} onClick={onClick}>{inner}</Link>;
  return <button onClick={onClick} type="button">{inner}</button>;
}
