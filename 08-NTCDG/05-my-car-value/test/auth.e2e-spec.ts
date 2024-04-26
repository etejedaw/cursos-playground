import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST): handles a signup request', async () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'test-e2e@test.com', password: '1234' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual('test-e2e@test.com');
      });
  });

  it('/auth/signup (POST):signup as a new user then get the currently logged in user cookie', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'test-e2e@test.com', password: '1234' })
      .expect(201);

    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual('test-e2e@test.com');
  });
});
