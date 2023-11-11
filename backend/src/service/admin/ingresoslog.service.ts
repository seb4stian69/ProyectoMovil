/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { IngresoLog } from 'src/entities/ingreso-log.entity';


@Injectable()
export class IngresosLogService {
    
  constructor(
    @InjectRepository(IngresoLog)
    private readonly ingresoLogRepository: Repository<IngresoLog>,
  ) {}

  async findAll(): Promise<IngresoLog[]> {
    return await this.ingresoLogRepository.find();
  }

  async findById(id: string): Promise<IngresoLog> {
    return await this.ingresoLogRepository.findOneBy({_id: id});
  }

  async create(user: IngresoLog): Promise<IngresoLog> {
    return await this.ingresoLogRepository.save(user);
  }

  async update(id: string, user: IngresoLog): Promise<IngresoLog> {
    await this.ingresoLogRepository.update(id, user);
    return await this.ingresoLogRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.ingresoLogRepository.delete(id);
  }

}
