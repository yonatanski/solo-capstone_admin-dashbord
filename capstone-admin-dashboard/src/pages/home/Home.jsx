import Chart from "../../Components/chart/Chart"
import FeaturedInfo from "../../Components/featuredInfo/FeaturedInfo"
import "./home.css"
import { userData } from "../../dummyData"
import WidgetSm from "../../Components/widgetSm/WidgetSm"
import WidgetLg from "../../Components/widgetLg/WidgetLg"
import { useEffect, useMemo, useState } from "react"
import { userRequest } from "../../ReqMethod"

export default function Home() {
  const [userStatus, setUserStatus] = useState([])

  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"], [])
  const getStatus = async () => {
    try {
      const response = await userRequest.get("/users/stats")
      response.data.map((item) => setUserStatus((prev) => [...prev, { name: MONTHS[item._id - 1], "Active User": item.total }]))
      console.log(userStatus)
    } catch (error) {}
  }

  useEffect(() => {
    getStatus()
  }, [MONTHS])
  console.log(userStatus)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStatus} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}
