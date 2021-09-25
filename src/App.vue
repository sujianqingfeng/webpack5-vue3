<template>
  <div class="app">
    <div class="text">vue3 app test</div>

    <div class="test">{{ test }}</div>
  </div>
</template>


<script  lang='ts' setup>
import { ref } from "vue";

const test = ref(2222);
</script>


<style  lang='scss' scoped>
.app {
  font-size: 20px;
  .text {
    color: antiquewhite;
  }
  .test {
    color: white;
  }
}
</style>
