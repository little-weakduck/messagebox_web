<!--
 * @Author: Little Weak_Duck
 * @Date: 2024-02-28 21:35:29
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-28 21:55:56
 * @FilePath: /src/components/Dialog.vue
 * @Description:  Dialog 组件
-->

<template>
    <div v-if="isVisible" class="dialog-backdrop">
        <div class="dialog">
            <slot></slot>
            <div>
            <MyButtonVue v-if="showClose" class="button" type="danger" @click="close">{{ closeText }}</MyButtonVue>
            <MyButtonVue v-if="showConfirm" class="button" type="success" @click="confirm">{{ confirmText }}</MyButtonVue></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MyButtonVue from './MyButton.vue';

const isVisible = defineModel<boolean>({ required: true })

const emits = defineEmits(['close', 'confirm'])

defineProps({
    closeText: {
        type: String,
        default: '取消'
    },
    showClose: {
        type: Boolean,
        default: true
    },
    confirmText: {
        type: String,
        default: '确定'
    },
    showConfirm: {
        type: Boolean,
        default: true
    }
})

const confirm = () => {
    emits('confirm')
    isVisible.value = false
}

const close = () => {
    emits('close')
    isVisible.value = false
}


</script>

<style scoped>
.dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    justify-content: flex-start;
    align-items: flex-start;
}

.button0-ctn{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: flex-end;
    gap: 20px;
}

@media (prefers-color-scheme: dark) {
    .dialog {
        background-color: #333;
    }
}

.button{
    zoom: 75%;
}
</style>