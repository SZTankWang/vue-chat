<script setup lang="ts">
import Header from './Header/Header.vue';
import ChatList from "./ChatList/ChatList.vue"
import ChatContent from "./ChatContent/ChatContent.vue"
import { chatURL } from '@/Constants';
import { onMounted, onUnmounted } from 'vue';
import {useOnlineStore} from "@/stores/onlineStore";
import Search from './Search/Search.vue';
import { ref,reactive } from 'vue';
import type { user } from '@/Type';
import { createWS } from './Tool/Websocket';

const onlineStore = useOnlineStore()
const showSearch = ref(false)
const selectedChat:{data:user[]} = reactive({data:[]})


let ctrl = false 

//keydown handler
function keydownHandler(event){
    if(event.ctrlKey){
            console.log("ctrl")
            ctrl = true 
        }
        if(event.key==="f" && ctrl){
            event.preventDefault()
            showSearch.value=true
            ctrl = false;
        }
}

function clickHandler(event){
    if(showSearch.value && event.target.className=="modal" ){
        showSearch.value = false;
    }
}

//关闭搜索框，刷新chat列表
function refreshChat(newUser:user){
    //从localstorage获取选中的chat
    // Object.entries(localStorage).map(item=>console.log(item))
    setTimeout(()=>{
        showSearch.value=false
        if(newUser._id!==undefined){
            selectedChat.data.splice(0,0,newUser)

        }  
    },1000)

}

onMounted(()=>{
    
    //initiating a web socket connection
    createWS();
    document.addEventListener("keydown",keydownHandler)
    document.addEventListener("click",clickHandler)


})

//尝试从localStorage中读取chatList
onMounted(()=>{
    //后期可能要将chatlist的存储格式变为stringify(object)
    Object.entries(localStorage).map((item:[string,string])=>{
        let [id,username] = item;
        selectedChat.data.push({
            _id:id,
            username:username
        })
    })
})
onUnmounted(()=>{
    document.removeEventListener("keydown",keydownHandler)
    document.removeEventListener("click",clickHandler)
})

</script>

<template>
    <!-- chat container -->
    <div class="chat-container base-shadow-div">
    <!-- header bar -->
    <Header/>
    <!-- content -->
    <div class="chat-content-container">
                <!-- chat list -->
                <ChatList :selected-chat="selectedChat.data"/>
                <!-- chat -->
                <ChatContent 
                v-if="onlineStore.getTalkingTo!==''" 
                :current-talking="onlineStore.getTalkingTo"/>

    </div>
    <div class="prompt">
                    Press Ctrl+F to search for user
    </div>

    <Search v-if="showSearch" @close-search="refreshChat"/>
    </div>
        
</template>

<style scoped>
@import "../assets/base.css";
.chat-container{
    height:80%;
    min-height: 512px;
    width:80%;
    background:var(--main-color);
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    padding:0.6rem;
    min-width:800px;
    animation-name:fade-in;
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes fade-in {
    from{
        opacity:0
    }
    to{
        opacity:1
    }
    
}
.chat-content-container{
    height:80%;
    display: flex;
    flex-direction: row;
}

.prompt{
    position: fixed;
    bottom: 0rem;
    left: 0;
    right: 0;
    margin: auto;
    width:fit-content;
    font-size:1.3rem;
    color:var(--deep-grey)
}
</style>