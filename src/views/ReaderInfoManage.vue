<template>
  <div class="ReaderInfoMain">
    <div class="header">
      <div class="title">
        <span>读者信息管理</span>
      </div>
      <div>
        <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">个人中心
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">图书管理中心</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="search">
      <el-input placeholder="请输入读者编号或姓名查找" v-model="codeOrName" clearable prefix-icon="el-icon-search">
        <el-button slot="append" @click="selectReader">查找</el-button>
      </el-input>
    </div>
    <div class="readersInfo">
      <el-table
          stripe
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="code"
            label="读者编号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="name"
            label="读者姓名"
            width="170">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            width="150">
        </el-table-column>
        <el-table-column
            prop="department"
            label="部门"
            width="200">
        </el-table-column>
        <el-table-column
            prop="grade"
            label="年级"
            width="150">
        </el-table-column>
        <el-table-column
            prop="career"
            label="专业"
            width="150">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="160">
          <template slot-scope="scope">
            <el-button @click="updateReaderInfo(scope.row)" type="success" plain size="small">修改</el-button>
            <el-popover
                placement="top"
                width="160"
                :ref="`popover-${scope.$index}`">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="toClose(scope)">取消</el-button>
                <el-button type="primary" size="mini"
                           @click="deleteReaderInfo(scope.row)">确定
                </el-button>
              </div>
              <el-button
                  size="small" slot="reference"
                  type="danger" style="margin-left: 10px"
                  plain>删除
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNumber"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total" style="background-color: white;text-align: center;padding: 5px 0 10px 0">
      </el-pagination>
    </div>
    <div class="addReader">
      <el-button type="primary" round style="font-size: 20px" @click="dialogFormVisible = true">添加读者信息</el-button>
    </div>
    <div>
      <el-dialog title="读者信息" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="form" ref="ruleForm">
          <el-form-item label="读者编号" :label-width="formLabelWidth" prop="code">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="读者姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
            <el-input v-model="form.gender" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth" prop="department">
            <el-input v-model="form.department" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年级" :label-width="formLabelWidth" prop="grade">
            <el-input v-model="form.grade" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth" prop="career">
            <el-input v-model="form.career" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOrUpdateReader">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReaderInfoManage",
  data() {
    return {
      visible: false,
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      codeOrName: '',
      tableData: [],
      isAdd: true,
      dialogFormVisible: false,
      form: {
        id: '',
        code: '',
        name: '',
        gender: '',
        department: '',
        grade: '',
        career: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getReaders()
  },
  methods: {
    async selectReader(){
      if (this.codeOrName === ''){
        return this.getReaders()
      }else{
        const {data: result} = await this.$http.get(`/reader/getReader?select=` + this.codeOrName)
        if (result.code !== 200) {
          return this.$message.error(result.msg)
        }
        this.tableData = result.data
      }
    },
    async getReaders() {
      const {data: result} = await this.$http.get(
          `/reader/getReaders?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`)
      if (result.code !== 200) {
        return this.$message.error(result.msg)
      }
      this.tableData = result.data.records
      this.total = result.data.total
    },
    async updateReaderInfo(row) {
      const {data: result} = await this.$http.get('/reader/getReaderById?id=' + row.id)
      this.form = result.data
      this.dialogFormVisible = true
    },
    async deleteReaderInfo(row) {
      const {data: result} = await this.$http.delete('/reader/delReader?id=' + row.id)
      if (result.code !== 200) {
        return this.$message.error(result.msg)
      }
      await this.getReaders()
    },
    async addOrUpdateReader() {
      const {data: result} = await this.$http.post('/reader/addOrUpdateReader', this.form)
      if (result.code !== 200) {
        return this.$message.error(result.msg)
      }
      await this.getReaders()
      this.dialogFormVisible = false
    },
    closeDialog() {
      this.$refs.ruleForm.resetFields()
      this.form.id = ''
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNumber = val
    },
    toClose(scope){
      scope._self.$refs[`popover-${scope.$index}`].doClose()
    },
    handleCommand(command) {
      if (command === 'a'){
        this.$router.push('/bookManage')
      }else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.ReaderInfoMain {
  height: 100%;
  background-image: url("../assets/image/reader.png");
  background-size:100% 100%;
  background-attachment:fixed;
}

.header{
  line-height: 52px;
  padding: 40px 40px 0 40px;
  display: flex;
  justify-content: space-between;
}

.title {
  color: white;
  font-size: 40px;
}

.search {
  width: 30%;
  margin: 0 auto;
}

.readersInfo {
  width: 60%;
  margin: 50px auto;
}

.addReader {
  margin-left: 20%;
}

.el-dropdown-link {
  cursor: pointer;
  color: darkturquoise;
  font-size: 20px;
}

.el-icon-arrow-down {
  font-size: 15px;
}
</style>
