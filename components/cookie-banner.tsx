"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie_consent")
    if (!hasConsented) {
      setShow(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "true")
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm border-[3px] border-border bg-card p-4 shadow-[6px_6px_0px_0px_#f7f0dd]"
        >
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-bold uppercase text-card-foreground">
              We use minimal cookies for basic analytics. No tracking here.
            </p>
            <button
              onClick={accept}
              className="cursor-target border-[3px] border-border bg-primary px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-1 active:translate-y-0"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
