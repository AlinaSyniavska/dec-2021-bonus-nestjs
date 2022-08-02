import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";

import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as fs from "fs";
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const swaggerDescription = fs.readFileSync(path.join(__dirname, '..', 'description.markdown'));

    const config = new DocumentBuilder()
        .setTitle('Bonus NestJS project')
        .setDescription(swaggerDescription.toString() || 'The NestJS project API description')
        .setVersion('1.0')
        // .addTag('bonus')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT);
    // await app.listen(3000);
}

bootstrap();

