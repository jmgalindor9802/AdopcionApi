import { Check, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Estudiante } from '../../users/entities/estudiante.entity';
import { Empresa } from '../../companies/entities/empresa.entity';
import { Grupo } from './grupo.entity';
import { Pais } from '../../places/entities/pais.entity';
@Index('IXFK_CLASE_EMPRESA', ['fk_empresa'])
@Index('IXFK_CLASE_ESTUDIANTE',['pfk_estudiante'])
@Index('IXFK_CLASE_GRUPO',['pfk_grupo'])
@Check('CK_CALIFICACION', '[CALIFICACION] >= 0 AND [CALIFICACION] <= 100')
@Check('CK_ESTADO_CERTIFICADO', "[ESTADO_CERTIFICADO] = 'Deshabilitado' OR [ESTADO_CERTIFICADO] = 'Habilitado'")
@Check('CK_ESTADO_ENCUESTA', "[ESTADO_ENCUESTA] = 'Deshabilitado' OR [ESTADO_ENCUESTA] = 'Habilitado'")
@Check('CK_ESTADO_MATERIAL', "[ESTADO_MATERIAL] = 'Deshabilitado' OR [ESTADO_MATERIAL] = 'Habilitado'")
@Entity({ name: 'CLASE' })
export class Clase {
  @PrimaryColumn({
    name: 'PFK_GRUPO',
    primaryKeyConstraintName: 'PK_CLASE',
  })
  pfk_grupo: number;

  @PrimaryColumn({
    name: 'PFK_ESTUDIANTE',
    primaryKeyConstraintName: 'PK_CLASE',
  })
  pfk_estudiante: number;
  
  @Column({ name: 'FK_EMPRESA', type: 'int', nullable: true })
  fk_empresa: number;

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
}
