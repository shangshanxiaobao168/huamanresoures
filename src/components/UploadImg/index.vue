<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDMZXGAxZ4UhgQBwfQAtPq68GCweAKD1f6',
  SecretKey: 'GI4nMG0Wmnb8vTnpqeTBsUwCCyKVSbTF',
})
console.log(COS)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      previewImgDialog: false,
      imgUrl: '',
      // 此处没有引号，带引号的是字符串
      loading: false,
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      console.log(file)
      cos.uploadFile(
        {
          Bucket: 'hr666-1314216468' /* 填写自己的bucket，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
          Body: file, // 上传文件对象
          SliceSize:
            1024 *
            1024 *
            5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          console.log(data)
          this.$emit('onSuccess', { url: 'https://' + data.Location })
          this.loading = false
          // 成功或失败都进入该函数
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败')
            console.log('上传失败', err)
          } else {
            return this.$message.success('上传成功')
            console.log('上传成功')
          }
          // 'https://' + data.Location
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // 可以上传的类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超过2mb')
        return false
      }
    },
  },
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
// 控制外侧的div盒子大小，超过的就overflow: hidden;
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
