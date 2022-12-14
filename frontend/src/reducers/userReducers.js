import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAILURE,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CLEAR_ERRORS
 } from '../constants/userConstants'

export const authReducer = (state={ user: {} } , action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:    
            return{
                ...state,
                loading : true,
                isAuthenticated : false
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:        
            return{
                ...state,
                loading : false,
                isAuthenticated : true,
                user: payload
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user: null
            } 
            

        case LOAD_USER_FAILURE:
            return{
                ...state,
                loading: false,
                isAuthenticated:false,
                user:null,
                error:payload
            }
        
        case LOGOUT_FAILURE:
            return {
                ...state,
                error:payload
            }
        
        case LOGIN_FAILURE:    
        case REGISTER_USER_FAILURE:        
            return{
                ...state,
                loading : false,
                isAuthenticated : false,
                user: null,
                error: payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }         
        default:
            return state;
    }

}

export const userReducer = (state = {} , action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:           
            return{
                ...state,
                loading: true
            }
    

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:        
            return{
                ...state,
                loading: false,
                isUpdated: payload
            } 
        
        case DELETE_USER_SUCCESS:        
        return{
            ...state,
            loading: false,
            isDeleted: payload
        }     

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:         
            return{
                ...state,
                // loading: false,
                isUpdated: false
            }
        case DELETE_USER_RESET:         
        return{
            ...state,
            // loading: false,
            isDeleted: false
        }            

        case UPDATE_PROFILE_FAILURE:
        case UPDATE_PASSWORD_FAILURE:
        case UPDATE_USER_FAILURE: 
        case DELETE_USER_FAILURE:        
            return{
                ...state,
                loading: false,
                error: payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }                 
    
    
        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {} , action) => {
    const { type, payload } = action;
    switch (type) {
        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:       
            return{
                ...state,
                loading: true,
                error:null
            }

        case FORGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                message: payload
            }
        case NEW_PASSWORD_SUCCESS:
            return{
                ...state,
                success:payload
            }     

        case FORGOT_PASSWORD_FAILURE: 
        case NEW_PASSWORD_FAILURE:   
            return{
                ...state,
                loading: false,
                error: payload
            }    

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }                 
    
    
        default:
            return state;
    }
}



export const allUsersReducer = (state = {users: [] } , action) => {
    const { type, payload } = action;
    switch (type) {
        case ALL_USERS_REQUEST:       
            return{
                ...state,
                loading: true
            }

        
        case ALL_USERS_SUCCESS:
            return{
                ...state,
                loading:false,
                users:payload
            }     

        
        case ALL_USERS_FAILURE:   
            return{
                ...state,
                loading: false,
                error: payload
            }    

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }                 
    
    
        default:
            return state;
    }
}


export const userDetailsReducer = (state = {user: {} } , action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_DETAILS_REQUEST:       
            return{
                ...state,
                loading: true
            }

        
        case USER_DETAILS_SUCCESS:
            return{
                ...state,
                loading:false,
                user:payload
            }     

        
        case USER_DETAILS_FAILURE:   
            return{
                ...state,
                loading: false,
                error: payload
            }    

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }                 
    
    
        default:
            return state;
    }
}