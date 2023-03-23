<script setup lang="ts">
import { useOnlineStore } from '@/stores/onlineStore';
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
export interface message{
    from:string,
    content:string 
}

onMounted(()=>{
    console.log("message is mounted")
})

const onlineStore = useOnlineStore();
const props = defineProps<message>();

const sentByMe = computed(()=>onlineStore.getId==props.from)
const sender = computed(()=>localStorage.getItem(props.from))
</script>

<template>
    <div class="message-row" :class="{'my-message-row':sentByMe}">
    <div class="people">
        {{ sender }}
    </div>
    <div class="message" :class="{'my-message':sentByMe}">
        {{ props.content }}
    </div>
</div>


</template>

<style scoped>

</style>