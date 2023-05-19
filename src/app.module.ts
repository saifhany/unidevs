import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";
import { OrdersModule } from './orders/orders.module';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
         
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        OrdersModule,
    ]
})

export class AppModule{}