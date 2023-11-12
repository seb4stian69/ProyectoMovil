import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { RegisterService, RegistroUsuarioParams } from 'src/service/app/register-user.service';

@Controller('registeruser')
export class RegisterController {
    
  constructor(
    private readonly registerService: RegisterService,
  ) {}

  @Post()
  async verificarCredenciales(@Body() body:RegistroUsuarioParams): Promise<{Resultado:string}> {
    return await this.registerService.login(body);
  }
  
}
