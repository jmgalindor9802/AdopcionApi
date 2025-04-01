import {
  Check,
  Column,
  Entity,
  Index,
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
import { Certificado } from '../../certificates/entities/certificado.entity';

@Check('CK_ALCANCE', "[ALCANCE] = 'Abierto' OR [ALCANCE] = 'Privado'")
@Check('CK_FECHA_INICIO_FIN', '[FECHA_FIN] >= [FECHA_INICIO]')
@Index('IXFK_GRUPO_CURSO', ['fk_curso'])
@Index('IXFK_GRUPO_INSTRUCTOR', ['fk_instructor'])
@Index('IXFK_GRUPO_SALON', ['fk_salon'])
@Entity({ name: 'GRUPO' })
export class Grupo {
  @PrimaryGeneratedColumn({ name: 'PK_GRUPO',primaryKeyConstraintName: 'PK_GRUPO' })
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

  @Column({ name: 'FK_INSTRUCTOR', type: 'int', nullable: true })
  fk_instructor: number;

  @Column({ name: 'FK_SALON', type: 'int', nullable: true })
  fk_salon: number;

  @Column({ name: 'FK_CURSO', type: 'int', nullable: false })
  fk_curso: number;

  @ManyToOne(() => Curso, (curso) => curso.grupos, { nullable:false })
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



}
