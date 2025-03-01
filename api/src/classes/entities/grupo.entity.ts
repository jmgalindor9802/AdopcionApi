import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Instructor } from '../../usuario/entities/instructor.entity';
import { Clase } from './clase.entity';
import { Curso } from './curso.entity';
import { Horario } from './horario.entity';
import { Salon } from './salon.entity';
import { Encuesta } from 'src/surveys/entities/encuesta.entity';
// import { Tipo_Grupo } from './tipo_grupo.entity';

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn()
  pk_grupo: number;
  @Column({ type: 'date' })
  fecha_inicio: Date;
  @Column({ type: 'date' })
  fecha_fin: Date;
  @Column({ type: 'nvarchar', length: 50, nullable: true })
  tipo: string;
  @Column({ type: 'nvarchar', length: 50, nullable: true })
  alcance: string;
  @Column({ type: 'bit', nullable: true })
  entrega_modificada: boolean;
  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  informe: string;

  @ManyToOne(() => Curso, (curso) => curso.grupos)
  @JoinColumn({
    name: 'fk_curso',
    referencedColumnName: 'pk_curso',
    foreignKeyConstraintName: 'fk_grupo_curso',
  })
  curso: Curso;

  @ManyToOne(() => Salon, (salon) => salon.grupos)
  @JoinColumn({
    name: 'fk_salon',
    referencedColumnName: 'pk_salon',
    foreignKeyConstraintName: 'fk_grupo_salon',
  })
  salon: Salon;

  @ManyToOne(() => Instructor, (instructor) => instructor.grupos)
  @JoinColumn({
    name: 'fk_instructor',
    referencedColumnName: 'pk_instructor',
    foreignKeyConstraintName: 'fk_grupo_instructor',
  })
  instructor: Instructor;

  @OneToMany(() => Horario, (horario) => horario.grupos)
  horario: Horario;

  @OneToMany(() => Clase, (clase) => clase.grupo)
  clases: Clase[];

  @OneToMany(() => Encuesta, (encuesta) => encuesta.grupo)
  encuestas: Encuesta[];

  // @ManyToOne(() => Tipo_Grupo, (tipoGrupo) => tipoGrupo.grupos)
  // @JoinColumn({
  //   name: 'fk_tipo_grupo',
  //   referencedColumnName: 'pk_tipo_grupo',
  //   foreignKeyConstraintName: 'fk_tipo_grupo',
  // })
  // tipo: Tipo_Grupo;
}
