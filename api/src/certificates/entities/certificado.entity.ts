import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Estudiante } from '../../users/entities/estudiante.entity';
import { Grupo } from '../../classes/entities/grupo.entity';
import { Clase } from '../../classes/entities/clase.entity';

@Index('IXFK_CERTIFICADO_CLASE', ['fk_grupo', 'fk_estudiante'])
@Entity({ name: 'CERTIFICADO' }) 
export class Certificado {
  @PrimaryGeneratedColumn({ name: 'PK_CERTIFICADO', comment: 'Clave primaria del Certificado',  primaryKeyConstraintName: 'PK_CERTIFICADO' })
  pk_certificado: number;

  @Column({ name: 'FK_ESTUDIANTE', type: 'int', nullable: false })
  fk_estudiante: number;
  
  @Column({ name: 'FK_GRUPO', type: 'int', nullable: false })
  fk_grupo: number;
  
  @ManyToOne(() => Clase, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([
    {
      name: 'FK_GRUPO',
      referencedColumnName: 'pfk_grupo',
      foreignKeyConstraintName: 'FK_ENCUESTA_CLASE',
    },
    {
      name: 'FK_ESTUDIANTE',
      referencedColumnName: 'pfk_estudiante',
    }
  ])  
  clase: Clase;
  
  
  @Column({ name:'FECHA',type: 'date', nullable: false, comment: 'Fecha de expedición del certificado' })
  fecha: Date;
  
  
  
}