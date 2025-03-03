import { useState, useEffect } from "react";
import "./newProduct.css";
import { addProduct, getCompanies } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    company: "",
  });
  const companies = useSelector((state) => state.company.companies);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getCompanies(dispatch);
  }, [dispatch]);

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
    const product = { ...inputs };
    console.log("new product: ", product);
    addProduct(product, dispatch);
    navigate("/products");
  };

  // Birim seçenekleri
  const unitOptions = ["kg", "g", "l", "ml", "piece", "pack"];

  // Kategori seçenekleri
  const categoryOptions = [
    "electronics",
    "cosmetic",
    "clothing",
    "food",
    "home",
    "beauty",
    "sports",
    "cleaning",
    "health",
    "toys",
    "books",
    "automotive",
    "furniture",
    "Other",
  ];

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Product Name</label>
          <input
            name="name"
            type="text"
            placeholder="name"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Product Category</label>
          <select name="category" onChange={handleChange}>
            <option value="">Select a category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Product Amount</label>
          <input
            name="quantity"
            type="number"
            placeholder="amount"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Product Unit</label>
          <select name="unit" onChange={handleChange}>
            <option value="">Select a unit</option>
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>
                {unit.toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Product Company</label>
          <select name="company" onChange={handleChange}>
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="addProductButton">
          Create Product
        </button>
      </form>
    </div>
  );
}
