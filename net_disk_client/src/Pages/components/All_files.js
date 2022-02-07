import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Radio, Breadcrumb, Button, Row, Col, Upload, Space } from 'antd';
import '../../Styles/pages/all_files.css'
import '../../Styles/header.css'
import axios from 'axios'
import servicePath from '../../config/apiUrl'
import {
    DownloadOutlined
} from '@ant-design/icons';

import {
    DesktopOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
// 全部文件页面
const All_files = () => {
    const [selectedRowKeys, setSelectRowKeys] = useState([])
    const [data, setData] = useState([])
    const getAllfiles = () => {
        axios({
            method: 'get',
            url: servicePath.getallfiles,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setData(res.data.data)
            }
        )
    }
    useEffect(() => {
        getAllfiles()
    }, [])
    const props = {
        showUploadList: 'false'
    };
    // 展示文件列表项
    const columns = [
        {
            title: '名称',
            className: 'c1',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '类型',
            className: 'c1',
            dataIndex: 'type',
            key: 'type'
        },

        {
            title: '大小',
            className: 'c1',
            dataIndex: 'size',
            key: 'size',
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: '上传时间',
            className: 'c1',
            dataIndex: 'upload_time',
            key: 'upload_time'
        },
        {
            title: '操作',
            className: 'c1',
            dataIndex: 'option',
            key: 'option',
            render: (text, record) => (
                <Space size="middle">
                    <a style={{ color: 'black' }}><DownloadOutlined style={{ fontSize: '2.4vh' }} /></a>
                    <a style={{ color: 'black' }}><DeleteOutlined style={{ fontSize: '2.4vh' }} /></a>
                </Space>
            ),
        }
    ]
    // 选择项更换时执行
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectRowKeys(selectedRowKeys);
    };
    // 表格行是否可以选择
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div >
            <div className='d1'>
                <DesktopOutlined style={{ fontSize: '3vh' }} />
                <span className='s1'>全部文件</span>
            </div>

            <div className='all_files'>
                <div className='bread'>
                    <Breadcrumb >
                        <Breadcrumb.Item ><Link to='/index/allfiles'>全部文件</Link></Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    {/* <Row type="flex" justify="center"> */}
                    {/* <Col xs={6} sm={6} md={8} lg={15} xl={15}> */}
                    <Button className='new_dir' icon={<PlusOutlined />} size='large'>
                        创建文件夹
                    </Button>
                    {/* </Col> */}

                    {/* <Col offset={0} className='file_up' xs={8} sm={8} md={8} lg={3} xl={3}>
                            <Upload className='up' {...props}>
                                <Button type='primary'>上传文件</Button>
                            </Upload>
                        </Col>
                        <Col offset={0} className='file_down' xs={8} sm={8} md={8} lg={3} xl={3}>
                            <Button type='primary'>下载文件</Button>
                        </Col>
                        <Col offset={0} className='file_del' xs={8} sm={8} md={8} lg={3} xl={3}>

                            <Button type='primary'danger>删除文件</Button>
                        </Col> */}
                    {/* </Row> */}

                </div>
                <Table
                    className='table1'
                    rowSelection={rowSelection}
                    dataSource={data}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 6,
                    }}
                    columns={columns} />
            </div>
        </div>


    )
}
export default All_files