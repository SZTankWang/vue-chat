<script setup lang="ts">
import { useOnlineStore } from '@/stores/onlineStore';
import { onMounted } from 'vue';

const onlineStore = useOnlineStore()

const props = defineProps<{
    avatar?:File,
    name:string,
    _id:string,
    date?:string,
    lastMessage?:string,
    isCurrentConvo:boolean
}>()


//onclick: dispatch setTalkingto action 
function clickHandler(e:Event){
    let talkingTo = props._id;
    //console.log(talkingTo)
    //切换对话
    if(props._id !== onlineStore.getTalkingTo){
        onlineStore.setTalkingTo(talkingTo)

    }
}

onMounted(()=>{
    //console.log(props._id)
})
</script>


<template>
    <div
    class="contact-container"
    :class="{'active':props.isCurrentConvo}"
    :data-contact-id="props._id"
    @click="clickHandler"
    >
        <!-- 头像 -->
        <div class="contact-column">
            <div class="icon">

            </div>
        </div>
        <div class="contact-column text-part">
            <!-- 名称 -->
            <div class="contact-row">
                <p class="name">{{ props.name }}</p>
                <p class="time">today</p>
            </div>

        </div>
        
    </div>

</template>


<style scoped>
@import "../../assets/base.css";
.contact-container{
    height:3rem;
    /* border:1px solid var(--light-grey); */
    display: flex;
    flex-direction: row;
    padding:0.5rem;
    user-select: none;

}
.active{
    background-color: var(--deep-grey);
}
.contact-container:hover{
    cursor:pointer;
    background:#E8ecec
}

.contact-column{
    height:100%;
    display: flex;
    flex-direction: column;
    flex-basis:20%;
    /* justify-content: center; */
}

.text-part{
    flex-grow:2;
}
.contact-row{
    position:relative;
    width:100%;
}

.icon{
    width:2rem;
    height:2rem;
    border-radius: 50%;
    background:var(--light-grey)
}

.name{
    font-size:1.2rem;

}

.time{
 position:absolute;
 right:0;   
}
p{
    display: inline-block;
}
</style>