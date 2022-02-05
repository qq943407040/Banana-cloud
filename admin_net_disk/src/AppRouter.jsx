import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AdminIndex from './Pages/Adminindex';
import Login from './Pages/Login'
//动态传值四个步骤：设置规则 传递值 接收值 显示内容

function AppRouter() {
    return (
        <Router>
            {/* 首页一般精确匹配 */}
            <Route path="/" exact component={Login}>
            </Route>
            <Route path="/index/"  component={AdminIndex}>
            </Route>
        </Router>
    )
}

export default AppRouter;