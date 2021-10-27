import request from "@/utils/request";
export const   getComments=(params)=>{
    return request({
        method:"get",
        url:"/comment/getComments",
        params
    })
}

export  const  getUserMessages=(page)=>{
    return request({
        method:"get",
        url:`/article/comment/getCommentFrontPage/${page}`,
    })
}

export  const  getOneComment=(id,cnt)=>{
    return request({
        method:"get",
        url:`/article/comment/getOneComment/${id}/${cnt}`,
    })
}

export  const  getTwoComment=(id,cnt)=>{
    return request({
        method:"get",
        url:`/article/comment/getTwoComment/${id}/${cnt}`,
    })
}

export  const  sendComment=(data)=>{
    return request({
        method:"post",
        url:`/article/comment/saveComment`,
        data,
    })
}