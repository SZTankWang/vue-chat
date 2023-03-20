<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive,ref} from 'vue';
import axios from 'axios';
import { serverURL } from '@/Constants';
import {debounce} from "@/components/Tool/Tool"
import type {user} from "@/Type"

interface data {
    data:user[]
}
const userList:data = {data:[]}
const matched:data = reactive({data:[]})
const close = ref(false)

const emit = defineEmits(["close-search"])

async function searchHandler(e:Event){
    console.log("filtering",(e.target as HTMLInputElement).value)
    let target = (e.target as HTMLInputElement).value;
    //clear previous data 
    matched.data = []
    await nextTick()
    if(target!==""){
        userList.data.filter(user=>{
        if(user.username.includes(target)){
            matched.data.push(user)
        }
    })
    }

}

function selectUser(e:Event){
    console.log((e.target as Element).getAttribute("data-v"))
    let id = (e.target as Element).getAttribute("data-v")
    let username = (e.target as HTMLElement).innerText

    if(localStorage.getItem(id!)===null){
        localStorage.setItem(id!,username)
    //at this point, we should close the modal 
        emit("close-search",{_id:id,username:username})
    }
    else{
        console.log("already selected this")
        emit("close-search",{})
    }

    //apply close style 
    close.value = true;
}

let debounce_handler = debounce(searchHandler,1000)

onMounted(()=>{
    //fetch user list 
    axios.get(serverURL+"/users",{
        withCredentials:true
    })
    .then((res)=>{
        res.data.data.map((u:user)=>userList.data.push(u))
    })
    .catch((rej)=>{
        console.log(rej)
    })
    
    document.getElementById("search-input")?.addEventListener(
        "input",debounce_handler)
        
})
onUnmounted(()=>{
    document.getElementById("search-input")?.removeEventListener(
        "input",debounce_handler)
})
</script>


<template>
    <div class="search-modal-wrapper">
        <div class="modal" :class="{'onclose':close}"></div>
    <div class="search-container" :class="{'onclose':close}">

        <div class="search-bar">
            <input 
            type="text"
            class="search-input"
            id="search-input"
            >

        </div>
        <div class="search-result">
            <div v-if="matched.data.length==0">
            <div class="list-item">
                Start searching for users
            </div>
            </div>
            <div v-else>
                <div v-for="u in matched.data" 
                class="list-item" 
                :data-v="u._id"
                :key="u._id"
                @click="selectUser"
                >
                    {{u.username}}
                </div>
            </div>
        </div>
    </div>

    </div>

</template>

<style scoped>
@import "@/assets/base.css";
.modal{
    z-index:1;
    background-color:#d6d2d2 ;
    opacity:0.3;
    position:fixed;
    height:100%;
    width:100%;
    top:0;
    left:0;
    animation-name:fade-in;
    animation-duration:0.3s;
}
@keyframes fade-in {
    from{
        opacity:0;
    }
    to{

    }
}
.search-container{
    z-index:3;
    position:fixed;
    top:8px;
    left:0;
    right:0;
    margin:auto;
    background-color:#ffffff;
    width:512px;
    min-height:2rem;
    padding:0.5rem;
    animation-name:drop-down;
    animation-duration:0.3s;
}

.onclose{
    animation-name:fade-out;
    animation-duration:0.5s;
    animation-fill-mode: forwards;
}

@keyframes fade-out {
    from{

    }
    to{
        transform: translateY(-16px);
        opacity:0;
    }
}

@keyframes drop-down {
    from{
        transform: translateY(-15px);
    }
    to{
        
    }
}
.search-input{
    border:1px solid #f7f6f6 ;
    width:100%;
    box-sizing: border-box;
    height:1.5rem;

}
.search-input:focus{
    outline:none;
}

.search-result{
    margin-top:8px;
    height:128px;
    overflow-y:auto;
    /* animation-name:fade-in ;
    animation-duration:0.3s; */
}

@keyframes fade-in {
    from{
        opacity:0
    }
    to{

    }
}

.list-item{
    padding:0.6rem;
    border:1px solid #f7f6f6;
    font-weight: 100;
    user-select: none;
    transition:all 0.3s;
}
.list-item:hover{
    cursor: pointer;
    background-color: #f7f6f6;
    
}
</style>