import Vue from "vue"
import VueRouter from "vue-router";
import {Dialog} from "vant";
import   store from "@/store/"

Vue.use(VueRouter)
//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: () => import("@/views/login/"),
            meta:{requireToken:false}
        },
        {
            path: '/search',
            component: () => import("@/views/search/"),
            meta:{requireToken:false}
        },
        {
            path: '/userSetting',
            component: () => import("@/views/UserSetting/"),
            meta:{requireToken:true}
        },
        {
            path: '/article',
            meta:{requireToken:false},
            component: () => import("@/views/articledetail/")
        },
        {
            path: '/chat',
            component: () => import("@/views/message/components/Chat"),
            meta:{requireToken:true}
        },
        {
            path: '/myarticles',
            component: () => import("@/views/my/components/MyArticles"),
            meta:{requireToken:true}
        },
        {
            path: '/mycollections',
            component: () => import("@/views/my/components/MyCollections"),
            meta:{requireToken:true}
        },
        {
            path: '/myhistories',
            component: () => import("@/views/my/components/MyHistories"),
            meta:{requireToken:true}
        },
        {
            path: '/',
            component: () => import("@/views/layout/"),
            children: [
                {
                    path: "",
                    component: () => import("@/views/home/"),
                    meta:{requireToken:false}
                },
                {
                    path: "my",
                    component: () => import("@/views/my/"),
                    meta:{requireToken:false},
                },
                {
                    path: "message",
                    component: () => import("@/views/message/"),
                    meta:{requireToken:true}
                },
                {
                    path: "creation",
                    component: () => import("@/views/creation/"),
                    meta:{requireToken:true}
                }
            ]
        },

    ]
})

    router.beforeEach((to,from,next)=>{
        if(to.meta.requireToken){
            if (store.state.user){
                next();
            }
            else Dialog.confirm({
                title: '消息提示',
                message: '改功能需要登录，确认登录？',
            })
                .then(() => {
                    // on confirm
                    router.replace({
                        path:"/login",
                        query:{
                            redirect:router.currentRoute.fullPath,
                        }
                    })
                   // next();
                })
                .catch(() => {
                    // on cancel
                    //next(false);
                });
        }else {
            next();
        }
    })

//暴露router
export default router