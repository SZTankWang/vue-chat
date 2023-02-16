<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { computed } from '@vue/reactivity';
import Spinner from '../Spinner/Spinner.vue';
import Contact from '../Contact/Contact.vue';
const isLoading = ref(true)
const spinnerClass = computed(()=>isLoading.value?"fadein":"fadeout")
const contactCount = ref(0) //temp placeholder

onMounted(()=>{
    //loading state, load contacts
    isLoading.value = true;
    setTimeout(()=>{
        isLoading.value=false
        contactCount.value = 4 //fake count
    },2000)
})

</script>


<template>
    <div class="chat-list-container">
        <Spinner :class="spinnerClass"/>
        <Contact v-for="i in contactCount"/>
    </div>
</template>



<style scoped>;
.chat-list-container{
    width:30%;
    height:100%;
    /* background-color: antiquewhite; */
    border-right: 2px solid var(--light-grey);
}
</style>