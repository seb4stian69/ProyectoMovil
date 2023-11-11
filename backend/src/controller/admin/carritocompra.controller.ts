import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CarritoCompras } from 'src/entities/carritocompras.entity';
import { CarritoComprasService } from 'src/service/admin/carritocompras.service';

@Controller('carritocompras')
@ApiTags('CarritoCompras') // Etiqueta para el grupo de rutas
export class CarritoComprasController {
    
  constructor(private readonly carritoComprasService: CarritoComprasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los productos en el carrito de compras' })
  @ApiResponse({ status: 200, description: 'Carrito de compras encontrado' })
  findAll(): Promise<CarritoCompras[]> {
    return this.carritoComprasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un producto en el carrito de compras por ID' })
  @ApiResponse({ status: 200, description: 'Producto en el carrito encontrado' })
  @ApiResponse({ status: 404, description: 'Producto en el carrito no encontrado' })
  findById(@Param('id') id: string): Promise<CarritoCompras | undefined> {
    return this.carritoComprasService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Añade un nuevo producto al carrito de compras' })
  @ApiResponse({ status: 201, description: 'Producto añadido al carrito con éxito' })
  create(@Body() product: CarritoCompras): Promise<CarritoCompras> {
    return this.carritoComprasService.create(product);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza la cantidad de un producto en el carrito de compras por ID' })
  @ApiResponse({ status: 200, description: 'Producto en el carrito actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Producto en el carrito no encontrado' })
  update(@Param('id') id: string, @Body() product: CarritoCompras): Promise<CarritoCompras> {
    return this.carritoComprasService.update(id, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto del carrito de compras por ID' })
  @ApiResponse({ status: 204, description: 'Producto en el carrito eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Producto en el carrito no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.carritoComprasService.delete(id);
  }
}
