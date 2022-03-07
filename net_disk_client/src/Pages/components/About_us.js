import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { List, Row, Col, Modal, message, Button, Switch ,Avatar,Breadcrumb} from 'antd';

import '../../Styles/pages/about_us.css'
import '../../Styles/header.css'
import servicePath from '../../config/apiUrl'
import axios from 'axios'
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
    // 关于我们
const About_us = (props) => {
    const [list, setList] = useState([])
    // 获取帮助列表
    const getList = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:7001/admin/getArticleList',
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setList(res.data.list)
                console.log(res.data.list)
            }
        )
    }
    // 初始化执行
    useEffect(() => {
        getList()
    }, [])
    
    return (
        <div >
            <div className='d1'>
                <QuestionCircleOutlined style={{ fontSize: '3vh' }} />
                <span className='s1'>关于我们</span>
            </div>
            <div id="list_div" >
            <div className='bread'>
            <Breadcrumb separator=">">
                <Breadcrumb.Item ><Link to='/index/aboutus'>关于我们</Link></Breadcrumb.Item>
            </Breadcrumb>
                </div>
                <List
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <Row className='list'>
                                <Col span={24}>
                                    <div className="list_title"><Link to={`detailed/${item.id}`}>
                                        <a>{item.title}</a>
                                    </Link>
                                    </div>
                                </Col>
                            </Row>

                        </List.Item>
                    )}
                />
            </div>
            <div id="suggest">
            <Avatar size={160} src="https://octodex.github.com/images/minion.png" />
            <div className='button_suggest'>
            <span>留下您的宝贵意见</span>
            <Button  type="primary" ><a href='https://support.qq.com/products/374091?' target='_blank'>给我们提点意见</a></Button>
            </div>
            </div>
        </div>


    )
}

export default About_us