# NestJS Telegram OAuth2 SDK Module

![GitHub top language](https://img.shields.io/github/languages/top/exact01/nestjs-telegram-oauth2)
![GitHub Repo stars](https://img.shields.io/github/stars/exact01/nestjs-telegram-oauth2)

![npm version](https://img.shields.io/npm/v/@exact-team/nestjs-telegram-oauth2)
![GitHub Tag](https://img.shields.io/github/v/tag/exact01/nestjs-telegram-oauth2)

![Build Status](https://img.shields.io/github/actions/workflow/status/exact01/nestjs-telegram-oauth2/.github/workflows/deploy-lib.yml)
![Downloads](https://img.shields.io/npm/dt/@exact-team/nestjs-telegram-oauth2)
![License](https://img.shields.io/npm/l/@exact-team/nestjs-telegram-oauth2)
![NPM Last Update](https://img.shields.io/npm/last-update/%40exact-team%2Fnestjs-telegram-oauth2)

![Known Vulnerabilities](https://snyk.io/test/github/exact01/nestjs-telegram-oauth2/badge.svg)
![Coverage Status](https://img.shields.io/codecov/c/github/exact01/nestjs-telegram-oauth2)

---

## 📦 Установка

```bash
npm install @exact-team/nestjs-telegram-oauth2
```

## ⚙️ Подготовка

1. Создайте бота через [@BotFather](https://t.me/BotFather) и получите токен.
2. Установите домен OAuth-компонента командой `/setdomain` в BotFather.
3. Извлеките `botId` — часть токена до `:` (напр., для `1234567890:ABC...` это `1234567890`).
4. Сохраните `botId` для использования на фронтенде.

---

## 🚀 Основные возможности

- Простая интеграция с NestJS
- Синхронная и асинхронная конфигурация модуля
- Глобальная провайдерная доступность
- Пользовательский декоратор `@InjectTelegramOAuth2()`
- Строгая типизация параметров и ответов
- Автоматическая инициализация SDK

---

## ⚙️ Конфигурация

### Синхронная (forRoot)

```typescript
import { Module } from '@nestjs/common';
import { TelegramOauth2NestjsModule } from '@exact-team/nestjs-telegram-oauth2';

@Module({
  imports: [
    TelegramOauth2NestjsModule.forRoot({
      botToken: 'YOUR_BOT_TOKEN',
      validUntil: 2000, // время жизни тела запроса в секундах
    }),
  ],
})
export class AppModule {}
```

### Асинхронная (forRootAsync)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramOauth2NestjsModule } from '@exact-team/nestjs-telegram-oauth2';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegramOauth2NestjsModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        botToken: config.get<string>('TELEGRAM_BOT_TOKEN'),
        validUntil: Number(config.get<string>('TELEGRAM_VALID_UNTIL_SECONDS')),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

> Если `validUntil` не указан, проверка времени не выполняется.

---

## 🛠 Использование в сервисах

```typescript
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectTelegramOAuth2 } from '@exact-team/nestjs-telegram-oauth2';
import { TelegramOAuth2, ITelegramData } from '@exact-team/telegram-oauth2';

@Injectable()
export class TelegramService {
  constructor(@InjectTelegramOAuth2() private readonly telegram: TelegramOAuth2) {}

  async authenticate(body: ITelegramData) {
    const result = this.telegram.handleTelegramOAuthCallback(body);

    if (!result.isSuccess || !result.data) {
      throw new BadRequestException(result.message || 'Invalid payload');
    }

    const userData = result.data;
    // Найти/создать пользователя в БД и выдать JWT
    return { user: userData };
  }
}
```

---

## 🔍 Внутренняя структура

- **telegram-oauth2-nestjs.module.ts**
  Глобальный модуль с методами `forRoot` и `forRootAsync`.
- **telegram-oauth2-nestjs.builder.ts**
  Настраивает `ConfigurableModuleBuilder` для создания провайдеров.
- **create-telegram-oauth2-factory.util.ts**
  Фабрика для инициализации `TelegramOAuth2` с логированием и параметрами.

---

## 📋 Требования

- Node.js v20+
- NestJS v10+
- TypeScript v5.0+

---

## 🛠️ Разработка

```bash
# Сборка
npm run build
```

---

## 📄 Лицензия

ISC

---

## ✍️ Автор и поддержка

**Автор:** exact01
Для вопросов и баг-репортов создавайте [Issue](https://github.com/exact01/nestjs-telegram-oauth2/issues).
