import { MigrationInterface, QueryRunner } from 'typeorm';
import { Birdhouse } from '../src/birdhouse/entities/birdhouse.entity';
import { birdhouses } from '../src/utils/seed-birdhouses';

export class BirdhouseListPopulate1714339985064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const birdhouseRepository = queryRunner.manager.getRepository(Birdhouse);
    await birdhouseRepository.save(birdhouses);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "birdhouse"`);
  }
}
