<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @click="handleTabClick">
          <el-tab-pane label="登录账户设置" name="account">
            <!-- 放置表单 -->
            <el-form
              :model="formData"
              :rules="rules"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="formData.username"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="user">
            <UserInfo></UserInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job">
            <JobInfo></JobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail, saveUserBasicInfo } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            patter:
              /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
            message: '密码包含1个大写字母,1个小写字母,1个数字,1个特殊符号',
          },
        ],
      },
      activeName: Cookies.get('employeeDetailTab') || 'account',
    }
  },
  components: {
    UserInfo,
    JobInfo,
  },
  created() {
    this.loadUserDetail()
  },

  methods: {
    async loadUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      console.log(this.$route)
      this.formData = res
    },
    async onSave() {
      await saveUserBasicInfo(this.formData)
      this.$message.success('更新成功')
    },
    handleTabClick() {
      Cookies.set('employeeDetailTab', this.activeName)
    },
  },
}
</script>

<style scoped></style>
