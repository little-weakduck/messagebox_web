<!--
 * @Author: Little Weak_Duck
 * @Date: 2024-02-25 12:25:45
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-25 12:27:09
 * @FilePath: /src/components/Divider.vue
 * @Description:  divider
-->
<template>
  <div :style="{ width: width, height: height }" class="divider"></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    width: {
        type: String,
        default: "100%",
    },
    height: {
        type: String,
        default: "1px",
    },
});
</script>

<style scoped>
.divider {
  background-color: #ccc;
}
</style>
