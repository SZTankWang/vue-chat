<script setup lang="ts">
const props = defineProps<{
    avatar?:File,
    name:string,
    date?:string,
    lastMessage?:string
}>()



</script>


<template>
    <div class="contact-container">
        <!-- 头像 -->
        <div class="contact-column">
            <div class="icon">

            </div>
        </div>
        <div class="contact-column text-part">
            <!-- 名称 -->
            <div class="contact-row">
                <p class="name">name</p>
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