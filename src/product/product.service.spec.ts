import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;

  const mockProductRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((product) => Promise.resolve({ id: 15, ...product })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user service', async () => {
    expect(
      await service.createProduct({
        name: 'test2',
        sku: '2312',
      }),
    ).toEqual({
      name: 'test2',
      sku: '2312',
    });
  });
});
