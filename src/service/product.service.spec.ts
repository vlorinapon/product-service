import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductEntity } from '../entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;
  const createEntity: ProductEntity = {
    id: 'e48485c1-7b49-41e6-b943-46ad82ec5386',
    name: 'test2',
    sku: '2312',
  };

  const mockProductRepository = {
    create: jest.fn().mockImplementation((dto) => createEntity),
    save: jest
      .fn()
      .mockImplementation((product) => Promise.resolve({ ...product })),
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
    const result = await service.createProduct({
      inriverName: 'test2',
      inriverSku: '2312',
    });

    expect(result).toEqual({
      id: 'e48485c1-7b49-41e6-b943-46ad82ec5386',
      name: 'test2',
      sku: '2312',
    });
  });
});
