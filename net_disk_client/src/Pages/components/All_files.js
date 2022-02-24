import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, message, Radio, Breadcrumb, Button, Row, Col, Upload, Space } from 'antd';
import '../../Styles/pages/all_files.css'
import '../../Styles/header.css'
import axios from 'axios'
import servicePath from '../../config/apiUrl'
import {
    DownloadOutlined
} from '@ant-design/icons';
import cookie from "react-cookies";
import moment from 'moment';



import {
    DesktopOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
// 全部文件页面
const All_files = () => {
    const [selectedRowKeys, setSelectRowKeys] = useState([])
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const getAllfiles = () => {
        let dataprops = {
            'sort_object': 1,
            'sort_type': 2
        }
        axios({
            method: 'get',
            url:
                '/banana/transfer/file-list',
            // 'http://127.0.0.1:4523/mock/546121/allfiles',
            params:
                dataprops,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                console.log(res)
                setData(
                    res.data.data.file_object
                    // res.data.data.dir_object
                )
                setData1(
                    res.data.data.dir_object
                )
                setData2(res.data.data.file_object.concat(res.data.data.dir_object))


            }
        )
    }
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = cookie.load("token");
        getAllfiles()
        console.log(data2)
    }, [])

    const props = {
        name: 'file',
        action: '/banana/tf/upload',
        headers: { "Authorization": cookie.load('token') },
        maxCount: 1,

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        showUploadList: 'false'
    };


    const getfiles = (Keys) => {
        console.log(data2)

        axios({
            method: 'get',
            url: '/banana/transfer/download',
            params: {
                fid: 9
            },
            responseType: 'blob'
        })
            .then(res => {
                // 创建下载的链接
                const url = window.URL.createObjectURL(new Blob([res.data],
                    // 设置该文件的mime类型，这里对应的mime类型对应为.xlsx格式                          
                    { type: 'application/zip' }));
                const link = document.createElement('a');
                link.href = url;
                // 从header中获取服务端命名的文件名
                const fileName = decodeURI(res.headers['filename']);
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            }).catch((error) => {
                console.log(error)
                alert('文件下载失败');

            });


    }
    // 展示文件列表项
    const columns = [
        {
            title: '名称',
            className: 'cc1',
            dataIndex: 'file_name',
            key: 'file_name',
            render: (text, record) => {
                return (
                    <>
                        <a onClick={
                            getfiles
                        }>{text}</a>
                    </>
                )
            }
        },
        {
            title: '名称',
            className: 'cc1',
            dataIndex: 'dir_name',
            key: 'file_name',
            render: (text, record) => {
                return (
                    <>
                        <a >{text}</a>
                    </>
                )
            }
        },
        {
            title: '类型',
            className: 'c1',
            dataIndex: 'file_type',
            key: 'file_type'
        },

        {
            title: '大小',
            className: 'c1',
            dataIndex: 'size',
            key: 'size',

        },
        {
            title: '最后修改时间',
            className: 'c1',
            dataIndex: 'last_modified',
            key: 'last_modified',
            render: (text, record) => {

                return (
                    <>
                        {moment(text * 1000).format("YYYY-MM-DD HH:mm:ss")}
                    </>
                )
            }
        },
        {
            title: '操作',
            className: 'c1',
            dataIndex: 'option',
            key: 'option',
            render: (text, record) => (
                <Space size="middle">
                    <a style={{ color: 'black' }}><DownloadOutlined onClick={getfiles} style={{ fontSize: '2.4vh' }} /></a>
                    <a style={{ color: 'black' }}><DeleteOutlined style={{ fontSize: '2.4vh' }} /></a>
                </Space>
            ),
        }
    ]
    // 选择项更换时执行
    const onSelectChange = Keys => {
        console.log('selectedRowKeys changed: ', Keys);
        setSelectRowKeys(Keys);
        for (var i = 0; i < data.length; i++) {
            if (data[i].key == Keys[Keys.length - 1])
                console.log(data[i].file_name)
        }

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
                    <Row type="flex" justify="center">
                        <Col xs={6} sm={6} md={12} lg={12} xl={12}>
                            <Button className='new_dir' icon={<PlusOutlined />} size='large'>
                                创建文件夹
                            </Button>
                        </Col>

                        <Col offset={0} className='file_up' xs={8} sm={8} md={12} lg={12} xl={12}>
                            <Upload className='up' {...props}>
                                <Button type='primary'>上传文件</Button>
                            </Upload>
                        </Col>
                        {/*
                        <Col offset={0} className='file_down' xs={8} sm={8} md={8} lg={3} xl={3}>
                            <Button type='primary'>下载文件</Button>
                        </Col>
                        <Col offset={0} className='file_del' xs={8} sm={8} md={8} lg={3} xl={3}>

                            <Button type='primary'danger>删除文件</Button>
                        </Col> */}
                    </Row>

                </div>
                <Table
                    className='table1'
                    rowSelection={rowSelection}
                    dataSource={data2}
                    ellipsis={true}
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