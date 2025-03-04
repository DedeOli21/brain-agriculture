import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { setupDataSource } from '../setup';
import { CreateProducerRequestDto } from '@app/use-cases/producers/dto/request/create-request.dto';

describe('E2E Test for All Routes', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const datasource = await setupDataSource();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(datasource)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('[POST] /producers', async () => {
    const createProducerDto: CreateProducerRequestDto = {
      name: 'Valid Name',
      document: '73831001073', // random CPF
    };

    const response = await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', createProducerDto.name);
    expect(response.body).toHaveProperty(
      'document',
      createProducerDto.document,
    );
  });
});
