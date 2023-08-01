import { Test, TestingModule } from '@nestjs/testing'
import { ProcessJsonController } from './email.controller'
import { IEmailService } from '../../domain/process-json/services/email.service.interfaces'
import { provideService } from '../../utils/service-provider'
import { EmailService } from '../../domain/process-json/services/email.service'
import { requestData, responseData } from '../../domain/process-json/mocks/process-json.mock'

describe('ProcessJsonController', () => {
  let processJsonController: ProcessJsonController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcessJsonController],
      providers: [ provideService(IEmailService, EmailService)],
    }).compile()

    processJsonController = app.get(ProcessJsonController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(processJsonController.getHello()).toBe('Hello World!')
    })
  })

  describe('processJson', () => {
    it('should mapping request json', async () => {
      const data = requestData

      const response = await processJsonController.mappingJson(data)

      expect(response).toMatchObject([responseData])
    })
  })
})
