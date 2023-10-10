/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
/* Third party importations */
import { Factura } from './factura.entity';
import { Producto } from './producto.entity';


@Entity('DetallesFactura')
export class DetalleFactura {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'int', name: 'cantidad' })
  cantidad: number;

  @Column({ type: 'float', name: 'precio' })
  precio: number;

  @Column({ type: 'float', name: 'subtotal' })
  subtotal: number;

  @Column({ type: 'varchar', length: 100, name: 'Facturas__id' }) 
  facturasId: string;

  @Column({ type: 'varchar', length: 100, name: 'Productos__id' })
  productosId: string;

  /* ---------------------------------------- Relacion con 'Factura' ---------------------------------------- */

  @ManyToOne(() => Factura, (factura) => factura.detallesFactura, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Facturas__id', referencedColumnName: '_id' },
  ])
  factura: Factura;

  /* ---------------------------------------- Relacion con 'Producto' ---------------------------------------- */

  @ManyToOne(() => Producto, (producto) => producto.detallesFactura, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Productos__id', referencedColumnName: '_id' },
  ])
  producto: Producto;

}
