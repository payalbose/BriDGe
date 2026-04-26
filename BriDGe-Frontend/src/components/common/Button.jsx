import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  default: "bg-primary-600 text-white hover:bg-primary-700",
  outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-900",
  secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  default: "h-10 px-4 py-2",
  lg: "h-11 px-8",
  icon: "h-10 w-10",
};

export const Button = forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
