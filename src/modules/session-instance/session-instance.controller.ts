import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { SessionInstanceService } from './session-instance.service';
import { CreateSessionInstanceDto } from './dto/create-session-instance.dto';
import { UpdateSessionInstanceDto } from './dto/update-session-instance.dto';
import { SessionInstance } from './entities/session-instance.entity';

@ApiTags('Session Instance')
@Controller('session-instance')
export class SessionInstanceController {
  constructor(
    private readonly sessionInstanceService: SessionInstanceService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSessionInstance(
    @Body() createSessionInstanceDto: CreateSessionInstanceDto,
  ): Promise<SessionInstance> {
    return this.sessionInstanceService.createSessionInstance(
      createSessionInstanceDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSessionInstances(): Promise<SessionInstance[]> {
    return this.sessionInstanceService.getSessionInstances();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSessionInstance(@Param('id') id: UUID): Promise<SessionInstance> {
    return this.sessionInstanceService.getSessionInstance(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSessionInstance(
    @Param('id') id: UUID,
    @Body() updateSessionInstanceDto: UpdateSessionInstanceDto,
  ): Promise<SessionInstance> {
    return this.sessionInstanceService.updateSessionInstance(
      id,
      updateSessionInstanceDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeSessionInstance(@Param('id') id: UUID): Promise<SessionInstance> {
    return this.sessionInstanceService.removeSessionInstance(id);
  }
}
