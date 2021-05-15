import React, { memo, useEffect, useState,useRef,useCallback } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import {
  message,
  Comment,
  Avatar,
  Tooltip,
  Button,
  Empty,
  Alert,
  Tag,
  Card,
  Input,
  Modal,
  Form
} from "antd";

import {
  GithubOutlined,
  QqOutlined,
  FieldTimeOutlined,
  UserOutlined,
  DingtalkOutlined,
  LockOutlined
} from "@ant-design/icons";
import { AboutWrapper } from "./style";
import { getUserInf } from "@/api/user";
import {
  getCommentList,
  anonymousComment,
  verifyIdentity,
  realNameComment,
  replyToCommentById,
} from "@/api/article";
export default memo(function About() {
  const { TextArea } = Input;
  const [userInfo, setUserInfo] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [articleId, setarticleId] = useState(null);
  const [verifyVisible, setverifyVisible] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [commentContent, setcommentContent] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [replyComment, setreplyComment] = useState({
    id: null,
    name: null,
  });
  const commentRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    _getCommentList();
    getUserInf().then((res) => {
      console.log("getUserInf", res);
      setUserInfo(res[0]);
    });
    
  }, []);
  const _getCommentList = useCallback(
    () => {
      getCommentList(null,2).then((res) => {
        console.log("getCommentList", res);
        setCommentList(res);
      });
    },
    [getCommentList]
  );
  function handleCommentChange(e) {
    console.log("输入", e.target.value);
    setcommentContent(e.target.value);
  }
  function handleOk() {
    setconfirmLoading(true);
    console.log(username, password);
    verifyIdentity(username, password).then((res) => {
      console.log("verifyIdentity", res);
      if (res) {
        if (replyComment.id) {
          // 回复评论
          replyToCommentById(
            articleId,
            commentContent,
            replyComment.id,
            res.data.id,
            2
          ).then((res) => {
            console.log("replyToCommentById", res);
            if (res) {
              message.success("实名回复成功");
              setverifyVisible(false);
              setconfirmLoading(false);
              _getCommentList();
              setcommentContent("");
              setreplyComment({
                id: null,
                name: null,
              });
            }
          });
        } else {
          // 发表动态评论
          realNameComment(articleId, commentContent, res.data.id,2).then(
            (res) => {
              console.log("realNameComment", res);
              if (res) {
                message.success("实名发表评论成功");
                setverifyVisible(false);
                setconfirmLoading(false);
                _getCommentList();
                setcommentContent("");
              }
            }
          );
        }
      } else {
        setconfirmLoading(false);
      }
    });
  }
  function handleCancel() {
    setverifyVisible(false);
  }
  function handleAnonymousSubmit() {
    console.log("匿名评论", commentContent);
    if (replyComment.id) {
      // 回复评论
      replyToCommentById(articleId, commentContent, replyComment.id,null,2).then(
        (res) => {
          console.log("replyToCommentById", res);
          if (res) {
            message.success("匿名回复成功");
            _getCommentList();
            setcommentContent("");
            setreplyComment({
              id: null,
              name: null,
            });
          }
        }
      );
    } else {
      // 发表动态评论
      anonymousComment(articleId, commentContent,2).then((res) => {
        console.log("anonymousComment", res);
        if (res) {
          message.success("匿名评论成功");
          setcommentContent("");
          _getCommentList();
        }
      });
    }
  }
  function handleVerifySubmit() {
    console.log("实名评论", commentContent);
    setverifyVisible(true);
  }
  const handleGoComment = useCallback(() => {
    commentRef.current.scrollIntoView();
    inputRef.current.focus();
  }, [commentRef, inputRef]);
  const replyToComment = useCallback(
    (id, name) => {
      setreplyComment({
        id,
        name,
      });
      handleGoComment();
      console.log(id, name);
    },
    [setreplyComment]
  );

  const handleTagClose = useCallback(() => {
    setreplyComment({
      id: null,
      name: null,
    });
  }, [setreplyComment]);
  const ExampleComment = ({ children, id, name, avatar, content, time }) => (
    <Comment
      style={{ background: "#fafbfc", marginBottom: "10px" }}
      author={<a>{name}</a>}
      avatar={<Avatar src={avatar} />}
      datetime={
        <Tooltip title={moment(time).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(time).fromNow()}</span>
        </Tooltip>
      }
      content={<p className="comment-content">{content}</p>}
      actions={[
        <span
          key="comment-basic-reply-to"
          onClick={() => replyToComment(id, name)}
        >
          回复
        </span>,
      ]}
    >
      {children}
    </Comment>
  );
  function renderComment(commentList) {
    return commentList.map((item) => {
      if (item.children) {
        if (item.user) {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name={item.user.name}
              avatar={item.user.avatar}
              time={item.updateTime}
              content={
                item.valid ? (
                  item.content
                ) : (
                  <Alert message="该条评论已被隐藏" type="warning" />
                )
              }
              valid={item.valid}
            >
              {renderComment(item.children)}
            </ExampleComment>
          );
        } else {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name="匿名用户"
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              time={item.updateTime}
              content={
                item.valid ? (
                  item.content
                ) : (
                  <Alert message="该条评论已被隐藏" type="warning" />
                )
              }
              valid={item.valid}
            >
              {renderComment(item.children)}
            </ExampleComment>
          );
        }
      } else {
        if (item.user) {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name={item.user.name}
              avatar={item.user.avatar}
              time={item.updateTime}
              content={
                item.valid ? (
                  item.content
                ) : (
                  <Alert message="该条评论已被隐藏" type="warning" />
                )
              }
              valid={item.valid}
            />
          );
        } else {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name="匿名用户"
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              time={item.updateTime}
              content={
                item.valid ? (
                  item.content
                ) : (
                  <Alert message="该条评论已被隐藏" type="warning" />
                )
              }
              valid={item.valid}
            />
          );
        }
      }
    });
  }
  return (
    <AboutWrapper>
      <Card title="个人信息">
        <div className="info-wrapper">
          <div className="info-box">
            <div className="info-avatar  info-item">
              <img src={userInfo.avatarUrl} alt="" />
            </div>
            <div className="info-name info-item">{userInfo.name}</div>
            <div className="info-age  info-item">
              <span>
                <UserOutlined />
              </span>
              {userInfo.age}岁
            </div>
            <div className="info-email  info-item">
              <span>
                <DingtalkOutlined />
              </span>
              {userInfo.email}
            </div>
            <div className="info-qq  info-item">
              <span>
                <QqOutlined />
              </span>
              {userInfo.qq}
            </div>
            <div className="info-github info-item">
              <span>
                <GithubOutlined />
              </span>
              <a href={userInfo.github} target="_blank">
                {userInfo.github}
              </a>
            </div>
            <div className="info-createtime info-item">
              {" "}
              <span>
                <FieldTimeOutlined />
              </span>
              {moment(userInfo.createAt).format("YYYY-MM-DD")}
            </div>
          </div>
          <div className="leave-msg-box">
            <Card title="留言区">
              <div className="comment-box" ref={commentRef}>
                <div className="commit-submit">
                  {replyComment.id && (
                    <Tag
                      style={{ display: "flex", alignItems: "center" }}
                      closable
                      onClose={(e) => {
                        e.preventDefault();
                        handleTagClose();
                      }}
                    >
                      <div className="reply-box">
                        <div>回复：</div>
                        <div className="reply-name">{replyComment.name}</div>
                      </div>
                    </Tag>
                  )}

                  <TextArea
                    ref={inputRef}
                    placeholder="输入评论..."
                    value={commentContent}
                    onChange={handleCommentChange}
                  />
                  {commentContent.length > 0 && (
                    <div className="button-box">
                      <Button onClick={handleAnonymousSubmit}>匿名发表</Button>
                      <Button type="primary" onClick={handleVerifySubmit}>
                        实名发表
                      </Button>
                    </div>
                  )}
                </div>
                {renderComment(commentList)}
                {commentList.length === 0 && (
                  <Empty
                    style={{ marginTop: "70px" }}
                    description="占时没有评论奥"
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
      </Card>
         {/* 评论对话框 */}
         <Modal
        title="校验身份"
        visible={verifyVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form name="normal_login" className="login-form">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "请填写账号!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入账号"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请填写密码！",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </AboutWrapper>
  );
});
