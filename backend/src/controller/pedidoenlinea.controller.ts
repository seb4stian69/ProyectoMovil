import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { PedidoEnLinea } from 'src/entities/pedido-en-linea.entity';
import { PedidoEnLineasService } from 'src/service/pedidosenlinea.service';

@Controller('pedidosenlinea')
@ApiTags('PedidosEnLinea') // Etiqueta para el grupo de rutas
export class PedidosEnLineaController {
    
  constructor(private readonly pedidoService: PedidoEnLineasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los pedidos en línea' })
  @ApiResponse({ status: 200, description: 'Pedidos en línea encontrados' })
  findAll(): Promise<PedidoEnLinea[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un pedido en línea por ID' })
  @ApiResponse({ status: 200, description: 'Pedido en línea encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido en línea no encontrado' })
  findById(@Param('id') id: string): Promise<PedidoEnLinea | undefined> {
    return this.pedidoService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo pedido en línea' })
  @ApiResponse({ status: 201, description: 'Pedido en línea creado con éxito' })
  create(@Body() user: PedidoEnLinea): Promise<PedidoEnLinea> {
    return this.pedidoService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un pedido en línea por ID' })
  @ApiResponse({ status: 200, description: 'Pedido en línea actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Pedido en línea no encontrado' })
  update(@Param('id') id: string, @Body() user: PedidoEnLinea): Promise<PedidoEnLinea> {
    return this.pedidoService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un pedido en línea por ID' })
  @ApiResponse({ status: 204, description: 'Pedido en línea eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Pedido en línea no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.pedidoService.delete(id);
  }
  
}
