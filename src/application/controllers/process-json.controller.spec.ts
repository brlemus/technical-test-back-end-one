import { Test, TestingModule } from '@nestjs/testing'
import { ProcessJsonController } from './process-json.controller'
import { IProcessJsonService } from '../../domain/process-json/services/process-json.service.interfaces'
import { provideService } from '../../utils/service-provider'
import { ProcessJsonService } from '../../domain/process-json/services/process-json.service'
import { requestData, responseData } from '../../domain/process-json/mocks/process-json.mock'

describe('ProcessJsonController', () => {
  let processJsonController: ProcessJsonController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcessJsonController],
      providers: [ provideService(IProcessJsonService, ProcessJsonService)],
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
