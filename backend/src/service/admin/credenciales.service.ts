/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { Credenciales } from 'src/entities/credenciales.entity';


@Injectable()
export class CredencialesService {
    
  constructor(
    @InjectRepository(Credenciales)
    private readonly credencialesRepository: Repository<Credenciales>,
  ) {}

  async findAll(): Promise<Credenciales[]> {
    return await this.credencialesRepository.find();
  }

  async findById(id: string): Promise<Credenciales> {
    return await this.credencialesRepository.findOneBy({_id: id});
  }

  async create(user: Credenciales): Promise<Credenciales> {
    return await this.credencialesRepository.save(user);
  }

  async update(id: string, user: Credenciales): Promise<Credenciales> {
    await this.credencialesRepository.update(id, user);
    return await this.credencialesRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.credencialesRepository.delete(id);
  }

}
