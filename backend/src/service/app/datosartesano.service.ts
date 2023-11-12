// credenciales.service.ts
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

export interface ObtenerVideos{
    VideoID: string,
    VideoURL: string,
    VideoTitulo: string,
    VideoFecha: string,
    VideoDescripcion: string
}

export interface ObtenerProductos{
    ProductoID: string,
    ProductoImagen: string
}

export interface ObtenerGanancias{
  ProductoID:string,
  ImgPath:string,
  ProductosPublicados:number,
  ProductosVendidos:number,
  Ganancias:number
}

@Injectable()
export class DatosArtesanoService {

  constructor(
    private readonly entityManager: EntityManager
  ) {}

  async obtenerProductos(id: string): Promise<ObtenerProductos> {
    const result = await this.entityManager.query(`call Artesanias.ObtenerProductos_Artesano(?);`, [id]);
    return result;
  }

  async obtenerVideos(id: string): Promise<ObtenerVideos> {
    const result = await this.entityManager.query(`call Artesanias.ObtenerVideo_artesano(?);`, [id]);
    return result;
  }

  async obtenerGanancias(id: string): Promise<ObtenerGanancias>{
    return await this.entityManager.query(`call Artesanias.ObtenerGananciasPorArtesano(?);`, [id])
  }

}
