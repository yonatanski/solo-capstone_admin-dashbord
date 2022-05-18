import { publicRequest, userRequest } from "../ReqMethod"
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux"
import { loginStart, loginSuccess, loginFailure } from "./userRedux"

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post("/auth/login", user)
    dispatch(loginSuccess(res.data))
    window.location.assign("/")
  } catch (err) {
    dispatch(loginFailure())
  }
}

export const getProducts = async (dispatch) => {
  dispatch(getProductStart())
  try {
    const res = await publicRequest.get("/products")
    dispatch(getProductSuccess(res.data))
  } catch (err) {
    dispatch(getProductFailure())
  }
}
export const delteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart())
  try {
    const res = await userRequest.delete(`/products/${id}`)
    dispatch(deleteProductSuccess(id))
  } catch (err) {
    dispatch(deleteProductFailure())
  }
}

export const addProducts = async (product, dispatch) => {
  dispatch(addProductStart())
  try {
    const res = await userRequest.post(`/products/`, product)
    dispatch(addProductSuccess(res.data))
  } catch (err) {
    dispatch(addProductFailure())
  }
}
export const editProducts = async (id, product, dispatch) => {
  dispatch(updateProductStart())
  try {
    const res = await userRequest.put(`/products/${id}`, product)
    dispatch(updateProductSuccess(res.data))
  } catch (err) {
    dispatch(updateProductFailure())
  }
}
