<template>
  <div class="radarCharts" ref="main">雷达图</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },
  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      const radarOption = {
        title: {
          text: '人员绩效表',
        },
        legend: {
          data: ['上杉', '浅仓南'],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 },
          ],
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: '上杉',
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '浅仓南',
              },
            ],
          },
        ],
      }
      myChart.setOption(radarOption)
    },
  },
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 700px;
  height: 500px;
}
</style>
