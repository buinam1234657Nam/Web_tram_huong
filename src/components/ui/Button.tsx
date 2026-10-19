import React, { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "outline-light" | "ghost" | "champagne";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide";

    const variantStyles = {
      primary:
        "bg-forest hover:bg-forest-dark text-ivory focus-visible:ring-forest shadow-sm active:scale-[0.98]",
      secondary:
        "bg-agarwood hover:bg-agarwood-dark text-white focus-visible:ring-agarwood shadow-sm active:scale-[0.98]",
      outline:
        "border border-forest text-forest hover:bg-forest hover:text-ivory focus-visible:ring-forest active:scale-[0.98]",
      "outline-light":
        "border border-ivory/60 text-ivory hover:bg-ivory hover:text-forest-dark focus-visible:ring-ivory active:scale-[0.98]",
      ghost:
        "text-charcoal hover:bg-black/5 focus-visible:ring-forest active:scale-[0.98]",
      champagne:
        "bg-champagne hover:bg-champagne-dark text-forest-dark font-semibold focus-visible:ring-champagne shadow-sm active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 rounded-sm gap-1.5",
      md: "text-sm px-5 py-2.5 rounded-sm gap-2",
      lg: "text-base px-7 py-3.5 rounded-sm gap-2.5",
    };

    const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={combinedClasses}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-current" />
          ) : (
            leftIcon
          )}
          <span>{children}</span>
          {!isLoading && rightIcon}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
