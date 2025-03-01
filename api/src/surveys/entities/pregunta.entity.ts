import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Check,
} from 'typeorm';
import { Encuesta } from './encuesta.entity';

@Entity({ name: 'PREGUNTA' })
@Check('CK_ESTADO_PREGUNTA', "ESTADO='Deshabilitado' OR ESTADO='Habilitado'")
export class Pregunta {
  @PrimaryGeneratedColumn({ name: 'PK_PREGUNTA', comment: 'Clave primaria de la Pregunta' })
  pk_pregunta: number;

  @Column({ name: 'PREGUNTA', type: 'nvarchar', length: 'MAX', nullable: false, comment: 'Texto de la Pregunta' })
  pregunta: string;

  @Column({ name: 'CATEGORIA', type: 'nvarchar', length: 50, nullable: false, comment: 'Categoría de la Pregunta' })
  categoria: string;

  @Column({ name: 'TIPO', type: 'nvarchar', length: 50, nullable: false, comment: 'Tipo de la Pregunta' })
  tipo: string;

  @Column({
    name: 'ESTADO',
    type: 'nvarchar',
    length: 50,
    nullable: false,
    comment: "Si el estado es 'Habilitado' la Pregunta se podrá mostrar en la Encuesta",
  })
  estado: string;

  @Column({ name: 'ORDEN', type: 'int', nullable: true, comment: 'Orden de la Pregunta' })
  orden: number;

  @OneToMany(() => Encuesta, (encuesta) => encuesta.pregunta)
  encuestas: Encuesta[];
}
