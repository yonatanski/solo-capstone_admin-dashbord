import "./userList.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { userRows } from "../../dummyData"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { userRequest } from "../../ReqMethod"

export default function UserList() {
  const [data, setData] = useState(userRows)
  const [user, setUser] = useState([])

  const getUsers = async () => {
    try {
      const response = await userRequest.get("users")
      setUser(response.data)
      // console.log(orders)
    } catch (error) {}
  }

  useEffect(() => {
    getUsers()
  }, [])

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id))
  // }

  const columns = [
    { field: "_id", headerName: "User ID", width: 200 },
    {
      field: "username",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        )
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return <>{!params.row.isAdmin ? "Admin" : "User"}</>
      },
    },
    {
      field: "createdAt",
      headerName: "Registered Date",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            {/* <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)} /> */}
          </>
        )
      },
    },
  ]

  return (
    <div className="userList">
      <h1 className="addProductTitle"> User List</h1>
      {user && <DataGrid rows={user} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />}
    </div>
  )
}
