import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { requestData, responseData } from '../src/domain/process-email/mocks/process-email.mock'

describe('EmailController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/getHello (GET) - Should return Hello World!', () => {
    return request(app.getHttpServer())
      .get('/email/getHello')
      .expect(200)
      .expect('Hello World!')
  })

  it('/mappingJson (POST) - Should return mapping request json', () => {
    return request(app.getHttpServer())
      .post('/email/mappingJson')
      .send(requestData)
      .expect(201)
      .expect([responseData])
  })

  it('/attachmentJson (GET) - Should return email json attachment', () => {
    return request(app.getHttpServer())
      .get('/email/attachmentJson')
      .query({ urlOrPath: 'src/domain/process-email/mocks/emailTest.eml' })
      .expect(200)
      .expect({
        "title": "Hello World!"
      })
  })

  afterAll(async () => {
    await app.close();
  });
})
