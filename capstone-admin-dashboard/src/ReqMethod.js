import axios from "axios"

const BASE_URL = "http://localhost:3005/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVkZjJiMmM2YWQ5ZWJmY2MwNjU1NzYiLCJyb2xlIjp0cnVlLCJpYXQiOjE2NTAzMjQxNDYsImV4cCI6MTY1MDkyODk0Nn0.UjDKDcV49rnJ3Mq1IgwKI1E6McbwG1yO0aFn5kyPqmo"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
})
