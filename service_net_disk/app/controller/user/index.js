'use strict';

const Controller = require('egg').Controller

class UserController extends Controller {


    // 检查登陆用户密码，并且存入session
    async checkuserLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT id,userName FROM user WHERE userName = '" + userName +
            "' AND password = '" + password + "'"

        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId,list:res} 
        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }
    async checkuserRegister() {
        let tmpuser = this.ctx.request.body
        // tmpArticle.
        const result = await this.app.mysql.insert('user', tmpuser)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }
    
}

module.exports = UserController