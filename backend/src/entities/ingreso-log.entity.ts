/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';
/* Third party importations */
import { UserEntity } from './usuario.entity';


@Entity('IngresosLogs')
export class IngresoLog {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'varchar', length: 100, name: 'log' })
  log: string;

  @Column({ type: 'datetime', name: 'fecha' })
  fecha: Date;

  @Column({ type: 'varchar', length: 15, charset: 'big5', name: 'Usuarios__id' })
  usuariosId: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'], name: 'Usuarios_tipo_id' })
  usuariosTipoId: string;

  /* ---------------------------------------- Relacion con 'Usuarios' ---------------------------------------- */

  @OneToOne(() => UserEntity, (usuario) => usuario.ingresosLogs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Usuarios__id', referencedColumnName: '_id' },
    { name: 'Usuarios_tipo_id', referencedColumnName: 'tipo_id' },
  ])
  usuario: UserEntity;

}
