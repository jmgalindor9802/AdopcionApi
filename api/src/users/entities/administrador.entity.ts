import { Check, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'ADMINISTRADOR' }) 
export class Administrador {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_ADMINISTRADOR',
    comment: 'Clave primaria de la tabla Administrador',
  })
  pk_administrador: number;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Nombre del Administrador' })
  nombre: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Apellido del Administrador' })
  apellido: string;

  @Column({ type: 'nvarchar', length: 100, nullable: false, comment: 'Correo del Administrador' })
  correo: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Usuario de la cuenta Agol del Administrador' })
  usuario: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: false,
    default: 'Deshabilitado', 
    comment: "Si el Estado es 'Habilitado' podrá acceder a todas las funcionalidades de un Administrador",
  })
  @Check('CHK_ESTADO_ADMINISTRADOR', "estado='Habilitado' OR estado='Deshabilitado'")
  estado: string;
}
