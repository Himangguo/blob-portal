import React, { memo, useEffect, useState, useCallback, useRef } from "react";

import {
  message,
  Badge,
  Comment,
  Avatar,
  Tooltip,
  Divider,
  Input,
  Modal,
  Button,
  Form,
  Empty,
  Alert,
  Tag,
} from "antd";
import {
  LikeFilled,
  CommentOutlined,
  FormOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/zh-cn";
import ArticleRender from "./article-render";
import { ArticleDetailWrapper } from "./style";
import {
  getrticleDetailById,
  thumbsupById,
  getCommentList,
  anonymousComment,
  verifyIdentity,
  realNameComment,
  replyToCommentById,
} from "@/api/article";
export default memo(function ArticleDetail(props) {
  const { TextArea } = Input;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articleId, setarticleId] = useState(null);
  const [thumbsup, setthumbsup] = useState(0);
  const [commentList, setCommentList] = useState([]);

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
    console.log(props.match.params.id);
    _getrticleDetailById(props.match.params.id);
    _getCommentList(props.match.params.id);
  }, [props.match.params.id]);
  const handleThumbsup = useCallback(() => {
    console.log("点赞", articleId);
    thumbsupById(articleId).then((res) => {
      console.log("thumbsupById", res);
      if (res.result) {
        setthumbsup(res.data);
        message.success("感谢您的赞赏");
      }
    });
  }, [thumbsupById, articleId]);
  function _getrticleDetailById(id) {
    getrticleDetailById(id).then((res) => {
      console.log("getrticleDetailById", res);
      setTitle(res[0].title);
      setContent(res[0].content);
      setarticleId(res[0].id);
      setthumbsup(res[0].thumbsUp);
    });
  }
  const _getCommentList = useCallback(
    (momentId) => {
      getCommentList(momentId).then((res) => {
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
            res.data.id
          ).then((res) => {
            console.log("replyToCommentById", res);
            if (res) {
              message.success("实名回复成功");
              setverifyVisible(false);
              setconfirmLoading(false);
              _getCommentList(articleId);
              setcommentContent("");
              setreplyComment({
                id: null,
                name: null,
              });
            }
          });
        } else {
          // 发表动态评论
          realNameComment(articleId, commentContent, res.data.id).then(
            (res) => {
              console.log("realNameComment", res);
              if (res) {
                message.success("实名发表评论成功");
                setverifyVisible(false);
                setconfirmLoading(false);
                _getCommentList(articleId);
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
      replyToCommentById(articleId, commentContent, replyComment.id).then(
        (res) => {
          console.log("replyToCommentById", res);
          if (res) {
            message.success("匿名回复成功");
            _getCommentList(articleId);
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
      anonymousComment(articleId, commentContent).then((res) => {
        console.log("anonymousComment", res);
        if (res) {
          message.success("匿名评论成功");
          setcommentContent("");
          _getCommentList(articleId);
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
    <ArticleDetailWrapper>
      <div className="article-content">
        <ArticleRender title={title} content={content} />
        <div className="comment-box" ref={commentRef}>
          <Divider orientation="left" plain>
            评论区
          </Divider>
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
            <Empty style={{ marginTop: "70px" }} description="占时没有评论奥" />
          )}
        </div>
      </div>
      <div className="right-action">
        <Badge count={thumbsup}>
          <div className="thumbsup btn" title="点赞" onClick={handleThumbsup}>
            <LikeFilled />
          </div>
        </Badge>
        <Badge count={commentList.length}>
          <div
            className="comment-btn btn"
            title="评论"
            onClick={handleGoComment}
          >
            <CommentOutlined />
          </div>
        </Badge>

        <div className="leave-msg btn" title="留言">
          <FormOutlined />
        </div>
      </div>
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
    </ArticleDetailWrapper>
  );
});
