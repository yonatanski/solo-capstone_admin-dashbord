import { useEffect, useState } from "react"
import { userRequest } from "../../ReqMethod"
import "./widgetLg.css"
import { format } from "timeago.js"

export default function WidgetLg() {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const response = await userRequest.get("orders")
      setOrders(response.data)
      console.log(orders)
    } catch (error) {}
  }

  useEffect(() => {
    getOrders()
  }, [])

  console.log(orders)
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">$ {order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.address.paid ? "approved" : "Pending"} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}
