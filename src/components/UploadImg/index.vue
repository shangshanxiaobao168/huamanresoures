<template>
  <div>
    <el-upload
      action="#"
      :http-request="onRuquest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :file-list="fileList"
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
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        {
          name: 'huangsijing',
          url: 'https://img0.baidu.com/it/u=1967502218,3684011722&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500',
        },
      ],
      previewImgDialog: false,
      imgUrl: '',
    }
  },

  created() {},

  methods: {
    onRuquest() {
      console.log('自己发送请求')
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
  },
}
</script>

<style scoped></style>
