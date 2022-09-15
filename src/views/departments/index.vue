<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading" class="box-card">
        <!-- 头部 -->
        <treeTools @add="showAddDept" :isRoot="true" :treeNode="company" />
        <!-- 树形 -->
        <el-tree :data="treeData" default-expand-all :props="defaultProps">
          <template v-slot="{ data }">
            <treeTools
              @add="showAddDept"
              @remove="getDepartments"
              @edit="showEditDept"
              :treeNode="data"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <addDept
      ref="addDept"
      @add-success="getDepartments"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    ></addDept>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartmentsApi } from '@/api/departments'
import { tranListToTree } from '@/utils'
import addDept from './components/add-depts.vue'
export default {
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name', //将data中哪个数据名显示到树形页面中，
        // children: 'child',//树形默认查找子节点通过children
      },
      company: {
        name: '传智教育',
        manager: '负责人',
      },
      dialogVisible: false,
      currentNode: {},
      loading: false,
    }
  },
  components: {
    treeTools,
    addDept,
  },
  created() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      this.loading = true
      const res = await getDepartmentsApi()
      // console.log(res);
      this.treeData = tranListToTree(res.depts, '')
      this.loading = false
    },
    showAddDept(val) {
      console.log(val)
      this.dialogVisible = true
      this.currentNode = val
      // console.log(val.id)
    },
    showEditDept(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    },
  },
}
</script>

<style scoped></style>
