import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AdicionarAvatar1613655266414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
	    await queryRunner.addColumn('usuarios', new TableColumn({
				name: 'avatar',
				type: 'varchar',
				isNullable: true
			}))
		}

    public async down(queryRunner: QueryRunner): Promise<void> {
	    await queryRunner.dropColumn('nomedatabela', 'nomedacoluna');
		}

}