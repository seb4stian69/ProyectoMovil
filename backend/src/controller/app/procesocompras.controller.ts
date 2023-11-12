import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DetalleFactura } from 'src/entities/detalle-factura.entity';
import { Factura } from 'src/entities/factura.entity';
import { MetodoPagoCompra } from 'src/entities/metodo-pago-compra.entity';
import { Producto } from 'src/entities/producto.entity';
import { DetalleFacturasService } from 'src/service/admin/detallefactura.service';
import { FacturasService } from 'src/service/admin/factura.service';
import { MetodoPagoService } from 'src/service/admin/metodopago.service';
import { ProductosService } from 'src/service/admin/producto.service';
import { CarritoComprasService, ComprasPorID } from 'src/service/app/carritocompras.service';
import { generarID } from 'src/shared/autogen.id-key';
import { obtenerFechaActual } from 'src/shared/obtenerFecha';

interface ProcesoCompras {

    metodoPagoCompra: MetodoPagoCompra,
    factura: Factura

}

@Controller('procesocompras')
export class ProcesoCompraController {
    
  constructor(
    private readonly carritocomprasService: CarritoComprasService,
    private readonly detalleFacturaService: DetalleFacturasService,
    private readonly metodoPagoService: MetodoPagoService,
    private readonly facturaService: FacturasService,
    private readonly productService: ProductosService
  ) {}

  @Post()
  async realizarCompra(@Body() body: ProcesoCompras): Promise<{ result: string }> {

    const elementosCarrito: ComprasPorID = await this.carritocomprasService.obtenerDataCarritoPorID(body.factura.usuariosId);
    
    if(await this.validacionDeProductos(elementosCarrito)){
        return await this.procesoCompra(body, elementosCarrito);
    }else{
        return { result: "Estas tratando de comprar productos que exceden la cantidad actual en el stock" };
    }

  }

  async validacionDeProductos(elementosCarrito:ComprasPorID):Promise<Boolean>{

    for (const producto of elementosCarrito[0]) {
        const product: Producto = await this.productService.findById(producto.ProductoID)
        if(product.stock < producto.Cantidad) return false;
    }

    return true;

  }

  async procesoCompra(body: ProcesoCompras, elementosCarrito: ComprasPorID): Promise<{ result: string }>{

    const idGenerado = generarID();
    body.metodoPagoCompra._id = `MP_${idGenerado}`;

    try {

      body.factura._id = `FAC_${idGenerado}`;
      body.factura.estado = `EnProceso`;
      body.factura.fecha = new Date(obtenerFechaActual());
      body.factura.metodoPagoCompraId = body.metodoPagoCompra._id;

      await this.metodoPagoService.create(body.metodoPagoCompra);
      await this.facturaService.create(body.factura);

      for (const productoCarrito of elementosCarrito[0]) {

        const detalleFactura: DetalleFactura = new DetalleFactura();
        const productoUpdate: Producto = await this.productService.findById(productoCarrito.ProductoID)

        // Llenamos objeto para insertar registro en la tabla DetalleFactura
        detalleFactura._id = `DET_${generarID()}`;
        detalleFactura.cantidad = productoCarrito.Cantidad;
        detalleFactura.precio = productoCarrito.PrecioVenta;
        detalleFactura.subtotal = productoCarrito.PrecioVenta * productoCarrito.Cantidad;
        detalleFactura.facturasId = body.factura._id;
        detalleFactura.productosId = productoCarrito.ProductoID;

        // Llenamos objeto para actualizar el stock en la tabla Productos
        productoUpdate.stock = (productoUpdate.stock - productoCarrito.Cantidad);

        // Realizamos las peticiones
        await this.detalleFacturaService.create(detalleFactura);
        await this.productService.update(productoUpdate._id, productoUpdate)
        await this.carritocomprasService.delete(productoCarrito.CarritoID);

      }

      return { result: "Compra realizada con éxito!" };

    } catch (error) {
      console.error("Error en el proceso:", error);
      return { result: "Error al realizar la compra" };
    }

  }

}