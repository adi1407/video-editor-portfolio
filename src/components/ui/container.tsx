import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
} as const;

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: keyof typeof sizes;
};

export function Container({
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6", sizes[size], className)}
      {...props}
    />
  );
}
