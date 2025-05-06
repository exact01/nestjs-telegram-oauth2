import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ITelegramOauth2ModuleOptions } from './interfaces';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<ITelegramOauth2ModuleOptions>()
        .setFactoryMethodName('forRootAsync')
        .setClassMethodName('forRoot')
        .build();
