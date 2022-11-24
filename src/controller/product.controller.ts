import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from '../decorators/apiGuard.decorator';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { IProductService, PRODUCT_SERVICE } from '../service/product.interface';

@ApiGuard()
@ApiTags('Products')
@Controller('Products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}

  // get all Products
  @Get('/getall')
  @ApiOperation({ summary: 'Get all Products' })
  getProducts() {
    return this.productService.getAllProducts();
  }

  // get Product by id
  @Get('/getbyId/:id')
  @ApiOperation({ summary: 'Get Product by Id' })
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  // create Product
  @Post('/create')
  @ApiOperation({ summary: 'Create New Product' })
  async createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }

  // update Product
  @Put('/update')
  @ApiOperation({ summary: 'Update Product' })
  async updateProduct(@Body() Product: UpdateProductDto) {
    return this.productService.updateProduct(Product);
  }

  //delete Product
  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: string) {
    this.productService.deleteProduct(id);
  }
}
