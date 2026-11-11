# PIZZA LAB

Демонстрационный сайт доставки пиццы для российского рынка. Проект показывает современный storefront: каталог, продуктовые карточки, будущую корзину и оформление заказа.

## Стек

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand, React Hook Form, Zod
- pnpm

## Требования

- Node.js 20.9+
- pnpm 10+

## Запуск

```bash
pnpm install
pnpm dev
```

Откройте http://localhost:3000.

## Скрипты

- `pnpm dev` — локальная разработка
- `pnpm build` — production-сборка
- `pnpm start` — production-сервер
- `pnpm lint` — ESLint
- `pnpm typecheck` — TypeScript без генерации файлов

## Структура

- `src/app` — маршруты, layout и глобальные стили
- `src/entities` — бизнес-сущности и данные
- `src/features` — пользовательские сценарии
- `src/widgets` — крупные секции страниц
- `src/shared` — общие компоненты, конфигурация и утилиты

## Статус

Сейчас это frontend MVP с демонстрационными данными. Реальная отправка заказов, оплата и интеграция с доставкой не подключены.
