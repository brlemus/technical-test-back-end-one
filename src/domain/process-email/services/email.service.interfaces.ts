import { requestedJsonDto } from "../dtos/request/requestedJson.dto"
import { TransformedJsonDto } from "../dtos/response/transformedJson.dto"

export abstract class IEmailService {
  abstract getHello(): string
  abstract processJson(input: requestedJsonDto): Promise<TransformedJsonDto[]>
  abstract getAttachmentJson(urlOrPath: string): Promise<object>
}
