/* First party importations */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Second party importations */
import { Repository } from 'typeorm';
/* Third party importations */
import { VideoArtesano } from 'src/entities/video-artesano.entity';


@Injectable()
export class VideoArtesanosService {
    
  constructor(
    @InjectRepository(VideoArtesano)
    private readonly videoArtesanoRepository: Repository<VideoArtesano>,
  ) {}

  async findAll(): Promise<VideoArtesano[]> {
    return await this.videoArtesanoRepository.find();
  }

  async findById(id: string): Promise<VideoArtesano> {
    return await this.videoArtesanoRepository.findOneBy({_id: id});
  }

  async create(user: VideoArtesano): Promise<VideoArtesano> {
    return await this.videoArtesanoRepository.save(user);
  }

  async update(id: string, user: VideoArtesano): Promise<VideoArtesano> {
    await this.videoArtesanoRepository.update(id, user);
    return await this.videoArtesanoRepository.findOneBy({_id: id});
  }

  async delete(id: string): Promise<void> {
    await this.videoArtesanoRepository.delete(id);
  }

}
