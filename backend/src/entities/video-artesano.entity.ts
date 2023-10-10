/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
/* Third party importations */
import { UserEntity } from './usuario.entity';


@Entity('VideosArtesanos')
export class VideoArtesano {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'varchar', length: 45, name: 'url_video' })
  urlVideo: string;

  @Column({ type: 'varchar', length: 45, name: 'titulo' })
  titulo: string;

  @Column({ type: 'date', name: 'fecha' })
  fecha: Date;

  @Column({ type: 'varchar', length: 100, name: 'descripcion' })
  descripcion: string;

  @Column({ type: 'varchar', length: 15, charset: 'big5', name: 'Usuarios__id' })
  usuariosId: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'], name: 'Usuarios_tipo_id' })
  usuariosTipoId: string;

  /* ---------------------------------------- Relacion con 'Usuarios' ---------------------------------------- */

  @ManyToOne(() => UserEntity, (usuario) => usuario.videosArtesanos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Usuarios__id', referencedColumnName: '_id' },
    { name: 'Usuarios_tipo_id', referencedColumnName: 'tipo_id' },
  ])
  usuario: UserEntity;

}
