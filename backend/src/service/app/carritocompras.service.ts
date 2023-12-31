/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { EntityManager, Repository } from 'typeorm';
/* Third party importations */
import { CarritoCompras } from 'src/entities/carritocompras.entity';

export interface ComprasPorID {
  CarritoID: string,
  UsuarioID: string,
  UsuarioTipoID: string,
  ProductoID: string,
  Cantidad: number,
  PrecioVenta: number
}

@Injectable()
export class CarritoComprasService {
    
  constructor(
    @InjectRepository(CarritoCompras)
    private readonly CarritoComprasRepository: Repository<CarritoCompras>,
    private readonly entityManager: EntityManager
  ) {}

  async findAll(): Promise<CarritoCompras[]> {
    return await this.CarritoComprasRepository.find();
  }

  async findById(id: string): Promise<CarritoCompras> {
    return await this.CarritoComprasRepository.findOneBy({_id: id});
  }

  async create(user: CarritoCompras): Promise<CarritoCompras> {
    return await this.CarritoComprasRepository.save(user);
  }

  async update(id: string, user: CarritoCompras): Promise<CarritoCompras> {
    await this.CarritoComprasRepository.update(id, user);
    return await this.CarritoComprasRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.CarritoComprasRepository.delete(id);
  }

  async obtenerDataCarritoPorID(id: string): Promise<ComprasPorID> {
    const result = await this.entityManager.query(`call Artesanias.ObtenerDatosCarritoPorID(?);`, [id]);
    return result;
  }

}
