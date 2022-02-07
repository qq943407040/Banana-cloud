import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/pages/upload_files.css'
import '../../Styles/header.css'
import { Breadcrumb } from 'antd';

import {
    CloudUploadOutlined
  } from '@ant-design/icons';
// 回收站
const Upload_files = () => {

    return (
        <div >
            <div className='d1'>
                <CloudUploadOutlined style={{ fontSize: '3vh'}} />
                <span className='s1'>回收站</span>
            </div>
            <div className='upload_div'>
            <div className='bread'>
                    <Breadcrumb >
                        <Breadcrumb.Item ><Link to='/index/upload'>正在上传</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    
                </div>
            </div>
        </div>


    )
}
export default Upload_files