import { Check, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grupo } from '../../classes/entities/grupo.entity';

@Entity({ name: 'INSTRUCTOR' })
@Check('CK_DOC_IDENTIDAD_INSTRUCTOR', "[DOC_IDENTIDAD]='0' OR ISNUMERIC([DOC_IDENTIDAD])=1 AND LEN([DOC_IDENTIDAD])>=6 AND LEN([DOC_IDENTIDAD])<=12")
@Check('CK_ESTADO_INSTRUCTOR', "[ESTADO]='Deshabilitado' OR [ESTADO]='Habilitado'")
@Check('CK_NUM_CONTACTO_INSTRUCTOR', "[NUM_CONTACTO] IS NULL OR LEN([NUM_CONTACTO])>=7")
@Check('CK_TITULO', "[TITULO] IS NULL OR [TITULO] IN ('Ing.', 'Esp.', 'Lic.', 'MSc.', 'PhD.', 'Dr.', 'Arq.')")
@Index('IXAK_DOC_IDENTIDAD_INSTRUCTOR', ['doc_identidad'],{unique:true})
export class Instructor {
  @PrimaryGeneratedColumn({ name: 'PK_INSTRUCTOR', comment: 'Clave primaria del Instructor', primaryKeyConstraintName: 'PK_INSTRUCTOR' })
  pk_instructor: number;

  @Column({ name: 'DOC_IDENTIDAD', type: 'nvarchar', length: 20, unique: false, nullable: false, comment: 'Documento de identidad del Instructor' })
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
