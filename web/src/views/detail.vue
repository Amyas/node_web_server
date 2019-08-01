<template>
  <div>
    <h1>{{detail.title}}</h1>
    <span>{{detail.author}} | {{detail.createtime | dateToString}}</span>
    <hr>
    <p>{{detail.content}}</p>
  </div>
</template>

<script>
import blogApi from '@/api/blog'
export default {
  async beforeRouteEnter (to, from, next) {
    const { data } = await blogApi.detail({
      id: to.params.id
    })
    next(vm => {
      vm.detail = data
    })
  },
  data () {
    return {
      detail: []
    }
  }
}
</script>
