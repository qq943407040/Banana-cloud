module.exports = app =>{
    const {router,controller} = app
    router.post('/user/checkuserLogin', controller.user.index.checkuserLogin)
    router.post('/user/checkuserRegister', controller.user.index.checkuserRegister)
    
}