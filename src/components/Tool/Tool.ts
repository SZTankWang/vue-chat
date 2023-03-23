import type { message } from "@/Type";

export type callback = (...args:any[])=>void;
export function debounce(fn:Function,delay:number):callback{
    let timer:null|number = null;
    let _this = this;
    return (...args)=>{
        
        if(timer !== null){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(_this,args)
            timer = null;
        },delay)
    }
}

export function parseMessage(message:string):message{
    let splited = message.split(";")
    return {
        from:splited[0],
        content:splited.slice(2).join("")
    }
}