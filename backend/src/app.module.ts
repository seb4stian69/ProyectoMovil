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
import { Producto } from "./entities/producto.entity";
import { VideoArtesano } from "./entities/video-artesano.entity";
import { UsersService } from "./service/admin/user.service";
import { UsersController } from "./controller/admin/user.controller";
import { RolesService } from "./service/admin/role.service";
import { RolesController } from "./controller/admin/role.controller";
import { CategoriasController } from "./controller/admin/categoria.controller";
import { CategoriasService } from "./service/admin/categoria.service";
import { ProductosController } from "./controller/admin/product.controller";
import { MetodoPagoController } from "./controller/admin/metodopago.controller";
import { MetodoPagoService } from "./service/admin/metodopago.service";
import { CredencialesController } from "./controller/admin/credenciales.controller";
import { CredencialesService } from "./service/admin/credenciales.service";
import { IngresoLogController } from "./controller/admin/ingresoslog.controller";
import { IngresosLogService } from "./service/admin/ingresoslog.service";
import { VideoArtesanoController } from "./controller/admin/videoartesano.controller";
import { VideoArtesanosService } from "./service/admin/videoartesano.service";
import { FacturasService } from "./service/admin/factura.service";
import { FacturaController } from "./controller/admin/factura.controller";
import { DetalleFacturasController } from "./controller/admin/detallefactura.controller";
import { DetalleFacturasService } from "./service/admin/detallefactura.service";
import { ProductosService } from "./service/admin/producto.service";
import { CarritoCompras } from "./entities/carritocompras.entity";
import { CarritoComprasController } from "./controller/app/carritocompra.controller";
import { CarritoComprasService } from "./service/app/carritocompras.service";
import { LoginController } from "./controller/app/login.controller";
import { LoginService } from "./service/app/credenciales.service";
import { RegisterService } from "./service/app/register-user.service";
import { RegisterController } from "./controller/app/register-user.controller";
import { ProductoUsuarioController } from "./controller/app/productosapp.controller";
import { ProductoUsuarioService } from "./service/app/obtenerproductos.service";
import { DatosArtesanoService } from "./service/app/datosartesano.service";
import { DatosArtesanosController } from "./controller/app/datosartesano.controller";
import { ProcesoCompraController } from "./controller/app/procesocompras.controller";


@Module({

  imports: [

    dbConfiguration,

    TypeOrmModule.forFeature([
      UserEntity, Role, Categoria,
      Credenciales, DetalleFactura, Factura,
      IngresoLog, MetodoPagoCompra, Producto,
      VideoArtesano,CarritoCompras
    ])

  ],
  
  controllers: [
    UsersController, RolesController, CategoriasController,
    ProductosController, MetodoPagoController, CredencialesController,
    IngresoLogController, VideoArtesanoController, FacturaController,
    DetalleFacturasController,CarritoComprasController, LoginController,
    RegisterController, ProductoUsuarioController, DatosArtesanosController,
    ProcesoCompraController
  ],
  
  providers: [
    UsersService, RolesService, CategoriasService,
    MetodoPagoService, CredencialesService, IngresosLogService,
    VideoArtesanosService, ProductosService, FacturasService,
    DetalleFacturasService, CarritoComprasService, LoginService,
    RegisterService, ProductoUsuarioService, DatosArtesanoService
  ],

})
export class AppModule {}