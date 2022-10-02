<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import employess from '@/constant/employees.js'
const { importMapKeyPath } = employess
import { importEmployess } from '@/api/employees'
import { formatTime } from '@/filters/index'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      // console.log(file)
      if (!name.endsWith('.xlsx')) {
        this.message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    //倒入成功
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            // excel时间戳
            const timestamp = item[key]
            // 转换成js时间戳
            const date = new Date((timestamp - 1) * 24 * 360000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          }
          obj[importMapKeyPath[key]] = item[key]
        }
        return obj
      })
      await importEmployess(newArr)
      this.$message.error('导入成功')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
