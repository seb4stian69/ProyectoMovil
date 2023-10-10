/* First party importations */
import { Module } from "@nestjs/common";
/* Second party importations */
import { TypeOrmModule } from "@nestjs/typeorm";
/* Third party importations */
import { dbConfiguration } from "./shared/db.config";
import { UserEntity } from "./entities/usuario.entity";
import { Role } from "./entities/role.entity";
import { Categoria } from "./entities/categoria.entity";
import { Credenciales } from "./entities/credenciales.entity";
import { DetalleFactura } from "./entities/detalle-factura.entity";
import { Factura } from "./entities/factura.entity";
import { IngresoLog } from "./entities/ingreso-log.entity";
import { MetodoPagoCompra } from "./entities/metodo-pago-compra.entity";
import { Pedido } from "./entities/pedido.entity";
import { PedidoEnLinea } from "./entities/pedido-en-linea.entity";
import { Producto } from "./entities/producto.entity";
import { VideoArtesano } from "./entities/video-artesano.entity";
import { UsersService } from "./service/user.service";
import { UsersController } from "./controller/user.controller";
import { RolesService } from "./service/role.service";
import { RolesController } from "./controller/role.controller";
import { CategoriasController } from "./controller/categoria.controller";
import { CategoriasService } from "./service/categoria.service";
import { ProductosController } from "./controller/product.controller";
import { ProductosService } from "./service/product.service";
import { MetodoPagoController } from "./controller/metodopago.controller";
import { MetodoPagoService } from "./service/metodopago.service";
import { CredencialesController } from "./controller/credenciales.controller";
import { CredencialesService } from "./service/credenciales.service";
import { IngresoLogController } from "./controller/ingresoslog.controller";
import { IngresosLogService } from "./service/ingresoslog.service";
import { VideoArtesanoController } from "./controller/videoartesano.controller";
import { VideoArtesanosService } from "./service/videoartesano.service";
import { PedidosController } from "./controller/pedido.controller";
import { PedidoService } from "./service/pedido.service";
import { FacturasService } from "./service/factura.service";
import { FacturaController } from "./controller/factura.controller";
import { PedidoEnLineasService } from "./service/pedidosenlinea.service";
import { PedidosEnLineaController } from "./controller/pedidoenlinea.controller";
import { DetalleFacturasController } from "./controller/detallefactura.controller";
import { DetalleFacturasService } from "./service/detallefactura.service";


@Module({

  imports: [

    dbConfiguration,

    TypeOrmModule.forFeature([
      UserEntity, Role, Categoria,
      Credenciales, DetalleFactura, Factura,
      IngresoLog, MetodoPagoCompra, Pedido,
      PedidoEnLinea, Producto, VideoArtesano,
    ])

  ],
  
  controllers: [
    UsersController, RolesController, CategoriasController,
    ProductosController, MetodoPagoController, CredencialesController,
    IngresoLogController, VideoArtesanoController, PedidosController,
    FacturaController, PedidosEnLineaController, DetalleFacturasController
  ],
  
  providers: [
    UsersService, RolesService, CategoriasService,
    ProductosService, MetodoPagoService, CredencialesService,
    IngresosLogService, VideoArtesanosService, PedidoService,
    FacturasService, PedidoEnLineasService, DetalleFacturasService
  ],

})
export class AppModule {}