import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { ProductEntity } from '../entities/product.entity';
import { PRODUCT_SERVICE } from '../service/product.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [{ useClass: ProductService, provide: PRODUCT_SERVICE }],
})
export class ProductModule {}
