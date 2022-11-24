import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduct implements MigrationInterface {
  name = 'Product';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "sku" character varying(500) NOT NULL, CONSTRAINT "UQ_656c3b291988760dcb81dd170c7" UNIQUE ("sku"), CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_entity"`);
  }
}
