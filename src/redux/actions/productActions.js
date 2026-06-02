import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_UPDATE_REVIEW_REQUEST,
    PRODUCT_UPDATE_REVIEW_SUCCESS,
    PRODUCT_UPDATE_REVIEW_FAIL,
    PRODUCT_DELETE_REVIEW_REQUEST,
    PRODUCT_DELETE_REVIEW_SUCCESS,
    PRODUCT_DELETE_REVIEW_FAIL,
} from '../constants/productConstants';

export const listProducts = (search = '', category = '', pageNumber = 1, brand = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        // Encode parameters to handle special characters like '&' in category names
        const searchParam = encodeURIComponent(search);
        const categoryParam = encodeURIComponent(category);
        const brandParam = encodeURIComponent(brand);
        
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        let url = `${baseUrl}/products?search=${searchParam}&category=${categoryParam}&page=${pageNumber}`;
        if (brand && brand !== 'all') {
            url += `&brand=${brandParam}`;
        }
        
        const { data } = await axios.get(url);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        const { data } = await axios.get(`${baseUrl}/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        await axios.delete(`${baseUrl}/products/${id}`, config);

        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct = (productData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        // Use FormData for file uploads
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        const { data } = await axios.post(`${baseUrl}/products`, productData, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateProduct = (id, productData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        const { data } = await axios.put(
            `${baseUrl}/products/${id}`,
            productData,
            config
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        await axios.post(`${baseUrl}/products/${productId}/reviews`, review, config);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        await axios.put(`${baseUrl}/products/${productId}/reviews`, review, config);

        dispatch({
            type: PRODUCT_UPDATE_REVIEW_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteProductReview = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        await axios.delete(`${baseUrl}/products/${productId}/reviews`, config);

        dispatch({
            type: PRODUCT_DELETE_REVIEW_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

