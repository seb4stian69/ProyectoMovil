import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { Producto } from 'src/entities/producto.entity';
import { ProductoApp, ProductoUsuarioService } from 'src/service/app/obtenerproductos.service';

@Controller('productosapp')
export class ProductoUsuarioController {
    
  constructor(
    private readonly productoUserService: ProductoUsuarioService,
  ) {}

  @Get()
  async obtenerProductos(@Body() { table, actualPage, size }: { table: string; actualPage: string; size:string }): Promise<Producto> {
    return await this.productoUserService.obtenerProductos(table, actualPage, size);
  }

  @Get("/categoria")
  async obtenerProductosMasCategoria(): Promise<{id_producto:string, nombre_producto:string, nombre_categoria:string, img_path:string}> {
    return await this.productoUserService.obtenerProductosMasCategoria();
  }

  @Get("/detalle/:id")
  async obtenerProductosDetalle(@Param("id") id:string): Promise<ProductoApp> {
    return await this.productoUserService.obtenerProductosDetalleProducto(id);
  }

}
