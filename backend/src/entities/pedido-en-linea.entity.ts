/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
/* Third party importations */
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity';


@Entity('PedidosEnLinea')
export class PedidoEnLinea {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @PrimaryColumn({ type: 'varchar', length: 100, name: 'Pedidos__id' })
  pedidosId: string;

  @PrimaryColumn({ type: 'varchar', length: 100, name: 'Productos__id' })
  productosId: string;

  /* ---------------------------------------- Relacion con 'Pedido' ---------------------------------------- */

  @ManyToOne(() => Pedido, (pedido) => pedido.pedidosEnLinea, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'Pedidos__id', referencedColumnName: '_id' })
  pedido: Pedido;

  /* ---------------------------------------- Relacion con 'Producto' ---------------------------------------- */

  @ManyToOne(() => Producto, (producto) => producto.pedidosEnLinea, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'Productos__id', referencedColumnName: '_id' })
  producto: Producto;

}
