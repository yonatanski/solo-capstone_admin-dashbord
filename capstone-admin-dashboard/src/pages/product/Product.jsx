import { Link, useLocation, useParams } from "react-router-dom"
import "./product.css"
import Chart from "../../Components/chart/Chart"
import { productData } from "../../dummyData"
import { useDispatch, useSelector } from "react-redux"
import { Publish } from "@material-ui/icons"
import { useEffect, useMemo, useState } from "react"
import { userRequest } from "../../ReqMethod"
import { editProducts } from "../../redux/apiCalls"
import axios from "axios"

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

  const [newproduct, setNewproduct] = useState({})
  const [category, setCategory] = useState([])
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])
  const [image, setImage] = useState("")
  const dispatch = useDispatch()
  const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken

  const handleChange = (e) => {
    setNewproduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleCategory = (e) => {
    setCategory(e.target.value.toLowerCase().split(","))
  }
  const handleSize = (e) => {
    setSize(e.target.value.toUpperCase().split(","))
  }
  const handleColor = (e) => {
    setColor(e.target.value.toUpperCase().split(","))
  }
  const handleClick = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    for (const key of Object.keys(image)) {
      formData.append("img", image[key])
    }
    console.log("formdata", formData)
    try {
      // process.env.REACT_APP_BE_URL
      // const response = await fetch(`http://localhost:3010/api/products/uploadProductImg`, {
      //   method: "POST",
      //   body: formData,
      // })
      // if (response.ok) {
      //   const data = await response.json()
      //   console.log(data)
      // }
      const response = await axios({
        method: "post",
        url: "http://localhost:3050/api/products/uploadProductImg",
        data: formData,

        Headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response.data)
      const product = { ...newproduct, categories: category, size, color, img: response.data.img }
      console.log(product)
      editProducts(productId, product, dispatch)
      setNewproduct({ title: "", price: "", desc: "", inStock: "" })
      setCategory([])
      setSize([])
      setColor([])
      setImage("")
    } catch (error) {
      console.error(error)
    }
  }
  console.log(image)

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
            <img src={product.img[0]} alt="" className="productInfoImg" />
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
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{product.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Des:</span>
              <span className="productInfoValue">
                <small>{product.desc}</small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Title</label>
            <input name="title" type="text" value={newproduct.title} placeholder={product.title} onChange={handleChange} />

            <label>Product Description</label>
            <input name="desc" type="text" value={newproduct.desc} placeholder={product.desc} onChange={handleChange} />

            <label>Product Price</label>
            <input name="price" type="number" value={newproduct.price} placeholder={product.price} onChange={handleChange} />

            <label>Product Categories </label>
            <input name="categories" type="text" placeholder="jeans,skirts" onChange={handleCategory} />

            <label>Product Size </label>
            <input name="size" type="text" placeholder="jeans,skirts" onChange={handleSize} />

            <label>Product Color </label>
            <input name="color" type="text" placeholder="L,S,M.." onChange={handleColor} />

            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img[0]} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input name="title" type="file" id="file" multiple onChange={(e) => setImage([image, ...e.target.files])} style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
