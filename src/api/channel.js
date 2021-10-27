import request from "@/utils/request";
export const   getAllChannels=()=>{
    return request({
        method:"get",
        url:"/article/channel/getChannels",
    })
}