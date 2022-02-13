import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import { resetPasswordConfirm } from '../actions/userActions';

const ResetPasswordConfirm = ({match, cookies}) => {
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    // const [formData, setFormData] = useState({
    //     new_password: '',
    //     re_new_password: ''
    // });

    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setRenewPassword] = useState('')


    // const { new_password, re_new_password } = formData;

    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = event => {
        event.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;
    

        resetPasswordConfirm(uid, token, newPassword, reNewPassword);
    };

    const resetPasswordConfirm = async(uid, token, newPassword, reNewPassword) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':cookies.get('csrftoken'),

            }
        };
    
        const body = JSON.stringify(
            {
                uid, 
                token, 
                new_password:newPassword, 
                re_new_password:reNewPassword,
            }
        );
    
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
            setPasswordChangeSuccess(true);
    
            // dispatch({
            //     type: PASSWORD_RESET_CONFIRM_SUCCESS
            // });
        } catch (err) {
            // dispatch({
            //     type: PASSWORD_RESET_CONFIRM_FAIL
            // });
        }
    };

    if (passwordChangeSuccess) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <form 
                onSubmit={e => onSubmit(e)}
                style={{
                    marginBottom:30, 
                    marginLeft:"auto",
                    marginRight:"auto",
                    maxWidth:600,
                }}
            >
            <div
                style={{
                    fontSize:20,
                    marginBottom:30,
                }}
            >
                パスワード再設定
            </div>
                <div 
                    style={{
                        marginBottom:30, 

                    }}
                >
                    <div>
                        新しいパスワード
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        minLength='6'
                    />
                </div>                     
                <div 
                    style={{
                        marginBottom:30, 
                        maxWidth:600,
                    }}
                >
                    <div>
                        新しいパスワード（再入力）
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={reNewPassword}
                        onChange={e => setRenewPassword(e.target.value)}
                        minLength='6'
                        required
                    />
                </div>   
                <Button 
                    fullWidth
                    variant="contained" 
                    type="submit"
                    onSubmit={onSubmit}
                    style={{
                        marginBottom:30, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#11b717",
                        color:"#ffffff",
                    }}

                >
                    パスワードリセット
                </Button>            
            </form>
        </div>
    );
};

export default withCookies(ResetPasswordConfirm);
