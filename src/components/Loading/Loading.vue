
<!-- 登陆时的状态显示：加载中，状态错误，成功 -->
<script setup lang="ts">
import {watch,ref} from "vue"
import type {Ref} from "vue"
//prop: 状态
const props = defineProps<{state:string}>()
const isLoading:Ref<boolean> = ref(false)
const isResult:Ref<boolean> = ref(false)
const failed:Ref<boolean> = ref(false)

watch(props,(newProp)=>{
    // console.log("state changed")
    if(newProp.state !== "Loading"){
        isResult.value = true;
        isLoading.value = false;
        
    }
    else{
        isLoading.value = true;
        isResult.value = false;
        failed.value = false;
    }
    if(newProp.state === "Failed"){
        failed.value = true;
    }
})
</script> 

<template>
<div class="loading-container" :class="{isLoading:isLoading,isResult:isResult,failed:failed}">
    {{ props.state }}
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