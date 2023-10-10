/* First party importations */
/* Second party importations */
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
/* Third party importations */
import { Producto } from './producto.entity';


@Entity('Categorias')
export class Categoria {

  /* ---------------------------------------- Columnas de la tabla ---------------------------------------- */

  @PrimaryColumn({ type: 'varchar', length: 100 })
  _id: string;

  @Column({ type: 'varchar', length: 45, name: 'nombre_categoria' })
  nombreCategoria: string;

  @Column({ type: 'varchar', length: 100 })
  descripcion: string;

  /* ---------------------------------------- Relacion con 'Producto' ---------------------------------------- */

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

}
