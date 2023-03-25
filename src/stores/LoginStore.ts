import { defineStore } from "pinia";

export const useLoginStore = defineStore("login",{
    state:()=>{
        return {
            currState:""
        }
    },
    getters:{
        currLoginState:(state)=>{
            return state.currState
        },
        isLoading:(state)=>{
            return state.currState == "Loading"
        },
        isSuccess:(state)=>{
            return state.currState=="Welcome" 
        },
        isFailed:(state)=>{
            return state.currState=="Wrong Password"
        }

    },
    actions:{
        setLoginState(newState:string){
            this.currState = newState
        }
    }
    
})