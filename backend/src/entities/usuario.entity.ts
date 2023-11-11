/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, OneToMany, OneToOne } from 'typeorm';
/* Third party importations */
import { Role } from './role.entity';
import { Factura } from './factura.entity';
import { VideoArtesano } from './video-artesano.entity';
import { IngresoLog } from './ingreso-log.entity';
import { Credenciales } from './credenciales.entity';
import { CarritoCompras } from './carritocompras.entity';

@Entity('Usuarios')
export class UserEntity {
  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ length: 15 })
  _id: string;

  @PrimaryColumn({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'] })
  tipo_id: string;

  @Column({ length: 45 })
  primer_nombre: string;

  @Column({ length: 45, nullable: true })
  segundo_nombre: string;

  @Column({ length: 45 })
  primer_apellido: string;

  @Column({ length: 45, nullable: true })
  segundo_apellido: string;

  @Column({ length: 45 })
  fecha_nacimiento: string;

  @Column({ length: 45 })
  telefono: string;

  @Column({ length: 45 })
  direccion: string;

  @Column({ length: 100 })
  correo: string;

  /* ---------------------------------------- Relacion con 'roles' ---------------------------------------- */

  @OneToOne(() => Role, (rol) => rol.usuario)
  roles: Role;

  /* ---------------------------------------- Relacion con 'facturas' ---------------------------------------- */

  @OneToMany(() => Factura, (factura) => factura.usuario)
  factura: Factura;

  /* ---------------------------------------- Relacion con 'videosArtesano' ---------------------------------------- */

  @OneToMany(() => VideoArtesano, (videoArtesano) => videoArtesano.usuario)
  videosArtesanos: VideoArtesano[];

  /* ---------------------------------------- Relacion con 'ingresosLogs' ---------------------------------------- */

  @OneToOne(() => IngresoLog, (ingresoLog) => ingresoLog.usuario)
  ingresosLogs: IngresoLog;

  /* ---------------------------------------- Relacion con 'credenciales' ---------------------------------------- */

  @OneToOne(() => Credenciales, (credencial) => credencial.usuarioR)
  credencial: Credenciales;

  /* ---------------------------------------- Relacion con 'CarritoCompras' ---------------------------------------- */

  @OneToMany(() => CarritoCompras, (carritoCompras) => carritoCompras.usuario)
  carritoCompras: CarritoCompras;

}
