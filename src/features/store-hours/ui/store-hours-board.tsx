"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

// Demo schedule. Change these values when configuring the real restaurant.
const OPEN_HOUR = 10;
const CLOSE_HOUR = 23;
const WARNING_BEFORE_CLOSE_MS = 2 * 60 * 60 * 1000;

type StoreStatus = {
  isOpen: boolean;
  isClosingSoon: boolean;
  timeLabel: string;
  message: string;
};

function getStoreStatus(now: Date): StoreStatus {
  const opening = new Date(now);
  opening.setHours(OPEN_HOUR, 0, 0, 0);

  const closing = new Date(now);
  closing.setHours(CLOSE_HOUR, 0, 0, 0);

  const isOpen = now >= opening && now < closing;
  const remainingMs = closing.getTime() - now.getTime();
  const isClosingSoon =
    isOpen && remainingMs > 0 && remainingMs <= WARNING_BEFORE_CLOSE_MS;

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

  if (!isOpen) {
    return {
      isOpen: false,
      isClosingSoon: false,
      timeLabel: `${String(OPEN_HOUR).padStart(2, "0")}:00–${String(CLOSE_HOUR).padStart(2, "0")}:00`,
      message:
        now < opening
          ? `Откроемся сегодня в ${formatTime(opening)}`
          : `Сегодня уже закрыты · Откроемся завтра в ${String(OPEN_HOUR).padStart(2, "0")}:00`,
    };
  }

  if (isClosingSoon) {
    const minutesLeft = Math.max(1, Math.ceil(remainingMs / 60_000));
    const hours = Math.floor(minutesLeft / 60);
    const minutes = minutesLeft % 60;
    const remainingLabel =
      hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;

    return {
      isOpen: true,
      isClosingSoon: true,
      timeLabel: `До закрытия ${remainingLabel}`,
      message: "Поторопитесь — скоро закрываемся",
    };
  }

  return {
    isOpen: true,
    isClosingSoon: false,
    timeLabel: `Открыты до ${String(CLOSE_HOUR).padStart(2, "0")}:00`,
    message: "Принимаем заказы",
  };
}

export function StoreHoursBoard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const intervalId = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const status = now ? getStoreStatus(now) : null;
  const isOpen = status?.isOpen ?? false;
  const isClosingSoon = status?.isClosingSoon ?? false;

  return (
    <div
      className={`mb-8 inline-flex max-w-full flex-col gap-2 rounded-2xl border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm transition-colors duration-300 sm:flex-row sm:items-center sm:gap-3 sm:rounded-full ${isOpen ? "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-100" : "border-white/15 bg-white/[0.04] text-white/70"} `}
      aria-live="polite"
      aria-label={status ? `Режим работы: ${status.message}. ${status.timeLabel}` : "Проверяем режим работы"}
    >
      <span className="inline-flex items-center gap-2">
        <span
          className={`size-2 shrink-0 rounded-full ${isOpen ? "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" : "bg-accent shadow-[0_0_14px_var(--color-accent)]"}`}
        />
        <span>{status?.message ?? "Проверяем режим работы…"}</span>
      </span>
      <span className="hidden h-4 w-px bg-current/20 sm:block" />
      <span className="inline-flex items-center gap-1.5 pl-4 text-[10px] tracking-[0.12em] opacity-70 sm:pl-0">
        <Clock3 size={13} />
        {status?.timeLabel ?? `${String(OPEN_HOUR).padStart(2, "0")}:00–${String(CLOSE_HOUR).padStart(2, "0")}:00`}
      </span>
      {isClosingSoon && (
        <span className="text-[10px] font-black tracking-[0.12em] text-amber-200 sm:ml-1">
          Последний шанс заказать
        </span>
      )}
    </div>
  );
}
