import React, { Component, useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/pages/Usage.css'
import '../../Styles/header.css'
import * as echarts from 'echarts';
import axios from 'axios'
import cookie from "react-cookies";

import {
    PieChartOutlined
} from '@ant-design/icons';
// 使用情况页面




const Usage = (props) => {

    const [list, setList] = useState([])
    const [list1, setList1] = useState([])
    const [list2,setList2] = useState([])
    useEffect(()=>{
        getList();
    },[])
    const getList = () => {
        axios.defaults.headers.common['Authorization'] = cookie.load("token");

        axios({
            method: 'get',
            url:
            '/banana/transfer/census/'
        }).then(
            res => {
                console.log(res)
                setList(res.data.data.file_ratio)
                // setList(res.data.file_type)
                setList1(res.data.data.top_ten.name)
                setList2(res.data.data.top_ten.value)
            }
        )
    }
    useEffect(() => {
       
        getchart();
    }, [list1,list2])
    const aaa = () => {
        console.log(list, list1)
    }
    const getchart = () => {
        
        var option = {
            title: {
                text: '文件使用情况',
                left: 'center',

            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: 'bottom'
            },
            series: [
                {
                    type: 'pie',
                    radius: '60%',
                    data:
                        // [
                        //     { name: 'img', value: 1 },
                        //     { name: 'audio', value: 1 },
                        //     { name: 'video', value: 1 },
                        //     { name: 'doc', value: 4 },
                        //     { name: 'other', value: 10 }
                        // ]
                    list
                    ,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        var mychart = echarts.init(document.getElementById('d1'))
        option && mychart.setOption(option)
        window.onresize = function () {
            mychart.resize();
        };
        // 柱状图，文件下载量top5   
        var option1 = {
            title: {
                text: '文件下载量top10',
                left: 'center',

            },
            tooltip: {
                trigger: 'item'
            },
            xAxis: {
                type: 'category',
                data: list1
            },
            yAxis: {},
            series: [
                {
                    type: 'bar',
                    data: list2,
                    itemStyle: {
                        borderType: 'solid',

                    }
                }
            ]
        };
        var mychart1 = echarts.init(document.getElementById('d2'))

        option1 && mychart1.setOption(option1)
        window.onresize = function () {
            mychart1.resize();
        };

    }


    return (
        <div >
            <div className='d1'>
                <PieChartOutlined style={{ fontSize: '3vh' }} />
                <span className='s1' onClick={aaa}>使用情况</span>
            </div>

            <div id="d1" >

            </div>
            <div id="d2">

            </div>
        </div>
    )
}


export default Usage