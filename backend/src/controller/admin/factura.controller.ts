import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { Factura } from 'src/entities/factura.entity';
import { FacturasService } from 'src/service/factura.service';
import { generarID } from 'src/shared/autogen.id-key';

@Controller('facturas')
@ApiTags('Facturas') // Etiqueta para el grupo de rutas
export class FacturaController {
    
  constructor(
    private readonly facturaService: FacturasService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las facturas' })
  @ApiResponse({ status: 200, description: 'Facturas encontradas' })
  findAll(): Promise<Factura[]> {
    return this.facturaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una factura por ID' })
  @ApiResponse({ status: 200, description: 'Factura encontrada' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  findById(@Param('id') id: string): Promise<Factura | undefined> {
    return this.facturaService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva factura' })
  @ApiResponse({ status: 201, description: 'Factura creada con éxito' })
  create(@Body() user: Factura): Promise<Factura> {
    user._id = generarID();
    return this.facturaService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una factura por ID' })
  @ApiResponse({ status: 200, description: 'Factura actualizada con éxito' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  update(@Param('id') id: string, @Body() user: Factura): Promise<Factura> {
    return this.facturaService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una factura por ID' })
  @ApiResponse({ status: 204, description: 'Factura eliminada con éxito' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  delete(@Param('id') id: string): Promise<void> {
    return this.facturaService.delete(id);
  }
  
}
