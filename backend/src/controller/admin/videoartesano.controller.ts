import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { VideoArtesano } from 'src/entities/video-artesano.entity';
import { VideoArtesanosService } from 'src/service/admin/videoartesano.service';
import { generarID } from 'src/shared/autogen.id-key';

@Controller('videoartesano')
@ApiTags('Videos Artesanos') // Etiqueta para el grupo de rutas
export class VideoArtesanoController {
    
  constructor(private readonly videoArtesanoService: VideoArtesanosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los videos artesanos' })
  @ApiResponse({ status: 200, description: 'Videos artesanos encontrados' })
  findAll(): Promise<VideoArtesano[]> {
    return this.videoArtesanoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un video artesano por ID' })
  @ApiResponse({ status: 200, description: 'Video artesano encontrado' })
  @ApiResponse({ status: 404, description: 'Video artesano no encontrado' })
  findById(@Param('id') id: string): Promise<VideoArtesano | undefined> {
    return this.videoArtesanoService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo video artesano' })
  @ApiResponse({ status: 201, description: 'Video artesano creado con éxito' })
  create(@Body() user: VideoArtesano): Promise<VideoArtesano> {
    user._id = generarID();
    return this.videoArtesanoService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un video artesano por ID' })
  @ApiResponse({ status: 200, description: 'Video artesano actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Video artesano no encontrado' })
  update(@Param('id') id: string, @Body() user: VideoArtesano): Promise<VideoArtesano> {
    return this.videoArtesanoService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un video artesano por ID' })
  @ApiResponse({ status: 204, description: 'Video artesano eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Video artesano no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.videoArtesanoService.delete(id);
  }
}
