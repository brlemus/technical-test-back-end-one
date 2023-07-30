import { Body, Controller, Get, Post } from '@nestjs/common'
import { IProcessJsonService } from '../../domain/process-json/services/process-json.service.interfaces'
import { TransformedJsonDto } from '../../domain/process-json/dtos/response/transformedJson.dto'
import { requestedJsonDto } from '../../domain/process-json/dtos/request/requestedJson.dto'

@Controller('process-json')
export class ProcessJsonController {
  constructor(private readonly processJsonService: IProcessJsonService) {}

  @Get('/getHello')
  getHello(): string {
    return this.processJsonService.getHello()
  }

  @Post('/mappingJson')
  async mappingJson(@Body() input: requestedJsonDto): Promise<TransformedJsonDto[]> {
    return this.processJsonService.processJson(input)    
  }
}
