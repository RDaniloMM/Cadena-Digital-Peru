import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-lumia-primary text-lumia-white hover:bg-lumia-primary-hover focus:ring-lumia-primary",
  secondary:
    "border-2 border-lumia-primary bg-lumia-white text-lumia-primary hover:bg-lumia-primary-soft focus:ring-lumia-primary",
  ghost:
    "bg-transparent text-lumia-primary hover:bg-lumia-primary-soft focus:ring-lumia-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[40px] px-3 py-1.5 text-sm rounded-md",
  md: "min-h-[44px] px-4 py-2.5 text-base rounded-lg",
  lg: "min-h-[48px] px-6 py-3 text-lg rounded-xl",
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
          "inline-flex items-center justify-center font-semibold transition-colors",
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
