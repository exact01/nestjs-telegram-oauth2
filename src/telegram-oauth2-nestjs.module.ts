import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MODULE_NAME } from './common/constants';
import { createTelegramOauth2SdkFactory } from './common/utils';
import {
    ASYNC_OPTIONS_TYPE,
    ConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN,
    OPTIONS_TYPE,
} from './telegram-oauth2-nestjs.builder';
import { ModuleRef } from '@nestjs/core';
import { TelegramOAuth2 } from '@exact-team/telegram-oauth2';
import { ITelegramOauth2ModuleOptions } from './interfaces';

@Global()
@Module({})
export class TelegramOauth2NestjsModule extends ConfigurableModuleClass {
    constructor(private readonly moduleRef: ModuleRef) {
        super();
    }

    public static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
        const TelegramOauth2ApiNameProvider: Provider = {
            provide: MODULE_NAME,
            useValue: MODULE_NAME,
        };

        const TelegramOauth2ApiProvider: Provider = {
            provide: MODULE_NAME,
            useFactory: (): TelegramOAuth2 => createTelegramOauth2SdkFactory(options),
        };

        const { providers, exports, ...rest } = super.forRoot(options);

        return {
            providers: [
                ...(providers ?? []),
                TelegramOauth2ApiNameProvider,
                TelegramOauth2ApiProvider,
            ],
            exports: [...(exports ?? []), TelegramOauth2ApiNameProvider, TelegramOauth2ApiProvider],
            ...rest,
        };
    }

    public static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
        const TelegramOauth2ApiNameProvider: Provider = {
            provide: MODULE_NAME,
            useValue: MODULE_NAME,
        };

        const TelegramOauth2ApiProvider: Provider = {
            provide: MODULE_NAME,
            useFactory: (options: ITelegramOauth2ModuleOptions): TelegramOAuth2 =>
                createTelegramOauth2SdkFactory(options),
            inject: [MODULE_OPTIONS_TOKEN],
        };

        const { providers, exports, ...rest } = super.forRootAsync(options);

        return {
            providers: [
                ...(providers ?? []),
                TelegramOauth2ApiNameProvider,
                TelegramOauth2ApiProvider,
            ],
            exports: [...(exports ?? []), TelegramOauth2ApiNameProvider, TelegramOauth2ApiProvider],
            ...rest,
        };
    }
}
