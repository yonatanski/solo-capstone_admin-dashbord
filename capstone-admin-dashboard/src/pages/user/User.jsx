import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { userRequest } from "../../ReqMethod"
import "./user.css"

export default function User() {
  const params = useParams()
  const userId = params.userId
  const [userDetail, setUserDetail] = useState({})

  const getSingleUser = async () => {
    try {
      const response = await userRequest.get(`users/${userId}`)
      setUserDetail(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSingleUser()
  }, [userId])
  return (
    <>
      <>
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img src={userDetail?.img} alt="" className="userShowImg" />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{userDetail?.username}</span>
                  <span className="userShowUserTitle">{!userDetail?.isAdmin ? "Admin" : "User"}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{userDetail?.username}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">10.12.1999</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">+48 123 456 67</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{userDetail?.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">New York | USA</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input type="text" placeholder={userDetail?.username} className="userUpdateInput" />
                  </div>
                  <div className="userUpdateItem">
                    <label>Full Name</label>
                    <input type="text" placeholder={userDetail?.username} className="userUpdateInput" />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input type="text" placeholder={userDetail?.email} className="userUpdateInput" />
                  </div>
                  <div className="userUpdateItem">
                    <label>Phone</label>
                    <input type="text" placeholder="+1 123 456 67" className="userUpdateInput" />
                  </div>
                  <div className="userUpdateItem">
                    <label>Address</label>
                    <input type="text" placeholder="New York | USA" className="userUpdateInput" />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img className="userUpdateImg" src={userDetail?.img} alt="" />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>
                  <button className="userUpdateButton">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  )
}
