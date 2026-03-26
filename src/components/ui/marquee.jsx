import React from "react";
import { cn } from "@/lib/utils";

function Marquee({ children, reverse = false, pauseOnHover = false, className = "" }) {
    const items = React.Children.toArray(children);
    const duplicatedItems = items.map((child, index) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { key: `dup-${index}` });
        }
        return child;
    });

    return (
        <>
            <style>{`
        @keyframes magic-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - var(--gap, 1rem) / 2)); }
        }
      `}</style>
            <div className={cn("relative flex overflow-hidden", className)}>
                <div
                    className={cn(
                        "flex min-w-max shrink-0 items-stretch gap-[var(--gap)]",
                        reverse && "[animation-direction:reverse]",
                        pauseOnHover && "group-hover:[animation-play-state:paused]",
                    )}
                    style={{
                        animationName: "magic-marquee-scroll",
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                        animationDuration: "var(--duration, 20s)",
                    }}
                >
                    {items}
                    {duplicatedItems}
                </div>
            </div>
        </>
    );
}

export { Marquee };
