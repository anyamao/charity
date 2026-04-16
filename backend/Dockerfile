# Используем официальный образ Python 3.12 (slim = легкий)
FROM python:3.12-slim

# Рабочая папка внутри контейнера
WORKDIR /app

# Копируем только requirements.txt сначала (для кэширования слоёв)
COPY requirements.txt .

# Устанавливаем зависимости
# --no-cache-dir уменьшает размер образа
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь код приложения
COPY . .

# Создаём не-рутового пользователя для безопасности (опционально, но рекомендуется)
# RUN useradd -m appuser && chown -R appuser /app
# USER appuser

# Открываем порт (информативно)
EXPOSE 8000

# Команда запуска
# --host 0.0.0.0 обязателен для доступа извне контейнера
# --workers 2 для продакшена (увеличь при нагрузке)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
