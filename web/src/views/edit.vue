<template>
  <div>
    <h1>编辑博客</h1>
    <hr>
    <input type="text" placeholder="请输入标题" v-model="form.title">
    <br>
    <textarea rows="10" placeholder="请输入内容" v-model="form.content"></textarea>
    <br>
    <button @click="submit">更新</button>
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
      vm.form = data
    })
  },
  data () {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    submit () {
      blogApi.update(this.$route.params.id, {
        ...this.form
      }).then(res => {
        this.$router.go(-1)
      })
    }
  }
}
</script>
