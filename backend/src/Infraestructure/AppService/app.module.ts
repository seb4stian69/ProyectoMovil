/* First party importations */
import { Module } from "@nestjs/common";
/* Second party importations */
import { dbConfiguration } from "../configurations/db.config";
/* Third party importations */

@Module({

  imports: [
    dbConfiguration
  ],
  
  controllers: [],
  providers: [],

})
export class AppModule {}