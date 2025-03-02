import { Clase } from './../../classes/entities/clase.entity';
import { Empresa } from './../../companies/entities/empresa.entity';
import { Estudiante } from './../../users/entities/estudiante.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ubicacion } from './ubicacion.entity';

@Entity('PAIS')
export class Pais {
  @PrimaryGeneratedColumn({ name: 'PK_PAIS', primaryKeyConstraintName: 'PK_PAIS', comment: 'Clave primaria de la tabla País' })
  pk_pais: number;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Nombre del país' })
  nombre: string;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.fk_pais)
  estudiantes: Estudiante[];
  
  @OneToMany(() => Clase, (clase) => clase.pais_orden_venta)
  clases: Clase[];

  @OneToMany(() => Empresa, (empresa) => empresa.pais)
  empresas: Empresa[];

  @OneToMany(() => Ubicacion, (ubicacion) => ubicacion.pais)
  ubicaciones: Ubicacion[];
}
