<template>
  <div>
    <!-- Tabs标签 el-tabs el-tab-pane-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色管理" name="first">
        <!-- button按钮 -->
        <el-button @click="addDialogVisible = true" type="primary"
          >角色管理</el-button
        >
        <!-- Table表格 -->
        <el-table border :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="角色" width="180">
          </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <!-- 作用域插槽 -->
            <template slot-scope="{ row }">
              <el-button type="success" size="small">分配权限</el-button>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button @click="removeRole(row.id)" type="danger" size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- Pagination 分页 -->
        <el-pagination
          @current-change="currentChange"
          @size-change="handleSizeChange"
          :page-size="pageSize"
          :page-sizes="[3, 5, 10, 20]"
          layout="sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          :closable="false"
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
        >
        </el-alert>
        <el-form ref="form" label-width="80px">
          <el-form-item label="公司名称">
            <el-input v-model="companyInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="companyInfo.companyAddress" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司邮箱">
            <el-input v-model="companyInfo.mailbox" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="companyInfo.remarks" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加角色对话框 -->
    <el-dialog
      @close="dialogClose"
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.region"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @onclick="cancleClose">取 消</el-button>
        <el-button @click="onAddRole" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi, removeRolesApi } from '@/api/role.js'
import { getCompanyInfoApi } from '@/api/company.js'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 1,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        region: '',
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
      },
      companyInfo: {},
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    cancleClose() {
      this.addDialogVisible = false
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRolesApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.region = ''
    },
    async removeRole(id) {
      await removeRolesApi(id)
      this.$message.success('删除成功')
      this.getRoles()
    },
    async getCompanyInfo() {
      // console.log(this.$store.state.user.userInfo)
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
      this.companyInfo = res
      console.log(res)
    },
  },
}
</script>

<style scoped></style>
