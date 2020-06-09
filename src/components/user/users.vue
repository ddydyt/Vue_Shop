<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click.native="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" border stripe height='300'>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="userName"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="网名" prop="nickName"></el-table-column>
        <el-table-column label="真名" prop="realName"></el-table-column>
        <el-table-column label="身份证号" prop="idCard"></el-table-column>
        <el-table-column label="常驻地" prop="location"></el-table-column>
        <el-table-column label="银行" prop="bank"></el-table-column>
        <el-table-column label="银行账号" prop="bankid"></el-table-column>
        <el-table-column label="账户名" prop="bankName"></el-table-column>

        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip content="编辑" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click.prevent="showUpdateUserDialog({id:scope.row.id,userName:scope.row.userName,password:scope.row.password,mobile:scope.row.mobile,nickName:scope.row.nickName,realName:scope.row.realName,idCard:scope.row.idCard,location:scope.row.location,bank:scope.row.bank,bankid:scope.row.bankid,bankName:scope.row.bankName,mode:mode})"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button type="danger" icon="el-icon-delete" size="mini" @click.prevent="deleteUserInfo(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        beforeClose
      ></el-pagination>
    </el-card>

    <!-- 修改对话框 -->
    <el-dialog
      :title="mode + '用户信息'"
      :visible.sync="dialogVisible"
      :center="true"
      width="40%"
      @close="closeDialog"
    >
      <el-form>
        <el-form-item>
          <el-col :span="6">用户名</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.userName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">密码</el-col>
          <el-col :span="18">
            <el-input type="password" v-model="userInfo.password" :show-password="showPWD"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">电话</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.mobile"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">网名</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.nickName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">真名</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.realName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">身份证号</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.idCard"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">常驻地</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.location"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">银行</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.bank"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">银行账号</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.bankid"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">账户名</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.bankName"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页显示几条
        pagesize: 5
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      mode: "修改",
      userInfo: {},
      showPWD: true
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200)
        return this.$message.error("获取用户列表失败!");
      console.log(res);
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    // 监听pagesize的改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      console.log(this.queryInfo.pagesize);
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      console.log(this.queryInfo.pagenum);
      this.getUserList();
    },
    showUpdateUserDialog(userInfo) {
      this.mode = "修改";
      this.userInfo = userInfo;
      console.log(this.userInfo);
      this.dialogVisible = true;
    },
    async updateUserInfo() {
      var api = "";
      if (this.mode == "修改") {
        api = '/updateUserInfo'
      }
      else if (this.mode =='添加'){
        api = '/addUser'
      }
      const { data: res } = await this.$http.post(api,this.userInfo);
      if (res.meta.status == 400) {
        this.$message.error(this.mode + "失败!");
        return;
      }
      this.dialogVisible = false;
      setTimeout(() => {
        this.$message.success(this.mode + "成功!");
        this.getUserList();
      }, 200);
    },
    addUser() {
      this.mode = "添加";
      console.log(this);
      this.dialogVisible = true;
    },
    async deleteUserInfo(id) {
      const {data: res} = await this.$http.post('/delUserInfo',{id:id})
      if(res.meta.status==200){

      }
      this.getUserList();
    },
    // 关闭后清空文本框
    closeDialog() {
      this.userInfo = {};
      this.showPWD = true;
    }
  }
};
</script>

<style>
</style>