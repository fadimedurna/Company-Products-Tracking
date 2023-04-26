import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
    getProducts(dispatch);
    console.log("deleted product", id);
  };

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return <div className='productListItem'>{params.row.name}</div>;
      },
    },
    { field: "category", headerName: "Category", width: 160 },
    {
      field: "quantity",
      headerName: "Amount",
      width: 100,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 100,
    },
    {
      field: "company",
      headerName: "Company",
      width: 200,
      renderCell: (params) => {
        return (
          <div className='productListItem'>
            {params.row.company ? params.row.company.name : "N/A"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon
              className='productListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='productList'>
      <div className='productButtonContainer'>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[8]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8, page: 0 },
          },
        }}
      />
    </div>
  );
}
