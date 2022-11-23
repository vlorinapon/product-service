import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import ProductEntity from '../entities/product.entity';
import { IProductService } from './product.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
  ) {}

  // find all
  getAllProducts() {
    return this.ProductRepository.find();
  }

  // find by id
  async getProductById(id: string) {
    const product = await this.ProductRepository.findOne({
      where: {
        id: id,
      },
    });
    if (product) {
      return product;
    }

    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  // create
  async createProduct(product: CreateProductDto) {
    const prodEntity: ProductEntity = {
      id: uuidv4(),
      name: product.inriverName,
      sku: product.inriverSku,
    };
    const newProduct = this.ProductRepository.create(prodEntity);
    await this.ProductRepository.save(newProduct);

    return newProduct;
  }

  // update
  async updateProduct(post: UpdateProductDto) {
    await this.ProductRepository.update(post.id, post);
    const updatedProduct = await this.ProductRepository.findOne({
      where: {
        id: post.id,
      },
    });
    if (updatedProduct) {
      return updatedProduct;
    }

    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteProduct(id: string) {
    const deletedProduct = await this.ProductRepository.delete(id);
    if (!deletedProduct.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
