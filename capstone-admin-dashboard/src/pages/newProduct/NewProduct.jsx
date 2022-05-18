import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addProducts } from "../../redux/apiCalls"
import { userRequest } from "../../ReqMethod"
import "./newProduct.css"

export default function NewProduct() {
  const [newproduct, setNewproduct] = useState({})
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
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
  const handleTitleChange = (e) => {
    setTitle((prev) => {
      return { ...prev, [e.target.name]: e.target.value.replace(/(\r\n|\n|\r)/gm, "") }
    })
  }
  const handleDescriptionChange = (e) => {
    setDesc((prev) => {
      return { ...prev, [e.target.name]: e.target.value.replace(/(\r\n|\n|\r)/gm, "") }
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
      const product = { ...newproduct, title: title.title, desc: desc.desc, categories: category, size, color, img: response.data.img }
      console.log(product)
      addProducts(product, dispatch)
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

  // useEffect(() => {
  //   UplaodIMage()
  // }, [])

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input name="title" type="file" id="file" multiple onChange={(e) => setImage([image, ...e.target.files])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          {/* <input name="title" type="text" value={newproduct.title} placeholder="Apple Airpods" onChange={handleChange} /> */}
          <textarea name="title" style={{ width: "450px", height: "100px" }} type="text" value={newproduct.title} placeholder="Title of product" onChange={handleTitleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea name="desc" style={{ width: "450px", height: "100px" }} type="text" value={newproduct.desc} placeholder="Description..." onChange={handleDescriptionChange} />
          {/* <input name="desc" type="text" value={newproduct.desc} placeholder="Description..." onChange={handleChange} /> */}
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" value={newproduct.price} placeholder="Price" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input name="categories" type="text" placeholder="jeans,skirts" onChange={handleCategory} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input name="size" type="text" placeholder="L,S,M.." onChange={handleSize} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input name="color" type="text" placeholder="Black,White,Blue" onChange={handleColor} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button className="addProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  )
}
