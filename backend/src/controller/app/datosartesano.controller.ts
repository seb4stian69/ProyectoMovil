import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { LoginService } from 'src/service/app/credenciales.service';
import { DatosArtesanoService, ObtenerGanancias, ObtenerProductos, ObtenerVideos } from 'src/service/app/datosartesano.service';

@Controller('datosartesanos')
export class DatosArtesanosController {
    
  constructor(
    private readonly datosArtesanosService: DatosArtesanoService,
  ) {}

  @Get("/productos/:id")
  async obtenerProductos(@Param("id") id:string): Promise<ObtenerProductos> {
    return await this.datosArtesanosService.obtenerProductos(id);
  }

  @Get("/video/:id")
  async obtenerVideos(@Param("id") id:string): Promise<ObtenerVideos> {
    return await this.datosArtesanosService.obtenerVideos(id);
  }

  @Get("/ganancias/:id")
  async obtenerGanancias(@Param("id") id:string): Promise<ObtenerGanancias> {
    return await this.datosArtesanosService.obtenerGanancias(id);
  }

}
