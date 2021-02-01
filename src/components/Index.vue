<template>
  <div class="hello">
    <div class="icon-right">
      <i class="el-icon-zoom-in" @click="dialogFormVisible = true">添加用户</i>
    </div>

    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="Id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="passWord"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="userSex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click="deleteUserDiaLog(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>


    <!--    以下是弹出框内容-->
    <section>

      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" :modal="true" width="600px" :fullscreen="false"
                 @open="openDialog" @close="closeDialog">
        <el-form status-icon :model="form" :rules="rules" ref="ruleForm" size="small" label-width="100px">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="userSex">
            <el-select v-model="form.userSex" style="width:100%">
              <el-option label="男" value="MAN"></el-option>
              <el-option label="女" value="WOMAN"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input type="password" v-model="form.nickName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      var validateUserName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名！"))
        } else if (value.length < 6) {
          callback(new Error("用户名必须大于5个字符"));
        }
      }
      var validateNickName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入昵称！"))
        } else if (value.length < 6) {
          callback(new Error("昵称必须大于5个字符"));
        }
      }


      let regexp = /^[0-9]+$/;
      var validatePin = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("PIN码不能为空！"))
        } else if (!regexp.test(value)) {
          callback(new Error("PIN码只能为数字"));
        }
      }

      return {
        msg: 'Welcome to Your Vue.js App',
        tableData: [],
        dialogFormVisible: false,
        rules: {
          userName: [
            {validator: validateUserName, trigger: "blur"},
            {required: true, trigger: "blur"}
          ],
          userSex: [
            {required: true, message: "请选择性别", trigger: "change"}
          ],
          nickName: [
            {validator: validateNickName, trigger: "blur"},
            {required: true, trigger: "blur"}
          ]
        },
        form: {
          userName: "自傲三还是说",
          userSex: "MAN",
          nickName: "sfsgsgsgs"
        }

      }
    },
    mounted() {
      this.queryUser();
    },
    methods: {
      queryUser() {
        this.HttpApi.getUsers().then(res => {
          this.tableData = res;

        })
      },
      deleteUser(item,calBack){
        this.HttpApi.delete(item.id).then((res=>{
          this.queryUser();
          calBack();
        }))
      },
      deleteUserDiaLog(item){
        this.$confirm('此操作将永久用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser(item,res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            alert('submit!');
            console.log("submit!");
          } else {
            alert('false!');
            console.log("error submit!!");
            return false;
          }
        });
        this.HttpApi.add(this.form).then((res) => {
          this.dialogFormVisible = false;
          this.queryUser();
        });
      },

      resetForm(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
      },
      openDialog() {
        this.form.name = "123456";
        this.form.certlvl = "1";
        this.form.pin = "123456";
      },
      closeDialog() {
        this.$refs['ruleForm'].resetFields()
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon-right {
    text-align: right;
    color: #409EFF;
    padding: 10px;
  }
</style>
