import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las anotaciones de Swagger
import { LoginService } from 'src/service/app/credenciales.service';

@Controller('login')
export class LoginController {
    
  constructor(
    private readonly loginService: LoginService,
  ) {}

  @Post()
  async verificarCredenciales(@Body() { user, pass }: { user: string; pass: string }): Promise<{rol:string}> {
    return await this.loginService.login(user, pass);
  }

  
}
