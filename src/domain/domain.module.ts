import { Module } from '@nestjs/common'
import { IProcessJsonService } from './process-json/services/process-json.service.interfaces'
import { ProcessJsonService } from './process-json/services/process-json.service'
import { provideService } from '../utils/service-provider'

const services = [
  provideService(IProcessJsonService, ProcessJsonService),
]

@Module({
  imports: [],
  exports: [...services],
  providers: [
    ...services,
    ProcessJsonService,
  ],
})
export class DomainModule {}
