import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDoctorsSpecialties1634598322999
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "doctors_specialties",
                columns: [
                    {
                        name: "doctor_id",
                        type: "uuid",
                    },
                    {
                        name: "specialty_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKDoctorSpecialty",
                        referencedTableName: "doctor",
                        referencedColumnNames: ["id"],
                        columnNames: ["doctor_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKSpecialtyDoctor",
                        referencedTableName: "specialty",
                        referencedColumnNames: ["id"],
                        columnNames: ["specialty_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("doctors_specialties");
    }
}
