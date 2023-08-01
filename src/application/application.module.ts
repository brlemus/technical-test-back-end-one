import { Module } from '@nestjs/common'
import { ProcessJsonController } from './controllers/email.controller'
import { DomainModule } from '../domain/domain.module'

@Module({
  imports: [DomainModule],
  controllers: [ProcessJsonController],
  providers: [],
})
export class ApplicationModule {}