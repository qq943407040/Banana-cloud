import React, { Component, useState, useEffect } from 'react'
import { Badge, Popover, Popconfirm, message, List, Row, Col } from 'antd';
import '../../Styles/pages/infor.css'
import axios from 'axios'

import {
    BellOutlined,
} from '@ant-design/icons';
// 通知页
const Infor = () => {
    const [show, setshow] = useState('true')
    const [list, setList] = useState([])
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
    const getList1 = () => {
        axios({
            method: 'get',
            url: 'http://47.107.95.82/transfer/census',
        }).then(
            res => {
                console.log(res.data)
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
                <div onClick={getList} className='infor1'>
                    <Badge dot={show}>
                        <BellOutlined style={{color:'rgba(0, 0, 0, 0.863)', fontSize: '2.6vh'}} />
                    </Badge>
                </div>
            </Popover>
        </>
    )
}
export default Infor