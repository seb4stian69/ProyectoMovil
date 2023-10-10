/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { Pedido } from 'src/entities/pedido.entity';


@Injectable()
export class PedidoService {
    
  constructor(
    @InjectRepository(Pedido)
    private readonly PedidoRepository: Repository<Pedido>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return await this.PedidoRepository.find();
  }

  async findById(id: string): Promise<Pedido> {
    return await this.PedidoRepository.findOneBy({_id: id});
  }

  async create(user: Pedido): Promise<Pedido> {
    return await this.PedidoRepository.save(user);
  }

  async update(id: string, user: Pedido): Promise<Pedido> {
    await this.PedidoRepository.update(id, user);
    return await this.PedidoRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.PedidoRepository.delete(id);
  }

}
