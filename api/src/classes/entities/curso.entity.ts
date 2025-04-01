import { Check, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grupo } from './grupo.entity';
@Index('IXAK_SIGLA',['sigla'],{ unique: true })
@Check('CK_ESTADO_CURSO', "[ESTADO] = 'Deshabilitado' OR [ESTADO] = 'Habilitado'")
@Check('CK_ESTADO_MATERIAL_CURSO', "[ESTADO_MATERIAL] = 'Deshabilitado' OR [ESTADO_MATERIAL] = 'Habilitado'")
@Check('CK_IDIOMA', "[IDIOMA] = 'Inglés' OR [IDIOMA] = 'Español'")
@Check('CK_INTENSIDAD', '[INTENSIDAD] > 0')
@Check(
  'CK_ORGANIZACION',
  "[ORGANIZACION]='Esri Colombia' OR [ORGANIZACION]='Esri Panamá' OR [ORGANIZACION]='Esri Ecuador' OR [ORGANIZACION]='Esri Chile' OR [ORGANIZACION]='Esri Inc'"
)
@Entity({ name: 'CURSO' })
export class Curso {
  @PrimaryGeneratedColumn({ name: 'PK_CURSO',primaryKeyConstraintName: 'PK_CURSO' })
  pk_curso: number;

  @Column({ name: 'SIGLA', type: 'nvarchar', length: 50, nullable: false })
  sigla: string;

  @Column({ name: 'NOMBRE', type: 'nvarchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'INTENSIDAD', type: 'int', nullable: false })
  intensidad: number;

  @Column({ name: 'ESTADO', type: 'nvarchar', length: 50, nullable: false })
  estado: string;

  @Column({ name: 'ESTADO_MATERIAL', type: 'nvarchar', length: 50, nullable: false })
  estado_material: string;

  @Column({ name: 'FECHA_LANZAMIENTO', type: 'date', nullable: true })
  fecha_lanzamiento: Date;

  @Column({ name: 'TIPO', type: 'nvarchar', length: 50, nullable: true })
  tipo: string;

  @Column({ name: 'IDIOMA', type: 'nvarchar', length: 50, nullable: true })
  idioma: string;

  @Column({ name: 'ORGANIZACION', type: 'nvarchar', length: 50, nullable: true })
  organizacion: string;

  @Column({ name: 'ACRONIMO', type: 'nvarchar', length: 50, nullable: true })
  acronimo: string;

  @Column({ name: 'VER_MATERIAL', type: 'nvarchar', length: 50, nullable: true })
  ver_material: string;

  @Column({ name: 'VER_PLATAFORMA', type: 'nvarchar', length: 50, nullable: true })
  ver_plataforma: string;

  @Column({ name: 'CATEGORIA', type: 'nvarchar', length: 100, nullable: true })
  categoria: string;

  @OneToMany(() => Grupo, (grupo) => grupo.curso)
  grupos: Grupo[];
}
