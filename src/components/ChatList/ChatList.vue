<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { computed } from '@vue/reactivity';
import { TransitionGroup } from 'vue';
import Spinner from '../Spinner/Spinner.vue';
import Contact from '../Contact/Contact.vue';
import type { user } from '@/Type';

const props = defineProps<{
    selectedChat:user[]
}>()
const isLoading = ref(true)
const spinnerClass = computed(()=>isLoading.value?"fadein":"fadeout")
const contactCount = ref(0) //temp placeholder

onMounted(()=>{
    //loading state, load contacts
    isLoading.value = true;
    setTimeout(()=>{
        isLoading.value=false

    },2000)
})

</script>


<template>
    <div class="chat-list-container">
        <!-- <Spinner :class="spinnerClass"/> -->
        <TransitionGroup name="chat-list">
            <Contact v-for="i of props.selectedChat"
         :_id="i._id"
        :name="i.username"    
        :key="i._id"     
         />

        </TransitionGroup> 
    </div>
</template>



<style scoped>;
.chat-list-container{
    width:30%;
    height:100%;
    /* background-color: antiquewhite; */
    border-right: 2px solid var(--light-grey);
}

.chat-list-move,.chat-list-enter-active,
.chat-list-leave-active{
    transition:all 0.5s ease; 
}
.chat-list-enter-from,
.chat-list-leave-to{
    opacity:0;
}
.chat-list-leave-active{
    position:absolute;
}
</style>