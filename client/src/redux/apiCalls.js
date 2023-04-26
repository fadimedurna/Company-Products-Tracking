import { publicRequest } from "../requestMethods";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  deleteCompanyStart,
  deleteCompanySuccess,
  deleteCompanyFailure,
  getCompanyStart,
  getCompanySuccess,
  getCompanyFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
  addCompanyStart,
  addCompanySuccess,
  addCompanyFailure,
} from "./companyRedux";

//get products
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

//delete product
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await publicRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

//update product
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await publicRequest.patch(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id: id, product: res.data }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

//add product
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await publicRequest.post("/products", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//get products
export const getCompany = async (dispatch) => {
  dispatch(getCompanyStart());
  try {
    const res = await publicRequest.get("/companies");
    dispatch(getCompanySuccess(res.data));
  } catch (err) {
    dispatch(getCompanyFailure());
  }
};

//delete product
export const deleteCompany = async (id, dispatch) => {
  dispatch(deleteCompanyStart());
  try {
    const res = await publicRequest.delete(`/companies/${id}`);
    dispatch(deleteCompanySuccess(res.data));
  } catch (err) {
    dispatch(deleteCompanyFailure());
  }
};

//update product
export const updateCompany = async (id, product, dispatch) => {
  dispatch(updateCompanyStart());
  try {
    //const res = await publicRequest.patch(`/products/${id}`, product);
    dispatch(updateCompanySuccess({ id: id, product: product }));
  } catch (err) {
    dispatch(updateCompanyFailure());
  }
};

//add product
export const addCompany = async (product, dispatch) => {
  dispatch(addCompanyStart());
  try {
    const res = await publicRequest.post("/products", product);
    dispatch(addCompanySuccess(res.data));
  } catch (err) {
    dispatch(addCompanyFailure());
  }
};
