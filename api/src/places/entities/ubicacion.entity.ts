import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Salon } from './salon.entity';
import { Pais } from './pais.entity';

@Entity({ name: 'UBICACION' })
export class Ubicacion {
  @PrimaryGeneratedColumn({ name: 'PK_UBICACION', comment: 'Clave primaria de la Ubicación' })
  pk_ubicacion: number;

  @Column({ name: 'NOMBRE', type: 'nvarchar', length: 50, nullable: false, comment: 'Nombre de la Ubicación' })
  nombre: string;

  @ManyToOne(() => Pais, (pais) => pais.ubicaciones, { nullable: true })
  @JoinColumn({
    name: 'FK_PAIS',
    //referencedColumnName: 'PK_PAIS',
    foreignKeyConstraintName: 'FK_UBICACION_PAIS',
  })
  pais: Pais;

  @OneToMany(() => Salon, (salon) => salon.ubicacion)
  salones: Salon[];
}
