import { Link, useLocation, useParams } from "react-router-dom"
import "./product.css"
import Chart from "../../Components/chart/Chart"
import { productData } from "../../dummyData"
import { useDispatch, useSelector } from "react-redux"
import { Publish } from "@material-ui/icons"
import { useEffect, useMemo, useState } from "react"
import { userRequest } from "../../ReqMethod"
import { format } from "timeago.js"

export default function OrderDetailCard({ order, orderId }) {
  const [orderStatus, setOrderStatus] = useState("Delivering")
  const [updatedStatus, setUpdatedStatus] = useState({})
  const updateOrderStatus = async () => {
    try {
      const response = await userRequest.put(`orders/${orderId}`, { status: orderStatus })
      setUpdatedStatus(response.data)
      setOrderStatus("")
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   updateOrderStatus()
  // }, [orderId])

  return (
    <>
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Order Detail</h1>
          <h4 className="productTitle">Order ID-{order._id}</h4>

          <button disabled={orderStatus || updatedStatus.status === "Delivering" ? false : true} onClick={updateOrderStatus} className="productAddButton">
            {updatedStatus.status && order.status === "pending" ? "Add To Delievery" : "Delivering"}
          </button>
        </div>
        <div className="productTop">
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="" className="productInfoImg" />
              <span className="productName text-dark">USER INFORMATION</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">UserID:</span>
                <span className="productInfoValue"> {order.userId} </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">User:</span>
                <span className="productInfoValue"> {order.address?.source.name}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Adress:</span>
                <span className="productInfoValue">
                  {order.address?.source.address_city},{order.address?.source.address_country} <br />
                  {order.address?.source.address_line1}
                </span>
              </div>

              <div className="productInfoItem">
                <span className="productInfoKey">Amount:</span>
                <span className="productInfoValue">${order.amount}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Payment:</span>
                <span className="productInfoValue">{order.address?.paid ? "Paid" : "Unpaid"}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Recipiet:</span>
                <span className="productInfoValue">
                  {" "}
                  <a target="blank" href={order.address?.receipt_url}>
                    Confirmation
                  </a>{" "}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Delivery:</span>
                <span className="productInfoValue">{order.status}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Date:</span>
                <span className="productInfoValue">{format(order.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="productTop">
          <div className="productTopRight">
            {order.products?.products.map((product, i) => (
              <>
                <div key={i} className="productInfoTop">
                  <img src={product.img[0]} alt="" className="productInfoImg" />
                  <span className="productName text-dark"> {product.title}</span>
                </div>

                <div className="productInfoBottom">
                  <div className="productInfoItem">
                    <span className="productInfoKey">ProductID:</span>
                    <span className="productInfoValue"> {product._id} </span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">Price:</span>
                    <span className="productInfoValue"> {product.price}</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">Size:</span>
                    <span className="productInfoValue"> {product.size} </span>
                  </div>

                  <div className="productInfoItem">
                    <span className="productInfoKey">Color:</span>
                    <span className="productInfoValue">{product.color}</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">inStock:</span>
                    <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">Quantity:</span>
                    <span className="productInfoValue">{product.qty}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
