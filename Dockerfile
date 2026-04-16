# === Stage 1: Build ===
FROM node:20-alpine AS builder

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

WORKDIR /app

# Копируем файлы зависимостей сначала (для кэширования слоёв)
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости (аналог npm ci)
RUN pnpm install --frozen-lockfile

# Копируем весь код
COPY . .

# Передаём переменную окружения для сборки
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Собираем Next.js
RUN pnpm run build

# === Stage 2: Production ===
FROM node:20-alpine AS runner

# Устанавливаем pnpm (нужен для запуска, если используются pnpm-скрипты)
RUN npm install -g pnpm

WORKDIR /app

ENV NODE_ENV=production

# Копируем только нужное из stage builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Если используешь next.config.js с output: 'standalone', package.json тоже нужен
COPY --from=builder /app/package.json ./

# Открываем порт
EXPOSE 3000

# Запускаем сервер (standalone режим)
CMD ["node", "server.js"]
