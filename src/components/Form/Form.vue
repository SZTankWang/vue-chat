<!-- 表单组件，根据输入的信息生成输入框 -->
<script setup lang="ts">
import {onMounted, reactive} from "vue"
import InputField from "./InputField.vue"
import type { FormInfo } from "./Form";


const props = defineProps<{
    FormInfos:FormInfo[]
}>()

//定义reactive对象，来存储输入
const FormStore:FormInfo[] = reactive([])

onMounted(()=>{
    props.FormInfos.map(x=>FormStore.push({
        field:x.field,
        value:x.value
    }))

})

</script>




<template>
    
<InputField v-for="i in FormInfos" :input="i"/>
</template>


<style scoped>
</style>