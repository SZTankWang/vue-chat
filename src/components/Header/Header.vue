<script setup lang="ts">
import { useOnlineStore } from '@/stores/onlineStore';
import { computed } from '@vue/reactivity';
const onlineStore = useOnlineStore()
</script>

<template>
    <div class="header-container">
        
        <div class="icon">
            <div class="status" :class="{
                online:onlineStore.isOnline,
                offline:!onlineStore.isOnline
                }">                
            </div>
        </div>
        <div class="time">

        </div>
    </div>

</template>


<style scoped>
@import "@/assets/base.css";
    .header-container{
        height:3rem;
        position:relative;
        padding:0.8rem;
    }
    .icon{
        width:2rem;
        height:2rem;
        border-radius: 50%;
        position:absolute;
        left:16px;
        text-align: center;
        background-color: antiquewhite;
    }
    .icon>span{
        margin-top:3px;
    }
    .status{
        width:5px;
        height:5px;
        border-radius: 50%;
        position:relative;
        top: 80%;
        left: 90%;
        
    }
    .offline{
        background-color:var(--light-grey) ;
        transition:all 0.8s ease;
        
    }
    .online{
        background-color:var( --font-color) ;
        transition:all 0.8s ease;

    }
    .time{
        width:25%;
        height:50%;
        position:absolute;
        right:16px;
        background-color: antiquewhite;
    }
</style>