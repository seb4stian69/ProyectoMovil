/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { Categoria } from 'src/entities/categoria.entity';


@Injectable()
export class CategoriasService {
    
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findById(id: string): Promise<Categoria> {
    return await this.categoriaRepository.findOneBy({_id: id});
  }

  async create(user: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(user);
  }

  async update(id: string, user: Categoria): Promise<Categoria> {
    await this.categoriaRepository.update(id, user);
    return await this.categoriaRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.categoriaRepository.delete(id);
  }

}
