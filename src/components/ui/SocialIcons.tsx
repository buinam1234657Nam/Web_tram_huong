import React from "react";

/*
  Social marks in each network's own colours (lucide-react ships no brand
  logos). Each is a filled 40px-ready circle badge with a white glyph.
*/

type IconProps = { className?: string };

export function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="20" fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="M22.2 31v-9.6h3.2l.5-3.8h-3.7v-2.4c0-1.1.3-1.8 1.9-1.8h2V10c-.4 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.9h-3.2v3.8h3.2V31h3.6Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#FDF497" />
          <stop offset="0.05" stopColor="#FDF497" />
          <stop offset="0.45" stopColor="#FD5949" />
          <stop offset="0.6" stopColor="#D6249F" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#ig-gradient)" />
      <g fill="none" stroke="#FFFFFF" strokeWidth="2">
        <rect x="11.5" y="11.5" width="17" height="17" rx="5" />
        <circle cx="20" cy="20" r="4" />
      </g>
      <circle cx="25" cy="15" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

export function YoutubeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="20" fill="#FF0000" />
      <path fill="#FFFFFF" d="M17 14.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

/** Zalo: blue badge with the white "Zalo" wordmark. */
export function ZaloIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="20" fill="#0068FF" />
      <text
        x="20"
        y="24.2"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="11.5"
        fontWeight="700"
      >
        Zalo
      </text>
    </svg>
  );
}
