import axios from "axios";
import store from "@/store/index"

 const request = axios.create({
    baseURL:"http://localhost:8888/ProgramPark"//基础路径
});

request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const  user=store.state.user;
    if (user){
        config.headers.token=`${user}`
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

 export default request