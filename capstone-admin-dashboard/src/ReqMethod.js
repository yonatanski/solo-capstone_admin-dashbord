import axios from "axios"

const BASE_URL = "http://localhost:3010/api/"

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken

// const wyeneerreuuu = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).User?.isAdmin // true or false
// const wyeneerreuuu = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).accessToken // for token

console.log("ayii", TOKEN)

// const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.User.isAdmin

// console.log("admin", admin)
// console.log("Token", TOKEN)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
})
