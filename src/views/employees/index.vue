<template>
  <div>
    <PageTools left-icon="el-icon-info">
      <template #left-tag>
        <span>共789条</span>
      </template>
      <template #right-tag>
        <el-button size="small" type="info" @click="exportExcel"
          >导出</el-button
        >
        <el-button size="small" type="success" @click="$router.push('/import')"
        v-isHas="point.employees.import"
          >excel导入</el-button
        >
        <el-button size="small" type="primary" @click="showAdd"
        v-isHas="point.employees.add"
          >新增员工</el-button
        >
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table :data="employees" style="width: 100%">
        <el-table-column label="序号" sortable type="index"> </el-table-column>
        <el-table-column
          label="姓名"
          sortable
          prop="username"
        ></el-table-column>
        <el-table-column label="头像" sortable prop="staffPhoto">
          <template slot-scope="{ row }">
            <img
              v-imgError="require('@/assets/common/head.jpg')"
              :src="row.staffPhoto"
              style="
                border-radius: 50%;
                width: 100px;
                height: 100px;
                padding: 10px;
              "
              @click="showTwoCodeDialog(row.staffPhoto)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          sortable
          prop="mobile"
        ></el-table-column>
        <el-table-column label="工号" sortable prop="workNumber">
        </el-table-column>
        <el-table-column
          label="聘用形式"
          sortable
          prop="formOfEmployment"
          :formatter="formOfEmployment"
        ></el-table-column>
        <el-table-column label="部门" sortable prop="departmentName">
        </el-table-column>
        <el-table-column label="入职时间" sortable prop="timeOfEntry">
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="状态" sortable prop="enableState">
          <template slot-scope="{ row }">
            <el-switch
              :value="row.enableState === 1"
              active-color="##ff4949"
              inactive-color="#13ce66"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button
              size="small"
              type="text"
              @click="$router.push('/employees/detail/' + row.id)"
              >查看</el-button
            >
            <el-button size="small" type="text">转正</el-button>
            <el-button size="small" type="text">调岗</el-button>
            <el-button size="small" type="text">离职</el-button>
            <el-button
              size="small"
              type="text"
              @click="showAssignDialog(row.id)"
              >角色</el-button
            >
            <el-button
              size="small"
              type="text"
              @click="onRemove(row.id)"
              v-isHas="point.employees.del"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          :page-size="pages.size"
          :total="total"
          layout="prev, pager, next"
          @current-change="currentChange"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 添加员工组件 -->
    <addEmployees
      @add-success="getEmployeesList"
      :visible.sync="showAddEmployees"
    ></addEmployees>
    <!-- 头像二维码 -->
    <el-dialog :visible.sync="twoCodeDialog" title="头像">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <!-- 分配角色 -->
    <AssignRole
      :visible.sync="showAssignRole"
      :employeesId="currentEmployeesId"
    ></AssignRole>
  </div>
</template>

<script>
import { getEmployeesInfoApi, deleteEmployeesApi } from '@/api/employees.js'
import employees from '@/constant/employees.js'
import addEmployees from './components/add-employess'
import AssignRole from './components/assign-role.vue'
import QRcode from 'qrcode'
import permissionPoint from '@/constant/permission'
const { hireType, exportExcelMapPath } = employees
export default {
  name: 'Employees',
  data() {
    return {
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 10,
      },
      showAddEmployees: false,
      twoCodeDialog: false,
      showAssignRole: false,
      currentEmployeesId: '',
      point: permissionPoint,
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      // console.log(res)
      this.employees = rows
      // console.log(this.employees)
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    formOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async onRemove(id) {
      await this.$confirm('确认删除此员工？')
      deleteEmployeesApi(id)
      this.$message.success('删除成功')
      this.getEmployeesList()
    },
    showAdd() {
      this.showAddEmployees = true
    },
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesInfoApi({
        page: 1,
        size: this.total,
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header,
        data,
        filename: '员工列表',
        autoWidth: true,
        bookType: 'xlsx',
        multiHeader: [['手机号', '其他信息', '', '', '', '', '部门']],
        merges: ['A1:A2', 'B1:F1', 'G1:G2'],
      })
    },
    showTwoCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户还未设置头像')
      this.twoCodeDialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, staffPhoto)
      })
    },
    // 点击角色，显示分配角色弹层
    showAssignDialog(id) {
      this.showAssignRole = true
      this.currentEmployeesId = id
    },
    isHas(point) {
      return this.$store.state.permission.points.includes(point)
    },
  },
  components: {
    addEmployees,
    AssignRole,
  },
}
</script>

<style scoped></style>
