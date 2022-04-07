module.exports = options =>{
    // 通过session去获取是否有登陆成功后保存的openId
    return async function adminauth(ctx,next){
        console.log(ctx.session.openId)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}