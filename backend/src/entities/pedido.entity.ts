/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
/* Third party importations */
import { PedidoEnLinea } from './pedido-en-linea.entity';
import { UserEntity } from './usuario.entity';


@Entity('Pedidos')
export class Pedido {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'enum', enum: ['Confirmado', 'EnProceso', 'Entregado', 'Cancelado'] })
  estado: string;

  @Column({ type: 'datetime' })
  fecha: Date;

  @Column({ type: 'varchar', length: 15, charset: 'big5' })
  Usuarios__id: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'TI', 'PAS'] })
  Usuarios_tipo_id: string;

  /* ---------------------------------------- Relacion con 'Usuarios' ---------------------------------------- */

  @ManyToOne(() => UserEntity, (usuario) => usuario.pedidos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'Usuarios__id', referencedColumnName: '_id' },
    { name: 'Usuarios_tipo_id', referencedColumnName: 'tipo_id' },
  ])
  usuario: UserEntity;

  /* ---------------------------------------- Relacion con 'PedidoEnLinea' ---------------------------------------- */

  @OneToMany(() => PedidoEnLinea, (pedidoEnLinea) => pedidoEnLinea.pedido)
  pedidosEnLinea: PedidoEnLinea[];
  
}
