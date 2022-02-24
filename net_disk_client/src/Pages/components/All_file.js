import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, message, List, Radio, Breadcrumb, Button, Row, Col, Upload, Space, Popover, Popconfirm, Checkbox, Modal } from 'antd';
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
    // 获取全部文件信息
    const getAllfiles = () => {
        let dataprops = {
            'sort_object': 1,
            'sort_type': 2
        }
        axios({
            method: 'get',
            url:
                '/banana/transfer/file-list',
            params:
                dataprops,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                console.log(res)
                if (res.data.data.dir_object != null && res.data.data.file_object != null)
                    setData2(res.data.data.dir_object.concat(res.data.data.file_object))
                else if (res.data.data.file_object != null)
                    setData2(res.data.data.file_object)
                else if (res.data.data.dir_object != null)
                    setData2(res.data.data.dir_object)


            }
        )
    }
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = cookie.load("token");

        getAllfiles()
    }, [])
    // 上传组件的属性
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
                getAllfiles()
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        showUploadList: 'false'
    };
    // 删除文件
    const deletfile = (id) => {
        let dataprops = {
            'fid': id
        }
        axios({
            method: 'get',
            url:
                '/banana/transfer/del-file/',
            params: dataprops,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                if (res.data.msg == 'ok') {
                    message.success('删除成功')
                    getAllfiles()

                }
                console.log(res)
            }
        )
    }
    // 下载文件
    const getfiles = () => {
        console.log()

        // axios({
        //     method: 'get',
        //     url: '/banana/transfer/download',
        //     params: {
        //         fid: 9
        //     },
        //     responseType: 'blob'
        // })
        //     .then(res => {
        //         // 创建下载的链接
        //         const url = window.URL.createObjectURL(new Blob([res.data],
        //             // 设置该文件的mime类型，这里对应的mime类型对应为.xlsx格式                          
        //             { type: 'application/zip' }));
        //         const link = document.createElement('a');
        //         link.href = url;
        //         // 从header中获取服务端命名的文件名
        //         const fileName = decodeURI(res.headers['filename']);
        //         link.setAttribute('download', fileName);
        //         document.body.appendChild(link);
        //         link.click();
        //     }).catch((error) => {
        //         console.log(error)
        //         alert('文件下载失败');

        //     });


    }
    // 展示文件列表项

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
                    <List
                        header={''}
                        itemLayout="vertical"
                        dataSource={data2}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 6,

                        }

                        }
                        header={
                            <Row className="list-div">
                                <Col span={12}>
                                    <b>名称</b>
                                </Col>
                                <Col span={2}>
                                    <b>类别</b>
                                </Col>
                                <Col span={4}>
                                    <b>修改时间</b>
                                </Col>
                                <Col span={3}>
                                    <b>大小</b>
                                </Col>

                                <Col span={3}>
                                    <b>操作</b>
                                </Col>
                            </Row>

                        }
                        renderItem={item => (
                            <List.Item

                                key={item.key}>

                                <Row className="list-div">
                                    <Col span={12}>
                                        <Checkbox>
                                            <a onClick={getfiles}> {
                                                'file_name' in item ?
                                                    item.file_name : item.dir_name
                                            }</a>
                                        </Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        {item.typeName}
                                    </Col>
                                    <Col span={4}>
                                        {moment(item.last_modified * 1000).format("YYYY-MM-DD HH:mm:ss")}

                                    </Col>

                                    <Col span={3}>
                                        {item.size}
                                    </Col>

                                    <Col span={3}>
                                        <Space size="middle">
                                            <a style={{ color: 'black' }}><DownloadOutlined onClick={getfiles} style={{ fontSize: '2.4vh' }} /></a>
                                            <Popconfirm
                                                title="确定删除文件?"
                                                onConfirm={() => deletfile(item.fid)}
                                                okText="确认"
                                                cancelText="取消"
                                            >
                                                <a style={{ color: 'black' }}><DeleteOutlined
                                                    style={{ fontSize: '2.4vh' }} />{item.fid}</a>
                                            </Popconfirm>

                                        </Space>
                                    </Col>
                                </Row>


                            </List.Item>
                        )}
                    />
                </div>

            </div>
        </div>


    )
}
export default All_files