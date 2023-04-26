import { useState } from "react";
import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    company: "",
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
    const product = { ...inputs };
    console.log(product);
    addProduct(product, dispatch);
    navigate("/products");
  };

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      <form className='addProductForm' onSubmit={handleSubmit}>
        <div className='addProductItem'>
          <label>Product Name</label>
          <input
            name='name'
            type='text'
            placeholder='name'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Product Category</label>
          <input
            name='category'
            type='text'
            placeholder='category'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Product Amount</label>
          <input
            name='quantity'
            type='number'
            placeholder='amount'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Product Unit</label>
          <input
            name='unit'
            type='text'
            placeholder='unit'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Product Company</label>
          <input
            name='company'
            type='text'
            placeholder='company id'
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='addProductButton'>
          Create Product
        </button>
      </form>
    </div>
  );
}
