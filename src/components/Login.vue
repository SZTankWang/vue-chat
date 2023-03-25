<script setup lang="ts">
import Form from './Form/Form.vue';
import Button from './Button/Button.vue';
import Loading from "./Loading/Loading.vue"
import {ref,watch} from "vue"
import type {Ref} from "vue"
import { computed } from '@vue/reactivity';
import {useRouter} from "vue-router"
import type {Router} from "vue-router"
import { useLoginStore } from '@/stores/LoginStore';

const router:Router = useRouter()
//submit flag, interact with form component
const toSubmit:Ref<boolean> = ref(false)

const loginState = useLoginStore()
//control login animation
const switchLogin:Ref<boolean> = ref(false)
watch(()=>loginState.isSuccess,()=>{
    if(loginState.isSuccess){
        console.log("switching animation")
        switchLogin.value=true;
        setTimeout(()=>router.push("/chat"),1000)


    }
})


</script>

<template>
  <div class="login-container base-shadow-div" :class="{'SwitchToChat':switchLogin}">
    <p class="header">Chatroom</p>
    <!-- loading -->
    <Loading />
    <!-- image -->
    <!-- input field -->
    <div :class="{'form-wrapper':true,'loading-state-transition':loginState.isLoading}">
        <Form :FormInfos="[
        {field:'username',value:''},
        {field:'password',value:''}

    ]" />




    </div>

</div>
</template>    


<style scoped>
@import "../assets/base.css";
.login-container{
  min-width:75%;
  width:fit-content;
  min-height:50%;
  height:fit-content;
  background-color:var(--main-color);
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin: auto;
  color:var(--font-color);
  font-family: sans-serif;
  display:flex;
  flex-direction: column;
  align-items: center;
  padding:0.8rem;


}

.form-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:28px;
    /* transition:all 0.4s ease; */
    
    /* position:absolute;
    margin-top:10rem; */
}

.loading-state-transition{
    animation-name: loading-transition;
    animation-duration: 0.6s;    
    animation-fill-mode: forwards;
}

@keyframes loading-transition {
    from{
        transform: translateY(0);
    }
    to{
        transform: translateY(0.3rem);
    }
}

.SwitchToChat{
    animation-name:switch-to-chat;
    animation-duration:0.7s;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    /* position:absolute; */
    animation-fill-mode: forwards;
}

@keyframes switch-to-chat {
    from{
        /* transform: scale(1); */
    }

    75%{
        /* transform: scale(0.3); */
        
        /* transform: translate(-75%,-75%); */
    }
    to{

        /* transform: scale(0) ; */
        transform: translate(-100%,-100%) scale(0);
        /* display:none; */
    }
}
</style>