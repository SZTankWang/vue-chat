<script setup lang="ts">
import {watch} from "vue"
import { computed } from '@vue/reactivity';

//two class: fade-in, fade-out
const props = defineProps<{class:string}>()

const isFadeIn = computed<boolean>(()=>props.class==="fadein")

watch(props,(newProp,oldProp)=>{
    console.log("new prop:",props.class)
})
</script>


<template>
<div class="spinner-container"
:class="{'fadein':isFadeIn,'fadeout':!isFadeIn}">
    <img class="spinner" src="../../assets/spinning-circles.svg">
</div>

</template>


<style scoped>
.spinner-container{
    height:100%;
    position:relative;
    background-color:#Cfd4d4 ;
    z-index:4;
    /* opacity:0.3; */
}

.fadein{
    animation-name: fade-in;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

@keyframes fade-in {
    from{opacity:0}
    to{opacity:0.3}
}

.fadeout{
    animation-name:fade-out;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

@keyframes fade-out {
    from{
        opacity:0.3;
    }
    to{
        opacity:0;

    }
}
.spinner{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
}
</style>