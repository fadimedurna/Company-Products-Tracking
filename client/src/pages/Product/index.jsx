import { useLocation } from "react-router-dom";
import "./product.css";
import { useSelector } from "react-redux";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

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
              <span className='productInfoValue'>{product._id}</span>
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
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input type='text' placeholder={product.name} />
            <label>Product Category</label>
            <input type='text' placeholder={product.category} />
            <label>Product Amount</label>
            <input type='number' placeholder={product.quantity} />
            <label>Product Unit</label>
            <input type='text' placeholder={product.unit} />
            <label>Company</label>
            <input type='text' placeholder={product.company.name} />
          </div>
          <div className='productFormRight'>
            <button className='productButton'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
