<!-- 表单组件，根据输入的信息生成输入框 -->
<script setup lang="ts">
import {onBeforeMount, onMounted, reactive,watch} from "vue"
import type {Ref} from "vue"
import { ref } from "vue";
import { useRouter } from "vue-router";
import type {Router} from "vue-router";
import InputField from "./InputField.vue"
import Loading from "../Loading/Loading.vue";
import type { FormInfo,AuthData } from "./Form";
import { serverURL,secretPhrase, chatURL } from "@/Constants";
import axios from "axios";

import {useLoginStore} from "@/stores/LoginStore"
import { useOnlineStore } from "@/stores/onlineStore";
import Button from "../Button/Button.vue";

const props = defineProps<{
    FormInfos:FormInfo[]
}>()

//存储form信息
const FormStore:FormInfo[] = []

//全局登陆加载状态
const loginState = useLoginStore()
//存储用户身份
const onlineStore = useOnlineStore()

const btnDisabled = ref(false);
function login(){
    btnDisabled.value = true;
    loginState.setLoginState("Loading")
        //get form data
        let data = getFormData();
        axios({
            method:"post",
            url:serverURL+"/authenticate",
            data:data ,
            withCredentials:true,
            validateStatus:function(status){
                return status<500;
            }

        }).then(res=>{
            if(res.status==200){
                //get jwt token
                console.log(res)

                loginState.setLoginState("Welcome") 
                onlineStore.setId(res.data.id)
            }
            else if(res.status==404){
                console.log("non exist, now registering")
                loginState.setLoginState("Registering..")
                axios({
                    method:"post",
                    url:serverURL+"/register",
                    data:data,
                    withCredentials:true
                }).then(res=>{
                    if(res.status==200){
                        loginState.setLoginState("Welcome")
                        onlineStore.setId(res.data.id)

                    }
                    else{
                        console.log("server error")
                    }
                })
            }
            else if(res.status==401){
                loginState.setLoginState("Wrong Password")
            }
        }).finally(()=>{
            btnDisabled.value=false 
        })
}


onBeforeMount(()=>{
    props.FormInfos.map((x,idx)=>FormStore.push({
        field:x.field,
        value:x.value,
        inputId:idx.toString()
    }))

})

const getFormData = ()=>{
    const data:AuthData= {}
    //getElementById
    FormStore.map(f=>{
        console.log(f)
        //encode password

        let id = f.inputId!;
        let value = (<HTMLInputElement>document.getElementById(id)).value;
        data[f.field]=value;
    })
    return data;
}
</script>




<template>


<InputField v-for="i in FormStore" :input="i"  />
    <!-- button -->
        <Button 
    :buttonProps="{text:'Login',disabled:btnDisabled}"
    @click="login"
    />
</template>


<style scoped>
</style>