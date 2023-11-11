import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { Credenciales } from 'src/entities/credenciales.entity';
import { CredencialesService } from 'src/service/admin/credenciales.service';
import { generarID } from 'src/shared/autogen.id-key';

@Controller('credenciales')
@ApiTags('Credenciales') // Etiqueta para el grupo de rutas
export class CredencialesController {
    
  constructor(private readonly credencialesService: CredencialesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las credenciales' })
  @ApiResponse({ status: 200, description: 'Credenciales encontradas' })
  findAll(): Promise<Credenciales[]> {
    return this.credencialesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una credencial por ID' })
  @ApiResponse({ status: 200, description: 'Credencial encontrada' })
  @ApiResponse({ status: 404, description: 'Credencial no encontrada' })
  findById(@Param('id') id: string): Promise<Credenciales | undefined> {
    return this.credencialesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva credencial' })
  @ApiResponse({ status: 201, description: 'Credencial creada con éxito' })
  create(@Body() user: Credenciales): Promise<Credenciales> {
    user._id = generarID();
    return this.credencialesService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una credencial por ID' })
  @ApiResponse({ status: 200, description: 'Credencial actualizada con éxito' })
  @ApiResponse({ status: 404, description: 'Credencial no encontrada' })
  update(@Param('id') id: string, @Body() user: Credenciales): Promise<Credenciales> {
    return this.credencialesService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una credencial por ID' })
  @ApiResponse({ status: 204, description: 'Credencial eliminada con éxito' })
  @ApiResponse({ status: 404, description: 'Credencial no encontrada' })
  delete(@Param('id') id: string): Promise<void> {
    return this.credencialesService.delete(id);
  }
  
}
