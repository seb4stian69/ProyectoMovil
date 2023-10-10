/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { Role } from 'src/entities/role.entity';


@Injectable()
export class RolesService {
    
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findById(id: string): Promise<Role> {
    return await this.roleRepository.findOneBy({_id: id});
  }

  async create(user: Role): Promise<Role> {
    return await this.roleRepository.save(user);
  }

  async update(id: string, user: Role): Promise<Role> {
    await this.roleRepository.update(id, user);
    return await this.roleRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }

}
