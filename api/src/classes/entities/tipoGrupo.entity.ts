import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grupo } from './grupo.entity';

@Entity({ name: 'TIPO_GRUPO' })
export class TipoGrupo {
  @PrimaryGeneratedColumn({ name: 'PK_TIPO_GRUPO' })
  pk_tipo_grupo: number;

  @Column({ name: 'NOMBRE', type: 'nvarchar', length: 50, nullable: true })
  nombre: string;

  @OneToMany(() => Grupo, (grupo) => grupo.tipo_grupo)
  grupos: Grupo[];
}
