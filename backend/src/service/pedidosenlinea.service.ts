/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { PedidoEnLinea } from 'src/entities/pedido-en-linea.entity';


@Injectable()
export class PedidoEnLineasService {
    
  constructor(
    @InjectRepository(PedidoEnLinea)
    private readonly pedidoEnLineaRepository: Repository<PedidoEnLinea>,
  ) {}

  async findAll(): Promise<PedidoEnLinea[]> {
    return await this.pedidoEnLineaRepository.find();
  }

  async findById(id: string): Promise<PedidoEnLinea> {
    return await this.pedidoEnLineaRepository.findOneBy({_id: id});
  }

  async create(user: PedidoEnLinea): Promise<PedidoEnLinea> {
    return await this.pedidoEnLineaRepository.save(user);
  }

  async update(id: string, user: PedidoEnLinea): Promise<PedidoEnLinea> {
    await this.pedidoEnLineaRepository.update(id, user);
    return await this.pedidoEnLineaRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.pedidoEnLineaRepository.delete(id);
  }

}
