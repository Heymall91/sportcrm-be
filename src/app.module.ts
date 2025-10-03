import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';

import { DatabaseModule } from 'src/core/database/database.module';
import { validate } from 'src/core/config/env.validation';
import appConfig from './core/config/app.config';
import dbConfig from './core/config/db.config';
import authConfig from './core/config/auth.config';
// entities
import { Users } from './core/entity/entities/Users';
import { Clubs } from './core/entity/entities/Clubs';
import { ClubStaffs } from './core/entity/entities/ClubStaffs';
import { ClubStudents } from './core/entity/entities/ClubStudents';
import { ClubStudentSessionInstances } from './core/entity/entities/ClubStudentSessionInstances';
import { ClubStudentSessions } from './core/entity/entities/ClubStudentSessions';
import { Payments } from './core/entity/entities/Payments';
import { SessionInstances } from './core/entity/entities/SessionInstances';
import { SessionParticipants } from './core/entity/entities/SessionParticipants';
import { SessionSchedules } from './core/entity/entities/SessionSchedules';
import { Sessions } from './core/entity/entities/Sessions';
import { PaymentTargets } from './core/entity/entities/PaymentTargets';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.stage', '.env.prod'],
      load: [appConfig, authConfig, dbConfig],
      isGlobal: true,
      validate,
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '/shared/i18n/'),
          watch: true,
        },
        typesOutputPath: join(
          __dirname,
          '../src/core/generated/i18n.generated.ts',
        ),
      }),
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
    DatabaseModule,
    Users,
    Clubs,
    ClubStaffs,
    ClubStudents,
    ClubStudentSessionInstances,
    ClubStudentSessions,
    Payments,
    PaymentTargets,
    Sessions,
    SessionInstances,
    SessionParticipants,
    SessionSchedules
  ],
})
export class AppModule {}
