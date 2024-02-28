<!--
 * @Author: Little Weak_Duck
 * @Date: 2024-02-26 10:38:42
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-26 11:01:11
 * @FilePath: /src/components/MyButton.vue
 * @Description:  button component
-->
<template>
<button :class="`bn632-hover ${type}`" role="button"><slot/></button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
type: {
    type: String as PropType<'success' | 'danger' | 'primary'>,
    default: 'primary'
}
    
})
</script>

<style>
.bn632-hover {
  width: 160px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 55px;
  text-align:center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.bn632-hover:hover {
  background-position: 100% 0;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.bn632-hover:focus {
  outline: none;
}

.bn632-hover.success {
  background-image: linear-gradient(
    to right,
    #0ba360,
    #3cba92,
    #30dd8a,
    #2bb673
  );
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}

.bn632-hover.danger {
  background-image: linear-gradient(
    to right,
    #eb3941,
    #f15e64,
    #e14e53,
    #e2373f
  );
  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
}

.bn632-hover.primary {
  background-image: linear-gradient(
    to right,
    #667eea,
    #764ba2,
    #6b8dd6,
    #8e37d7
  );
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
</style>