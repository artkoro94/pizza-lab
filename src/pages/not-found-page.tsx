import { ArrowLeft, Home, Pizza } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/shared/ui/container";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-ink text-white">
      <header className="border-b border-white/10">
        <Container className="flex h-16 items-center">
          <Link to="/" aria-label="PIZZA LAB — на главную" className="font-display text-2xl font-black tracking-[-0.08em]">
            PIZZA<span className="text-accent">LAB</span>
          </Link>
        </Container>
      </header>

      <Container className="flex flex-1 items-center justify-center py-20">
        <section className="relative mx-auto max-w-2xl text-center" aria-labelledby="not-found-title">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[min(80vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            <div className="mx-auto grid size-20 place-items-center rounded-3xl border border-white/10 bg-white/5 text-accent">
              <Pizza size={38} strokeWidth={1.6} />
            </div>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-accent">Ошибка 404</p>
            <h1 id="not-found-title" className="mt-3 font-display text-7xl font-black tracking-[-0.09em] sm:text-9xl">
              404<span className="text-accent">.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/60 sm:text-lg">
              Кажется, эта страница ушла за заказом и ещё не вернулась. Давай найдём что-нибудь вкусное на главной.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-extrabold text-ink transition hover:bg-accent-dark">
                <Home size={17} /> На главную
              </Link>
              <button type="button" onClick={() => navigate(-1)} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-bold text-white transition hover:border-accent hover:text-accent">
                <ArrowLeft size={17} /> Назад
              </button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
