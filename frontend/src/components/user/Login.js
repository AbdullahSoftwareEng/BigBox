import React, {Fragment, useState, useEffect} from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';


import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import { login, clearErrors } from '../../actions/userActions';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, user ,error, loading } = useSelector(state => state.auth);
    // const redirect = location.search ? location.search.split('=')[1]: '/'
    const [searchParams,setSearchParams] = useSearchParams();

    console.log(searchParams.get('redirect'));
    const redirect = searchParams.get('redirect')
                     ? '/shipping'
                     :'/' 

    useEffect(()=>{
       
        if(isAuthenticated){
            // navigate('/');
            navigate(redirect);
            
        }
        //error !== "Login first to access this resorce.")
        if(error && error !== "Login first to access this resorce."){
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch, alert, isAuthenticated, error, user,navigate,redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

  return (
    <div  id='content'>
        {loading ? <Loader/> : (
            <Fragment>
                <MetaData title={'login'}/>
                <div className='container'>
                <div className="row wrapper"> 
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                            </div>
                
                            <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                            </div>

                            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
                
                            <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            >
                            LOGIN
                            </button>

                            <Link to="/register" className="float-right mt-3">New User?</Link>
                        </form>
                    </div>
                </div>
                </div>
            </Fragment>
        )}
    </div>
  )
}

export default Login