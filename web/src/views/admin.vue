<template>
  <div>
    <h1>管理中心</h1>
    <router-link to="/login">去登录</router-link>
    <hr>
    <router-link to="/new">新建博客</router-link>
    <hr>
    <div>
      <input type="text" v-model="keyword">
      <button @click="handleSearch">搜索</button>
    </div>
    <hr>
    <table border>
      <tr>
        <th>id</th>
        <th>博客标题</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, index) in list" :key="index">
        <td>{{item.id}}</td>
        <td>{{item.title}}</td>
        <td>
          <router-link :to="`/edit/${item.id}`">编辑</router-link>
          &nbsp;
          <span @click="handleDel(item.id)">删除</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import blogApi from '@/api/blog'
export default {
  async beforeRouteEnter (to, from, next) {
    const { data } = await blogApi.list({
      isadmin: 1
    })
    next(vm => {
      vm.list = data
    })
  },
  data () {
    return {
      list: [],
      keyword: ''
    }
  },
  methods: {
    async handleSearch () {
      const { data } = await blogApi.list({
        keyword: this.keyword
      })
      this.list = data
    },
    handleDel (id) {
      blogApi.del(id).then(async res => {
        const { data } = await blogApi.list()
        this.list = data
      })
    }
  }
}
</script>
