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

@Entity({ name: 'ENCUESTA' })
export class Encuesta {
  @PrimaryGeneratedColumn({ name: 'PK_ENCUESTA' })
  pk_encuesta: number;

  @Column({ name: 'RESPUESTA', type: 'nvarchar', length: 'MAX', nullable: false })
  respuesta: string;

  @Column({ name: 'FECHA', type: 'date', nullable: false })
  fecha: Date;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.encuestas)
  @JoinColumn({
    name: 'FK_PREGUNTA',
    referencedColumnName: 'pk_pregunta',
    foreignKeyConstraintName: 'FK_ENCUESTA_PREGUNTA',
  })
  pregunta: Pregunta;

  @ManyToOne(() => Grupo, (grupo) => grupo.encuestas)
  @JoinColumn({
    name: 'FK_GRUPO',
    referencedColumnName: 'pk_grupo',
    foreignKeyConstraintName: 'FK_ENCUESTA_CLASE',
  })
  grupo: Grupo;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.encuestas)
  @JoinColumn({
    name: 'FK_ESTUDIANTE',
    referencedColumnName: 'pk_estudiante',
    foreignKeyConstraintName: 'FK_ENCUESTA_CLASE',
  })
  estudiante: Estudiante;
}
