import React, {useEffect} from 'react'
import Navbar from '../components/Navbar';
import { Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {
    loadUser,
} from '../actions/userActions';
import {useDispatch} from 'react-redux';
import {withCookies} from 'react-cookie';
import AlertMessage from '../components/AlertMessage';
import Footer from '../components/Footer';

const Layout = ({children, location, cookies}) => {

    const dispatch = useDispatch()

    // const {
    //     checkAuthenticated,
    // } = useContext(ApiContext)

    // useEffect(() => {
    //     checkAuthenticated();
    //     isAuthenticated
    //     // load_user();
    // }, [isAuthenticated]);

    // const {
    //     checkAuthenticated,
    //     // isAuthenticated,
    //     loadUser,
    //  } = useContext(ApiContext)

    //  useEffect(() => {
    //     // setIsLoading(true)
    //     checkAuthenticated();

    //     // load_user();
    // }, []);

    useEffect(()=>{
        dispatch(loadUser(cookies))
    },[])

    return (
        <div>
            <Navbar/>
            <Container maxWidth="lg">
                {location.state?<AlertMessage location={location}/>:null}
                {children}
            </Container>
            <Footer/>
            
        </div>
    )
}

export default  withRouter(withCookies(Layout));
