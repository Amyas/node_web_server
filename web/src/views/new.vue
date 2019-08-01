<template>
  <div>
    <h1>创建博客</h1>
    <hr>
    <input type="text" placeholder="请输入标题" v-model="form.title">
    <br>
    <textarea rows="10" placeholder="请输入内容" v-model="form.content"></textarea>
    <br>
    <button @click="submit">创建</button>
  </div>
</template>
<script>
import blogApi from '@/api/blog'
export default {
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
      blogApi.create({
        ...this.form
      }).then(res => {
        this.$router.back()
      })
    }
  }
}
</script>
