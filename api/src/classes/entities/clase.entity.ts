import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Estudiante } from '../../users/entities/estudiante.entity';
import { Empresa } from '../../companies/entities/empresa.entity';
import { Grupo } from './grupo.entity';
import { Pais } from '../../places/entities/pais.entity';

@Entity({ name: 'CLASE' })
export class Clase {
  @PrimaryColumn({ name: 'PFK_ESTUDIANTE' })
  pfk_estudiante: number;

  @PrimaryColumn({ name: 'PFK_GRUPO' })
  pfk_grupo: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.clases)
  @JoinColumn({
    name: 'PFK_ESTUDIANTE',
    foreignKeyConstraintName: 'FK_CLASE_ESTUDIANTE',
  })
  estudiante: Estudiante;

  @ManyToOne(() => Grupo, (grupo) => grupo.clases)
  @JoinColumn({
    name: 'PFK_GRUPO',
    foreignKeyConstraintName: 'FK_CLASE_GRUPO',
  })
  grupo: Grupo;

  @Column({ name: 'ESTADO_ENCUESTA', type: 'nvarchar', length: 50, nullable: false })
  estado_encuesta: string;

  @Column({ name: 'ESTADO_MATERIAL', type: 'nvarchar', length: 50, nullable: false })
  estado_material: string;

  @Column({ name: 'ESTADO_CERTIFICADO', type: 'nvarchar', length: 50, nullable: false })
  estado_certificado: string;

  @Column({ name: 'ORDEN_VENTA', type: 'nvarchar', length: 50, nullable: true })
  orden_venta: string;

  @Column({ name: 'CALIFICACION', type: 'numeric', precision: 5, scale: 2, nullable: true })
  calificacion: number;

  @Column({ name: 'FECHA', type: 'date', nullable: true })
  fecha: Date;

  @ManyToOne(() => Empresa, (empresa) => empresa.clases)
  @JoinColumn({
    name: 'FK_EMPRESA',
    foreignKeyConstraintName: 'FK_CLASE_EMPRESA',
  })
  empresa: Empresa;

  @ManyToOne(() => Pais, (pais) => pais.clases)
  @JoinColumn({
    name: 'FK_PAIS_ORDEN_VENTA',
    foreignKeyConstraintName: 'FK_CLASE_PAIS',
  })
  pais_orden_venta: Pais;
}
