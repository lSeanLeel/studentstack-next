import React from "react";

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold font-display ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    const variants = {
      default: "bg-sky-500 text-white hover:bg-sky-600 shadow-[0_4px_14px_0_rgba(14,165,233,0.39)]",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground border-slate-200 text-slate-900 hover:bg-slate-50",
      ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
    };
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
