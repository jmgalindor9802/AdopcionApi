import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Empresa } from './empresa.entity';

@Entity({ name: 'SECTOR' })
export class Sector {
  @PrimaryGeneratedColumn({ name: 'PK_SECTOR', comment: 'Clave primaria del Sector' })
  pk_sector: number;

  @Column({ name: 'NOMBRE', type: 'nvarchar', length: 100, nullable: false, comment: 'Nombre del Sector' })
  nombre: string;

  @OneToMany(() => Empresa, (empresa) => empresa.sector)
  empresas: Empresa[];
}
