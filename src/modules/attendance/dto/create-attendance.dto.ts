import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @ApiPropertyOptional()
  @IsBoolean()
  attended?: boolean;

  @ApiProperty()
  @IsString()
  @IsUUID()
  sessionInstanceId: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  sessionStudentId: string;
}
