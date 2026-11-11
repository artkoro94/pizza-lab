"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { ArrowLeft, CheckCircle2, MapPin, ShoppingBag } from "lucide-react";
import {
  selectCartTotal,
  useCartStore,
} from "@/features/cart/model/cart-store";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/features/checkout/model/checkout-schema";
import { Container } from "@/shared/ui/container";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU").format(price) + " ₽";

const DELIVERY_PRICE = 199;
const FREE_DELIVERY_FROM = 1500;

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-black/30 focus:border-accent focus:ring-2 focus:ring-accent/15";
const labelClass = "block text-xs font-bold text-ink";

export function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore(selectCartTotal);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      deliveryMethod: "delivery",
      address: "",
      apartment: "",
      entrance: "",
      intercom: "",
      floor: "",
      paymentMethod: "courier",
      comment: "",
    },
  });

  const deliveryMethod = useWatch({ control, name: "deliveryMethod" });
  const deliveryPrice =
    deliveryMethod === "pickup" || total >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;
  const finalTotal = total + deliveryPrice;

  const onSubmit = async (values: CheckoutFormValues) => {
    // Demo flow: no personal data is sent to a server or stored.
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    const number = `PL-${Date.now().toString().slice(-6)}`;
    setOrderNumber(number);
    clear();
    void values;
  };

  if (orderNumber) {
    return (
      <Container className="py-24">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-green-50 text-green-600">
            <CheckCircle2 size={34} />
          </div>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-accent-dark">PIZZA LAB · ДЕМО</p>
          <h1 className="mt-3 font-display text-3xl font-black sm:text-4xl">Заказ оформлен!</h1>
          <p className="mt-3 text-sm leading-6 text-black/50">Это демонстрационный сценарий. Заказ № {orderNumber} не отправлен в ресторан, а данные формы никуда не передавались.</p>
          <Link href="/" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-extrabold text-white transition hover:bg-accent hover:text-ink">Вернуться на главную</Link>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-24">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-paper text-accent"><ShoppingBag size={30} /></div>
          <h1 className="mt-6 font-display text-3xl font-black">Корзина пока пуста</h1>
          <p className="mt-2 text-sm text-black/50">Добавь пиццу из меню, и мы сможем перейти к оформлению.</p>
          <Link href="/#menu" className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-extrabold">Выбрать пиццу</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <Link href="/#menu" className="inline-flex items-center gap-2 text-xs font-bold text-black/45 transition hover:text-ink"><ArrowLeft size={15} /> Вернуться к меню</Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-dark">Последний шаг</p>
            <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">Оформление заказа<span className="text-accent">.</span></h1>
          </div>

          <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
            <h2 className="font-display text-xl font-black">Контактные данные</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>Ваше имя
                <input {...register("customerName")} autoComplete="name" placeholder="Например, Артём" className={inputClass} />
                {errors.customerName && <span className="mt-1 block text-xs font-medium text-red-600">{errors.customerName.message}</span>}
              </label>
              <label className={labelClass}>Телефон
                <input {...register("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 999 123-45-67" className={inputClass} />
                {errors.phone && <span className="mt-1 block text-xs font-medium text-red-600">{errors.phone.message}</span>}
              </label>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
            <h2 className="font-display text-xl font-black">Как получить заказ?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${deliveryMethod === "delivery" ? "border-accent bg-accent/5" : "border-black/10"}`}>
                <input {...register("deliveryMethod")} type="radio" value="delivery" className="accent-[#ff633e]" />
                <span><strong className="block text-sm">Доставка</strong><span className="mt-1 block text-xs text-black/45">Привезём по адресу</span></span>
              </label>
              <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${deliveryMethod === "pickup" ? "border-accent bg-accent/5" : "border-black/10"}`}>
                <input {...register("deliveryMethod")} type="radio" value="pickup" className="accent-[#ff633e]" />
                <span><strong className="block text-sm">Самовывоз</strong><span className="mt-1 block text-xs text-black/45">Заберёте самостоятельно</span></span>
              </label>
            </div>

            {deliveryMethod === "delivery" && (
              <div className="mt-5 rounded-2xl bg-paper p-4">
                <div className="flex items-center gap-2 text-sm font-bold"><MapPin size={16} className="text-accent-dark" /> Адрес доставки</div>
                <label className={`${labelClass} mt-4`}>Улица и дом
                  <input {...register("address")} autoComplete="street-address" placeholder="Например, ул. Лесная, 12" className={inputClass} />
                  {errors.address && <span className="mt-1 block text-xs font-medium text-red-600">{errors.address.message}</span>}
                </label>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <label className={labelClass}>Квартира<input {...register("apartment")} placeholder="24" className={inputClass} /></label>
                  <label className={labelClass}>Подъезд<input {...register("entrance")} placeholder="2" className={inputClass} /></label>
                  <label className={labelClass}>Этаж<input {...register("floor")} placeholder="5" className={inputClass} /></label>
                  <label className={labelClass}>Домофон <span className="font-normal text-black/40">(необязательно)</span><input {...register("intercom")} placeholder="Код домофона" className={inputClass} /></label>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
            <h2 className="font-display text-xl font-black">Оплата</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 p-4 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                <input {...register("paymentMethod")} type="radio" value="courier" className="accent-[#ff633e]" />
                <span className="text-sm font-bold">Курьеру при получении</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 p-4 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                <input {...register("paymentMethod")} type="radio" value="online" className="accent-[#ff633e]" />
                <span className="text-sm font-bold">Онлайн (демо)</span>
              </label>
            </div>
            <label className={`${labelClass} mt-5`}>Комментарий к заказу
              <textarea {...register("comment")} rows={3} placeholder="Здесь вы можете написать ваши пожелания к заказу" className="mt-2 w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-accent focus:ring-2 focus:ring-accent/15" />
              {errors.comment && <span className="mt-1 block text-xs font-medium text-red-600">{errors.comment.message}</span>}
            </label>
          </section>

          <button type="submit" disabled={isSubmitting} className="h-14 w-full rounded-full bg-accent px-6 text-sm font-black text-ink transition hover:bg-accent-dark disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? "Оформляем..." : `Подтвердить демо-заказ · ${formatPrice(finalTotal)}`}
          </button>
          <p className="text-center text-xs leading-5 text-black/40">Демонстрационный режим: форма не отправляет персональные данные и не создаёт реальный заказ.</p>
        </form>

        <aside className="h-fit rounded-3xl bg-ink p-6 text-white lg:sticky lg:top-8">
          <h2 className="font-display text-xl font-black">Ваш заказ</h2>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="text-white/65">{item.name} · {item.size} см × {item.quantity}</span>
                <strong className="shrink-0 tabular-nums">{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="my-6 border-t border-white/10" />
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-white/55"><span>Товары</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between text-white/55"><span>Доставка</span><span>{deliveryPrice === 0 ? "Бесплатно" : formatPrice(deliveryPrice)}</span></div>
            {deliveryMethod === "delivery" && total < FREE_DELIVERY_FROM && <p className="text-xs leading-5 text-white/40">Бесплатная доставка от {formatPrice(FREE_DELIVERY_FROM)}</p>}
          </div>
          <div className="my-6 border-t border-white/10" />
          <div className="flex items-end justify-between"><span className="text-sm text-white/55">Итого</span><strong className="font-display text-3xl font-black tabular-nums">{formatPrice(finalTotal)}</strong></div>
        </aside>
      </div>
    </Container>
  );
}
