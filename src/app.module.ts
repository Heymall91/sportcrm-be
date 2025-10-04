import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';

import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from 'src/core/database/database.module';
// import { validate } from 'src/core/config/env.validation';
import appConfig from './core/config/app.config';
import dbConfig from './core/config/db.config';
import authConfig from './core/config/auth.config';
import { ClubModule } from './modules/club/club.module';
import { ClubStudentModule } from './modules/club-student/club-student.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SessionModule } from './modules/session/session.module';
import { PaymentTargetModule } from './modules/payment-target/payment-target.module';
import { ClubStaffModule } from './modules/club-staff/club-staff.module';
import { SessionParticipantModule } from './modules/session-participant/session-participant.module';
import { SessionScheduleModule } from './modules/session-schedule/session-schedule.module';
import { SessionInstanceModule } from './modules/session-instance/session-instance.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { ClubStudentSessionModule } from './modules/club-student-session/club-student-session.module';
import { ClubStudentSessionInstanceModule } from './modules/club-student-session-instance/club-student-session-instance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.stage', '.env.prod'],
      load: [appConfig, authConfig, dbConfig],
      isGlobal: true,
      // validate,
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
    UserModule,
    ClubModule,
    ClubStaffModule,
    ClubStudentModule,
    PaymentModule,
    PaymentTargetModule,
    SessionModule,
    SessionParticipantModule,
    SessionScheduleModule,
    SessionInstanceModule,
    AttendanceModule,
    ClubStudentSessionModule,
    ClubStudentSessionInstanceModule,
  ],
})
export class AppModule {}
