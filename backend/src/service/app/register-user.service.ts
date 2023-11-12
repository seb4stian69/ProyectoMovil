// credenciales.service.ts
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

export interface RegistroUsuarioParams {
    p_id: string;
    p_tipo_id: 'CC' | 'CE' | 'TI' | 'PAS';
    p_primer_nombre: string;
    p_segundo_nombre: string;
    p_primer_apellido: string;
    p_segundo_apellido: string;
    p_fecha_nacimiento: string;
    p_telefono: string;
    p_direccion: string;
    p_correo: string;
    p_tipo_rol: 'Cliente' | 'Artesano' | 'Admin';
    p_usuario: string;
    p_contrasena: string;
}
  

@Injectable()
export class RegisterService {

  constructor(
    private readonly entityManager: EntityManager
  ) {}

  async login(body: RegistroUsuarioParams): Promise<{Resultado: string}> {
    const result = await this.entityManager.query(`CALL Artesanias.Registro_Usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [
        body.p_id,
        body.p_tipo_id,
        body.p_primer_nombre,
        body.p_segundo_nombre,
        body.p_primer_apellido,
        body.p_segundo_apellido,
        body.p_fecha_nacimiento,
        body.p_telefono,
        body.p_direccion,
        body.p_correo,
        body.p_tipo_rol,
        body.p_usuario,
        body.p_contrasena
    ]);
    return result;
  }

}
