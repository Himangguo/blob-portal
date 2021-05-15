import request from "./request"
const base_url = "/user";
export const getUserInf = ()=>{
    return request({
        method:"get",
        url:base_url+"/getInfo"
    })
}