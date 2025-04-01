import {
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Grupo } from './grupo.entity';
@Index('IXFK_HORARIO_GRUPO', ['fk_grupo'])
@Check('CK_HORA_INICIO_FIN', 'HORA_FIN > HORA_INICIO')

@Entity({ name: 'HORARIO' })

export class Horario {
  @PrimaryGeneratedColumn({ name: 'PK_HORARIO', comment: 'Clave primaria de Horario',primaryKeyConstraintName: 'PK_HORARIO' })
  pk_horario: number;

  @Column({ name: 'FECHA', type: 'date', nullable: false, comment: 'Fecha del Horario' })
  fecha: Date;

  @Column({ name: 'HORA_INICIO', type: 'time', nullable: false, comment: 'Hora de Inicio' })
  hora_inicio: string;

  @Column({ name: 'HORA_FIN', type: 'time', nullable: false, comment: 'Hora de Finalización' })
  hora_fin: string;

  @Column({ name: 'FK_GRUPO', type: 'int', nullable: false })
  fk_grupo: number;
  
  @ManyToOne(() => Grupo, (grupo) => grupo.horarios,{nullable: false})
  @JoinColumn({
    name: 'FK_GRUPO',
   // referencedColumnName: 'PK_GRUPO',
    foreignKeyConstraintName: 'FK_HORARIO_GRUPO',
  })
  grupo: Grupo;
}
