"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { normalizeUnitName, type AdminUnit } from "@/data/address";
import { inputClass } from "./fieldStyles";

/**
 * Searchable select for a province or ward (WAI-ARIA combobox with a listbox).
 * Typing filters without diacritics or the unit type ("sai gon" finds
 * "Phường Sài Gòn"); the value is always one of the options or empty.
 */
export function AddressCombobox({
  id,
  label,
  required = false,
  value,
  options,
  onChange,
  onBlur,
  inputRef,
  placeholder,
  disabled = false,
  noResults,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  options: AdminUnit[];
  onChange: (value: string) => void;
  onBlur: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder: string;
  disabled?: boolean;
  noResults: string;
  error?: string;
}) {
  // null = not typing, so the input shows the chosen value
  const [query, setQuery] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = `${id}-listbox`;
  const optionId = (idx: number) => `${id}-option-${idx}`;

  const normalized = useMemo(
    () => options.map((o) => ({ ...o, key: normalizeUnitName(o.name) })),
    [options],
  );
  const filtered = useMemo(() => {
    const q = normalizeUnitName(query ?? "");
    return q ? normalized.filter((o) => o.key.includes(q)) : normalized;
  }, [normalized, query]);

  useEffect(() => {
    if (isOpen) {
      document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: "nearest" });
    }
    // optionId only depends on id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isOpen]);

  const open = () => {
    if (disabled) return;
    setIsOpen(true);
    const selected = filtered.findIndex((o) => o.name === value);
    setActiveIndex(selected >= 0 ? selected : 0);
  };

  const select = (name: string) => {
    onChange(name);
    setQuery(null);
    setIsOpen(false);
  };

  const handleBlur = () => {
    setIsOpen(false);
    if (query !== null) {
      // Keep an exact match (typed or autofilled); otherwise fall back to the last choice.
      const q = normalizeUnitName(query);
      const match = normalized.find((o) => o.key === q);
      if (match) onChange(match.name);
      else if (!q) onChange("");
      setQuery(null);
    }
    onBlur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) open();
        else setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        // Never submit the form from here
        if (isOpen) {
          e.preventDefault();
          if (filtered[activeIndex]) select(filtered[activeIndex].name);
        }
        break;
      case "Escape":
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
          setQuery(null);
        }
        break;
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal mb-2">
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={isOpen && filtered[activeIndex] ? optionId(activeIndex) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off"
          disabled={disabled}
          value={query ?? value}
          placeholder={placeholder}
          onFocus={open}
          onClick={open}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={`${inputClass(Boolean(error))} h-12 pr-10`}
        />
        <ChevronDown
          aria-hidden="true"
          className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />

        {isOpen && (
          <div className="absolute z-30 mt-1.5 w-full overflow-hidden rounded-xl border border-gold/30 bg-cream shadow-[0_12px_32px_-12px_rgba(45,30,25,0.25)]">
            {filtered.length > 0 ? (
              <ul id={listId} role="listbox" aria-label={label} className="max-h-64 overflow-y-auto py-1.5">
                {filtered.map((o, idx) => (
                  <li
                    key={o.code}
                    id={optionId(idx)}
                    role="option"
                    aria-selected={o.name === value}
                    // Keep focus in the input so blur doesn't close the list first
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => select(o.name)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`px-4 py-2.5 text-[15px] cursor-pointer ${
                      idx === activeIndex ? "bg-cream-dark" : ""
                    } ${o.name === value ? "font-semibold text-agarwood" : "text-charcoal"}`}
                  >
                    {o.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p id={listId} className="px-4 py-3 text-sm text-muted">
                {noResults}
              </p>
            )}
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
