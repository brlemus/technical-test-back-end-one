import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { IEmailService } from '../../domain/process-email/services/email.service.interfaces'
import { TransformedJsonDto } from '../../domain/process-email/dtos/response/transformedJson.dto'
import { requestedJsonDto } from '../../domain/process-email/dtos/request/requestedJson.dto'


@Controller('email')
export class EmailController {
  constructor(private readonly emailService: IEmailService) {}

  @Get('/getHello')
  getHello(): string {
    return this.emailService.getHello()
  }

  @Post('/mappingJson')
  async mappingJson(@Body() input: requestedJsonDto): Promise<TransformedJsonDto[]> {
    return this.emailService.processJson(input)    
  }

  @Get('/attachmentJson')
  async attachmentJson(@Query('urlOrPath') urlOrPath: string): Promise<object> {
    return this.emailService.getAttachmentJson(urlOrPath)
  }

 
}
