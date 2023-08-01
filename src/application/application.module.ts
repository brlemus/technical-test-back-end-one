import { Module } from '@nestjs/common'
import { EmailController } from './controllers/email.controller'
import { DomainModule } from '../domain/domain.module'

@Module({
  imports: [DomainModule],
  controllers: [EmailController],
  providers: [],
})
export class ApplicationModule {}