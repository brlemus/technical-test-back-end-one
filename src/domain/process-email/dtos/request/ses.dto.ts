import { MailDto } from "./mail.dto"
import { ReceiptDto } from "./receipt.dto"

export class SesDto {
    readonly receipt: ReceiptDto
    readonly mail: MailDto
}