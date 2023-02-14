import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createRouter,createWebHashHistory} from "vue-router"

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

// app.use(createPinia())
app.use(router)

app.mount('#app')
