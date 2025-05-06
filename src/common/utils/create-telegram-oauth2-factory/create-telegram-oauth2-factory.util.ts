import { TelegramOAuth2 } from '@exact-team/telegram-oauth2';
import { Logger } from '@nestjs/common';
import { ITelegramOauth2Config } from './interfaces';
const logger = new Logger('telegram-oauth2-nestjs');

export function createTelegramOauth2SdkFactory(
    moduleOptions: ITelegramOauth2Config,
): TelegramOAuth2 {
    const telegramOauth2Api = new TelegramOAuth2({
        botToken: moduleOptions.botToken,
        validUntil: moduleOptions.validUntil,
    });
    logger.log(`TelegramOauth2Api initialized`);
    return telegramOauth2Api;
}
