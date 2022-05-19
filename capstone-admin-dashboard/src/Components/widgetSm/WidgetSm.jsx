import "./widgetSm.css"
import { Visibility } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { userRequest } from "../../ReqMethod"
import { Link } from "react-router-dom"

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await userRequest.get("users/?new=true")
      setUsers(response.data)
      console.log(users)
    } catch (error) {}
  }
  useEffect(() => {
    getUsers()
  }, [])
  console.log(users)

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img src={user.img} alt={user.username} className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{!user.isAdmin ? "Admin" : "User"}</span>
            </div>
            <Link to={"/user/" + user._id}>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
