import Sidebar from "./Components/sidebar/Sidebar"
import NavBar from "./Components/navbar/NavBar"
import "./App.css"
import Home from "./pages/home/Home"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import UserList from "./pages/userList/UserList"
import User from "./pages/user/User"
import NewUser from "./pages/newUser/NewUser"
import ProductList from "./pages/productList/ProductList"
import Product from "./pages/product/Product"
import NewProduct from "./pages/newProduct/NewProduct"
import Login from "./pages/login/Login"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Anncoucment from "./pages/Anncoucment/Anncoucment"
import OrderList from "./pages/orderList/OrderList"
import OrderDetail from "./pages/orderDetail/OrderDetail"

function App() {
  // const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin
  // const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
  // const admin = useSelector((state) => state.user.currentUser.user.email)
  const admin = useSelector((state) => state.user.currentUser?.User?.isAdmin)
  // const [admin, setAdmin] = useState(JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.currentUser).User?.isAdmin)
  // const [admin, setAdmin] = useState(JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.User?.isAdmin)

  console.log(admin)
  // const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.User?.isAdmin
  // useEffect(() => {
  //   let admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.User.isAdmin
  //   if (admin === null) {
  //     admin = false
  //   } else {
  //     admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.User.isAdmin
  //   }
  // }, [])

  // const [admin, setAdmin] = useState(false)
  // console.log(admin)
  // let adminn
  // if (admin === null) {
  //   adminn = false
  // } else {
  //   adminn = true
  // }
  // console.log(adminn)
  // JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken

  return (
    <BrowserRouter>
      {admin ? (
        <>
          <NavBar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="*" exact element={<Navigate replace to="/" />} />

              <Route path="/users" exact element={<UserList />} />

              <Route path="/user/:userId" exact element={<User />} />

              <Route path="/newUser" exact element={<NewUser />} />

              <Route path="/products" exact element={<ProductList />} />

              <Route path="/product/:productId" exact element={<Product />} />

              <Route path="/orders" exact element={<OrderList />} />
              <Route path="/order/:orderId" exact element={<OrderDetail />} />

              <Route path="/newproduct" exact element={<NewProduct />} />
              <Route path="/anncoucnemnt" exact element={<Anncoucment />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" exact element={<Navigate replace to="/login" />} />
          <Route path="*" exact element={<Navigate replace to="/login" />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
