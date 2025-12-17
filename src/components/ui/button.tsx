import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['['] before:opacity-0 before:-translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-[-8px] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:content-[']'] after:opacity-0 after:translate-x-2 after:transition-all after:duration-300 hover:after:opacity-100 hover:after:translate-x-[8px]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 hover:before:w-full",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['['] before:opacity-0 before:-translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-[-8px] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:content-[']'] after:opacity-0 after:translate-x-2 after:transition-all after:duration-300 hover:after:opacity-100 hover:after:translate-x-[8px]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
