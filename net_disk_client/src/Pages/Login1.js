import React, { Component, useState, useEffect } from 'react';
import { Form, Checkbox, Card, Input, Icon, Button, Row, Col, Spin, message, Upload } from 'antd';
import '../Styles/pages/Login1.css'
import servicePath from '../config/apiUrl';
import Path from '../config/api'
import axios from 'axios'
import cookie from "react-cookies";
import 'animate.css'
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons'
// import { Animated } from "react-animated-css";


// import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const Login1 = (props) => {
    const onSearch = value => console.log(value);
    const { Search } = Input;



    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // 登录注册页面是否可见
    const [isLoginshow, setIsLoginshow] = useState(false)
    const [isUpshow, setIsUpshow] = useState(true)
    const [isReshow, setIsReshow] = useState(true)
    const [isForgetshow, setIsForgetshow] = useState(true)
    // 找回密码逻辑
    const [emailOfforget,setEmailOfforget] = useState('')
    const [passwordFind,setPasswordFind] = useState('')
    const [repasswordFind,setRepasswordFind] = useState('')
    
// 注册
    const [emailCode,setEmailCode] =useState('')
    const [trueEmailcode,setTrueEmailcode] = useState('')
    const [isCodeRight,setIsCodeRight] = useState(false)
    const [userNameRegister, setUserNameRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const [repasswordRegister, setRepasswordRegister] = useState('')
    const [registerEmail,setRegisterEmail]=useState('')
    const [isLoading1, setIsLoading1] = useState(false)

    // 修改密码验证码是否通过
    const [isEmailCheck,setIsEmailCheck] = useState(false)
    const [isCodeCheck,setIsCodeCheck]=useState(false)

    const checkLogin = () => {
        setIsLoading(true)
        console.log(userName)
        if (!userName) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        } else if (!password) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'post',
            url:
                // Path.checkuserLogin,
                // servicePath.checkuserLogin,
                // 'http://47.107.95.82/tf/upload-static',
                // 'http://47.107.108.95:7001/admin/checkLogin',
                // 'http://47.107.95.82/banana/account-center/common/login',
                // 'http://47.107.95.82/banana/account-center/common/register',
                'http://47.107.95.82/banana/account-center/e-validate',
            data: dataProps,
            // header: { 'Access-Control-Allow-Origin': '*' },

        }).then(
            res => {
                setIsLoading(false)
                if (res.data.data == '登录成功') {
                    localStorage.setItem('openId', res.data.openId)
                    let cookieTime = new Date(new Date().getTime + 24 * 3600 * 1000);
                    cookie.save("id", res.data.list[0].id, { expires: cookieTime });
                    cookie.save("username", res.data.list[0].userName, { expires: cookieTime });
                    sessionStorage.setItem("data", "登陆成功")
                    props.history.push('/index')
                    console.log(res.data)

                } else {
                    message.error('用户名密码错误')
                    console.log(res.data)

                    props.history.push('/')
                }
            }
        )

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    // 发送验证码
    const sendcode = ()=>{
        setIsLoading(true)
        let dataProps = {
            'email':registerEmail,
            'type':1
        }
        axios({
            method:'post',
            url: 
             'http://47.107.95.82/banana/account-center/e-validate',
            data: dataProps,
            // header: { 'Access-Control-Allow-Origin': '*' },
        }).then(res=>{
            setIsLoading(false)
            console.log(res.data)

        })


        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    // 注册按钮
    const checkRegister = () => {

        setIsLoading(true)
        if (!userNameRegister) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        } else if (!passwordRegister) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        else if (!registerEmail) {
            message.error('邮箱不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        if (userNameRegister.length < 6) {
            message.error('用户名不能小于6位')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        } else if (passwordRegister.length < 6) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        else if(registerEmail.indexOf('@')=='-1'){
            message.error('邮箱格式错误')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        else{
            let dataProps = {
                'username': userNameRegister,
                'password': passwordRegister,
                'email':registerEmail,
                'invite_code':emailCode
            }
            axios({
                method: 'post',
                url: 
                // servicePath.checkuserRegister,
                'http://47.107.95.82/banana/account-center/common/register',
                data: dataProps,
                header: { 'Access-Control-Allow-Origin': '*' },

    
            }).then(
                res => {
                    setIsLoading(false)
                    if (res.data.isSuccess) {
                        console.log(res.data)
                        message.success('注册成功')
    
                    } else {
                        console.log(res.data)
                        message.error('注册失败')
                    }
                }
            )
        }
        
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    useEffect(() => {
        const signInBtn = document.getElementById("signIn");
        const signUpBtn = document.getElementById("signUp");
        const fistForm = document.getElementById("form1");
        const secondForm = document.getElementById("form2");
        const container = document.querySelector(".container");

        signInBtn.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });

        signUpBtn.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });

        fistForm.addEventListener("submit", (e) => e.preventDefault());
        secondForm.addEventListener("submit", (e) => e.preventDefault());
    })
    // 接受文件
    const receiveFiles = () => {
        if (!isReshow) {
            setIsLoginshow(false)
            setIsUpshow(true)
            setIsReshow(!isReshow)
        }
        else {
            setIsReshow(!isReshow)
            setIsUpshow(!isUpshow)
        }

    }
    const toUpload = () => {
        setIsUpshow(!isUpshow)
        setIsReshow(!isReshow)

    }
    function enterDown(e) {
        var evt = window.event || e;
        if (evt.keyCode == 13) {
            console.log('www')
        }
    }
    const propss = {
        name: 'file',
        action: 'http://47.107.95.82/tf/upload-static',
        header: { 'Access-Control-Allow-Origin': 'http://localhost:3000/' },


        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const forgotPass = () => {
        setIsLoginshow(true)
        setIsForgetshow(false)
        setIsUpshow(true)
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // 修改密码方法
    const checkChange = ()=>{
        if(!isEmailCheck){
            message.error('邮箱输入错误')
        }
        else if(isCodeCheck){
            message.error('验证码错误')
        }
        else{

        }
       
    }
    return (
        <div className='main_index'>
            {/* <div className='box animated fadeInDown'>ss</div> */}
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
            </head>
            <div className='loginToptip'>
                <Row type="flex" justify="center">
                    <Col xs={6} sm={6} md={12} lg={12} xl={12}>

                        <div className='loginLogo '>
                            <span key='sss' className='animated fadeInLeftBig'>
                                香蕉快传
                            </span>
                        </div>
                    </Col>

                    <Col offset={0} className='person_data' xs={8} sm={8} md={12} lg={12} xl={12}>
                        <div className='loginButton'>
                            <Button onClick={() => {
                                if (!isForgetshow) {
                                    setIsUpshow(true)
                                    setIsLoginshow(false)
                                    setIsReshow(true)
                                    setIsForgetshow(true)
                                }
                                else if (!isReshow) {
                                    setIsLoginshow(false)
                                    setIsUpshow(true)
                                    setIsReshow(!isReshow)
                                }
                                else {
                                    setIsLoginshow(!isLoginshow)
                                    setIsUpshow(!isUpshow)
                                    setIsReshow(true)
                                    setIsForgetshow(true)
                                }



                            }}>注册/登录</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='uploadFiles animated animate__bounceInLeft'
                hidden={isUpshow}
                id='upload_div'>
                <Row type="flex" justify="center"  >
                    <Col offset={0} xs={16} sm={16} md={16} lg={16} xl={16}>
                        <Upload {...propss}>
                            <Button className='bt1' icon={<PlusOutlined style={{ fontSize: '1.7rem', marginLeft: '1.3vw' }} />}>上传文件</Button>
                        </Upload>
                    </Col>
                    <Col offset={0} xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Button onClick={receiveFiles} className='bt2'>接受文件</Button>
                    </Col>

                </Row>


            </div>
            {/* 接受文件测试 */}
            <div className='uploadFiles animated animate__bounceInLeft'
                hidden={isReshow}
                id='upload_div'>
                <div className='receive_div'>
                    <input onKeyDown={enterDown} bordered='false' placeholder='请输入接受文件口令' className='receive_input'></input>
                    <CloseCircleOutlined onClick={toUpload} className='closeBtn' style={{ fontSize: '1.7rem', marginLeft: '1rem' }} />
                </div>


            </div>
            <div hidden={isForgetshow} className='forget_div animated animate__fadeInUp'>
                <h2 className='forgetTitle'>Forgot password</h2>
                <Form
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='form2'
                    layout='horizontal'
                >
                    
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}>
                        <Search
                            enterButton="发送"
                            placeholder="input email text"
                            allowClear
                            onSearch={onSearch}
                        />
                    </Form.Item>

                    <Form.Item
                        label="验证码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your !',
                            },
                        ]}
                    >
                        <Input
                        allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your !',
                            },
                        ]}
                    >
                        <Input.Password 
                        allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your !',
                            },
                        ]}
                    >
                        <Input.Password 
                        allowClear/>
                    </Form.Item>



                    <Form.Item
                        wrapperCol={{
                            offset: 7,
                            span: 10,
                        }}
                    >
                        <button className='btn1' onClick={checkChange}>修改</button>
                    </Form.Item>
                </Form>
            </div>
            

            <Spin tip="Loading..." spinning={isLoading}>
                <div hidden={isLoginshow} className="container right-panel-active animated animate__fadeInDown">
                    <div className="container__form container--signup">
                        <form action="#" className="form" id="form1">
                            <h2 className="form_tiitle animated fadeInDown">Sign Up</h2>
                          <div className='dddd'>
                            <input type="text" onChange={(e) => { setUserNameRegister(e.target.value) }} placeholder="输入用户名" className="input" />
                            <input type="password" onChange={(e) => { setPasswordRegister(e.target.value) }} placeholder="输入密码" className="input" />
                            <input  onChange={(e) => { setRegisterEmail(e.target.value) }} placeholder="请输入邮箱" className="input" />
                            <Input.Group compact>

    <input  onChange={(e) => { setEmailCode(e.target.value) }} placeholder="请输入验证码" className="input1" />
    <Button onClick={sendcode} className='bt_sendcode' type="primary">发送</Button>

    </Input.Group>
    </div>

                            <button onClick={checkRegister} className="btn">Sign Up</button>
                        </form>
                    </div>


                    <div className="container__form container--signin ">
                        <form action="#" className="form" id="form2">
                            <h2 className="form_title">Sign In</h2>
                            <input id='userName' onChange={(e) => { setUserName(e.target.value) }} placeholder="Username" className="input" />
                            <input id='password' type="password" onChange={(e) => { setPassword(e.target.value) }
                            } placeholder="Password" className="input" />
                            <span onClick={forgotPass}>Forgot your password?</span>
                            <button onClick={checkLogin} className="btn">Sign In</button>
                        </form>
                    </div>


                    <div className="container__overlay">
                        <div className="overlay">
                            <div className="overlay__panel overlay--left">
                                <button className="btn" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay__panel overlay--right">
                                <button className="btn" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}
export default Login1;
