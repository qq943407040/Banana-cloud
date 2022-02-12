import React, { useState, useEffect } from 'react';
import { Card, Form, Upload, Input, Checkbox, List, Row, Col, Modal, message, Button, Switch, Avatar, Breadcrumb } from 'antd';

import '../../Styles/pages/Individual_infor.css'
import '../../Styles/header.css'
import servicePath from '../../config/apiUrl'
import axios from 'axios'
import {
    QuestionCircleOutlined,
    LoadingOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import cookie from "react-cookies";


const Individual_infor = (props) => {
    // 个人信息
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    // 会员信息
    const [vip, setVip] = useState('普通会员')
    const [expirationTime, setExpirationTime] = useState('无')
    const [useSize, setUseSize] = useState('1G')

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const { loading, imageUrl } = true;
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    useEffect(() => {
        // todo:后端改完返回值后修改此处
        axios.defaults.headers.common['Authorization'] = cookie.load("token");
        axios({
            method: 'get',
            url: '/banana/account-center/account/info/' + cookie.load("user_id"),
        }).then(
            res => {
                console.log(res)
                setUsername(res.data.data.name)
                setEmail(res.data.data.email)
            }
        )
      
    }, [])
    const get = ()=>{
        axios.defaults.headers.common['Authorization'] = cookie.load("token");
        axios({
            method: 'get',
            url: '/banana/account-center/account/info/' + cookie.load("user_id"),
        }).then(
            res => {
                console.log(res)
                setUsername(res.data.data.name)
                setEmail(res.data.data.email)
                console.log(username)
                console.log(email)
            }
        )
      
    }
    return (
        <div >
            <div className='d1'>
                <UserOutlined style={{ fontSize: '3vh' }} />
                <span className='s1' onClick={get}>个人信息</span>
            </div>
            <div id="changeInfor_div" >
                <div className='changeInfor'>
                    <span >修改个人信息</span>
                </div>
                <div>
                    <div className='form11'>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 17,
                            }}

                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="avatar"
                                name="avatar"
                                className='ava1'
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar_uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                >{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input value={username} />
                            </Form.Item>
                            <Form.Item
                                label="email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input value={email} type='email' />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password value='' />
                            </Form.Item>
                            <Form.Item
                                label="rePassword"
                                name="repassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please re input your password!',
                                    },
                                ]}
                            >
                                <Input.Password defaultValue={repassword} />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 10,
                                    span: 10,
                                }}
                            >
                                <Button className='bt_sub' type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>
            <div id="preInfor_div">
                <div className='preInfor'>
                    <span >个人信息</span>
                </div>
                <div className='pre_div'>
                    <Avatar size={100} src="https://octodex.github.com/images/minion.png" />
                    <p>{username}</p>
                    <p>{email}</p>
                </div>
            </div>
            <div id='vip_div'>
                <div className='preInfor'>
                    <span>会员信息</span>
                </div>
                <div className='vip'>
                    <Card bordered={false}>
                        <p>会员信息:{vip}</p>
                        <p>到期时间:{expirationTime}</p>
                        <p>我的容量:{useSize}/10G</p>
                    </Card>
                </div>
            </div>

        </div>


    )
}

export default Individual_infor