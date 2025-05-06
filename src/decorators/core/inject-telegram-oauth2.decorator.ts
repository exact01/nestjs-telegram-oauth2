import { Inject } from '@nestjs/common';
import { MODULE_NAME } from '../../common/constants';

export function InjectTelegramOauth2(): ParameterDecorator {
    return Inject(MODULE_NAME);
}
