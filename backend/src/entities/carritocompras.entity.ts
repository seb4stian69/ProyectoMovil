/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
/* Third party importations */
import { UserEntity } from './usuario.entity';
import { Producto } from './producto.entity';


@Entity('CarritoCompras')
export class CarritoCompras {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'int' })
  _id: string;

  @Column({ type: 'varchar', length: 15, charset: 'big5', name: 'Usuarios__id' })
  usuariosId: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'], name: 'Usuarios_tipo_id' })
  usuariosTipoId: string;

  @Column({ type: 'varchar', length: 15, charset: 'big5', name: 'Productos__id' })
  productoId: string;

  @Column({ type: 'int', name: 'cantidad' })
  cantidad: string;

  /* ---------------------------------------- Relacion con 'Usuarios' ---------------------------------------- */

  @ManyToOne(() => UserEntity, (usuario) => usuario.carritoCompras, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Usuarios__id', referencedColumnName: '_id' },
    { name: 'Usuarios_tipo_id', referencedColumnName: 'tipo_id' },
  ])
  usuario: UserEntity;

  /* ---------------------------------------- Relacion con 'Producto' ---------------------------------------- */

  @ManyToOne(() => Producto, (producto) => producto.carritoCompra, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Productos__id', referencedColumnName: '_id' },
  ])
  producto: Producto;

}
