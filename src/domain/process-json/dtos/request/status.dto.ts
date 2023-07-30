import { IsOptional, IsString, ValidateNested } from 'class-validator'

export class StatusDto {
    @IsString()
    readonly status: string
}