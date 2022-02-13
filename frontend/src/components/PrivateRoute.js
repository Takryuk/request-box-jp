import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {useSelector } from 'react-redux'


const PrivateRoute = (props) => {

     const {isAuthenticated, isLoading} = useSelector(state=>state.userLogin)
 

    if(isLoading){
        return  <div></div>;
    }
    if(isAuthenticated){
        return<Route {...props}/>
    }

    return <Redirect to='/'/>

}

export default PrivateRoute
