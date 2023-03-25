
<!-- 登陆时的状态显示：加载中，状态错误，成功 -->
<script setup lang="ts">
import {watch,ref} from "vue"
import type {Ref} from "vue"
import { useLoginStore } from "@/stores/LoginStore";


const loginState = useLoginStore()

const isLoading:Ref<boolean> = ref(false)
const isSuccess:Ref<boolean> = ref(false)
const isFailed:Ref<boolean> = ref(false)
loginState.$subscribe((mutation,state)=>{
    switch(state.currState){
        case "Loading":
            isLoading.value = true;
            isFailed.value = false;
            break 
        case "Welcome":
            isLoading.value = false;
            isSuccess.value = true;
            break 
        case "Wrong Password":
            isLoading.value = false;
            isFailed.value = true 
    }
})

</script> 

<template>
<div class="loading-container" :class="{
    isLoading:isLoading,
    isResult:isSuccess,
    failed:isFailed
    }" >
    {{ loginState.currLoginState }}
</div>
</template>

<style scoped>
.loading-container{
    margin-top:32px;
}
.isLoading{
    animation-name: loading;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
}

@keyframes loading {
    from{
        opacity:0;
    }
    to{
        opacity:1;
    }
}

.isResult{
    animation-name: result;
    animation-duration: 0.7s;
    animation-timing-function: ease;
}


@keyframes result {
    from{
        transform:translateY(8px);
        opacity:0;
    }
    to{
        transform:translateY(0);
        opacity:1;
    }
}

.failed{
    color:red;
}
</style>