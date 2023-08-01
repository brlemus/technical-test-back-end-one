import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common'
import { IEmailService } from '../../domain/process-json/services/email.service.interfaces'
import { TransformedJsonDto } from '../../domain/process-json/dtos/response/transformedJson.dto'
import { requestedJsonDto } from '../../domain/process-json/dtos/request/requestedJson.dto'


@Controller('email')
export class ProcessJsonController {
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
