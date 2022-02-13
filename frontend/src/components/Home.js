import React from 'react'
import Grid from '@material-ui/core/Grid';
import DisplayImage from '../utils/DisplayImage';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Home = () => {
    return (
        <div
            style={{
                backgroundColor:"rgba(254, 198, 120, 0.39)",
                paddingTop:1,
                paddingLeft:30,
                paddingBottom:50,
                marginTop:-30,
                marginLeft:-24,
                marginRight:-24,
                
            }}
        >
            <div                
                style={{
                    fontSize:28,
                    marginTop:60,
                    marginBottom:60,
                    textDecoration:"underline",
                }}
            >

            『こんな企画やって欲しい！』と、<br/>
            『視聴者の声を聞きたい』<br/>
            をつなげる

            </div>
            <div
                style={{
                    fontSize:24,
                    marginBottom:20,
                }}
            >
                Request Boxとは？
            </div>
            <div
                style={{
                    marginBottom:30,
                }}
            >
                {/* Request Boxは視聴者の『こんな企画やって欲しい！』とYoutuberやライバーの『視聴者の声を聞きたい！』をつなげるサービスです。<br/> */}
                Request BoxはYoutuberやライバーにやって欲しい企画を匿名で投稿できるサービスです！<br/>
                Youtuberやライバーは視聴者のリクエストを知り、企画につなげることができます！

            </div>
            

            <Grid container>
                <Grid 
                    item 
                    xs={12}
                    md={5}
                    style={{
                        marginBottom:60,
                    }}
                >
                    <div
                        style={{
                            display:"inline-block",
                            backgroundColor:"#fe8d00",
                            padding:10, 
                            fontSize:18,
                            borderRadius:5,
                            marginBottom:20,
                            color:"#ffffff",
                        }}
                    >
                        視聴者は匿名で企画をリクエストできる。
                    </div>
            
                        <DisplayImage
                            src={`${process.env.REACT_APP_API_URL}/static/request_box.png`}
                            maxWidth={400}
                            aspectRatio="1/1"
                            style={{
                                borderRadius:8,
                            }}
                            
                        />
    
                </Grid>

                <Grid item xs={12} md={5}>

                    <div
                        style={{
                            display:"inline-block",
                            backgroundColor:"#fe8d00",
                            padding:10, 
                            fontSize:18,
                            borderRadius:5,
                            marginBottom:20,
                            color:"#ffffff",
                        }}
                    >
                        配信者はリクエストを企画につなげられる。
                    </div>
            
                        <DisplayImage
                            src={`${process.env.REACT_APP_API_URL}/static/request_list.png`}
                            maxWidth={400}
                            aspectRatio="1/1"
                            style={{
                                borderRadius:8,
                            }}
                            
                        />
                </Grid>
            </Grid>

            <div
                style={{
                    marginBottom:30,
                }}
            >
            <div
                style={{
                    fontSize:24,
                    // borderRadius:5,
                    marginBottom:20,
                    // color:"#ffffff",
                }}
            >
                    リクエスト受け付け方法
            </div>
                <DisplayImage
                    src={`${process.env.REACT_APP_API_URL}/static/how_to_receive.jpeg`}
                    maxWidth={600}
                    aspectRatio="1/0.5"
                    style={{
                        borderRadius:8,
                    }}
                    
                />
            </div>



            <div
                style={{
                    marginBottom:30,
                }}
            >
                <div
                    style={{
                        // display:"inline-block",
                        // backgroundColor:"#fe8d00",
                        // padding:10, 
                        fontSize:24,
                        // borderRadius:5,
                        marginBottom:20,
                        // color:"#ffffff",
                    }}
                >
                        リクエスト投稿方法
                </div>
                <DisplayImage
                    src={`${process.env.REACT_APP_API_URL}/static/how_to_post.jpeg`}
                    maxWidth={600}
                    // aspectRatio="1/1"
                    style={{
                        borderRadius:8,
                    }}
                    
                />           
            </div>

            <Button 
                fullWidth
                
                variant="outlined"
                component={RouterLink}
                to="/signup"
                style={{
                    marginBottom:30, 
                    fontSize:18,
                    border:"none",
                    backgroundColor:"#f27201",
                    color:"#ffffff",
                    maxWidth:800,
                }}
            >
                登録して始める
            </Button>
                   
        </div>
    )
}

export default Home
