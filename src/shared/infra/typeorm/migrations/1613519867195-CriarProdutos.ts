import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CriarProdutos1613519867195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'produtos',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'data',
                        type: 'Date',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produtos');
    }

}
