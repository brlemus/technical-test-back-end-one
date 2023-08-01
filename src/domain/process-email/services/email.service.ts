import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { MailParser, simpleParser } from 'mailparser'
import axios from 'axios'
import { readFile } from 'fs/promises'
import { IEmailService } from './email.service.interfaces'
import { requestedJsonDto } from '../dtos/request/requestedJson.dto'
import { TransformedJsonDto } from '../dtos/response/transformedJson.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class EmailService implements IEmailService {
  private readonly logger: Logger

  constructor() {
    this.logger = new Logger(EmailService.name)
  }

  getHello(): string {
    return 'Hello World!'
  }

  async processJson(input: requestedJsonDto): Promise<TransformedJsonDto[]> {
    try {
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
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('Failed to parse request json.', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async getAttachmentJson(urlOrPath: string): Promise<object> {
    try {
      const emailContent = await this.fetchContent(urlOrPath)
      const mailData = await simpleParser(emailContent)
      const jsonData = await this.extractJson(mailData)
      return jsonData
    } catch (error) {
      this.logger.error(error)
      throw new HttpException('Failed to parse email.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  private async fetchContent(urlOrPath: string): Promise<string> {
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      const response = await axios.get(urlOrPath)

      return response.data
    } else {

      return await readFile(urlOrPath.replace(/\\/g, '/'), 'utf-8')
    }
  }

  private async extractJson(mailData: MailParser.ParsedMail): Promise<object> {
    const attachments = mailData.attachments
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        if (attachment.contentType === 'application/json') {
          const jsonData = JSON.parse(attachment.content.toString('utf-8'))
          return jsonData
        }
      }
    } else if (mailData.html) {
      const url = this.getUrlFromHtml(mailData.html)
      if (url) {
        const response = await axios.get(url)
        return response.data
      }
    }

    throw new HttpException('No JSON found.', HttpStatus.NOT_FOUND)
  }

  private getUrlFromHtml(html: string): string | null {
    const linkRegex = /<a[^>]+href="([^"]+)"/
    const matches = html.match(linkRegex)
    return matches ? matches[1] : null
  }
}
