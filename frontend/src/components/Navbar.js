import React, { Fragment} from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';

import {withCookies} from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../actions/userActions';
import { useHistory } from "react-router-dom";
import {fontFamily} from '../css/css';


const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: 30,
    },
    // title: {
    //   flexGrow: 1,
    // },
  }));


const Navbar = (props) => {

    const classes = useStyles();
    const [anchorMenu, setAnchorMenu] = React.useState(null);
    const {isAuthenticated} = useSelector(state=>state.userLogin)
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.userInfo)


    const handleAccountMenu = (event)=>{
        setAnchorMenu(event.currentTarget);
    };

    const handleClose = (event) => {


        setAnchorMenu(null);
    };

    const handleLogout =()=>{
        dispatch(logout(history, props.cookies))
    }

    // const handleSignup = () =>{
    //     history.push('/signup')
    // }

    return (
        <Fragment>
            <div 
                className={classes.root}
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",

                    backgroundColor:"#F27200"
                }}
            >
                <Button 
                    className={classes.title} 
                    component={RouterLink} to="/"
                    color="inherit"
                    style={{
                        fontFamily:fontFamily.h1,
                        fontSize:24,
                        color:"#fff",
                        marginLeft:20,

                    }}
                >
                    Request Box
                </Button>

                <div 
                    style={{
                        marginRight:30,
                        // margin:"0 0 0 auto"
                    }} 
                    
                >
                    {isAuthenticated?(
                        <Fragment>
                            {/* <Button onClick={handleAccountMenu} color="inherit">アカウント</Button> */}
                            <Button 
                                component={RouterLink} 
                                to={`/request-list`}
                                color="inherit"
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff",
                                }}
                            >
                                リクエスト一覧
                            </Button>
                            <Button 
                                component={RouterLink} 
                                to={`/request-box/${currentUser?currentUser.profile_id:null}`}
                                color="inherit"
                                color="inherit"
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff",
                                }}
                            >
                                リクエストURL
                            </Button>
                            <Button 
                                component={RouterLink} 
                                to='/myaccount' 
                                color="inherit"
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff",
                                }}

                            >
                                アカウント
                            </Button>
                            <Button 
                                onClick={handleLogout} 
                                // color="inherit"
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff",
                                }}
                            >
                                ログアウト
                            </Button>
                        </Fragment>
                    ):(
                        <Fragment>


                            <Button 
                                component={RouterLink} 
                                to='/signup' 
                                color="inherit"
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff"
                                }}
                            >
                                登録
                            </Button>
                            <Button 
                                component={RouterLink} 
                                to='/login' 
                                color="inherit"
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff"
                                }}
                            >
                                ログイン
                            </Button>
                        </Fragment>
                    )}
                </div>
            </div>


            <Menu
                id="simple-menu"
                anchorEl={anchorMenu}
                keepMounted
                open={Boolean(anchorMenu)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MenuItem component={RouterLink} to="/myaccount" onClick={handleClose}>アカウント
                </MenuItem>
                <MenuItem component={RouterLink} to="/selling-list" onClick={handleClose}>出品中の商品
                </MenuItem>

            </Menu>
        </Fragment>
    )
}

export default withCookies(Navbar);
