"use client"

import { motion, AnimatePresence } from "motion/react"
import { ReactNode, useState } from "react"

interface HoverKeywordProps {
    text: string
    children: ReactNode
}

export default function HoverKeyword({
    text,
    children,
}: HoverKeywordProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span className="relative cursor-target font-semibold">
                {text}

                {/* Marker highlight */}
                <motion.span
                    className="absolute bottom-0 left-0 -z-10 h-[45%] w-full bg-primary/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ transformOrigin: "left" }}
                />
            </span>

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 6,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 6,
                            scale: 0.97,
                        }}
                        transition={{ duration: 0.18 }}
                        className="
              absolute
              left-1/2
              top-full
              z-50
              mt-3
              pointer-events-none
              -translate-x-1/2
              whitespace-nowrap
              rounded-md
              border-[3px]
              border-border
              bg-card
              p-3
              text-sm
              shadow-lg
            "
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    )
}