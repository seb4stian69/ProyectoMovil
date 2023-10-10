import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { Role } from 'src/entities/role.entity';
import { RolesService } from 'src/service/role.service';

@Controller('roles')
@ApiTags('Roles') // Etiqueta para el grupo de rutas
export class RolesController {
    
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los roles' })
  @ApiResponse({ status: 200, description: 'Roles encontrados' })
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un rol por ID' })
  @ApiResponse({ status: 200, description: 'Rol encontrado' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  findById(@Param('id') id: string): Promise<Role | undefined> {
    return this.rolesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo rol' })
  @ApiResponse({ status: 201, description: 'Rol creado con éxito' })
  create(@Body() user: Role): Promise<Role> {
    return this.rolesService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un rol por ID' })
  @ApiResponse({ status: 200, description: 'Rol actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  update(@Param('id') id: string, @Body() user: Role): Promise<Role> {
    return this.rolesService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un rol por ID' })
  @ApiResponse({ status: 204, description: 'Rol eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.rolesService.delete(id);
  }
  
}
