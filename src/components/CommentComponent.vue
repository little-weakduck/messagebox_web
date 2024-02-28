<!--
 * @Author: Little Weak_Duck
 * @Date: 2024-02-25 12:03:25
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-28 22:20:02
 * @FilePath: /src/components/CommentComponent.vue
 * @Description:  comment component
-->

<template>
    <div :class="isChild ? 'child-ctn' : 'ctn'">
        <div v-if="!isChild" class="author">
            <span>{{ comment.author }}</span>
        </div>
        <div class="comment">
            <div class="header">
                <h3 class="title">{{ comment.title }}</h3>
                <div>{{ isChild ? comment.author : comment.updatedAt.toLocaleString() }}</div>
            </div>
            <Divider v-if="comment.parent" />
            <div v-if="comment.parent" class="child">
                <CommentComponent :comment="comment.parent" :is-child="true" />
            </div>
            <Divider v-else />
            <p class="content">{{ comment.content }}</p>
        <div class="button-ctn" >
            <span v-if="isChild">{{ comment.updatedAt.toLocaleString() }}</span>
            <MyButton v-else class="button" type="primary" @click="clickReply">Reply</MyButton>
            <MyButton v-if="isAdmin" class="button" type="danger" @click="clickDelete">Delete</MyButton>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Comment } from '@/types/comment'
import Divider from './Divider.vue';
import MyButton from './MyButton.vue';

const props = defineProps({
    comment: {
        type: Object as PropType<Comment>,
        required: true
    },
    isChild: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['reply', 'delete'])

const clickReply = () => {
    emits('reply', props.comment.id)
}

const clickDelete = () => {
    emits('delete', props.comment.id)
}

</script>

<style scoped>
.ctn {
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    height: fit-content;
    min-height: 200px;
}

.child-ctn {
    border: 1px solid #ccc;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 6px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    height: fit-content;
    min-height: 100px;
}

.child {
    margin-top: 1rem;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0.5rem;
}

.author {
    font-size: 1.5rem;
    font-weight: bold;
    width: 15%;
    word-break: break-all;
}

.title {
    font-size: 1.2rem;
    font-weight: bold;
}

.comment {
    width: 85%;
    padding-left: 1rem;
    flex-grow: 1;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* padding: 16px; */
}

.content {
    margin-top: 1rem;
}

.button-ctn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 1rem;
}

button{
    zoom: 50%;
}

</style>

