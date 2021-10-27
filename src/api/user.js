/*用户相关*/
import request from "@/utils/request";


export  const  login=(data)=>{
    return request({
        method:"post",
        url:"/user/login",
        data
    })
}

export  const  logout=()=>{
    return request({
        method:"post",
        url:"/user/logout",
    })
}
export  const  sendCode=(data)=>{
    return request({
        method:"post",
        url:"/sms/sendEmail",
        data
    })
}

export  const  getUserInfo=()=>{
    return request({
        method:"get",
        url:"/user/getUser",
    })
}

export  const  updateUserPhoto=(data)=>{
    return request({
        method:"post",
        url:"oss/uploadSalt",
        headers:{'Content-Type': 'multipart/form-data'},
        data,
    })
}

export  const  updateUserInfo=(data)=>{
    return request({
        method:"post",
        url:"user/updateUserInfo",
        data,
    })
}

export  const  getUserCollections=(page)=>{
    return request({
        method:"get",
        url:`/article/user1-article2/getAtc/${page}`,
    })
}

export  const  getUserArticles=(cnt)=>{
    return request({
        method:"get",
        url:`/article/getAtc/${cnt}`,
    })
}

export  const  getUserHistories=(cnt)=>{
    return request({
        method:"get",
        url:`/article/user/article-history/getAtc/${cnt}`,
    })
}