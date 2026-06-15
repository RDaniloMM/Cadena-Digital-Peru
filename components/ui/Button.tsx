import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-lumia-navy text-lumia-white hover:bg-lumia-navy/90 focus:ring-lumia-cyan",
  secondary:
    "bg-lumia-cyan text-lumia-navy hover:bg-lumia-cyan/90 focus:ring-lumia-navy",
  ghost:
    "bg-transparent text-lumia-navy hover:bg-lumia-sky focus:ring-lumia-cyan",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[40px] px-3 py-1.5 text-sm",
  md: "min-h-[44px] px-4 py-2.5 text-base",
  lg: "min-h-[48px] px-6 py-3.5 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={[
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
