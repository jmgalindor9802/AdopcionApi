import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ESRI_ACADEMY' })
export class EsriAcademy {
  @PrimaryGeneratedColumn({ name: 'PK_CURSO_VIRTUAL' })
  pk_curso_virtual: number;

  @Column({ name: 'CUSTOMER_NUMBER', type: 'int', nullable: true })
  customer_number: number;

  @Column({ name: 'CUSTOMER_NAME', type: 'varchar', length: 350, nullable: true })
  customer_name: string;

  @Column({ name: 'SECTOR', type: 'varchar', length: 250, nullable: true })
  sector: string;

  @Column({ name: 'INDUSTRY', type: 'varchar', length: 250, nullable: true })
  industry: string;

  @Column({ name: 'USER_FULL_NAME', type: 'varchar', length: 300, nullable: true })
  user_full_name: string;

  @Column({ name: 'USER_PRIMARY_EMAIL_ADDRESS', type: 'varchar', length: 200, nullable: false })
  user_primary_email_address: string;

  @Column({ name: 'CITY', type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ name: 'STATE', type: 'varchar', length: 50, nullable: true })
  state: string;

  @Column({ name: 'COUNTRY_NAME', type: 'varchar', length: 100, nullable: true })
  country_name: string;

  @Column({ name: 'LEARNING_OBJECT_TYPE', type: 'varchar', length: 150, nullable: true })
  learning_object_type: string;

  @Column({ name: 'LEARNING_OBJECT_TITLE', type: 'varchar', length: 350, nullable: true })
  learning_object_title: string;

  @Column({ name: 'START_DATE', type: 'date', nullable: true })
  start_date: Date;

  @Column({ name: 'COMPLETION_DATE', type: 'date', nullable: true })
  completion_date: Date;
}
