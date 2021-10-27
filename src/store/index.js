//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
import {getItem,setItem} from "@/utils/storage";

Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {

}
//准备mutations对象——修改state中的数据
const mutations = {
    setUser(state,data){
        state.user=data;
        setItem("user",state.user);
    }
}
//准备state对象——保存具体的数据
const state = {
    user:getItem("user"),
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})