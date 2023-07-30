import { Injectable, Logger } from '@nestjs/common'
import { IProcessJsonService } from './process-json.service.interfaces'
import { requestedJsonDto } from '../dtos/request/requestedJson.dto'
import { TransformedJsonDto } from '../dtos/response/transformedJson.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ProcessJsonService implements IProcessJsonService {
  private readonly logger: Logger

  constructor() {
    this.logger = new Logger(ProcessJsonService.name)
  }

  getHello(): string {
    return 'Hello World!'
  }

  async processJson(input: requestedJsonDto): Promise<TransformedJsonDto[]> {
    const response = input.Records.map((record) => {
      return {
        spam: record.ses.receipt.spamVerdict.status === 'PASS',
        virus: record.ses.receipt.virusVerdict.status === 'PASS',
        dns:
          record.ses.receipt.spfVerdict.status === 'PASS' &&
          record.ses.receipt.dkimVerdict.status === 'PASS' &&
          record.ses.receipt.dmarcVerdict.status === 'PASS',
        mes: new Date(record.ses.mail.timestamp).toLocaleString('default', { month: 'long' }),
        retrasado: record.ses.receipt.processingTimeMillis > 1000,
        emisor: record.ses.mail.source.split('@')[0],
        receptor: record.ses.mail.destination.map((recipient) => recipient.split('@')[0]),
      }
    })
    
    return plainToInstance(TransformedJsonDto, response)
  }
}
