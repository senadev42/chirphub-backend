import { MigrationInterface, QueryRunner } from 'typeorm';
import { Birdhouse } from '../src/birdhouse/entities/birdhouse.entity';
import { birdhouses } from '../src/utils/seed-birdhouses';
import { BirdhouseHistory } from '../src/birdhouse/entities/birdhousehistory.entity';
import { generateBirdhouseHistory } from '../src/utils/seed-birdhouse-residency';

export class BirdhouseListPopulate1714339985064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //seed the birdhouses
    const birdhouseRepository = queryRunner.manager.getRepository(Birdhouse);
    await birdhouseRepository.save(birdhouses);

    //seed the records
    const birdhouseHistoryRepository = queryRunner.manager.getRepository(BirdhouseHistory);
    const birdhouseHistoryRecords = generateBirdhouseHistory();
    await birdhouseHistoryRepository.save(birdhouseHistoryRecords);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "birdhouse_history"`);
    await queryRunner.query(`DELETE FROM "birdhouse"`);

  }
}
