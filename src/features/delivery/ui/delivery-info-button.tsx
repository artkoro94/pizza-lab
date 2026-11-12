"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Clock3, MapPin, PackageCheck, ShoppingBag, Truck, X } from "lucide-react";

const terms = [
  {
    icon: Truck,
    title: "Доставка до двери",
    description: "199 ₽. Бесплатно при заказе от 1 500 ₽.",
  },
  {
    icon: ShoppingBag,
    title: "Самовывоз",
    description: "Бесплатно. Адрес точки самовывоза будет указан после настройки конкретного ресторана.",
  },
  {
    icon: PackageCheck,
    title: "Оплата",
    description: "В демо доступны оплата курьеру при получении и онлайн-оплата. Реальные платежи не проводятся.",
  },
  {
    icon: Clock3,
    title: "Время и зона доставки",
    description: "Зависят от адреса и загруженности кухни. Точные часы работы, география и сроки настраиваются для конкретного ресторана.",
  },
];

type DeliveryInfoButtonProps = {
  variant?: "header" | "promo";
};

export function DeliveryInfoButton({ variant = "header" }: DeliveryInfoButtonProps) {
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerElement?.focus();
    };
  }, [open]);

  const buttonClass =
    variant === "promo"
      ? "inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-ink/25 px-3 text-[10px] font-extrabold uppercase leading-tight tracking-[0.08em] text-center whitespace-normal transition-colors duration-200 ease-in-out hover:bg-ink/5 sm:text-xs sm:tracking-wider"
      : "cursor-pointer transition-colors duration-200 ease-in-out hover:text-white";

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-controls={dialogId} className={buttonClass}>
        {variant === "promo" ? "Условия доставки и оплаты" : "Условия заказа"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            ref={dialogRef}
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative my-auto w-full max-w-[620px] rounded-[1.75rem] bg-paper p-6 text-ink shadow-2xl outline-none sm:p-9"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть условия заказа"
              className="absolute right-5 top-5 grid size-10 cursor-pointer place-items-center rounded-full border border-black/10 transition-colors hover:bg-black/5"
            >
              <X size={18} />
            </button>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-dark">PIZZA LAB · ИНФОРМАЦИЯ</p>
            <h2 id={titleId} className="mt-3 max-w-md font-display text-3xl font-black tracking-tight sm:text-4xl">
              Условия заказа<span className="text-accent">.</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-black/55">
              Стоимость доставки, способы получения и оплаты — коротко о главном.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {terms.map(({ icon: Icon, title, description }) => (
                <article key={title} className="flex gap-3 rounded-2xl bg-white p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-dark">
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold">{title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-black/55">{description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-black/10 p-4 text-xs leading-5 text-black/50">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <p>Это демонстрационный проект. Условия приведены для примера и не являются публичной офертой. Реальные заказы и платежи не принимаются.</p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 h-12 w-full cursor-pointer rounded-full bg-ink text-sm font-extrabold text-white transition-colors hover:bg-black/80"
            >
              Понятно
            </button>
          </section>
        </div>
      )}
    </>
  );
}
