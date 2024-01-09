import type { AxiosResponse } from "axios"
import type { APIResBody } from "./index"

export type Shorts = {
  id: string
  title: string
  views: number
  channel: string
  thumbnail: string
  link: string
  type: "shorts"
}
export type GetChannelShorts = Promise<AxiosResponse<APIResBody<Shorts[]>, any>>
