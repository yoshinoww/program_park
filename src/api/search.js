import request from "@/utils/request";
export const   getSearchSuggestion=(keyWords,cnt)=>{
    return request({
        method:"get",
        url:`/article/getWarnByKey/${keyWords}/${cnt}`,
    })
}

export const   getSearchResults=(keyWords,cnt)=>{
    return request({
        method:"get",
        url:`/article/getAtcByKey/${keyWords}/${cnt}`,
    })
}
