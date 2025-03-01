import {
  Entity,
  Check,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Grupo } from '../../classes/entities/grupo.entity';
import { Ubicacion } from './ubicacion.entity';

@Entity({ name: 'SALON' })
@Check('CK_ESTADO_SALON', `ESTADO = 'Deshabilitado' OR ESTADO = 'Habilitado'`)
@Check('CK_CAPACIDAD', 'CAPACIDAD > 0')
export class Salon {
  @PrimaryGeneratedColumn({ name: 'PK_SALON', comment: 'Clave primaria del Salón' })
  pk_salon: number;

  @Column({ name: 'NOMBRE', type: 'nvarchar', length: 100, nullable: false, comment: 'Nombre del Salón' })
  nombre: string;

  @Column({ name: 'LUGAR', type: 'nvarchar', length: 80, nullable: false, comment: 'Lugar del Salón' })
  lugar: string;

  @Column({ name: 'DIRECCION', type: 'nvarchar', length: 100, nullable: true, comment: 'Dirección del Salón' })
  direccion: string;

  @Column({
    name: 'ESTADO',
    type: 'nvarchar',
    length: 50,
    nullable: false,
    comment: "Si el estado es 'Habilitado' el Salón se podrá asignar a un Grupo",
  })
  estado: string;

  @Column({ name: 'CAPACIDAD', type: 'int', nullable: false, comment: 'Capacidad del Salón' })
  capacidad: number;

  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.salones)
  @JoinColumn({
    name: 'FK_UBICACION',
    referencedColumnName: 'pk_ubicacion',
    foreignKeyConstraintName: 'FK_SALON_UBICACION',
  })
  ubicacion: Ubicacion;

  @OneToMany(() => Grupo, (grupo) => grupo.salon)
  grupos: Grupo[];
}
