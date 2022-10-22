<template>
  <div>
    <el-dialog
      @open="onOpen"
      @close="RoleClose"
      title="分配角色"
      :visible="visible"
    >
      <el-checkbox-group v-model="checkList">
        <!-- label:渲染 name-->
        <!-- 会记录选中值 记录id -->
        <el-checkbox v-for="item in roles" :label="item.id">{{
          item.name
        }}</el-checkbox>
        <!-- 插槽也可以用于渲染 -->
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RoleClose">取 消</el-button>
        <el-button type="primary" @click="assignEmployessRoles"
          >确 定</el-button
        >
      </span></el-dialog
    >
  </div>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: 'AssignRole',

  data() {
    return {
      checkList: [], //用来记录选中的元素
      roles: [],
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    employeesId: {
      type: String,
      required: true,
    },
  },
  mounted() {},

  methods: {
    RoleClose() {
      this.$emit('update:visible', false)
    },
    async getRolesList() {
      const { rows } = await getRolesApi()
      this.roles = rows
      console.log(rows)
    },
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetail(this.employeesId)
      // console.log(res);
      this.checkList = roleIds
    },
    async assignEmployessRoles() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList,
      })
      this.$message.success('分配成功')
      this.close()
    },
  },
}
</script>

<style lang="scss" scoped></style>
