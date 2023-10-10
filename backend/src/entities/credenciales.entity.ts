/* First party importations */
/* Second party importations */
import { Entity, Column, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
/* Third party importations */
import { UserEntity } from './usuario.entity';


@Entity('Credenciales')
export class Credenciales {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'varchar', length: 45, name: 'usuario' })
  usuario: string;

  @Column({ type: 'varchar', length: 45, name: 'contrasena' })
  contrasena: string;

  @Column({ type: 'varchar', length: 15, charset: 'big5', name: 'Usuarios__id' })
  usuariosId: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'], name: 'Usuarios_tipo_id' })
  usuariosTipoId: string;

  /* ---------------------------------------- Relacion con 'Usuarios' ---------------------------------------- */

  @OneToOne(() => UserEntity, (usuario) => usuario.credencial, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Usuarios__id', referencedColumnName: '_id' },
    { name: 'Usuarios_tipo_id', referencedColumnName: 'tipo_id' },
  ])
  usuarioR: UserEntity;

}
