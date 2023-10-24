import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { Producto } from 'src/entities/producto.entity';
import { ProductosService } from 'src/service/producto.service';

@Controller('productos')
@ApiTags('Productos') // Etiqueta para el grupo de rutas
export class ProductosController {
    
  constructor(private readonly productoService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los productos' })
  @ApiResponse({ status: 200, description: 'Productos encontrados' })
  findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findById(@Param('id') id: string): Promise<Producto | undefined> {
    return this.productoService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado con éxito' })
  create(@Body() user: Producto): Promise<Producto> {
    return this.productoService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  update(@Param('id') id: string, @Body() user: Producto): Promise<Producto> {
    return this.productoService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto por ID' })
  @ApiResponse({ status: 204, description: 'Producto eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.productoService.delete(id);
  }
  
}
