import React, {Fragment, useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../user/Login';
import { clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert';



const ProtectedRoute = () => {
    const { isAuthenticated,error} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    
     useEffect(() =>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
     },[dispatch, error, alert])
     
     const authenticatedContent =(
        <Fragment>
            <Outlet/>
        </Fragment>
     ) ;
     const unAuthenticatedContent =(
        <Fragment>
           {/* { navigate('/login')} */}
           <Login/>
        </Fragment>
     );   
     return  isAuthenticated ?  authenticatedContent : unAuthenticatedContent ;
        
     
     
}

export default ProtectedRoute