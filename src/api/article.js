import request from "@/utils/request";
export const   getUserArticlesByChannelId=(channelId,page)=>{
    return request({
        method:"get",
        url:`/article/getAtcByCId/${channelId}/${page}`,
    })
}



export const   getArticleById=(id)=>{
    return request({
        method:"get",
        url:`/article/getArticleById/${id}`,
    })
}


export const   releaseArticle=(data)=>{
    return request({
        method:"post",
        url:`/article/saveArticle`,
        headers:{'Content-Type': 'multipart/form-data'},
        data,
    })
}

export const   likeArticle=(id)=>{
    return request({
        method:"get",
        url:`/article/Hand/${id}`,
    })
}

export const   attentionArticle=(id)=>{
    return request({
        method:"get",
        url:`/user/FanById/${id}`,
    })
}

export const   collectArticle=(id)=>{
    return request({
        method:"get",
        url:`/article/user1-article2/Collect/${id}`,
    })
}