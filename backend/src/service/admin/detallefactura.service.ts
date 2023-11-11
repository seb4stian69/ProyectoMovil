/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { DetalleFactura } from 'src/entities/detalle-factura.entity';


@Injectable()
export class DetalleFacturasService {
    
  constructor(
    @InjectRepository(DetalleFactura)
    private readonly detalleFacturaRepository: Repository<DetalleFactura>,
  ) {}

  async findAll(): Promise<DetalleFactura[]> {
    return await this.detalleFacturaRepository.find();
  }

  async findById(id: string): Promise<DetalleFactura> {
    return await this.detalleFacturaRepository.findOneBy({_id: id});
  }

  async create(user: DetalleFactura): Promise<DetalleFactura> {
    return await this.detalleFacturaRepository.save(user);
  }

  async update(id: string, user: DetalleFactura): Promise<DetalleFactura> {
    await this.detalleFacturaRepository.update(id, user);
    return await this.detalleFacturaRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.detalleFacturaRepository.delete(id);
  }

}
