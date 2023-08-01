import { Test, TestingModule } from '@nestjs/testing'
import { HttpException, Logger } from '@nestjs/common'
import { EmailService } from './email.service'
import { mockEmailData, mockJsonData, requestData, responseData } from '../mocks/process-email.mock'

jest.spyOn(Logger, 'error').mockImplementation(jest.fn())

describe('EmailService', () => {
  let module: TestingModule
  let emailService: EmailService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [EmailService],
    }).compile()

    emailService = module.get(EmailService)
  })

  it('should be defined', () => {
    expect(emailService).toBeDefined()
  })

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(emailService.getHello()).toBe('Hello World!')
    })
  })

  describe('processJson', () => {
    it('should mapping request json', async () => {
      const data = requestData

      const response = await emailService.processJson(data)

      expect(response).toMatchObject([responseData])
    })
  })

  describe('getAttachmentJson', () => {
    it('should get JSON attachment in the email', async () => {
      const urlOrPath = 'path/email'
      emailService['fetchContent'] = jest.fn().mockResolvedValue(JSON.stringify(mockEmailData))
      emailService['extractJson'] = jest.fn().mockResolvedValue(mockJsonData)

      const result = await emailService.getAttachmentJson(urlOrPath)
      
      expect(result).toMatchObject(mockJsonData)

    })

    it('should handle error when email does not contain JSON attachment', async () => {
      const urlOrPath = 'path/email'
      emailService['fetchContent'] = jest.fn().mockResolvedValue(JSON.stringify(mockEmailData))
      emailService['extractJson'] = jest.fn().mockRejectedValue(new Error('JSON not found in email attachments.'))
 
      await expect(emailService.getAttachmentJson(urlOrPath)).rejects.toThrowError(new HttpException('Failed to parse email.', 500))
    })

  })

})