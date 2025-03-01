import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grupo } from '../../classes/entities/grupo.entity';

@Entity({ name: 'INSTRUCTOR' })
export class Instructor {
  @PrimaryGeneratedColumn({ name: 'PK_INSTRUCTOR', comment: 'Clave primaria del Instructor' })
  pk_instructor: number;

  @Column({ name: 'DOC_IDENTIDAD', type: 'nvarchar', length: 20, unique: true, nullable: false, comment: 'Documento de identidad del Instructor' })
  doc_identidad: string;

  @Column({ name: 'NOMBRE', type: 'nvarchar', length: 50, nullable: false, comment: 'Nombre del Instructor' })
  nombre: string;

  @Column({ name: 'APELLIDO', type: 'nvarchar', length: 50, nullable: false, comment: 'Apellido del Instructor' })
  apellido: string;

  @Column({ name: 'CORREO', type: 'nvarchar', length: 100, nullable: false, comment: 'Correo electrónico del Instructor' })
  correo: string;

  @Column({ name: 'USUARIO', type: 'nvarchar', length: 60, nullable: false, comment: 'Nombre de usuario del Instructor' })
  usuario: string;

  @Column({ name: 'ESTADO', type: 'nvarchar', length: 50, nullable: false, comment: 'Estado del Instructor' })
  estado: string;

  @Column({ name: 'TITULO', type: 'nvarchar', length: 50, nullable: true, comment: 'Título académico del Instructor' })
  titulo: string;

  @Column({ name: 'NUM_CONTACTO', type: 'nvarchar', length: 50, nullable: true, comment: 'Número de contacto del Instructor' })
  num_contacto: string;

  @OneToMany(() => Grupo, (grupo) => grupo.instructor)
  grupos: Grupo[];
}
