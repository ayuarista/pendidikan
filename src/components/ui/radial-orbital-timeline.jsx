"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RadialOrbitalTimeline({ timelineData }) {
    const [expandedItems, setExpandedItems] = useState({});
    const [rotationAngle, setRotationAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const [pulseEffect, setPulseEffect] = useState({});
    const [activeNodeId, setActiveNodeId] = useState(null);
    const containerRef = useRef(null);
    const orbitRef = useRef(null);
    const nodeRefs = useRef({});

    const handleContainerClick = (e) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const getRelatedItems = (itemId) => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const centerViewOnNode = (nodeId) => {
        if (!nodeRefs.current[nodeId]) return;
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;
        setRotationAngle(270 - targetAngle);
    };

    const toggleItem = (id) => {
        setExpandedItems((prev) => {
            const next = {};
            const willOpen = !prev[id];

            if (willOpen) {
                next[id] = true;
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const pulse = {};
                relatedItems.forEach((relId) => {
                    pulse[relId] = true;
                });
                setPulseEffect(pulse);
                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return next;
        });
    };

    useEffect(() => {
        if (!autoRotate) return undefined;

        const rotationTimer = setInterval(() => {
            setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
        }, 50);

        return () => clearInterval(rotationTimer);
    }, [autoRotate]);

    const calculateNodePosition = (index, total) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 172;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(0.45, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

        return { x, y, zIndex, opacity };
    };

    const isRelatedToActive = (itemId) => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "completed":
                return "text-white bg-black border-white";
            case "in-progress":
                return "text-black bg-white border-black";
            default:
                return "text-white bg-black/40 border-white/50";
        }
    };

    return (
        <div
            ref={containerRef}
            onClick={handleContainerClick}
            className="flex h-155 w-full items-center justify-center overflow-hidden"
        >
            <div className="relative flex h-full w-full items-center justify-center" ref={orbitRef}>
                <div className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-violet-500 via-blue-500 to-cyan-400 animate-pulse">
                    <div className="absolute h-18 w-18 rounded-full border border-white/20 animate-ping opacity-70" />
                    <div className="h-6 w-6 rounded-full bg-white/85" />
                </div>

                <div className="absolute h-92 w-92 rounded-full border border-white/10" />

                {timelineData.map((item, index) => {
                    const position = calculateNodePosition(index, timelineData.length);
                    const isExpanded = !!expandedItems[item.id];
                    const isRelated = isRelatedToActive(item.id);
                    const isPulsing = pulseEffect[item.id];
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            ref={(el) => {
                                nodeRefs.current[item.id] = el;
                            }}
                            className="absolute cursor-pointer transition-all duration-700"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px)`,
                                zIndex: isExpanded ? 200 : position.zIndex,
                                opacity: isExpanded ? 1 : position.opacity,
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(item.id);
                            }}
                        >
                            <div
                                className={`absolute -inset-1 rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                                style={{
                                    background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)",
                                    width: `${item.energy * 0.45 + 34}px`,
                                    height: `${item.energy * 0.45 + 34}px`,
                                    left: `-${(item.energy * 0.45 + 34 - 40) / 2}px`,
                                    top: `-${(item.energy * 0.45 + 34 - 40) / 2}px`,
                                }}
                            />

                            <div
                                className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300
                  ${isExpanded
                                        ? "scale-[1.4] border-white bg-white text-black shadow-lg shadow-white/30"
                                        : isRelated
                                            ? "border-white bg-white/50 text-black"
                                            : "border-white/40 bg-black text-white"
                                    }
                `}
                            >
                                <Icon size={16} />
                            </div>

                            <div className={`absolute top-12 whitespace-nowrap text-[11px] font-semibold tracking-wider transition-all duration-300 ${isExpanded ? "scale-[1.15] text-white" : "text-white/70"}`}>
                                {item.title}
                            </div>

                            {isExpanded && (
                                <Card className="absolute left-1/2 top-20 w-62 -translate-x-1/2 overflow-visible border-white/30 bg-black/90 shadow-xl shadow-white/10 backdrop-blur-lg">
                                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <Badge className={`px-2 text-[10px] ${getStatusStyles(item.status)}`}>
                                                {item.status === "completed" ? "SELESAI" : item.status === "in-progress" ? "PROSES" : "MENUNGGU"}
                                            </Badge>
                                            <span className="font-mono text-[10px] text-white/50">{item.date}</span>
                                        </div>
                                        <CardTitle className="mt-2 text-sm text-white">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs text-white/80">
                                        <p>{item.content}</p>

                                        <div className="mt-4 border-t border-white/10 pt-3">
                                            <div className="mb-1 flex items-center justify-between text-xs">
                                                <span className="flex items-center">
                                                    <Zap size={10} className="mr-1" />
                                                    Level Energi
                                                </span>
                                                <span className="font-mono">{item.energy}%</span>
                                            </div>
                                            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                                                <div className="h-full bg-linear-to-r from-blue-500 to-violet-500" style={{ width: `${item.energy}%` }} />
                                            </div>
                                        </div>

                                        {item.relatedIds.length > 0 && (
                                            <div className="mt-4 border-t border-white/10 pt-3">
                                                <div className="mb-2 flex items-center">
                                                    <LinkIcon size={10} className="mr-1 text-white/70" />
                                                    <h4 className="text-xs font-medium uppercase tracking-wider text-white/70">Node Terkait</h4>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {item.relatedIds.map((relatedId) => {
                                                        const relatedItem = timelineData.find((n) => n.id === relatedId);
                                                        return (
                                                            <Button
                                                                key={relatedId}
                                                                variant="outline"
                                                                size="xs"
                                                                className="h-6 rounded-none border-white/20 bg-transparent px-2 py-0 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleItem(relatedId);
                                                                }}
                                                            >
                                                                {relatedItem?.title}
                                                                <ArrowRight size={8} className="ml-1 text-white/60" />
                                                            </Button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
