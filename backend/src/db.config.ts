/* First party importations */
import { TypeOrmModule } from '@nestjs/typeorm';
/* Second party importations */
/* Third party importations */

export const dbConfiguration = TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'Artesanias',
    entities: [],
    synchronize: true,
})