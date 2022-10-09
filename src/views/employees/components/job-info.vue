<template>
  <div>
    <i
      @click="$router.push(`/employees/print/${userId}?type=job`)"
      class="el-icon-printer"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'HrsaasJobInfo',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
