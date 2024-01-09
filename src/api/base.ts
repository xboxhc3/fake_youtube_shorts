import axios from "axios"

export const backend = axios.create({
  baseURL: "http://127.0.0.1:3333/backend",
  timeout: 10000,
})

backend.interceptors.response.use(null, (err) => {
  if (axios.isAxiosError(err) && err.response) return err.response

  throw err
})
