import { useLocation } from "react-router-dom";
import "./product.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCompanies, updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    company: "",
  });
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.company.companies);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  useEffect(() => {
    getCompanies(dispatch);
    if (product) {
      setInputs({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        unit: product.unit,
        company: product.company ? product.company._id : "",
      });
    }
  }, [dispatch, product]);

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
    //console.log("updated product: ", inputs);
    updateProduct(productId, inputs, dispatch);
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
    "other",
  ];

  return (
    <div className="product">
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{product.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{productId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">category:</span>
              <span className="productInfoValue">{product.category}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">amount:</span>
              <span className="productInfoValue">{product.quantity}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">unit:</span>
              <span className="productInfoValue">{product.unit}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">company:</span>
              <span className="productInfoValue">
                {product.company ? product.company.name : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product.name}
              name="name"
              onChange={handleChange}
            />
            <label>Product Category</label>
            <select
              name="category"
              onChange={handleChange}
              value={inputs.category || product.category}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label>Product Amount</label>
            <input
              type="number"
              placeholder={product.quantity}
              name="quantity"
              onChange={handleChange}
            />
            <label>Product Unit</label>
            <select
              name="unit"
              onChange={handleChange}
              value={inputs.unit || product.unit}
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <label>Company</label>
            <select
              name="company"
              onChange={handleChange}
              value={inputs.company}
            >
              <option value="">
                {product.company ? product.company.name : "N/A"}
              </option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="productFormRight">
            <button type="submit" className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
