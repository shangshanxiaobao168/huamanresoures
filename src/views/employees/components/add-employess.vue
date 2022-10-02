<template>
  <el-dialog @close="onClose" title="新增员工" :visible="visible" width="50%">
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            class="treeOption"
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option
        ></el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          @focus="getDepts"
          v-model="formData.departmentName"
          placeholder="请选择部门"
          ref="deptSelect"
        >
          <el-option value="" v-loading="isTreeLoading">
            <el-tree
              @node-click="treeNodeClick"
              :data="depts"
              :props="treeProps"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-input
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import employess from '@/constant/employees.js'
import { getDepartmentsApi } from '@/api/departments'
import { tranListToTree } from '@/utils/index.js'
import { addEmployeesApi } from '@/api/employees.js'
const { hireType } = employess
export default {
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: '',
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位',
          },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' },
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'blur' },
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
      },
      hireType,
      depts: [],
      treeProps: {
        label: 'name',
      },
      isTreeLoading: false,
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
    },
    async getDepts() {
      const { depts } = await getDepartmentsApi()
      // console.log(res)
      tranListToTree(depts, '')
      this.depts = depts
    },
    treeNodeClick(row) {
      // console.log(row)
      this.formData.departmentName = row.name
      this.$refs.deptSelect.blur()
    },
    onSave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addEmployeesApi(this.formData)
        this.$message.success('添加员工成功')
        this.onClose()
        this.$emit('add-success')
      })
    },
  },
}
</script>

<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover .el-select-dropdown__item {
  background-color: #fff;
  overflow: unset;
}
.el-select-dropdown__item {
  height: 100px;
}
.treeOption {
  height: 30px;
}
</style>
