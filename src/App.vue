<template>
  <header>
    <img alt="logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="留言板！" />
      <MyButton class="button" type="success" @click="showInput = true"> 绑定管理员身份</MyButton>
    </div>
  </header>
  <main>
    <!-- <TheWelcome /> -->
    <Divider class="divider-width" />
    <div class="comment-list">
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
      <CommentComponent :comment="comment" />
    </div>
  </main>
  <Dialog v-model="showInput" @close="showInput = false" @confirm="bindAdmin">
    <template v-slot:default>
      <h2>请输入管理员密码</h2>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import CommentComponent from './components/CommentComponent.vue';
import TheWelcome from './components/TheWelcome.vue'
import type { Comment } from './types/comment';
import Divider from './components/Divider.vue';
import MyButton from './components/MyButton.vue';
import { ref } from 'vue';
import Dialog from './components/Dialog.vue';

const adminPassword = ref("")
const showInput = ref(true)

const bindAdmin = () => {

}

const comment: Comment = {
  id: "1",
  title: 'This is a comment',
  content: 'This is the content of the comment',
  author: 'Little Weak_Duck',
  updateAt: new Date(),
  parent: {
    id: "2",
    title: 'This is a comment',
    content: 'This is the content of the comment',
    author: 'Little Weak_Duck',
    updateAt: new Date()
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

header .wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.button {
  align-self: flex-end;
}

.comment-list {
  flex-grow: 1;
  overflow: scroll;
  height: 100%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .divider-width {
    display: none;
  }

  main {
    height: 100vh;
  }

}
</style>
