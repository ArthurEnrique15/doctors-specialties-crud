import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDoctor1634598291865 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /**
         * Nome do médico com no máximo 120 caractéres
         * CRM: somente números com no máximo 7 caracteres
         * Telefone fixo: somente números
         * Telefone celular: somente números
         * CEP: somente números (Ao cadastrar o CEP, deve ser feita uma reqisição via XHR para a API dos correios e retornar todos os dados de endereço do cliente).
         */
        await queryRunner.createTable(
            new Table({
                name: "doctor",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "crm",
                        type: "varchar",
                    },
                    {
                        name: "landline",
                        type: "varchar",
                    },
                    {
                        name: "cellphone",
                        type: "varchar",
                    },
                    {
                        name: "addressId",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKAddressUser",
                        referencedTableName: "address",
                        referencedColumnNames: ["id"],
                        columnNames: ["addressId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("doctor");
    }
}
