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
        <el-input
          placeholder="请输入内容"
          @clear="loadUserList()"
          clearable
          v-model="query"
          class="inputSearch"
        >
          <el-button
            @click="searchUser()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button class="btn" type="success" @click="showAddUserDia()"
          >添加按钮</el-button
        >
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
            @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary "
            size="small"
            icon="el-icon-edit"
            plain
            circle
            @click="showEditUserDia(scope.row)"
          ></el-button>
          <el-button
            type="success"
            size="small"
            icon="el-icon-check"
            plain
            circle
            @click="showSetUserRoleDia(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            plain
            circle
            @click="showDeleUserMsgBox(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- @size-change 每页显示条数变化 触发 
    @current-change 当前页改变 触发
    :current-page 设置当前页是第几页
    :page-sizes【100,200,400】 每页多少条数据数组
    page-size 设置相似多少条
    layout 
    :total 数据总数 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{ currUsername }}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <!-- 如果select的绑定的数据的值和option的value一样就会显示该option 的label值 -->
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="(item, i) in roles"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
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
      // 标题
      yonghu: "",
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
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRol: false,
      // 添加用户
      form: {},

      // 分配角色
      currRoleId: -1,
      currUsername: "",
      // 保存所有的角色
      roles: [],
      // 当前用户id
      currUserId: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 分配角色-发送请求
    async setRole() {
      // users/:id/role
      // :id 要修改的用户的id值
      // 请求体中rid修改的新值角色id
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId,
      });
      console.log(res);
      // 关闭对话框
      this.dialogFormVisibleRol = false;
    },

    // 分配角色-打开对话框
    async showSetUserRoleDia(row) {
      this.currUsername = row.username;
      this.currUserId = row.id;
      //  获取所有的角色
      const res1 = await this.$http.get(`roles`);
      this.roles = res1.data.data;
      // 获取当前用户的角色id =rid
      const res = await this.$http.get(`users/${row.id}`);
      console.log(res);
      //  接口文档的key名 是role_id 其实是rid
      this.currRoleId = res.data.data.rid;
      this.dialogFormVisibleRol = true;
    },
    // 修改状态

    async changeMgState(row) {
      //  发送请求
      const res = await this.$http.put(`users/${row.id}/state/${row.mg_state}`);
      // mg_state=false

      console.log(res);
    },
    // 编辑用户-发送请求
    async EditUser() {
      this.dialogFormVisibleEdit = false;
      // users/:id
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      console.log(res);
      if (res.data.meta.status === 200) {
        // 提示
        this.$message({
          type: "success",
          message: res.data.meta.msg,
        });
      } else {
        // 提示
        this.$message({
          type: "warning",
          message: res.data.meta.msg,
        });
      }
    },
    // 编辑用户
    showEditUserDia(row) {
      this.dialogFormVisibleEdit = true;
      // 获取数据
      this.form = row;
    },
    //删除用户-打开一个组件
    showDeleUserMsgBox(userId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送删除的请求：id   用户id
          // 1data中找userid
          // 吧userid以showDeleUserMsgBox参数形式传进来
          const res = await this.$http.delete(`users/${userId}`);
          console.log(res);
          if (res.data.meta.status === 200) {
            this.pagenum = 1;
            // 更新视图
            this.getUserList();
            // 提示
            this.$message({
              type: "success",
              message: res.data.meta.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加用户-点击对话框的确定按钮发送请求
    async addUser() {
      // 关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post("users", this.form);
      console.log(res);

      const {
        meta: { status, msg },
      } = res.data;
      if (status === 201) {
        // 提示成功
        this.$message.success(msg);
        // 更新视图
        this.getUserList();
        // 清空文本框
        for (const key in this.form) {
          this.form[key] = "";
        }
        // this.form={}
      } else {
        this.$message.warning(msg);
      }
    },
    // 点击添加按钮弹出对话框
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    // 清空输入框触发事件
    loadUserList() {
      // 请求数据
      this.getUserList();
    },
    // 搜索用户
    searchUser() {
      // 按照input绑定的query参数 发请求
      this.getUserList();
    },
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
    // 分页相关方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      /*
      24条
      pagenum=3
      pagesize=2
      1,2/3,4/5,6
      数据
      */
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
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
