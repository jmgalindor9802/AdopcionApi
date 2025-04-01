import { Check, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Check('CK_ESTADO_ADMINISTRADOR', "ESTADO = 'Habilitado' OR ESTADO = 'Deshabilitado'")
@Entity({ name: 'ADMINISTRADOR' }) 
export class Administrador {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_ADMINISTRADOR',
    comment: 'Clave primaria de la tabla Administrador',
  })
  pk_administrador: number;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Nombre del Administrador',name:'NOMBRE' })
  nombre: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Apellido del Administrador',name:'APELLIDO' })
  apellido: string;

  @Column({ type: 'nvarchar', length: 100, nullable: false, comment: 'Correo del Administrador',name:'CORREO' })
  correo: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false, comment: 'Usuario de la cuenta Agol del Administrador',name:'USUARIO' })
  usuario: string;

  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: false,
    default: 'Deshabilitado', 
    comment: "Si el Estado es 'Habilitado' podrá acceder a todas las funcionalidades de un Administrador",
    name:'ESTADO'
    })
  estado: string;
}
