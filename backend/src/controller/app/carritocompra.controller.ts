import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CarritoCompras } from 'src/entities/carritocompras.entity';
import { CarritoComprasService, ComprasPorID } from 'src/service/app/carritocompras.service';

@Controller('carritocompras')
export class CarritoComprasController {
    
  constructor(private readonly carritoComprasService: CarritoComprasService) {}

  @Get()
  findAll(): Promise<CarritoCompras[]> {
    return this.carritoComprasService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<CarritoCompras | undefined> {
    return this.carritoComprasService.findById(id);
  }

  @Get('/user/:id')
  findByIdAndUser(@Param('id') id: string): Promise<ComprasPorID | undefined> {
    return this.carritoComprasService.obtenerDataCarritoPorID(id);
  }

  @Post()
  create(@Body() product: CarritoCompras): Promise<CarritoCompras> {
    return this.carritoComprasService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: CarritoCompras): Promise<CarritoCompras> {
    return this.carritoComprasService.update(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.carritoComprasService.delete(id);
  }

}
