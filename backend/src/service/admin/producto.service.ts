/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { Producto } from 'src/entities/producto.entity';


@Injectable()
export class ProductosService {
    
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  async findById(id: string): Promise<Producto> {
    return await this.productoRepository.findOneBy({_id: id});
  }

  async create(user: Producto): Promise<Producto> {
    return await this.productoRepository.save(user);
  }

  async update(id: string, user: Producto): Promise<Producto> {
    await this.productoRepository.update(id, user);
    return await this.productoRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.productoRepository.delete(id);
  }

}