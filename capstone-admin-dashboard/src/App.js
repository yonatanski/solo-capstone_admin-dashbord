import NavBar from "./Components/navbar/NavBar"
import "./App.css"

import Sidebar from "./Components/sidebar/Sidebar"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Sidebar />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
