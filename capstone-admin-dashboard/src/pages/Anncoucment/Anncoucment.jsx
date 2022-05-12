import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addProducts } from "../../redux/apiCalls"
import { userRequest } from "../../ReqMethod"
import "./newProduct.css"

export default function Anncoucment() {
  const [newAnncouemnt, setNewAnncouemnt] = useState({})
  const [posted, setPosted] = useState([])
  const [anncoument, setAnncoument] = useState([])

  const dispatch = useDispatch()
  const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken

  const handleChange = (e) => {
    setNewAnncouemnt((prev) => {
      return { ...prev, [e.target.name]: e.target.value.replace(/(\r\n|\n|\r)/gm, "") }
    })
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await userRequest.post("anncoucment", newAnncouemnt)
      if (res.status === 200) {
        setPosted(res.data)
        setNewAnncouemnt({ message: "" })
      }
    } catch (error) {
      console.error(error)
    }
  }
  // console.log(newAnncouemnt)

  useEffect(() => {
    try {
      const getAnncoucment = async () => {
        const res = await userRequest.get("anncoucment")
        setAnncoument(res.data)
      }
      getAnncoucment()
    } catch (error) {
      console.error(error)
    }
  }, [posted])

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Anncoucment</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <textarea name="message" style={{ width: "600px", height: "150px" }} type="text" value={newAnncouemnt.message} placeholder="Apple Airpods" onChange={handleChange} />
        </div>

        <button className="addProductButton" onClick={handleClick}>
          Post
        </button>
      </form>
      <div>
        <p>{anncoument[0]?.message}</p>
      </div>
    </div>
  )
}
