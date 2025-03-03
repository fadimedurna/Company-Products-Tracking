import "./companyList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompany, getCompanies } from "../../redux/apiCalls";

export default function CompanyList() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  useEffect(() => {
    getCompanies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteCompany(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Company",
      flex: 1,
      renderCell: (params) => {
        return <div className="companyListItem">{params.row.name}</div>;
      },
    },
    { field: "legalNumber", headerName: "Legal Number", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "website", headerName: "Website", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/company/" + params.row._id}>
              <EditNoteIcon className="companyListEdit" />
            </Link>
            <DeleteOutlineIcon
              className="companyListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="companyList">
      <div className="companyTitle">
        <h1>Company List</h1>
        <div className="companyButtonContainer">
          <Link to="/newcompany">
            <button className="companyAddButton">Create</button>
          </Link>
        </div>
      </div>
      <DataGrid
        rows={companies}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
