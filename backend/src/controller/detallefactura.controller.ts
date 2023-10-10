import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { DetalleFactura } from 'src/entities/detalle-factura.entity';
import { DetalleFacturasService } from 'src/service/detallefactura.service';

@Controller('detallefactura')
@ApiTags('DetalleFactura') // Etiqueta para el grupo de rutas
export class DetalleFacturasController {
    
  constructor(private readonly detalleFacturaService: DetalleFacturasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los detalles de factura' })
  @ApiResponse({ status: 200, description: 'Detalles de factura encontrados' })
  findAll(): Promise<DetalleFactura[]> {
    return this.detalleFacturaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un detalle de factura por ID' })
  @ApiResponse({ status: 200, description: 'Detalle de factura encontrado' })
  @ApiResponse({ status: 404, description: 'Detalle de factura no encontrado' })
  findById(@Param('id') id: string): Promise<DetalleFactura | undefined> {
    return this.detalleFacturaService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo detalle de factura' })
  @ApiResponse({ status: 201, description: 'Detalle de factura creado con éxito' })
  create(@Body() user: DetalleFactura): Promise<DetalleFactura> {
    return this.detalleFacturaService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un detalle de factura por ID' })
  @ApiResponse({ status: 200, description: 'Detalle de factura actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Detalle de factura no encontrado' })
  update(@Param('id') id: string, @Body() user: DetalleFactura): Promise<DetalleFactura> {
    return this.detalleFacturaService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un detalle de factura por ID' })
  @ApiResponse({ status: 204, description: 'Detalle de factura eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Detalle de factura no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.detalleFacturaService.delete(id);
  }
  
}
