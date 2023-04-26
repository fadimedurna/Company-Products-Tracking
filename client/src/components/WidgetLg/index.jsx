import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./widgetLg.css";

export default function WidgetLg() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("products/?new=true");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className='widgetLg'>
      <h3 className='widgetLgTitle'>Latest Products</h3>
      <table className='widgetLgTable'>
        <thead>
          <tr className='widgetLgTr'>
            <th className='widgetLgTh'>Product</th>
            <th className='widgetLgTh'>Quantity</th>
            <th className='widgetLgTh'>Category</th>
            <th className='widgetLgTh'>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, 5).map((product) => (
            <tr className='widgetLgTr' key={product._id}>
              <td className='widgetLgProducts'>
                <span className='widgetLgName'>{product.name}</span>
              </td>
              <td className='widgetLgQuantity'>{product.quantity}</td>
              <td className='widgetLgCategory'>{product.category}</td>
              <td className='widgetLgCompany'>{product.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
