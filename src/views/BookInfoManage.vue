<template>
  <div class="BookInfoMain">
    <div class="header">
      <div class="title">
      <span>图书信息管理</span>
      </div>
      <div>
        <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">个人中心
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">读者管理中心</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="search">
      <el-input placeholder="请输入图书编号进行查找" v-model="codeOrName" clearable prefix-icon="el-icon-search">
        <el-button slot="append" @click="selectBook">查找</el-button>
      </el-input>
    </div>
    <div class="booksInfo">
      <el-table
          stripe
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="code"
            label="图书编号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="name"
            label="图书名称"
            width="170">
        </el-table-column>
        <el-table-column
            prop="classification"
            label="图书类别"
            width="150">
        </el-table-column>
        <el-table-column
            prop="publishinghouse"
            label="出版社"
            width="200">
        </el-table-column>
        <el-table-column
            prop="author"
            label="作者"
            width="150">
        </el-table-column>
        <el-table-column
            prop="translator"
            label="译者"
            width="150">
        </el-table-column>
        <el-table-column
            prop="entrydate"
            label="入库时间"
            width="170">
        </el-table-column>
        <el-table-column
            prop="operator"
            label="操作员"
            width="150">
        </el-table-column>
        <el-table-column
            prop="location"
            label="库存位置"
            width="200">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="160">
          <template slot-scope="scope">
            <el-button @click="updateBookInfo(scope.row)" type="success" plain size="small">修改</el-button>
            <el-popover
                placement="top"
                width="160"
                :ref="`popover-${scope.$index}`">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="toClose(scope)">取消</el-button>
                <el-button type="primary" size="mini"
                           @click="deleteBookInfo(scope.row)">确定
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
    <div class="addBook">
      <el-button type="primary" round style="font-size: 20px" @click="dialogFormVisible = true">添加图书信息</el-button>
    </div>
    <div>
      <el-dialog title="图书信息" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="form" ref="ruleForm">
          <el-form-item label="图书编号" :label-width="formLabelWidth" prop="code">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书分类" :label-width="formLabelWidth" prop="classification">
            <el-input v-model="form.classification" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版社" :label-width="formLabelWidth" prop="publishinghouse">
            <el-input v-model="form.publishinghouse" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
            <el-input v-model="form.author" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="译者" :label-width="formLabelWidth" prop="translator">
            <el-input v-model="form.translator" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库时间" :label-width="formLabelWidth" prop="entrydate">
            <el-date-picker
                v-model="form.entrydate"
                type="datetime"
                placeholder="选择日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作员" :label-width="formLabelWidth" prop="operator">
            <el-input v-model="form.operator" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="库存位置" :label-width="formLabelWidth" prop="location">
            <el-input v-model="form.location" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOrUpdateBook">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookInfoManage",
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
        classification: '',
        publishinghouse: '',
        author: '',
        translator: '',
        entrydate: '',
        operator: '',
        location: ''
      },
      formLabelWidth: '120px',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    }
  },
  created() {
    this.getBooks()
  },
  methods: {
    async selectBook() {
      if (this.codeOrName === '') {
        return this.getBooks()
      } else {
        const {data: result} = await this.$http.get(`/book/getBook?select=` + this.codeOrName)
        if (result.code !== 200) {
          return this.$message.error(result.msg)
        }
        this.tableData = result.data.records
      }
    },
    async getBooks() {
      const {data: result} = await this.$http.get(
          `/book/getBooks?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`)
      if (result.code !== 200) {
        return this.$message.error(result.msg)
      }
      this.tableData = result.data.records
      this.total = result.data.total
    },
    async updateBookInfo(row) {
      const {data: result} = await this.$http.get('/book/getBookById?id=' + row.id)
      this.form = result.data
      this.dialogFormVisible = true
    },
    async deleteBookInfo(row) {
      const {data: result} = await this.$http.delete('/book/delBook?id=' + row.id)
      if (result.code !== 200) {
        return this.$message.error(result.msg)
      }
      await this.getBooks()
    },
    async addOrUpdateBook() {
      const {data: result} = await this.$http.post('/book/addOrUpdateBook', this.form)
      if (result.code !== 200) {
        return this.$message.error(result.msg)
      }
      await this.getBooks()
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
    toClose(scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose()
    },
    handleCommand(command) {
      if (command === 'a'){
        this.$router.push('/readerManage')
      }else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.BookInfoMain {
  height: 100%;
  background-image: url("../assets/image/bookInfo.png");
  background-size: 100% 100%;
  background-attachment: fixed;
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
  width: 50%;
  margin: 0 auto;
}

.booksInfo {
  width: 80%;
  margin: 50px auto;
}

.addBook {
  margin-left: 10%;
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
