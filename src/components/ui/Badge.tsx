import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "champagne" | "petrol" | "graphite" | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
  champagne: "bg-champagne/15 text-[#8a6b34] border border-champagne/40",
  petrol: "bg-petrol/10 text-petrol border border-petrol/30",
  graphite: "bg-graphite text-ice border border-graphite",
  neutral: "bg-light-gray text-text-gray border border-light-gray",
};

export function Badge({ className, tone = "champagne", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        toneStyles[tone],
        className
      )}
      {...props}
    />
  );
}
