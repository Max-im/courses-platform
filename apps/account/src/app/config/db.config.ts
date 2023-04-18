import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

export const getDbConfig = (): TypeOrmModuleAsyncOptions => {
    return {
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: Number(configService.get('DB_PORT')),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [UserEntity],
            synchronize: true,
        }),
        inject: [ConfigService],
        imports: [ConfigModule]
    };
};
