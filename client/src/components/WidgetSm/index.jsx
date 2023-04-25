import "./widgetSm.css";
import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await publicRequest.get("companies/?new=true");
        setCompanies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCompanies();
  }, []);

  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Join Companies</span>
      <ul className='widgetSmList'>
        {companies.map((company) => (
          <li className='widgetSmListItem' key={company._id}>
            <div className='widgetSmCompany'>
              <span className='widgetSmCompanyname'>{company.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
