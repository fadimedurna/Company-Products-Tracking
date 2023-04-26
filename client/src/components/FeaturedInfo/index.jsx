import "./featuredInfo.css";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [companyTotal, setCompanyTotal] = useState([]);
  const [productTotal, setProductTotal] = useState([]);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const res = await publicRequest.get("companies/total");
        //console.log("res", res);
        setCompanyTotal(res.data);

        const res2 = await publicRequest.get("products/total");
        //console.log("res2", res2);
        setProductTotal(res2.data);
      } catch {}
    };
    getCompany();
  }, []);

  console.log("company total: ", companyTotal);
  console.log("product total: ", productTotal);

  return (
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Total Company Number</span>
        <div className='featuredTotalContainer'>
          {companyTotal > 0 ? (
            <span className='featuredTotal'>{companyTotal}</span>
          ) : (
            <span className='featuredTotal'>0</span>
          )}
        </div>
        <span className='featuredSub'>Number of companies in the system.</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Total Product Number</span>
        <div className='featuredTotalContainer'>
          {productTotal > 0 ? (
            <span className='featuredTotal'>{productTotal}</span>
          ) : (
            <span className='featuredTotal'>0</span>
          )}
        </div>
        <span className='featuredSub'>Number of products in the system.</span>
      </div>
    </div>
  );
}
