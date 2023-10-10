/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
/* Third party importations */
import { Factura } from './factura.entity';


@Entity('MetodoPagoCompra')
export class MetodoPagoCompra {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'enum', enum: ['TDebito', 'TCredito', 'Efectivo', 'Transferencia'] })
  medio: string;

  @Column({ type: 'varchar', length: 45 })
  detalles: string;

  /* ---------------------------------------- Relacion con 'Factura' ---------------------------------------- */

  @OneToMany(() => Factura, (factura) => factura.metodoPagoCompra)
  facturas: Factura[];

}
