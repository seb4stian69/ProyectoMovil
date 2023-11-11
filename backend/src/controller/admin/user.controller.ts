import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { UserEntity } from 'src/entities/usuario.entity';
import { UsersService } from 'src/service/user.service';
import { generarID } from 'src/shared/autogen.id-key';

@Controller('users')
@ApiTags('Usuarios') // Etiqueta para el grupo de rutas
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios encontrados' })
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findById(@Param('id') id: string): Promise<UserEntity | undefined> {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  create(@Body() user: UserEntity): Promise<UserEntity> {
    user._id = generarID();
    return this.usersService.create(user);
  }

  @Put(':id/:tipoid')
  @ApiOperation({ summary: 'Actualiza un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(@Param('id') id: string, @Param('tipoid') tipoid: string, @Body() user: UserEntity): Promise<UserEntity> {
    console.log(tipoid)
    return this.usersService.update(id, tipoid, user);
  }

  @Delete(':id/:tipoid')
  @ApiOperation({ summary: 'Elimina un usuario por ID' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  delete(@Param('id') id: string, @Param('tipoid') tipoid: string): Promise<void> {
    return this.usersService.delete(id, tipoid);
  }

}
