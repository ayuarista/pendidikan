"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(function AccordionItem({ className, ...props }, ref) {
    return (
        <AccordionPrimitive.Item
            ref={ref}
            className={cn("border-b border-border", className)}
            {...props}
        />
    );
});

const AccordionTrigger = React.forwardRef(function AccordionTrigger({ className, children, ...props }, ref) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 text-left font-semibold transition-all hover:underline [&[data-state=open]_.chevron]:rotate-180 [&[data-state=open]_.chevron]:opacity-100",
                    className,
                )}
                {...props}
            >
                {children}
                <span className="chevron-wrap ml-3 inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-200 text-slate-700 transition-all duration-300 dark:bg-white/18 dark:text-white">
                    <ChevronDownIcon
                        width={16}
                        height={16}
                        strokeWidth={2}
                        className="chevron shrink-0 opacity-90 transition-transform duration-300"
                        aria-hidden="true"
                    />
                </span>
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
});

const AccordionContent = React.forwardRef(function AccordionContent({ className, children, ...props }, ref) {
    return (
        <AccordionPrimitive.Content
            ref={ref}
            className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            {...props}
        >
            <div className={cn("pb-4 pt-0", className)}>{children}</div>
        </AccordionPrimitive.Content>
    );
});

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
