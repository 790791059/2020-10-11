<!--  -->
<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click="handleLogin()" class="login-btn" type="primary"
        >登录</el-button
      >
    </el-form>
    <div></div>
  </div>
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
      formdata: {
        username: "",
        password: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 登录请求
    async handleLogin() {
      // 希望让异步操作的代码看起来像同步代码
      // es7 async+await
      const res = await this.$http.post("/api/login", this.formdata);
      // console.log(res);
      const {
        data,
        meta: { msg, status },
      } = res.data;
      console.log(data);
      if (status === 200) {
        //    登录成功
        // 保存token
        localStorage.setItem("token", data.token);
        //  1跳转home
        this.$router.push({ name: "home" });
        //  1 提示成功
        this.$message.success(msg);
      } else {
        //  * 不成功
        //  * 1提示消息
        this.$message.warning(msg);
      }
    },

    //   this.$http.post("/api/login", this.formdata).then((res) => {
    //     console.log(res);
    //     const {
    //       data,
    //       meta: { msg, status },
    //     } = res.data;
    //     console.log(data);
    //     if (status === 200) {
    //       //    登录成功
    //       //  1跳转home
    //       this.$router.push({ name: "home" });
    //       //  1 提示成功
    //       this.$message.success(msg);
    //     } else {
    //       //  * 不成功
    //       //  * 1提示消息
    //       this.$message.warning(msg);
    //     }
    //   });
    // },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
<style>
/* @import url(); 引入公共css类 */
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
