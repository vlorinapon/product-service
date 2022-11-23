import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export const PRODUCT_SERVICE = 'PRODUCT SERVICE';

export interface IProductService {
  getAllProducts();
  getProductById(id: string);
  createProduct(product: CreateProductDto);
  updateProduct(post: UpdateProductDto);
  deleteProduct(id: string);
}
