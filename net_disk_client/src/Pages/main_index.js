import React, { useState, useEffect } from 'react';
import '../Styles/main_index.css'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import { Layout, Menu, Avatar, Row, Col, Button, Affix, message } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  LogoutOutlined,
  LoginOutlined,
  MenuOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  CloudUploadOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import Usage from './components/Usage';
import All_file from './components/All_file';
import recycle_bin from './components/recycle_bin';
import About_us from './components/About_us';
import Detailed from './components/Detailed';
import Infor from './components/infor';
import cookie from "react-cookies";
import Individual_infor from './components/Individual_infor';
import Test from './Test'
import axios from 'axios';


// 整体布局
const Main_index = (props) => {
  const { Header, Footer, Sider, Content } = Layout;
  // 头像
  const [avatar,setAvatar] = useState("https://octodex.github.com/images/minion.png")
  const [username, setusername] = useState('请先登录')
  // 读取cookie查找用户是否存在
  useEffect(() => {
    // todo:后端改完返回值后修改此处
    if (
      cookie.load("token") != null
      // sessionStorage.getItem("token")
    ) {
      axios.defaults.headers.common['Authorization'] = cookie.load("token")
      ;
      axios({
        method: 'get',
        url: '/banana/account-center/account/info/' + cookie.load("user_id"),

      }).then(
        res => {
          console.log(res)
          let cookieTime = new Date(new Date().getTime + 3600*24*7);
          setusername("你好，" + res.data.data.name)
          cookie.save("email", res.data.data.email, { expires: cookieTime,path:'/' })
          cookie.save("user_name", res.data.data.name, { expires: cookieTime,path:'/' })
          cookie.save("telephone",res.data.data.telephone,{ expires: cookieTime,path:'/' })
          cookie.save("signature",res.data.data.signature,{ expires: cookieTime,path:'/' })
          setAvatar(res.data.data.avatar)
        }
      )
      var btn1 = document.getElementById('bt1')
      btn1.style.display = "none"
    }
    else {
      var btn = document.getElementById('bt')
      btn.style.display = "none"
    }

  }, [])
  // 跳转登录页面
  const toLogin = () => {
    props.history.push('/login')
  }
  // 登出功能
  const Login_out = () => {
    cookie.remove("user_id",{path:'/'});
    cookie.remove("token",{path:'/'})
    cookie.remove("telephone",{path:'/'});
    cookie.remove("email",{path:'/'});
    cookie.remove("user_name",{path:'/'});
    cookie.remove("signature",{path:'/'});
    // sessionStorage.removeItem("token")
    props.history.push('/login')
    axios({
      method: 'get',
      url: '/banana/account-center/logout'
    }).then(res => {
      console.log(res)
    })
  }
  // 判断左侧item跳转页面
  const handclick = e => {
    if (cookie.load("token") != null) {
      if (e.key == "all") {
        props.history.push('/index/allfiles')

      }
      if (e.key == 'usage') {
        props.history.push('/index/usage')
      }
      if (e.key == "recycle_bin") {
        props.history.push('/index/recycle_bin')
      }
      if (e.key == 'aboutus') {
        props.history.push('/index/aboutus')
      }
    }

  }
  // 跳转个人信息页面
  const toIndividual = () => {
    if (username == '请先登录') {

    }
    else {
      props.history.push('/index/individual')
    }
  }

  return (
    <div className='main_index'>
      <Layout style={{ minHeight: '100vh' }}>
        <Affix>
          <Sider width={'18vw'} className='sider'>
            <div className='logo'>
              <span >香蕉快传</span>
            </div>
            <div className='logo'>
              <Avatar size={150} src={avatar} /></div>
            {/* <span className='span1'> 预览</span> */}
            <Menu defaultSelectedKeys={['1']} mode="inline" className='sider_menu' onClick={handclick}>
              <Menu.Item key="usage" style={{ height: '7vh' }}>
                <div><PieChartOutlined style={{ fontSize: '3vh' }} />
                  <span className='span2'>使用情况
                  </span>
                </div>
              </Menu.Item>
              {/* <span className='span1'>所有文件</span> */}
              <Menu.Item key="all" style={{ height: '7vh' }}>
                <div><DesktopOutlined style={{ fontSize: '3vh' }} />
                  <span className='span2'>
                    全部文件
                  </span></div>
              </Menu.Item>
              <Menu.Item key="recycle_bin" style={{ height: '7vh' }}>
                <div><CloudUploadOutlined style={{ fontSize: '3vh' }} />
                  <span className='span2'>回收站</span>
                </div>
              </Menu.Item>
              {/* <Menu.Item key="4" style={{ height: '7vh' }}>
                <div><FileImageOutlined style={{ fontSize: '3vh' }} />
                  <span className='span2'>我的图片</span></div>
              </Menu.Item>
              <Menu.Item key="5" style={{ height: '7vh' }}>
                <div><VideoCameraOutlined style={{ fontSize: '3vh' }} />
                  <span className='span2'>我的视频</span></div>
              </Menu.Item> */}
              <Menu.Item key="aboutus" style={{ height: '7vh' }}>
                <div><QuestionCircleOutlined style={{ fontSize: '3vh' }} />
                  <span className='span2'>关于我们</span></div>
              </Menu.Item>
            </Menu>
            <div className='button'>
              <Button id='bt' className='button_out'
                type="primary" shape="round" icon={<LogoutOutlined />} danger
                onClick={()=>Login_out()}>
                <span>退出登录</span>
              </Button>
              <Button id='bt1' className='button_out'
                type="primary" shape="round" icon={<LoginOutlined />}
                onClick={toLogin}>
                <span>请先登录</span>
              </Button>
            </div>

          </Sider>
        </Affix>

        <Layout className="site_layout">
          <Header className='header'  >
            <Row type="flex" justify="center">
              <Col xs={6} sm={6} md={8} lg={8} xl={8}>
                <MenuOutlined style={{ color: 'rgba(0, 0, 0, 0.863)', fontSize: '3vh' }} />
              </Col>
              <Col offset={0} className='infor' xs={8} sm={8} md={8} lg={12} xl={12}>
                <Infor></Infor>
              </Col>
              <Col offset={0} className='person_data' xs={8} sm={8} md={8} lg={4} xl={4}>
                <span onClick={toIndividual}>{username}</span>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div>
              {/* <Redirect path="/index/" to="/index/usage" /> */}
              <Route path="/index/usage" component={Usage} />
              <Route path="/index/allfiles" component={All_file} />
              <Route path="/index/recycle_bin" component={recycle_bin} />
              <Route path="/index/aboutus" component={About_us} />
              <Route path="/index/detailed/:id" component={Detailed} />
              <Route path="/index/individual" component={Individual_infor} />
              <Route path="/index/test" component={Test} />


            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Bpan ©2021 Created by Bnuzer</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
export default Main_index;