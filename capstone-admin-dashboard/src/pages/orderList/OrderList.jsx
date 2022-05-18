import "./productList.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { productRows } from "../../dummyData"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { delteProducts, getProducts } from "../../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux"
import { userRequest } from "../../ReqMethod"

export default function OrderList() {
  // const [data, setData] = useState(productRows)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)

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
  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id))
    delteProducts(id, dispatch)
  }

  const columns = [
    { field: "_id", headerName: "ORDER ID", width: 220 },
    {
      field: "address",
      headerName: "ADRESS",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.address.source?.address_city},{params.row.address.source?.address_country}-{params.row.address.source?.address_line1}
          </div>
        )
      },
    },
    { field: "amount", headerName: "Amount Paid", width: 200 },
    {
      field: "status",
      headerName: "Delivery Status",
      width: 200,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="productListEdit">Detail</button>
            </Link>
            <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)} />
          </>
        )
      },
    },
  ]

  return (
    <div className="productList">
      <h1 className="addProductTitle"> Order List</h1>
      {orders && <DataGrid rows={orders} disableSelectionOnClick columns={columns} getRowId={(row) => row._id} pageSize={10} checkboxSelection />}
    </div>
  )
}
