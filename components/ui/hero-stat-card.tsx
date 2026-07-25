"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"

export interface HeroStatCardProps {
    id: string
    num: string
    label: string
    bg: string
    text: string

    curiosityClicks: number
    revealed: boolean

    onCuriosityClick?: () => void
}

export default function HeroStatCard({
    id,
    num,
    label,
    bg,
    text,
    curiosityClicks,
    revealed,
    onCuriosityClick,
}: HeroStatCardProps) {
    const isCuriosity = id === "curiosity"
    const [hovered, setHovered] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [wobble, setWobble] = useState(false)
    useEffect(() => {
        if (!isCuriosity) return
        if (revealed) return

        let timer: NodeJS.Timeout

        if (hovered) {
            timer = setTimeout(() => {
                setShowHint(true)
            }, 450)
        } else {
            setShowHint(false)
        }

        return () => clearTimeout(timer)
    }, [hovered, revealed, isCuriosity])
    useEffect(() => {
        if (!isCuriosity && curiosityClicks > 0 && curiosityClicks < 5) {
            setWobble(true)

            const t = setTimeout(() => {
                setWobble(false)
            }, 220)

            return () => clearTimeout(t)
        }
    }, [curiosityClicks, isCuriosity])

    const intensity = Math.min(curiosityClicks / 5, 1)
    const hints = [
        "Try me.",
        "Interesting...",
        "Almost there.",
        "One more."
    ]
    function getOffset() {
        if (isCuriosity) return { x: 0, y: 0, r: 0 }

        switch (id) {
            case "projects":
                return {
                    x: -6 * intensity,
                    y: -4 * intensity,
                    r: -2 * intensity,
                }

            case "tech":
                return {
                    x: 6 * intensity,
                    y: -4 * intensity,
                    r: 2 * intensity,
                }

            case "ai":
                return {
                    x: -5 * intensity,
                    y: 5 * intensity,
                    r: -2 * intensity,
                }

            default:
                return { x: 0, y: 0, r: 0 }
        }
    }

    const offset = getOffset()

    function handleClick() {
        if (!isCuriosity) return

        setClicked(true)

        setTimeout(() => setClicked(false), 350)

        onCuriosityClick?.()
    }

    const shadowStrength =
        curiosityClicks === 0
            ? 6
            : curiosityClicks === 1
                ? 8
                : curiosityClicks === 2
                    ? 10
                    : curiosityClicks === 3
                        ? 13
                        : curiosityClicks === 4
                            ? 16
                            : 8
    return (
        <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={handleClick}
            whileHover={{
                y: -4,
                transition: {
                    type: "spring",
                    stiffness: 350,
                    damping: 18,
                },
            }}
            animate={{
                x: offset.x,
                y: offset.y,

                rotate: wobble
                    ? [0, -1.5, 1.5, 0]
                    : clicked
                        ? [0, -2, 2, 0]
                        : offset.r,

                scale: clicked
                    ? [1, 1.06, 0.98, 1]
                    : revealed && isCuriosity
                        ? [1, 1.08, 0.96, 1]
                        : 1,

                boxShadow:
                    hovered && isCuriosity
                        ? `0 ${shadowStrength}px 0 #111,
         0 0 0 3px rgba(198,255,0,.25)`
                        : `0 ${shadowStrength}px 0 #111`,
            }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            className="nb-border nb-shadow cursor-target relative flex min-h-[135px] flex-col items-center justify-center p-4 text-center" style={{
                background: bg,
                color: text,
                boxShadow: hovered && isCuriosity
                    ? `0 ${shadowStrength}px 0 #111,
           0 0 0 3px rgba(198,255,0,.25)`
                    : `0 ${shadowStrength}px 0 #111`,
            }}
        >
            {/* background pulse */}
            {isCuriosity && curiosityClicks > 0 && curiosityClicks < 5 && (
                <motion.div
                    className="absolute inset-0 bg-black/5"
                    animate={{
                        opacity: [0, 0.12, 0],
                        scale: [1, 1.04, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.4,
                    }}
                />
            )}

            <AnimatePresence mode="wait">
                {!revealed ? (
                    <motion.div
                        key="default"
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="relative z-10"
                    >
                        <motion.span
                            animate={
                                isCuriosity
                                    ? {
                                        y: [0, -2, 0],
                                    }
                                    : {}
                            }
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                            }}
                            className="block font-mono text-3xl font-bold"
                        >
                            {num}
                        </motion.span>

                        <span className="mt-1 block font-mono text-[11px] font-bold uppercase tracking-wide">
                            {label}
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="reveal"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 220,
                        }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl"
                        >
                            :)
                        </motion.span>

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.25,
                            }}
                            className="mt-2 text-sm font-bold"
                        >
                            Still curious?
                        </motion.p>

                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.55,
                            }}
                            className="mt-1 text-xs opacity-80"
                        >
                            So am I.
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {isCuriosity && curiosityClicks > 0 && curiosityClicks < 5 && (
                <motion.div
                    className="absolute bottom-2 h-1 rounded-full bg-black/20"
                    initial={false}
                    animate={{
                        width: `${curiosityClicks * 20}%`,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                    }}
                />
            )}
            <AnimatePresence>
                {isCuriosity && showHint && !revealed && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 6
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            y: 6
                        }}
                        transition={{
                            duration: .18
                        }}
                        className="
        absolute
        -top-9
        left-1/2
        -translate-x-1/2
        whitespace-nowrap
        rounded-md
        border-2
        border-black
        bg-white
        px-3
        py-1
        text-[11px]
        font-bold
        shadow-lg
        z-50
      "
                    >
                        {hints[Math.min(curiosityClicks, 3)]}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}