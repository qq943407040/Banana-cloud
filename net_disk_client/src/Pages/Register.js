import React, { Component,useState } from 'react'
import '../Styles/Login.css';
import 'antd/dist/antd.css';
import { Card, Input, Icon, Button, Spin ,message} from 'antd';
import servicePath from '../config/apiUrl';
import axios from 'axios'
import cookie from "react-cookies";
import { Link } from 'react-router-dom';
// 注册页面
const Register=(props)=>{
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // 取消按钮
    const cancel=()=>{
        props.history.push('/login')
    }
    // 注册按钮
    const checkRegister = ()=>{
        
        setIsLoading(true)
        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        else if(password!=repassword){
            message.error('再次输入密码不一致')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        if(userName.length<6){
            message.error('用户名不能小于6位')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(password.length<6){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        let dataProps = {
            'username':userName,
            'password':password
        }
        axios({
            method:'post',
            url:servicePath.checkuserRegister,
            data:dataProps, 
            
        }).then(
           res=>{
                setIsLoading(false)
                if(res.data.isSuccess){
                    message.success('注册成功')


                }else{
                    message.error('注册失败')
                }
           }
        )
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    return (
        <div className="login-div">

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
                        onChange={(e) => { setPassword(e.target.value)}
                        }
    
                    />
                    <br/><br/>
                    <Input.Password
                        id="password1"
                        size="large"
                        placeholder="Enter your password again"
                        prefix={''}//有icon在这
                        onChange={(e) => { setRepassword(e.target.value)}
                        }
    
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkRegister}> 注册 </Button><br/><br/>
                    <Button type="primary" size="large" block  onClick={cancel}>返回 </Button>

                </Card>
            </Spin>
        </div>
    )
}
export default Register