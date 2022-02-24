import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, message, List, Radio, Breadcrumb, Button, Row, Col, Upload, Space, Popover, Popconfirm, Checkbox, Modal } from 'antd';
import '../../Styles/pages/upload_files.css'
import '../../Styles/header.css'
import axios from 'axios'
import servicePath from '../../config/apiUrl'

import cookie from "react-cookies";
import moment from 'moment';

import {
    CloudUploadOutlined
  } from '@ant-design/icons';
// 回收站
const Upload_files = () => {
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const getTrashfiles = () => {
        let dataprops = {
            'sort_object': 1,
            'sort_type': 2
        }
        axios({
            method: 'get',
            url:
                '/banana/transfer/trash-list',
            params:
                dataprops,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                console.log(res)
               


            }
        )
    }
    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = cookie.load("token");

        getTrashfiles()
    },[])
    return (
        <div >
            <div className='d1'>
                <CloudUploadOutlined style={{ fontSize: '3vh'}} />
                <span className='s1'>回收站</span>
            </div>
            <div className='upload_div'>
            <div className='bread'>
                    <Breadcrumb >
                        <Breadcrumb.Item ><Link to='/index/upload'>回收站</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    
                </div>
            </div>
        </div>


    )
}
export default Upload_files