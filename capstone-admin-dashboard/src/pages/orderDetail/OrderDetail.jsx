import { Link, useLocation, useParams } from "react-router-dom"
import "./product.css"
import Chart from "../../Components/chart/Chart"
import { productData } from "../../dummyData"
import { useDispatch, useSelector } from "react-redux"
import { Publish } from "@material-ui/icons"
import { useEffect, useMemo, useState } from "react"
import { userRequest } from "../../ReqMethod"
import OrderDetailCard from "../orderDetailCard/OrderDetailCard"

export default function OrderDetail() {
  const params = useParams()
  const orderId = params.orderId
  const [order, setOrder] = useState([])
  // const [load, setLoad] = useState(false)

  console.log("product id ", orderId)

  console.log(order)

  const getStatus = async () => {
    try {
      const response = await userRequest.get(`orders/${orderId}`)
      setOrder(response.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStatus()
  }, [orderId])

  return <>{order && <OrderDetailCard order={order} orderId={orderId}/>}</>
}
