import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Instructor } from '../../users/entities/instructor.entity';
import { Clase } from './clase.entity';
import { Curso } from './curso.entity';
import { Horario } from './horario.entity';
import { Salon } from '../../places/entities/salon.entity';
import { Encuesta } from '../../surveys/entities/encuesta.entity';
import { TipoGrupo } from './tipoGrupo.entity';

@Entity({ name: 'GRUPO' })
export class Grupo {
  @PrimaryGeneratedColumn({ name: 'PK_GRUPO' })
  pk_grupo: number;

  @Column({ name: 'FECHA_INICIO', type: 'date', nullable: false })
  fecha_inicio: Date;

  @Column({ name: 'FECHA_FIN', type: 'date', nullable: false })
  fecha_fin: Date;

  @Column({ name: 'ALCANCE', type: 'nvarchar', length: 50, nullable: true })
  alcance: string;

  @Column({ name: 'ENTREGA_MODIFICADA', type: 'bit', nullable: true })
  entrega_modificada: boolean;

  @Column({ name: 'INFORME', type: 'nvarchar', length: 'MAX', nullable: true })
  informe: string;

  @ManyToOne(() => Curso, (curso) => curso.grupos)
  @JoinColumn({
    name: 'FK_CURSO',
    foreignKeyConstraintName: 'FK_GRUPO_CURSO',
  })
  curso: Curso;

  @ManyToOne(() => Salon, (salon) => salon.grupos)
  @JoinColumn({
    name: 'FK_SALON',
    foreignKeyConstraintName: 'FK_GRUPO_SALON',
  })
  salon: Salon;

  @ManyToOne(() => Instructor, (instructor) => instructor.grupos)
  @JoinColumn({
    name: 'FK_INSTRUCTOR',
    foreignKeyConstraintName: 'FK_GRUPO_INSTRUCTOR',
  })
  instructor: Instructor;

  @ManyToOne(() => TipoGrupo, (tipoGrupo) => tipoGrupo.grupos)
  @JoinColumn({
    name: 'FK_TIPO_GRUPO',
    foreignKeyConstraintName: 'FK_GRUPO_TIPO_GRUPO',
  })
  tipo_grupo: TipoGrupo;

  @OneToMany(() => Horario, (horario) => horario.grupo)
  horarios: Horario[];

  @OneToMany(() => Clase, (clase) => clase.grupo)
  clases: Clase[];

  @OneToMany(() => Encuesta, (encuesta) => encuesta.grupo)
  encuestas: Encuesta[];
}
