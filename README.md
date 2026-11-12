# PIZZA LAB

Демонстрационный сайт доставки пиццы на React, TypeScript и Vite. Проект публикуется как статический сайт на GitHub Pages.

## Стек

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Zustand, React Hook Form, Zod
- Vitest

## Локальный запуск

```bash
pnpm install
pnpm dev
```

## Проверки

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Публикация

Сборка создаётся командой `pnpm build` в папке `dist`. Для GitHub Pages настроен базовый путь `/pizza-lab/`; workflow публикует содержимое `dist` автоматически после push в `main`.

Оформление заказа работает в демонстрационном режиме: реальные заказы не отправляются, персональные данные не сохраняются.
