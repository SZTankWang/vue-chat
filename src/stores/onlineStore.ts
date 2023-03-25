import { defineStore } from "pinia";

export const useOnlineStore = defineStore("online",{
    state:()=>{
        return {
            online:false,
            id:"",
            talkingTo:"" 
        }
    },
    getters:{
        isOnline:(state)=>state.online===true,
        getTalkingTo:(state)=>state.talkingTo,
        getId:(state)=>state.id
    },
    actions:{
        setOnline(status:boolean){
            this.online = status
        },
        setId(id:string){
            this.id = id;

        },
        setTalkingTo(id:string){
            console.log("settalkingto:",id)
            this.talkingTo = id;
        }
    }


})