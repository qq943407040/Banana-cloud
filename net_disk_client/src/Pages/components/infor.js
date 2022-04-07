import React, { Component, useState, useEffect } from 'react'
import { Badge, Popover, Popconfirm, message, List,notification } from 'antd';
import '../../Styles/pages/infor.css'
import axios from 'axios'
import g from '../../global'
import GoEasy from 'goeasy';
import {
    BellOutlined,SmileOutlined
} from '@ant-design/icons';
import cookie from "react-cookies";
// 通知页
const Infor = () => {
    const [show, setshow] = useState(true)
    const [list, setList] = useState([])
    const [mess,setMess] = useState('')
    // 登陆建立连接
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
    var pubsub = goeasy.pubsub
    //   初始化goeasy连接并订阅
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = cookie.load("token");
        getList()
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
        })
    //    订阅通道
        pubsub.subscribe({
            channel: "my_channel",//替换为您自己的channel
            onMessage: function (message) {
                console.log("Channel:" + message.channel + " content:" + message.content);
                console.log(message)
                console.log(list)
                // var list1 = list.concat([{'title':message.content}])
                // console.log(`list1${list1}`)
                // setList(list1)
                setMess(message.content)
                console.log(list)
                console.log(mess)
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
    useEffect(()=>{
        openNotification()
    },[mess])
    // 显示通知
    const openNotification = () => {
        if(mess!=''){
          notification.open({
          message:mess,
          onClick: () => {
            console.log('Notification Clicked!');
          },
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });  
        }
        
      };
    // 获取通知列表
    const getList = () => {

        axios({
            method: 'get',
            url: '/banana/common/notify-list',
        }).then(
            res => {
                console.log(res)
                setList(res.data.data.notify_objects)
            }
        )
    }

    return (
        <>
            <Popover  placement="bottomRight" title={'通知'}
                content={<List
                    size="small"
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <div className='list_infor'>
                                {item.title}
                            </div>
                        </List.Item>
                    )}
                />} trigger="click">
                <div   className='infor1'>
                    <Badge dot={show}>
                        <BellOutlined style={{ color: 'rgba(0, 0, 0, 0.863)', fontSize: '2.6vh' }} />
                    </Badge>
                </div>
            </Popover>
        </>
    )
}
export default Infor