import React, { forwardRef } from "react";
import Link from "@/components/i18n/Link";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "outline-light" | "ghost" | "gold";
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
      "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary:
        "bg-espresso hover:bg-espresso-light text-white focus-visible:ring-espresso",
      secondary:
        "bg-agarwood hover:bg-agarwood-dark text-white focus-visible:ring-agarwood",
      outline:
        "border border-charcoal/25 text-charcoal hover:border-charcoal focus-visible:ring-espresso",
      "outline-light":
        "border border-white/60 text-white hover:bg-white hover:text-espresso-dark focus-visible:ring-white",
      ghost:
        "text-charcoal hover:bg-black/5 focus-visible:ring-espresso",
      gold:
        "bg-gold hover:bg-gold-dark text-white focus-visible:ring-gold",
    };

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-6 py-3 gap-2",
      lg: "text-base px-8 py-3.5 gap-2.5",
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
