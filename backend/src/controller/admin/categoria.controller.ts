import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { Categoria } from 'src/entities/categoria.entity';
import { CategoriasService } from 'src/service/categoria.service';
import { generarID } from 'src/shared/autogen.id-key';

@Controller('categorias')
@ApiTags('Categorias') // Etiqueta para el grupo de rutas
export class CategoriasController {
    
  constructor(private readonly categoriaService: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las categorías' })
  @ApiResponse({ status: 200, description: 'Categorías encontradas' })
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findById(@Param('id') id: string): Promise<Categoria | undefined> {
    return this.categoriaService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada con éxito' })
  create(@Body() user: Categoria): Promise<Categoria> {
    user._id = generarID();
    return this.categoriaService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada con éxito' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  update(@Param('id') id: string, @Body() user: Categoria): Promise<Categoria> {
    return this.categoriaService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una categoría por ID' })
  @ApiResponse({ status: 204, description: 'Categoría eliminada con éxito' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  delete(@Param('id') id: string): Promise<void> {
    return this.categoriaService.delete(id);
  }
  
}
