import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { CreateProducerRequestDto } from '@app/use-cases/producers/dto/request/create-request.dto';
import { setupDataSource } from '../setup';
import { AppModule } from '../../../src/app.module';

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

  it('[GET] /producers/:id', async () => {
    const createProducerDto: CreateProducerRequestDto = {
      name: 'Valid Name',
      document: '40346105064', // random CPF
    };

    const responseCreate = await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(201);

    const responseGet = await request(app.getHttpServer())
      .get(`/producers/by-id/${responseCreate.body.id}`)
      .expect(200);

    expect(responseGet.body).toHaveProperty('id', responseCreate.body.id);
    expect(responseGet.body).toHaveProperty('name', createProducerDto.name);
    expect(responseGet.body).toHaveProperty(
      'document',
      createProducerDto.document,
    );
  });

  it('[GET] /producers', async () => {
    const createProducerDto: CreateProducerRequestDto = {
      name: 'Valid Name',
      document: '40346105064', // random CPF

    };

    const response = await request(app.getHttpServer())
      .get('/producers')
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });


  it('[GET] /producers/:document', async () => {
    const createProducerDto: CreateProducerRequestDto = {
      name: 'Valid Name',
      document: '40346105064', // random CPF
    };

    const responseGet = await request(app.getHttpServer())
      .get(`/producers/${createProducerDto.document}`)
      .expect(200);

    expect(responseGet.body).toHaveProperty('name', createProducerDto.name);
    expect(responseGet.body).toHaveProperty(
      'document',
      createProducerDto.document,
    );
  });

  it('[POST] /producers - should return 400 if document is invalid', async () => {
    const createProducerDto: CreateProducerRequestDto = {
      name: 'Valid Name',
      document: '12345678901', // invalid CPF
    };

    await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(400);
  });

  it('[POST] /producers - should return 400 if document is empty', async () => {
    const createProducerDto: CreateProducerRequestDto = {
      name: 'Valid Name',
      document: '',
    };

    await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(500);
  });

  it('[POST] /producers - should return 400 if name is empty', async () => {
    const createProducerDto: CreateProducerRequestDto = {
      name: '',
      document: '12345678901', // invalid CPF
    };

    await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(400);
  });

  it('[GET] /producers/:id - should return 500 if producer does not exist', async () => {
    await request(app.getHttpServer())
      .get('/producers/by-id/123')
      .expect(500);
  });

  it('[GET] /producers/:document - should return erro if producer does not exist', async () => {
    await request(app.getHttpServer())
      .get('/producers/12345678901')
      .expect(400);
  });
});
