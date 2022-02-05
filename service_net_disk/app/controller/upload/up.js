'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');


class FileUploadController extends Controller {
  async upload() {
    const { ctx } = this
    // 获取前端传过来的第一个文件 如果前端传过来的是多个文件 就要选择遍历的方式去过去每个文件
    let file = ctx.request.files[0]
    // 给文件命名 以时间戳命名，避免重复
    const name = new Date().getTime()+path.extname(file.filename);
    // 读取文件流
    file = fs.readFileSync(file.filepath)
    // 写入文件流
    fs.writeFileSync(path.join('./', `app/public/${name}`), file)
    // 返回前端访问链接
    let url = `app/public/uploads/${name}`;
    // 返回文件上传处理结果
    ctx.body = {
      code: 200,
      data: {
        imgUrl: url
      },
      msg: '上传成功',

    }
}

}

module.exports = FileUploadController;

