/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, Index } from 'typeorm';
/* Third party importations */
import { UserEntity } from './usuario.entity';


@Entity('Roles')
export class Role {
  
  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'enum', enum: ['Cliente', 'Artesano', 'Admin'] })
  tipo: string;

  @Column({ type: 'varchar', length: 15, charset: 'big5' })
  Usuarios__id: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'] })
  Usuarios_tipo_id: string;

  /* ---------------------------------------- Relacion con 'Usuarios' ---------------------------------------- */

  @OneToOne(() => UserEntity, (usuario) => usuario.roles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Usuarios__id', referencedColumnName: '_id' },
    { name: 'Usuarios_tipo_id', referencedColumnName: 'tipo_id' },
  ])
  usuario: UserEntity;
  
}
