import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1758097101672 implements MigrationInterface {
    name = 'Migration1758097101672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`subject\` varchar(255) NOT NULL, \`text\` text NOT NULL, \`status\` enum ('pending', 'resolved') NOT NULL DEFAULT 'pending', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_5dec255234c5b7418f3d1e88ce4\``);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`blogId\` \`blogId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_a001483d5ba65dad16557cd6ddb\``);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_2585c11fedee21900a332b554a6\``);
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`thumbnail\` \`thumbnail\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`categoryId\` \`categoryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_5dec255234c5b7418f3d1e88ce4\` FOREIGN KEY (\`blogId\`) REFERENCES \`blog\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD CONSTRAINT \`FK_a001483d5ba65dad16557cd6ddb\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD CONSTRAINT \`FK_2585c11fedee21900a332b554a6\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_2585c11fedee21900a332b554a6\``);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_a001483d5ba65dad16557cd6ddb\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_5dec255234c5b7418f3d1e88ce4\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`categoryId\` \`categoryId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`thumbnail\` \`thumbnail\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blog\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD CONSTRAINT \`FK_2585c11fedee21900a332b554a6\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD CONSTRAINT \`FK_a001483d5ba65dad16557cd6ddb\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`blogId\` \`blogId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_5dec255234c5b7418f3d1e88ce4\` FOREIGN KEY (\`blogId\`) REFERENCES \`blog\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`contact\``);
    }

}
