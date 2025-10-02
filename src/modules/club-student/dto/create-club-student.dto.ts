import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { StudentStatus } from '../entities/club-student.entity';

export class CreateClubStudentDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  clubId: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: StudentStatus })
  @IsEnum(StudentStatus, { message: 'Valid role required' })
  status: StudentStatus;
}
