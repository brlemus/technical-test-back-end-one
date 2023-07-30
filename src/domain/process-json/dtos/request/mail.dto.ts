import { IsArray, IsBoolean, IsString } from "class-validator"

export class MailDto {
    @IsString()
    readonly timestamp: string
  
    @IsString()
    readonly source: string
  
    @IsArray()
    readonly destination: string[]  
  }
  