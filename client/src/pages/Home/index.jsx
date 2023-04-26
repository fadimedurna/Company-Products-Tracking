import Chart from "../../components/Chart";
import FeaturedInfo from "../../components/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/WidgetSm";
import WidgetLg from "../../components/WidgetLg";
import { useState, useMemo, useEffect } from "react";
import { publicRequest } from "../../requestMethods";

export default function Home() {
  const [companyStats, setCompanyStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await publicRequest.get("companies/stats");
        console.log("companies", res.data);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setCompanyStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Company": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart
        data={companyStats}
        title='Company Analytics'
        grid
        dataKey='New Company'
      />
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
