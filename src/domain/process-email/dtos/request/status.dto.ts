import { IsString } from 'class-validator'

export class StatusDto {
    @IsString()
    readonly status: string
}