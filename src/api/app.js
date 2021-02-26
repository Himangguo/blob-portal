import request from "./request"
// 校验用户登录态
export const testUserLoginStatus = ()=>{
    return request({
        method:'get',
        url:"/test"
    })
}