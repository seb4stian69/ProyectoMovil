/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
/* Third party importations */
import { DetalleFactura } from './detalle-factura.entity';
import { Categoria } from './categoria.entity';
import { CarritoCompras } from './carritocompras.entity';
import { UserEntity } from './usuario.entity';


@Entity('Productos')
export class Producto {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'varchar', length: 45 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  descripcion: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'float', name: 'valor_compra' })
  valorCompra: number;

  @Column({ type: 'float', name: 'valor_venta' })
  valorVenta: number;

  @Column({ type: 'varchar', length: 45 })
  imagen: string;

  @Column({ type: 'varchar', length: 100, name: 'Categorias__id' })
  categoriasId: string;

  @Column({ type: 'varchar', length: 15, charset: 'big5', name: 'Usuarios__id' })
  usuariosId: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'], name: 'Usuarios_tipo_id' })
  usuariosTipoId: string;

  
  /* ---------------------------------------- Relacion con 'Categoria' ---------------------------------------- */

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'Categorias__id', referencedColumnName: '_id' })
  categoria: Categoria;

  /* ---------------------------------------- Relacion con 'DetalleFactura' ---------------------------------------- */

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.producto)
  detallesFactura: DetalleFactura[];

    /* ---------------------------------------- Relacion con 'CarritoCompras' ---------------------------------------- */

  @OneToMany(() => CarritoCompras, (carritoCompra) => carritoCompra.producto)
  carritoCompra: CarritoCompras[];

  /* ---------------------------------------- Relacion con 'Usuarios' ---------------------------------------- */

  @OneToOne(() => UserEntity, (usuario) => usuario.producto, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Usuarios__id', referencedColumnName: '_id' },
    { name: 'Usuarios_tipo_id', referencedColumnName: 'tipo_id' },
  ])
  usuario: UserEntity;

}
