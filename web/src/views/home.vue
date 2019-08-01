<template>
  <div>
    <h1>博客首页</h1>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <router-link :to="`/detail/${item.id}`"><h3>{{item.title}}</h3></router-link>
        <span>{{item.author}}|{{item.createtime | dateToString}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import blogApi from '@/api/blog'
export default {
  async beforeRouteEnter (to, from, next) {
    const { data } = await blogApi.list()
    next(vm => {
      vm.list = data
    })
  },
  data () {
    return {
      list: []
    }
  }
}
</script>
