import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
    getProducts(dispatch);
    window.location.reload();
    console.log("deleted product", id);
  };

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleSelectionChange = (newSelection) => {
    setSelectedProducts(newSelection);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1, minWidth: 200 },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    { field: "category", headerName: "Category", flex: 1, minWidth: 120 },
    {
      field: "quantity",
      headerName: "Amount",
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.company ? params.row.company.name : "N/A"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <EditNoteIcon
                className="productListEdit"
                sx={{ fontSize: "30px" }}
              />
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitle">
        <h1>Products</h1>
        <div className="productButtonContainer">
          <Link to="/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        {selectedProducts.length > 0 && (
          <button
            className="productDeleteButton"
            onClick={() => console.log("Delete selected", selectedProducts)}
          >
            Delete Selected ({selectedProducts.length})
          </button>
        )}
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
