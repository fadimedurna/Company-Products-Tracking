import "./companyList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompany, getCompanies } from "../../redux/apiCalls";
import { deleteCompanySuccess } from "../../redux/companyRedux";

export default function CompanyList() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  useEffect(() => {
    getCompanies(dispatch);
  }, [dispatch]);

  const handleDelete = async (id) => {
      try {
        if (selectedCompanies.length > 0) {
          // Çoklu silme
          for (const CompanyId of selectedCompanies) {
            await deleteCompany(CompanyId, dispatch);
            dispatch(deleteCompanySuccess(CompanyId));
          }
          setSelectedCompanies([]); // Seçimi sıfırla
        } else {
          // Tekli silme
          await deleteCompany(id, dispatch);
          dispatch(deleteCompanySuccess(id));
        }
      } catch (error) {
        console.error("Error deleting Company(s):", error);
      }
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
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedCompanies(newSelectionModel);
        }}
        rowSelectionModel={selectedCompanies}
        disableRowSelectionOnClick
      />
    </div>
  );
}
