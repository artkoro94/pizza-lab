"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { useCartStore } from "@/features/cart/model/cart-store";

export function CartToast() {
  const message = useCartStore((state) => state.toast);
  const clearToast = useCartStore((state) => state.clearToast);

  useEffect(() => {
    if (!message) return;
    const timeoutId = window.setTimeout(clearToast, 2600);
    return () => window.clearTimeout(timeoutId);
  }, [message, clearToast]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-5 z-[60] flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3.5 text-sm font-semibold text-ink shadow-[0_12px_45px_rgba(0,0,0,0.16)] animate-[toast-in_280ms_ease-out]"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green-50 text-green-600">
        <Check size={17} />
      </span>
      <span className="flex-1">{message}</span>
      <button type="button" onClick={clearToast} aria-label="Закрыть уведомление" className="grid size-7 shrink-0 place-items-center rounded-full text-black/35 transition hover:bg-black/5 hover:text-ink">
        <X size={15} />
      </button>
    </div>
  );
}
