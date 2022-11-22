import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateProductDto from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // get all Products
  @Get('/getall')
  @ApiOperation({ summary: 'Get all Products' })
  getProducts() {
    return this.productService.getAllProducts();
  }

  // get Product by id
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }

  // create Product
  @Post('/create')
  async createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }

  // update Product
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() Product: UpdateProductDto,
  ) {
    return this.productService.updateProduct(Number(id), Product);
  }

  //delete Product
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    this.productService.deleteProduct(Number(id));
  }
}
