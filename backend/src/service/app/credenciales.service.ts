// credenciales.service.ts
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class LoginService {

  constructor(
    private readonly entityManager: EntityManager
  ) {}

  async login(user: string, pass: string): Promise<{rol: string}> {
    const result = await this.entityManager.query(`CALL Artesanias.Iniciar_Sesion(?,?)`, [user,pass]);
    return result;
  }

}
