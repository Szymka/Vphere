FROM php:7.3-fpm
COPY sources.list /etc/apt/sources.list
RUN rm -Rf /var/lib/apt/lists/* \
         && apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libzip-dev \
    zlib1g-dev \
    cron \
        && docker-php-ext-install -j$(nproc) bcmath \
        && docker-php-ext-install -j$(nproc) gd \
        && docker-php-ext-install -j$(nproc) pdo_mysql \
        && docker-php-ext-install -j$(nproc) mysqli \
        && docker-php-ext-install -j$(nproc) opcache \
        && docker-php-ext-install -j$(nproc) zip
ADD cron.txt /var/spool/cron/root