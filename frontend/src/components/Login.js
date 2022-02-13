import React, {useState} from 'react'
import {
    TextField,
    Button,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../constants/userConstants'
import axios from 'axios';
import {withCookies} from 'react-cookie';


// import {login} from '../actions/userActions';
const Login = (props) => {
    const dispatch = useDispatch();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authenticationFailed, setAuthenticationFailed] = useState(false)

    const handleSubmit = (event) =>{

        event.preventDefault()
        login(email, password)

    }

    const continueWithTwitter = async () => {
        try {
            // const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/login/twitter/?redirect_uri=${process.env.REACT_APP_API_URL}/oauth/complete/twitter`)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/twitter/?redirect_uri=${process.env.REACT_APP_API_URL}/oauth/complete/twitter`)
            // const res = await axios.get(`${process.env.REACT_APP_API_URL}/oauth/login/twitter/?redirect_uri=${process.env.REACT_APP_API_URL}/oauth/complete/twitter`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {
            

        }
    };


    const login = async(email, password) => {

        props.cookies.remove('jwt-access', {path:'/'})
        props.cookies.remove('jwt-refresh', {path:'/'})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
    
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
            { 'email': email, 'password': password },
            config,
        )
        .then(res=>{
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            })
            props.cookies.set("jwt-access", res.data.access, {path:'/'})
            props.cookies.set("jwt-refresh", res.data.refresh, {path:'/'})
            window.location.href = "/"


        })
        .catch(err=>{
            dispatch({
                type: USER_LOGIN_FAIL,
            })
            setAuthenticationFailed(true)
    
        })
    
    }



    return (
        <div style={{maxWidth:600, margin:"0 auto"}}>
            <div
                style={{
                    marginBottom:30,
                    fontSize:24,
                }} 
            >
                ログイン
            </div>

            <Button 
                fullWidth
                variant="outlined"
                onClick={continueWithTwitter}
                to="/signup"
                style={{
                    marginBottom:60, 
                    fontSize:18,
                    border:"none",
                    backgroundColor:"#25a1f2",
                    color:"#ffffff",
                    maxWidth:800,
                    textTransform:"none",
                }}
            >
                Twitterでログイン
            </Button>
            <form onSubmit={e=>handleSubmit(e)} style={{width:"100%", marginBottom:30}}>

                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                <div style={{marginBottom:20}}>
                    <div>
                        メールアドレス
                    </div>
                    <TextField
                    style={{
                    }}  
                        fullWidth 
                        variant="outlined"
                        required
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        // error
                    />
                </div>

                <div style={{marginBottom:20}}>
                    <div>
                        パスワード
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value= {password}
                        onChange={(e)=>setPassword(e.target.value)}
                        // error
                    />
                </div> 
                {authenticationFailed?
                    <div
                    color="error"
                    variant="body2"
                    style={{
                        marginBottom:10,
                        color:"#f44336",
                        fontSize:14,
                    }}
                
                    >
                        メールアドレスまたはパスワードが間違っています。
                    </div>
                :null}
              
                
              <Button 
                    fullWidth
                    variant="contained" 
                    type="submit"
                    style={{
                        marginBottom:30, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#11b717",
                        color:"#ffffff",
                    }}

                >
                    ログイン
                </Button>

            </form>
                
            <div>
                <Link to="/signup">登録はこちら</Link>
            </div>
            <div>
                <Link to="/password-reset">パスワードをお忘れの方はこちら</Link>
            </div>
            
        </div>
    )
}

export default withCookies(Login);
