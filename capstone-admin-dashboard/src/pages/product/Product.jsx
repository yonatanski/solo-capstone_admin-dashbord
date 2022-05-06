import { Link, useLocation, useParams } from "react-router-dom"
import "./product.css"
import Chart from "../../Components/chart/Chart"
import { productData } from "../../dummyData"
import { useDispatch, useSelector } from "react-redux"
import { Publish } from "@material-ui/icons"
import { useEffect, useMemo, useState } from "react"
import { userRequest } from "../../ReqMethod"

export default function Product() {
  const params = useParams()
  const productId = params.productId
  const [productStatus, setProductStatus] = useState([])
  console.log("product id ", productId)

  const product = useSelector((state) => state.product.products.find((product) => product._id === productId))
  console.log(product)
  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"], [])

  const getStatus = async () => {
    try {
      const response = await userRequest.get(`orders/income?productId=${productId}`)
      const list = response.data.sort((a, b) => {
        return a._id - b._id
      })
      list.map((item) => setProductStatus((prev) => [...prev, { name: MONTHS[item._id - 1], Sales: item.total }]))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getStatus()
  }, [productId, MONTHS])
  console.log(productStatus)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productStatus} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName text-dark">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{productId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock ? "Yes" : "NO"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product.title} />

            <label>Product Description</label>
            <input type="text" placeholder={product.desc} />

            <label>Product Price</label>
            <input type="text" placeholder={product.price} />

            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}
