import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createRouter,createWebHashHistory} from "vue-router"
import {useOnlineStore} from "@/stores/onlineStore";

import App from './App.vue'

import "./assets/base.css"

const Login = ()=>import("./components/Login.vue")
const Chat = ()=>import("./components/Chat.vue")

const routes = [
    {path:"/",redirect:"/login"},
    {path:"/login",component:Login},
    {path:"/chat",component:Chat}

]

const router = createRouter({
    history:createWebHashHistory(),
    routes

})

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')
const onlineStore = useOnlineStore();
//路由守卫
router.beforeEach((to,from)=>{
    if(to.fullPath == "/login"){
        console.log("check login state")
        if(onlineStore.isOnline){
            return false;
        }
    }
    

})