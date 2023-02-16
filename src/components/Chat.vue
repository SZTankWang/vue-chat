<script setup lang="ts">
import Header from './Header/Header.vue';
import ChatList from "./ChatList/ChatList.vue"
import ChatContent from "./ChatContent/ChatContent.vue"
</script>

<template>
    <!-- chat container -->
    <div class="chat-container base-shadow-div">
    <!-- header bar -->
    <Header/>
    <!-- content -->
    <div class="chat-content-container">
                <!-- chat list -->
                <ChatList/>
                <!-- chat -->
                <ChatContent/>

    </div>
    </div>
        
</template>

<style scoped>
@import "../assets/base.css";
.chat-container{
    height:65vh;
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
</style>