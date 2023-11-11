/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { Factura } from 'src/entities/factura.entity';


@Injectable()
export class FacturasService {
    
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
  ) {}

  async findAll(): Promise<Factura[]> {
    return await this.facturaRepository.find();
  }

  async findById(id: string): Promise<Factura> {
    return await this.facturaRepository.findOneBy({_id: id});
  }

  async create(user: Factura): Promise<Factura> {
    return await this.facturaRepository.save(user);
  }

  async update(id: string, user: Factura): Promise<Factura> {
    await this.facturaRepository.update(id, user);
    return await this.facturaRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.facturaRepository.delete(id);
  }

}
