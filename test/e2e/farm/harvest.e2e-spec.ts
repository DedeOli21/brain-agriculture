import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { setupDataSource } from '../setup';
import { DataSource } from 'typeorm';
import { CreateHarvestDto } from '@app/use-cases/harvest/dto/create-harvest.dto';
import { V4MAPPED } from 'dns';
import { randomUUID } from 'crypto';

describe('Harvests E2E', () => {
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

  it('/harvests (POST)', async () => {
    const createHarvestDto: CreateHarvestDto = {
      cropId: randomUUID(),
      amount: 100,
      harvestDate: new Date(),
    };
    
    const response = await request(app.getHttpServer())
      .post('/harvest')
      .send(createHarvestDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('amount', createHarvestDto.amount);
  });
});
