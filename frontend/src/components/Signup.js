import React,{useState, Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {
    TextField,
    Button,
    Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

// import {withCookies} from 'react-cookie';

const Signup = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('');
    const [showAlert, setShowAlert] = useState(false)
    // const [validatePassword, setValidatePassword] = useState(true)
    const [validateRePassword, setValidateRePassword] = useState(true)
    // const [passwordHelperTexts, setPasswordHelperTexts] = useState([])
    const [passwordTooShort, setPasswordTooShort] = useState(false)
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
    const [passwordTooCommon, setPasswordTooCommon] = useState(false);    
    const [passwordTooSimilar, setPasswordTooSimilar] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);


    useEffect(()=>{
        if(signupSuccess){
            setShowAlert(true)
        }
    },[signupSuccess])



    const continueWithTwitter = async () => {
        try {
            // const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/login/twitter/?redirect_uri=${process.env.REACT_APP_API_URL}/oauth/complete/twitter`)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/twitter/?redirect_uri=${process.env.REACT_APP_API_URL}/oauth/complete/twitter`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {
            

        }
    };


    const signup = async (username, email, password, re_password) =>{
        const config = {
            headers:{
                'Content-Type': 'application/json',               
                'Accept': 'application/json',               

            },
        }
        const body = JSON.stringify({username, email, password, re_password})

        // try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/users/`,
                body,
                config,
            )
            .then(res =>{
                if(200 <= res.status && res.status <= 299){
                    setSignupSuccess(true)
                    // setIsAuthenticated(true)
                }
            })
            .catch(err=>{
                if(err.response.status===400){

                    if(err.response.data['email'] && err.response.data['email'].includes("user with this email already exists.")){
                        setEmailAlreadyExists(true)
                    }else{
                        setEmailAlreadyExists(false)
                    }
                    if(err.response.data['password']&& err.response.data['password'].includes("This password is too common.")){

                        setPasswordTooCommon(true)
                    }else{
                        setPasswordTooCommon(false)
                    }
                    if(err.response.data['password']&& err.response.data['password'].includes("The password is too similar to the username.")){

                        setPasswordTooSimilar(true)
                    }else{
                        setPasswordTooSimilar(false)
                    }
                }
                
            })
    };

    const handleSubmit = (event) =>{
        event.preventDefault()
        signup(username, email, password, rePassword)
        
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value)
        if(event.target.value.length < 8){
            setPasswordTooShort(true)


        }else{
            setPasswordTooShort(false)
        }
    }

    const handleRePassword = (event)=>{
        setRePassword(event.target.value)
        if(password !==event.target.value){
            setValidateRePassword(false)

        }else{

            setValidateRePassword(true)

        }
    }

    const handlePasswordHelperText = ()=>{
        let helperTexts = []
        
        if(passwordTooCommon){
            // passwordHelperTexts.push("????????????????????????????????????")

            helperTexts.push("???????????????????????????????????????")
        }
        if(passwordTooShort){
            helperTexts.push("8????????????????????????????????????")
        }
        if(passwordTooSimilar){
            helperTexts.push("????????????????????????????????????????????????????????????")
        }

        return (
                helperTexts.map((text)=>{
                    return (
                        <Fragment>
                            {text}<br/>
                        </Fragment>

                    )
                })
        )
        // if(emailAlreadyExists){
        //     // renderTexts.push("??????????????????????????????????????????????????????????????????")
        // }
    }

    const handleAlertClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
        setShowAlert(false)
    }





    return (
        <div style={{maxWidth:600, margin:"0 auto"}}>
            <div
                style={{
                    marginBottom:30,
                    fontSize:24,
                }} 
            >
                ??????
            </div>

            <Button 
                fullWidth
                 
                variant="outlined"
                onClick={continueWithTwitter}
                to="/signup"
                style={{
                    marginBottom:30, 
                    fontSize:18,
                    border:"none",
                    backgroundColor:"#25a1f2",
                    color:"#ffffff",
                    maxWidth:800,
                    textTransform:"none",
                }}
            >
                Twitter?????????
            </Button>
            <div style={{marginBottom:60, fontSize:11}}>
                    ???????????????????????????
                    <a href="https://drive.google.com/file/d/166FxajNHcZ7oQvaXpZsPoQszYOGQztJ_/view?usp=sharing">
                        ????????????
                    </a>???
                    <a href="https://drive.google.com/file/d/1LxnSrXH5M_ejhnU8Zo5UPv6TDKxui0m2/view?usp=sharing">
                        ??????????????????????????????
                    </a>
                    ???????????????????????????????????????
                </div>               


            {/* <button onClick={continueWithTwitter}>
                Twitter???????????????
            </button> */}



            {/* {showAlert? <Alert severity="success">?????????????????????????????????????????????????????????????????????????????????????????????</Alert>:''} */}
            
            
            <form onSubmit={(e) =>handleSubmit(e)} style={{width:"100%", marginBottom:30}}>

                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                <div style={{marginBottom:20}}>
                    <div>
                        ????????????????????????????????????
                    </div>
                    <TextField  
                        required
                        fullWidth 
                        variant="outlined"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>

                <div style={{marginBottom:20}}>
                    <div>
                        ?????????????????????
                    </div>
                    <TextField  
                        fullWidth 
                        variant="outlined"
                        required
                        type="email"
                        value={email}
                        error={emailAlreadyExists}
                        helperText={emailAlreadyExists?"??????????????????????????????????????????????????????????????????":null}
                        onChange={(e)=>setEmail(e.target.value)}

                    />
                </div>

                <div style={{marginBottom:30}}>
                    <div>
                        ??????????????????8???????????????
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={password}
                        error={passwordTooShort || passwordTooCommon}
                        helperText={passwordTooShort  || passwordTooCommon?handlePasswordHelperText():null}
                        onChange={handlePassword}

                    />
                </div>               
                <div style={{marginBottom:30}}>
                    <div>
                        ??????????????????????????????
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        error={!validateRePassword}
                        helperText={!validateRePassword?"???????????????????????????????????????":null}
                        value={rePassword}
                        onChange={handleRePassword}

                    />
                </div>     

                <div style={{marginBottom:30, fontSize:11}}>
                    ???????????????????????????
                    <a href="https://drive.google.com/file/d/166FxajNHcZ7oQvaXpZsPoQszYOGQztJ_/view?usp=sharing">
                        ????????????
                    </a>???
                    <a href="https://drive.google.com/file/d/1LxnSrXH5M_ejhnU8Zo5UPv6TDKxui0m2/view?usp=sharing">
                        ??????????????????????????????
                    </a>
                    ???????????????????????????????????????
                </div>               
                
                <Button 
                    fullWidth
                    variant="contained" 
                    type="submit"
                    style={{
                        marginBottom:10, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#11b717",
                        color:"#ffffff",
                    }}

                >
                    ??????
                </Button>

            </form>
            <div>
                <Link 
                    to="/login"
                    // style={{
                    //     marginBottom:50, 
                    // }}
                
                >????????????????????????</Link>
            </div>


            <Snackbar open={showAlert}  onClose={handleAlertClose}>
            <Alert variant="filled" onClose={handleAlertClose} severity="success">
                ?????????????????????????????????????????????????????????????????????????????????????????????
            </Alert>
               
            </Snackbar>

            
        </div>
    )
}

export default Signup
