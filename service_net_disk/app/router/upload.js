module.exports = app =>{
    const {router,controller} = app
    router.post('/upload/up', controller.upload.up.upload);
    
}