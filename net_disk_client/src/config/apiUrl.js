let ipUrl = 'http://175.178.183.25:7001/user/' 
let ipUrl1 = 'http://175.178.183.25:7001/admin/' 
let ipUrl2 = 'http://127.0.0.1:4523/mock/546121/'
let Url = 'http://47.107.95.82/banana/'

let servicePath = {
    getArticleList:ipUrl1 + 'getArticleList' ,  //  文章列表 
    checkuserLogin:ipUrl + 'checkuserLogin' ,  //  检查用户名密码是否正确
    checkuserRegister:ipUrl+'checkuserRegister',//注册接口
    getArticleById:ipUrl1 + 'getArticleById/' ,  //  根据ID获得文章详情
    getallfiles:ipUrl2+'allfiles',//获取所有文件信息
}
let Path = {
    checkuserLogin:Url+'account-center/common/login'
}
export default servicePath;