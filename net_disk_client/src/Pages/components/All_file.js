import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  message,
  List,
  Radio,
  Breadcrumb,
  Button,
  Row,
  Col,
  Image,
  Upload,
  Space,
  Popover,
  Popconfirm,
  Checkbox,
  Modal,
  Spin,
  Form,
  Input,
} from "antd";
import "../../Styles/pages/all_files.css";
import "../../Styles/header.css";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import cookie from "react-cookies";
import moment from "moment";
import $ from "jquery";
import map from "../../store/Map";

import {
  DesktopOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Model } from "echarts";
// 全部文件页面
const All_files = () => {
  // 设置数据源
  const [data2, setData2] = useState([]);
  //
  const [previewDiv, setPreviewDiv] = useState(false);
  const [previewImg, setPreviewImg] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newDirModalVis, setNewDirModalVis] = useState(false);
  const [dirName, setDirName] = useState("");
  // 当前文件夹id
  const [did, setDid] = useState(0);

  // 面包屑导航内容
  const [bread, setBread] = useState([]);

  // 获取全部文件信息
  const getAllfiles = (did) => {
    let dataprops = {
      sort_object: 1,
      sort_type: 2,
      directory_id: did,
    };
    axios({
      method: "get",
      url: "/banana/transfer/file-list",
      params: dataprops,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      // console.log(res)
      if (res.data.msg == "ok") {
        message.success("获取列表成功");
        setDid(res.data.data.loc_id);
        if (
          res.data.data.dir_object != null &&
          res.data.data.file_object != null
        )
          setData2(res.data.data.dir_object.concat(res.data.data.file_object));
        else if (res.data.data.file_object != null)
          setData2(res.data.data.file_object);
        else if (res.data.data.dir_object != null)
          setData2(res.data.data.dir_object);
        setBread(res.data.data.dir_name_id);
      } else {
        message.error("获取列表失败");
      }
    });
  };
  // 初始化执行
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = cookie.load("token");
    getAllfiles(did);
  }, []);
  // 上传组件的属性
  const props = {
    name: "file",
    action: "/banana/tf/upload?did=" + did,
    headers: { Authorization: cookie.load("token") },
    maxCount: 1,

    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        getAllfiles(did);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    showUploadList: "false",
  };
  // 删除文件
  const deletefile = (id) => {
    setIsLoading(true);
    let dataprops = {
      fid: id,
    };
    axios({
      method: "post",
      url: "/banana/transfer/del-file/",
      data: dataprops,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    })
      .then((res) => {
        if (res.data.msg == "ok") {
          message.success("删除成功");
          getAllfiles();
        } else {
          message.error("删除失败");
        }
        console.log(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  };
  // 删除文件夹
  const deleteDir = (did) => {
    setIsLoading(true);
    let dataprops = {
      did: did,
    };
    axios({
      method: "post",
      url: "/banana/transfer/del-dir/",
      data: dataprops,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    })
      .then((res) => {
        if (res.data.msg == "ok") {
          message.success("删除成功");
          getAllfiles();
        } else {
          message.error("删除失败");
        }
        // console.log(res)
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  };
  // 下载文件
  const getfiles = (item) => {
    // console.log(item)
    setIsLoading(true);
    axios({
      method: "get",
      url: "/banana/transfer/download",
      params: {
        fid: item.fid,
      },
      responseType: "blob",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", //请求的数据类型为form data格式
      },
    })
      .then((res) => {
        // console.log(res)
        // 创建下载的链接
        const url = window.URL.createObjectURL(
          new Blob(
            [res.data]
            // 设置该文件的mime类型，这里对应的mime类型对应为.xlsx格式
          )
        );
        const link = document.createElement("a");
        link.href = url;
        // 从header中获取服务端命名的文件名
        const fileName = item.file_name;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        // console.log(error)
        alert("文件下载失败");
      });
  };

  // 文件预览
  const preview = (item) => {
    if ("file_type" in item) {
      // 允许的文件类型
      if (
        item.file_type == "gif" ||
        item.file_type == "jpeg" ||
        item.file_type == "png" ||
        item.file_type == "pdf" ||
        item.file_type == "mp4" ||
        item.file_type == "mp3" ||
        item.file_type == "doc" ||
        item.file_type == "wav" ||
        item.file_type == "jpg"
      ) {
        // 调用接口
        axios({
          method: "get",
          url: "/banana/transfer/preview/",
          params: {
            fid: item.fid,
          },
        }).then((res) => {
          if (
            item.file_type == "gif" ||
            item.file_type == "jpeg" ||
            item.file_type == "png" ||
            item.file_type == "jpg"
          ) {
            // 如果是图片格式的话将Image的src设为获取对应文件的url，并且设置Image为可见
            setImgSrc(res.data.data.file_str);
            setTimeout(() => {
              setPreviewImg(true);
            }, 500);
          } else {
            // 如果是音视频及文档格式的预览将iframe框架的src设为获取到的文件url，并且设iframe为可见
            setPreviewDiv(true);
            var iframe = document.getElementById("iframe1");
            iframe.src = res.data.data.file_str;
          }
        });
      } else message.error("暂不支持预览此格式文件");
    }
  };
  //无用方法
  const get = () => {};
  // 新建文件夹
  const newDir = () => {
    // console.log(did)
    let dataprops = {
      loc_did: did,
      dir_name: dirName,
    };
    if (dirName == "") {
      message.error("文件名不能为空");
    } else {
      axios({
        method: "post",
        url: "/banana/transfer/add-dir",
        data: dataprops,
        withCredentials: true,
        header: { "Access-Control-Allow-Origin": "*" },
      }).then((res) => {
        // console.log(res)
        if (res.data.msg == "ok") {
          message.success("添加成功！");
          getAllfiles(did);
          setNewDirModalVis(false);
        } else {
          message.error("添加失败！");
        }
      });
    }
  };
  // 判断文件类型返回对应图片
  const judgeSrc = (type) => {
    if (map.get(type) == "img")
      return "http://47.107.95.82:9000/peach-static/图片.png";
    else if (map.get(type) == "video")
      return "http://47.107.95.82:9000/peach-static/视频.png";
    else return "http://47.107.95.82:9000/peach-static/文件图片.png";
  };

  return (
    <div id="main">
      {/* 展示图片预览 */}
      <Image
        id="img1"
        preview={{
          visible: previewImg,
          onVisibleChange: (value) => {
            setPreviewImg(value);
          },
        }}
        width={200}
        hidden={true}
        src={imgSrc}
        onCancel={() => {
          setPreviewImg(false);
        }}
      ></Image>
      {/* 新建文件夹对话框 */}
      <Modal
        className="newDir_div"
        width="fit-content"
        visible={newDirModalVis}
        title="新建文件夹"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setNewDirModalVis(false);
        }}
        maskClosable="true"
        centered="true"
        onOk={() => newDir()}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="文件夹名称"
            name="dirName"
            rules={[{ required: true, message: "请输入文件夹名!" }]}
          >
            <Input onChange={(e) => setDirName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
      {/* 预览音视频及文档对话框 */}
      <Modal
        id="modal1"
        className="iframe_div"
        width="fit-content"
        // style={{height:'fit-content'}}
        visible={previewDiv}
        title="预览"
        onCancel={() => {
          setPreviewDiv(false);
          var iframe = document.getElementById("iframe1");
          iframe.src = "";
        }}
        footer={[]}
        maskClosable="true"
        centered="true"
      >
        <iframe
          align="middle"
          id="iframe1"
          className="iframe1"
          scrolling="no"
          allowFullScreen="true"
        ></iframe>
      </Modal>
      <div className="d1">
        <DesktopOutlined style={{ fontSize: "3vh" }} />
        <span className="s1">全部文件</span>
      </div>

      <div className="all_files">
        <div className="bread">
          <Breadcrumb id="bread1" separator=">">
            {bread.map((ele, index) => {
              return (
                <Breadcrumb.Item onClick={() => getAllfiles(ele.did)}>
                  <a>{ele.name}</a>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </div>
        <div>
          <Spin tip="Loading..." spinning={isLoading}>
            <Row type="flex" justify="center">
              <Col xs={6} sm={6} md={12} lg={12} xl={12}>
                <Button
                  onClick={() => setNewDirModalVis(true)}
                  className="new_dir"
                  icon={<PlusOutlined />}
                  size="large"
                >
                  创建文件夹
                </Button>
              </Col>

              <Col
                offset={0}
                className="file_up"
                xs={8}
                sm={8}
                md={12}
                lg={12}
                xl={12}
              >
                <Upload className="up" {...props}>
                  <Button type="primary">上传文件</Button>
                </Upload>
              </Col>
            </Row>
            <List
              itemLayout="vertical"
              dataSource={data2}
              pagination={{
                onChange: (page) => {
                  // console.log(page);
                },
                // pageSize: 6,
                defaultPageSize: 6,
                pageSizeOptions: [6, 10, 20, 50],
              }}
              header={
                <Row className="list-div">
                  <Col span={12}>
                    <b>名称</b>
                  </Col>
                  <Col span={2}>
                    <b>类别</b>
                  </Col>
                  <Col span={4}>
                    <b>修改时间</b>
                  </Col>
                  <Col span={3}>
                    <b>大小</b>
                  </Col>

                  <Col span={3}>
                    <b>操作</b>
                  </Col>
                </Row>
              }
              renderItem={(item) => (
                <List.Item key={item.key}>
                  <Row className="list-div">
                    <Col
                      span={12}
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Image
                        width={"1.6rem"}
                        style={{ position: "relative", top: "5px" }}
                        src={
                          "file_name" in item
                            ? judgeSrc(item.file_type)
                            : "http://47.107.95.82:9000/peach-static/文件夹.png"
                        }
                        preview={false}
                      ></Image>
                      {"file_name" in item ? (
                        <a
                          style={{ marginLeft: "1vw" }}
                          id="a1"
                          onClick={() => preview(item)}
                        >
                          {item.file_name}
                        </a>
                      ) : (
                        <a
                          style={{ marginLeft: "1vw" }}
                          id="a1"
                          onClick={() => getAllfiles(item.did)}
                        >
                          {item.dir_name}
                        </a>
                      )}
                    </Col>
                    <Col span={2}>
                      {"file_type" in item ? item.file_type : "文件夹"}
                    </Col>
                    <Col span={4}>
                      {moment(item.last_modified * 1000).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </Col>
                    <Col span={3}>{item.size}</Col>
                    <Col span={3}>
                      <Space size="middle">
                        {"file_type" in item ? (
                          <DownloadOutlined
                            onClick={
                              "file_type" in item ? () => getfiles(item) : get
                            }
                            style={{ fontSize: "2.4vh" }}
                          />
                        ) : (
                          <DownloadOutlined
                            style={{
                              fontSize: "2.4vh",
                              color: "rgb(201, 197, 197)",
                            }}
                          />
                        )}
                        {"file_type" in item ? (
                          <Popconfirm
                            title="确定删除文件?"
                            onConfirm={() => deletefile([item.fid])}
                            okText="确认"
                            cancelText="取消"
                          >
                            <a href="" style={{ color: "black" }}>
                              <DeleteOutlined style={{ fontSize: "2.4vh" }} />
                              {/* {item.fid} */}
                            </a>
                          </Popconfirm>
                        ) : (
                          <Popconfirm
                            title="确定删除文件夹?"
                            onConfirm={() => deleteDir([item.did])}
                            okText="确认"
                            cancelText="取消"
                          >
                            <a href="" style={{ color: "black" }}>
                              <DeleteOutlined style={{ fontSize: "2.4vh" }} />
                              {/* {item.did} */}
                            </a>
                          </Popconfirm>
                        )}
                      </Space>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};
export default All_files;
