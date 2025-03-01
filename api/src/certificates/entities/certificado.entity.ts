import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Estudiante } from '../../users/entities/estudiante.entity';
import { Grupo } from '../../classes/entities/grupo.entity';

@Entity({ name: 'CERTIFICADO' }) 
export class Certificado {
  @PrimaryGeneratedColumn({ name: 'PK_CERTIFICADO', comment: 'Clave primaria del Certificado' })
  pk_certificado: number;

  @Column({ type: 'date', nullable: false, comment: 'Fecha de expedición del certificado' })
  fecha: Date;

  @ManyToOne(() => Grupo, { nullable: false })
  @JoinColumn({
    name: 'FK_GRUPO',
    referencedColumnName: 'pk_grupo', 
    foreignKeyConstraintName: 'FK_CERTIFICADO_GRUPO',
  })
  grupo: Grupo;

  @ManyToOne(() => Estudiante, { nullable: false })
  @JoinColumn({
    name: 'FK_ESTUDIANTE',
    referencedColumnName: 'pk_estudiante', 
    foreignKeyConstraintName: 'FK_CERTIFICADO_ESTUDIANTE',
  })
  estudiante: Estudiante;
}