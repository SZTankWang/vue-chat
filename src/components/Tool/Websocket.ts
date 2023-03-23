import {chatURL} from "@/Constants";
import {useOnlineStore} from "@/stores/onlineStore";
import {useMessageStore} from "@/stores/messageStore";
import {parseMessage} from "@/components/Tool/Tool"
//管理websocket实例
let ws:WebSocket|null=null;
let onlineStore = useOnlineStore();

//消息store
const messageStore = useMessageStore();
export function createWS(){
    ws = new WebSocket(chatURL)
    
    ws.onerror = (event)=>{
        console.log("socket error",event)
    }
    ws.onopen = (event)=>{
        console.log("socket established")
        setTimeout(()=>onlineStore.setOnline(true),1000)
    }

    ws.onclose = (event)=>{
        console.log("socket is closing",event)
    }

    ws.onmessage= (event)=>{
        console.log(event.data)
        //将解析后的新消息加入messageStore中
        let data = parseMessage(event.data);
        messageStore.pushMessage(data.from,data);
    }
}

export function sendMessage(msg:string){
    ws?.send(msg);
    
}

export function closeWS(){
    console.log("closing websocket")
    ws?.close()
}