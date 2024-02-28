<template >
  <header>
    <img alt="logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>留言板!</h1>
      <MyButton v-if="isAdmin" class="button" type="danger" @click="disBind"> 解绑管理员</MyButton>
      <MyButton v-else class="button" type="success" @click="showInputPassword = true"> 绑定管理员身份</MyButton>
    </div>
  </header>
  <main>
    <!-- <TheWelcome /> -->
    <Divider class="divider-width" />
    <div class="comment-list" @scroll="checkScroll">
      <CommentComponent v-for="(comment, index) in comments" :comment="comment" :isAdmin="isAdmin" :key="index"
        @delete="deleteComment" @reply="replayComment" />
      <h1 v-if="comments.length === 0">暂无留言</h1>
    </div>
    <div class="new-comment">
      <MyButton class="button" type="primary" @click="showMessageDialog(undefined)">发表新留言</MyButton>
    </div>
  </main>
  <Dialog v-model="showInputPassword" @close="closeDialog" @confirm="bindAdmin">
    <template v-slot:default>
      <h2>请输入管理员密码</h2>
      <input class="input" type="password" v-model="adminPassword" />
    </template>
  </Dialog>
  <Dialog v-model="showMessageInput" @close="closeDialog" @confirm="createComment">
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
import CommentComponent from './components/CommentComponent.vue';
import type { Comment } from './types/comment';
import Divider from './components/Divider.vue';
import MyButton from './components/MyButton.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import Dialog from './components/Dialog.vue';
import api from './api';

const adminPassword = ref("")
const showInputPassword = ref(false)
const showMessageInput = ref(false)
const messageTitle = ref("")
const messageContent = ref("")
const parentId = ref<number>()
const shouldClear = ref(false)
const author = ref(localStorage.getItem("AUTHOR") || "")
const isAdmin = ref(localStorage.getItem("ADMIN_PASSWORD") !== "" && localStorage.getItem("ADMIN_PASSWORD") !== null)
const shouldGetMore = ref(true)

const closeDialog = () => {
  showInputPassword.value = false
  showMessageInput.value = false
  adminPassword.value = ""
}

const bindAdmin = async () => {
  try {
    await api.checkAdminCorrect({ password: adminPassword.value })
    localStorage.setItem("ADMIN_PASSWORD", adminPassword.value)
    isAdmin.value = true
  } catch (error) {
    console.error(error)
    alert("绑定管理员失败")
  }

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
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.addEventListener('scroll', () => checkScroll(undefined));
  }
  getCommentList()
})
onUnmounted(() => {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.removeEventListener('scroll', () => checkScroll(undefined));
  }
})

const getCommentList = async () => {
  try {
    const res = await api.getCommentList({ page: shouldClear.value ? 1 : page.value, size: shouldClear.value ? page.value * size.value : size.value })
    if (shouldClear.value) {
      comments.value = []
      shouldClear.value = false
    }
    comments.value = [...comments.value, ...res.data.data.data.map((item: Comment) => {
      item.updatedAt = new Date(Number(item.updatedAt));
      if (item.parent) {
        item.parent.updatedAt = new Date(Number(item.parent.updatedAt));
      }
      return item;
    })];
    shouldGetMore.value = res.data.data.data.length <= size.value * page.value

  } catch (error) {
    console.error(error)
    alert("获取留言列表失败")
  }
}

const replayComment = (id: number) => {
  showMessageDialog(id)
}

const createComment = async () => {
  try {
    if (messageContent.value === "" || messageTitle.value === "" || author.value === "") {
      alert("请填写完整信息")
      return
    }
    console.log("🚀 ~ createComment ~ parentId.value:", parentId.value)
    const res = await api.createComment({ content: messageContent.value, title: messageTitle.value, author: author.value, parentId: parentId.value })

    showMessageInput.value = false
    messageContent.value = ""
    messageTitle.value = ""
    author.value = localStorage.getItem("AUTHOR") || ""
    parentId.value = undefined
    comments.value = [...comments.value, res.data.data]
    shouldClear.value = true
  } catch (error) {
    console.error(error)
    alert("发表留言失败")
  }
}

const checkScroll = (event?: UIEvent) => {
  let bottom = false
  if (event) {
    const { target: { scrollTop, clientHeight, scrollHeight } } = event
    bottom = scrollTop + clientHeight >= scrollHeight
    console.log("🚀 ~ checkScroll ~ bottom: event", bottom)
  } else {
    const { scrollTop, clientHeight, scrollHeight } = document.getElementById('app')
    bottom = scrollTop + clientHeight >= scrollHeight

    console.log("🚀 ~ checkScroll ~ bottom: window", bottom)

  }

  if (bottom && shouldGetMore.value) {
    page.value++
    getCommentList()
  }
}

const deleteComment = async (id: number) => {
  try {
    await api.deleteComment(id)
    shouldClear.value = true
    await getCommentList()
  } catch (error) {
    console.error(error)
    alert("删除留言失败")
  }
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
  overflow-y: scroll;
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
