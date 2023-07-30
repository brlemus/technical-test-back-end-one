import { IsArray } from "class-validator"
import { RecordDto } from "./record.dto"


export class requestedJsonDto {
    @IsArray()
    readonly Records: RecordDto[]
}