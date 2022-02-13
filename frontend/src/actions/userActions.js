import axios from 'axios'
import {
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    // USER_DETAILS_REQUEST,
    // USER_DETAILS_SUCCESS,
    // USER_DETAILS_FAIL,
    // USER_DETAILS_RESET,

    // USER_UPDATE_PROFILE_REQUEST,
    // USER_UPDATE_PROFILE_SUCCESS,
    // USER_UPDATE_PROFILE_FAIL,
    // USER_UPDATE_PROFILE_RESET,

    // USER_LIST_REQUEST,
    // USER_LIST_SUCCESS,
    // USER_LIST_FAIL,
    // USER_LIST_RESET,

    // USER_DELETE_REQUEST,
    // USER_DELETE_SUCCESS,
    // USER_DELETE_FAIL,

    // USER_UPDATE_REQUEST,
    // USER_UPDATE_SUCCESS,
    // USER_UPDATE_FAIL,

    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,

} from '../constants/userConstants'


// export const login = (email, password) => {
//     // dispatch({
//     //     type: USER_LOGIN_REQUEST
//     // })

//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }

//     const { data } = await axios.post(
//         `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
//         { 'email': email, 'password': password },
//         config,
//     )
//     .then(res=>{
//         dispatch({
//             type: USER_LOGIN_SUCCESS,
//             payload: res.data
//         })
//     })
//     .catch(err=>{
//         // dispatch({
//         //     type: USER_LOGIN_FAIL,
//         //     payload: error.response && error.response.data.detail
//         //         ? error.response.data.detail
//         //         : error.message,
//         // })

//     })
//     // localStorage.setItem('userInfo', JSON.stringify(data))

// }

// export const login = (email, password) => async (dispatch) => {
//     try {
//         dispatch({
//             type: USER_LOGIN_REQUEST
//         })

//         const config = {
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         }

//         const { data } = await axios.post(
//             '/api/users/login/',
//             { 'username': email, 'password': password },
//             config
//         )

//         dispatch({
//             type: USER_LOGIN_SUCCESS,
//             payload: data
//         })

//         localStorage.setItem('userInfo', JSON.stringify(data))

//     } catch (error) {
//         dispatch({
//             type: USER_LOGIN_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }

export const loadUser = (cookies)=>async (dispatch)=>{

    // const [cookies, setCookie, removeCookie] = useCookies(['jwt-access']);
    dispatch({
        type:USER_LOGIN_REQUEST
    }) 

    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `JWT ${cookies.get('jwt-access')}`,
            'Accept': 'application/json',               
        },
        // credentials:true
    }

    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`, 
        config,
    ).then(res=>{
        dispatch({
            type:USER_LOAD_SUCCESS,
            payload:res.data,
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
        })
    })
    .catch(err=>{
        dispatch({
            type:USER_LOAD_FAIL,
        })

        dispatch({
            type:USER_LOGIN_FAIL,
        })
    })

};

export const logout = (history, cookies) => async(dispatch) => {
    cookies.remove('jwt-access', {path:'/', domain: "localhost"})
    cookies.remove('jwt-refresh', {path:'/', domain: "localhost"})

    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/logout/`, 
    ).then(res=>{
        cookies.remove('csrftoken', {path:'/', domain: "localhost"})

    })
    .catch(err=>{
    })
    // cookies.remove('sessionid', {path:'/', domain: "localhost"})

    // cookies.remove('csrftoken', {path:'/', domain: "localhost"})


    // localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })

    history.push({
        pathname:'/',
        state:{
            messages:[
                {
                    severity:"success",
                    message:"ログアウトしました。"
                }
            ]
        }
    })
    
}

// export const logout = () => (dispatch) => {
//     localStorage.removeItem('userInfo')
//     dispatch({ type: USER_LOGOUT })
//     dispatch({ type: USER_DETAILS_RESET })
//     dispatch({ type: ORDER_LIST_MY_RESET })
//     dispatch({ type: USER_LIST_RESET })
// }


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const resetPassword = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const resetPasswordConfirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

// export const getUserDetails = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_DETAILS_REQUEST
//         })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.get(
//             `/api/users/${id}/`,
//             config
//         )

//         dispatch({
//             type: USER_DETAILS_SUCCESS,
//             payload: data
//         })


//     } catch (error) {
//         dispatch({
//             type: USER_DETAILS_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }


// export const updateUserProfile = (user) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_UPDATE_PROFILE_REQUEST
//         })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.put(
//             `/api/users/profile/update/`,
//             user,
//             config
//         )

//         dispatch({
//             type: USER_UPDATE_PROFILE_SUCCESS,
//             payload: data
//         })

//         dispatch({
//             type: USER_LOGIN_SUCCESS,
//             payload: data
//         })

//         localStorage.setItem('userInfo', JSON.stringify(data))

//     } catch (error) {
//         dispatch({
//             type: USER_UPDATE_PROFILE_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }


// export const listUsers = () => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_LIST_REQUEST
//         })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.get(
//             `/api/users/`,
//             config
//         )

//         dispatch({
//             type: USER_LIST_SUCCESS,
//             payload: data
//         })


//     } catch (error) {
//         dispatch({
//             type: USER_LIST_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }


// export const deleteUser = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_DELETE_REQUEST
//         })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.delete(
//             `/api/users/delete/${id}/`,
//             config
//         )

//         dispatch({
//             type: USER_DELETE_SUCCESS,
//             payload: data
//         })


//     } catch (error) {
//         dispatch({
//             type: USER_DELETE_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }


// export const updateUser = (user) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_UPDATE_REQUEST
//         })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.put(
//             `/api/users/update/${user._id}/`,
//             user,
//             config
//         )

//         dispatch({
//             type: USER_UPDATE_SUCCESS,
//         })

//         dispatch({
//             type: USER_DETAILS_SUCCESS,
//             payload: data
//         })


//     } catch (error) {
//         dispatch({
//             type: USER_UPDATE_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }