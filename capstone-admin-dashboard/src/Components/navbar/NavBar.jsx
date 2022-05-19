import React from "react"
import "./navbar.css"
import { NotificationsNone, Language, Settings } from "@material-ui/icons"
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft text-center">
          <span className="logo">Gebya Shop Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Link to={"/profile/:me"}>
            <img src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="" className="topAvatar" />
          </Link>
        </div>
      </div>
    </div>
  )
}
