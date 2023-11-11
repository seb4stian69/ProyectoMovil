/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { UserEntity } from 'src/entities/usuario.entity';


@Injectable()
export class UsersService {
    
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({_id: id});
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async update(id: string, tipoID: string, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update({_id: id, tipo_id:tipoID}, user);
    return await this.userRepository.findOneBy({_id: id, tipo_id:tipoID});
  }

  async delete(id: string, tipoID: string): Promise<void> {
    await this.userRepository.delete({_id: id, tipo_id:tipoID});
  }

}
