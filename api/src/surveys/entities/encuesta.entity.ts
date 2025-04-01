import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Estudiante } from '../../users/entities/estudiante.entity';
import { Grupo } from '../../classes/entities/grupo.entity';
import { Pregunta } from './pregunta.entity';
import { Clase } from '../../classes/entities/clase.entity';

@Entity({ name: 'ENCUESTA' })
export class Encuesta {
  @PrimaryGeneratedColumn({ name: 'PK_ENCUESTA',primaryKeyConstraintName: 'PK_ENCUESTA' })
  pk_encuesta: number;

  @Column({ name: 'RESPUESTA', type: 'nvarchar', length: 'MAX', nullable: false })
  respuesta: string;

  @Column({ name: 'FECHA', type: 'date', nullable: false })
  fecha: Date;

  @Column({ name: 'FK_ESTUDIANTE', type: 'int', nullable: false })
  fk_estudiante: number;

  @Column({ name: 'FK_GRUPO', type: 'int', nullable: false })
  fk_grupo: number;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.encuestas, { nullable: false })
  @JoinColumn({
    name: 'FK_PREGUNTA',
    //referencedColumnName: 'PK_PREGUNTA',
    foreignKeyConstraintName: 'FK_ENCUESTA_PREGUNTA',
  })
  pregunta: Pregunta;

  @ManyToOne(() => Clase, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', })
  @JoinColumn([
    { name: 'FK_ESTUDIANTE', referencedColumnName: 'pfk_estudiante',foreignKeyConstraintName: 'FK_ENCUESTA_CLASE', },
    { name: 'FK_GRUPO', referencedColumnName: 'pfk_grupo', },
  ])
  clase: Clase;

}
