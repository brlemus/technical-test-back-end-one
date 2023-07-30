import { IsArray } from "class-validator"
import { SesDto } from "./ses.dto"

export class RecordDto {  
    readonly ses: SesDto
}