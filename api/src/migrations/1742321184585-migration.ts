import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742321184585 implements MigrationInterface {
    name = 'Migration1742321184585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CERTIFICADO" DROP CONSTRAINT "FK_CERTIFICADO_GRUPO"`);
        await queryRunner.query(`ALTER TABLE "CERTIFICADO" DROP CONSTRAINT "FK_CERTIFICADO_ESTUDIANTE"`);
        await queryRunner.query(`ALTER TABLE "CERTIFICADO" DROP COLUMN "FK_GRUPO"`);
        await queryRunner.query(`ALTER TABLE "CERTIFICADO" DROP COLUMN "FK_ESTUDIANTE"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CERTIFICADO" ADD "FK_ESTUDIANTE" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "CERTIFICADO" ADD "FK_GRUPO" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "CERTIFICADO" ADD CONSTRAINT "FK_CERTIFICADO_ESTUDIANTE" FOREIGN KEY ("FK_ESTUDIANTE") REFERENCES "ESTUDIANTE"("pk_estudiante") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CERTIFICADO" ADD CONSTRAINT "FK_CERTIFICADO_GRUPO" FOREIGN KEY ("FK_GRUPO") REFERENCES "GRUPO"("PK_GRUPO") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
