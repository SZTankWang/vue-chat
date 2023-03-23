<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, reactive, watch } from 'vue';
import { useOnlineStore } from '@/stores/onlineStore';
import {useMessageStore} from "@/stores/messageStore";
import { sendMessage } from '../Tool/Websocket';
import Message from './Message.vue';
import type {message} from "@/Type";
import { storeToRefs } from 'pinia';

//使用currentTalking这个prop来控制当前展示的消息
const props = defineProps<{currentTalking:string}>()

const onlineStore = useOnlineStore();
const messageStore = useMessageStore();
// const messageDisplayed:{data:message[]} = reactive({data:[]})

//使用store的getter来获取消息
const {getMessages} = storeToRefs(messageStore)







//组件需要侦听messageStore的变化，如果当前的talkingTo
//与store中发生变化的message[]对应，则需要更新messageDisplayed


function send(){
    const selfId = onlineStore.getId;
    const recvId = onlineStore.getTalkingTo;
    const input = (document.getElementById("chat-input")! as HTMLInputElement);
    const message = input.value;
    if(message.length){
        console.log("sending message:",
    selfId+";"+recvId+";"+message
    )
    sendMessage(selfId+";"+recvId+";"+message);
    //push to messageStore 
    //belong to conversation: recvId; from: myself
    messageStore.pushMessage(recvId,{from:selfId,content:message})
    //清空输入框
    input.value = "";
    }

}
function enter(event:KeyboardEvent){
    if(event.key=="Enter"){
            send()
        }
}

//enter事件绑定
onMounted(()=>{
    document.addEventListener("keydown",enter)
})
onUnmounted(()=>{
    document.removeEventListener("keydown",enter)
})
</script>

<template>
<div class="chat-content">
<div class="message-container">
    <!-- 
        目前，message渲染没有指定key
     -->
<Message 
:from="m.from"
:content="m.content"
v-for="m of getMessages(props.currentTalking)" />

<div class="place-holder"></div>

</div>
<div class="input-wrapper">
    <div class="input-box">
    <input type="text" id="chat-input">
</div>
<div class="send-btn"
    @click="send"
>send</div>

</div>
</div>


</template>


<style >
@import "@/assets/base.css";
.chat-content{
    width:70%;
    height:100%;
    padding:0.3rem;
    
    position:relative;
    /* overflow-y:visible; */
    /* background-color: antiquewhite; */
}
.message-container{
    overflow-y:auto;
    height:100%;
}
.message-row{
    min-height:1.5rem;
    /* background-color:aquamarine; */
    display: flex;
    flex-direction: row;
    margin-top:1rem;
}
.my-message-row{
    flex-direction: row-reverse;
}
.message-row:hover{
    background: var(--light-grey);
}
.message-row>div{
    /* display:inline-block; */
    padding:0.3rem;
    border-radius:3px;

}

.place-holder{
    height:3rem;
}
.people{
    background-color:var(--light-grey);
    /* position:absolute; */
    height:fit-content;
    width:fit-content;

}
.people:hover{
    cursor:pointer;
}
.message{
    max-width:20rem;
    background-color: var(--light-grey);
    margin-left:1rem;
    animation-name:fade-in;
    animation-duration:0.3s;
}
@keyframes fade-in {
    from{
        transform: translateY(6px);
    }
    to{

    }
}
.my-message{
    margin-right:1rem;
}
.input-wrapper{
    position:absolute;
    bottom:0;
    width:100%;
}
.input-wrapper>*{
    display:inline-block;
    padding: 0.5rem;
    box-sizing: border-box;
}
.input-box{
    width:75%;
}
.input-box>input{
    width:100%;
    height:2rem;
    font-size:1rem;
    border:1px solid var(--deep-grey);
}
.input-box>input:focus{
    outline:none;
}
.send-btn{
    /* position:absolute; */
    /* left:67%; */
    /* bottom:-14px; */
    padding:0.5rem;
    background-color: var(--light-grey);
    position:relative;
    left:1rem;
    border-radius:3px;
}
.send-btn:hover{
    cursor: pointer;
    background-color: var(--deep-grey);
}

.input-wrapper{
    height:fit-content;
    background-color:#ffffff;
}
</style>