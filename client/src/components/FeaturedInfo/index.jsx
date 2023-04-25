import "./featuredInfo.css";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [companyTotal, setCompanyTotal] = useState([]);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const res = await publicRequest.get("companies/total");
        console.log("res", res);
        setCompanyTotal(res.data);
      } catch {}
    };
    getCompany();
  }, []);

  console.log("company total: ", companyTotal);

  return (
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Total Company Number</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>{companyTotal}</span>
          <span>number of companies in the system.</span>
        </div>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Sales</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>$4,415</span>
        </div>
      </div>
    </div>
  );
}
