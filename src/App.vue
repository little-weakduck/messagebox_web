<template>
  <header>
    <img alt="logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="留言板！" />
      <MyButton v-if="isAdmin" class="button" type="danger" @click="disBind"> 解绑管理员</MyButton>
      <MyButton v-else class="button" type="success" @click="showInputPassword = true"> 绑定管理员身份</MyButton>
    </div>
  </header>
  <main>
    <!-- <TheWelcome /> -->
    <Divider class="divider-width" />
    <div class="comment-list">
      <CommentComponent v-for="(comment, index) in comments" :comment="comment" :isAdmin="isAdmin" :key="index"
        @delete="deleteComment" @reply="replayComment" />
    </div>
    <div class="new-comment">
      <MyButton class="button" type="primary" @click="showMessageDialog">发表新留言</MyButton>
    </div>
  </main>
  <Dialog v-model="showInputPassword" @close="closeDialog" @confirm="bindAdmin">
    <template v-slot:default>
      <h2>请输入管理员密码</h2>
      <input class="input" type="password" v-model="adminPassword" />
    </template>
  </Dialog>
  <Dialog v-model="showMessageInput" @close="closeDialog" @confirm="bindAdmin">
    <template v-slot:default>
      <h2>请输入留言标题</h2>
      <input class="input" type="text" v-model="messageTitle" maxlength="20" />
      <h2>请输入留言内容</h2>
      <textarea class="input" v-model="messageContent" maxlength="140"></textarea>
      <h2>请输入留言作者</h2>
      <input class="input" type="text" v-model="author" maxlength="20" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import CommentComponent from './components/CommentComponent.vue';
import type { Comment } from './types/comment';
import Divider from './components/Divider.vue';
import MyButton from './components/MyButton.vue';
import { onMounted, ref } from 'vue';
import Dialog from './components/Dialog.vue';
import api from './api';

const adminPassword = ref("")
const showInputPassword = ref(false)
const showMessageInput = ref(false)
const messageTitle = ref("")
const messageContent = ref("")
const parentId = ref<number>()
const author = ref(localStorage.getItem("AUTHOR") || "")
const isAdmin = ref(localStorage.getItem("ADMIN_PASSWORD") !== "" && localStorage.getItem("ADMIN_PASSWORD") !== null)

const closeDialog = () => {
  showInputPassword.value = false
  adminPassword.value = ""
}

const bindAdmin = async () => {

  localStorage.setItem("ADMIN_PASSWORD", adminPassword.value)
  isAdmin.value = true
}

const disBind = () => {
  localStorage.clear()
  isAdmin.value = false
}

const showMessageDialog = (thisParentId?: number) => {
  showMessageInput.value = true
  messageContent.value = ""
  messageTitle.value = ""
  author.value = localStorage.getItem("AUTHOR") || ""
  parentId.value = thisParentId
}

const page = ref(1)
const size = ref(10)

onMounted(async () => {
  getCommentList()
})

const getCommentList = async (tempPage?: number, tempSize?: number,clearBefore?:boolean) => {
  const res = await api.getCommentList({ page: tempPage ?? page.value, size: tempSize ?? size.value })
  if (clearBefore) {
    comments.value = []
  }
  comments.value = [...comments.value, ...res.data.data.data.map((item: Comment) => {
    item.updatedAt = new Date(Number(item.updatedAt)); return item;
  })];
}

const deleteComment = async (id: number) => {
  await api.deleteComment(id)
  await getCommentList(1,page.value * size.value,true)
}

const comments = ref<Comment[]>([])
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

.input {
  background-color: #ffffff;
  color: #000000;
  border: 0.5px solid #000000;
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
}

@media (prefers-color-scheme: dark) {
  .input {
    background-color: #000000;
    color: #ffffff;
    border: 0.5px solid #ffffff;
  }
}

.new-comment {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
