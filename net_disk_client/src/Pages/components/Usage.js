import React, { Component, useState,useEffect,useMemo } from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/pages/Usage.css'
import '../../Styles/header.css'
import * as echarts from 'echarts';
import axios from 'axios'

import {
    PieChartOutlined
} from '@ant-design/icons';
// 使用情况页面
const Usage = (props) => {
    
    const [list, setList] = useState([])
    const [list1, setList1] = useState([])
    useEffect(()=>{
        // 需要在 componentDidMount 执行的内容
        getList();
      }, [])
    const getList = ()=>{
            axios({
                method: 'get',
                url: 'http://rap2api.taobao.org/app/mock/296818/infor',
            }).then(
                res => {    
                    setList(res.data.file_type)
                    setList1(res.data.data1)
                }
            )     
        }
          useEffect(() => {
            getchart();
          },[list1])
    const getchart=()=>{
        
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
                    //     {
                    //         value: 50, name: '文档'
                    //     },
                    //     {
                    //         value: 15, name: '文s'
                    //     }
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
                text: '文件下载量top5',
                left: 'center',

            },
            tooltip: {
                trigger: 'item'
            },
            xAxis: {
                data: ['文件1', '文件2', '文件3', '文件4', '文件5']
            },
            yAxis: {},
            series: [
                {
                    type: 'bar',
                    data: list1,
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
            <div  className='d1'>
                <PieChartOutlined style={{ fontSize: '3vh' }} />
                <span className='s1'>使用情况</span>
            </div>

            <div id="d1" >

            </div>
            <div id="d2">

            </div>
        </div>
    )
}


export default Usage