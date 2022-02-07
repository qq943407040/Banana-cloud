import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../../Styles/pages/detailed.css'
import '../../Styles/header.css'
import axios from 'axios'
import servicePath from '../../config/apiUrl'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import { Row, Col, List, Breadcrumb, Affix } from 'antd'
import { marked } from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';
import 'markdown-navbar/dist/navbar.css';



import {
    QuestionCircleOutlined
} from '@ant-design/icons';
// 帮助点进后的细节页
const Detailed  = (props)=> {
    // 不要加this
    const id =props.match.params.id
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,   //github样式
        pedantic: false,
        sanitize: false, //忽略html,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    })
    // 通过id获取文章内容
    const getArticleById = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleById+id,
            // withCredentials: true,
            // header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setArticleContent(res.data.data[0].article_content)
                setArticleTitle(res.data.data[0].title)
                console.log(res.data.data[0])
            }
        )
    }
    useEffect(() => {
        getArticleById()
    }, [])
    let html = marked(articleContent)
    return (
        <div >
            <div className='d1'>
                <QuestionCircleOutlined style={{ fontSize: '3vh' }} />
                <span className='s1'>关于我们</span>
            </div>
            <div id="detailed_div" >
                <div className='bread'>
                <Breadcrumb separator=">">
                <Breadcrumb.Item ><Link to='/index/aboutus'>关于我们</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{articleTitle}</Breadcrumb.Item>
              </Breadcrumb>
                </div>
            
                <div>
                    <div className="detailed-title">
                        {articleTitle}
                    </div>

                    <div className="detailed-content"
                        dangerouslySetInnerHTML={{ __html: html }}   
                    >
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Detailed