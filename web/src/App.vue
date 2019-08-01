<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
a {
  text-decoration: none;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}
li + li {
  border-top: 1px solid gray;
}
</style>
