/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
/* Third party importations */
import { MetodoPagoCompra } from './metodo-pago-compra.entity';
import { DetalleFactura } from './detalle-factura.entity';
import { UserEntity } from './usuario.entity';


@Entity('Facturas')
export class Factura {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'date', name: 'fecha' })
  fecha: Date;

  @Column({ type: 'enum', enum: ['EnProceso', 'Cancelado', 'Entregado'] })
  estado: string;

  @Column({ type: 'varchar', length: 100, name: 'MetodoPagoCompra__id' })
  metodoPagoCompraId: string;

  @Column({ type: 'varchar', length: 15, charset: 'big5', name: 'Usuarios__id' })
  usuariosId: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'], name: 'Usuarios_tipo_id' })
  usuariosTipoId: string;

  /* ---------------------------------------- Relacion con 'MetodoPagoCompra' ---------------------------------------- */

  @ManyToOne(() => MetodoPagoCompra, (metodoPagoCompra) => metodoPagoCompra.facturas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'MetodoPagoCompra__id', referencedColumnName: '_id' },
  ])
  metodoPagoCompra: MetodoPagoCompra;

  /* ---------------------------------------- Relacion con 'Usuarios' ---------------------------------------- */

  @ManyToOne(() => UserEntity, (usuario) => usuario.factura, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Usuarios__id', referencedColumnName: '_id' },
    { name: 'Usuarios_tipo_id', referencedColumnName: 'tipo_id' },
  ])
  usuario: UserEntity;

  /* ---------------------------------------- Relacion con 'DetalleFactura' ---------------------------------------- */

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.factura)
  detallesFactura: DetalleFactura[];

}
