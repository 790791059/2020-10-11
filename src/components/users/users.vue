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
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <!-- 如果单元格内展示的内容不是字符串（文本），需要给被显示的内容外层包裹一个template -->
        <!-- template 内容要用数据设置slot-scope属性该属性的值是数据create_time的数据源userlist -->
        <!-- solt-scope的值userlist其实就是el-table绑定的数据userlist  , userlist.row->数组中的每个对象 -->
        <template slot-scope="userlist">
          {{ userlist.row.create_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button
            type="primary "
            size="small"
            icon="el-icon-edit"
            plain
            circle
          ></el-button>
          <el-button
            type="success"
            size="small"
            icon="el-icon-check"
            plain
            circle
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            plain
            circle
            native-type="submit"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    
  </el-card>
</template>

<script>
//这里可以导入其他文件（比如：组件,工具js,第三方插件js,json文件,图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      // 分页相关数据
      total: 0,
      // 表格绑定的数据
      userlist: [
        {
          create_time: 1486720211,
          email: "adsfad@qq.com",
          id: 500,
          mg_state: true,
          mobile: "12345678",
          role_name: "超级管理员",
          username: "admin",
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
    async getUserList() {
      // query   查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数 不能为空
      // 需要授权的 API ,必须在请求头中使用 Authorization 字段提供 token 令牌
      //  const AUTH_TOKEN=localStorage.getItem('token')
      //  axios.defaults.headers.common['Authorization']=AUTH_TOKEN
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;
      if (status === 200) {
        // 1给表格数据赋值
        this.userlist = users;
        // 2给total赋值
        this.total = total;
        // 3提示
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUserList();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能,这个函数会触发
};
</script>
<style>
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
