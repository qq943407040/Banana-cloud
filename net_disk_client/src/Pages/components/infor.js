import React, { Component, useState, useEffect } from 'react'
import { Badge, Popover, Popconfirm, message, List, Row, Col } from 'antd';
import '../../Styles/pages/infor.css'
import axios from 'axios'
import g from '../../global'
import GoEasy from 'goeasy';
import {
    BellOutlined,
} from '@ant-design/icons';
// 通知页
const Infor = () => {
    const [show, setshow] = useState(true)
    const [list, setList] = useState([])
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
    //建立连接

    useEffect(() => {
        goeasy.connect({
            id: "001", //pubsub选填，im必填，最大长度60字符
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
        },[])
       
        pubsub.subscribe({
            channel: "my_channel",//替换为您自己的channel
            onMessage: function (message) {
                console.log("Channel:" + message.channel + " content:" + message.content);
                console.log(message)
                // list.push(message.content)
            },
            onSuccess: function () {
                console.log("Channel订阅成功。");
            },
            onFailed: function (error) {
                console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
            }
        });
        ;
    }, [])
    // 获取通知列表
    const getList = () => {

        axios({
            method: 'get',
            url: 'http://rap2api.taobao.org/app/mock/296818/infor',
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }

    return (
        <>
            <Popover placement="bottomRight" title={'通知'}
                content={<List
                    size="small"
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <div className='list_infor'>
                                {item}
                            </div>
                        </List.Item>
                    )}
                />} trigger="click">
                <div  className='infor1'>
                    <Badge dot={show}>
                        <BellOutlined style={{ color: 'rgba(0, 0, 0, 0.863)', fontSize: '2.6vh' }} />
                    </Badge>
                </div>
            </Popover>
        </>
    )
}
export default Infor