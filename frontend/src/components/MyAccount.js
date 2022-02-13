import React , {useState, Fragment, useRef} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {withCookies} from 'react-cookie';
import {
    List, 
    ListItem, 
    ListItemText, 
    Button, 
    Modal,
    TextField,
    Link,
} from '@material-ui/core';
import CreateMultiline from '../utils/CreateMultiline';
import { Link as RouterLink} from 'react-router-dom';
import {useSelector } from 'react-redux'

const useStyles = makeStyles((theme)=>({
   root:{
       maxWidth:720,
   },
   paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  

  

function MyAccount(props) {
    const classes = useStyles();
    const [clicked, setClicked]= useState(null)

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    // const [id, setId] = React.useState('')
    const [username, setUsername] = React.useState('');
    const [profile, setProfile] = React.useState('');
    // const [email, setEmail] = React.useState('');
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [reNewPassword, setReNewPassword] = React.useState('');
    const [newPasswordNotMatch, setNewPasswordNotMatch] = React.useState(false)
    const [profileImage, setProfileImage] = React.useState(null);
    // const [profileImageUrl, setProfileImageUrl] = React.useState(null);
    const [currentPasswordInvalid, setCurrentPasswordInvalid] = useState(false)
    const [newPasswordTooShort, setNewPasswordTooShort] = useState(false);
    const imageRef = useRef(null);

    // const dispatch = useDispatch();
    const userInfo = useSelector(state=>state.userInfo)

    // useEffect(()=>{
    // }, [])

    const handleOpen = (clicked) => {
        setClicked(clicked)
        setOpen(true);
      };
    
      const handleClose = () => {
        setClicked(null)
        setOpen(false);
      };


    // ユーザー名の変更
    const handleUsernameSubmit = async(event) =>{
        event.preventDefault()

        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
                'X-CSRFToken':props.cookies.get('csrftoken'),
            },
        }
        const body = JSON.stringify({username})
        handleClose()
        const res = await axios.patch(
            `${process.env.REACT_APP_API_URL}/users/username/`,
            body,
            config,
        )
        // .then(res=>{
        // })
        .catch(err=>{
            // console.log('err')
        })
    }

    const handleProfileSubmit = async(event) =>{
        event.preventDefault()

        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
                'X-CSRFToken':props.cookies.get('csrftoken'),

            },
        }
        const body = JSON.stringify({profile})
        handleClose()
        const res = await axios.patch(
            `${process.env.REACT_APP_API_URL}/users/profile/`,
            body,
            config,
        )
        // .then(res=>{
        // })
        .catch(err=>{
            // console.log('err')
        })
    }


    const handleImageChange = (event) =>{
        imgProcess(event)

    }

    const imgProcess = (event1)=>{
        const file = event1.target.files[0]
        if(!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function (event) {

            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;

            imgElement.onload = function (e) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                
                const width = imgElement.width;
                const height  =imgElement.height;
                if(width >=1280 && height  >=1280){
                    if(height<=width){
                        canvas.width = Math.round(1280*width/height)
                        canvas.height = 1280
                    }else{
                        canvas.width = 1280
                        canvas.height = Math.round(1280*height/width)
                    }

                    ctx.drawImage(imgElement, 
                        0, 0, 
                        canvas.width, canvas.height,
                    );

                }else{
                    canvas.width = width;
                    canvas.height = height;   
                    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

                }
                const srcEncoded = ctx.canvas.toDataURL("image/jpeg", 0.6);
                document.querySelector("#output").src = srcEncoded;

                ctx.canvas.toBlob((blob)=>{
                    const newFile = new File([blob], file.name)
                    // console.log(newFile.size)
                    setProfileImage(newFile);
                })
            }
          };
    }
    //画像変更
    const handleImageSubmit = async(event) =>{
        event.preventDefault()

        let form_data = new FormData()
        form_data.append('image', profileImage)

        const config = {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
                'X-CSRFToken':props.cookies.get('csrftoken'),

            },
        }
        handleClose()
        const res = await axios.patch(
            `${process.env.REACT_APP_API_URL}/users/image/`,
            form_data,
            config,
        )
        .catch(err=>{
            // console.log('err')
        })
    }

    // パスワードの変更
    const handlePasswordSubmit = async(event) =>{
        event.preventDefault()
        if(newPassword !==reNewPassword){
            setNewPasswordNotMatch(true)
        }else{
            setNewPasswordNotMatch(false)

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
                    'X-CSRFToken':props.cookies.get('csrftoken'),

                },
            }
            const body = JSON.stringify({
                current_password: currentPassword,
                new_password:newPassword, 
                re_new_password:reNewPassword,
            })
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/users/set_password/`,
                body,
                config,
            )
            .then(res=>{
                handleClose()
            })
            .catch(err=>{
                if(err.response.data['current_password'] && err.response.data['current_password'].includes("Invalid password.")){
                    setCurrentPasswordInvalid(true)
                }else{
                    setCurrentPasswordInvalid(false)
                }

                if(err.response.data['new_password'] && err.response.data['new_password'].includes("This password is too short. It must contain at least 8 characters.")){
                    setNewPasswordTooShort(true)
                }else{
                    setNewPasswordTooShort(false)
                }
            })
        }

    }

        
    const handleNewPasswordHelperText = () =>{
        let helperTexts = []
        if(newPasswordTooShort){
            helperTexts.push("8文字以上にしてください。")
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
    }


    const usernameBody = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handleUsernameSubmit} style={{width:"100%", marginBottom:30}}>
            <Typography variant="h6" style={{marginBottom:30}} >ユーザー名変更</Typography>

                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                <div style={{marginBottom:20}}>
                    <Typography>
                        新しいユーザー名
                    </Typography>
                    <TextField  
                        fullWidth 
                        variant="outlined"
                        required
                        value={username}
                        onChange={e=>setUsername(e.target.value)}
                        // error
                    />
                </div>                
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                >
                    変更
                </Button>

            </form>          
        </div>
      );




      const passwordBody = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handlePasswordSubmit} style={{width:"100%", marginBottom:30}}>
                <Typography variant="h6" style={{marginBottom:30}} >パスワード変更</Typography>
                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                <div style={{marginBottom:20}}>
                    <Typography>
                        現在のパスワード
                    </Typography>
                    <TextField  
                        type="password" 
                        fullWidth 
                        variant="outlined"
                        value={currentPassword}
                        onChange={e=>setCurrentPassword(e.target.value)}
                        error={currentPasswordInvalid}
                        helperText={currentPasswordInvalid?"パスワードが違います。":null}
                    />
                </div>

                <div style={{marginBottom:20}}>
                    <Typography>
                        新しいパスワード（8文字以上）
                    </Typography>
                    <TextField  
                        type="password" 
                        fullWidth 
                        variant="outlined"
                        required
                        value={newPassword}
                        onChange={e=>setNewPassword(e.target.value)}
                        error={newPasswordNotMatch || newPasswordTooShort}
                        helperText={newPasswordNotMatch || newPasswordTooShort?handleNewPasswordHelperText():null}
                    />
                </div>

                <div style={{marginBottom:30}}>
                    <Typography>
                        新しいパスワード（確認）
                    </Typography>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={reNewPassword}
                        onChange={e=>setReNewPassword(e.target.value)}
                    />
                </div>               
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                >
                    変更
                </Button>

            </form>        
        </div>
      );
      
      const imageBody = (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h5" style={{marginBottom:30}}>
                プロフィール画像変更

            </Typography>
            <form 
                onSubmit={handleImageSubmit} 
                className={classes.root} 
                // noValidate 
                // autoComplete="off"
            >

                <div 
                    style={{
                        width: "80%",
                        height: "auto",
                        marginBottom:30,
                    }}
                >
                    <img
                        // onLoad={handleImageLoad}
                        id="output"
                        ref={imageRef}
                        style={{
                            display:"block",
                            aspectRatio: "1/0.5625",
                            width:"100%",
                            maxWidth:800,
                            top:0,
                            objectFit: 'cover',
                        }}
                        // src={profileImageUrl}
                        alt=""
                    />
                    {/* <img id="output"src=""></img> */}
                </div>

                <Button
                    variant="contained"
                    component="label"
                    // display="inline-block"
                    // style={{display:"inline-block", margin:"auto"}}
                    // style={{marginBottom:30}}
                >
                    Upload File
                <input
                    type="file"
                    hidden
                    // value={profileImage} 
                    onChange={handleImageChange}
                    // onChange={(e)=>setProfileImage(URL.createObjectURL(e.target.files[0]))}
                />
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    // display="inline-block"
                    // style={{display:"inline-block", margin:"auto"}}
                    // style={{marginBottom:30}}
                >
                    変更
                </Button>
            </form>

          
          {/* <MyAccount /> */}
        </div>
      );

      const profileBody = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handleProfileSubmit} style={{width:"100%", marginBottom:30}}>
            <Typography variant="h6" style={{marginBottom:30}} >プロフィール変更</Typography>

                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                <div style={{marginBottom:20}}>
                    <Typography>
                        新しいプロフィール
                    </Typography>
                    <TextField  
                        multiline
                        fullWidth 
                        variant="outlined"
                        required
                        value={profile}
                        onChange={e=>setProfile(e.target.value)}
                        // error
                    />
                </div>                
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                >
                    変更
                </Button>

            </form>          
        </div>
      );

      const handleBody = ()=>{
          switch (clicked) {
            case 'username':
                return usernameBody;
            // case 'email':
            //     return emailBody;
            case 'password':
                return passwordBody;
            case 'image':
                return imageBody;      
            case 'profile':
                return profileBody;
              default:
                  return <Fragment></Fragment>;
          }
      }

  
    return (
        <div style={{width:"80%", margin:"0 auto"}}>
            <div style={{marginBottom:50}}>
            <Typography variant="h5" style={{marginBottom:30}}>
                マイアカウント

            </Typography>
            <Link component={RouterLink} to={`profile/${userInfo?userInfo.profile_id:null}`}>プロフィール</Link>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem divider>
                        <ListItemText primary={`ユーザー名：${userInfo?userInfo.profile_username:''}`} />
                        <Button 
                            onClick={()=>handleOpen("username")} 
                            size="small" variant="outlined"　
                            style={{
                                display:"inline-block", 
                                marginLeft:"auto"
                            }}
                        >
                            変更
                        </Button>
                        
                    </ListItem>
                    
                    <ListItem divider>
                        <ListItemText 
                            primary={`メールアドレス：${userInfo?userInfo.email:''}`} 
                        />
                        {/* <Button onClick={()=>handleOpen("email")} size="small" variant="outlined"　style={{display:"inline-block", marginLeft:"auto"}}>変更</Button> */}
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="パスワード：（非表示）" />
                        <Button 
                            onClick={()=>handleOpen("password")} 
                            size="small" variant="outlined"　
                            style={{
                                display:"inline-block", 
                                marginLeft:"auto"
                            }}
                        >
                            変更
                        </Button>
                    </ListItem>
                    {/* <ListItem divider>
                        <ListItemText primary="メルカリ：https://..." />
                        <Button 
                            onClick={()=>handleOpen("mercari")} 
                            size="small" variant="outlined"　
                            style={{
                                display:"inline-block", 
                                marginLeft:"auto"
                            }}
                        >
                            変更
                        </Button>
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="ラクマ：https//..." />
                        <Button 
                            onClick={()=>handleOpen("rakuma")} 
                            size="small" variant="outlined"　
                            style={{
                                display:"inline-block", 
                                marginLeft:"auto"
                            }}
                        >
                            変更
                        </Button>
                    </ListItem>

                    <ListItem divider>
                        <ListItemText primary="ジモティ：https://..." />
                        <Button 
                            onClick={()=>handleOpen("jmty")} 
                            size="small" variant="outlined"　
                            style={{
                                display:"inline-block", 
                                marginLeft:"auto"
                            }}
                        >
                            変更
                        </Button>
                    </ListItem> */}

                    <ListItem divider>
                        <ListItemText
                        primary="プロフィール画像"
                        secondary={
                            <React.Fragment>  
                                {userInfo &&userInfo.profile_image?                          
                                    <div 
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    >
                                        <img
                                            // className={classes.img}
                                            style={{
                                                display:"block",
                                                aspectRatio: "1/0.5625",
                                                // position:"absolute",
                                                width:"60%",
                                                // height: "100%",
                                                maxWidth:800,
                                                top:0,
                                                objectFit: 'cover',
                                            }}
                                            src={userInfo?
                                                userInfo.profile_image
                                                // `${process.env.REACT_APP_API_URL}${userInfo.profile_image}`
                                                :''
                                            }
                                            alt=""
                                        />
                                    </div>
                                :null}

                            </React.Fragment> 
                        }
                        />

                        <Button 
                            onClick={()=>handleOpen("image")} 
                            size="small"
                            variant="outlined"　
                            style={{
                                display:"inline-block", 
                                marginLeft:"auto"
                            }}
                        >
                            変更
                            <br/>

                        </Button>


                    </ListItem>

                    <ListItem>
                        <ListItemText 
                            primary='プロフィール' 
                            secondary={userInfo?CreateMultiline(userInfo.profile_profile):null}
                        />
                        <Button 
                            onClick={()=>handleOpen("profile")} 
                            size="small" variant="outlined"　
                            style={{
                                display:"inline-block", 
                                marginLeft:"auto"
                            }}
                        >
                            変更
                        </Button>
                        <br/>

                        <Typography>
                            
                        {/* {userInfo?createMultiline(userInfo.user_profile.profile):null} */}
                        </Typography>
                        
                    </ListItem>                
 
                </List>
                
                </div>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >{handleBody()}
            </Modal>
            
            
            
        </div>
    )
}

export default withCookies(MyAccount);
