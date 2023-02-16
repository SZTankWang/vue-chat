<script setup lang="ts">
import type { FormInfo } from './Form';
const props = defineProps<{input:FormInfo}>();

</script>

<template>
<label>{{ input.field }}
    <input class="form-input" type="text">

</label>
</template>

<style scoped>
@import "../../assets/base.css";
.form-input:focus{
    outline:none;
    border:1px solid var(--font-color);
    transition:all 0.8s ease;
}

.form-input{
    margin-top: 1rem;
    /* max-width:75%; */
    width:20rem;
    height:2rem;
    border:1px solid #Cfd4d4;
    border-radius:3px;
}






</style>