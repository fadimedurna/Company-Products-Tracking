import { useLocation } from "react-router-dom";
import "./company.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCompany } from "../../redux/apiCalls";

export default function Company() {
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    company: "",
  });
  const location = useLocation();
  const companyId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const company = useSelector((state) =>
    state.company.companies.find((company) => company._id === companyId)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updated company: ", inputs);
    updateCompany(companyId, inputs, dispatch);
    navigate("/companies");
  };

  return (
    <div className='company'>
      <div className='companyTop'>
        <div className='companyTopRight'>
          <div className='companyInfoTop'>
            <span className='companyName'>{company.name}</span>
          </div>
          <div className='companyInfoBottom'>
            <div className='companyInfoItem'>
              <span className='companyInfoKey'>id:</span>
              <span className='companyInfoValue'>{companyId}</span>
            </div>
            <div className='companyInfoItem'>
              <span className='companyInfoKey'>legal number:</span>
              <span className='companyInfoValue'>{company.legalNumber}</span>
            </div>
            <div className='companyInfoItem'>
              <span className='companyInfoKey'>country:</span>
              <span className='companyInfoValue'>{company.country}</span>
            </div>
            <div className='companyInfoItem'>
              <span className='companyInfoKey'>website:</span>
              <span className='companyInfoValue'>{company.website}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='companyBottom'>
        <form className='companyForm' onSubmit={handleSubmit}>
          <div className='companyFormLeft'>
            <label>Company Name</label>
            <input
              type='text'
              placeholder={company.name}
              name='name'
              onChange={handleChange}
            />
            <label>Company Legal Number</label>
            <input
              type='text'
              placeholder={company.legalNumber}
              name='legalNumber'
              onChange={handleChange}
            />
            <label>Incorporation Country</label>
            <input
              type='text'
              placeholder={company.country}
              name='country'
              onChange={handleChange}
            />
            <label>Company Website</label>
            <input
              type='text'
              placeholder={company.website}
              name='website'
              onChange={handleChange}
            />
          </div>
          <div className='companyFormRight'>
            <button type='submit' className='companyButton'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
