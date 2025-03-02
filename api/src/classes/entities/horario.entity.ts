import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Grupo } from './grupo.entity';

@Entity({ name: 'HORARIO' })
@Check('CK_HORA_INICIO_FIN', 'HORA_FIN > HORA_INICIO')
export class Horario {
  @PrimaryGeneratedColumn({ name: 'PK_HORARIO', comment: 'Clave primaria de Horario' })
  pk_horario: number;

  @Column({ name: 'FECHA', type: 'date', nullable: false, comment: 'Fecha del Horario' })
  fecha: Date;

  @Column({ name: 'HORA_INICIO', type: 'time', nullable: false, comment: 'Hora de Inicio' })
  hora_inicio: string;

  @Column({ name: 'HORA_FIN', type: 'time', nullable: false, comment: 'Hora de Finalización' })
  hora_fin: string;

  @ManyToOne(() => Grupo, (grupo) => grupo.horarios)
  @JoinColumn({
    name: 'FK_GRUPO',
   // referencedColumnName: 'PK_GRUPO',
    foreignKeyConstraintName: 'FK_HORARIO_GRUPO',
  })
  grupo: Grupo;
}
