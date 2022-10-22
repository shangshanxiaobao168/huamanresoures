<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :isShowLeft="false">
        <template #right-tag>
          <el-button type="text" @click="onAddPermission('0', 1)"
            >添加权限</el-button
          >
        </template>
      </PageTools>
      <el-table
        ref="table"
        row-key="id"
        :data="permissions"
        style="width: 100%"
      >
        <el-table-column prop="name" label="名称" width="180">
          <template v-slot="{ row }">
            <i
              v-if="row.children"
              style="margin-left: 5px"
              class="el-icon-folder-opened"
              @click="expand(row)"
            ></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="{ row }">
            <el-button
              type="text"
              @click="onAddPermission(row.id, 2)"
             
              >添加</el-button
            >
            <el-button type="text" 
              >编辑</el-button
            >
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增权限" :visible.sync="isShowPreDialog">
        <el-form
          ref="formPre"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input
              type="text"
              v-model="formData.name"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input
              type="text"
              v-model="formData.code"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input
              v-model.number="formData.description"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="开启" prop="enVisible">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSavePermission">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permission'
import { tranListToTree } from '@/utils/index'

export default {
  data() {
    return {
      permissions: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0', // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' },
        ],
      },
      isShowPreDialog: false,
      
    }
  },

  created() {
    this.getPermissions()
  },

  methods: {
    async getPermissions() {
      const res = await getPermissionList()
      console.log(res)
      this.permissions = tranListToTree(res, '0')
    },
    expand(row) {
      // 每一行都得有控制展开或关闭的数据
      // 给row添加一个属性
      // 最开始是没有undefined，取反也是true
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row, row.isExpand)
    },
    onAddPermission(id, type) {
      this.isShowPreDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    onSavePermission() {
      this.$refs.formPre.validate(async (valid) => {
        if (!valid) return
        // console.log('发送请求')
        await addPermission(this.formData)
        this.$message.success('添加成功')
        this.isShowPreDialog = false
        this.getPermissions()
      })
    },
    
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
