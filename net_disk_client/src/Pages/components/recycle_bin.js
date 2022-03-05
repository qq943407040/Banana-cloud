import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, message, List, Radio, Breadcrumb, Button, Row, Col, Image, Spin, Space, Popover, Popconfirm, Checkbox, Modal } from 'antd';
import '../../Styles/pages/recycle_bin.css'
import '../../Styles/header.css'
import axios from 'axios'
import servicePath from '../../config/apiUrl'
import {
    DownloadOutlined,
    DesktopOutlined,
    PlusOutlined,
    DeleteOutlined,
    RedoOutlined

} from '@ant-design/icons';
import cookie from "react-cookies";
import moment from 'moment';
import map from '../../store/Map'
import {
    CloudUploadOutlined
} from '@ant-design/icons';
// 回收站
const Recycle_bin = () => {
    const [data, setData] = useState([])
    const [fileId, setFileId] = useState([])
    const [dirId, setDirId] = useState([])
    const [selectId, setSelectId] = useState([])
    const [selectDid,setSelectDid]=useState([])
    const [buttonVisible, setButtonVisible] = useState(true)
    const [withdrawBool, setWithdrawBool] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    // 获取回收站文件
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
                if (res.data.msg == "ok") {
                    if (res.data.data.dir_object != null && res.data.data.file_object != null)
                        setData(res.data.data.dir_object.concat(res.data.data.file_object))
                    else if (res.data.data.file_object != null) {
                        for (var i in res.data.data.file_object) {
                            console.log(res.data.data.file_object[i].fid)
                        }
                        setData(res.data.data.file_object)
                    }
                    else if (res.data.data.dir_object != null)
                        setData(res.data.data.dir_object)
                    message.success('获取列表成功')
                    setFileId(res.data.data.fids)
                    setDirId(res.data.data.dids)
                }
                else {
                    message.error('获取列表失败')
                }

            }
        ).catch(error => {
            message.error('获取列表失败')
        })
    }
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = cookie.load("token");
        getTrashfiles()
    }, [])
    // 撤回文件夹
    const withdrawDir = (id) => {
        setIsLoading(true)
        setWithdrawBool(false)
        let dataprops = {
            "did":
                id
        }
        axios({
            method: 'post',
            url:
                '/banana/transfer/withdraw-dir',
            withCredentials: true,
            data: dataprops,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                console.log(res)
                setWithdrawBool(true)
                getTrashfiles()
                setTimeout(() => {
                    setIsLoading(false)
                }, 500);
            }
        ).catch((error) => {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
            console.log(error)
        })
    }
    // 撤回文件
    const withdrawFile = (id) => {
        setIsLoading(true)
        let dataprops = {
            "fid":
                id
        }
        axios({
            method: 'post',
            url:
                '/banana/transfer/withdraw-file',
            withCredentials: true,
            data: dataprops,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                console.log(res)
                getTrashfiles()
                setTimeout(() => {
                    setIsLoading(false)
                }, 500);
            }
        ).catch((error) => {
            console.log(error)
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        })
    }
    // 永久删除文件
    const deletefile = (id) => {
        setIsLoading(true)
        let dataprops = {
            "fid":
                id
        }
        axios({
            method: 'post',
            url:
                '/banana/transfer/clean-file',
            withCredentials: true,
            data: dataprops,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 500);
                if (res.data.data.message == 'success') {
                    message.success('删除成功')
                    getTrashfiles()
                }
                else {
                    message.error('删除失败')
                }
                console.log(res)
            }
        ).catch((error) => {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
            console.log(error)
        })

    }
    // 永久删除文件夹
    const deleteDir = (id) => {
        setIsLoading(true)
        let dataprops = {
            "did":
                id
        }
        axios({
            method: 'post',
            url:
                '/banana/transfer/clean-dir',
            withCredentials: true,
            data: dataprops,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 500);
                if (res.data.data.message == 'success') {
                    message.success('删除成功')
                    getTrashfiles()
                }
                else {
                    message.error('删除失败')
                }
                console.log(res)
            }
        ).catch((error) => {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
            console.log(error)
        })

        setIsLoading(true)
    }
    // 文件多选框回调函数
    const onchange = (id, bool) => {
        if (bool) {
            selectId.push(id)
        }
        else {
            selectId.pop(id)
        }
        if (selectId[0] != null) {
            setButtonVisible(false)
        }
        else if (selectId[0] == null) {
            setButtonVisible(true)
        }
        console.log(selectId)
        console.log(bool)
    }
    const onchange1 = (id, bool) => {
        if (bool) {
            selectDid.push(id)
        }
        else {
            selectDid.pop(id)
        }
        if (selectDid[0] != null) {
            setButtonVisible(false)
        }
        else if (selectDid[0] == null) {
            setButtonVisible(true)
        }
        console.log(selectDid)
        console.log(bool)
    }
    const judgeSrc = (type)=>{
        if(map.get(type)=='img')
        return 'http://47.107.95.82:9000/peach-static/图片.png'
        else if(map.get(type)=='video')
        return 'http://47.107.95.82:9000/peach-static/视频.png'
        else 
        return 'http://47.107.95.82:9000/peach-static/文件图片.png'
    }
    return (
        <div >
            <div className='d1'>
                <CloudUploadOutlined style={{ fontSize: '3vh' }} />
                <span className='s1'>回收站</span>
            </div>
            <div className='all_files'>
                <div className='bread'>
                    <Breadcrumb >
                        <Breadcrumb.Item ><Link to='/index/upload'>回收站</Link></Breadcrumb.Item>
                    </Breadcrumb>

                </div>
                <div>
                    <Spin tip="Loading..." spinning={isLoading}>
                        <Row type="flex" justify="center">
                            <Col xs={6} sm={6} md={12} lg={12} xl={12}>
                            </Col>
                            <Col offset={0} className='file_up' xs={8} sm={8} md={12} lg={12} xl={12}>
                                <Popconfirm
                                    title="确定恢复所选文件？"
                                    onConfirm={() => {

                                        withdrawFile(selectId)
                                    }}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <a hidden={buttonVisible} style={{ color: 'black', marginRight: '1vw' }}><RedoOutlined
                                        style={{ fontSize: '1.8rem' }} /></a>
                                </Popconfirm>
                                <Popconfirm
                                    title="确定永久删除所选文件?"
                                    onConfirm={() => deletefile(selectId)}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <a hidden={buttonVisible} style={{ color: 'black', marginRight: '1vw' }}><DeleteOutlined
                                        style={{ fontSize: '1.8rem' }} /></a>
                                </Popconfirm>
                                <Popconfirm
                                    title="确定恢复所有文件？"
                                    onConfirm={() => {
                                        withdrawFile(fileId)
                                        withdrawDir(dirId)
                                    }}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <Button type='primary' style={{ marginRight: '1vw' }}>全部恢复</Button>
                                </Popconfirm>
                                <Popconfirm
                                    title="确定永久删除所有文件？"
                                    okText="确认"
                                    cancelText="取消">
                                    <Button type='primary' danger>全部清空</Button>
                                </Popconfirm>

                            </Col>

                        </Row>
                        <List
                            itemLayout="vertical"
                            dataSource={data}
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
                                            <Checkbox onChange={(e) => 
                                             'file_name' in item ?
                                                onchange(item.fid, e.target.checked)
                                                :onchange1(item.did,e.target.checked)
                                                }>
                                                     <Image 
                                            width={'1.6rem'}
                                            style={{position:'relative',top:'5px'}}
                                            src=
                                            {'file_name' in item ?
                                                judgeSrc(item.file_type)
                                            :'http://47.107.95.82:9000/peach-static/文件夹.png'  
                                            }
                                           
                                            preview={false}>
                                            </Image>
                                                <a > {
                                                    'file_name' in item ?
                                                        item.file_name : item.dir_name
                                                }</a>
                                            </Checkbox>
                                        </Col>

                                        <Col span={2}>
                                            {'file_type' in item ? item.file_type : '文件夹'}
                                        </Col>
                                        <Col span={4}>
                                            {moment(item.last_modified * 1000).format("YYYY-MM-DD HH:mm:ss")}

                                        </Col>

                                        <Col span={3}>
                                            {item.size}
                                        </Col>

                                        <Col span={3}>
                                            <Space size="middle">
                                                {'file_type' in item
                                                    ? <Popconfirm
                                                        title="确定恢复文件？"
                                                        onConfirm={() => withdrawFile([item.fid])}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <a style={{ color: 'black' }}><RedoOutlined
                                                            style={{ fontSize: '2.4vh' }} /></a>
                                                    </Popconfirm>
                                                    : <Popconfirm
                                                        title="确定恢复文件夹？"
                                                        onConfirm={() => withdrawDir([item.did])}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <a style={{ color: 'black' }}><RedoOutlined
                                                            style={{ fontSize: '2.4vh' }} /></a>
                                                    </Popconfirm>}

                                                {'file_type' in item
                                                    ? <Popconfirm
                                                        title="确定永久删除文件?"
                                                        onConfirm={() => deletefile([item.fid])}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <a style={{ color: 'black' }}><DeleteOutlined
                                                            style={{ fontSize: '2.4vh' }} />{item.fid}</a>
                                                    </Popconfirm>
                                                    : <Popconfirm
                                                        title="确定永久删除文件夹?"
                                                        onConfirm={() => deleteDir([item.did])}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <a style={{ color: 'black' }}><DeleteOutlined
                                                            style={{ fontSize: '2.4vh' }} />{item.did}</a>
                                                    </Popconfirm>}

                                            </Space>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>
            </div>
        </div>


    )
}
export default Recycle_bin