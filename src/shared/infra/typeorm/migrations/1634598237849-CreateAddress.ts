import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddress1634598237849 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "address",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "cep",
                        type: "varchar",
                    },
                    {
                        name: "logradouro",
                        type: "varchar",
                    },
                    {
                        name: "complemento",
                        type: "varchar",
                    },
                    {
                        name: "bairro",
                        type: "varchar",
                    },
                    {
                        name: "localidade",
                        type: "varchar",
                    },
                    {
                        name: "uf",
                        type: "varchar",
                    },
                    {
                        name: "numero",
                        type: "numeric",
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("address");
    }
}
