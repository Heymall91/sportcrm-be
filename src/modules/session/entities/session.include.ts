import { Club } from 'src/modules/club/entities/club.entity';
import { SessionSchedule } from '../../session-schedule/entities/session-schedule.entity';
import { SessionParticipant } from '../../session-participant/entities/session-participant.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';

export const SESSION_INCLUDE = {
  create: () => {
    return [
      { model: Club },
      { model: SessionSchedule },
      { model: SessionParticipant },
      { model: Payment, through: { attributes: [] } },
      { model: ClubStudent, through: { attributes: [] } },
    ];
  },
  getOne: () => {
    return [
      { model: Club },
      { model: SessionSchedule },
      { model: SessionParticipant },
      { model: Payment, through: { attributes: [] } },
      { model: ClubStudent, through: { attributes: [] } },
    ];
  },
  getAll: () => {
    return [
      { model: Club },
      { model: SessionSchedule },
      { model: SessionParticipant },
      { model: Payment, through: { attributes: [] } },
      { model: ClubStudent, through: { attributes: [] } },
    ];
  },
};
