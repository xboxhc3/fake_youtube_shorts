import type { GetChannelShorts } from "../types/youtube"
import { backend } from "./base"

const endpoiont = `/youtube`
const feature = `/shorts`

export async function getChannelShorts(): GetChannelShorts {
  return await backend.get(`${endpoiont}${feature}`)
}
