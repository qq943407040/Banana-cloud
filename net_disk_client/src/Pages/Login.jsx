import React, { useState } from 'react';
// import '../Styles/Login.css';
// import 'antd/dist/antd.css';
import { Card, Input, Icon, Button, Spin, message } from 'antd';
import servicePath from '../config/apiUrl';
import axios from 'axios'
import cookie from "react-cookies";
import Register from './Register';
import back from '../public/back.jpeg'
// 登录页面
function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // 前往注册
    const toRegister = () => {
        props.history.push('/register')
    }
    // 登录按钮
    const checkLogin = () => {
        setIsLoading(true)
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
            url: servicePath.checkuserLogin,
            data: dataProps,

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
                    props.history.push('/')
                }
            }
        )
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    return (
            <div className="login-div" >
                <Spin tip="Loading..." spinning={isLoading}>
                    <Card title="燕华网盘" bordered={true} style={{ width: 400 }} >
                        <Input
                            id="userName"
                            size="large"
                            placeholder="Enter your userName"
                            prefix={''}//有icon在这
                            onChange={(e) => { setUserName(e.target.value) }}
                        />
                        <br /><br />
                        <Input.Password
                            id="password"
                            size="large"
                            placeholder="Enter your password"
                            prefix={''}//有icon在这
                            z
                            onPressEnter={(e) => { checkLogin() }}
                        />
                        <br /><br />
                        <Button type="primary" size="large" block onClick={checkLogin} > 登录 </Button><br /><br />
                        <Button type="primary" size="large" block onClick={toRegister} > 注册 </Button>
                    </Card>
                </Spin>
            </div>
    )

}
export default Login