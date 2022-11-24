import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { PRODUCT_SERVICE } from '../service/product.interface';
import { ProductService } from '../service/product.service';

describe('ProductController', () => {
  let controller: ProductController;
  const createEntity = {
    name: 'test2',
    sku: '2312',
  };
  const mockProductService = {
    createProduct: jest.fn((dto) => {
      return {
        ...createEntity,
      };
    }),
    updateProduct: jest.fn().mockImplementation((dto) => ({ ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ useClass: ProductService, provide: PRODUCT_SERVICE }],
    })
      .overrideProvider(PRODUCT_SERVICE)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create product', async () => {
    const dto = {
      inriverName: 'test2',
      inriverSku: '2312',
    };
    expect(await controller.createProduct(dto)).toEqual({
      name: dto.inriverName,
      sku: dto.inriverSku,
    });

    expect(mockProductService.createProduct).toHaveBeenCalledWith(dto);
  });

  it('update product', async () => {
    const updateDto = {
      id: '10',
      name: 'test2',
      sku: '2312',
    };
    expect(await controller.updateProduct(updateDto)).toEqual({
      ...updateDto,
    });
  });
});
