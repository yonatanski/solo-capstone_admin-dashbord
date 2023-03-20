import axios from "axios"

const REACT_APP_BE_URL = `${process.env.REACT_APP_BE_URL}/api`
console.log("url", process.env.REACT_APP_BE_URL)

const TOKEN = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.accessToken : undefined

// const wyeneerreuuu = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).User?.isAdmin // true or false
// const wyeneerreuuu = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).accessToken // for token

console.log("ayii", TOKEN)

// const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.User.isAdmin

// console.log("admin", admin)
// console.log("Token", TOKEN)

export const publicRequest = axios.create({
  baseURL: REACT_APP_BE_URL,
})

export const userRequest = axios.create({
  baseURL: REACT_APP_BE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
})
