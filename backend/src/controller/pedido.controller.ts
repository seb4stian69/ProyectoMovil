import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { Pedido } from 'src/entities/pedido.entity';
import { PedidoService } from 'src/service/pedido.service';

@Controller('pedidos')
@ApiTags('Pedidos') // Etiqueta para el grupo de rutas
export class PedidosController {
    
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los pedidos' })
  @ApiResponse({ status: 200, description: 'Pedidos encontrados' })
  findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  findById(@Param('id') id: string): Promise<Pedido | undefined> {
    return this.pedidoService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado con éxito' })
  create(@Body() user: Pedido): Promise<Pedido> {
    return this.pedidoService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  update(@Param('id') id: string, @Body() user: Pedido): Promise<Pedido> {
    return this.pedidoService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un pedido por ID' })
  @ApiResponse({ status: 204, description: 'Pedido eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.pedidoService.delete(id);
  }
  
}
