import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManualMigration1741354018509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE producer (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar NOT NULL,
                document varchar NOT NULL
            )`,
    );
    await queryRunner.query(
      `CREATE TABLE farm (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar NOT NULL,
                city varchar NOT NULL,
                state varchar NOT NULL,
                total_area float NOT NULL,
                arable_area float NOT NULL,
                vegetationArea float NOT NULL,
                producer_id uuid NOT NULL REFERENCES producer(id)
            )`,
    );
    await queryRunner.query(
      `CREATE TABLE season (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar NOT NULL,
                year int NOT NULL,
                farm_id uuid NOT NULL REFERENCES farm(id)
            )`,
    );

    await queryRunner.query(
      `CREATE TABLE crop (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar NOT NULL,
                created_at timestamp NOT NULL,
                updated_at timestamp NOT NULL,
                season_id uuid NOT NULL REFERENCES season(id)
        )`,
    );
    await queryRunner.query(
      `CREATE TABLE harvest (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                amount float NOT NULL,
                harvest_date timestamp NOT NULL,
                crop_id uuid NOT NULL REFERENCES crop(id)
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS harvest`);
    await queryRunner.query(`DROP TABLE IF EXISTS crop`);
    await queryRunner.query(`DROP TABLE IF EXISTS season`);
    await queryRunner.query(`DROP TABLE IF EXISTS farm`);
    await queryRunner.query(`DROP TABLE IF EXISTS producer`);
  }
}
