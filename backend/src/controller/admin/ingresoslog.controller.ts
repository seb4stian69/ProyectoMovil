import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { IngresoLog } from 'src/entities/ingreso-log.entity';
import { IngresosLogService } from 'src/service/admin/ingresoslog.service';
import { generarID } from 'src/shared/autogen.id-key';

@Controller('ingresoslog')
@ApiTags('IngresosLog') // Etiqueta para el grupo de rutas
export class IngresoLogController {
    
  constructor(private readonly ingresosLogService: IngresosLogService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los ingresos log' })
  @ApiResponse({ status: 200, description: 'Ingresos log encontrados' })
  findAll(): Promise<IngresoLog[]> {
    return this.ingresosLogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un ingreso log por ID' })
  @ApiResponse({ status: 200, description: 'Ingreso log encontrado' })
  @ApiResponse({ status: 404, description: 'Ingreso log no encontrado' })
  findById(@Param('id') id: string): Promise<IngresoLog | undefined> {
    return this.ingresosLogService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo ingreso log' })
  @ApiResponse({ status: 201, description: 'Ingreso log creado con éxito' })
  create(@Body() user: IngresoLog): Promise<IngresoLog> {
    user._id = generarID();
    return this.ingresosLogService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un ingreso log por ID' })
  @ApiResponse({ status: 200, description: 'Ingreso log actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Ingreso log no encontrado' })
  update(@Param('id') id: string, @Body() user: IngresoLog): Promise<IngresoLog> {
    return this.ingresosLogService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un ingreso log por ID' })
  @ApiResponse({ status: 204, description: 'Ingreso log eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Ingreso log no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.ingresosLogService.delete(id);
  }
  
}
