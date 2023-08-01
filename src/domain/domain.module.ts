import { Module } from '@nestjs/common'
import { IEmailService } from './process-email/services/email.service.interfaces'
import { EmailService } from './process-email/services/email.service'
import { provideService } from '../utils/service-provider'

const services = [
  provideService(IEmailService, EmailService),
]

@Module({
  imports: [],
  exports: [...services],
  providers: [
    ...services,
    EmailService,
  ],
})
export class DomainModule {}
