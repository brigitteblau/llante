"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open && dialogRef.current) dialogRef.current.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            ref={dialogRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg)]/95 p-0 text-white shadow-[0_0_40px_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-4">
              <h3 id="modal-title" className="text-lg font-semibold">
                {title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/70 hover:bg-white/10 transition"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5 text-white/80 leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
