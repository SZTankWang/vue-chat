<script setup lang="ts">
import { useOnlineStore } from '@/stores/onlineStore';
import { sendMessage } from '../Tool/Websocket';
const onlineStore = useOnlineStore();


onlineStore.$subscribe((mutation,state)=>{
    console.log("talking to",state.talkingTo)
})

function send(){
    const selfId = onlineStore.getId;
    const recvId = onlineStore.getTalkingTo;
    const message = (document.getElementById("chat-input")! as HTMLInputElement).value;
    console.log("sending message:",
    selfId+";"+recvId+";"+message
    )
    sendMessage(selfId+";"+recvId+";"+message);
}

</script>

<template>
<div class="chat-content">
<div class="message-container">
    <div class="message-row">
    <div class="people">
        levi
    </div>
    <div class="message">
        But why smiling man her imagine married. Chiefly can man her out believe manners cottage colonel unknown. Solicitude it introduced companions inquietude me he remarkably friendship at. My almost or horses period. Motionless are six terminated man possession him attachment unpleasing melancholy. Sir smile arose one share. No abroad in easily relied an whence lovers temper by. Looked wisdom common he an be giving length mr.

    </div>
</div>
<div class="message-row my-message-row">
    <div class="people">
        levi
    </div>
    <div class="message my-message">
        But why smiling man her imagine married. Chiefly can man her out believe manners cottage colonel unknown. Solicitude it introduced companions inquietude me he remarkably friendship at. My almost or horses period. Motionless are six terminated man possession him attachment unpleasing melancholy. Sir smile arose one share. No abroad in easily relied an whence lovers temper by. Looked wisdom common he an be giving length mr.

    </div>
</div>

</div>

<div class="input-box">
    <input type="text" id="chat-input">
</div>
<div class="send-btn"
    @click="send"
>send</div>
</div>


</template>


<style scoped>
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

}
.my-message{
    margin-right:1rem;
}
.input-box{
    position:absolute;
    bottom:-16px;
    width:80%;
}
.input-box>input{
    width:80%;
    height:2rem;
    font-size:1rem;
    border:1px solid var(--deep-grey);
}
.input-box>input:focus{
    outline:none;
}
.send-btn{
    position:absolute;
    left:67%;
    bottom:-14px;
    padding:0.5rem;
    background-color: var(--light-grey);
}
.send-btn:hover{
    cursor: pointer;
    background-color: var(--deep-grey);
}
</style>