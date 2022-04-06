import React, { Component, useState, useEffect } from 'react';
import { Popover, Tooltip, Form, Checkbox, Result, Input, Icon, Select, Button, Image, Row, Col, Modal, Spin, Progress, message, Upload } from 'antd';
import '../Styles/pages/Login1.css'
import servicePath from '../config/apiUrl';
import Path from '../config/api'
import axios from 'axios'
import cookie from "react-cookies";
import 'animate.css'
import { PlusOutlined, EditOutlined, CloseCircleOutlined, CloseOutlined, LeftCircleTwoTone } from '@ant-design/icons'
import copy from 'copy-to-clipboard';
import Register from './Register';
import moment from 'moment';
import 'animate.css';
import $ from 'jquery'
// import { animate__animated } from "react-animate__animated-css";


// import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// 防范xss攻击语句,React 在渲染 HTML 内容和渲染 DOM 属性时都会将 "'&<> 这几个字符进行转义，转义部分源码如下：
// for (index = match.index; index < str.length; index++) {
//     switch (str.charCodeAt(index)) {
//       case 34: // "
//         escape = '&quot;';
//         break;
//       case 38: // &
//         escape = '&amp;';
//         break;
//       case 39: // '
//         escape = '&#x27;';
//         break;
//       case 60: // <
//         escape = '&lt;';
//         break;
//       case 62: // >
//         escape = '&gt;';
//         break;
//       default:
//         continue;
//       }
//     }

const Login1 = (props) => {
    const onSearch = value => console.log(value);
    const { Search } = Input;


    // 登录用户名密码
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // 登录注册页面是否可见
    const [isLoginshow, setIsLoginshow] = useState(true)
    const [isUpshow, setIsUpshow] = useState(false)
    const [isReshow, setIsReshow] = useState(true)
    const [isForgetshow, setIsForgetshow] = useState(true)
    const [isUpInforShow, setIsUpInforShow] = useState(false)
    const [blur, setIsBlur] = useState(true)

    // 找回密码逻辑
    const [emailOfforget, setEmailOfforget] = useState('')
    const [passwordFind, setPasswordFind] = useState('')
    const [repasswordFind, setRepasswordFind] = useState('')

    // 注册所需信息 
    const [emailCode, setEmailCode] = useState('')
    const [trueEmailcode, setTrueEmailcode] = useState('')
    const [isCodeRight, setIsCodeRight] = useState(false)
    const [userNameRegister, setUserNameRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const [repasswordRegister, setRepasswordRegister] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [isLoading1, setIsLoading1] = useState(false)

    // 修改密码验证码是否通过
    const [isEmailCheck, setIsEmailCheck] = useState(false)
    const [isCodeCheck, setIsCodeCheck] = useState(false)

    // 发送验证码按钮逻辑
    const [btndisable, setBtndisable] = useState(false)
    const [content, setContent] = useState('发送')

    // 上传信息界面

    const [filelist, setFilelist] = useState([])
    const [percent, setPercent] = useState(0)
    const [infor_title, setInfor_title] = useState('文件传输')
    const [fileName, setFileName] = useState('')
    const [expire, setExpire] = useState('7天')
    const [text, setText] = useState('')
    const [isResult, setIsResult] = useState(false)
    const [shareCode, setShareCode] = useState('')
    const [sharefid, setSharefid] = useState([])
    const [isProshow, setIsProshow] = useState(true)
    const [isProdivshow,setIsProdivshow]=useState(false)

    // 接受文件
    const [receiveCode, setReceiveCode] = useState('')
    const [isReceive, setIsReceive] = useState(false)
    const [receive_title, setReceive_title] = useState('')
    const [describe, setDescribe] = useState('')
    const [refileName, setRefileName] = useState('')
    const [fileSize, setFileSize] = useState('')
    const [expire_time, setExpire_time] = useState(0)
    const [create_time, setCreate_time] = useState(0)
    const [receive_url, setReceive_url] = useState('')

    const [urlArray, setUrl] = useState([
        'http://47.107.95.82:8000/peach-static/%E8%83%8C%E6%99%AF1.jpeg',
        'http://47.107.95.82:8000/peach-static/%E8%83%8C%E6%99%AF2.jpeg',
        'http://47.107.95.82:8000/peach-static/%E8%83%8C%E6%99%AF3.jpeg'
    ])

    // 检测登录信息
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
            'email': userName,
            'password': password
        }
        axios({
            method: 'post',
            url:
                '/banana/account-center/common/login',
            data: dataProps,

        }).then(
            res => {
                setIsLoading(false)
                if (res.data.msg != '登录密码错误') {
                    var token = res.data.data.set_cookie.split(";")
                    var token1 = token[0].replace(/p-token=/i, "")
                    var expire = token[2].replace(/_expires=/i, "")
                    let cookieTime = new Date(new Date().getTime + expire);
                    if (cookie.load('token') != null) {
                        cookie.remove('token')
                    }
                    // sessionStorage.setItem("token",token1)
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 7);
                    cookie.save("token", token1, { expires: tomorrow, path: '/' })
                    cookie.save("user_id", res.data.data.id, { expires: tomorrow, path: '/' })
                    axios.defaults.headers.common['Authorization'] = token1;
                    // sessionStorage.setItem("login_statu", "登陆成功")
                    props.history.push('/index')
                    console.log(res)
                    clearInterval()
                } else {
                    message.error('用户名密码错误')
                    console.log(res)
                }
            }
        ).catch(error => {

        })

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    // 发送验证码
    const sendcode = () => {
        let time = 60

        setIsLoading(true)
        let dataProps = {
            'email': registerEmail,
            'type': 1
        }
        axios({
            method: 'post',
            url:
                '/banana/account-center/e-validate',
            data: dataProps,
            // header: { 'Access-Control-Allow-Origin': '*' },
        }).then(res => {
            setIsLoading(false)
            console.log(res)
            if (res.data.msg == '该邮箱已注册绑定') {
                message.error('该邮箱已注册绑定')
            }
            else if (res.data.msg == '请正确填写邮箱') {
                message.error('请正确填写邮箱')
            }
            else {
                message.success('验证码发送成功')
                setInterval(() => {
                    if (time > 0) {
                        --time
                        setContent(time)
                        setBtndisable(true)
                        console.log(time)
                    }
                    else {
                        setContent('发送')
                        setBtndisable(false)
                        console.log(time)

                    }
                }, 1000)
            }
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
            message.error('密码不能小于6位')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        else if (registerEmail.indexOf('@') == '-1') {
            message.error('邮箱格式错误')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        else {
            let dataProps = {
                'username': userNameRegister,
                'password': passwordRegister,
                'email': registerEmail,
                'invite_code': emailCode
            }
            axios({
                method: 'post',
                url:
                    // servicePath.checkuserRegister,
                    '/banana/account-center/common/register',
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
    // 初始化登录注册功能
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
        let dataprops = {
            'get_code': receiveCode
        }
        axios({
            method: 'get',
            url:
                '/banana/transfer/code-download',
            params: dataprops,
            header: { 'Access-Control-Allow-Origin': '*', },
        }).then(
            res => {
                if (res.data.msg == 'ok') {
                    setIsReceive(true)
                    setReceive_title(res.data.data.title)
                    setDescribe(res.data.data.describe)
                    setExpire_time(res.data.data.expire_time)
                    setCreate_time(res.data.data.create_time)
                    setRefileName(res.data.data.file_name)
                    setFileSize(res.data.data.file_size)
                    setReceive_url(res.data.data.download_str)
                }
                console.log(res)
            }
        )
    }
    // 使接受文件框获取焦点
    useEffect(() => {
        document.getElementById('input1').focus()
  
    })
    // 如果url有参数即是分享链接
    useEffect(()=>{
        console.log(props)
        var code = props.location.search
       if(code!=""){
            setReceiveCode(code.slice(6))
            receiveFiles()
       }
    },[receiveCode])
    // 从接受文件组件转到上传组件
    const toUpload = () => {
        setIsUpshow(!isUpshow)
        setIsReshow(!isReshow)

    }
    // 接受文件处回车执行功能
    function enterDown(e) {
        var evt = window.event || e;
        if (evt.keyCode == 13) {
            receiveFiles()
        }
    }
    // antd上传组件所需信息
    const propss = {
        name: 'file',
        action: '/banana/tf/guest-upload',
        // data:{
        //     'expire_time':1000
        // },
        header: { 'Access-Control-Allow-Origin': '*' },
        showUploadList: false,
        headers: { "Authorization": sessionStorage.getItem('guest_token') },


        onChange(info) {
            setFileName(info.file.name)
            setIsProshow(false)
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                
            }
            if (info.file.status === 'done') {
                setIsProshow(true)
                setIsUpInforShow(true)
                setSharefid(info.file.response.data.fids)
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
                setIsProshow(true)

            }
            const event = info.event
            if (event) { // 必定要加判断，否则会报错
                let percent = Math.floor((event.loaded / event.total) * 100)
                setPercent(percent)
                console.log(percent) // percent就是进度条的数值
            }
        },
    };


    // 设置忘记密码处的视图逻辑
    const forgotPass = () => {
        setIsLoginshow(true)
        setIsForgetshow(false)
        setIsUpshow(true)
    }
    // 上传成功
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    // 上传失败
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // 修改密码方法
    const checkChange = () => {
        if (!isEmailCheck) {
            message.error('邮箱输入错误')
        }
        else if (isCodeCheck) {
            message.error('验证码错误')
        }
        else {
        }
    }
    const showLogin = () => {
        if (!isLoginshow) {
            setIsUpshow(false)
            setIsLoginshow(!isLoginshow)
            setIsReshow(true)
            setIsForgetshow(true)
            setIsProdivshow(!isProdivshow)
            // console.log('4')
        }
        else {
            setIsUpshow(true)
            setIsLoginshow(!isLoginshow)
            setIsReshow(true)
            setIsForgetshow(true)
            setIsProdivshow(!isProdivshow)

            console.log('4')
        }

    }

    const { Option } = Select;

    // Select框更改回调函数
    const handleChange = value => {
        console.log(`selected ${value}`);
        setExpire(value)
    }
    // 判断日期
    const getTime = (time) => {
        if (time == '1天') {
            return 60 * 60 * 24
        }
        if (time = '3天') {
            return 60 * 60 * 24 * 3
        }
        else {
            return 60 * 60 * 24 * 7
        }

    }
    // 获取分享码
    const share = () => {
        setIsResult(true)
        setIsUpInforShow(false)
        console.log(sharefid)
        console.log(text)
        console.log(infor_title)
        console.log(expire)
        let dataprops = {
            'expire_time': getTime(expire),
            'fid': sharefid[0],
            'describe': text,
            'title': infor_title
        }
        axios({
            method: 'post',
            url:
                '/banana/transfer/share',
            data: dataprops,
            headers: { "Authorization": sessionStorage.getItem('guest_token') },
        }).then(res => {
            console.log(res)
            setShareCode(res.data.data.get_code)
        })
    }
    useEffect(() => {
        axios({
            method: 'get',
            url:
                '/banana/account-center/common/guest',

            // header: { 'Access-Control-Allow-Origin': '*' },
        }).then(res => {
            sessionStorage.setItem("guest_token", res.data.data.token)
        })
    }, [])
    useEffect(() => {
        var i = 1
        clearInterval()
        setInterval(() => {
            $('body').css('backgroundImage', 'url(' + urlArray[i] + ')');
            $('.overlay').css('backgroundImage', 'url(' + urlArray[i] + ')');
            i++
            if (i == 3)
                i = 0
            // console.log('ss')
        }, 7000);
    }, [])
    // 控制点击input以外的区域会触发input的blur事件
    const a = new Promise(function (resolve, reject) {
        if (!isLoginshow) {
            $(document).mouseup(function (e) {
                var con = $("#c1");   // 设置目标区域
                if (!con.is(e.target) && con.has(e.target).length === 0) {
                    // console.log(isLoginshow)
                    showLogin()
                }
                else {
                    // console.log('11')
                }
            }
            );
        }
        resolve()
    })
    const tran = () => {
        var a = document.getElementById('upload_div')
        a.setAttribute('class', 'sss animate__animated animate__bounceInLeft')
    }
    return (
        <div className='main_index'>
            <div>
                <div className='loginToptip'>
                    <Row type="flex" justify="center">
                        <Col xs={6} sm={6} md={12} lg={12} xl={12}>
                            <Image
                                // onClick={()=>tran()}
                                className='loginLogo'
                                width={250}
                                preview={false}
                                src="http://47.107.95.82:8000/peach-static/香蕉_画板 1.png"
                            />
                        </Col>
                        <Col offset={0} className='person_data' xs={8} sm={8} md={12} lg={12} xl={12}>
                            <div id='login1' className='loginButton'>
                                <Button onClick={()=>showLogin()}>注册/登录</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='uploadFiles animate__animated animate__bounceInLeft'
                    hidden={isUpshow}
                    id='upload_div'>
                    <Row type="flex" justify="center"  >
                        <Col offset={0} xs={16} sm={16} md={16} lg={16} xl={16}>
                            <Upload {...propss}>
                                <Button className='bt1' icon={<PlusOutlined style={{ fontSize: '1.7rem', marginLeft: '1.3vw' }} />}>上传文件</Button>
                            </Upload>
                        </Col>
                        <Col offset={0} xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Button onClick={() => {
                                 setIsReshow(!isReshow)
                                 setIsUpshow(!isUpshow)
                            }} className='bt2'>接受文件</Button>
                        </Col>
                    </Row>
                </div>
                {/* 接受文件 */}
                <div className='uploadFiles animate__animated animate__bounceInLeft'
                    hidden={isReshow}
                    id='upload_div'>
                    <div className='receive_div'>
                        <input
                            id='input1'
                            onKeyDown={enterDown}
                            bordered='false'
                            placeholder='请输入接受文件口令'
                            className='receive_input'
                            onChange={(e) => setReceiveCode(e.target.value)}
                        ></input>
                        <CloseCircleOutlined onClick={toUpload} className='closeBtn' style={{ fontSize: '1.8rem', marginLeft: '1rem', marginTop: '0.6rem' }} />
                    </div>
                </div>
                {/* 上传进度条 */}
                <div className='upload_progress' hidden={isProdivshow}>
                    <Popover 
                    placement="topRight" 
                    title="上传进度" 
                    width='fit-content'
                    content={
                        isProshow?'暂无上传任务':
                        <div style={{width:'17vw',overflow:'hidden'}}>
                        <p>{fileName}</p>
                        <Progress
                        hidden={isProshow}
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={percent} 
                        style={{width:'16vw',height:'5vh'}}
                        /> 
                        </div>
                        }>
                       <Image
                       src="http://47.107.95.82:8000/peach-static/进度条.png"
                       width={'3rem'}
                       preview={false}
                       >
                       </Image>
                    </Popover>
                </div>
                {/* 接受文件页 */}
                <Modal
                    visible={isReceive}
                    width='fit-content'
                    footer={
                        null
                    }
                    onCancel={() =>
                        setIsReceive(false)
                    }
                    bodyStyle={{ borderRadius: '160px' }}
                >
                    <div className='receive_infor_div'>
                        <div className='infor_title'>
                            <span style={{ width: '5vw', fontSize: '1.1rem', fontWeight: 'bold' }}
                            >
                                {receive_title}
                            </span>
                        </div>
                        <div className='file_infor'>
                            <Image
                                width={'1.8rem'}
                                src="http://47.107.95.82:9000/peach-static/文件图片.png"
                                preview={false}></Image>
                            <span style={{ fontSize: '0.8rem', overflow: 'hidden', whiteSpace: 'nowrap' }}>{refileName}</span>
                        </div>
                        <div className='infor_detailed'>
                            <Row className='row'>
                                <Col span={8}> <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>过期时间</span> </Col>
                                <Col span={5}></Col>
                                <Col span={11} style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>
                                    {moment((create_time + expire_time) * 1000).format("YYYY-MM-DD HH:mm")}
                                </Col>
                            </Row>
                            <Row className='row'>
                                <Col span={12}> <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>文件描述</span> </Col>
                            </Row>
                            <Row style={{ marginLeft: '1vw' }}>
                                {describe}
                            </Row>
                            <Row className='row1'>
                                <Button onClick={() => {
                                    window.open(receive_url,'_parent')
                                    console.log(receive_url)
                                }} className='Infor_button'>确认</Button>
                            </Row>

                        </div>
                    </div>
                </Modal>
                {/* 上传完成后结果页 */}
                <Modal
                    visible={isResult}
                    width='fit-content'
                    footer={
                        null
                    }
                    onCancel={() =>
                        setIsResult(false)
                    }
                >
                    <div className='result_div'>
                        <Result
                            status="success"
                            title={
                                <h4 style={{ whiteSpace: 'nowrap' }}>上传成功!</h4>
                            }
                            subTitle={
                                <div>
                                    您的分享码是:
                                    <p id="sharecode" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>
                                        <Tooltip title="一键复制">
                                            <span onClick={(e) => {
                                                copy(e.target.innerText)
                                                message.success('复制成功！')
                                            }}
                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                                    {shareCode}
                                                    </span>
                                        </Tooltip>
                                    </p>
                                    您的分享链接是:
                                    <p id="sharecode" style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black' }}>
                                        <Tooltip title="一键复制">
                                            <span onClick={(e) => {
                                                copy(e.target.innerText)
                                                message.success('复制成功！')
                                            }}
                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                                   http://175.178.183.25/?code={shareCode}
                                                    </span>
                                        </Tooltip>
                                    </p>
                                </div>
                            }
                            extra={[
                                <Button
                                    onClick={() => setIsResult(false)}
                                    id="result_button" className='Infor_button'>确认</Button>,
                            ]}
                        />
                    </div>
                </Modal>
                {/* 上传后确认信息界面 */}
                <Modal
                    visible={isUpInforShow}
                    className='uploadInfor_div'
                    width='fit-content'
                    footer={
                        null
                    }
                    onCancel={() =>
                        setIsUpInforShow(false)
                    }
                    bodyStyle={{ borderRadius: '160px' }}>
                    <div className='infor_title'>
                        <Input
                            bordered={false}
                            defaultValue={infor_title}
                            value={infor_title}
                            style={{ width: '5vw', fontSize: '1.1rem', fontWeight: 'bold' }}
                            onChange={(e) => setInfor_title(e.target.value)}
                        >
                        </Input><EditOutlined style={{ fontSize: '1.1rem' }} />
                    </div>
                    <div className='file_infor'>
                        <Image
                            width={'1.8rem'}
                            src="http://47.107.95.82:9000/peach-static/文件图片.png"
                            preview={false}></Image>
                        <span style={{ fontSize: '0.8rem', overflow: 'hidden', whiteSpace: 'nowrap' }}>{fileName}</span>
                    </div>
                    <div className='infor_detailed'>
                        <Row className='row'>
                            <Col span={12}> <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>有效期</span> </Col>
                            <Col span={6}></Col>
                            <Col span={6}>
                                <Select
                                    defaultValue={['7天']}
                                    style={{ width: 80 }}
                                    bordered={false}
                                    onChange={handleChange}
                                >
                                    <Option value="1天">1天</Option>
                                    <Option value="7天">7天</Option>
                                    <Option value="30天">30天</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row className='row'>
                            <Col span={12}> <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>补充描述</span> </Col>
                        </Row>
                        <Row>
                            <Input.TextArea rows={4}
                                autoSize={{ minRows: 3, maxRows: 3 }}
                                style={{ width: '18vw' }}
                                onChange={(e) => { setText(e.target.value); }}
                            />
                        </Row>
                        <Row className='row1'>
                            <Button onClick={share} className='Infor_button'>确认</Button>
                        </Row>

                    </div>
                </Modal>
                <div hidden={isForgetshow} className='forget_div animate__animated animate__fadeInUp'>
                    <h2 className='forgetTitle'>
                        <Row>
                            <Col span="3">
                                <LeftCircleTwoTone onClick={showLogin} className='returntoLogin' />
                            </Col>
                            <Col id='title' span="18">
                                Forgot password
                            </Col>
                        </Row>
                    </h2>
                    <div className='form2'
                    >
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
                                    allowClear />
                            </Form.Item>
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    allowClear />
                            </Form.Item>
                            <Form.Item
                                label="确认密码"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your repassword !',
                                    },
                                ]}
                            >
                                <Input.Password
                                    allowClear />
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

                </div>
            </div>

            <Spin tip="Loading..." spinning={isLoading}>
                <div hidden={isLoginshow} className="container right-panel-active animate__animated animate__fadeInDown" id='c1'>
                    <div className="container__form container--signup">
                        <form action="#" className="form" id="form1">
                            <h2 className="form_title">
                                {/* <CloseOutlined onClick={showLogin} className='closeSignUp' /> */}
                                Sign Up</h2>
                            <input type="text" onChange={(e) => { setUserNameRegister(e.target.value) }} placeholder="输入用户名" className="input" />
                            <input type="password" onChange={(e) => { setPasswordRegister(e.target.value) }} placeholder="输入密码" className="input" />
                            <input onChange={(e) => { setRegisterEmail(e.target.value) }} placeholder="请输入邮箱" className="input" />
                            <Input.Group compact>

                                <input onChange={(e) => { setEmailCode(e.target.value) }} placeholder="请输入验证码" className="input1" />
                                <Button onClick={sendcode} disabled={btndisable} className='bt_sendcode' type="primary">{content}</Button>

                            </Input.Group>

                            <button onClick={checkRegister} className="btn">Sign Up</button>
                        </form>
                    </div>


                    <div className="container__form container--signin ">
                        {/* <CloseOutlined onClick={showLogin} className='closeSignIn' /> */}

                        <form action="#" className="form1" id="form2">
                            <h2 className="form_title">
                                Sign In</h2>
                            <div className='input2'>
                                <input id='userName' onChange={(e) => { setUserName(e.target.value) }} placeholder="Username" className="input" />
                                <input id='password' type="password" onChange={(e) => { setPassword(e.target.value) }
                                } placeholder="Password" className="input" />
                                <p onClick={forgotPass}>Forgot your password?</p>
                                <button onClick={() => checkLogin()} className="btn">Sign In</button>
                            </div>

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
