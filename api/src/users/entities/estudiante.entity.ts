import { 
  Check, 
  Column, 
  Entity, 
  Index, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from 'typeorm';
import { Clase } from '../../classes/entities/clase.entity';
import { Pais } from '../../places/entities/pais.entity';
import { Encuesta } from './../../surveys/entities/encuesta.entity';

@Entity({ name: 'ESTUDIANTE' }) 
export class Estudiante {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'PK_ESTUDIANTE',
    comment: 'Clave primaria del Estudiante',
  })
  pk_estudiante: number;

  @Column({ type: 'nvarchar', length: 20, nullable: false, comment: 'Documento de identificación del Estudiante' })
  @Check('CK_DOC_IDENTIDAD_ESTUDIANTE', "DOC_IDENTIDAD='0' OR (ISNUMERIC(DOC_IDENTIDAD)=1 AND LEN(DOC_IDENTIDAD)>=6 AND LEN(DOC_IDENTIDAD)<=12)")
  @Index('IX_DOC_IDENTIDAD_ESTUDIANTE', { unique: false }) 
  doc_identidad: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Nombre del Estudiante' })
  nombre: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Apellido del Estudiante' })
  apellido: string;

  @Column({ type: 'nvarchar', length: 100, nullable: false, comment: 'Correo del Estudiante' })
  correo: string;

  @Column({ type: 'nvarchar', length: 60, nullable: false, comment: 'Usuario del Estudiante' })
  usuario: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Número de contacto del Estudiante' })
  @Check('CK_NUM_CONTACTO_ESTUDIANTE', "NUM_CONTACTO='0' OR LEN(NUM_CONTACTO)>=7")
  num_contacto: string;

  @Column({ type: 'bit', nullable: false, default: () => '1', comment: 'Estado de registro del estudiante' })
  registrado: boolean;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Tipo de documento del Estudiante' })
  tipo_doc: string;

  @ManyToOne(() => Pais, (pais) => pais.estudiantes, { nullable: false })
  @Column({ type: 'int', nullable: false, comment: 'Clave foránea a la tabla PAIS', name: 'FK_PAIS' })
  fk_pais: number;

  @OneToMany(() => Clase, (clase) => clase.estudiante)
  clases: Clase[];

  @OneToMany(() => Encuesta, (encuesta) => encuesta.estudiante)
  encuestas: Encuesta[];
}
