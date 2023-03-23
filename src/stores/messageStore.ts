import { defineStore } from "pinia";
import type { message } from "@/Type";

export const useMessageStore = defineStore("message",{

    state:()=>{
        return {
            //userid -- messages[]
            messages:new Map<string,message[]>() 
        }


    },

    getters:{
        getMessages:(state)=>{
            return (userId:string)=>state.messages.get(userId)
        }
    },
    actions:{
        pushMessage(userId:string,message:message){
            if(this.messages.get(userId)!==undefined){
                this.messages.get(userId)?.push(message)
            }
            else{
                this.messages.set(userId,[message])
            }
            console.log("pinia store: pushing message",message,"message length:",this.messages.get(userId)!.length)

        }
    }
})