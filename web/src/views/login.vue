<template>
  <div>
    <label for="username">账号</label>
    <input id="username" type="text" v-model="form.username">
    <label for="password">密码</label>
    <input id="password" type="text" v-model="form.password">
    <button @click="submit">登录</button>
  </div>
</template>
<script>
import userApi from '@/api/user'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async submit () {
      userApi.login({
        ...this.form
      }).then(res => {
        this.$router.go(-1)
      })
    }
  }
}
</script>
