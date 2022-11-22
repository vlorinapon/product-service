import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProductService = {
    createProduct: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    updateProduct: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create product', async () => {
    const dto = {
      name: 'test2',
      sku: '2312',
    };
    expect(await controller.createProduct(dto)).toEqual({
      name: dto.name,
      sku: dto.sku,
    });

    expect(mockProductService.createProduct).toHaveBeenCalledWith(dto);
  });

  it('update product', async () => {
    const updateDto = {
      id: 10,
      name: 'test2',
      sku: '2312',
    };
    expect(await controller.updateProduct('10', updateDto)).toEqual({
      ...updateDto,
    });
  });
});
