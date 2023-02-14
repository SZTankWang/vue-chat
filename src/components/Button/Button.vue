<script setup lang="ts">
import type {buttonProps} from "./Button"

const props = defineProps<{
    buttonProps:buttonProps
}>()

const width = props.buttonProps.height===undefined ? 
                10:props.buttonProps.height;

const height = props.buttonProps.width===undefined?
                2:props.buttonProps.width;

</script>

<template>
<div
class="button" 
:style="{height:`${height}rem`,width:`${width}rem`}"
>

<p>{{ buttonProps.text }}</p>

</div>

</template>

<style scoped>
@import "../../assets/base.css";
.button{
    background-color: var(--font-color);
    text-align: center;
    color:white;
    position:relative;
    margin-top: 128px;
    border-radius: 3px;
    user-select: none;
}
.button:hover{
    background-color: #224bde;
    transition:all 0.3s ease;
    cursor: pointer;
}

.button:active{
    transform: scale(1.25);
    
}
p{  
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position:absolute;
    height:fit-content;
    
}


</style>