import { useLocation } from "react-router-dom";
import "./product.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../redux/apiCalls";

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

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
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
    const product = { ...inputs };
    console.log("updated product: ", product);
    console.log("product id: ", productId);
    updateProduct(productId, product, dispatch);
    navigate("/products");
  };

  return (
    <div className='product'>
      <div className='productTop'>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <span className='productName'>{product.name}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>id:</span>
              <span className='productInfoValue'>{productId}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>category:</span>
              <span className='productInfoValue'>{product.category}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>amount:</span>
              <span className='productInfoValue'>{product.quantity}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>unit:</span>
              <span className='productInfoValue'>{product.unit}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>company:</span>
              <span className='productInfoValue'>{product.company.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm' onSubmit={handleSubmit}>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input
              type='text'
              placeholder={product.name}
              name='name'
              onChange={handleChange}
            />
            <label>Product Category</label>
            <input
              type='text'
              placeholder={product.category}
              name='category'
              onChange={handleChange}
            />
            <label>Product Amount</label>
            <input
              type='number'
              placeholder={product.quantity}
              name='quantity'
              onChange={handleChange}
            />
            <label>Product Unit</label>
            <input
              type='text'
              placeholder={product.unit}
              name='unit'
              onChange={handleChange}
            />
            <label>Company Id</label>
            <input
              type='text'
              placeholder={product.company._id}
              name='company'
              onChange={handleChange}
            />
          </div>
          <div className='productFormRight'>
            <button type='submit' className='productButton'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
