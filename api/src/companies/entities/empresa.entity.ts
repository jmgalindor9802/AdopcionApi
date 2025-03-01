import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Clase } from '../../classes/entities/clase.entity';
import { Sector } from './sector.entity';
import { Pais } from '../../places/entities/pais.entity';

@Entity({ name: 'EMPRESA' })
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'PK_EMPRESA', comment: 'Clave primaria de la Empresa' })
  pk_empresa: number;

  @Column({ name: 'NOMBRE', type: 'nvarchar', length: 200, comment: 'Nombre de la Empresa' })
  nombre: string;

  @Column({ name: 'NIT', type: 'nvarchar', length: 25, nullable: true, comment: 'NIT de la Empresa' })
  nit: string;

  @Column({
    name: 'CUSTOMER_NUMBER',
    type: 'int',
    comment: 'Número del cliente proveniente de la tabla Esri_Academy',
  })
  customer_number: number;

  @ManyToOne(() => Sector, (sector) => sector.empresas)
  @JoinColumn({
    name: 'FK_SECTOR',
    referencedColumnName: 'PK_SECTOR',
    foreignKeyConstraintName: 'FK_EMPRESA_SECTOR',
  })
  sector: Sector;

  @ManyToOne(() => Pais, (pais) => pais.empresas)
  @JoinColumn({
    name: 'FK_PAIS',
    referencedColumnName: 'PK_PAIS',
    foreignKeyConstraintName: 'FK_EMPRESA_PAIS',
  })
  pais: Pais;

  @OneToMany(() => Clase, (clase) => clase.empresa)
  clases: Clase[];
}
