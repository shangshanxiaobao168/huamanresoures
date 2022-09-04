<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools :isRoot="true" :treeNode="company" />
        <!-- 树形 -->
        <el-tree :data="treeData" default-expand-all :props="defaultProps">
          <treeTools :treeNode="{ name: '总裁办', manager: '周杰伦' }" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import {getDepartmentsApi} from '@/api/departments'
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
    }
  },
  components: {
    treeTools,
  },
  created() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const res = await getDepartmentsApi()
      console.log(res)
    },
  },
}
</script>

<style scoped></style>
