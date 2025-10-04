import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { User } from 'src/modules/user/entities/user.entity';
import { Club } from 'src/modules/club/entities/club.entity';
import { ClubStaff } from 'src/modules/club-staff/entities/club-staff.entity';
import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { ClubStudentSession } from 'src/modules/club-student-session/entities/club-student-session.entity';
import { PaymentTarget } from 'src/modules/payment-target/entities/payment-target.entity';
import { SessionSchedule } from 'src/modules/session-schedule/entities/session-schedule.entity';
import { SessionParticipant } from 'src/modules/session-participant/entities/session-participant.entity';
import { Attendance } from 'src/modules/attendance/entities/attendance.entity';
import { SessionInstance } from 'src/modules/session-instance/entities/session-instance.entity';
import { ClubStudentSessionInstance } from 'src/modules/club-student-session-instance/entities/club-student-session-instance.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get<string>('db.host') || 'localhost',
        port: configService.get<number>('db.port') || 3306,
        username: configService.get<string>('db.username') || 'root',
        password: configService.get<string>('db.password') || 'newpassword',
        database: configService.get<string>('db.name') || 'sportcrm',
      });
      sequelize.addModels([
        User,
        Club,
        ClubStaff,
        ClubStudent,
        Payment,
        SessionSchedule,
        SessionParticipant,
        Attendance,
        SessionInstance,
        ClubStudentSessionInstance,
        Session,
        PaymentTarget,
        ClubStudentSession,
      ]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
