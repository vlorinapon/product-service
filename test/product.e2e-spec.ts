import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from '../src/modules/product.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import ProductEntity from '../src/entities/product.entity';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  const mockProducts = [
    {
      name: 'test2',
      sku: '2312',
      id: 14,
    },
  ];
  const mockProductRepository = {
    find: jest.fn().mockResolvedValue(mockProducts),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((product) => Promise.resolve({ id: 15, ...product })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(getRepositoryToken(ProductEntity))
      .useValue(mockProductRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/Products (GET)', () => {
    return request(app.getHttpServer())
      .get('/Products/getall')
      .expect(200)
      .expect(mockProducts);
  });

  it('/Products (POST)', () => {
    return request(app.getHttpServer())
      .post('/Products/create')
      .send({
        name: 'test2',
        sku: '1234',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          name: 'test2',
          sku: '1234',
        });
      });
  });

  it.skip('/Products (POST) --> validation fail ', () => {
    return request(app.getHttpServer())
      .post('/Products/create')
      .send({
        name: 1,
        sku: '1234',
      })
      .expect(400);
  });
});
