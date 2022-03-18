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
import GoEasy from 'goeasy';


const Individual_infor = () => {
    // 个人信息
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')
    const [sign, setSign] = useState('')
    const [id, setId] = useState(0)

    // 会员信息
    const [vip, setVip] = useState('普通会员')
    const [expirationTime, setExpirationTime] = useState('无')
    const [useSize, setUseSize] = useState('')


    const { loading, imageUrl } = true;
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    // 通过goeasy实现websocket即时通信
    var goeasy = new GoEasy({
        host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
        appkey: "BC-3a285b6a743a4b46a98ca45ede3cce13", //替换为您的应用appkey
        modules: ['pubsub'],
        onConnected: function () {
            console.log('连接成功！')
        },
        onDisconnected: function () {
            console.log('连接断开！')
        },
        onConnectFailed: function (error) {
            console.log('连接失败或错误！')
        }
    });
    var pubsub = goeasy.pubsub;
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
                setAvatar(res.data.data.avatar)
                setId(res.data.data.id)
                setPhone(res.data.data.telephone)
                setSign(res.data.data.signature)
            }
        )
        axios({
            method: 'get',
            url: '/banana/transfer/census/',
        }).then(
            res => {
                console.log(res)
                setUseSize(res.data.data.usage.use_str)
            }
        )
    }, [])
    // 上传头像地址
    const props = {
        name: 'file',
        action: '/banana/tf/upload-static',
        header: { 'Access-Control-Allow-Origin': '*' },
        maxCount: 1,

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setAvatar(info.file.response.data.file_str)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }


    };
    const get = () => {
        goeasy.connect({
            id: "002", //pubsub选填，im必填，最大长度60字符
            data: { "avatar": "/www/xxx.png", "nickname": "Neo" }, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
            onSuccess: function () {  //连接成功
                console.log("GoEasy connect successfully.") //连接成功
            },
            onFailed: function (error) { //连接失败
                console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
            },
            onProgress: function (attempts) { //连接或自动重连中
                console.log("GoEasy is connecting", attempts);
            }
        })

        pubsub.publish({
            channel: "my_channel",//替换为您自己的channel
            message: "您有一条新通知!",//替换为您想要发送的消息内容
            onSuccess: function () {
                console.log("消息发布成功。");
            },
            onFailed: function (error) {
                console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
            }
        });


    }
    //   提交按钮
    const submit = () => {
        const dataProps = {
            'name': username,
            'telephone': phone,
            'id': id,
            'avatar': avatar,
            'signature': sign
        }
        axios({
            method: 'post',
            url: '/banana/account-center/update',
            data: dataProps
        }).then(res => {
            if (res.data.msg == 'ok') {
                message.success('修改成功')
            }
            else {
                message.error('修改失败')
            }
            console.log(res)
        })
    }
    return (
        <div >
            <div className='d1'>
                <UserOutlined style={{ fontSize: '3vh' }} />
                <span className='s1' onClick={get} >个人信息</span>
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
                                    showUploadList={true}
                                    {...props}
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
                                <Input value={cookie.load('user_name')} defaultValue={cookie.load('user_name')} onChange={(e) => { setUsername(e.target.value) }} />
                            </Form.Item>
                            <Form.Item
                                label="email"
                                name="email"

                            >
                                <Input defaultValue={cookie.load('email', { path: '/' })} disabled={true} type='email' />
                            </Form.Item>
                            <Form.Item
                                label="phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone!',
                                    },
                                ]}
                            >
                                <Input value={cookie.load('telephone')} defaultValue={cookie.load('telephone')} onChange={(e) => { setPhone(e.target.value) }} />
                            </Form.Item>
                            <Form.Item
                                label="sign"
                                name="sign"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please re input your sign!',
                                    },
                                ]}
                            >
                                <Input value={cookie.load('signature')} defaultValue={cookie.load('signature')} onChange={(e) => { setSign(e.target.value) }} />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 10,
                                    span: 10,
                                }}
                            >
                                <Button className='bt_sub' type="primary" htmlType="submit" onClick={submit}>
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
                    <Avatar size={100} src={avatar} />
                    <p>{username}</p>
                    <p style={{ fontSize: '1.1rem' }}>{sign}</p>
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
                        <p>我的容量:{useSize}</p>
                    </Card>
                </div>
            </div>

        </div>


    )
}

export default Individual_infor