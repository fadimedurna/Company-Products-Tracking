import "./companyList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
    console.log("deleted company", id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "company",
      headerName: "Company",
      width: 200,
      renderCell: (params) => {
        return (
          <div className='companyListItem'>
            {params.row ? params.row.name : "N/A"}
          </div>
        );
      },
    },
    { field: "legalNumber", headerName: "Legal Number", width: 200 },
    {
      field: "country",
      headerName: "Country",
      width: 125,
    },
    {
      field: "website",
      headerName: "Website",
      width: 230,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/company/" + params.row._id}>
              <button className='companyListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon
              className='companyListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='companyList'>
      <div className='companyButtonContainer'>
        <Link to='/newcompany'>
          <button className='companyAddButton'>Create</button>
        </Link>
      </div>
      <DataGrid
        rows={companies}
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
