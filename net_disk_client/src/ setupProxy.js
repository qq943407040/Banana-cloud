const proxy = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(
        proxy.createProxyMiddleware('/tf', { //`api`是需要转发的请求
            target: 'http://47.107.95.82/', // 这里是接口服务器地址
            changeOrigin: true
      
        })
    )
}