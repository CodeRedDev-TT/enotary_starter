<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "MainLayout",
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>