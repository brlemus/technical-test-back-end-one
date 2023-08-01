import { IsBoolean, IsInt, IsString } from "class-validator"
import { StatusDto } from "./status.dto"

export class ReceiptDto {
    @IsString()
    readonly timestamp: string

    @IsInt()
    readonly processingTimeMillis: number
  
    @IsBoolean()
    readonly spamVerdict: StatusDto
  
    @IsBoolean()
    readonly virusVerdict: StatusDto
  
    @IsBoolean()
    readonly spfVerdict: StatusDto
  
    @IsBoolean()
    readonly dkimVerdict: StatusDto
  
    @IsBoolean()
    readonly dmarcVerdict: StatusDto
  }