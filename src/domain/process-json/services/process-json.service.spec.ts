import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { ProcessJsonService } from './process-json.service'
import { requestData, responseData } from '../mocks/process-json.mock'

jest.spyOn(Logger, 'error').mockImplementation(jest.fn())

describe('AdminService', () => {
  let module: TestingModule
  let processJsonService: ProcessJsonService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ProcessJsonService],
    }).compile()

    processJsonService = module.get(ProcessJsonService)
  })

  it('should be defined', () => {
    expect(processJsonService).toBeDefined()
  })

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(processJsonService.getHello()).toBe('Hello World!')
    })
  })

  describe('processJson', () => {
    it('should mapping request json', async () => {
      const data = requestData

      const response = await processJsonService.processJson(data)

      expect(response).toMatchObject([responseData])
    })
  })

})