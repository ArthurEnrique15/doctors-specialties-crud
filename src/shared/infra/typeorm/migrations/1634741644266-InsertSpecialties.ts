import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertSpecialties1634741644266 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            // , 'now()', 'null', 'null'
            `INSERT INTO specialty(name) VALUES
            ('Alergologia'),
            ('Angiologia'),
            ('Buco maxilo'),
            ('Cardiologia clínica'),
            ('Cardiologia infantil'),
            ('Cirurgia cabeça e pescoço'),
            ('Cirurgia cardíaca'),
            ('Cirurgia de tórax')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM specialty WHERE 
            name='Alergologia' OR
            name='Angiologia' OR
            name='Buco maxilo' OR
            name='Cardiologia clínica' OR
            name='Cardiologia infantil' OR
            name='Cirurgia cabeça e pescoço' OR
            name='Cirurgia cardíaca' OR
            name='Cirurgia de tórax'`
        );
    }
}
