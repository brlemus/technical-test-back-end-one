import { requestedJsonDto } from "../dtos/request/requestedJson.dto"
import { TransformedJsonDto } from "../dtos/response/transformedJson.dto"

export abstract class IProcessJsonService {
  abstract getHello(): string
  abstract processJson(input: requestedJsonDto): Promise<TransformedJsonDto[]>
}
