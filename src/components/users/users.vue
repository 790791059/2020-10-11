<!--  -->
<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <!-- /首页/用户管理/用户列表/ -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button class="btn" type="success">添加按钮</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"  label="#" width="60"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="邮箱"> </el-table-column>
      <el-table-column prop="address" label="电话"> </el-table-column>
      <el-table-column prop="address" label="创建时间"> </el-table-column>
      <el-table-column prop="address" label="用户状态"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
    </el-table>
    <!-- 分页 -->
  </el-card>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      query: "",
      pagenum:1,
      pagesize:2,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
       
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取用户列表的请求
    async getUserList(){
      // query   查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数 不能为空
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
//  const AUTH_TOKEN=localStorage.getItem('token')
//  axios.defaults.headers.common['Authorization']=AUTH_TOKEN
 const res = await this.$http.get(`/api/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
     console.log(res)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUserList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style >
/* //@import url(); 引入公共css类 */
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.btn {
  margin-left: 10px;
}
.searchRow {
  margin-top: 20px;
}
</style>
