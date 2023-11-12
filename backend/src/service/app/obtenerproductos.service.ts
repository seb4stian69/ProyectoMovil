// credenciales.service.ts
import { Injectable } from '@nestjs/common';
import { Producto } from 'src/entities/producto.entity';
import { EntityManager } from 'typeorm';

export interface ProductoApp{
    id_producto: string,
    nombre_producto: string,
    descripcion_producto: string,
    img_path: string,
    stock: number,
    valor_venta: number,
    nombre_categoria: string,
    id_usuario: string,
    primer_nombre_usuario: string,
    primer_apellido_usuario: string
}

@Injectable()
export class ProductoUsuarioService {

  constructor(
    private readonly entityManager: EntityManager
  ) {}

  async obtenerProductos(table: string, actualPage: string, size:string): Promise<Producto> {
    const result = await this.entityManager.query(`call Artesanias.ObtenerDatosPaginados(?, ?, ?);`, [table, actualPage, size]);
    return result;
  }

  async obtenerProductosMasCategoria(): Promise<{id_producto:string, nombre_producto:string, nombre_categoria:string, img_path:string}> {
    const result = await this.entityManager.query(`call Artesanias.Obtener_producto_categoria();`, []);
    return result;
  }

  async obtenerProductosDetalleProducto(idProducto: string): Promise<ProductoApp> {
    const result = await this.entityManager.query(`call Artesanias.Obtener_Producto_individual(?)`, [idProducto]);
    return result;
  }

}
