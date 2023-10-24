/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
/* Third party importations */
import { DetalleFactura } from './detalle-factura.entity';
import { Categoria } from './categoria.entity';


@Entity('Productos')
export class Producto {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'float' })
  precio: number;

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

}
