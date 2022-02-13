import React, {useState, useEffect} from 'react'
import {
    Typography,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const Activate = ({match}) => {

    const [verified, setVerified] = useState(false);

    const verify = async (uid, token) =>{
        const config = {
            headers:{
                'Content-Type': 'application/json',               
                // 'Accept': 'application/json',               

            },
        }

        const body = JSON.stringify({uid, token})

        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
            body,
            config,
        )
        .then(res=>{
            setVerified(true)
        })
        .catch(err=>{
        })
    };


    const activate = () =>{
        const uid = match.params.uid;
        const token = match.params.token;
        verify(uid, token)
    }

    useEffect(()=>{
        activate()
    },[])

    
    return (
        <div style={{margin:"0 auto",width:"80%"}}>
            {verified?
                <Alert fullWidth severity="success" style={{marginBottom:30}}>
                    アカウントが有効化されました。</Alert>
            :
                <Typography>
                    アカウントを有効化しています。少々お待ちください...
                </Typography>
            }
            <Link to='/'>トップページに戻る</Link>
            
        </div>
    )
}

export default Activate
