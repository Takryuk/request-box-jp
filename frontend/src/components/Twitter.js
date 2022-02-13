import React, { useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {withCookies} from 'react-cookie';
import { useDispatch} from 'react-redux';
import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../constants/userConstants';
import axios from 'axios';

const Twitter = (props) => {
    let location = useLocation();
    const dispatch = useDispatch();


    useEffect(() => {
        const values = queryString.parse(location.search);
        const redirect_state = values.redirect_state ? values.redirect_state : null;
        const oauth_token = values.oauth_token ? values.oauth_token : null;
        const oauth_verifier = values.oauth_verifier ? values.oauth_verifier : null;

        if (redirect_state && oauth_token && oauth_verifier) {
            twitterAuthenticate(redirect_state, oauth_token, oauth_verifier);
        }


    }, [location]);

    const twitterAuthenticate = async(redirect_state ,oauth_token, oauth_verifier) => {
        props.cookies.remove('sessionid', {path:'/'})
        props.cookies.remove('csrftoken', {path:'/'})
        props.cookies.remove('jwt-access', {path:'/'})
        props.cookies.remove('jwt-refresh', {path:'/'})

        if (redirect_state && oauth_token && oauth_verifier && !props.cookies.get('jwt-access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };

            const details = {
                redirect_state,
                oauth_token,
                oauth_verifier,
            };
    
            const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
    
            try {
                // const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/twitter/?${formBody}`, config);
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/oauth/complete/twitter/?${formBody}`, config);
    
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    // payload: res.data
                });

                window.location.href = "/"
                // dispatch(loadUser(props.cookies))
    
            } catch (err) {
                dispatch({
                    type: USER_LOGIN_FAIL
                });
            }
        }
    };



    return (
        <div></div>
    );
};

export default withCookies(Twitter);
