import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { MetodoPagoCompra } from 'src/entities/metodo-pago-compra.entity';
import { MetodoPagoService } from 'src/service/admin/metodopago.service';
import { generarID } from 'src/shared/autogen.id-key';

@Controller('metodopago')
@ApiTags('MetodoPago') // Etiqueta para el grupo de rutas
export class MetodoPagoController {
    
  constructor(private readonly metodoPagoService: MetodoPagoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los métodos de pago' })
  @ApiResponse({ status: 200, description: 'Métodos de pago encontrados' })
  findAll(): Promise<MetodoPagoCompra[]> {
    return this.metodoPagoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un método de pago por ID' })
  @ApiResponse({ status: 200, description: 'Método de pago encontrado' })
  @ApiResponse({ status: 404, description: 'Método de pago no encontrado' })
  findById(@Param('id') id: string): Promise<MetodoPagoCompra | undefined> {
    return this.metodoPagoService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo método de pago' })
  @ApiResponse({ status: 201, description: 'Método de pago creado con éxito' })
  create(@Body() user: MetodoPagoCompra): Promise<MetodoPagoCompra> {
    user._id = generarID();
    return this.metodoPagoService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un método de pago por ID' })
  @ApiResponse({ status: 200, description: 'Método de pago actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Método de pago no encontrado' })
  update(@Param('id') id: string, @Body() user: MetodoPagoCompra): Promise<MetodoPagoCompra> {
    return this.metodoPagoService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un método de pago por ID' })
  @ApiResponse({ status: 204, description: 'Método de pago eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Método de pago no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.metodoPagoService.delete(id);
  }
  
}
