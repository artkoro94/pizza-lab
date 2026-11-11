"use client";

import { useState } from "react";
import { Clock3, MapPin, PackageCheck, ShoppingBag, Truck, X } from "lucide-react";

export function DeliveryInfoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="transition hover:text-white">
        Доставка
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="delivery-dialog-title" className="relative my-auto w-full max-w-[560px] rounded-[1.75rem] bg-paper p-6 text-ink shadow-2xl sm:p-9">
            <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть условия доставки" className="absolute right-5 top-5 grid size-10 cursor-pointer place-items-center rounded-full border border-black/10 transition hover:bg-black/5">
              <X size={18} />
            </button>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-dark">PIZZA LAB · ИНФОРМАЦИЯ</p>
            <h2 id="delivery-dialog-title" className="mt-3 max-w-sm font-display text-3xl font-black tracking-tight sm:text-4xl">Доставка и оплата<span className="text-accent">.</span></h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-black/55">Всё важное о получении заказа. Проект работает в демонстрационном режиме — реальные заказы пока не принимаются.</p>
            <div className="mt-7 space-y-4">
              <div className="flex gap-4 rounded-2xl bg-white p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-dark"><Truck size={19}/></span>
                <div><h3 className="text-sm font-extrabold">Доставка до двери</h3><p className="mt-1 text-sm leading-5 text-black/55">Стоимость — 199 ₽. При заказе от 1 500 ₽ доставка бесплатная.</p></div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-white p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-dark"><ShoppingBag size={19}/></span>
                <div><h3 className="text-sm font-extrabold">Самовывоз</h3><p className="mt-1 text-sm leading-5 text-black/55">Бесплатно. Адрес точки самовывоза будет указан после настройки реального ресторана.</p></div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-white p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-dark"><PackageCheck size={19}/></span>
                <div><h3 className="text-sm font-extrabold">Оплата</h3><p className="mt-1 text-sm leading-5 text-black/55">В демо доступны варианты «курьеру при получении» и «онлайн». Реальная оплата не подключена.</p></div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-white p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-dark"><Clock3 size={19}/></span>
                <div><h3 className="text-sm font-extrabold">Время и зона доставки</h3><p className="mt-1 text-sm leading-5 text-black/55">Зависят от адреса и загруженности кухни. Точные часы работы, география и сроки будут настроены для конкретного ресторана.</p></div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-black/10 p-4 text-xs leading-5 text-black/50">
                <MapPin size={16} className="mt-0.5 shrink-0"/>
                <span>Условия на этой странице — демонстрационные. Они не являются публичной офертой и не подтверждают доступность доставки по конкретному адресу.</span>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="mt-6 h-12 w-full cursor-pointer rounded-full bg-ink text-sm font-extrabold text-white transition hover:bg-black/80">Понятно</button>
          </section>
        </div>
      )}
    </>
  );
}
