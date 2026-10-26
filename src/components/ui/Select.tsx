"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Styled replacement for a native <select>, following the WAI-ARIA
 * listbox pattern (button + popup list, arrow keys, Enter, Escape).
 */
export function Select({
  value,
  options,
  onChange,
  label,
  align = "right",
}: {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** Visible text before the current value, e.g. "Sắp xếp theo". */
  label?: string;
  align?: "left" | "right";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const selected = options[selectedIndex];

  const open = () => {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  };

  const close = (restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    close();
  };

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.focus();

    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      open();
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleButtonKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        className="inline-flex items-center gap-1.5 text-charcoal hover:text-gold-dark transition-colors duration-300 cursor-pointer"
      >
        {label && <span>{label}</span>}
        <span className="font-medium">{selected?.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`${listId}-${activeIndex}`}
            onKeyDown={handleListKeyDown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: MOTION_EASE }}
            className={`absolute top-full mt-3 z-30 min-w-56 py-2 rounded-2xl bg-cream border border-gold/25 shadow-[0_12px_32px_-12px_rgba(45,30,25,0.25)] focus:outline-none ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {options.map((option, idx) => {
              const isSelected = option.value === value;
              const isActive = idx === activeIndex;
              return (
                <li
                  key={option.value}
                  id={`${listId}-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onPointerEnter={() => setActiveIndex(idx)}
                  onClick={() => choose(idx)}
                  className={`mx-2 px-3 py-2.5 rounded-xl flex items-center justify-between gap-6 text-[15px] cursor-pointer transition-colors duration-200 ${
                    isActive ? "bg-cream-dark" : ""
                  } ${isSelected ? "text-charcoal font-medium" : "text-charcoal/75"}`}
                >
                  {option.label}
                  <Check
                    className={`w-4 h-4 text-gold-dark shrink-0 ${isSelected ? "opacity-100" : "opacity-0"}`}
                  />
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
