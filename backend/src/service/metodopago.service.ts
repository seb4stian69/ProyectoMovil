/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { MetodoPagoCompra } from 'src/entities/metodo-pago-compra.entity';


@Injectable()
export class MetodoPagoService {
    
  constructor(
    @InjectRepository(MetodoPagoCompra)
    private readonly metodopagoRepository: Repository<MetodoPagoCompra>,
  ) {}

  async findAll(): Promise<MetodoPagoCompra[]> {
    return await this.metodopagoRepository.find();
  }

  async findById(id: string): Promise<MetodoPagoCompra> {
    return await this.metodopagoRepository.findOneBy({_id: id});
  }

  async create(user: MetodoPagoCompra): Promise<MetodoPagoCompra> {
    return await this.metodopagoRepository.save(user);
  }

  async update(id: string, user: MetodoPagoCompra): Promise<MetodoPagoCompra> {
    await this.metodopagoRepository.update(id, user);
    return await this.metodopagoRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.metodopagoRepository.delete(id);
  }

}
