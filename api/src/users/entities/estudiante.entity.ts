import { 
  Check, 
  Column, 
  Entity, 
  Index, 
  JoinColumn, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from 'typeorm';
import { Clase } from '../../classes/entities/clase.entity';
import { Pais } from '../../places/entities/pais.entity';
import { Encuesta } from './../../surveys/entities/encuesta.entity';
import { Certificado } from './../../certificates/entities/certificado.entity';

@Entity({ name: 'ESTUDIANTE' }) 
export class Estudiante {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'PK_ESTUDIANTE',
    comment: 'Clave primaria del Estudiante',
    name: 'PK_ESTUDIANTE',
  })
  pk_estudiante: number;

  @Column({ type: 'nvarchar', length: 20, nullable: false, comment: 'Documento de identificación del Estudiante', name:'DOC_IDENTIDAD' })
  @Check('CK_DOC_IDENTIDAD_ESTUDIANTE', "[DOC_IDENTIDAD]='0' OR len([DOC_IDENTIDAD])>=(6) AND len([DOC_IDENTIDAD])<=(15)")
  @Index('IX_DOC_IDENTIDAD_ESTUDIANTE', { unique: false }) 
  doc_identidad: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Nombre del Estudiante', name:'NOMBRE' })
  nombre: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Apellido del Estudiante', name:'APELLIDO' })
  apellido: string;

  @Column({ type: 'nvarchar', length: 100, nullable: false, comment: 'Correo del Estudiante',name:'CORREO' })
  correo: string;

  @Column({ type: 'nvarchar', length: 60, nullable: false, comment: 'Usuario del Estudiante',name:'USUARIO' })
  usuario: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true, comment: 'Número de contacto del Estudiante',name:'NUM_CONTACTO' })
  @Check('CK_NUM_CONTACTO_ESTUDIANTE', "[NUM_CONTACTO] IS NULL OR len([NUM_CONTACTO])>=(7)")
  num_contacto: string;

  @Column({ type: 'bit', nullable: false, default: () => '1', comment: 'Estado de registro del estudiante',name:'REGISTRADO' })
  registrado: boolean;

  @Column({ type: 'nvarchar', length: 50, nullable:true, comment: 'Tipo de documento del Estudiante', name:'TIPO_DOC' })
  tipo_doc: string;

  @ManyToOne(() => Pais, (pais) => pais.estudiantes, { nullable: true })
  @JoinColumn({ name: 'FK_PAIS', foreignKeyConstraintName: 'FK_ESTUDIANTE_PAIS', }) 
  pais: Pais;
  
  @Column({ type: 'int', nullable: true, comment: 'Clave foránea a la tabla PAIS', name: 'FK_PAIS',primaryKeyConstraintName: 'PK_ESTUDIANTE' })
  fk_pais: number;
  

  @OneToMany(() => Clase, (clase) => clase.estudiante)
  clases: Clase[];


}
