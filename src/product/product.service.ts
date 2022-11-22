import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
import ProductEntity from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
  ) {}

  // find all
  getAllProducts() {
    return this.ProductRepository.find();
  }

  // find by id
  async getProductById(id: number) {
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
    const newProduct = this.ProductRepository.create(product);
    await this.ProductRepository.save(newProduct);

    return newProduct;
  }

  // update
  async updateProduct(id: number, post: UpdateProductDto) {
    await this.ProductRepository.update(id, post);
    const updatedProduct = await this.ProductRepository.findOne({
      where: {
        id: id,
      },
    });
    if (updatedProduct) {
      return updatedProduct;
    }

    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteProduct(id: number) {
    const deletedProduct = await this.ProductRepository.delete(id);
    if (!deletedProduct.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
