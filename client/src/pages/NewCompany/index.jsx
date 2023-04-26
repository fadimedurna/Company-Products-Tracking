import { useState } from "react";
import "./newCompany.css";
import { addCompany } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NewCompany() {
  const [inputs, setInputs] = useState({
    name: "",
    legalNumber: "",
    country: "",
    website: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const company = { ...inputs };
    addCompany(company, dispatch);
    navigate("/companies");
  };

  return (
    <div className='newCompany'>
      <h1 className='addCompanyTitle'>New Company</h1>
      <form className='addCompanyForm' onSubmit={handleSubmit}>
        <div className='addCompanyItem'>
          <label>Company Name</label>
          <input
            name='name'
            type='text'
            placeholder='Name'
            onChange={handleChange}
          />
        </div>
        <div className='addCompanyItem'>
          <label>Country</label>
          <input
            name='country'
            type='text'
            placeholder='Country'
            onChange={handleChange}
          />
        </div>
        <div className='addCompanyItem'>
          <label>Legal Number</label>
          <input
            name='legalNumber'
            type='string'
            placeholder='Legal Number'
            onChange={handleChange}
          />
        </div>
        <div className='addCompanyItem'>
          <label>Website</label>
          <input
            name='website'
            type='text'
            placeholder='website'
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='addCompanyButton'>
          Create Company
        </button>
      </form>
    </div>
  );
}
