import { Exclude, Expose } from "class-transformer"

@Exclude()
export class TransformedJsonDto {
    @Expose()
    spam: boolean

    @Expose()
    virus: boolean

    @Expose()
    dns: boolean

    @Expose()
    mes: string

    @Expose()
    retrasado: boolean

    @Expose()
    emisor: string

    @Expose()
    receptor: string[]
}