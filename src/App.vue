<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <header>
      <img
      alt="History in Motion logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
      />
      <h1>History in Motion</h1>
    </header>
    <!-- <header>
  <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

  <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header>
 -->
    <RouterView />
</template>
<style scoped>
header {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header img {
  display: block;
  margin: 0 auto;
}
</style>
