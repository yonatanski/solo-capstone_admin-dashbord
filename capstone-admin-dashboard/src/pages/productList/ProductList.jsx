import "./productList.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { productRows } from "../../dummyData"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { delteProducts, getProducts } from "../../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux"

export default function ProductList() {
  // const [data, setData] = useState(productRows)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)

  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])
  // console.log(users)

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id))
    delteProducts(id, dispatch)
  }

  const columns = [
    { field: "_id", headerName: "Product ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img[0]} alt="" />
            {params.row.title}
          </div>
        )
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 200,
      renderCell: (params) => {
        return <>{params.row.inStock ? "Yes" : "No"}</>
      },
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)} />
          </>
        )
      },
    },
  ]

  return (
    <div className="productList">
      <h1 className="addProductTitle"> Product List</h1>
      <Link to="/newproduct">
        <button className="productAddButton">Create</button>
      </Link>
      <DataGrid rows={products} disableSelectionOnClick columns={columns} getRowId={(row) => row._id} pageSize={8} checkboxSelection />
    </div>
  )
}
