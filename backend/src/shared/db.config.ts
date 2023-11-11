/* First party importations */
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoCompras } from 'src/entities/carritocompras.entity';
/* Second party importations */
/* Third party importations */
import { Categoria } from 'src/entities/categoria.entity';
import { Credenciales } from 'src/entities/credenciales.entity';
import { DetalleFactura } from 'src/entities/detalle-factura.entity';
import { Factura } from 'src/entities/factura.entity';
import { IngresoLog } from 'src/entities/ingreso-log.entity';
import { MetodoPagoCompra } from 'src/entities/metodo-pago-compra.entity';
import { Producto } from 'src/entities/producto.entity';
import { Role } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/usuario.entity';
import { VideoArtesano } from 'src/entities/video-artesano.entity';


export const dbConfiguration = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'Artesanias',
    entities: [
        UserEntity, Role, Factura,
        DetalleFactura, VideoArtesano, IngresoLog,
        Credenciales, MetodoPagoCompra, Categoria,
        Producto, CarritoCompras
    ],
    synchronize: false,
})

