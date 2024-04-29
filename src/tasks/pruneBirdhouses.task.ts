// src/tasks/pruneBirdhouses.task.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PruneBirdhousesService } from './pruneBirdhouses.service';

@Injectable()
export class PruneBirdhousesTask {
  constructor(
    private readonly pruneBirdhousesService: PruneBirdhousesService,
  ) {}

  @Cron('0 0 * * *') // Runs every day at midnight
  async handleCron() {
    Logger.debug('Starting prune birdhouses task');

    await this.pruneBirdhousesService.pruneBirdhouses();

    Logger.debug('Finished prune birdhouses task');
  }
}
