import axios from 'axios';
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    CLEAR_ERRORS
} from '../constants/orderConstants';


export const createOrder = (order) => async( dispatch, getState ) =>{
    try {
        dispatch({type:CREATE_ORDER_REQUEST})
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        
        const { data } = await axios.post('/api/v1/order/new', order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }

}

// Get currently logged in user orders
 export const myOrders = () => async(dispatch) => {
    
    try {
        dispatch({ type: MY_ORDERS_REQUEST })
        const { data } = await axios.get('/api/v1/orders/me')
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })
        
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAILURE,
            payload: error.response.data.message
        })
        
    }

 }



// Get order Details
export const getOrderDetails = (id) => async(dispatch) => {
    
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response.data.message
        })
        
    }

 }

 // Get all orders (Admin)
export const allOrders = () => async(dispatch) => {
    
    try {
        dispatch({ type: ALL_ORDERS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/orders`)
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAILURE,
            payload: error.response.data.message
        })
        
    }

 }


// Update order
 export const updateOrder = (id, orderData) => async( dispatch, getState ) =>{
    try {
        dispatch({type:UPDATE_ORDER_REQUEST})
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }

}

// Delete order
export const deleteOrder = (id) => async( dispatch ) =>{
    try {
        dispatch({type:DELETE_ORDER_REQUEST})

        
        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }

}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}