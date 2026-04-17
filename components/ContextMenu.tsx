"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  action?: () => void;
  href?: string;
  separator?: boolean;
  disabled?: boolean;
}

export default function ContextMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const close = useCallback(() => setOpen(false), []);

  // Adjust position after menu renders to keep it in viewport
  useEffect(() => {
    if (open && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      let { x, y } = pos;

      if (rect.bottom > window.innerHeight) {
        y = window.innerHeight - rect.height - 8;
      }
      if (rect.right > window.innerWidth) {
        x = window.innerWidth - rect.width - 8;
      }
      if (y < 0) y = 8;
      if (x < 0) x = 8;

      if (x !== pos.x || y !== pos.y) {
        setPos({ x, y });
      }
    }
  }, [open, pos]);

  useEffect(() => {
    const handleContext = (e: MouseEvent) => {
      e.preventDefault();

      const x = e.clientX;
      const y = e.clientY;

      setPos({ x, y });
      setOpen(true);
    };

    const handleClick = () => close();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const handleScroll = () => close();

    window.addEventListener("contextmenu", handleContext);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("contextmenu", handleContext);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [close]);

  const nav = (href: string) => () => {
    close();
    router.push(href);
  };

  const navLinks: MenuItem[] = [
    { label: "Home", icon: "🏠", href: "/", action: nav("/") },
    { label: "Projects", icon: "💼", href: "/projects", action: nav("/projects") },
    { label: "Skills", icon: "⚡", href: "/skills", action: nav("/skills") },
    { label: "About", icon: "👤", href: "/about", action: nav("/about") },
    { label: "Contact", icon: "✉️", href: "/contact", action: nav("/contact") },
  ];

  const items: MenuItem[] = [
    ...navLinks.map((link) => ({
      ...link,
      disabled: pathname === link.href,
    })),
    { label: "", separator: true },
    {
      label: "Back",
      icon: "←",
      shortcut: "Alt+←",
      action: () => { close(); window.history.back(); },
    },
    {
      label: "Forward",
      icon: "→",
      shortcut: "Alt+→",
      action: () => { close(); window.history.forward(); },
    },
    {
      label: "Reload",
      icon: "↻",
      shortcut: "Ctrl+R",
      action: () => { close(); window.location.reload(); },
    },
    { label: "", separator: true },
    {
      label: "Copy Link",
      icon: "🔗",
      action: () => {
        close();
        navigator.clipboard.writeText(window.location.href);
      },
    },
    {
      label: "Scroll to Top",
      icon: "↑",
      action: () => { close(); window.scrollTo({ top: 0, behavior: "smooth" }); },
    },
    { label: "", separator: true },
    {
      label: "Play Mario",
      icon: "🎮",
      action: nav("/play"),
      disabled: pathname === "/play",
    },
    {
      label: "View Resume",
      icon: "📄",
      action: () => { close(); window.open("/resume.html", "_blank"); },
    },
  ];

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="ctx-menu"
      style={{ left: pos.x, top: pos.y }}
      role="menu"
    >
      {items.map((item, i) =>
        item.separator ? (
          <div key={i} className="ctx-separator" role="separator" />
        ) : (
          <button
            key={i}
            className={`ctx-item ${item.disabled ? "ctx-disabled" : ""} ${pathname === item.href ? "ctx-active" : ""}`}
            role="menuitem"
            disabled={item.disabled}
            onClick={(e) => {
              e.stopPropagation();
              item.action?.();
            }}
          >
            <span className="ctx-icon">{item.icon}</span>
            <span className="ctx-label">{item.label}</span>
            {item.shortcut && <span className="ctx-shortcut">{item.shortcut}</span>}
          </button>
        )
      )}
      <div className="ctx-footer">
        <span>Vy Nguyen</span>
        <span className="ctx-dot">·</span>
        <span>Portfolio</span>
      </div>
    </div>
  );
}
