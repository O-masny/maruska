# --- Stage 1: Node deps ---
FROM node:20-alpine AS node-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci


# --- Stage 2: Base image s PHP 8.3 ---
FROM php:8.3-fpm-alpine

WORKDIR /var/www

# systémové závislosti
RUN apk add --no-cache \
    nodejs npm \
    libzip-dev unzip oniguruma-dev sqlite-dev bash git curl icu-dev \
    libpng-dev libjpeg-turbo-dev libwebp-dev freetype-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
  && docker-php-ext-install pdo pdo_sqlite bcmath zip intl gd

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Kopíruj aplikaci
COPY . .

# Composer install
RUN composer install --no-dev --optimize-autoloader

# Node modules z node-deps
COPY --from=node-deps /app/node_modules ./node_modules

# Build assets (teď už PHP existuje → artisan funguje)
RUN npm run build

# Práva
RUN chown -R www-data:www-data storage bootstrap/cache database

EXPOSE 9000
CMD ["php-fpm"]
