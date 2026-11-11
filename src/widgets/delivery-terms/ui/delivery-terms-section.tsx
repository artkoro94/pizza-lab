import { Clock3, MapPin, PackageCheck, ShoppingBag, Truck } from "lucide-react";
import { Container } from "@/shared/ui/container";

const terms = [
  {
    icon: Truck,
    title: "Доставка до двери",
    description: "Стоимость — 199 ₽. При заказе от 1 500 ₽ доставка бесплатная.",
  },
  {
    icon: ShoppingBag,
    title: "Самовывоз",
    description: "Бесплатно. Адрес точки самовывоза будет указан после настройки конкретного ресторана.",
  },
  {
    icon: PackageCheck,
    title: "Оплата",
    description: "В демонстрационной версии доступны оплата курьеру при получении и онлайн-оплата. Реальный платёж не проводится.",
  },
  {
    icon: Clock3,
    title: "Время и зона доставки",
    description: "Зависят от адреса и загруженности кухни. Точные часы работы, география и сроки настраиваются для конкретного ресторана.",
  },
];

export function DeliveryTermsSection() {
  return (
    <section id="delivery-terms" className="scroll-mt-8 bg-[#e9e3d9] py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-dark">PIZZA LAB · ИНФОРМАЦИЯ</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Доставка и оплата<span className="text-accent">.</span></h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-black/55">Основная информация о получении заказа. Проект работает в демонстрационном режиме — реальные заказы и платежи пока не принимаются.</p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {terms.map(({ icon: Icon, title, description }) => (
              <article key={title} className="flex gap-4 rounded-2xl bg-white p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-dark"><Icon size={20} /></span>
                <div><h3 className="text-sm font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-black/55">{description}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-black/10 p-5 text-xs leading-5 text-black/50">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <p>Условия демонстрационные, не являются публичной офертой и не подтверждают доступность доставки по конкретному адресу. Финальные условия, адреса, часы работы и зона доставки определяются рестораном.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
