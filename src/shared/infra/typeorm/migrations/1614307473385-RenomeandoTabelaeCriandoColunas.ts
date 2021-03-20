import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RenomeandoTabelaeCriandoColunas1614307473385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'solicitacoes',
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
                        name: 'atendimento',
                        type: 'varchar',
                    },
                    {
                        name: 'carteira',
                        type: 'varchar',
                    },
                    {
                        name: 'idade',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'sexo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'regulamentado',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'tipo',
                        type: 'varchar',
                    },
                    {
                        name: 'solicitante',
                        type: 'varchar',
                    },
                    {
                        name: 'quarto',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'data_da_internacao',
                        type: 'Date',
                        isNullable: true
                    },
                    {
                        name: 'data_da_cirurgia',
                        type: 'Date',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
					{
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('solicitacoes');
    }

}
